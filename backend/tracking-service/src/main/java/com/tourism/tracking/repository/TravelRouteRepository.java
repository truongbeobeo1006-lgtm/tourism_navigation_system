
package com.tourism.tracking.repository;

import com.tourism.tracking.model.TravelRoute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelRouteRepository
        extends JpaRepository<TravelRoute, Long> {
}
