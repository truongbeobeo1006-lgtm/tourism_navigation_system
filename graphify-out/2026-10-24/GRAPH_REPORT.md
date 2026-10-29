# Graph Report - tourism_navigation_system  (2026-10-24)

## Corpus Check
- 21 files · ~7,727 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 279 nodes · 399 edges · 23 communities (10 shown, 13 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec51924b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- POI API Controller
- Docker Infrastructure
- API Gateway Configuration
- Database & Cache Settings
- POI Persistence & GeoRepository
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
- api-gateway

## God Nodes (most connected - your core abstractions)
1. `PoiResponse` - 16 edges
2. `Poi` - 15 edges
3. `PoiService` - 14 edges
4. `setupEventListeners()` - 11 edges
5. `CreatePoiRequest` - 10 edges
6. `PoiAudioContent` - 10 edges
7. `selectPoi()` - 10 edges
8. `startPlayback()` - 10 edges
9. `PoiController` - 9 edges
10. `postgres` - 9 edges

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

## Communities (23 total, 13 thin omitted)

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
Cohesion: 0.13
Nodes (14): container_name, depends_on, image, networks, ports, restart, volumes, networks (+6 more)

### Community 11 - "app.js"
Cohesion: 0.13
Nodes (36): availableVoices, calculateHaversineDistance(), checkGeofencesAndDistances(), closeDrawer(), CONFIG, dom, enableSimulationMode(), FALLBACK_POIS (+28 more)

### Community 12 - "poi-service"
Cohesion: 0.12
Nodes (16): postgres, redis, SPRING_DATA_REDIS_HOST, SPRING_DATA_REDIS_PORT, SPRING_DATASOURCE_PASSWORD, SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, container_name (+8 more)

### Community 13 - "3-Tier System Architecture"
Cohesion: 0.67
Nodes (3): Business Logic Layer (Services), Data Access Layer (Repositories), Presentation Layer (Controllers)

### Community 22 - "api-gateway"
Cohesion: 0.18
Nodes (12): build, container_name, depends_on, environment, networks, ports, restart, context (+4 more)

## Knowledge Gaps
- **15 isolated node(s):** `com.poitour:api-gateway`, `com.poitour:poi-service`, `com.poitour:tourism-navigation-system`, `Data Access Layer (Repositories)`, `Presentation Layer (Controllers)` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 126 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `services` connect `api-gateway` to `Docker Infrastructure`, `poi-service`, `api-gateway`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `setupEventListeners()` (e.g. with `closeDrawer()` and `openDrawer()`) actually correct?**
  _`setupEventListeners()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `com.poitour:api-gateway`, `com.poitour:poi-service`, `com.poitour:tourism-navigation-system` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `POI API Controller` be split into smaller, more focused modules?**
  _Cohesion score 0.09986504723346828 - nodes in this community are weakly interconnected._
- **Why does `Poi` connect `POI Persistence & GeoRepository` to `POI API Controller`, `POI Domain Models`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `Docker Infrastructure` be split into smaller, more focused modules?**
  _Cohesion score 0.09420289855072464 - nodes in this community are weakly interconnected._
- **Why does `poi-service` connect `poi-service` to `api-gateway`, `api-gateway`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._