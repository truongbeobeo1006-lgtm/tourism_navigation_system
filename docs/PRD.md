# Product Requirements Document (PRD)
## Project: Auto POI Audio Tourism Navigation System (Quận 1, TP. Hồ Chí Minh)

---

## 1. Tổng quan dự án (Overview)
- **Tên dự án:** Auto POI Audio Tourism Navigation System (Hệ thống dẫn đường & thuyết minh du lịch tự động tại Quận 1).
- **Mục tiêu:** Xây dựng nền tảng hỗ trợ du khách khám phá 6 địa danh lịch sử tiêu biểu tại Quận 1 thông qua bản đồ số tương tác, tự động phát thuyết minh đa ngôn ngữ theo vùng địa giới Geofencing 30m và quét mã QR vé tham quan; đồng thời cung cấp trang quản trị CMS theo dõi số liệu và thiết bị thời gian thực.
- **Công nghệ cốt lõi:**
  - **Backend:** Java Spring Boot (Microservices Architecture: API Gateway cổng 8080, POI Service cổng 8082, Tracking Service cổng 8083).
  - **Database & Cache:** PostgreSQL (Cơ sở dữ liệu quan hệ chính) kết hợp Redis (Bộ nhớ đệm tốc độ cao và nhịp tim thiết bị).
  - **Client Applications:** 
    - *Mobile Web Client (Dành cho Du khách):* Ứng dụng Web di động tương thích mọi thiết bị, định vị GPS thực tế `watchPosition`, bản đồ Leaflet, động cơ đọc giọng nói Web Speech API (TTS).
    - *Web Admin CMS (Dành cho Quản trị viên):* Bảng điều khiển thời gian thực theo dõi tổng lượt nghe, thiết bị online, biểu đồ phân tích và quản lý CRUD POI.

---

## 2. Các tác nhân hệ thống (Actors)
1. **Tourist (Du khách):** Quét mã QR nhận vé Tour Pass 24h, mở app trên điện thoại, theo dõi vị trí GPS, nghe thuyết minh tự động khi đến gần di tích.
2. **Admin (Quản trị viên):** Theo dõi số lượng thiết bị truy cập và tổng lượt nghe thời gian thực, quản lý danh sách POI, kịch bản thuyết minh và tuyến đường tham quan.

---

## 3. Danh sách 8 Use Cases cốt lõi (Core Use Cases)
- **UC01: Định vị vị trí GPS và Bản đồ du lịch số:** Hiển thị bản đồ Quận 1 với 6 danh thắng biểu tượng, theo dõi vị trí thực tế của du khách (`watchPosition`) kèm chế độ giả lập kiểm thử.
- **UC02: Tự động phát thuyết minh theo Geofencing:** Khi du khách bước vào bán kính 30m của di tích, hệ thống phát chuông thông báo, hiển thị banner và tự động phát bài thuyết minh tương ứng.
- **UC03: Tùy chọn ngôn ngữ hiển thị giao diện:** Hỗ trợ chuyển đổi giao diện song ngữ Tiếng Việt và Tiếng Anh.
- **UC04: Quét mã QR Vé truy cập (Tour Pass Onboarding):** Du khách quét mã QR để nhận vé tham quan 24h và tự động truy cập ngay vào hệ thống trên điện thoại mà không cần tải ứng dụng từ App Store/CH Play.
- **UC05: Bảng điều khiển Quản trị & Phân tích Thời gian thực (Dashboard):** Hiển thị tổng lượt nghe thuyết minh (lưu trữ bền vững), số thiết bị đang online theo thời gian thực (tự động tăng/giảm khi vào/thoát app), biểu đồ phân bổ khung giờ và bản đồ nhiệt Heatmap.
- **UC06: Quản lý danh mục điểm tham quan (POI CMS):** Quản trị viên thêm, sửa, xóa thông tin di tích, tọa độ GPS, bán kính kích hoạt và cập nhật tệp âm thanh kịch bản.
- **UC07: Tùy chọn ngôn ngữ thuyết minh âm thanh:** Hỗ trợ kịch bản thuyết minh song ngữ (Tiếng Việt và English) với các tùy chọn tốc độ phát (0.75x, 1.0x, 1.25x, 1.5x).
- **UC08: Quản lý Tuyến đường & Lộ trình tham quan (Travel Route Planning):** Quản lý danh sách các tuyến tour tham quan gợi ý và thứ tự ghé thăm các trạm dừng di tích.

---

## 4. Kiến trúc kỹ thuật (Technical Architecture)
1. **API Gateway (Port 8080):** Cổng trung chuyển điều hướng mọi request (`/api/v1/pois/**`, `/api/routes/**`, `/api/tracking/**`), tích hợp bộ lọc CORS toàn cục.
2. **POI Service (Port 8082):** Phụ trách quản lý thông tin di tích và kho nội dung âm thanh thuyết minh đa ngữ, tính toán khoảng cách Geofence.
3. **Tracking Service (Port 8083):** Phụ trách quản lý lộ trình tham quan (`TravelRoute`), bộ đệm Redis và theo dõi lưu vết di chuyển.
4. **Real-time Bridge Server (Port 3000):** Cầu nối đồng bộ thời gian thực ghi nhận nhịp tim (`DEVICE_ONLINE`, `DEVICE_OFFLINE`) và lưu trữ dữ liệu bền vững xuống đĩa (`stats-data.json`).

---

## 5. Cấu trúc Cơ sở dữ liệu chuẩn hóa (Database Schema)
- **`pois`:** Lưu thông tin 6 điểm di tích Quận 1 (`id`, `name`, `lat`, `lng`, `radius_m`, `is_active`).
- **`poi_audio_contents`:** Lưu bài thuyết minh theo từng ngôn ngữ (`poi_id`, `lang_code`, `audio_url`, `tts_script`).
- **`travel_routes` & `travel_route_pois`:** Lưu thông tin tuyến tour và danh sách thứ tự các điểm dừng.
- **`tickets`:** Lưu mã định danh vé du lịch (`ticket_code`, `valid_until`).
- **`users`:** Lưu thông tin tài khoản đăng nhập của Quản trị viên.
