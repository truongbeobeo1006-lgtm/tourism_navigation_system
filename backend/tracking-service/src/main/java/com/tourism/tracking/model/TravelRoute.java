
package com.tourism.tracking.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "travel_routes")
public class TravelRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên tuyến đường không được để trống")
    @Column(nullable = false)
    private String name;

    @ElementCollection
    @CollectionTable(
        name = "travel_route_pois",
        joinColumns = @JoinColumn(name = "route_id")
    )
    @OrderColumn(name = "stop_order")
    @Column(name = "poi_id", nullable = false)
    private List<Long> poiIds = new ArrayList<>();

    public TravelRoute() {
    }

    public TravelRoute(Long id, String name, List<Long> poiIds) {
        this.id = id;
        this.name = name;
        this.poiIds = poiIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getPoiIds() {
        return poiIds;
    }

    public void setPoiIds(List<Long> poiIds) {
        this.poiIds = poiIds;
    }
}
