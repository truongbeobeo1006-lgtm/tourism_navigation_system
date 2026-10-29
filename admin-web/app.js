/**
 * GEO TOUR - ADMIN CMS JAVASCRIPT
 * Dữ liệu thời gian thực - Bắt đầu từ 0 và chỉ cập nhật khi có du khách sử dụng thực tế
 */

const API_BASE = "http://localhost:8080/api/v1/pois";

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
let trendChartInstance = null;

// Biến trạng thái thời gian thực
let totalAudienceCount = 0;
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
    initNavigation();
    initChart();
    initHeatmapMap();
    fetchPoisFromBackend();
    initRealtimeActivityFeed();
    initModalHandlers();
    setupSyncListener();
    initQrGenerator();
});

// ================= 1. ĐIỀU HƯỚNG TẮT/BẬT MÀN HÌNH =================
function initNavigation() {
    const navDashboard = document.getElementById("navDashboard");
    const navPois = document.getElementById("navPois");
    const linkViewAllPois = document.getElementById("linkViewAllPois");
    const navQrCode = document.getElementById("navQrCode");
    if (navQrCode) navQrCode.addEventListener("click", (e) => { e.preventDefault(); if (window.openQrModal) window.openQrModal(); });

    const secDashboard = document.getElementById("sectionDashboard");
    const secPois = document.getElementById("sectionPois");

    function switchPage(page) {
        if (page === "dashboard") {
            navDashboard.classList.add("active");
            navPois.classList.remove("active");
            secDashboard.classList.add("active");
            secPois.classList.remove("active");
            if (heatmapMap) setTimeout(() => heatmapMap.invalidateSize(), 200);
        } else if (page === "pois") {
            navPois.classList.add("active");
            navDashboard.classList.remove("active");
            secPois.classList.add("active");
            secDashboard.classList.remove("active");
        }
    }

    navDashboard.addEventListener("click", (e) => { e.preventDefault(); switchPage("dashboard"); });
    navPois.addEventListener("click", (e) => { e.preventDefault(); switchPage("pois"); });
    linkViewAllPois.addEventListener("click", (e) => { e.preventDefault(); switchPage("pois"); });
}

// ================= 2. VẼ BIỂU ĐỒ XU HƯỚNG (BAN ĐẦU = 0, CẬP NHẬT KHI CÓ DỮ LIỆU) =================
function initChart() {
    const ctx = document.getElementById("trendChart").getContext("2d");

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
                    label: "Hôm nay",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: "#093359",
                    backgroundColor: gradientToday,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.45,
                    pointRadius: 3,
                    pointBackgroundColor: "#093359"
                },
                {
                    label: "Trung bình tuần",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: "#94a3b8",
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.45,
                    pointRadius: 0
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
                        stepSize: 2
                    }
                }
            }
        }
    });
}

