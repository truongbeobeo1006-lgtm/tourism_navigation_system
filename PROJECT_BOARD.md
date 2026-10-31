# 📌 BẢNG QUẢN LÝ DỰ ÁN & TIẾN ĐỘ CÔNG VIỆC (PROJECT BOARD)
## Dự án: Hệ Thống Thuyết Minh Du Lịch Tự Động Quận 1 (Auto POI Audio Tourism Navigation System)

---

## 👥 THÀNH VIÊN DỰ ÁN & PHÂN VAI TRÁCH NHIỆM

| STT | Thành viên | Tài khoản GitHub | Vai trò chính | Trọng tâm phụ trách |
| :---: | :--- | :--- | :--- |
| **1** | **Bảo Trương** *(Trưởng nhóm)* | `@truongbeobeo1006-lgtm` | **Team Lead & Core Backend / Fullstack** | Kiến trúc Microservices, API Gateway, POI Service, Admin CMS, Live Platform & Hạ tầng Cloudflare Tunnel |
| **2** | **Nguyễn Anh Kiệt** | `@Nguoidepthichngu` | **Backend Logic Engine** | Tracking Service, Thuật toán Haversine Geofence 30m, Travel Route APIs & Data Validation |
| **3** | **Hồng Xiêm** | `@hongxiem0301-stack` | **Frontend Map & Database Documentation** | Bản đồ tương tác Leaflet, GPS Tracking UI, Thiết kế CSDL (ERD 7 bảng), Sơ đồ quan hệ & Tối ưu UI/UX |

---

## 📊 TỔNG HỢP TIẾN ĐỘ DỰ ÁN (PROJECT STATUS OVERVIEW)

```
[████████████████████████████████████████░░░░░░░░] 75% Hoàn thành (Giai đoạn Demo & Báo cáo)
```

* 🟢 **DONE (Đã hoàn thành)**: **21 tasks** (100% các tính năng lõi phục vụ bảo vệ đồ án và demo trực tiếp).
* 🟡 **IN PROGRESS (Đang triển khai)**: **6 tasks** (Tối ưu trải nghiệm thực tế, kiểm thử tải nhiều thiết bị 4G và tài liệu báo cáo).
* 🔵 **TODO (Chưa làm / Backlog mở rộng)**: **8 tasks** (Mở rộng cho giai đoạn đưa vào vận hành thực địa thương mại).

---

## 📋 BẢNG KANBAN TIẾN ĐỘ CHI TIẾT (KANBAN BOARD)

### 🟢 1. CỘT "DONE" — CÔNG VIỆC ĐÃ HOÀN THÀNH

