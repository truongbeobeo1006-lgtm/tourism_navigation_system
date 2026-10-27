package com.poitour.poi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaveAudioRequest {

    @NotBlank(message = "Mã ngôn ngữ không được để trống (ví dụ: vi, en, zh...)")
    private String langCode;

    private String audioUrl;

    private String ttsScript;

    @Builder.Default
    private Integer durationSec = 30;
}
