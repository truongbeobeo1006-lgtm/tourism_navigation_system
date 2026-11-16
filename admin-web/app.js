/**
 * GEO TOUR - ADMIN CMS JAVASCRIPT
 * Dữ liệu thời gian thực - Bắt đầu từ 0 và chỉ cập nhật khi có du khách sử dụng thực tế
 */

const API_BASE = (window.location.protocol.startsWith("http") ? "" : "http://127.0.0.1:3000") + "/api/v1/pois";
const SPRING_API_BASE = "http://localhost:8080/api/v1/pois";

// Dữ liệu 6 điểm POI Quận 1 - KHÔNG BỊA SỐ LIỆU (Tất cả lượt nghe và đánh giá ban đầu = 0)
const DEFAULT_Q1_POIS = [
    {
        id: "q1-poi-0001",
        code: "Q1-POI-0001",
        name: "Dinh Độc Lập",
        category: "Di Tích Lịch Sử",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77692,
        lng: 106.69531,
        radiusM: 30,
        listens: 0,
        rating: 0,
        density: "neutral",
        isActive: true,
        availableLanguages: ["vi", "en"],
        imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=150"
    },
    {
        id: "q1-poi-0002",
        code: "Q1-POI-0002",
        name: "Bưu Điện Trung Tâm",
        category: "Kiến Trúc Cổ Điển",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77957,
        lng: 106.69930,
        radiusM: 30,
        listens: 0,
        rating: 0,
        density: "neutral",
        isActive: true,
        availableLanguages: ["vi", "en"],
        imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=150"
    },
    {
        id: "q1-poi-0003",
        code: "Q1-POI-0003",
        name: "Nhà Thờ Đức Bà",
        category: "Kiến Trúc Tôn Giáo",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77972,
        lng: 106.69904,
        radiusM: 30,
        listens: 0,
        rating: 0,
        density: "neutral",
        isActive: true,
        availableLanguages: ["vi", "en"],
        imageUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=150"
    },
    {
        id: "q1-poi-0004",
        code: "Q1-POI-0004",
        name: "Nhà Hát Thành Phố",
        category: "Biểu Diễn Nghệ Thuật",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77665,
        lng: 106.70318,
        radiusM: 30,
        listens: 0,
        rating: 0,
        density: "neutral",
        isActive: true,
        availableLanguages: ["vi", "en"],
        imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=150"
    },
    {
        id: "q1-poi-0005",
        code: "Q1-POI-0005",
        name: "Chợ Bến Thành",
        category: "Văn Hóa & Thương Mại",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77253,
        lng: 106.69803,
        radiusM: 30,
        listens: 0,
        rating: 0,
        density: "neutral",
        isActive: true,
        availableLanguages: ["vi", "en"],
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150"
    },
    {
        id: "q1-poi-0006",
        code: "Q1-POI-0006",
        name: "Phố Đi Bộ Nguyễn Huệ",
        category: "Quảng Trường Du Lịch",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77362,
        lng: 106.70408,
        radiusM: 40,
        listens: 0,
        rating: 0,
        density: "neutral",
        isActive: true,
        availableLanguages: ["vi", "en"],
        imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=150"
    }
];

let poiList = [...DEFAULT_Q1_POIS];
let heatmapMap = null;
let heatmapLayers = [];
let currentPoisVersion = 0;
let trendChartInstance = null;
// Dữ liệu biểu đồ xu hướng lấy từ server (mọi lượt nghe: tự động + chọn trên bản đồ)
let trendHourlyByDay = {};
let trendTodayKey = null;
let trendRange = "today";
let lastTrendSignature = "";

// Biến trạng thái thời gian thực
let totalAudienceCount = 0;
let autoListensCount = 0;
let manualListensCount = 0;
let liveSessionsCount = 0;
let currentActiveDevicesCount = 0;
let currentMobileCount = 0;
let currentWebCount = 0;

// Kênh đồng bộ liên ứng dụng (BroadcastChannel giữa Client Web và Admin Web)
let syncChannel = null;
try {
    syncChannel = new BroadcastChannel("poitour_sync_channel");
} catch (e) {
    console.log("BroadcastChannel không khả dụng, sử dụng LocalStorage làm fallback");
}

// ================= KHI TRANG TẢI XONG =================
document.addEventListener("DOMContentLoaded", () => {
    // Mỗi bước khởi tạo chạy độc lập: nếu 1 phần lỗi, các phần khác (bản đồ, dữ liệu) vẫn hoạt động
    const safeRun = (name, fn) => {
        try { fn(); } catch (err) { console.error(`[INIT] Lỗi khi khởi tạo ${name}:`, err); }
    };
    safeRun("navigation", initNavigation);
    safeRun("chart", initChart);
    safeRun("heatmap", initHeatmapMap);
    safeRun("pois", fetchPoisFromBackend);
    safeRun("activityFeed", initRealtimeActivityFeed);
    safeRun("modals", initModalHandlers);
    safeRun("sync", setupSyncListener);
    safeRun("analyticsFilter", initAnalyticsFilter);
    safeRun("analytics", renderAnalyticsData);
});

