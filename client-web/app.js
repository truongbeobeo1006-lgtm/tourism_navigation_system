/**
 * TOURISM NAVIGATION SYSTEM - CLIENT WEB APP
 * Implemented according to the exact 3-screen UI design specification
 */

// Global reference for Web Speech Utterance to prevent Chrome GC bug
window._activeUtterance = null;
let availableVoices = [];
let hasUserInteracted = false;

const CONFIG = {
  API_GATEWAY_URL: 'http://' + (window.location.hostname || 'localhost') + ':8080',
  REALTIME_URL: '/api/event',
  DEFAULT_CENTER: [10.77692, 106.69531], // Dinh Độc Lập
  GEOFENCE_RADIUS_M: 30,
  GEOFENCE_COOLDOWN_MS: 120000,
};

// Seed fallback data matching District 1 POIs
const FALLBACK_POIS = [
  {
    id: 'poi-dinh-doc-lap',
    name: 'Dinh Độc Lập',
    address: '135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1',
    lat: 10.77692,
    lng: 106.69531,
    radiusM: 30,
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=300&auto=format&fit=crop&q=80',
    langCode: 'vi',
    ttsScript: 'Chào mừng bạn đến Dinh Độc Lập, còn gọi là Dinh Thống Nhất. Đây là công trình lịch sử mang tính biểu tượng của Sài Gòn, chứng kiến thời khắc lịch sử ngày 30 tháng 4 năm 1975.',
    durationSec: 135, // 02:15
    audioUrl: null
  },
  {
    id: 'poi-nha-tho-duc-ba',
    name: 'Nhà Thờ Đức Bà',
    address: '01 Công xã Paris, Phường Bến Nghé, Quận 1',
    lat: 10.77972,
    lng: 106.69904,
    radiusM: 30,
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=300&auto=format&fit=crop&q=80',
    langCode: 'vi',
    ttsScript: 'Bạn đang đứng trước Nhà Thờ Đức Bà Sài Gòn, kiệt tác kiến trúc Gothic cổ kính được xây dựng từ năm 1877 với toàn bộ gạch ngói nhập khẩu từ Marseille, Pháp.',
    durationSec: 120,
    audioUrl: null
  },
  {
    id: 'poi-buu-dien',
    name: 'Bưu Điện Trung Tâm',
    address: '02 Công xã Paris, Phường Bến Nghé, Quận 1',
    lat: 10.77957,
    lng: 106.69930,
    radiusM: 30,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80',
    langCode: 'vi',
    ttsScript: 'Bưu Điện Trung Tâm Sài Gòn là một trong những công trình kiến trúc thời Pháp đẹp nhất tại Quận 1, kết hợp hài hòa giữa phong cách Phục Hưng phương Tây và họa tiết phương Đông.',
    durationSec: 110,
    audioUrl: null
  },
  {
    id: 'poi-nha-hat',
    name: 'Nhà Hát Thành Phố',
    address: '07 Công trường Lam Sơn, Phường Bến Nghé, Quận 1',
    lat: 10.77665,
    lng: 106.70318,
    radiusM: 30,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&auto=format&fit=crop&q=80',
    langCode: 'vi',
    ttsScript: 'Nhà Hát Lớn Thành Phố khánh thành năm 1900 mang đậm phong cách kiến trúc Flamboyant Pháp, là trung tâm biểu diễn nghệ thuật danh giá hàng đầu.',
    durationSec: 130,
    audioUrl: null
  },
  {
    id: 'poi-cho-ben-thanh',
    name: 'Chợ Bến Thành',
    address: 'Đường Lê Lợi, Phường Bến Thành, Quận 1',
    lat: 10.77253,
    lng: 106.69803,
    radiusM: 30,
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=300&auto=format&fit=crop&q=80',
    langCode: 'vi',
    ttsScript: 'Chợ Bến Thành với tháp đồng hồ bốn mặt nổi tiếng là trái tim thương mại sôi động của Quận 1, nơi du khách thỏa sức khám phá ẩm thực đường phố và văn hóa bản địa đặc sắc.',
    durationSec: 140,
    audioUrl: null
  }
];

