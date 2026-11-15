# Lược Đồ Luồng Dữ Liệu Chuẩn (DFD - Data Flow Diagram)
## Đồ án: Hệ Thống Dẫn Đường & Thuyết Minh Du Lịch Tự Động (Quận 1, TP. Hồ Chí Minh)

Hệ thống sơ đồ luồng dữ liệu được xây dựng chuẩn xác cho đồ án thực tế, áp dụng quy ước hình học và phong cách trình bày mẫu:
* **Thực thể ngoài (External Entities):** **Hình chữ nhật màu xanh** (`#1687C1`, font trắng).
  * `E1 · KHÁCH DU LỊCH`
  * `E2 · QUẢN TRỊ VIÊN`
* **Chức năng xử lý (Processes):** **Hình tròn màu cam** (`#F5A623`, font trắng).
  * `0` (ở Mức 0), `1.0` đến `5.0` (ở Mức 1), `3.1` đến `4.3` (ở Mức 2).
* **Kho dữ liệu (Data Stores):** **Nằm giữa 2 dấu gạch ngang song song trên và dưới** (`SIDES="TB"`), tương ứng đúng 7 bảng CSDL PostgreSQL.
* **Mã luồng dữ liệu:** Đánh số khoa học từ **`F01` đến `F20`**, bảo toàn tính nhất quán xuyên suốt từ Mức 0 qua Mức 1 và Mức 2.

---

## 1. DFD Mức 0: Sơ đồ Ngữ cảnh (Context Diagram)

Sơ đồ ngữ cảnh mô tả tương tác giữa hệ thống trung tâm `0` và 2 tác nhân ngoài qua **20 luồng dữ liệu (`F01 - F20`)**:

