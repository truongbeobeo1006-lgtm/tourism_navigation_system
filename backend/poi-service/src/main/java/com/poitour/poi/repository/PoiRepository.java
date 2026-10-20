package com.poitour.poi.repository;

import com.poitour.poi.model.Poi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PoiRepository extends JpaRepository<Poi, UUID> {

    List<Poi> findByIsActiveTrue();

    /**
     * Tìm các POI gần vị trí (lat, lng) trong bán kính radiusM (mét)
     * Dùng công thức Haversine tính toán khoảng cách cầu trên Trái Đất (bán kính = 6,371,000 mét)
     */
    @Query(value = """
        SELECT p.* FROM pois p
        WHERE p.is_active = true
          AND (6371000 * acos(
                least(1.0, greatest(-1.0,
                  cos(radians(:lat)) * cos(radians(p.lat)) * cos(radians(p.lng) - radians(:lng)) +
                  sin(radians(:lat)) * sin(radians(p.lat))
                ))
              )) <= :radiusM
        ORDER BY (6371000 * acos(
                least(1.0, greatest(-1.0,
                  cos(radians(:lat)) * cos(radians(p.lat)) * cos(radians(p.lng) - radians(:lng)) +
                  sin(radians(:lat)) * sin(radians(p.lat))
                ))
              )) ASC
        """, nativeQuery = true)
    List<Poi> findNearbyPois(@Param("lat") Double lat, 
                             @Param("lng") Double lng, 
                             @Param("radiusM") Double radiusM);
}