// ================= 3. KHỞI TẠO BẢN ĐỒ HEATMAP QUẬN 1 =================
function initHeatmapMap() {
    heatmapMap = L.map("heatmapLeaflet", {
        zoomControl: false,
        attributionControl: false
    }).setView([10.7769, 106.6990], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(heatmapMap);

    renderHeatmapMarkers();
}

function renderHeatmapMarkers() {
    if (!heatmapMap) return;

    poiList.forEach(poi => {
        let color = "#0284c7"; // Mặc định trung hòa
        let densityText = "Chưa phát sinh kích hoạt";

        if (poi.listens > 50) {
            color = "#ef4444"; // Rất cao
            densityText = `Rất cao (${poi.listens} lượt)`;
        } else if (poi.listens > 10) {
            color = "#0284c7";
            densityText = `Trung bình (${poi.listens} lượt)`;
        } else if (poi.listens > 0) {
            color = "#10b981";
            densityText = `Mới kích hoạt (${poi.listens} lượt)`;
        }

        // Vòng tròn Geofence 30m
        L.circle([poi.lat, poi.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.18,
            radius: poi.radiusM || 30
        }).addTo(heatmapMap);

        // Marker điểm POI
        const marker = L.circleMarker([poi.lat, poi.lng], {
            radius: 8,
            color: "#ffffff",
            weight: 2,
            fillColor: color,
            fillOpacity: 1
        }).addTo(heatmapMap);

        marker.bindTooltip(`
            <div style="font-family: inherit; font-size: 12px; font-weight: 700;">
                <strong>${poi.name}</strong><br>
                <span style="color: ${color};">● ${densityText}</span>
            </div>
        `, { direction: "top" });
    });
}

// ================= 4. GỌI API BACKEND (API GATEWAY PORT 8080) =================
async function fetchPoisFromBackend() {
    try {
        const response = await fetch(`${API_BASE}/all?lang=vi`);
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                poiList = data.map((item, index) => ({
                    id: item.id,
                    code: `Q1-POI-000${index + 1}`,
                    name: item.name,
                    category: "Di Tích Lịch Sử",
                    location: "TP. Hồ Chí Minh / Quận 1",
                    lat: item.lat,
                    lng: item.lng,
                    radiusM: item.radiusM || 30,
                    listens: 0, // Bắt đầu bằng 0
                    rating: 0,  // Bắt đầu bằng 0 (chưa có đánh giá)
                    density: "neutral",
                    isActive: item.isActive !== false,
                    availableLanguages: item.availableLanguages && item.availableLanguages.length > 0 ? item.availableLanguages : ["vi", "en"],
                    imageUrl: item.imageUrl || DEFAULT_Q1_POIS[index % DEFAULT_Q1_POIS.length].imageUrl
                }));
            }
        }
    } catch (e) {
        console.warn("Chưa kết nối Backend Gateway, hiển thị danh sách 6 điểm Quận 1:", e.message);
    }

    renderDashboardTopPois();
    renderPoiTable();
    updateStatCards();
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
        const langsHtml = poi.availableLanguages.map(l => `<span class="lang-tag">${l.toUpperCase()}</span>`).join(" ");

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
            <td><div class="lang-tags">${langsHtml}</div></td>
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
    if (currentActiveDevicesCount === 0) {
        currentActiveDevicesCount = 1;
        currentMobileCount = 1;
    }
    liveSessionsCount = Math.max(1, currentActiveDevicesCount);

    const matchedPoi = poiList.find(p => p.id === eventData.poiId || p.name === eventData.poiName);
    if (matchedPoi) {
        matchedPoi.listens += 1;
    }

    // Cập nhật biểu đồ hôm nay
    if (trendChartInstance) {
        const hour = new Date().getHours();
        let slotIndex = 0;
        if (hour >= 6 && hour < 9) slotIndex = 0;
        else if (hour >= 9 && hour < 11) slotIndex = 1;
        else if (hour >= 11 && hour < 13) slotIndex = 2;
        else if (hour >= 13 && hour < 15) slotIndex = 3;
        else if (hour >= 15 && hour < 17) slotIndex = 4;
        else if (hour >= 17 && hour < 19) slotIndex = 5;
        else if (hour >= 19 && hour < 21) slotIndex = 6;
        else slotIndex = 7;

        trendChartInstance.data.datasets[0].data[slotIndex] += 1;
        trendChartInstance.update();
    }

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

                // 3. Cập nhật số lượt nghe từng POI
                if (data.poiListens) {
                    poiList.forEach(poi => {
                        if (data.poiListens[poi.name] !== undefined) {
                            poi.listens = data.poiListens[poi.name];
                        }
                    });
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
            name: document.getElementById("formName").value,
            lat: parseFloat(document.getElementById("formLat").value),
            lng: parseFloat(document.getElementById("formLng").value),
            radiusM: parseInt(document.getElementById("formRadius").value),
            isActive: document.getElementById("formIsActive").value === "true",
            imageUrl: document.getElementById("formImageUrl").value
        };

        try {
            if (id) {
                await fetch(`${API_BASE}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
            } else {
                await fetch(API_BASE, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
            }
        } catch (err) {
            console.warn("Lưu qua API lỗi, cập nhật tạm trên bộ nhớ:", err);
        }

        if (id) {
            const index = poiList.findIndex(p => p.id === id);
            if (index !== -1) Object.assign(poiList[index], payload);
        } else {
            poiList.unshift({
                id: "poi-" + Date.now(),
                code: `Q1-POI-000${poiList.length + 1}`,
                category: "Điểm Mới",
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
        alert("✅ Đã lưu thông tin điểm tham quan thành công!");
    });

    // Lưu Form Audio
    audioForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const poiId = document.getElementById("audioPoiId").value;
        const payload = {
            langCode: document.getElementById("audioLangCode").value,
            audioUrl: document.getElementById("audioUrlInput").value,
            ttsScript: document.getElementById("audioScriptInput").value,
            durationSec: parseInt(document.getElementById("audioDurationInput").value)
        };

        try {
            await fetch(`${API_BASE}/${poiId}/audio`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.warn("Lưu audio API lỗi:", err);
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
            await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
        } catch (e) {
            console.warn("Xóa qua API lỗi:", e);
        }
        poiList = poiList.filter(p => p.id !== id);
        renderPoiTable();
        renderDashboardTopPois();
        alert("✅ Đã xóa điểm tham quan!");
    }
};

// ================= 9. QR CODE GENERATOR FOR TOUR PASS (UC04) =================
function initQrGenerator() {
    const qrModal = document.getElementById("qrModal");
    const btnOpenQrModal = document.getElementById("btnOpenQrModal");
    const btnCloseQrModal = document.getElementById("btnCloseQrModal");
    const btnApplyQrModal = document.getElementById("btnApplyQrModal");
    const btnGenRandomTicket = document.getElementById("btnGenRandomTicket");
    const btnCopyQrUrl = document.getElementById("btnCopyQrUrl");
    const btnDownloadQr = document.getElementById("btnDownloadQr");
    const btnPrintQr = document.getElementById("btnPrintQr");
    const btnMode4G = document.getElementById("btnMode4G");
    const btnModeLan = document.getElementById("btnModeLan");
    const qrNetworkHint = document.getElementById("qrNetworkHint");

    const qrBaseUrl = document.getElementById("qrBaseUrl");
    const qrTicketCode = document.getElementById("qrTicketCode");
    const qrValidity = document.getElementById("qrValidity");
    const qrStartPoi = document.getElementById("qrStartPoi");
    const qrPreviewImg = document.getElementById("qrPreviewImg");
    const qrFullUrlPreview = document.getElementById("qrFullUrlPreview");
    const qrCopyNotice = document.getElementById("qrCopyNotice");

    let networkUrls = {
        tunnelUrl: 'https://hosting-extensions-fact-shot.trycloudflare.com',
        lanUrl: 'http://localhost:3000',
        localUrl: 'http://localhost:3000'
    };

    function fetchNetworkUrls() {
        fetch('/api/tunnel-url')
            .then(res => res.json())
            .then(data => {
                if (data.tunnelUrl) networkUrls.tunnelUrl = data.tunnelUrl;
                if (data.lanUrl) networkUrls.lanUrl = data.lanUrl;
                if (data.localUrl) networkUrls.localUrl = data.localUrl;
                
                // Luôn ưu tiên dùng Tunnel 4G công khai để quét khác mạng
                if (qrBaseUrl && (!qrBaseUrl.value || qrBaseUrl.value.includes('localhost') || qrBaseUrl.value.includes('127.0.0.1') || qrBaseUrl.value.includes('boats-diet'))) {
                    qrBaseUrl.value = networkUrls.tunnelUrl;
                    updateQrPreview();
                }
            })
            .catch(() => {});
    }
    fetchNetworkUrls();

    // Default to 4G Public Tunnel
    qrBaseUrl.value = networkUrls.tunnelUrl;

    if (btnMode4G) {
        btnMode4G.addEventListener("click", () => {
            qrBaseUrl.value = networkUrls.tunnelUrl;
            btnMode4G.className = "btn btn-primary";
            if (btnModeLan) btnModeLan.className = "btn btn-outline";
            if (qrNetworkHint) {
                qrNetworkHint.innerText = "✅ Đang dùng link 4G công khai: Quét được từ mọi điện thoại từ xa.";
                qrNetworkHint.style.color = "#16a34a";
            }
            updateQrPreview();
        });
    }

    if (btnModeLan) {
        btnModeLan.addEventListener("click", () => {
            qrBaseUrl.value = networkUrls.lanUrl;
            btnModeLan.className = "btn btn-primary";
            if (btnMode4G) btnMode4G.className = "btn btn-outline";
            if (qrNetworkHint) {
                qrNetworkHint.innerText = "ℹ️ Đang dùng IP mạng LAN: Điện thoại và máy tính phải bắt chung 1 mạng Wi-Fi.";
                qrNetworkHint.style.color = "#0284c7";
            }
            updateQrPreview();
        });
    }

    function buildQrUrl() {
        let base = (qrBaseUrl.value || networkUrls.tunnelUrl).trim().replace(/\/+$/, "");
        const ticket = (qrTicketCode.value || "TOUR-PASS-DEMO-24H").trim();
        let fullUrl = `${base}/?ticket=${encodeURIComponent(ticket)}`;
        if (qrValidity && qrValidity.value && qrValidity.value !== "24h") {
            fullUrl += `&valid=${encodeURIComponent(qrValidity.value)}`;
        }
        if (qrStartPoi && qrStartPoi.value) {
            fullUrl += `&poi=${encodeURIComponent(qrStartPoi.value)}`;
        }
        return fullUrl;
    }

    function updateQrPreview() {
        const fullUrl = buildQrUrl();
        if (qrFullUrlPreview) qrFullUrlPreview.value = fullUrl;
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=10&data=${encodeURIComponent(fullUrl)}`;
        if (qrPreviewImg) qrPreviewImg.src = qrApiUrl;
    }

    window.openQrModal = function () {
        fetchNetworkUrls();
        // Đảm bảo không bao giờ gán localhost khi mở modal
        if (!qrBaseUrl.value || qrBaseUrl.value.includes('localhost') || qrBaseUrl.value.includes('127.0.0.1')) {
            qrBaseUrl.value = networkUrls.tunnelUrl;
        }
        updateQrPreview();
        if (qrModal) qrModal.classList.remove("hide");
    };

    if (btnOpenQrModal) btnOpenQrModal.addEventListener("click", window.openQrModal);
    if (btnCloseQrModal) btnCloseQrModal.addEventListener("click", () => qrModal.classList.add("hide"));
    if (btnApplyQrModal) btnApplyQrModal.addEventListener("click", () => qrModal.classList.add("hide"));

    // Real-time input updates
    [qrBaseUrl, qrTicketCode, qrValidity, qrStartPoi].forEach(el => {
        if (el) {
            el.addEventListener("input", updateQrPreview);
            el.addEventListener("change", updateQrPreview);
        }
    });

    // Generate random ticket code
    if (btnGenRandomTicket) {
        btnGenRandomTicket.addEventListener("click", () => {
            const randCode = "TOUR-" + Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + Math.floor(100 + Math.random() * 900);
            qrTicketCode.value = randCode;
            updateQrPreview();
        });
    }

    // Copy link
    if (btnCopyQrUrl) {
        btnCopyQrUrl.addEventListener("click", async () => {
            const url = qrFullUrlPreview.value;
            try {
                await navigator.clipboard.writeText(url);
            } catch (err) {
                qrFullUrlPreview.select();
                document.execCommand("copy");
            }
            if (qrCopyNotice) {
                qrCopyNotice.style.display = "inline-block";
                setTimeout(() => { qrCopyNotice.style.display = "none"; }, 3000);
            }
        });
    }

    // Download PNG
    if (btnDownloadQr) {
        btnDownloadQr.addEventListener("click", async () => {
            const fullUrl = buildQrUrl();
            const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=15&data=${encodeURIComponent(fullUrl)}`;
            try {
                const res = await fetch(qrApiUrl);
                const blob = await res.blob();
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = `QR-${qrTicketCode.value || "TourPass"}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
            } catch (e) {
                window.open(qrApiUrl, "_blank");
            }
        });
    }

    // Print Ticket
    if (btnPrintQr) {
        btnPrintQr.addEventListener("click", () => {
            const fullUrl = buildQrUrl();
            const ticket = qrTicketCode.value || "TOUR-PASS-DEMO-24H";
            const validity = qrValidity.options[qrValidity.selectedIndex].text;
            const startPoi = qrStartPoi.value ? qrStartPoi.options[qrStartPoi.selectedIndex].text : "Tự do khám phá 6 di tích Quận 1";
            const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(fullUrl)}`;

            const printWindow = window.open("", "_blank", "width=600,height=750");
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>VÉ THAM QUAN - QUẢN LÍ DU LỊCH QUẬN 1</title>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f1f5f9; }
                        .ticket-card { width: 360px; background: white; border-radius: 20px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; border: 2px dashed #0284c7; }
                        .brand { color: #0284c7; font-size: 22px; font-weight: 800; margin-bottom: 4px; }
                        .sub-brand { font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 20px; }
                        .qr-img { width: 220px; height: 220px; margin: 0 auto 16px; border-radius: 12px; border: 1px solid #e2e8f0; }
                        .ticket-code { font-size: 16px; font-weight: 800; color: #0f172a; background: #f8fafc; padding: 8px 12px; border-radius: 8px; margin-bottom: 14px; font-family: monospace; letter-spacing: 1px; }
                        .info-row { display: flex; justify-content: space-between; font-size: 12px; color: #475569; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
                        .guide { margin-top: 18px; font-size: 11px; color: #64748b; line-height: 1.5; }
                    </style>
                </head>
                <body>
                    <div class="ticket-card">
                        <div class="brand">🏛️ QUẢN LÍ DU LỊCH QUẬN 1</div>
                        <div class="sub-brand">HỆ THỐNG THUYẾT MINH DU LỊCH TỰ ĐỘNG</div>
                        <img src="${qrApiUrl}" class="qr-img" alt="QR Code">
                        <div class="ticket-code">${ticket}</div>
                        <div class="info-row"><span>Thời hạn vé:</span><strong>${validity}</strong></div>
                        <div class="info-row"><span>Điểm xuất phát:</span><strong>${startPoi}</strong></div>
                        <div class="info-row"><span>Hỗ trợ:</span><strong>6 Di tích Lịch sử Quận 1</strong></div>
                        <div class="guide">👉 <strong>Hướng dẫn:</strong> Dùng camera điện thoại quét mã QR để vào ngay ứng dụng dẫn đường và nghe thuyết minh tự động (Geofence 30m).</div>
                    </div>
                    <script>
                        window.onload = function() { window.print(); };
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        });
    }
}
