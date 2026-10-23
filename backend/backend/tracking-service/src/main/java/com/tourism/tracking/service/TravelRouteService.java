
package com.tourism.tracking.service;

import com.tourism.tracking.model.TravelRoute;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TravelRouteService {

    private final List<TravelRoute> routes = new ArrayList<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public TravelRoute createRoute(TravelRoute route) {
        route.setId(nextId.getAndIncrement());
        routes.add(route);
        return route;
    }

    public List<TravelRoute> getAllRoutes() {
        return new ArrayList<>(routes);
    }

    public TravelRoute getRouteById(Long id) {
        return routes.stream()
                .filter(route -> route.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public TravelRoute updateRoute(Long id, TravelRoute updatedRoute) {
        TravelRoute existingRoute = getRouteById(id);

        if (existingRoute == null) {
            return null;
        }

        existingRoute.setName(updatedRoute.getName());
        existingRoute.setPoiIds(updatedRoute.getPoiIds());

        return existingRoute;
    }

    public boolean deleteRoute(Long id) {
        return routes.removeIf(route -> route.getId().equals(id));
    }
}