| Tên công việc chi tiết | Thành viên phụ trách | Phân hệ / Tệp liên quan | Use Case PRD | Trạng thái |
| :--- | :--- | :--- | :---: | :---: |
| **`TASK-CORE-01`** | Thiết kế kiến trúc tổng thể Microservices & Spring Cloud Gateway | **Bảo Trương** | `backend/api-gateway` | Kiến trúc | `DONE` |
| **`TASK-CORE-02`** | Thiết kế kịch bản CSDL chuẩn 7 bảng PostgreSQL & Seed data 6 di tích Quận 1 | **Bảo Trương** | `sql/init.sql` | CSDL | `DONE` |
| **`TASK-CORE-03`** | Xây dựng Spring Boot `poi-service` quản lý danh sách POI và kịch bản audio | **Bảo Trương** | `backend/poi-service` | UC01, UC03 | `DONE` |
| **`TASK-LIVE-01`** | Xây dựng Unified Live Platform chạy cổng 3000 phục vụ đồng thời Web & Admin | **Bảo Trương** | `client-web/server.js` | Nền tảng | `DONE` |
| **`TASK-LIVE-02`** | Tích hợp Cloudflare Tunnel HTTP/2 TCP (`cloudflared.exe`) vượt tường lửa mạng 4G | **Bảo Trương** | `cloudflared.exe`, `tunnel-url.txt` | Mạng | `DONE` |
| **`TASK-LIVE-03`** | Tạo API tự động nhận diện Public URL (`/api/tunnel-url`) chống rớt kết nối | **Bảo Trương** | `client-web/server.js` | Mạng | `DONE` |
| **`TASK-ADMIN-01`** | Thiết kế Dashboard Admin CMS hiện đại quản lý điểm tham quan | **Bảo Trương** | `admin-web/index.html`, `admin-web/style.css` | UC05, UC06 | `DONE` |
| **`TASK-ADMIN-02`** | Xây dựng hệ thống giám sát và bộ đếm thiết bị trực tuyến (Mobile vs Web) qua Heartbeat | **Bảo Trương** | `admin-web/app.js` | Giám sát | `DONE` |
| **`TASK-ADMIN-03`** | Thiết lập biểu đồ thống kê trực quan số lượt nghe từng POI thời gian thực | **Bảo Trương** | `admin-web/app.js` | UC06 | `DONE` |
| **`TASK-ADMIN-04`** | Xây dựng Modal tạo và quản lý mã QR vé Tour Pass 24h tự động gắn Public URL | **Bảo Trương** | `admin-web/app.js`, `admin-web/index.html` | UC04 | `DONE` |
| **`TASK-I18N-01`** | Bản địa hóa 100% 10 ngôn ngữ quốc tế cho giao diện Client & Thuyết minh Web Speech TTS | **Bảo Trương** | `client-web/app.js` | UC07 | `DONE` |
| **`TASK-ANALYTICS-01`** | Cấu hình cơ chế nhảy số lượt nghe kép (+2) phục vụ kịch bản trình diễn | **Bảo Trương** | `client-web/app.js` | Demo | `DONE` |
| **`TASK-SCRIPT-01`** | Viết bộ script khởi động và dừng 1-Click tự động hóa (`start-app.bat`, `stop-app.bat`) | **Bảo Trương** | `start-app.bat`, `stop-app.bat` | DevOps | `DONE` |
| **`TASK-TRACK-01`** | Khởi tạo cấu trúc microservice `tracking-service` trên nền Spring Boot | **Nguyễn Anh Kiệt** | `backend/tracking-service` | UC02 | `DONE` |
| **`TASK-TRACK-02`** | Cài đặt công thức Haversine tính toán khoảng cách Geofence 30m giữa du khách và POI | **Nguyễn Anh Kiệt** | `backend/tracking-service` | UC02 | `DONE` |
| **`TASK-TRACK-03`** | Triển khai REST Controller tiếp nhận GPS du khách (`/api/v1/tracking/location`) | **Nguyễn Anh Kiệt** | `backend/tracking-service` | UC02 | `DONE` |
| **`TASK-TRACK-04`** | Thêm cơ chế Data Validation cho đối tượng yêu cầu tuyến đường `TravelRoute` | **Nguyễn Anh Kiệt** | `backend/tracking-service` | Tuyến tour | `DONE` |
| **`TASK-MAP-01`** | Tích hợp bản đồ Leaflet OSM, định vị Marker 6 di tích Quận 1 và vòng tròn bán kính 30m | **Hồng Xiêm** | `client-web/app.js` | UC01 | `DONE` |
| **`TASK-MAP-02`** | Xây dựng thanh công cụ giả lập tọa độ GPS (Dinh Độc Lập 10m, Bưu Điện, Chợ Bến Thành) | **Hồng Xiêm** | `client-web/index.html`, `client-web/app.js` | Demo UC02 | `DONE` |
| **`TASK-MAP-03`** | Thêm Banner thông báo Geofence tự động kích hoạt kèm hiệu ứng nhấp nháy (`geofenceBanner`) | **Hồng Xiêm** | `client-web/index.html`, `client-web/style.css` | UC02, UC08 | `DONE` |
| **`TASK-MAP-04`** | Thêm nút Floating Recenter định vị tức thời về tọa độ thực tế của du khách | **Hồng Xiêm** | `client-web/index.html`, `client-web/style.css` | Bản đồ | `DONE` |
| **`TASK-DOCS-01`** | Soạn thảo tài liệu đặc tả Lược đồ CSDL chi tiết 7 bảng kèm từ điển dữ liệu (Data Dictionary) | **Hồng Xiêm** | `docs/ERD.md` | Tài liệu | `DONE` |
| **`TASK-DOCS-02`** | Thiết kế và xuất 3 sơ đồ quan hệ CSDL trực quan (`luoc_do_erd_7_bang.png`, `luoc_do_quan_he_du_lieu.png`, `luoc_do_quan_he_tham_chieu.png`) | **Hồng Xiêm** | `docs/*.png` | Tài liệu | `DONE` |
| **`TASK-FIX-01`** | Tối ưu hóa file cấu hình `.gitignore` và làm sạch lỗi cú pháp cuối hàm `notifyPoiPlay()` | **Hồng Xiêm** | `.gitignore`, `client-web/app.js` | Tối ưu | `DONE` |

