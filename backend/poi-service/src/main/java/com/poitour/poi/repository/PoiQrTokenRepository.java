package com.poitour.poi.repository;

import com.poitour.poi.model.PoiQrToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PoiQrTokenRepository extends JpaRepository<PoiQrToken, UUID> {

    Optional<PoiQrToken> findByToken(String token);
}