const state = {
  // Start simulation user position slightly away (~316m) matching screenshot
  currentLat: 10.77450,
  currentLng: 106.69420,
  selectedLang: 'vi',
  autoPlayGeofence: true,
  playbackSpeed: 1.0,
  isSimulating: true,
  pois: [],
  activePoi: null,
  isPlaying: false,
  map: null,
  userMarker: null,
  poiMarkers: {},
  poiGeofenceCircles: {},
  lastTriggeredTime: {},
  audioDuration: 135,
  audioCurrentTime: 0,
  playbackInterval: null,
};

// DOM References
const dom = {
  screenTitle: document.getElementById('screenTitle'),
  gpsPill: document.getElementById('gpsPill'),
  gpsText: document.getElementById('gpsText'),
  distLabel: document.getElementById('distLabel'),
  distValue: document.getElementById('distValue'),
  zoneBadge: document.getElementById('zoneBadge'),
  poiThumb: document.getElementById('poiThumb'),
  poiName: document.getElementById('poiName'),
  poiAddress: document.getElementById('poiAddress'),
  startNarrationBtn: document.getElementById('startNarrationBtn'),
  startNarrationText: document.getElementById('startNarrationText'),
  dotTrack: document.getElementById('dotTrack'),
  clickProgressBar: document.getElementById('clickProgressBar'),
  progressFill: document.getElementById('progressFill'),
  timeElapsed: document.getElementById('timeElapsed'),
  timeTotal: document.getElementById('timeTotal'),
  rewindBtn: document.getElementById('rewindBtn'),
  mainPlayBtn: document.getElementById('mainPlayBtn'),
  playIcon: document.getElementById('playIcon'),
  pauseIcon: document.getElementById('pauseIcon'),
  speedBtn: document.getElementById('speedBtn'),
  speedText: document.getElementById('speedText'),
  poiScriptText: document.getElementById('poiScriptText'),
  settingLang: document.getElementById('settingLang'),
  autoPlayToggle: document.getElementById('autoPlayToggle'),
  simNearBtn: document.getElementById('simNearBtn'),
  simFarBtn: document.getElementById('simFarBtn'),
  realGpsBtn: document.getElementById('realGpsBtn'),
  realAudio: document.getElementById('realAudio'),
  // Tabs
  tabMap: document.getElementById('tabMap'),
  tabTours: document.getElementById('tabTours'),
  tabSettings: document.getElementById('tabSettings'),
  tabButtons: document.querySelectorAll('.tab-btn'),
  tourCards: document.querySelectorAll('.tour-card'),
};

// ==========================================
// 1. INITIALIZATION & VOICE ENGINE
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  initMap();
  setupEventListeners();
  loadSpeechVoices();
  fetchPois();
});

function loadSpeechVoices() {
  if ('speechSynthesis' in window) {
    availableVoices = window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      availableVoices = window.speechSynthesis.getVoices();
    };
  }
}

function unlockAudio() {
  if (!hasUserInteracted) {
    hasUserInteracted = true;
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }
}
window.addEventListener('click', unlockAudio, { capture: true });
window.addEventListener('touchstart', unlockAudio, { capture: true });

function playNotificationChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {
    // AudioContext blocked until gesture
  }
}

