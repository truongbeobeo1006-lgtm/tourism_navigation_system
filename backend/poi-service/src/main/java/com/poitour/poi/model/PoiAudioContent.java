package com.poitour.poi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "poi_audio_contents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PoiAudioContent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "poi_id", nullable = false)
    @JsonIgnore
    private Poi poi;

    @Column(name = "lang_code", nullable = false, length = 10)
    private String langCode;

    @Column(name = "audio_url")
    private String audioUrl;

    @Column(name = "tts_script")
    private String ttsScript;

    @Column(name = "duration_sec")
    private Integer durationSec;
}