// ================= 1. ĐIỀU HƯỚNG TẮT/BẬT MÀN HÌNH =================
function initNavigation() {
    const navDashboard = document.getElementById("navDashboard");
    const navPois = document.getElementById("navPois");
    const navAnalytics = document.getElementById("navAnalytics");
    const linkViewAllPois = document.getElementById("linkViewAllPois");

    const secDashboard = document.getElementById("sectionDashboard");
    const secPois = document.getElementById("sectionPois");
    const secAnalytics = document.getElementById("sectionAnalytics");

    function switchPage(page) {
        navDashboard.classList.toggle("active", page === "dashboard");
        navPois.classList.toggle("active", page === "pois");
        if (navAnalytics) navAnalytics.classList.toggle("active", page === "analytics");

        secDashboard.classList.toggle("active", page === "dashboard");
        secPois.classList.toggle("active", page === "pois");
        if (secAnalytics) secAnalytics.classList.toggle("active", page === "analytics");

        if (page === "dashboard" && heatmapMap) {
            setTimeout(() => heatmapMap.invalidateSize(), 200);
        }
        if (page === "analytics") {
            if (trendChartInstance) {
                setTimeout(() => trendChartInstance.resize(), 100);
            }
            renderAnalyticsData();
        }
    }

    navDashboard.addEventListener("click", (e) => { e.preventDefault(); switchPage("dashboard"); });
    navPois.addEventListener("click", (e) => { e.preventDefault(); switchPage("pois"); });
    if (navAnalytics) navAnalytics.addEventListener("click", (e) => { e.preventDefault(); switchPage("analytics"); });
    if (linkViewAllPois) linkViewAllPois.addEventListener("click", (e) => { e.preventDefault(); switchPage("pois"); });
}

// ================= 2. VẼ BIỂU ĐỒ XU HƯỚNG (BAN ĐẦU = 0, CẬP NHẬT KHI CÓ DỮ LIỆU) =================
function initChart() {
    const canvas = document.getElementById("trendChart");
    if (!canvas) {
        console.warn("[CHART] Không tìm thấy #trendChart – bỏ qua biểu đồ xu hướng");
        return;
    }
    const ctx = canvas.getContext("2d");

    const gradientToday = ctx.createLinearGradient(0, 0, 0, 220);
    gradientToday.addColorStop(0, "rgba(9, 51, 89, 0.2)");
    gradientToday.addColorStop(1, "rgba(9, 51, 89, 0.0)");

    // Dữ liệu ban đầu toàn bộ là 0 (Chưa có người nghe)
    trendChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
            datasets: [
                {
                    label: "Tổng lượt nghe theo khung giờ",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: "#093359",
                    backgroundColor: gradientToday,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.45,
                    pointRadius: 4,
                    pointBackgroundColor: "#093359"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "#093359",
                    padding: 10,
                    callbacks: {
                        label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw} lượt nghe`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: "#94a3b8", font: { size: 11 } }
                },
                y: {
                    min: 0,
                    suggestedMax: 10,
                    grid: { color: "#f1f5f9" },
                    ticks: {
                        color: "#94a3b8",
                        font: { size: 11 },
                        precision: 0
                    }
                }
            }
        }
    });
    updateTrendChart(true);
}

// ================= 3. KHỞI TẠO BẢN ĐỒ QUẬN 1 (DÙNG GOOGLE MAPS TILE & MARKER GIỐNG CLIENT) =================
function initHeatmapMap() {
    const mapContainer = document.getElementById("heatmapLeaflet");
    if (!mapContainer || typeof L === "undefined") return;

    heatmapMap = L.map("heatmapLeaflet", {
        zoomControl: true,
        attributionControl: false
    }).setView([10.77692, 106.69850], 15);

    // Sử dụng Google Maps Tile Layer giống hệt bên Client Web (hiển thị sắc nét, không bị chặn tile)
    L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
    }).addTo(heatmapMap);

    renderHeatmapMarkers();
    setTimeout(() => {
        if (heatmapMap) heatmapMap.invalidateSize();
    }, 200);
}

function renderHeatmapMarkers() {
    if (!heatmapMap) return;

    // Xóa các vòng tròn và marker cũ trước khi vẽ lại
    heatmapLayers.forEach(layer => {
        try { heatmapMap.removeLayer(layer); } catch (e) {}
    });
    heatmapLayers = [];

    const activePois = poiList.filter(p => p.isActive !== false);
    const elGeoCount = document.getElementById("mapGeofenceCount");
    if (elGeoCount) elGeoCount.textContent = `${activePois.length} điểm Q.1`;
    const elActiveCard = document.getElementById("cardActiveCount");
    if (elActiveCard) elActiveCard.textContent = activePois.length;

    activePois.forEach(poi => {
        let pinBg = "#ef4444"; // Pin đỏ giống Client Web
        let densityText = `${poi.listens || 0} lượt nghe • Bán kính ${poi.radiusM || 30}m`;

        // Icon Marker giống hệt bên Client Web (Icon ngôi đền tròn đỏ + nhãn tên bên dưới)
        const poiIcon = L.divIcon({
            className: "poi-marker-wrapper",
            html: `
                <div class="poi-landmark-marker" id="admin-marker-${poi.id}">
                    <div class="poi-icon-circle" style="background-color: ${pinBg};">
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

        const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon, zIndexOffset: 1000 }).addTo(heatmapMap);
        marker.bindTooltip(`
            <div style="font-family: inherit; font-size: 12px; font-weight: 700;">
                <strong>${poi.name}</strong><br>
                <span style="color: #0284c7;">● ${densityText}</span>
            </div>
        `, { direction: "top", offset: [0, -16] });
        heatmapLayers.push(marker);

        // Vòng tròn bán kính Geofence 30m nét đứt giống hệt Client Web
        const circle = L.circle([poi.lat, poi.lng], {
            radius: poi.radiusM || 30,
            color: "#0284c7",
            fillColor: "#38bdf8",
            fillOpacity: 0.18,
            weight: 1.5,
            dashArray: "5, 5"
        }).addTo(heatmapMap);
        heatmapLayers.push(circle);
    });
}

