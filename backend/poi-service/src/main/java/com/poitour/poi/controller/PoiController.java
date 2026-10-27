package com.poitour.poi.controller;

import com.poitour.poi.dto.CreatePoiRequest;
import com.poitour.poi.dto.PoiResponse;
import com.poitour.poi.dto.SaveAudioRequest;
import com.poitour.poi.dto.UpdatePoiRequest;
import com.poitour.poi.service.PoiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/pois")
@RequiredArgsConstructor
// CORS do API Gateway quản lý tập trung
public class PoiController {

    private final PoiService poiService;

    /**
     * Admin: Lấy toàn bộ danh sách POI (không lọc theo bán kính)
     * GET /api/v1/pois/all?lang=vi
     */
    @GetMapping("/all")
    public ResponseEntity<List<PoiResponse>> getAllPois(
            @RequestParam(required = false, defaultValue = "vi") String lang) {
        List<PoiResponse> pois = poiService.getAllPois(lang);
        return ResponseEntity.ok(pois);
    }

    /**
     * UC01: Xem bản đồ - Lấy danh sách POI gần vị trí du khách
     * Ví dụ: GET /api/v1/pois?lat=10.7769&lng=106.6953&radius=500&lang=vi
     */
    @GetMapping
    public ResponseEntity<List<PoiResponse>> getNearbyPois(
            @RequestParam(required = false, defaultValue = "10.7769") Double lat,
            @RequestParam(required = false, defaultValue = "106.6953") Double lng,
            @RequestParam(required = false, defaultValue = "500") Double radius,
            @RequestParam(required = false, defaultValue = "vi") String lang) {

        List<PoiResponse> pois = poiService.findNearby(lat, lng, radius, lang);
        return ResponseEntity.ok(pois);
    }

    /**
     * UC08 / Hình 4.8 Sequence: Xem chi tiết POI và lịch sử nghe
     * GET /api/v1/pois/{id}/detail?lang=vi
     */
    @GetMapping("/{id}/detail")
    public ResponseEntity<PoiResponse> getPoiDetail(
            @PathVariable UUID id,
            @RequestParam(required = false, defaultValue = "vi") String lang) {

        PoiResponse poi = poiService.getById(id, lang);
        return ResponseEntity.ok(poi);
    }

    /**
     * UC03 / Hình 4.3 Sequence: Lấy file âm thanh thuyết minh theo ngôn ngữ chọn
     * GET /api/v1/pois/{id}/audio?lang=vi
     */
    @GetMapping("/{id}/audio")
    public ResponseEntity<PoiResponse> getPoiAudio(
            @PathVariable UUID id,
            @RequestParam(required = false, defaultValue = "vi") String lang) {

        PoiResponse poi = poiService.getById(id, lang);
        return ResponseEntity.ok(poi);
    }

    /**
     * UC06: Admin quản lý nội dung - Thêm POI mới
     */
    @PostMapping
    public ResponseEntity<PoiResponse> createPoi(@Valid @RequestBody CreatePoiRequest request) {
        PoiResponse created = poiService.createPoi(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Admin: Cập nhật thông tin POI
     * PUT /api/v1/pois/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<PoiResponse> updatePoi(
            @PathVariable UUID id,
            @Valid @RequestBody UpdatePoiRequest request) {
        PoiResponse updated = poiService.updatePoi(id, request);
        return ResponseEntity.ok(updated);
    }

    /**
     * Admin: Xóa POI
     * DELETE /api/v1/pois/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoi(@PathVariable UUID id) {
        poiService.deletePoi(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Admin: Thêm / Cập nhật bài thuyết minh âm thanh theo ngôn ngữ
     * POST /api/v1/pois/{id}/audio
     */
    @PostMapping("/{id}/audio")
    public ResponseEntity<PoiResponse> saveAudio(
            @PathVariable UUID id,
            @Valid @RequestBody SaveAudioRequest request) {
        PoiResponse updated = poiService.saveAudioContent(id, request);
        return ResponseEntity.ok(updated);
    }
}
