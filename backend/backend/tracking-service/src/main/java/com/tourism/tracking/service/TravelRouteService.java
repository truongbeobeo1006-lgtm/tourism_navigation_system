
package com.tourism.tracking.service;

import com.tourism.tracking.model.TravelRoute;
import com.tourism.tracking.repository.TravelRouteRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TravelRouteService {

    private final TravelRouteRepository repository;

    public TravelRouteService(TravelRouteRepository repository) {
        this.repository = repository;
    }

    public TravelRoute createRoute(TravelRoute route) {
        route.setId(null);
        return repository.save(route);
    }

    public List<TravelRoute> getAllRoutes() {
        return repository.findAll();
    }

    public TravelRoute getRouteById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public TravelRoute updateRoute(Long id, TravelRoute updatedRoute) {
        TravelRoute existingRoute =
                repository.findById(id).orElse(null);

        if (existingRoute == null) {
            return null;
        }

        if (updatedRoute.getName() != null) {
            existingRoute.setName(updatedRoute.getName());
        }

        if (updatedRoute.getPoiIds() != null) {
            existingRoute.setPoiIds(
                    new ArrayList<>(updatedRoute.getPoiIds())
            );
        }

        return repository.save(existingRoute);
    }

    public TravelRoute updateRouteStops(Long id, List<Long> poiIds) {
        TravelRoute route = repository.findById(id).orElse(null);

        if (route == null) {
            return null;
        }

        route.setPoiIds(new ArrayList<>(poiIds));
        return repository.save(route);
    }

    public boolean deleteRoute(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }

        repository.deleteById(id);
        return true;
    }
}
