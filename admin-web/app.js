/**
 * GEO TOUR - ADMIN CMS JAVASCRIPT
 * Tích hợp Backend API Gateway (Port 8080) và hiển thị giao diện theo thiết kế chuẩn
 */

const API_BASE = "http://localhost:8080/api/v1/pois";

// Dữ liệu mặc định 6 điểm POI Quận 1 (đảm bảo hiển thị hoàn hảo ngay cả khi backend chưa bật)
const DEFAULT_Q1_POIS = [
    {
        id: "q1-poi-0001",
        code: "Q1-POI-0001",
        name: "Dinh Độc Lập",
        category: "Di Tích Lịch Sử Quốc Gia",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77692,
        lng: 106.69531,
        radiusM: 30,
        listens: 42810,
        rating: 4.9,
        density: "high", // đỏ
        isActive: true,
        availableLanguages: ["vi", "en", "zh", "ja"],
        imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=150"
    },
    {
        id: "q1-poi-0002",
        code: "Q1-POI-0002",
        name: "Bưu Điện Trung Tâm",
        category: "Kiến Trúc Pháp Cổ Điển",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77957,
        lng: 106.69930,
        radiusM: 30,
        listens: 31200,
        rating: 4.9,
        density: "high", // đỏ
        isActive: true,
        availableLanguages: ["vi", "en", "fr"],
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
        listens: 28940,
        rating: 4.8,
        density: "medium", // xanh
        isActive: true,
        availableLanguages: ["vi", "en"],
        imageUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=150"
    },
    {
        id: "q1-poi-0004",
        code: "Q1-POI-0004",
        name: "Nhà Hát Thành Phố",
        category: "Trung Tâm Nghệ Thuật",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77665,
        lng: 106.70318,
        radiusM: 30,
        listens: 21850,
        rating: 4.8,
        density: "medium",
        isActive: true,
        availableLanguages: ["vi", "en", "fr"],
        imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=150"
    },
    {
        id: "q1-poi-0005",
        code: "Q1-POI-0005",
        name: "Chợ Bến Thành",
        category: "Thương Mại & Văn Hóa",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77253,
        lng: 106.69803,
        radiusM: 30,
        listens: 19670,
        rating: 4.8,
        density: "medium",
        isActive: true,
        availableLanguages: ["vi", "en", "ja"],
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150"
    },
    {
        id: "q1-poi-0006",
        code: "Q1-POI-0006",
        name: "Phố Đi Bộ Nguyễn Huệ",
        category: "Không Gian Công Cộng",
        location: "TP. Hồ Chí Minh / Quận 1",
        lat: 10.77362,
        lng: 106.70408,
        radiusM: 40,
        listens: 17400,
        rating: 4.7,
        density: "low",
        isActive: true,
        availableLanguages: ["vi", "en"],
        imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=150"
    }
];

let poiList = [...DEFAULT_Q1_POIS];
let heatmapMap = null;

// ================= KHI TRANG TẢI XONG =================
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initChart();
    initHeatmapMap();
    fetchPoisFromBackend();
    initRealtimeActivityFeed();
    initModalHandlers();
});