![DFD Mức 0 - Sơ đồ ngữ cảnh](file:///Users/thaonguyen/tourism_navigation_system/docs/luoc_do_dfd_muc_0.png)

### Bảng 20 Luồng Dữ Liệu Đồ Án (F01 - F20):
| Mã luồng | Hướng luồng | Tên và ý nghĩa luồng dữ liệu trong đồ án |
| :---: | :---: | :--- |
| **F01** | `E1 -> P0` | Mã QR vé tham quan (Tour Pass) |
| **F02** | `P0 -> E1` | Trạng thái kích hoạt vé 24h |
| **F03** | `E1 -> P0` | Tọa độ GPS thời gian thực (watchPosition) |
| **F04** | `P0 -> E1` | Bản đồ số 6 di tích Quận 1 |
| **F05** | `P0 -> E1` | Cảnh báo bước vào vùng Geofence (30m) |
| **F06** | `P0 -> E1` | Bài thuyết minh âm thanh / giọng đọc TTS tự động |
| **F07** | `E1 -> P0` | Tùy chọn ngôn ngữ (vi, en,...) & giọng đọc |
| **F08** | `E1 -> P0` | Lệnh điều khiển audio (phát/dừng/tua/tốc độ) |
| **F09** | `E1 -> P0` | Yêu cầu thông tin di tích & lộ trình tour |
| **F10** | `P0 -> E1` | Chi tiết di tích, tuyến tham quan gợi ý |
| **F11** | `E1 -> P0` | Nhịp tim thiết bị (heartbeat), phiên online |
| **F12** | `E2 -> P0` | Thông tin đăng nhập quản trị |
| **F13** | `P0 -> E2` | Token / trạng thái xác thực Admin |
| **F14** | `E2 -> P0` | Dữ liệu di tích POI (tọa độ, bán kính 30m, ảnh) |
| **F15** | `P0 -> E2` | Kết quả cập nhật di tích POI |
| **F16** | `E2 -> P0` | Kịch bản thuyết minh đa ngữ & file âm thanh |
| **F17** | `P0 -> E2` | Kết quả cập nhật kịch bản âm thanh |
| **F18** | `E2 -> P0` | Dữ liệu tuyến tour & thứ tự trạm dừng |
| **F19** | `E2 -> P0` | Yêu cầu thống kê lượt nghe & thiết bị |
| **F20** | `P0 -> E2` | Báo cáo Dashboard, số thiết bị online, tổng lượt nghe |

---

## 2. DFD Mức 1: Sơ đồ Phân rã Hệ thống (Level 1 DFD)

Phân rã chức năng trung tâm thành **5 Chức năng xử lý (Hình tròn cam)**, liên kết với **2 Thực thể ngoài (Hình chữ nhật xanh)** và **7 Kho dữ liệu CSDL PostgreSQL (Nằm giữa 2 gạch ngang trên và dưới)**:

![DFD Mức 1 - Phân rã hệ thống](file:///Users/thaonguyen/tourism_navigation_system/docs/luoc_do_dfd_muc_1.png)

### Chi tiết 5 Chức năng xử lý (Hình tròn):
1. **`1.0 XÁC THỰC & VÉ THAM QUAN`:**
   * Tiếp nhận mã vé `F01`, nhịp tim thiết bị `F11`; Phản hồi trạng thái vé `F02`.
   * Tiếp nhận đăng nhập `F12`, cấp token `F13` cho Admin.
   * Đối chiếu kho `= D1 | users =` và kích hoạt vé trong kho `= D2 | access_tickets =`.
2. **`2.0 QUẢN LÝ POI & TUYẾN TOUR`:**
   * Cung cấp thông tin di tích `F10` theo yêu cầu `F09` của khách.
   * Admin cập nhật danh mục di tích (`F14`, `F15`), kịch bản âm thanh (`F16`, `F17`), lộ trình tour `F18`.
   * Lưu trữ vào các kho `= D3 | pois =`, `= D4 | poi_audio_contents =`, `= D5 | tours =` và `= D6 | tour_pois =`.
3. **`3.0 ĐỊNH VỊ & GIÁM SÁT GEOFENCE 30m`:**
   * Tiếp nhận tọa độ `F03 · Tọa độ GPS thời gian thực`.
   * Đọc tọa độ 6 di tích từ kho `= D3 | pois =`, hiển thị `F04 · Bản đồ số 6 di tích`.
   * Tính khoảng cách Haversine liên tục; Khi bước vào bán kính $\le 30m \to$ phát cảnh báo `F05` và gửi tín hiệu kích hoạt vùng 30m sang tiến trình 4.0.
4. **`4.0 THUYẾT MINH ÂM THANH TỰ ĐỘNG (TTS)`:**
   * Tiếp nhận tùy chọn ngôn ngữ `F07`, lệnh điều khiển audio `F08`.
   * Đọc bài thuyết minh theo ngôn ngữ từ kho `= D4 | poi_audio_contents =`.
   * Tự động phát âm thanh `F06` cho khách tham quan; Gửi thông điệp sự kiện đã nghe sang tiến trình 5.0.
5. **`5.0 GHI NHẬN & THỐNG KÊ LƯỢT NGHE`:**
   * Ghi nhận mỗi lượt nghe thành công vào kho `= D7 | usage_history =`.
   * Tiếp nhận yêu cầu `F19` từ Admin $\to$ Tổng hợp số liệu xuất báo cáo `F20 · Dashboard, thiết bị online, tổng lượt nghe`.

---

## 3. DFD Mức 2: Phân Hệ Định Vị Geofence & Thuyết Minh Tự Động (Level 2 DFD)

Phân rã chi tiết chuyên sâu phân hệ cốt lõi nhất của đồ án (Tiến trình `3.0` & `4.0`):

![DFD Mức 2 - Phân hệ Geofence & Thuyết minh](file:///Users/thaonguyen/tourism_navigation_system/docs/luoc_do_dfd_muc_2.png)

* **`3.1 Tiếp nhận & Chuẩn hóa GPS`:** Nhận `F03 · Tọa độ GPS`, chuẩn hóa kinh độ/vĩ độ, hiển thị `F04 · Bản đồ số 6 di tích`.
* **`3.2 Tính toán Khoảng cách Haversine`:** Đọc tọa độ từ kho `= D3 | pois =`, tính khoảng cách mét thực tế.
* **`3.3 So khớp Vùng 30m & Cooldown`:** Kiểm tra bán kính $d \le 30m$ và Cooldown 60s; Trả về `F05 · Cảnh báo vào vùng Geofence (30m)` và gửi tín hiệu kích hoạt Geofence sang 4.1.
* **`4.1 Truy vấn Kịch bản Đa ngữ`:** Nhận `F07 · Tùy chọn ngôn ngữ`, đọc kịch bản thuyết minh văn bản và audio URL từ kho `= D4 | poi_audio_contents =`.
* **`4.2 Điều phối Phát âm TTS`:** Nhận lệnh điều khiển `F08`, điều phối phát âm thanh `F06 · Bài thuyết minh âm thanh / TTS` qua loa/tai nghe thiết bị.
* **`4.3 Ghi nhận Nhật ký Lượt nghe`:** Ghi nhận metadata phiên nghe (`user_id`, `poi_id`, `trigger_type`, `listened_at`) vào kho `= D7 | usage_history =`.
