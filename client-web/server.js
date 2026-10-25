const http = require('http');
const fs = require('fs');
const path = require('path');

const CLIENT_DIR = path.join(__dirname); // C:\...\client-web
const ROOT_DIR = path.dirname(__dirname); // C:\...\tourism_navigation_system
const ADMIN_DIR = path.join(ROOT_DIR, 'admin-web');

const PORT = 3000;

// Bộ nhớ đệm thời gian thực lưu trên Server
const activeDevices = new Map(); // deviceId -> { type, lastSeen, ip }
const poiListens = new Map();   // poiName -> count
let totalAudience = 0;
const recentEvents = [];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS Headers cho mọi request (Hỗ trợ 100% khi mở trực tiếp file:// trên máy tính)
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Bypass-Tunnel-Reminder, Access-Control-Request-Private-Network');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const rawUrl = req.url.split('?')[0];

  // ================= 1. API REALTIME =================
  if (rawUrl === '/api/event' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const event = JSON.parse(body || '{}');
        const now = Date.now();
        const clientIp = req.socket.remoteAddress || 'unknown';
        const devId = event.deviceId || ('dev_' + clientIp.replace(/[^a-zA-Z0-9]/g, ''));
        const devType = event.deviceType || 'mobile';

        // Ghi nhận thiết bị này đang ACTIVE (cho MỌI loại sự kiện, kể cả nghe audio)
        activeDevices.set(devId, {
          type: devType,
          lastSeen: now,
          ip: clientIp
        });

        if (event.type === 'POI_PLAY') {
          totalAudience += 1;
          const pName = event.poiName || 'Điểm Di Tích Quận 1';
          poiListens.set(pName, (poiListens.get(pName) || 0) + 1);

          recentEvents.unshift({
            poiName: pName,
            poiCode: event.poiCode || 'GPS-TRIGGER',
            deviceInfo: devType === 'mobile' ? 'Điện thoại di động (Mobile)' : 'Trình duyệt Web',
            language: event.language === 'en' ? 'English' : 'Tiếng Việt',
            timestamp: now
          });
          if (recentEvents.length > 20) recentEvents.pop();
          console.log(`[REALTIME] POI Play: ${pName} - Total Audience: ${totalAudience} - Active Devices: ${activeDevices.size}`);
        } else {
          console.log(`[REALTIME] Heartbeat from ${devId} (${devType}) - Active Devices: ${activeDevices.size}`);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', activeCount: activeDevices.size, totalAudience }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (rawUrl === '/api/realtime-stats' && req.method === 'GET') {
    const now = Date.now();
    // Giữ thiết bị online trong 5 phút (300,000 ms) theo chuẩn Realtime Analytics
    for (const [id, dev] of activeDevices.entries()) {
      if (now - dev.lastSeen > 300000) {
        activeDevices.delete(id);
      }
    }

    let mobileCount = 0;
    let webCount = 0;
    for (const dev of activeDevices.values()) {
      if (dev.type === 'mobile') mobileCount++;
      else webCount++;
    }

    const listensObj = {};
    for (const [k, v] of poiListens.entries()) {
      listensObj[k] = v;
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      activeDevicesCount: activeDevices.size,
      mobileCount,
      webCount,
      totalAudience,
      poiListens: listensObj,
      recentEvents
    }));
    return;
  }

  // ================= 2. PHỤC VỤ FILE TĨNH =================
  let filePath = '';

  if (rawUrl.startsWith('/admin')) {
    let sub = rawUrl.substring(6);
    if (sub === '' || sub === '/') sub = '/index.html';
    filePath = path.join(ADMIN_DIR, sub);
  } else {
    let sub = rawUrl;
    if (sub === '' || sub === '/') sub = '/index.html';
    filePath = path.join(CLIENT_DIR, sub);
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Không tìm thấy file');
    } else {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream'
      });
      res.end(data);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] Đang chạy tại http://0.0.0.0:${PORT}`);
});
