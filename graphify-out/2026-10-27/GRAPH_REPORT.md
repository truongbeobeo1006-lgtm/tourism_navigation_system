# Graph Report - tourism_navigation_system  (2026-10-27)

## Corpus Check
- 21 files · ~8,589 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 274 nodes · 390 edges · 22 communities (9 shown, 13 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a34e5d65`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- POI API Controller
- Docker Infrastructure
- API Gateway Configuration
- Database & Cache Settings
- Poi
- Core Domain & Requirements
- Global Exception Handling
- POI Domain Models
- Service Application Entrypoints
- api-gateway
- Redis Template Configuration
- app.js
- poi-service
- 3-Tier System Architecture
- User Accounts Schema
- UI Localization Requirement
- Audio Language Requirement
- POI History Tracking
- API Gateway Maven Artifact
- POI Service Maven Artifact
- Parent Maven POM
- Project Readme

## God Nodes (most connected - your core abstractions)
1. `PoiResponse` - 16 edges
2. `Poi` - 15 edges
3. `PoiService` - 14 edges
4. `setupEventListeners()` - 14 edges
5. `startPlayback()` - 11 edges
6. `CreatePoiRequest` - 10 edges
7. `PoiAudioContent` - 10 edges
8. `PoiController` - 9 edges
9. `checkGeofenceAndDistances()` - 9 edges
10. `selectPoi()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Poi` --references--> `PoiAudioContent`  [EXTRACTED]
  backend/poi-service/src/main/java/com/poitour/poi/model/Poi.java → backend/poi-service/src/main/java/com/poitour/poi/model/PoiAudioContent.java
- `PoiService` --references--> `PoiRepository`  [EXTRACTED]
  backend/poi-service/src/main/java/com/poitour/poi/service/PoiService.java → backend/poi-service/src/main/java/com/poitour/poi/repository/PoiRepository.java
- `PoiController` --references--> `PoiService`  [EXTRACTED]
  backend/poi-service/src/main/java/com/poitour/poi/controller/PoiController.java → backend/poi-service/src/main/java/com/poitour/poi/service/PoiService.java
- `PoiRepository` --references--> `Poi`  [EXTRACTED]
  backend/poi-service/src/main/java/com/poitour/poi/repository/PoiRepository.java → backend/poi-service/src/main/java/com/poitour/poi/model/Poi.java

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **3-Tier Technical Architecture** — docs_prd_presentation_layer, docs_prd_business_logic_layer, docs_prd_data_access_layer [EXTRACTED 1.00]

## Communities (22 total, 13 thin omitted)

### Community 0 - "POI API Controller"
Cohesion: 0.10
Nodes (4): PoiController, CreatePoiRequest, PoiResponse, PoiService

### Community 1 - "Docker Infrastructure"
Cohesion: 0.09
Nodes (24): POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, interval, retries, test, timeout, container_name (+16 more)

### Community 2 - "API Gateway Configuration"
Cohesion: 0.10
Nodes (19): name, gateway, web, include, default-filters, globalcors, routes, cors-configurations (+11 more)

### Community 3 - "Database & Cache Settings"
Cohesion: 0.07
Nodes (26): name, redis, driver-class-name, hikari, password, url, username, ddl-auto (+18 more)

### Community 5 - "Core Domain & Requirements"
Cohesion: 0.17
Nodes (13): Admin Actor, Tourism Navigation System Overview, Analytics Schema, Narrations Schema, Tours Schema, TourZones Schema, Zones (POIs) Schema, Tourist Actor (+5 more)

### Community 9 - "api-gateway"
Cohesion: 0.09
Nodes (22): container_name, depends_on, environment, networks, ports, restart, container_name, depends_on (+14 more)

### Community 11 - "app.js"
Cohesion: 0.15
Nodes (31): availableVoices, calculateHaversine(), checkGeofenceAndDistances(), CONFIG, cycleSpeed(), dom, FALLBACK_POIS, fetchPois() (+23 more)

### Community 12 - "poi-service"
Cohesion: 0.11
Nodes (20): build, context, dockerfile, postgres, redis, SPRING_DATA_REDIS_HOST, SPRING_DATA_REDIS_PORT, SPRING_DATASOURCE_PASSWORD (+12 more)

### Community 13 - "3-Tier System Architecture"
Cohesion: 0.67
Nodes (3): Business Logic Layer (Services), Data Access Layer (Repositories), Presentation Layer (Controllers)

## Knowledge Gaps
- **15 isolated node(s):** `com.poitour:api-gateway`, `com.poitour:poi-service`, `com.poitour:tourism-navigation-system`, `Data Access Layer (Repositories)`, `Presentation Layer (Controllers)` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 126 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `services` connect `api-gateway` to `Docker Infrastructure`, `poi-service`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `setupEventListeners()` (e.g. with `cycleSpeed()` and `rewind10s()`) actually correct?**
  _`setupEventListeners()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `com.poitour:api-gateway`, `com.poitour:poi-service`, `com.poitour:tourism-navigation-system` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `POI API Controller` be split into smaller, more focused modules?**
  _Cohesion score 0.10241820768136557 - nodes in this community are weakly interconnected._
- **Why does `Poi` connect `Poi` to `POI API Controller`, `POI Domain Models`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Should `Docker Infrastructure` be split into smaller, more focused modules?**
  _Cohesion score 0.09420289855072464 - nodes in this community are weakly interconnected._
- **Why does `poi-service` connect `poi-service` to `api-gateway`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._