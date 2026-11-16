package com.poitour.poi.service;

import com.poitour.poi.dto.CreatePoiRequest;
import com.poitour.poi.dto.PoiResponse;
import com.poitour.poi.dto.SaveAudioRequest;
import com.poitour.poi.dto.UpdatePoiRequest;
import com.poitour.poi.model.Poi;
import com.poitour.poi.model.PoiAudioContent;
import com.poitour.poi.repository.PoiAudioContentRepository;
import com.poitour.poi.repository.PoiRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PoiService {

    private final PoiRepository poiRepository;
    private final PoiAudioContentRepository poiAudioContentRepository;
    private final RedisTemplate<String, String> redisTemplate;

    private static final String REDIS_GEO_KEY = "pois_geo";

    /**
     * Khởi động: Đồng bộ toàn bộ POI từ PostgreSQL vào Redis GEO cache
     * Phục vụ yêu cầu phi chức năng: Redis GEOSEARCH < 20ms
     */
    @PostConstruct
    public void initRedisGeoCache() {
        try {
            List<Poi> pois = poiRepository.findByIsActiveTrue();
            for (Poi poi : pois) {
                // Redis GEOADD: longitude trước, latitude sau
                redisTemplate.opsForGeo().add(REDIS_GEO_KEY,
                        new Point(poi.getLng(), poi.getLat()),
                        poi.getId().toString());
            }
            log.info("✅ Đã đồng bộ {} POI vào Redis GEO cache", pois.size());
        } catch (Exception e) {
            log.warn("⚠️ Không thể đồng bộ Redis GEO lúc khởi động (Redis có thể chưa sẵn sàng): {}", e.getMessage());
        }
    }

    /**
     * UC01: Lấy danh sách POI gần vị trí GPS của du khách
     */
    @Transactional(readOnly = true)
    public List<PoiResponse> findNearby(Double lat, Double lng, Double radiusM, String lang) {
        if (radiusM == null || radiusM <= 0) {
            radiusM = 500.0; // Mặc định tìm bán kính 500m theo đặc tả UC01
        }
        if (lang == null || lang.isBlank()) {
            lang = "vi";
        }

        List<Poi> nearbyPois = poiRepository.findNearbyPois(lat, lng, radiusM);
        String finalLang = lang;

        return nearbyPois.stream()
                .map(poi -> mapToResponse(poi, finalLang, calculateDistance(lat, lng, poi.getLat(), poi.getLng())))
                .collect(Collectors.toList());
    }

    /**
     * UC08: Xem chi tiết 1 POI
     */
    @Transactional(readOnly = true)
    public PoiResponse getById(UUID id, String lang) {
        Poi poi = poiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy điểm tham quan với ID: " + id));

        return mapToResponse(poi, (lang != null ? lang : "vi"), null);
    }

    /**
     * UC06: Admin tạo POI mới (Lưu PostgreSQL và cập nhật ngay vào Redis GEO)
     */
    @Transactional
    public PoiResponse createPoi(CreatePoiRequest request) {
        Poi poi = Poi.builder()
                .name(request.getName())
                .lat(request.getLat())
                .lng(request.getLng())
                .radiusM(request.getRadiusM())
                .imageUrl(request.getImageUrl())
                .isActive(true)
                .build();

        Poi saved = poiRepository.save(poi);

        // Cập nhật ngay vào Redis GEO
        try {
            redisTemplate.opsForGeo().add(REDIS_GEO_KEY,
                    new Point(saved.getLng(), saved.getLat()),
                    saved.getId().toString());
        } catch (Exception e) {
            log.error("Lỗi khi thêm POI vào Redis GEO: {}", e.getMessage());
        }

        return mapToResponse(saved, "vi", null);
    }

    /**
     * Admin: Lấy toàn bộ danh sách POI (phục vụ bảng quản trị CMS)
     */
    @Transactional(readOnly = true)
    public List<PoiResponse> getAllPois(String lang) {
        String finalLang = (lang != null && !lang.isBlank()) ? lang : "vi";
        List<Poi> allPois = poiRepository.findAll();
        return allPois.stream()
                .map(poi -> mapToResponse(poi, finalLang, null))
                .collect(Collectors.toList());
    }

    /**
     * Admin: Cập nhật thông tin điểm POI
     */
    @Transactional
    public PoiResponse updatePoi(UUID id, UpdatePoiRequest request) {
        Poi poi = poiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy điểm tham quan ID: " + id));

        poi.setName(request.getName());
        poi.setLat(request.getLat());
        poi.setLng(request.getLng());
        poi.setRadiusM(request.getRadiusM());
        poi.setImageUrl(request.getImageUrl());
        if (request.getIsActive() != null) {
            poi.setIsActive(request.getIsActive());
        }

        Poi updated = poiRepository.save(poi);

        // Cập nhật lại vị trí trong Redis GEO
        try {
            if (Boolean.TRUE.equals(updated.getIsActive())) {
                redisTemplate.opsForGeo().add(REDIS_GEO_KEY,
                        new Point(updated.getLng(), updated.getLat()),
                        updated.getId().toString());
            } else {
                redisTemplate.opsForGeo().remove(REDIS_GEO_KEY, updated.getId().toString());
            }
        } catch (Exception e) {
            log.error("Lỗi khi đồng bộ Redis GEO lúc cập nhật POI: {}", e.getMessage());
        }

        return mapToResponse(updated, "vi", null);
    }

    /**
     * Admin: Xóa điểm POI
     */
    @Transactional
    public void deletePoi(UUID id) {
        Poi poi = poiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy điểm tham quan ID: " + id));

        poiRepository.delete(poi);

        // Xóa khỏi Redis GEO
        try {
            redisTemplate.opsForGeo().remove(REDIS_GEO_KEY, id.toString());
        } catch (Exception e) {
            log.error("Lỗi khi xóa khỏi Redis GEO: {}", e.getMessage());
        }
    }

    /**
     * Admin: Thêm hoặc Cập nhật nội dung bài thuyết minh theo ngôn ngữ
     */
    @Transactional
    public PoiResponse saveAudioContent(UUID poiId, SaveAudioRequest request) {
        Poi poi = poiRepository.findById(poiId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy điểm tham quan ID: " + poiId));

        PoiAudioContent audioContent = poiAudioContentRepository
                .findByPoiIdAndLangCode(poiId, request.getLangCode().toLowerCase())
                .orElse(PoiAudioContent.builder()
                        .poi(poi)
                        .langCode(request.getLangCode().toLowerCase())
                        .build());

        if (request.getAudioUrl() != null && !request.getAudioUrl().isBlank()) {
            audioContent.setAudioUrl(request.getAudioUrl());
        }
        if (request.getTtsScript() != null && !request.getTtsScript().isBlank()) {
            audioContent.setTtsScript(request.getTtsScript());
        }
        if (request.getDurationSec() != null) {
            audioContent.setDurationSec(request.getDurationSec());
        }

        poiAudioContentRepository.save(audioContent);

        return mapToResponse(poi, request.getLangCode().toLowerCase(), null);
    }

    /**
     * Chuyển Entity sang DTO kèm nội dung audio theo đúng ngôn ngữ đã chọn (UC03)
     */
    private PoiResponse mapToResponse(Poi poi, String lang, Double distance) {
        PoiAudioContent matchedAudio = poi.getAudioContents().stream()
                .filter(a -> lang.equalsIgnoreCase(a.getLangCode()))
                .findFirst()
                .orElse(null);

        // Nếu không có tiếng của ngôn ngữ chọn, mặc định lấy tiếng Việt ('vi')
        if (matchedAudio == null && !poi.getAudioContents().isEmpty()) {
            matchedAudio = poi.getAudioContents().stream()
                    .filter(a -> "vi".equalsIgnoreCase(a.getLangCode()))
                    .findFirst()
                    .orElse(poi.getAudioContents().get(0));
        }

        List<String> availableLangs = poi.getAudioContents().stream()
                .map(PoiAudioContent::getLangCode)
                .distinct()
                .collect(Collectors.toList());

        return PoiResponse.builder()
                .id(poi.getId())
                .name(poi.getName())
                .lat(poi.getLat())
                .lng(poi.getLng())
                .radiusM(poi.getRadiusM())
                .imageUrl(poi.getImageUrl())
                .isActive(poi.getIsActive())
                .availableLanguages(availableLangs)
                .distanceMeters(distance != null ? Math.round(distance * 10.0) / 10.0 : null)
                .langCode(matchedAudio != null ? matchedAudio.getLangCode() : lang)
                .audioUrl(matchedAudio != null ? matchedAudio.getAudioUrl() : null)
                .ttsScript(matchedAudio != null ? matchedAudio.getTtsScript() : null)
                .durationSec(matchedAudio != null ? matchedAudio.getDurationSec() : null)
                .build();
    }

    /**
     * Tính khoảng cách Haversine (mét) giữa 2 tọa độ
     */
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371000; // Bán kính Trái Đất (mét)
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