// ==========================================
// 2. MAP SETUP & MARKERS
// ==========================================
function initMap() {
  state.map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView(CONFIG.DEFAULT_CENTER, 17);

  // Standard Google Maps Tile Layer
  L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }).addTo(state.map);

  // User Location Marker (Blue Walking Figure)
  const userIcon = L.divIcon({
    className: 'user-marker-wrapper',
    html: `
      <div class="user-loc-marker">
        <div class="user-icon-circle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="4" r="2.5"></circle>
            <path d="M13.5 8.5h-3L9 14l3.5 1.5L11 20h2l1.5-6L16 11l-2.5-2.5z"></path>
          </svg>
        </div>
        <div class="user-label-pill">Bạn ở đây</div>
      </div>
    `,
    iconSize: [60, 50],
    iconAnchor: [30, 25]
  });

  state.userMarker = L.marker([state.currentLat, state.currentLng], { icon: userIcon, zIndexOffset: 2000 }).addTo(state.map);

  // Map click moves user in simulation mode
  state.map.on('click', (e) => {
    updateUserPosition(e.latlng.lat, e.latlng.lng);
  });
}

function renderPoiMarkers() {
  Object.values(state.poiMarkers).forEach(m => state.map.removeLayer(m));
  Object.values(state.poiGeofenceCircles).forEach(c => state.map.removeLayer(c));
  state.poiMarkers = {};
  state.poiGeofenceCircles = {};

  state.pois.forEach(poi => {
    // Landmark Red Pin
    const poiIcon = L.divIcon({
      className: 'poi-marker-wrapper',
      html: `
        <div class="poi-landmark-marker" id="marker-${poi.id}">
          <div class="poi-icon-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 10v7h3v-7H4zm6 0v7h4v-7h-4zm7 0v7h3v-7h-3zM2 22h20v-3H2v3zm10-20L2 6v2h20V6l-10-4z"></path>
            </svg>
          </div>
          <div class="poi-label-pill">${poi.name}</div>
        </div>
      `,
      iconSize: [80, 56],
      iconAnchor: [40, 26]
    });

    const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon, zIndexOffset: 1000 }).addTo(state.map);
    marker.on('click', () => {
      unlockAudio();
      selectPoi(poi, true);
    });
    state.poiMarkers[poi.id] = marker;

    // Dashed 30m Geofence Circle
    const circle = L.circle([poi.lat, poi.lng], {
      radius: poi.radiusM || 30,
      color: '#0284c7',
      fillColor: '#38bdf8',
      fillOpacity: 0.18,
      weight: 1.5,
      dashArray: '5, 5'
    }).addTo(state.map);
    state.poiGeofenceCircles[poi.id] = circle;
  });
}

