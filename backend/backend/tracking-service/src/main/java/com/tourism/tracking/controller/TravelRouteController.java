
package com.tourism.tracking.controller;

import com.tourism.tracking.model.TravelRoute;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/routes")
public class TravelRouteController {

    private final List<TravelRoute> routes = new ArrayList<>();
    private final AtomicLong nextId = new AtomicLong(1);

    @PostMapping
    public TravelRoute createRoute(@RequestBody TravelRoute route) {
        route.setId(nextId.getAndIncrement());
        routes.add(route);
        return route;
    }

    @GetMapping
    public List<TravelRoute> getAllRoutes() {
        return routes;
    }

    @GetMapping("/{id}")
    public TravelRoute getRouteById(@PathVariable Long id) {
        return routes.stream()
                .filter(route -> route.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PutMapping("/{id}")
    public TravelRoute updateRoute(
            @PathVariable Long id,
            @RequestBody TravelRoute updatedRoute) {

        for (TravelRoute route : routes) {
            if (route.getId().equals(id)) {
                route.setName(updatedRoute.getName());
                route.setPoiIds(updatedRoute.getPoiIds());
                return route;
            }
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteRoute(@PathVariable Long id) {
        boolean removed = routes.removeIf(
                route -> route.getId().equals(id)
        );

        return removed ? "Route deleted" : "Route not found";
    }
}
