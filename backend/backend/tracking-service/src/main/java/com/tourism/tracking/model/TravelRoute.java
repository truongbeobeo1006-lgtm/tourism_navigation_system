
package com.tourism.tracking.model;

import java.util.ArrayList;
import java.util.List;

public class TravelRoute {

    private Long id;
    private String name;
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