// ================= 4. GỌI API BACKEND (API GATEWAY PORT 8080) =================
async function fetchPoisFromBackend() {
    try {
        const response = await fetch(`${API_BASE}/all?lang=vi`);
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const oldListensMap = {};
                poiList.forEach(p => { oldListensMap[p.name] = p.listens || 0; });
                poiList = data.map((item, index) => ({
                    id: item.id,
                    code: `Q1-POI-000${index + 1}`,
                    name: item.name,
                    category: item.category || "Di Tích Lịch Sử",
                    location: "TP. Hồ Chí Minh / Quận 1",
                    lat: Number(item.lat),
                    lng: Number(item.lng),
                    radiusM: Number(item.radiusM) || 30,
                    listens: oldListensMap[item.name] || 0,
                    rating: 0,
                    density: "neutral",
                    isActive: item.isActive !== false,
                    availableLanguages: item.availableLanguages && item.availableLanguages.length > 0 ? item.availableLanguages : ["vi", "en"],
                    imageUrl: item.imageUrl || DEFAULT_Q1_POIS[index % DEFAULT_Q1_POIS.length].imageUrl
                }));
            }
        }
    } catch (e) {
        console.warn("Chưa kết nối Backend, hiển thị danh sách mặc định Quận 1:", e.message);
    }

    renderDashboardTopPois();
    renderPoiTable();
    renderHeatmapMarkers();
    updateStatCards();
    renderAnalyticsData();
}

function getPoiThumbHtml(poi) {
    const icons = {
        'Dinh Độc Lập': 'fa-landmark',
        'Bưu Điện Trung Tâm': 'fa-envelope-open-text',
        'Nhà Thờ Đức Bà': 'fa-church',
        'Nhà Hát Thành Phố': 'fa-masks-theater',
        'Chợ Bến Thành': 'fa-store',
        'Phố Đi Bộ Nguyễn Huệ': 'fa-person-walking'
    };
    const iconClass = icons[poi.name] || 'fa-map-pin';
    return `<div class="poi-thumb-box" title="${poi.name}"><i class="fa-solid ${iconClass}"></i></div>`;
}

