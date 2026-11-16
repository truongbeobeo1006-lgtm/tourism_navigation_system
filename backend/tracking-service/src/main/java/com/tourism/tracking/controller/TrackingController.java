
package com.tourism.tracking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/tracking")
public class TrackingController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
            "service", "tracking-service",
            "status", "running"
        );
    }
}
