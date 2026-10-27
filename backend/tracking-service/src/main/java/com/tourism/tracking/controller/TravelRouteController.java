
package com.tourism.tracking.controller;

import com.tourism.tracking.model.TravelRoute;
import com.tourism.tracking.service.TravelRouteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class TravelRouteController {

    private final TravelRouteService routeService;

    public TravelRouteController(TravelRouteService routeService) {
        this.routeService = routeService;
    }

    @PostMapping
    public ResponseEntity<TravelRoute> createRoute(
            @Valid @RequestBody TravelRoute route) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(routeService.createRoute(route));
    }

    @GetMapping
    public List<TravelRoute> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TravelRoute> getRouteById(
            @PathVariable Long id) {
        TravelRoute route = routeService.getRouteById(id);

        if (route == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(route);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TravelRoute> updateRoute(
            @PathVariable Long id,
            @Valid @RequestBody TravelRoute updatedRoute) {
        TravelRoute route =
                routeService.updateRoute(id, updatedRoute);

        if (route == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(route);
    }

    @PutMapping("/{id}/stops")
    public ResponseEntity<TravelRoute> updateRouteStops(
            @PathVariable Long id,
            @RequestBody List<Long> poiIds) {
        TravelRoute route =
                routeService.updateRouteStops(id, poiIds);

        if (route == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(route);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoute(
            @PathVariable Long id) {
        if (!routeService.deleteRoute(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