// ==========================================
// 3. API INTEGRATION & DATA
// ==========================================
async function fetchPois() {
  try {
    const url = `${CONFIG.API_GATEWAY_URL}/api/v1/pois?lat=${state.currentLat}&lng=${state.currentLng}&radius=3000&lang=${state.selectedLang}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      // Deduplicate by name
      const map = new Map();
      data.forEach(p => {
        if (!map.has(p.name)) {
          // Merge with static address
          const fallback = FALLBACK_POIS.find(f => f.name === p.name);
          p.address = fallback ? fallback.address : 'Quận 1, TP. Hồ Chí Minh';
          p.durationSec = p.durationSec || 135;
          map.set(p.name, p);
        }
      });
      state.pois = Array.from(map.values());
    } else {
      state.pois = FALLBACK_POIS;
    }
  } catch (err) {
    console.info('API Gateway offline. Using District 1 verified POIs:', err.message);
    state.pois = FALLBACK_POIS;
  }

  renderPoiMarkers();

  // Default active POI: Dinh Độc Lập
  const defaultPoi = state.pois.find(p => p.name.includes('Dinh Độc Lập')) || state.pois[0];
  selectPoi(defaultPoi, false);
  updateDistancesAndZone();
}

// ==========================================
// 4. POSITION & GEOFENCE LOGIC
// ==========================================
function updateUserPosition(lat, lng) {
  state.currentLat = lat;
  state.currentLng = lng;

  if (state.userMarker) {
    state.userMarker.setLatLng([lat, lng]);
  }

  updateDistancesAndZone();
}

function updateDistancesAndZone() {
  if (!state.activePoi) return;

  const dist = calculateHaversine(state.currentLat, state.currentLng, state.activePoi.lat, state.activePoi.lng);
  const roundedDist = Math.round(dist);

  // Update Map Overlay Bar
  dom.distLabel.innerText = `KHOẢNG CÁCH TỚI ${state.activePoi.name.toUpperCase()}`;
  dom.distValue.innerText = `${roundedDist} m`;

  const isInside = dist <= (state.activePoi.radiusM || CONFIG.GEOFENCE_RADIUS_M);
  if (isInside) {
    dom.zoneBadge.className = 'zone-badge inside';
    dom.zoneBadge.innerText = `Trong vùng (${roundedDist}m)`;

    // Check Geofence auto-trigger
    if (state.autoPlayGeofence && hasUserInteracted) {
      const now = Date.now();
      const last = state.lastTriggeredTime[state.activePoi.id] || 0;
      if (now - last > CONFIG.GEOFENCE_COOLDOWN_MS) {
        state.lastTriggeredTime[state.activePoi.id] = now;
        startPlayback();
      }
    }
  } else {
    dom.zoneBadge.className = 'zone-badge outside';
    dom.zoneBadge.innerText = `Ngoài vùng (${roundedDist}m)`;
  }
}

function calculateHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ==========================================
// 5. POI SELECTION & UI SYNC
// ==========================================
function selectPoi(poi, autoPlay = false) {
  const isSame = state.activePoi && state.activePoi.id === poi.id;
  state.activePoi = poi;

  // Update Player Card
  dom.poiName.innerText = poi.name;
  dom.poiAddress.innerText = poi.address || 'Quận 1, TP. Hồ Chí Minh';
  dom.poiThumb.src = poi.imageUrl || 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&auto=format&fit=crop&q=80';
  dom.startNarrationText.innerText = `Bắt đầu thuyết minh ${poi.name}`;
  dom.poiScriptText.innerText = poi.ttsScript || `Nhấn phát để nghe bài thuyết minh lịch sử và kiến trúc đặc sắc của ${poi.name}...`;

  state.audioDuration = poi.durationSec || 135;
  dom.timeTotal.innerText = formatTime(state.audioDuration);

  // Center Map
  state.map.panTo([poi.lat, poi.lng]);
  updateDistancesAndZone();
  resetAudioProgress();

  if (autoPlay) {
    if (isSame && state.isPlaying) return;
    startPlayback();
  } else {
    stopPlayback();
  }
}

// ==========================================
// 6. AUDIO & TTS NARRATION ENGINE
// ==========================================
function togglePlayback() {
  unlockAudio();
  if (state.isPlaying) {
    stopPlayback();
  } else {
    startPlayback();
  }
}


// ==========================================
// REALTIME TRACKING FOR ADMIN DASHBOARD
// ==========================================
function sendRealtimeHeartbeat() {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  let devId = localStorage.getItem('poitour_device_id');
  if (!devId) {
    devId = 'dev_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('poitour_device_id', devId);
  }
  fetch(CONFIG.REALTIME_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'DEVICE_ONLINE', deviceType: isMobile ? 'mobile' : 'web', deviceId: devId })
  }).catch(() => {});
}
sendRealtimeHeartbeat();
setInterval(sendRealtimeHeartbeat, 6000);
window.addEventListener("click", sendRealtimeHeartbeat, { passive: true });
window.addEventListener("touchstart", sendRealtimeHeartbeat, { passive: true });

function notifyPoiPlay(poi) {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  fetch(CONFIG.REALTIME_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'POI_PLAY',
      poiId: poi.id,
      poiName: poi.name,
      language: state.selectedLang || 'vi',
      deviceType: isMobile ? 'mobile' : 'web'
    })
  }).catch(() => {});
}

function startPlayback() {
  if (state.activePoi) notifyPoiPlay(state.activePoi);
  if (!state.activePoi) return;

  unlockAudio();
  state.isPlaying = true;
  updatePlayButtonUI(true);
  dom.startNarrationText.innerText = `Tạm dừng thuyết minh ${state.activePoi.name}`;

  // Notification sound cue
  playNotificationChime();

  if (state.activePoi.audioUrl) {
    dom.realAudio.src = state.activePoi.audioUrl;
    dom.realAudio.playbackRate = state.playbackSpeed;
    dom.realAudio.play().catch(() => playViaTTS());
  } else {
    playViaTTS();
  }

  // Progress Bar timer
  clearInterval(state.playbackInterval);
  state.playbackInterval = setInterval(() => {
    state.audioCurrentTime += 1;
    if (state.audioCurrentTime >= state.audioDuration) {
      stopPlayback();
      state.audioCurrentTime = 0;
    }
    updateProgressUI();
  }, 1000);
}

function playViaTTS() {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  if (window.speechSynthesis.paused) window.speechSynthesis.resume();

  const text = state.activePoi.ttsScript || state.activePoi.name;
  const utterance = new SpeechSynthesisUtterance(text);

  // Store in global window reference to prevent Chrome GC bug
  window._activeUtterance = utterance;

  utterance.lang = state.selectedLang === 'en' ? 'en-US' : 'vi-VN';
  utterance.rate = state.playbackSpeed;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Find Vietnamese Voice
  if (!availableVoices || availableVoices.length === 0) {
    availableVoices = window.speechSynthesis.getVoices();
  }
  const viVoice = availableVoices.find(v =>
    v.lang.toLowerCase().includes('vi') ||
    v.name.toLowerCase().includes('vietnam') ||
    v.name.toLowerCase().includes('tiếng việt') ||
    v.name.toLowerCase().includes('linh') ||
    v.name.toLowerCase().includes('mai')
  );
  if (viVoice && state.selectedLang === 'vi') {
    utterance.voice = viVoice;
  }

  utterance.onend = () => {
    window._activeUtterance = null;
    stopPlayback();
  };

  utterance.onerror = (e) => {
    window._activeUtterance = null;
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      stopPlayback();
    }
  };

  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  }, 60);
}

function stopPlayback() {
  state.isPlaying = false;
  updatePlayButtonUI(false);
  if (state.activePoi) {
    dom.startNarrationText.innerText = `Bắt đầu thuyết minh ${state.activePoi.name}`;
  }
  clearInterval(state.playbackInterval);

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  dom.realAudio.pause();
}

function rewind10s() {
  state.audioCurrentTime = Math.max(0, state.audioCurrentTime - 10);
  updateProgressUI();
}

function cycleSpeed() {
  const speeds = [1.0, 1.25, 1.5, 0.75];
  const nextIdx = (speeds.indexOf(state.playbackSpeed) + 1) % speeds.length;
  state.playbackSpeed = speeds[nextIdx];
  dom.speedText.innerText = `${state.playbackSpeed}x`;

  if (state.isPlaying) {
    // Restart voice at new speed
    playViaTTS();
  }
}

function updatePlayButtonUI(isPlaying) {
  if (isPlaying) {
    dom.playIcon.classList.add('hidden');
    dom.pauseIcon.classList.remove('hidden');
  } else {
    dom.playIcon.classList.remove('hidden');
    dom.pauseIcon.classList.add('hidden');
  }
}

function resetAudioProgress() {
  state.audioCurrentTime = 0;
  updateProgressUI();
}

function updateProgressUI() {
  const percent = Math.min((state.audioCurrentTime / state.audioDuration) * 100, 100);
  dom.progressFill.style.width = `${percent}%`;
  dom.timeElapsed.innerText = formatTime(state.audioCurrentTime);

  // Update dots
  const dots = dom.dotTrack.querySelectorAll('.dot');
  const activeDotCount = Math.floor((percent / 100) * dots.length);
  dots.forEach((dot, idx) => {
    dot.className = idx <= activeDotCount ? 'dot active' : 'dot';
  });
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

// ==========================================
// 7. TAB NAVIGATION & EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  // Bottom Tab Navigation
  dom.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      switchTab(targetId, btn);
    });
  });

  // Player Buttons
  dom.mainPlayBtn.addEventListener('click', togglePlayback);
  dom.startNarrationBtn.addEventListener('click', togglePlayback);
  dom.rewindBtn.addEventListener('click', rewind10s);
  dom.speedBtn.addEventListener('click', cycleSpeed);

  // Click on progress bar to seek
  dom.clickProgressBar.addEventListener('click', (e) => {
    const rect = dom.clickProgressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    state.audioCurrentTime = Math.floor(ratio * state.audioDuration);
    updateProgressUI();
  });

  // Tab 2: Tour selection
  dom.tourCards.forEach(card => {
    card.addEventListener('click', () => {
      dom.tourCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const tourId = card.getAttribute('data-tour');
      if (tourId === '1') {
        const dinh = state.pois.find(p => p.name.includes('Dinh Độc Lập')) || state.pois[0];
        selectPoi(dinh, false);
      } else if (tourId === '2') {
        const benThanh = state.pois.find(p => p.name.includes('Bến Thành')) || state.pois[1];
        selectPoi(benThanh, false);
      }
      // Switch to Map to view
      switchTab('tabMap', document.getElementById('btnTabMap'));
    });
  });

  // Tab 3: Settings
  dom.settingLang.addEventListener('change', (e) => {
    state.selectedLang = e.target.value;
    stopPlayback();
    fetchPois();
  });

  dom.autoPlayToggle.addEventListener('change', (e) => {
    state.autoPlayGeofence = e.target.checked;
  });

  // Simulation Tool 1: Near Dinh (10m)
  dom.simNearBtn.addEventListener('click', () => {
    updateUserPosition(10.77685, 106.69530); // ~10m from Dinh
    switchTab('tabMap', document.getElementById('btnTabMap'));
  });

  // Simulation Tool 2: Far from Dinh (350m)
  dom.simFarBtn.addEventListener('click', () => {
    updateUserPosition(10.77450, 106.69420); // ~316m - 350m
    stopPlayback();
    switchTab('tabMap', document.getElementById('btnTabMap'));
  });

  // Simulation Tool 3: Real Device GPS
  dom.realGpsBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dom.gpsPill.className = 'gps-badge active';
          dom.gpsText.innerText = 'GPS: Sẵn sàng';
          updateUserPosition(pos.coords.latitude, pos.coords.longitude);
          switchTab('tabMap', document.getElementById('btnTabMap'));
        },
        () => {
          dom.gpsPill.className = 'gps-badge lost';
          dom.gpsText.innerText = 'GPS: Mất tín hiệu';
          alert('Không thể truy cập GPS thực tế. Vui lòng cấp quyền vị trí hoặc dùng chế độ giả lập!');
        },
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }
  });
}

function switchTab(tabId, activeBtn) {
  // Hide all tabs
  document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
  dom.tabButtons.forEach(btn => btn.classList.remove('active'));

  // Show target tab
  const targetPage = document.getElementById(tabId);
  if (targetPage) targetPage.classList.add('active');
  if (activeBtn) activeBtn.classList.add('active');

  // Update header title based on tab
  if (tabId === 'tabMap') {
    dom.screenTitle.innerText = 'Bản đồ Di tích';
    // Invalidate map size so Leaflet recalculates dimensions
    setTimeout(() => {
      if (state.map) state.map.invalidateSize();
    }, 100);
  } else if (tabId === 'tabTours') {
    dom.screenTitle.innerText = 'Lộ trình Tổng quan';
  } else if (tabId === 'tabSettings') {
    dom.screenTitle.innerText = 'Cài đặt & Thử nghiệm';
  }
}