---

### 🟡 2. CỘT "IN PROGRESS" — CÔNG VIỆC ĐANG TRIỂN KHAI

| Tên công việc chi tiết | Thành viên phụ trách | Mục tiêu cụ thể | Dự kiến hoàn thành | Trạng thái |
| :--- | :--- | :--- | :---: | :---: |
| **`TASK-PROG-01`** | Chuẩn bị kịch bản báo cáo và slide thuyết trình đồ án cho giáo viên | **Bảo Trương** | Hoàn thiện slide thuyết trình và hướng dẫn demo 5 bước | 01/11/2026 | `IN PROGRESS` |
| **`TASK-PROG-02`** | Kiểm thử chịu tải kết nối đồng thời từ nhiều thiết bị di động 4G qua Cloudflare | **Bảo Trương** | Đảm bảo 5-10 điện thoại quét vé cùng lúc không bị nghẽn | 02/11/2026 | `IN PROGRESS` |
| **`TASK-PROG-03`** | Tối ưu thuật toán lọc nhiễu GPS (bỏ qua tọa độ khi `accuracy > 25m`) | **Nguyễn Anh Kiệt** | Tránh kích hoạt nhầm Geofence khi GPS trôi | 02/11/2026 | `IN PROGRESS` |
| **`TASK-PROG-04`** | Hoàn thiện cơ chế Cooldown chống spam phát âm thanh lặp lại (Redis TTL 5 phút) | **Nguyễn Anh Kiệt** | Chỉ phát 1 lần trong 5 phút khi du khách đứng yên trong vùng | 03/11/2026 | `IN PROGRESS` |
| **`TASK-PROG-05`** | Tối ưu giao diện Responsive Mobile Web cho các kích thước màn hình nhỏ | **Hồng Xiêm** | Tương thích mượt mà trên iPhone SE, iPhone 13/14/15, Samsung Galaxy | 02/11/2026 | `IN PROGRESS` |
| **`TASK-PROG-06`** | Kiểm tra độ tương thích giọng đọc TTS trên các trình duyệt di động (iOS Safari & Chrome) | **Hồng Xiêm** | Đảm bảo giọng đọc phát chuẩn tiếng Việt và tiếng Anh khi chạm màn hình | 03/11/2026 | `IN PROGRESS` |

---

### 🔵 3. CỘT "TODO" — CÔNG VIỆC CHƯA LÀM (KẾ HOẠCH MỞ RỘNG VẬN HÀNH)

