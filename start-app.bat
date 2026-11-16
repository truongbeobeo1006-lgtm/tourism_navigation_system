@echo off
chcp 65001 >nul
title KHOI DONG HE THONG QUAN LI DU LICH QUAN 1
color 0b

echo =========================================================================
echo    🏛️  HỆ THỐNG QUẢN LÍ DU LỊCH QUẬN 1 - 1-CLICK LAUNCHER
echo =========================================================================
echo.

cd /d "%~dp0"

echo [1/3] Đang khởi động Server Node.js tại http://localhost:3000 ...
start /b node client-web\server.js > server.log 2>&1

timeout /t 2 /nobreak >nul

echo [2/3] Đang kết nối đường hầm Cloudflare công khai (Cho 4G / từ xa)...
start /b cloudflared.exe tunnel --protocol http2 --url http://127.0.0.1:3000 > tunnel.log 2>&1

echo [3/3] Đang chờ cấp tên miền công khai...
timeout /t 5 /nobreak >nul

:: Chạy script Node.js lấy link công khai và cập nhật QR code
node -e "
const fs = require('fs');
const https = require('https');

let attempts = 0;
function checkTunnel() {
  attempts++;
  try {
    if (fs.existsSync('tunnel.log')) {
      const content = fs.readFileSync('tunnel.log', 'utf8');
      const match = content.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);
      if (match) {
        const publicUrl = match[0];
        fs.writeFileSync('tunnel-url.txt', publicUrl, 'utf8');
        console.log('');
        console.log('=========================================================================');
        console.log('✅ HỆ THỐNG ĐÃ KHỞI ĐỘNG THÀNH CÔNG VÀ SẴN SÀNG 100%!');
        console.log('=========================================================================');
        console.log('💻 Trang Quản trị (Admin CMS):   http://localhost:3000/admin');
        console.log('📱 App Du khách trên máy tính:  http://localhost:3000');
        console.log('🌐 ĐIỆN THOẠI 4G / QUÉT TỪ XA:  ' + publicUrl + '/?ticket=TOUR-PASS-DEMO-24H');
        console.log('=========================================================================');

        // Tải ảnh QR code mới
        const targetUrl = publicUrl + '/?ticket=TOUR-PASS-DEMO-24H';
        const qrApi = 'https://api.qrserver.com/v1/create-qr-code/?size=450x450&margin=15&data=' + encodeURIComponent(targetUrl);
        https.get(qrApi, (res) => {
          const chunks = [];
          res.on('data', c => chunks.push(c));
          res.on('end', () => {
            fs.writeFileSync('qr-code.png', Buffer.concat(chunks));
            console.log('📸 Đã tạo file ảnh mã QR mới: qr-code.png');
          });
        });
        return;
      }
    }
  } catch (e) {}

  if (attempts < 10) {
    setTimeout(checkTunnel, 1500);
  } else {
    console.log('⚠️ Không tìm thấy link Cloudflare, bạn vẫn có thể dùng nội bộ: http://localhost:3000');
  }
}
checkTunnel();
"

echo.
echo 👉 Mở trình duyệt vào trang Quản trị...
start http://localhost:3000/admin

echo.
echo [LƯU Ý] Không tắt cửa sổ này khi đang báo cáo cho thầy cô!
echo Nhấn Ctrl + C để dừng hệ thống khi hoàn thành buổi báo cáo.
echo.
pause >nul
