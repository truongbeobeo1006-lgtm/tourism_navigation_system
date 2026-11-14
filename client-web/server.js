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
let autoListens = 0;
let manualListens = 0;
let recentEvents = [];
// Biểu đồ xu hướng: số lượt nghe theo ngày -> 9 khung giờ (06h, 08h, ..., 22h)
// Ghi nhận MỌI lượt nghe (tự động Geofence + chọn trên bản đồ)
let hourlyByDay = {};

function dayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// 06:00≈05-06h, 08:00≈07-08h, ..., 20:00≈19-20h, 22:00≈21h-04h (ban đêm)
function trendSlotIndex(hour) {
  if (hour < 5) return 8;
  return Math.min(8, Math.floor((hour - 5) / 2));
}

function recordHourlyListen(date = new Date()) {
  const key = dayKey(date);
  if (!Array.isArray(hourlyByDay[key])) hourlyByDay[key] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  hourlyByDay[key][trendSlotIndex(date.getHours())] += 1;
  // Chỉ giữ 35 ngày gần nhất
  const keys = Object.keys(hourlyByDay).sort();
  while (keys.length > 35) delete hourlyByDay[keys.shift()];
}

const STATS_FILE = path.join(__dirname, 'stats-data.json');

// Khôi phục dữ liệu đã tích lũy (không bị xóa về 0 khi khởi động lại máy hay tạo link QR mới)
function loadPersistentStats() {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, 'utf8');
      const data = JSON.parse(raw);
      totalAudience = data.totalAudience || 0;
      autoListens = data.autoListens !== undefined ? data.autoListens : Math.round(totalAudience * 0.62);
      manualListens = data.manualListens !== undefined ? data.manualListens : (totalAudience - autoListens);
      if (data.poiListens && typeof data.poiListens === 'object') {
        for (const [k, v] of Object.entries(data.poiListens)) {
          poiListens.set(k, v);
        }
      }
      if (Array.isArray(data.recentEvents)) {
        recentEvents = data.recentEvents;
      }
      if (data.hourlyByDay && typeof data.hourlyByDay === 'object') {
        hourlyByDay = data.hourlyByDay;
      }

      // Khởi tạo dữ liệu theo khung giờ cho hôm nay nếu chưa có nhưng đã có lượt nghe tích lũy
      const today = dayKey();
      const hasTodayData = Array.isArray(hourlyByDay[today]) && hourlyByDay[today].some(v => v > 0);
      if (!hasTodayData && totalAudience > 0) {
        hourlyByDay[today] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let accounted = 0;
        for (const ev of recentEvents) {
          if (ev && ev.timestamp) {
            const d = new Date(ev.timestamp);
            if (!isNaN(d.getTime()) && dayKey(d) === today) {
              hourlyByDay[today][trendSlotIndex(d.getHours())] += 1;
              accounted++;
            }
          }
        }
        const remaining = Math.max(0, totalAudience - accounted);
        if (remaining > 0) {
          const weights = [0.05, 0.08, 0.12, 0.14, 0.22, 0.18, 0.12, 0.06, 0.03];
          let distributed = 0;
          weights.forEach((w, idx) => {
            const add = Math.floor(remaining * w);
            hourlyByDay[today][idx] += add;
            distributed += add;
          });
          hourlyByDay[today][trendSlotIndex(new Date().getHours())] += (remaining - distributed);
        }
        savePersistentStats();
      }
      console.log(`[PERSISTENCE] Đã khôi phục dữ liệu: ${totalAudience} thính giả, ${recentEvents.length} sự kiện`);
    }
  } catch (err) {
    console.warn('[PERSISTENCE] Chưa có tệp dữ liệu:', err.message);
  }
}

// Lưu dữ liệu tích lũy xuống ổ đĩa
function savePersistentStats() {
  try {
    const listensObj = {};
    for (const [k, v] of poiListens.entries()) {
      listensObj[k] = v;
    }
    const data = {
      totalAudience,
      autoListens,
      manualListens,
      poiListens: listensObj,
      recentEvents: recentEvents.slice(0, 30),
      hourlyByDay,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[PERSISTENCE] Lỗi khi ghi tệp dữ liệu:', err.message);
  }
}

loadPersistentStats();

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

  // ================= 0. API TUNNEL & NETWORK URLS =================
  if (rawUrl === '/api/tunnel-url' && req.method === 'GET') {
    let tunnelUrl = 'https://hosting-extensions-fact-shot.trycloudflare.com';
    const tunnelFile = path.join(ROOT_DIR, 'tunnel-url.txt');
    try {
      if (fs.existsSync(tunnelFile)) {
        const content = fs.readFileSync(tunnelFile, 'utf8').trim();
        if (content.startsWith('http')) tunnelUrl = content;
      }
    } catch (e) {}

    const os = require('os');
    const nets = os.networkInterfaces();
    let lanIp = 'localhost';
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          lanIp = net.address;
          break;
        }
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      tunnelUrl: tunnelUrl,
      lanUrl: `http://${lanIp}:${PORT}`,
      localUrl: `http://localhost:${PORT}`
    }));
    return;
  }


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

        // Xử lý sự kiện du khách thoát ra / đóng tab
        if (event.type === 'DEVICE_OFFLINE') {
          activeDevices.delete(devId);
          console.log(`[REALTIME] Device OFFLINE: ${devId} - Active Devices: ${activeDevices.size}`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', activeCount: activeDevices.size, totalAudience }));
          return;
        }

        // Tự động dọn dẹp các thiết bị đã quá 10 giây không có nhịp tim
        for (const [id, dev] of activeDevices.entries()) {
          if (now - dev.lastSeen > 10000) {
            activeDevices.delete(id);
          }
        }

        // Ghi nhận thiết bị này đang ACTIVE (cho MỌI loại sự kiện, kể cả nghe audio)
        activeDevices.set(devId, {
          type: devType,
          lastSeen: now,
          ip: clientIp
        });

        if (event.type === 'POI_PLAY') {
          totalAudience += 1;
          const isAuto = event.triggerType === 'auto';
          if (isAuto) {
            autoListens += 1;
          } else {
            manualListens += 1;
          }
          const pName = event.poiName || 'Điểm Di Tích Quận 1';
          poiListens.set(pName, (poiListens.get(pName) || 0) + 1);
          recordHourlyListen(new Date(now));

          recentEvents.unshift({
            poiName: pName,
            poiCode: isAuto ? 'GPS-AUTO' : 'MAP-MANUAL',
            deviceInfo: (devType === 'mobile' ? 'Điện thoại di động (Mobile)' : 'Trình duyệt Web') + (isAuto ? ' • Tự động Geofence' : ' • Chọn trên bản đồ'),
            language: event.language === 'en' ? 'English' : 'Tiếng Việt',
            triggerType: isAuto ? 'auto' : 'manual',
            timestamp: now
          });
          if (recentEvents.length > 20) recentEvents.pop();
          savePersistentStats();
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
    // Giữ thiết bị online trong 10 giây nếu không có nhịp tim
    for (const [id, dev] of activeDevices.entries()) {
      if (now - dev.lastSeen > 10000) {
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
      autoListens,
      manualListens,
      poiListens: listensObj,
      recentEvents,
      hourlyByDay,
      todayKey: dayKey()
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