| Tên công việc dự kiến | Thành viên phụ trách | Mô tả yêu cầu kỹ thuật | Giai đoạn | Trạng thái |
| :--- | :--- | :--- | :---: | :---: |
| **`TASK-TODO-01`** | Xây dựng `auth-service` độc lập hoàn chỉnh | **Bảo Trương** | Đăng ký, đăng nhập tài khoản du khách, cấp phát JWT Token & phân quyền Role | Phase 2 | `TODO` |
| **`TASK-TODO-02`** | Tích hợp Rate Limiting trên API Gateway | **Bảo Trương** | Cài đặt thuật toán Redis Token Bucket giới hạn 100 req/min chống DDoS | Phase 2 | `TODO` |
| **`TASK-TODO-03`** | Đóng gói bộ Docker Compose chạy Full Microservices trên Cloud | **Bảo Trương** | Chạy đầy đủ PostgreSQL, Redis, MinIO, API Gateway, 3 Spring Boot Services | Phase 2 | `TODO` |
| **`TASK-TODO-04`** | Triển khai WebSocket Server cập nhật vị trí du khách theo thời gian thực | **Nguyễn Anh Kiệt** | Quản trị viên xem trực tiếp chấm di chuyển của khách trên bản đồ Admin | Phase 2 | `TODO` |
| **`TASK-TODO-05`** | Xây dựng thuật toán gợi ý lộ trình tham quan tối ưu (TSP Route Optimizer) | **Nguyễn Anh Kiệt** | Tự động sắp xếp thứ tự các điểm tham quan gần nhất theo vị trí xuất phát của khách | Phase 2 | `TODO` |
| **`TASK-TODO-06`** | Xây dựng chế độ Bản đồ Offline (Offline Map & Caching) | **Hồng Xiêm** | Tích hợp Service Worker + IndexedDB lưu trữ bản đồ và file audio khi mất sóng 4G | Phase 2 | `TODO` |
| **`TASK-TODO-07`** | Tích hợp la bàn điều hướng (Device Orientation API) | **Hồng Xiêm** | Xoay góc nhìn bản đồ theo hướng du khách đang cầm điện thoại bước đi | Phase 2 | `TODO` |
| **`TASK-TODO-08`** | Đóng gói ứng dụng thành PWA (Progressive Web App) | **Hồng Xiêm** | Thêm `manifest.json`, icon app, hỗ trợ cài đặt ra màn hình chính không cần App Store | Phase 2 | `TODO` |

---

## 👥 CHI TIẾT PHÂN RÃ CÔNG VIỆC THEO TỪNG THÀNH VIÊN (WBS)

### 1. 👨‍💻 BẢO TRƯƠNG (Team Lead & Core Backend)
* **Đã hoàn thành (`DONE`)**:
  * [x] Thiết kế kiến trúc tổng thể Microservices và định tuyến API Gateway.
  * [x] Viết kịch bản CSDL chuẩn 7 bảng `sql/init.sql` và dữ liệu mẫu 6 di tích Quận 1.
  * [x] Xây dựng `poi-service` phục vụ dữ liệu điểm tham quan.
  * [x] Xây dựng Unified Live Platform (`server.js`) chạy cổng 3000.
  * [x] Cấu hình và tích hợp Cloudflare Tunnel HTTP/2 TCP phục vụ kết nối 4G từ xa.
  * [x] Xây dựng Dashboard Quản trị Admin CMS (Giám sát thiết bị Online, Biểu đồ thống kê, Bộ tạo mã QR vé Tour Pass).
  * [x] Hoàn thiện bản dịch và giọng đọc TTS cho 10 ngôn ngữ quốc tế.
  * [x] Tạo kịch bản chạy tự động 1-Click `start-app.bat` và `stop-app.bat`.
* **Đang làm (`IN PROGRESS`)**:
  * [ ] Soạn tài liệu kiến trúc kỹ thuật và hướng dẫn báo cáo cho giáo viên.
  * [ ] Kiểm thử tải nhiều thiết bị kết nối qua 4G.
* **Kế hoạch tiếp theo (`TODO`)**:
  * [ ] Hoàn thiện `auth-service` (JWT Authentication).
  * [ ] Cấu hình Redis Rate Limiting trên API Gateway.
  * [ ] Đóng gói toàn bộ hệ thống lên Cloud Docker Compose.

---

### 2. 👨‍💻 NGUYỄN ANH KIỆT (Backend Logic Engine)
* **Đã hoàn thành (`DONE`)**:
  * [x] Khởi tạo dự án `tracking-service` trên nền tảng Spring Boot.
  * [x] Cài đặt công thức Haversine tính toán khoảng cách Geofence 30m.
  * [x] Xây dựng REST API nhận tọa độ GPS `/api/v1/tracking/location`.
  * [x] Bổ sung Data Validation cho `TravelRoute` request body.
  * [x] Chuẩn hóa cấu trúc thư mục mã nguồn `backend/tracking-service`.