// ================= 1. ĐIỀU HƯỚNG TẮT/BẬT MÀN HÌNH =================
function initNavigation() {
    const navDashboard = document.getElementById("navDashboard");
    const navPois = document.getElementById("navPois");
    const linkViewAllPois = document.getElementById("linkViewAllPois");

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

// ================= 2. VẼ BIỂU ĐỒ XU HƯỚNG THEO THIẾT KẾ =================
function initChart() {
    const ctx = document.getElementById("trendChart").getContext("2d");

    // Tạo gradient màu xanh mềm mại dưới đường cong
    const gradientToday = ctx.createLinearGradient(0, 0, 0, 220);
    gradientToday.addColorStop(0, "rgba(9, 51, 89, 0.25)");
    gradientToday.addColorStop(1, "rgba(9, 51, 89, 0.0)");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["06:00", "08:00", "10:00", "12:00", "14:00", "15:30", "17:00", "19:00", "21:00"],
            datasets: [
                {
                    label: "Hôm nay",
                    data: [1800, 2900, 4800, 6200, 9400, 11200, 9800, 7200, 3900],
                    borderColor: "#093359",
                    backgroundColor: gradientToday,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.45, // Làm đường cong mềm mại như mẫu
                    pointRadius: [0, 0, 0, 4, 0, 6, 0, 0, 0],
                    pointBackgroundColor: "#093359",
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2
                },
                {
                    label: "Trung bình tuần",
                    data: [1200, 2100, 3900, 5100, 7800, 8900, 8100, 5900, 3100],
                    borderColor: "#38bdf8",
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
                    titleFont: { size: 12, weight: "bold" },
                    padding: 10,
                    callbacks: {
                        label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw.toLocaleString()} lượt kích hoạt`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: "#94a3b8", font: { size: 11 } }
                },
                y: {
                    grid: { color: "#f1f5f9" },
                    ticks: {
                        color: "#94a3b8",
                        font: { size: 11 },
                        callback: (v) => v >= 1000 ? (v / 1000) + "k" : v
                    }
                }
            }
        }
    });
}

// ================= 3. KHỞI TẠO BẢN ĐỒ GEOFENCE HEATMAP QUẬN 1 =================
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
        let color = "#0284c7"; // Trung bình
        if (poi.density === "high") color = "#ef4444"; // Rất cao
        if (poi.density === "low") color = "#94a3b8";  // Thấp

        // Vòng tròn Geofence 30m
        L.circle([poi.lat, poi.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.25,
            radius: poi.radiusM || 30
        }).addTo(heatmapMap);

        // Marker điểm nóng kèm popup mật độ
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
                <span style="color: ${color};">● Mật độ: ${poi.density === 'high' ? 'Rất Cao (680 khách)' : 'Trung Bình (310 khách)'}</span>
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
                // Hợp nhất dữ liệu từ backend vào danh sách
                poiList = data.map((item, index) => ({
                    id: item.id,
                    code: `Q1-POI-000${index + 1}`,
                    name: item.name,
                    category: "Di Tích Lịch Sử",
                    location: "TP. Hồ Chí Minh / Quận 1",
                    lat: item.lat,
                    lng: item.lng,
                    radiusM: item.radiusM || 30,
                    listens: Math.floor(Math.random() * 30000) + 15000,
                    rating: (4.7 + (index % 3) * 0.1).toFixed(1),
                    density: index < 2 ? "high" : "medium",
                    isActive: item.isActive !== false,
                    availableLanguages: item.availableLanguages && item.availableLanguages.length > 0 ? item.availableLanguages : ["vi", "en"],
                    imageUrl: item.imageUrl || DEFAULT_Q1_POIS[index % DEFAULT_Q1_POIS.length].imageUrl
                }));
            }
        }
    } catch (e) {
        console.warn("Chưa kết nối được Backend Gateway, hiển thị dữ liệu mẫu Quận 1:", e.message);
    }

    renderDashboardTopPois();
    renderPoiTable();
}

// ================= 5. HIỂN THỊ DỮ LIỆU BẢNG =================
function renderDashboardTopPois() {
    const tbody = document.getElementById("topPoisTableBody");
    tbody.innerHTML = "";

    poiList.slice(0, 5).forEach(poi => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <div class="poi-cell">
                    <img src="${poi.imageUrl}" alt="${poi.name}" class="poi-thumb" onerror="this.src='https://via.placeholder.com/42'">
                    <div>
                        <span class="poi-name-text">${poi.name}</span>
                        <span class="poi-sub-text">${poi.category}</span>
                    </div>
                </div>
            </td>
            <td>${poi.location}</td>
            <td><strong>${poi.listens.toLocaleString()}</strong></td>
            <td>
                <span class="rating-badge">
                    <i class="fa-solid fa-star text-amber-500"></i> ${poi.rating}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderPoiTable() {
    const tbody = document.getElementById("poiTableBody");
    tbody.innerHTML = "";

    // Cập nhật các con số thống kê
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

// ================= 6. LIVE REALTIME ACTIVITY FEED =================
function initRealtimeActivityFeed() {
    const feed = document.getElementById("activityFeed");
    const sampleDevices = ["iOS 17 • ID: dev_89fa21", "Android 14 • ID: dev_cc7a12", "iOS 17.4 • ID: dev_12bbee", "Android 13 • ID: dev_77ff09"];
    const sampleLangs = ["Tiếng Việt", "English (UK)", "Français", "English (US)"];

    function addFeedItem() {
        const randomPoi = poiList[Math.floor(Math.random() * poiList.length)];
        const randomDev = sampleDevices[Math.floor(Math.random() * sampleDevices.length)];
        const randomLang = sampleLangs[Math.floor(Math.random() * sampleLangs.length)];

        const item = document.createElement("div");
        item.className = "feed-item";
        item.innerHTML = `
            <div class="feed-left">
                <div class="feed-icon"><i class="fa-solid fa-location-crosshairs"></i></div>
                <div>
                    <div class="feed-title">${randomPoi.name} <span class="feed-id">#${randomPoi.code}</span></div>
                    <div class="feed-sub">Thiết bị: ${randomDev}</div>
                </div>
            </div>
            <div class="feed-right">
                <span class="feed-lang">${randomLang}</span>
                <span class="feed-time">Vừa xong</span>
            </div>
        `;

        feed.insertBefore(item, feed.firstChild);
        if (feed.children.length > 5) feed.removeChild(feed.lastChild);
    }

    // Nạp sẵn 5 dòng ban đầu
    for (let i = 0; i < 5; i++) addFeedItem();

    // Cứ mỗi 5 giây sinh thêm 1 log GPS mô phỏng khách đi bộ qua Geofence
    setInterval(addFeedItem, 5000);
}

// ================= 7. XỬ LÝ MODAL THÊM / SỬA / XÓA POI =================
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
                // Sửa POI
                await fetch(`${API_BASE}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
            } else {
                // Thêm mới POI
                await fetch(API_BASE, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
            }
        } catch (err) {
            console.warn("Lưu qua API lỗi, cập nhật trên RAM:", err);
        }

        // Cập nhật danh sách hiển thị
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
                rating: 5.0,
                density: "medium",
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

window.openEditModal = function(id) {
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

window.openAudioModal = function(id) {
    document.getElementById("audioPoiId").value = id;
    audioModal.classList.remove("hide");
};

window.deletePoi = async function(id) {
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
