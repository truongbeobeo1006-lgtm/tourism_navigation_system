
/* =========================================
   GPS ROUTE - TÌM ĐƯỜNG ĐẾN ĐỊA ĐIỂM
========================================= */

let gpsDestinationLayer = null;
let gpsDestinationRoute = null;

/* =========================================
   TÌM ĐƯỜNG ĐẾN ĐỊA ĐIỂM
========================================= */

async function navigateToPoi(poiId) {
    if (!currentGpsPosition) {
        alert('Vui lòng nhấn Vị trí của tôi để lấy GPS trước.');
        return;
    }

    const poi = state.pois.find(
        item => String(item.id) === String(poiId)
    );

    if (!poi) {
        alert('Không tìm thấy địa điểm.');
        return;
    }

    const destinationLat = Number(poi.lat);
    const destinationLng = Number(poi.lng);

    if (
        !Number.isFinite(destinationLat) ||
        !Number.isFinite(destinationLng)
    ) {
        alert('Địa điểm chưa có tọa độ hợp lệ.');
        return;
    }

    const start = currentGpsPosition;

    const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${start.lng},${start.lat};${destinationLng},${destinationLat}` +
        `?overview=full&geometries=geojson&steps=true`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Không kết nối được dịch vụ tìm đường.');
        }

        const data = await response.json();

        if (
            data.code !== 'Ok' ||
            !data.routes ||
            data.routes.length === 0
        ) {
            throw new Error('Không tìm thấy tuyến đường.');
        }

        const route = data.routes[0];

        // Xóa tuyến đường cũ nếu có
        if (gpsDestinationLayer) {
            state.map.removeLayer(gpsDestinationLayer);
        }

        // Tạo lớp chứa tuyến đường mới
        gpsDestinationLayer = L.layerGroup().addTo(state.map);

        const coordinates = route.geometry.coordinates.map(
            point => [point[1], point[0]]
        );

        // Vẽ tuyến đường
        gpsDestinationRoute = L.polyline(coordinates, {
            color: '#2563eb',
            weight: 7,
            opacity: 0.9
        }).addTo(gpsDestinationLayer);

        // Đánh dấu điểm đến
        L.marker([destinationLat, destinationLng])
            .bindPopup(`<b>${escapeHtml(poi.name)}</b>`)
            .addTo(gpsDestinationLayer);

        const distanceKm = route.distance / 1000;
        const durationMinutes = route.duration / 60;

        // Căn chỉnh bản đồ hiển thị toàn bộ tuyến đường
        const bounds = L.latLngBounds(coordinates);

        state.map.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 16
        });

        // Hiển thị bảng hướng dẫn
        displayNavigationInfo(
            poi.name,
            distanceKm,
            durationMinutes,
            route.legs[0].steps
        );

    } catch (error) {
        console.error('Lỗi tìm đường:', error);
        alert('Không tìm được đường: ' + error.message);
    }
}

/* =========================================
   HIỂN THỊ BẢNG HƯỚNG DẪN
========================================= */

function displayNavigationInfo(
    destination,
    distanceKm,
    durationMinutes,
    steps
) {
    let panel = document.getElementById('gpsNavigationPanel');

    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'gpsNavigationPanel';

        panel.style.cssText = `
            position:absolute;
            z-index:1000;
            top:80px;
            left:10px;
            width:min(320px, calc(100% - 40px));
            max-height:65%;
            overflow-y:auto;
            background:white;
            padding:16px;
            border-radius:12px;
            box-shadow:0 2px 12px rgba(0,0,0,0.25);
        `;

        const mapElement = state.map.getContainer();

        mapElement.style.position = 'relative';
        mapElement.appendChild(panel);
    }

    // Tạo danh sách hướng dẫn
    const instructionList = steps.map((step, index) => {
        const name = step.name || 'Đường không tên';

        const distance = step.distance >= 1000
            ? (step.distance / 1000).toFixed(2) + ' km'
            : Math.round(step.distance) + ' m';

        return `
            <div style="
                padding:10px 0;
                border-bottom:1px solid #e5e7eb;
            ">
                <b>${index + 1}. ${escapeHtml(step.maneuver.type)}</b>

                <p style="margin:4px 0;color:#475569;">
                    ${escapeHtml(name)} – ${distance}
                </p>
            </div>
        `;
    }).join('');

    panel.innerHTML = `
        <!-- TIÊU ĐỀ VÀ NÚT ĐÓNG -->
        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:12px;
        ">
            <h3 style="margin:0;">Chỉ đường</h3>

            <button
                type="button"
                onclick="closeNavigationPanel()"
                title="Đóng bảng chỉ đường"
                style="
                    width:32px;
                    height:32px;
                    border:none;
                    border-radius:6px;
                    background:#f1f5f9;
                    color:#333;
                    font-size:24px;
                    cursor:pointer;
                    line-height:1;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                "
            >×</button>
        </div>

        <!-- THÔNG TIN ĐIỂM ĐẾN -->
        <b>Điểm đến: ${escapeHtml(destination)}</b>

        <p style="margin:8px 0;">
            Quãng đường:
            <b>${distanceKm.toFixed(2)} km</b>
        </p>

        <p style="margin:8px 0;">
            Thời gian:
            <b>${Math.round(durationMinutes)} phút</b>
        </p>

        <hr>

        <!-- CÁC BƯỚC DI CHUYỂN -->
        <h4>Các bước di chuyển</h4>

        ${instructionList}

        <!-- NÚT ĐÓNG Ở CUỐI BẢNG -->
        <button
            type="button"
            onclick="closeNavigationPanel()"
            style="
                width:100%;
                padding:10px;
                margin-top:12px;
                background:#dc2626;
                color:white;
                border:0;
                border-radius:8px;
                cursor:pointer;
            "
        >
            Đóng chỉ đường
        </button>
    `;
}

/* =========================================
   ĐÓNG BẢNG CHỈ ĐƯỜNG
   GIỮ NGUYÊN TUYẾN ĐƯỜNG
========================================= */

function closeNavigationPanel() {
    const panel = document.getElementById('gpsNavigationPanel');

    if (panel) {
        panel.remove();
    }

    // Không xóa tuyến đường trên bản đồ
}

/* =========================================
   TẠO NÚT CHỈ ĐƯỜNG CHO MỖI ĐỊA ĐIỂM
========================================= */

function addNavigationButtons() {
    const choices = document.getElementById('poiChoices');

    if (!choices || !Array.isArray(state.pois)) return;

    state.pois.forEach(poi => {
        if (!poi.id) return;

        const checkbox = Array.from(
            choices.querySelectorAll('input[name="routePoi"]')
        ).find(input => input.value === String(poi.id));

        if (!checkbox) return;

        const label = checkbox.closest('label');

        if (!label || label.querySelector('.gps-route-button')) {
            return;
        }

        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'gps-route-button';
        button.textContent = 'Chỉ đường đến đây';

        button.style.cssText = `
            margin-left:auto;
            padding:6px 10px;
            background:#2563eb;
            color:white;
            border:0;
            border-radius:6px;
            cursor:pointer;
        `;

        button.addEventListener('click', () => {
            navigateToPoi(poi.id);
        });

        label.appendChild(button);
    });
}

/* =========================================
   TỰ ĐỘNG THÊM NÚT CHỈ ĐƯỜNG
========================================= */

const gpsRouteButtonObserver = setInterval(() => {
    if (
        typeof state !== 'undefined' &&
        Array.isArray(state.pois) &&
        state.pois.length > 0
    ) {
        addNavigationButtons();
    }
}, 1000);