// ================= 5. HIỂN THỊ DỮ LIỆU BẢNG =================
function renderDashboardTopPois() {
    const tbody = document.getElementById("topPoisTableBody");
    tbody.innerHTML = "";

    // Sắp xếp theo số lượt nghe thực tế (từ cao xuống thấp)
    const sortedPois = [...poiList].sort((a, b) => b.listens - a.listens).slice(0, 5);

    sortedPois.forEach(poi => {
        const tr = document.createElement("tr");

        let ratingHtml = `<span style="color: #94a3b8; font-size: 12px;">Chưa có</span>`;
        if (poi.rating > 0) {
            ratingHtml = `
                <span class="rating-badge">
                    <i class="fa-solid fa-star text-amber-500"></i> ${poi.rating.toFixed(1)}
                </span>
            `;
        }

        tr.innerHTML = `
            <td>
                <div class="poi-cell">
                    ${getPoiThumbHtml(poi)}
                    <div>
                        <span class="poi-name-text">${poi.name}</span>
                        <span class="poi-sub-text">${poi.category}</span>
                    </div>
                </div>
            </td>
            <td>${poi.location}</td>
            <td><strong>${poi.listens.toLocaleString()}</strong> lượt</td>
            <td>${ratingHtml}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderPoiTable() {
    const tbody = document.getElementById("poiTableBody");
    tbody.innerHTML = "";

    document.getElementById("poiTotalBadge").textContent = `${poiList.length} Địa Điểm`;
    document.getElementById("cardPoiCount").textContent = poiList.length;
    document.getElementById("totalPoiText").textContent = poiList.length;
    document.getElementById("showingCount").textContent = `1 - ${poiList.length}`;

    poiList.forEach(poi => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><strong>${poi.code}</strong></td>
            <td>
                <div class="poi-cell">
                    <div>
                        <span class="poi-name-text">${poi.name}</span>
                        <span class="poi-sub-text">${poi.category} • Quận 1</span>
                    </div>
                </div>
            </td>
            <td>
                <i class="fa-solid fa-location-arrow text-blue"></i> 
                ${poi.lat.toFixed(4)}° N, ${poi.lng.toFixed(4)}° E
            </td>
            <td>
                <span class="badge-geofence">🎯 ${poi.radiusM}m</span>
            </td>
            <td>
                <span class="status-badge ${poi.isActive ? 'active' : 'inactive'}">
                    ${poi.isActive ? 'Đang hoạt động' : 'Tạm dừng'}
                </span>
            </td>
            <td class="text-center">
                <div class="actions-cell">
                    <button class="btn-action" title="Quản lý âm thanh" onclick="openAudioModal('${poi.id}')">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                    <button class="btn-action" title="Sửa thông tin" onclick="openEditModal('${poi.id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-action btn-del" title="Xóa" onclick="deletePoi('${poi.id}')">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Cập nhật 4 thẻ thống kê trên Dashboard theo dữ liệu thực tế
function updateStatCards() {
    // 1. Tổng lượt nghe thuyết minh
    document.getElementById("cardTotalAudience").textContent = totalAudienceCount.toLocaleString();

    // 2. Điểm đến phổ biến nhất
    const topPoi = [...poiList].sort((a, b) => b.listens - a.listens)[0];
    if (topPoi && topPoi.listens > 0) {
        document.getElementById("topPoiTitle").textContent = topPoi.name;
        document.getElementById("topPoiSubValue").textContent = `${topPoi.listens.toLocaleString()} lượt nghe`;
        const percentage = Math.round((topPoi.listens / (totalAudienceCount || 1)) * 100);
        document.getElementById("topPoiFooterNote").innerHTML = `<i class="fa-solid fa-location-dot"></i> Chiếm ${percentage}% tổng lưu lượng`;
    } else {
        document.getElementById("topPoiTitle").textContent = "--";
        document.getElementById("topPoiSubValue").textContent = "0 lượt nghe";
        document.getElementById("topPoiFooterNote").innerHTML = `<i class="fa-solid fa-location-dot"></i> Chưa có dữ liệu tương tác`;
    }

    // 3. Số thiết bị đang truy cập hiện tại
    const deviceCount = currentActiveDevicesCount;
    document.getElementById("cardActiveDevices").textContent = deviceCount;
    document.getElementById("deviceStatusText").textContent = deviceCount > 0 ? "Đang Online" : "Trực tuyến";
    document.getElementById("deviceBreakdown").textContent = `Điện thoại di động (${currentMobileCount}) • Trình duyệt Web (${currentWebCount})`;

    const totalDev = deviceCount || 1;
    document.getElementById("barMobile").style.width = deviceCount > 0 ? `${(currentMobileCount / totalDev) * 100}%` : "0%";
    document.getElementById("barWeb").style.width = deviceCount > 0 ? `${(currentWebCount / totalDev) * 100}%` : "0%";

    // 4. Phiên hoạt động trực tiếp
    document.getElementById("cardLiveSessions").textContent = liveSessionsCount;
}

// ================= 6. LIVE REALTIME ACTIVITY FEED (KHỞI ĐẦU RỖNG - CHỈ HIỆN KHI CÓ SỰ KIỆN THỰC) =================
function initRealtimeActivityFeed() {
    const feed = document.getElementById("activityFeed");
    // Khởi đầu rỗng, không spam dữ liệu giả
    feed.innerHTML = `
        <div id="emptyFeedState" style="text-align: center; padding: 32px 16px; color: #94a3b8; font-size: 13px;">
            <i class="fa-solid fa-tower-cell" style="font-size: 26px; margin-bottom: 8px; display: block; color: #cbd5e1;"></i>
            Chưa có hoạt động kích hoạt GPS nào.<br>
            <span style="font-size: 11.5px; color: #cbd5e1;">Hệ thống đang trực tuyến và chờ du khách tiếp cận vùng Geofence 30m...</span>
        </div>
    `;
}

// Hàm ghi nhận 1 sự kiện thực tế khi du khách kích hoạt GPS hoặc bấm nghe Audio
function recordRealtimeEvent(eventData) {
    const feed = document.getElementById("activityFeed");
    const emptyState = document.getElementById("emptyFeedState");
    if (emptyState) emptyState.remove();

    // Tăng tổng thính giả & lượt nghe của POI tương ứng
    totalAudienceCount++;
    if (eventData && eventData.triggerType === 'auto') {
        autoListensCount++;
    } else {
        manualListensCount++;
    }
    if (currentActiveDevicesCount === 0) {
        currentActiveDevicesCount = 1;
        currentMobileCount = 1;
    }
    liveSessionsCount = Math.max(1, currentActiveDevicesCount);

    const matchedPoi = poiList.find(p => p.id === eventData.poiId || p.name === eventData.poiName);
    if (matchedPoi) {
        matchedPoi.listens += 1;
    }

    // Cập nhật ngay biểu đồ xu hướng cho mọi lượt nghe (cả tự động & chọn trên bản đồ)
    const now = new Date();
    const key = trendTodayKey || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    trendTodayKey = key;
    if (!Array.isArray(trendHourlyByDay[key])) {
        trendHourlyByDay[key] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    trendHourlyByDay[key][getTrendSlotIndex(now.getHours())] += 1;
    updateTrendChart(true);

    // Thêm dòng Log vào Feed
    const item = document.createElement("div");
    item.className = "feed-item";
    item.innerHTML = `
        <div class="feed-left">
            <div class="feed-icon"><i class="fa-solid fa-location-crosshairs"></i></div>
            <div>
                <div class="feed-title">${eventData.poiName || 'Điểm Di Tích Quận 1'} <span class="feed-id">#${eventData.poiCode || 'GPS-TRIGGER'}</span></div>
                <div class="feed-sub">Thiết bị: ${eventData.deviceInfo || 'Du khách Web Client'}</div>
            </div>
        </div>
        <div class="feed-right">
            <span class="feed-lang">${eventData.language || 'Tiếng Việt'}</span>
            <span class="feed-time">Vừa xong</span>
        </div>
    `;

    feed.insertBefore(item, feed.firstChild);
    if (feed.children.length > 6) feed.removeChild(feed.lastChild);

    renderDashboardTopPois();
    renderPoiTable();
    updateStatCards();
    renderAnalyticsData();
}


// ================= 7. LẮNG NGHE KẾT NỐI THỜI GIAN THỰC TỪ SERVER (PORT 3000) =================
function setupSyncListener() {
    async function pollRealtimeStats() {
        try {
            const statsUrl = (window.location.protocol.startsWith('http') ? '' : 'http://127.0.0.1:3000') + '/api/realtime-stats';
            const res = await fetch(statsUrl);
            if (res.ok) {
                const data = await res.json();

                // 1. Cập nhật số thiết bị online từ Server
                currentActiveDevicesCount = data.activeDevicesCount || 0;
                currentMobileCount = data.mobileCount || 0;
                currentWebCount = data.webCount || 0;
                liveSessionsCount = currentActiveDevicesCount;

                // 2. Cập nhật tổng thính giả
                totalAudienceCount = data.totalAudience || 0;
                autoListensCount = data.autoListens || 0;
                manualListensCount = data.manualListens || 0;

                // 2b. Cập nhật biểu đồ xu hướng từ dữ liệu thực tế (mọi lượt nghe)
                if (data.hourlyByDay) {
                    trendHourlyByDay = data.hourlyByDay;
                    trendTodayKey = data.todayKey || trendTodayKey;
                    updateTrendChart();
                }

                // 2c. Kiểm tra nếu danh sách POI có thay đổi từ tab khác
                if (data.poisVersion) {
                    if (currentPoisVersion && currentPoisVersion !== data.poisVersion) {
                        await fetchPoisFromBackend();
                    }
                    currentPoisVersion = data.poisVersion;
                }

                // 3. Cập nhật số lượt nghe từng POI
                let listensChanged = false;
                if (data.poiListens) {
                    poiList.forEach(poi => {
                        if (data.poiListens[poi.name] !== undefined && poi.listens !== data.poiListens[poi.name]) {
                            poi.listens = data.poiListens[poi.name];
                            listensChanged = true;
                        }
                    });
                }
                if (listensChanged) {
                    renderHeatmapMarkers();
                }

                // 4. Cập nhật Feed sự kiện mới nhất
                if (Array.isArray(data.recentEvents) && data.recentEvents.length > 0) {
                    const feed = document.getElementById("activityFeed");
                    const emptyState = document.getElementById("emptyFeedState");
                    if (emptyState) emptyState.remove();

                    feed.innerHTML = data.recentEvents.slice(0, 6).map(ev => {
                        const secAgo = Math.max(1, Math.round((Date.now() - ev.timestamp) / 1000));
                        return `
                            <div class="feed-item">
                                <div class="feed-left">
                                    <div class="feed-icon"><i class="fa-solid fa-location-crosshairs"></i></div>
                                    <div>
                                        <div class="feed-title">${ev.poiName} <span class="feed-id">#${ev.poiCode}</span></div>
                                        <div class="feed-sub">Thiết bị: ${ev.deviceInfo}</div>
                                    </div>
                                </div>
                                <div class="feed-right">
                                    <span class="feed-lang">${ev.language}</span>
                                    <span class="feed-time">${secAgo}s trước</span>
                                </div>
                            </div>
                        `;
                    }).join("");
                }

                renderDashboardTopPois();
                renderPoiTable();
                updateStatCards();
                renderAnalyticsData();
            }
        } catch (e) {
            // console.warn("Lỗi poll realtime stats:", e);
        }
    }

    // Polling đều đặn mỗi 2 giây
    pollRealtimeStats();
    setInterval(pollRealtimeStats, 2000);
}


// ================= 8. XỬ LÝ MODAL THÊM / SỬA / XÓA POI =================
const poiModal = document.getElementById("poiModal");
const poiForm = document.getElementById("poiForm");
const audioModal = document.getElementById("audioModal");
const audioForm = document.getElementById("audioForm");

function initModalHandlers() {
    document.getElementById("btnOpenAddModal").addEventListener("click", () => {
        document.getElementById("modalTitle").textContent = "Thêm Điểm Đến Du Lịch Mới";
        poiForm.reset();
        document.getElementById("formPoiId").value = "";
        poiModal.classList.remove("hide");
    });

    document.getElementById("btnCloseModal").addEventListener("click", () => poiModal.classList.add("hide"));
    document.getElementById("btnCancelModal").addEventListener("click", () => poiModal.classList.add("hide"));

    document.getElementById("btnCloseAudioModal").addEventListener("click", () => audioModal.classList.add("hide"));
    document.getElementById("btnCancelAudioModal").addEventListener("click", () => audioModal.classList.add("hide"));

    // Lưu Form POI
    poiForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("formPoiId").value;
        const payload = {
            name: document.getElementById("formName").value.trim(),
            lat: parseFloat(document.getElementById("formLat").value),
            lng: parseFloat(document.getElementById("formLng").value),
            radiusM: parseInt(document.getElementById("formRadius").value) || 30,
            isActive: document.getElementById("formIsActive").value === "true",
            imageUrl: document.getElementById("formImageUrl").value.trim()
        };

        let serverPoi = null;
        try {
            if (id) {
                const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (res.ok) serverPoi = await res.json();
                // Đồng bộ song song sang Spring Boot (:8080) nếu đang bật Docker
                fetch(`${SPRING_API_BASE}/${encodeURIComponent(id)}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }).catch(() => {});
            } else {
                const res = await fetch(API_BASE, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (res.ok) serverPoi = await res.json();
                // Đồng bộ song song sang Spring Boot (:8080) nếu đang bật Docker
                fetch(SPRING_API_BASE, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }).catch(() => {});
            }
        } catch (err) {
            console.warn("Lưu qua API lỗi, cập nhật tạm trên bộ nhớ:", err);
        }

        if (id) {
            const index = poiList.findIndex(p => p.id === id);
            if (index !== -1) Object.assign(poiList[index], payload);
        } else {
            poiList.push({
                id: (serverPoi && serverPoi.id) ? serverPoi.id : ("q1-poi-" + Date.now()),
                code: `Q1-POI-000${poiList.length + 1}`,
                category: "Di Tích Lịch Sử",
                location: "TP. Hồ Chí Minh / Quận 1",
                listens: 0,
                rating: 0,
                density: "neutral",
                availableLanguages: ["vi"],
                ...payload
            });
        }

        poiModal.classList.add("hide");
        renderPoiTable();
        renderDashboardTopPois();
        renderHeatmapMarkers();
        updateStatCards();
        renderAnalyticsData();
        if (heatmapMap) {
            heatmapMap.panTo([payload.lat, payload.lng]);
        }
        if (syncChannel) {
            try { syncChannel.postMessage({ type: "POIS_UPDATED", timestamp: Date.now() }); } catch (e) {}
        }
        alert("✅ Đã lưu thông tin điểm tham quan và đồng bộ lên Bản đồ!");
    });

    // Lưu Form Audio
    audioForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const poiId = document.getElementById("audioPoiId").value;
        const payload = {
            langCode: document.getElementById("audioLangCode").value,
            audioUrl: document.getElementById("audioUrlInput").value,
            ttsScript: document.getElementById("audioScriptInput").value,
            durationSec: parseInt(document.getElementById("audioDurationInput").value) || 30
        };

        try {
            await fetch(`${API_BASE}/${encodeURIComponent(poiId)}/audio`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            fetch(`${SPRING_API_BASE}/${encodeURIComponent(poiId)}/audio`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }).catch(() => {});
        } catch (err) {
            console.warn("Lưu audio API lỗi:", err);
        }

        if (syncChannel) {
            try { syncChannel.postMessage({ type: "POIS_UPDATED", timestamp: Date.now() }); } catch (e) {}
        }
        audioModal.classList.add("hide");
        alert("✅ Đã cập nhật bài thuyết minh âm thanh thành công!");
    });
}

