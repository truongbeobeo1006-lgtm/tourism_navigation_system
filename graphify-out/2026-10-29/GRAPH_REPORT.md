# Graph Report - tourism_navigation_system  (2026-10-27)

## Corpus Check
- 38 files · ~26,793 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .css 2)

## Summary
- 476 nodes · 744 edges · 28 communities (15 shown, 13 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0d34cd0a`
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
- Service Application Entrypoints
- admin-web/app.js
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
- TravelRoute
- datasource
- 📖 Bảng Ánh Xạ Chi Tiết 8 Lược Đồ Hoạt Động (Activity Diagrams) Tới Từng Dòng Code
- 3. Đặc tả chi tiết từng bảng dữ liệu
- com.tourism:tracking-service

## God Nodes (most connected - your core abstractions)
1. `TravelRoute` - 24 edges
2. `PoiResponse` - 22 edges
3. `PoiService` - 19 edges
4. `Poi` - 15 edges
5. `setupEventListeners()` - 15 edges
6. `PoiAudioContent` - 14 edges
7. `PoiController` - 13 edges
8. `TravelRouteService` - 13 edges
9. `startPlayback()` - 13 edges
10. `TravelRouteController` - 11 edges

## Surprising Connections (you probably didn't know these)
- `2. Bảng ánh xạ từng bước tới dòng code:` --references--> `initChart()`  [INFERRED]
  docs/UC_CODE_MAPPING.md → admin-web/app.js
- `2. Bảng ánh xạ từng bước tới dòng code:` --references--> `renderPoiTable()`  [INFERRED]
  docs/UC_CODE_MAPPING.md → admin-web/app.js
- `2. Bảng ánh xạ từng bước tới dòng code:` --references--> `pollRealtimeStats()`  [INFERRED]
  docs/UC_CODE_MAPPING.md → admin-web/app.js
- `2. Bảng ánh xạ từng bước tới dòng code:` --references--> `loadPersistentStats()`  [INFERRED]
  docs/UC_CODE_MAPPING.md → client-web/server.js
- `2. Bảng ánh xạ từng bước tới dòng code:` --references--> `initHeatmapMap()`  [INFERRED]
  docs/UC_CODE_MAPPING.md → admin-web/app.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **3-Tier Technical Architecture** — docs_prd_presentation_layer, docs_prd_business_logic_layer, docs_prd_data_access_layer [EXTRACTED 1.00]

## Communities (28 total, 13 thin omitted)

### Community 0 - "POI API Controller"
Cohesion: 0.07
Nodes (6): PoiController, CreatePoiRequest, PoiResponse, SaveAudioRequest, UpdatePoiRequest, PoiService

### Community 1 - "Docker Infrastructure"
Cohesion: 0.06
Nodes (38): container_name, depends_on, image, networks, ports, restart, volumes, POSTGRES_DB (+30 more)

### Community 2 - "API Gateway Configuration"
Cohesion: 0.10
Nodes (19): name, gateway, web, include, default-filters, globalcors, routes, cors-configurations (+11 more)

### Community 3 - "Database & Cache Settings"
Cohesion: 0.07
Nodes (26): name, redis, driver-class-name, hikari, password, url, username, ddl-auto (+18 more)

### Community 4 - "Poi"
Cohesion: 0.09
Nodes (4): Poi, PoiAudioContent, PoiAudioContentRepository, PoiRepository

### Community 5 - "Core Domain & Requirements"
Cohesion: 0.17
Nodes (13): Admin Actor, Tourism Navigation System Overview, Analytics Schema, Narrations Schema, Tours Schema, TourZones Schema, Zones (POIs) Schema, Tourist Actor (+5 more)

### Community 8 - "Service Application Entrypoints"
Cohesion: 0.26
Nodes (3): ApiGatewayApplication, PoiServiceApplication, TrackingServiceApplication

### Community 9 - "admin-web/app.js"
Cohesion: 0.07
Nodes (34): audioForm, audioModal, DEFAULT_Q1_POIS, fetchPoisFromBackend(), getPoiThumbHtml(), initChart(), initHeatmapMap(), initModalHandlers() (+26 more)

### Community 11 - "app.js"
Cohesion: 0.11
Nodes (45): applyUiTranslations(), availableVoices, calculateHaversine(), checkGeofenceAndDistances(), CONFIG, cycleSpeed(), dom, FALLBACK_POIS (+37 more)

### Community 12 - "poi-service"
Cohesion: 0.07
Nodes (28): build, container_name, depends_on, environment, networks, ports, restart, context (+20 more)

### Community 13 - "3-Tier System Architecture"
Cohesion: 0.67
Nodes (3): Business Logic Layer (Services), Data Access Layer (Repositories), Presentation Layer (Controllers)

### Community 22 - "TravelRoute"
Cohesion: 0.11
Nodes (4): TravelRouteController, TravelRoute, TravelRouteRepository, TravelRouteService

### Community 23 - "datasource"
Cohesion: 0.07
Nodes (26): name, redis, driver-class-name, hikari, password, url, username, ddl-auto (+18 more)

### Community 24 - "📖 Bảng Ánh Xạ Chi Tiết 8 Lược Đồ Hoạt Động (Activity Diagrams) Tới Từng Dòng Code"
Cohesion: 0.09
Nodes (21): 1. Lược đồ hoạt động rút gọn:, 1. Lược đồ hoạt động rút gọn:, 1. Lược đồ hoạt động rút gọn:, 1. Lược đồ hoạt động rút gọn:, 1. Lược đồ hoạt động rút gọn:, 1. Lược đồ hoạt động rút gọn:, 1. Lược đồ hoạt động rút gọn:, 1. Lược đồ hoạt động rút gọn: (+13 more)

### Community 25 - "3. Đặc tả chi tiết từng bảng dữ liệu"
Cohesion: 0.15
Nodes (12): 1. Sơ đồ ERD tổng thể (Mermaid `erDiagram`), 2. Giải thích mối quan hệ giữa các bảng ( Cardinality & Relationships ), 3.1. Bảng `pois` (Điểm tham quan Di tích), 3.2. Bảng `poi_audio_contents` (Nội dung Âm thanh & Kịch bản Đa ngôn ngữ), 3.3. Bảng `users` (Người dùng & Quản trị viên), 3.4. Bảng `usage_history` (Lịch sử Nghe & Thống kê Lượt nghe), 3.5. Bảng `access_tickets` (Vé QR Tour Pass 24h), 3.6. Bảng `tours`, `tour_pois` & `travel_routes`, `travel_route_pois` (Lộ trình Tham quan) (+4 more)

## Knowledge Gaps
- **16 isolated node(s):** `com.poitour:api-gateway`, `com.poitour:poi-service`, `com.tourism:tracking-service`, `com.poitour:tourism-navigation-system`, `Data Access Layer (Repositories)` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 209 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `2. Bảng ánh xạ từng bước tới dòng code:` connect `app.js` to `📖 Bảng Ánh Xạ Chi Tiết 8 Lược Đồ Hoạt Động (Activity Diagrams) Tới Từng Dòng Code`, `Poi`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **What connects `com.poitour:api-gateway`, `com.poitour:poi-service`, `com.tourism:tracking-service` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `POI API Controller` be split into smaller, more focused modules?**
  _Cohesion score 0.06821787414066631 - nodes in this community are weakly interconnected._
- **Why does `2. Bảng ánh xạ từng bước tới dòng code:` connect `📖 Bảng Ánh Xạ Chi Tiết 8 Lược Đồ Hoạt Động (Activity Diagrams) Tới Từng Dòng Code` to `POI API Controller`, `admin-web/app.js`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `Docker Infrastructure` be split into smaller, more focused modules?**
  _Cohesion score 0.05668016194331984 - nodes in this community are weakly interconnected._
- **Why does `renderPoiTable()` connect `admin-web/app.js` to `📖 Bảng Ánh Xạ Chi Tiết 8 Lược Đồ Hoạt Động (Activity Diagrams) Tới Từng Dòng Code`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Should `API Gateway Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._