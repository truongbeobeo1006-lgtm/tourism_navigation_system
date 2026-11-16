package com.poitour.poi.repository;

import com.poitour.poi.model.PoiAudioContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PoiAudioContentRepository extends JpaRepository<PoiAudioContent, UUID> {
    Optional<PoiAudioContent> findByPoiIdAndLangCode(UUID poiId, String langCode);
    List<PoiAudioContent> findByPoiId(UUID poiId);
}
