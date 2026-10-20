package com.poitour.poi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePoiRequest {

    @NotBlank(message = "Tên POI không được để trống")
    private String name;

    @NotNull(message = "Vĩ độ (lat) là bắt buộc")
    private Double lat;

    @NotNull(message = "Kinh độ (lng) là bắt buộc")
    private Double lng;

    @Builder.Default
    private Integer radiusM = 30;

    private String imageUrl;
}