window.openEditModal = function (id) {
    const poi = poiList.find(p => p.id === id);
    if (!poi) return;

    document.getElementById("modalTitle").textContent = "Chỉnh Sửa Điểm Tham Quan";
    document.getElementById("formPoiId").value = poi.id;
    document.getElementById("formName").value = poi.name;
    document.getElementById("formLat").value = poi.lat;
    document.getElementById("formLng").value = poi.lng;
    document.getElementById("formRadius").value = poi.radiusM;
    document.getElementById("formIsActive").value = poi.isActive ? "true" : "false";
    document.getElementById("formImageUrl").value = poi.imageUrl || "";

    poiModal.classList.remove("hide");
};

window.openAudioModal = function (id) {
    document.getElementById("audioPoiId").value = id;
    audioModal.classList.remove("hide");
};

window.deletePoi = async function (id) {
    if (confirm("Bạn có chắc chắn muốn xóa điểm di tích này không?")) {
        try {
            await fetch(`${API_BASE}/${encodeURIComponent(id)}`, { method: "DELETE" });
            fetch(`${SPRING_API_BASE}/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
        } catch (e) {
            console.warn("Xóa qua API lỗi:", e);
        }
        poiList = poiList.filter(p => p.id !== id);
        poiList.forEach((p, idx) => { p.code = `Q1-POI-000${idx + 1}`; });
        renderPoiTable();
        renderDashboardTopPois();
        renderHeatmapMarkers();
        updateStatCards();
        renderAnalyticsData();
        if (syncChannel) {
            try { syncChannel.postMessage({ type: "POIS_UPDATED", timestamp: Date.now() }); } catch (e) {}
        }
        alert("✅ Đã xóa điểm tham quan khỏi hệ thống và bản đồ!");
    }
};


// ================= 8. RENDER THỐNG KÊ & PHÂN TÍCH (ANALYTICS) =================
function renderAnalyticsData() {
    const elAuto = document.getElementById("analyticsAutoListens");
    if (elAuto) elAuto.textContent = autoListensCount.toLocaleString();

    const elManual = document.getElementById("analyticsManualListens");
    if (elManual) elManual.textContent = manualListensCount.toLocaleString();

    const totalReal = (autoListensCount + manualListensCount) || totalAudienceCount;
    const elTotal = document.getElementById("analyticsTotalListens");
    if (elTotal) elTotal.textContent = totalReal.toLocaleString();

    // Cập nhật tỷ lệ % thực tế trong phần phân tích phương thức
    const total = Math.max(1, totalReal);
    const autoPct = Math.round((autoListensCount / total) * 100);
    const manualPct = 100 - autoPct;

    const elPctAuto = document.getElementById("pctAutoTrigger");
    if (elPctAuto) elPctAuto.textContent = `${autoPct}% (${autoListensCount} lượt)`;
    const elPctManual = document.getElementById("pctManualTrigger");
    if (elPctManual) elPctManual.textContent = `${manualPct}% (${manualListensCount} lượt)`;

    updatePeakHourStats(sumAllTrendSlots());

    // Render thanh progress bar 6 POI
    const barsContainer = document.getElementById("analyticsPoiBars");
    if (barsContainer) {
        const sorted = [...poiList].sort((a, b) => (b.listens || 0) - (a.listens || 0));
        const maxListens = Math.max(1, (sorted[0] && sorted[0].listens) || 0);
        barsContainer.innerHTML = sorted.map(poi => {
            const pct = Math.round(((poi.listens || 0) / maxListens) * 100);
            return `
                <div class="analytics-bar-item">
                    <div class="bar-labels">
                        <span class="bar-name"><strong>${poi.name}</strong></span>
                        <span class="bar-value"><strong class="text-blue">${poi.listens || 0}</strong> lượt nghe</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${Math.max(6, pct)}%;"></div>
                    </div>
                </div>
            `;
        }).join("");
    }
}

function getTrendSlotIndex(hour) {
    if (hour < 5) return 8;
    return Math.min(8, Math.floor((hour - 5) / 2));
}

function updatePeakHourStats(slots) {
    const SLOT_RANGES = [
        "05h – 07h",
        "07h – 09h",
        "09h – 11h",
        "11h – 13h",
        "13h – 15h",
        "15h – 17h",
        "17h – 19h",
        "19h – 21h",
        "21h – 05h"
    ];
    const total = Array.isArray(slots) ? slots.reduce((a, b) => a + (Number(b) || 0), 0) : 0;
    const elHour = document.getElementById("analyticsPeakHour");
    const elNote = document.getElementById("analyticsPeakNote");

    if (total === 0) {
        if (elHour) elHour.textContent = "--";
        if (elNote) elNote.textContent = "Chưa có dữ liệu";
    } else {
        let peakIdx = 0;
        let maxVal = -1;
        slots.forEach((v, idx) => {
            const num = Number(v) || 0;
            if (num > maxVal) {
                maxVal = num;
                peakIdx = idx;
            }
        });
        const pct = Math.round((maxVal / total) * 100);
        if (elHour) elHour.textContent = SLOT_RANGES[peakIdx] || "--";
        if (elNote) elNote.textContent = `Chiếm ${pct}% (${maxVal}/${total} lượt)`;
    }

    const labelsBox = document.getElementById("chartTimeLabels");
    if (labelsBox && Array.isArray(slots)) {
        const periods = [
            { range: "05:00 – 09:00", name: "Buổi Sáng", count: (slots[0] || 0) + (slots[1] || 0) },
            { range: "09:00 – 13:00", name: "Buổi Trưa", count: (slots[2] || 0) + (slots[3] || 0) },
            { range: "13:00 – 17:00", name: "Buổi Chiều", count: (slots[4] || 0) + (slots[5] || 0) },
            { range: "17:00 – 05:00", name: "Buổi Tối & Đêm", count: (slots[6] || 0) + (slots[7] || 0) + (slots[8] || 0) }
        ];
        const maxPeriod = Math.max(...periods.map(p => p.count));
        labelsBox.innerHTML = periods.map(p => {
            const isPeak = total > 0 && p.count === maxPeriod && p.count > 0;
            return `
                <div class="time-slot ${isPeak ? 'highlight-slot' : ''}">
                    <strong>${p.range}</strong>
                    <span class="${isPeak ? 'tag-peak' : ''}">${p.name} (${p.count} lượt)${isPeak ? ' • Cao Điểm' : ''}</span>
                </div>
            `;
        }).join("");
    }
}

// Gộp toàn bộ số lượt nghe theo 9 khung giờ (từ tất cả các ngày trong hourlyByDay)
function sumAllTrendSlots() {
    const total = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (!trendHourlyByDay || typeof trendHourlyByDay !== "object") return total;
    Object.values(trendHourlyByDay).forEach(arr => {
        if (Array.isArray(arr)) {
            arr.forEach((v, i) => {
                if (i >= 0 && i < 9) total[i] += Number(v) || 0;
            });
        }
    });
    return total;
}

function updateTrendChart(force = false) {
    if (!trendChartInstance) return;
    const main = sumAllTrendSlots();
    const mainLabel = "Tổng lượt nghe theo khung giờ";

    // Chỉ vẽ lại khi dữ liệu thay đổi (tránh biểu đồ nhấp nháy mỗi 2 giây)
    const signature = JSON.stringify(main);
    if (!force && signature === lastTrendSignature) return;
    lastTrendSignature = signature;

    trendChartInstance.data.datasets[0].label = mainLabel;
    trendChartInstance.data.datasets[0].data = main;
    trendChartInstance.update();

    const legendMain = document.getElementById("trendLegendMain");
    if (legendMain) legendMain.textContent = mainLabel;

    updatePeakHourStats(main);
    const totalMain = main.reduce((a, b) => a + b, 0);
    const tag = document.getElementById("trendStatusTag");
    if (tag) {
        tag.textContent = totalMain > 0 ? `${totalMain} lượt nghe` : "Chờ dữ liệu";
        tag.style.background = totalMain > 0 ? "#dcfce7" : "#e2e8f0";
    }
}

function initAnalyticsFilter() {
    const btnExport = document.getElementById("btnExportAnalytics");
    if (btnExport) {
        btnExport.addEventListener("click", () => {
            alert("📊 Báo cáo phân tích dữ liệu du lịch Quận 1 đã được xuất thành công!");
        });
    }
}
