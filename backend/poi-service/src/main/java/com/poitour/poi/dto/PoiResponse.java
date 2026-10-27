package com.poitour.poi.dto;

import lombok.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PoiResponse {

    private UUID id;
    private String name;
    private Double lat;
    private Double lng;
    private Integer radiusM;
    private String imageUrl;
    private Double distanceMeters;
    private String audioUrl;
    private String ttsScript;
    private Integer durationSec;
    private String langCode;
    private Boolean isActive;
    private List<String> availableLanguages;
}
