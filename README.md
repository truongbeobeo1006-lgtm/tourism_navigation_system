# 🏛️ Quản lí du lịch Quận 1 (Auto POI Audio Tourism Navigation System)

> **Hệ thống dẫn đường và tự động phát thuyết minh đa ngôn ngữ cho du khách tại các điểm di tích Quận 1, TP. Hồ Chí Minh.**

---

## 📌 BẢNG QUẢN LÝ DỰ ÁN & TIẾN ĐỘ CÔNG VIỆC

👉 **Xem chi tiết bảng phân rã task và tiến độ từng thành viên tại:** [**`PROJECT_BOARD.md`**](./PROJECT_BOARD.md)

| Cột trạng thái | Số lượng Task | Mô tả ngắn |
| :--- | :---: | :--- |
| 🟢 **DONE** | **21 tasks** | Đã hoàn thành 100% tính năng lõi phục vụ bảo vệ đồ án và demo trực tiếp. |
| 🟡 **IN PROGRESS** | **6 tasks** | Đang tối ưu trải nghiệm thực địa, kiểm thử 4G và tài liệu báo cáo. |
| 🔵 **TODO** | **8 tasks** | Kế hoạch mở rộng đưa vào vận hành thương mại thực tế. |

---

## 👥 THÀNH VIÊN NHÓM DỰ ÁN

| STT | Thành viên | Tài khoản GitHub | Vai trò phụ trách |
| :---: | :--- | :--- | :--- |
| 1 | **Bảo Trương** *(Trưởng nhóm)* | `@truongbeobeo1006-lgtm` | Team Lead, Kiến trúc Microservices, POI Service, Admin CMS & Hạ tầng Cloudflare Tunnel |
| 2 | **Nguyễn Anh Kiệt** | `@Nguoidepthichngu` | Backend Tracking Service, Thuật toán Haversine Geofence 30m & Travel Route APIs |
| 3 | **Hồng Xiêm** | `@hongxiem0301-stack` | Frontend Bản đồ Leaflet, GPS Tracking UI, Thiết kế CSDL (ERD 7 bảng) & Tài liệu |

---

## 🚀 HƯỚNG DẪN KHỞI ĐỘNG HỆ THỐNG

### Cách 1: Khởi động tự động 1-Click (Khuyên dùng khi báo cáo)
* Nhấp đúp vào file **`start-app.bat`**: Hệ thống sẽ tự động bật Server cổng 3000, kết nối Cloudflare Tunnel cấp link công khai cho điện thoại 4G quét vé, và tự mở trang Quản trị Admin.
* Khi kết thúc: Nhấp đúp vào **`stop-app.bat`** để dừng các dịch vụ.

### Cách 2: Khởi động thủ công bằng dòng lệnh
```powershell
# 1. Bật Server Web & Admin CMS
node client-web\server.js

# 2. Bật đường hầm công khai cho điện thoại 4G quét từ xa
.\cloudflared.exe tunnel --protocol http2 --url http://127.0.0.1:3000
```

---

## 📚 TÀI LIỆU DỰ ÁN LIÊN QUAN
* 📋 **Bảng quản lý Task & Kanban**: [`PROJECT_BOARD.md`](./PROJECT_BOARD.md)
* 🗄️ **Lược đồ quan hệ dữ liệu CSDL (7 bảng)**: [`docs/ERD.md`](./docs/ERD.md)
* 📐 **Kịch bản khởi tạo CSDL PostgreSQL**: [`sql/init.sql`](./sql/init.sql)
