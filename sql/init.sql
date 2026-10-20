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
-- BẢNG 5: poi_qr_tokens
-- Mã QR cho từng điểm tham quan (UC04)
-- =======================================================
CREATE TABLE IF NOT EXISTS poi_qr_tokens (
    id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    poi_id     UUID         NOT NULL REFERENCES pois(id) ON DELETE CASCADE,
    token      VARCHAR(64)  UNIQUE NOT NULL,
    -- Token ngẫu nhiên được mã hóa vào QR code
    -- App quét QR → đọc token → gọi GET /api/v1/pois/qr/{token}
    expires_at TIMESTAMP
    -- NULL = không bao giờ hết hạn
    -- Có thể đặt hạn để tăng bảo mật
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
-- 5 điểm tham quan thật ở TP.HCM với tọa độ thật
-- Để test app ngay sau khi setup
-- =======================================================

-- Thêm POI mẫu
INSERT INTO pois (name, lat, lng, radius_m, is_active) VALUES
    ('Dinh Độc Lập',           10.77692, 106.69531, 30, TRUE),
    ('Nhà Thờ Đức Bà',         10.77972, 106.69904, 30, TRUE),
    ('Bưu Điện Trung Tâm',     10.77957, 106.69930, 30, TRUE),
    ('Bảo Tàng Chứng Tích Chiến Tranh', 10.77949, 106.69260, 30, TRUE),
    ('Phố Đi Bộ Nguyễn Huệ',  10.77362, 106.70408, 50, TRUE)
ON CONFLICT DO NOTHING;

-- Thêm nội dung audio mẫu (tiếng Việt + tiếng Anh) cho Dinh Độc Lập
INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT
    p.id,
    'vi',
    'Chào mừng bạn đến Dinh Độc Lập, còn gọi là Dinh Thống Nhất. Đây là công trình kiến trúc mang tính biểu tượng của Sài Gòn, được xây dựng năm 1966.',
    25
FROM pois p WHERE p.name = 'Dinh Độc Lập'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

INSERT INTO poi_audio_contents (poi_id, lang_code, tts_script, duration_sec)
SELECT
    p.id,
    'en',
    'Welcome to the Independence Palace, also known as Reunification Palace. This iconic landmark was built in 1966 and served as the headquarters of the South Vietnamese government.',
    28
FROM pois p WHERE p.name = 'Dinh Độc Lập'
ON CONFLICT (poi_id, lang_code) DO NOTHING;

-- Thêm QR token mẫu cho Dinh Độc Lập
INSERT INTO poi_qr_tokens (poi_id, token)
SELECT p.id, 'DEMO-TOKEN-DINH-DOC-LAP-2024'
FROM pois p WHERE p.name = 'Dinh Độc Lập'
ON CONFLICT (token) DO NOTHING;

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
