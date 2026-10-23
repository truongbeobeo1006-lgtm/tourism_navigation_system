
package com.tourism.tracking.service;

import com.tourism.tracking.model.TravelRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

interface TravelRouteRepository extends JpaRepository<TravelRoute, Long> {
}

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
        Optional<TravelRoute> result = repository.findById(id);

        if (result.isEmpty()) {
            return null;
        }

        TravelRoute existingRoute = result.get();

        if (updatedRoute.getName() != null) {
            existingRoute.setName(updatedRoute.getName());
        }

        if (updatedRoute.getPoiIds() != null) {
            existingRoute.setPoiIds(updatedRoute.getPoiIds());
        }

        return repository.save(existingRoute);
    }

    public TravelRoute updateRouteStops(Long id, List<Long> poiIds) {
        TravelRoute route = repository.findById(id).orElse(null);

        if (route == null) {
            return null;
        }

        route.setPoiIds(poiIds);
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

