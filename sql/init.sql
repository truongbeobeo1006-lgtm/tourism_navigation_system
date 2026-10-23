-- =======================================================
-- POI TOUR APP — Database Init Script
-- Chạy tự động 1 lần khi PostgreSQL khởi động lần đầu
-- =======================================================

-- Bật extension tạo UUID tự động
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =======================================================
-- BẢNG 1: users
-- Lưu thông tin tài khoản du khách và admin
-- =======================================================
CREATE TABLE IF NOT EXISTS users (
    id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'TOURIST',
    -- TOURIST = du khách dùng app
    -- ADMIN   = quản trị viên dùng CMS

    lang_preference VARCHAR(10) NOT NULL DEFAULT 'vi',
    -- Ngôn ngữ ưa thích: 'vi', 'en', 'zh', 'fr', 'ja', 'ko'...
    -- Dùng cho UC07: Chọn ngôn ngữ trong cài đặt

    created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- =======================================================
-- BẢNG 2: pois
-- Lưu thông tin các điểm tham quan (Point of Interest)
-- =======================================================
CREATE TABLE IF NOT EXISTS pois (
    id         UUID             PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(255)     NOT NULL,
    lat        DOUBLE PRECISION NOT NULL,
    -- Vĩ độ (latitude).  VD: 10.7769
    lng        DOUBLE PRECISION NOT NULL,
    -- Kinh độ (longitude). VD: 106.6953
    radius_m   INTEGER          NOT NULL DEFAULT 30,
    -- Bán kính geofence (mét). Vào trong vùng này → tự phát audio (UC02)
    image_url  TEXT,
    -- URL ảnh đại diện, lưu trên MinIO
    is_active  BOOLEAN          NOT NULL DEFAULT TRUE,
    -- TRUE = hiển thị trên map | FALSE = ẩn (admin bật/tắt theo UC06)
    created_at TIMESTAMP        NOT NULL DEFAULT NOW()
);

-- =======================================================
-- BẢNG 3: poi_audio_contents
-- Nội dung audio cho từng POI theo từng ngôn ngữ
-- 1 POI có thể có nhiều ngôn ngữ (vi, en, zh, fr...)
-- =======================================================
CREATE TABLE IF NOT EXISTS poi_audio_contents (
    id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    poi_id       UUID        NOT NULL REFERENCES pois(id) ON DELETE CASCADE,
    lang_code    VARCHAR(10) NOT NULL,
    -- Mã ngôn ngữ chuẩn ISO 639-1: 'vi', 'en', 'zh', 'fr', 'ja', 'ko', 'de'...
    audio_url    TEXT,
    -- URL file .mp3 trên MinIO
    -- VD: http://localhost:9000/audio-files/poi-{id}-vi.mp3
    tts_script   TEXT,
    -- Kịch bản văn bản nếu chưa có file audio (dùng để TTS sau này)
    duration_sec INTEGER,
    -- Thời lượng audio (giây), hiển thị trên thanh tiến trình (UC03)

    UNIQUE (poi_id, lang_code)
    -- Mỗi POI chỉ có 1 audio cho mỗi ngôn ngữ
);

-- =======================================================
-- BẢNG 4: usage_history
-- Lịch sử nghe của du khách
-- Dùng cho UC08 (user xem lịch sử) và UC05 (admin xem thống kê)
-- =======================================================
CREATE TABLE IF NOT EXISTS usage_history (
    id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    poi_id       UUID        NOT NULL REFERENCES pois(id) ON DELETE CASCADE,
    lang_code    VARCHAR(10) NOT NULL,
    trigger_type VARCHAR(20) NOT NULL,
    -- Cách nghe:
    --   'GPS_GEOFENCE' = tự động khi đi vào vùng 30m (UC02)
    --   'QR_CODE'      = quét mã QR (UC04)
    --   'MANUAL'       = bấm nút nghe thủ công (UC08)
    listened_at  TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- Index để query nhanh lịch sử theo user
CREATE INDEX IF NOT EXISTS idx_usage_history_user_id
    ON usage_history (user_id, listened_at DESC);

-- Index để query thống kê theo POI (UC05)
CREATE INDEX IF NOT EXISTS idx_usage_history_poi_id
    ON usage_history (poi_id);

-- =======================================================
-- BẢNG 5: access_tickets
-- Mã QR vé truy cập App dành cho Du khách (Quét 1 lần, hiệu lực 24h)
-- Thay thế đăng nhập mật khẩu trên mobile: Quét QR -> nhận JWT Session 24h
-- =======================================================
CREATE TABLE IF NOT EXISTS access_tickets (
    id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_code    VARCHAR(64) UNIQUE NOT NULL,
    -- Mã token in trong mã QR của vé tham quan (VD: 'TOUR-PASS-2024-SG')
    status         VARCHAR(20) NOT NULL DEFAULT 'NEW',
    -- 'NEW' (chưa quét) | 'ACTIVE' (đang dùng) | 'EXPIRED' (hết hạn 24h)
    activated_at   TIMESTAMP,
    -- Thời điểm du khách quét mã lần đầu tiên
    expires_at     TIMESTAMP,
    -- Thời điểm hết hạn (chính xác bằng activated_at + 24 giờ)
    duration_hours INTEGER     NOT NULL DEFAULT 24,
    created_at     TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- =======================================================
-- BẢNG 6: tours — Tuyến tham quan
-- =======================================================
CREATE TABLE IF NOT EXISTS tours (
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    -- VD: "Tour Quận 1", "Tour Di Tích Lịch Sử TP.HCM"
    description TEXT,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- =======================================================
-- BẢNG 7: tour_pois — POI thuộc tuyến nào, thứ tự bao nhiêu
-- =======================================================
CREATE TABLE IF NOT EXISTS tour_pois (
    tour_id     UUID    NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
    poi_id      UUID    NOT NULL REFERENCES pois(id)  ON DELETE CASCADE,
    order_index INTEGER NOT NULL DEFAULT 0,
    -- Thứ tự trong tuyến: 1, 2, 3...
    PRIMARY KEY (tour_id, poi_id)
);

-- =======================================================
-- DỮ LIỆU MẪU (SEED DATA)
-- Tuyến tham quan di tích lịch sử trung tâm Quận 1, TP.HCM
-- Tọa độ GPS chuẩn xác thực tế
-- =======================================================

-- 1. Thêm 6 điểm POI trung tâm Quận 1
INSERT INTO pois (name, lat, lng, radius_m, is_active) VALUES
    ('Dinh Độc Lập',           10.77692, 106.69531, 30, TRUE),
    ('Nhà Thờ Đức Bà',         10.77972, 106.69904, 30, TRUE),
    ('Bưu Điện Trung Tâm',     10.77957, 106.69930, 30, TRUE),
    ('Nhà Hát Thành Phố',      10.77665, 106.70318, 30, TRUE),
    ('Chợ Bến Thành',          10.77253, 106.69803, 30, TRUE),
    ('Phố Đi Bộ Nguyễn Huệ',  10.77362, 106.70408, 40, TRUE)
ON CONFLICT DO NOTHING;

-- 2. Thêm bài thuyết minh (Tiếng Việt & Tiếng Anh) cho từng điểm POI Quận 1

-- POI 1: Dinh Độc Lập
INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'vi', 'Chào mừng bạn đến Dinh Độc Lập, còn gọi là Dinh Thống Nhất. Đây là công trình lịch sử mang tính biểu tượng của Sài Gòn, chứng kiến thời khắc lịch sử ngày 30 tháng 4 năm 1975.', 30
FROM pois p WHERE p.name = 'Dinh Độc Lập'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'en', 'Welcome to the Independence Palace, also known as Reunification Palace. This iconic historical landmark in District 1 witnessed the historic moment of reunification on April 30, 1975.', 30
FROM pois p WHERE p.name = 'Dinh Độc Lập'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

-- POI 2: Nhà Thờ Đức Bà
INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'vi', 'Bạn đang đứng trước Nhà Thờ Đức Bà Sài Gòn, kiệt tác kiến trúc Gothic cổ kính được xây dựng từ năm 1877 với toàn bộ gạch ngói nhập khẩu từ Marseille, Pháp.', 35
FROM pois p WHERE p.name = 'Nhà Thờ Đức Bà'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'en', 'You are standing before Notre-Dame Cathedral of Saigon, an ancient French Romanesque and Gothic architectural masterpiece built in 1877 using red bricks imported from Marseille, France.', 35
FROM pois p WHERE p.name = 'Nhà Thờ Đức Bà'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

-- POI 3: Bưu Điện Trung Tâm
INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'vi', 'Bưu Điện Trung Tâm Sài Gòn là một trong những công trình kiến trúc thời Pháp đẹp nhất tại Quận 1, kết hợp hài hòa giữa phong cách Phục Hưng phương Tây và họa tiết phương Đông.', 30
FROM pois p WHERE p.name = 'Bưu Điện Trung Tâm'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'en', 'The Saigon Central Post Office is one of the most stunning French colonial architectural gems in District 1, blending Renaissance elegance with delicate Eastern decorative motifs.', 30
FROM pois p WHERE p.name = 'Bưu Điện Trung Tâm'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

-- POI 4: Nhà Hát Thành Phố
INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'vi', 'Nhà Hát Lớn Thành Phố, tọa lạc tại Công trường Lam Sơn, khánh thành năm 1900 mang đậm phong cách kiến trúc Flamboyant Pháp, là trung tâm biểu diễn nghệ thuật danh giá hàng đầu.', 30
FROM pois p WHERE p.name = 'Nhà Hát Thành Phố'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'en', 'The Saigon Opera House, located at Lam Son Square, opened in 1900 with flamboyant French architecture, serving as Ho Chi Minh City prestigious venue for theatrical performances.', 30
FROM pois p WHERE p.name = 'Nhà Hát Thành Phố'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

-- POI 5: Chợ Bến Thành
INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'vi', 'Chợ Bến Thành với tháp đồng hồ bốn mặt nổi tiếng là trái tim thương mại sôi động của Quận 1, nơi du khách thỏa sức khám phá ẩm thực đường phố và văn hóa bản địa đặc sắc.', 30
FROM pois p WHERE p.name = 'Chợ Bến Thành'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'en', 'Ben Thanh Market, famous for its four-sided clock tower, is the vibrant commercial heart of District 1, offering rich local street delicacies and traditional handicrafts.', 30
FROM pois p WHERE p.name = 'Chợ Bến Thành'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

-- POI 6: Phố Đi Bộ Nguyễn Huệ
INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'vi', 'Phố Đi Bộ Nguyễn Huệ là quảng trường đi bộ hiện đại bậc nhất, trải dài từ trụ sở Ủy ban Nhân dân Thành phố đến bờ sông Sài Gòn, rực rỡ sắc màu về đêm.', 25
FROM pois p WHERE p.name = 'Phố Đi Bộ Nguyễn Huệ'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT p.id, 'en', 'Nguyen Hue Walking Street is a premier pedestrian boulevard in District 1, extending from City Hall down to the scenic Saigon River waterfront, lively with music and cultural events.', 25
FROM pois p WHERE p.name = 'Phố Đi Bộ Nguyễn Huệ'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

-- Thêm vé QR mẫu để du khách quét vào App (hiệu lực 24h)
INSERT INTO access_tickets (ticket_code, status, duration_hours) VALUES
    ('TOUR-PASS-DEMO-24H', 'NEW', 24),
    ('TOUR-PASS-SAIGON-24H', 'NEW', 24)
ON CONFLICT (ticket_code) DO NOTHING;

-- Thêm tài khoản admin mẫu
-- Password: admin123 (đã bcrypt hash)
INSERT INTO users (email, password_hash, role, lang_preference)
VALUES (
    'admin@poitour.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh3y',
    'ADMIN',
    'vi'
) ON CONFLICT (email) DO NOTHING;

-- Kiểm tra kết quả
DO $$
BEGIN
    RAISE NOTICE '✅ Database poitour đã được khởi tạo thành công!';
    RAISE NOTICE '   - % bảng đã được tạo', 7;
    RAISE NOTICE '   - % POI mẫu đã được thêm', 5;
    RAISE NOTICE '   - Tài khoản admin: admin@poitour.com / admin123';
END $$;