* **Đang làm (`IN PROGRESS`)**:
  * [ ] Tích hợp bộ lọc nhiễu GPS dựa trên chỉ số `accuracy > 25m`.
  * [ ] Cài đặt cơ chế chống spam phát âm thanh lặp lại (Redis TTL Cooldown 5 phút).
* **Kế hoạch tiếp theo (`TODO`)**:
  * [ ] Xây dựng WebSocket Server phục vụ giám sát vị trí nhóm du khách.
  * [ ] Viết API gợi ý tuyến tham quan tối ưu khoảng cách di chuyển.

---

### 3. 👩‍💻 HỒNG XIÊM (Frontend Map & Database Documentation)
* **Đã hoàn thành (`DONE`)**:
  * [x] Xây dựng bản đồ du lịch Leaflet JS, vẽ marker 6 di tích Quận 1 và vùng kích hoạt 30m.
  * [x] Xây dựng thanh công cụ giả lập tọa độ GPS di chuyển để demo.
  * [x] Bổ sung Banner thông báo Geofence (`geofenceBanner`) kèm hiệu ứng trực quan khi bước vào vùng di tích.
  * [x] Thêm nút định vị vị trí thực tế của người dùng (`recenterBtn`).
  * [x] Soạn thảo đặc tả CSDL chi tiết 7 bảng trong `docs/ERD.md`.
  * [x] Xuất và lưu 3 ảnh sơ đồ quan hệ CSDL (`docs/*.png`).
  * [x] Sửa lỗi cú pháp Javascript và cập nhật `.gitignore`.
* **Đang làm (`IN PROGRESS`)**:
  * [ ] Tối ưu giao diện Responsive cho các dòng điện thoại màn hình nhỏ.
  * [ ] Kiểm tra độ tương thích giọng đọc TTS trên Safari iOS và Chrome Android.
* **Kế hoạch tiếp theo (`TODO`)**:
  * [ ] Xây dựng chế độ bản đồ ngoại tuyến (Offline Map với Service Worker & IndexedDB).
  * [ ] Tích hợp tính năng xoay bản đồ theo la bàn điện thoại.
  * [ ] Đóng gói PWA để cài đặt ứng dụng trực tiếp ra màn hình chính điện thoại.

---

## 📌 MA TRẬN PHÂN CÔNG TRÁCH NHIỆM (RACI MATRIX)

| Gói công việc | Bảo Trương | Nguyễn Anh Kiệt | Hồng Xiêm |
| :--- | :---: | :---: | :---: |
| **Kiến trúc hệ thống & API Gateway** | **A / R** | C | I |
| **Cơ sở dữ liệu & Kịch bản SQL** | **A / R** | C | C |
| **Tài liệu & Lược đồ CSDL (ERD)** | C | I | **A / R** |
| **Phát triển `poi-service`** | **A / R** | I | I |
| **Phát triển `tracking-service` (Geofence)** | C | **A / R** | I |
| **Giao diện Bản đồ Du khách (Client Web)** | C | I | **A / R** |
| **Giao diện Quản trị viên (Admin CMS)** | **A / R** | I | C |
| **Hạ tầng 4G Cloudflare & Script tự động** | **A / R** | I | I |
| **Bản địa hóa 10 Ngôn ngữ & Audio TTS** | **A / R** | I | C |
| **Kiểm thử tích hợp & Báo cáo đồ án** | **A / R** | R | R |

> *Ghi chú ký hiệu RACI:*
> * **R (Responsible)**: Người trực tiếp thực hiện công việc.
> * **A (Accountable)**: Người chịu trách nhiệm phê duyệt và kết quả cuối cùng.
> * **C (Consulted)**: Người được tham vấn ý kiến kỹ thuật.
> * **I (Informed)**: Người được thông báo tiến độ.
