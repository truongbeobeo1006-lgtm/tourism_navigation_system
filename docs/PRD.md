# Product Requirements Document (PRD)
## Project: Tourism Navigation System

---

## 1. Tổng quan dự án (Overview)
- **Tên dự án:** Tourism Navigation System (Hệ thống điều hướng và thuyết minh du lịch thông minh).
- **Mục tiêu:** Xây dựng một nền tảng hỗ trợ du khách khám phá các điểm tham quan thông qua bản đồ số, tích hợp cơ chế tự động phát thuyết minh đa ngôn ngữ bằng định vị không gian (Geofencing) và quét mã QR, đồng thời cung cấp trang quản trị cho Admin.
- **Công nghệ cốt lõi:**
  - **Backend:** Java Spring Boot (Kiến trúc 3 lớp: Presentation, Business Logic, Data Access).
  - **Database:** SQL Server (Server chính) kết hợp SQLite (Mobile offline-first).
  - **Client:** .NET MAUI (Mobile App cho du khách) & Web Portal (Quản trị viên).

---

## 2. Các tác nhân hệ thống (Actors)
1. **Tourist (Du khách):** Người sử dụng ứng dụng di động để xem bản đồ, nhận thuyết minh tự động, quét mã QR và xem chi tiết điểm đến.
2. **Admin (Quản trị viên):** Quản lý toàn bộ hệ thống, kiểm duyệt nội dung, quản lý tài khoản và theo dõi biểu đồ thống kê.
---

## 3. Danh sách các Use Cases cốt lõi (8 Use Cases)
Hệ thống được thiết kế xoay quanh 8 chức năng chính sau:
- **UC01:** Xem bản đồ và vị trí GPS thời gian thực.
- **UC02:** Tự động phát thuyết minh âm thanh khi bước vào bán kính vùng định vị (Geofence - mặc định 9m).
- **UC03:** Tùy chọn ngôn ngữ hiển thị giao diện.
- **UC04:** Quét mã QR để kích hoạt phát thuyết minh tức thì.
- **UC05:** Xem thống kê và phân tích lượt nghe (Dashboard cho Admin).
- **UC06:** Quản lý nội dung điểm tham quan (Thêm/Sửa/Xóa POI, Audio, bản dịch).
- **UC07:** Tùy chọn ngôn ngữ thuyết minh âm thanh.
- **UC08:** Xem chi tiết điểm tham quan và lịch sử sử dụng/nghe audio cá nhân.

---

## 4. Kiến trúc kỹ thuật & Mô hình 3 lớp (3-Tier Architecture)
Mã nguồn Backend Java Spring Boot được phân chia rõ ràng thành các tầng:
1. **Presentation Layer (Controllers):** Tiếp nhận HTTP Request từ Client, kiểm tra tính hợp lệ và trả về dữ liệu dạng JSON (`TourController`, `ZonesController`, `AnalyticsController`, `AdminController`).
2. **Business Logic Layer (Services):** Chứa toàn bộ "não bộ" xử lý nghiệp vụ (thuật toán Geofence, xử lý logic kiểm duyệt, quản lý dữ liệu thống kê).
3. **Data Access Layer (Repositories):** Giao tiếp trực tiếp với cơ sở dữ liệu thông qua Spring Data JPA (`TourRepository`, `ZoneRepository`, `AnalyticsRepository`).

---

## 5. Tóm tắt Cấu trúc Cơ sở Dữ liệu (Database Schema)
- **Tours:** Lưu thông tin các tuyến đường du lịch (Id, Name, Description, ImageUrl, Duration).
- **Zones (POIs):** Lưu các điểm dừng chân (Id, Name, Latitude, Longitude, Radius).
- **TourZones:** Bảng trung gian liên kết Tour và POI (TourId, ZoneId, OrderIndex).
- **Narrations:** Quản lý kịch bản thuyết minh và file audio đa ngôn ngữ (ZoneId, Language, TextContent, FileUrl, ApprovalStatus).
- **Analytics:** Ghi nhận nhật ký hành vi và lịch sử sử dụng ẩn danh (SessionId, ZoneId, ActionType, DwellTimeSeconds, CreatedAt).
- **Users:** Quản lý tài khoản Admin và Vendor (Username, PasswordHash, Role, IsActive).