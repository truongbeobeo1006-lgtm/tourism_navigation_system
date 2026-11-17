
/* =========================================
   GPS NAVIGATION - THEO DÕI VỊ TRÍ GPS
========================================= */

let gpsWatchId = null;
let gpsMarker = null;
let currentGpsPosition = null;

/* =========================================
   CẬP NHẬT TRẠNG THÁI GPS
========================================= */

function updateGpsStatus(active, message = '') {
    const gpsText = document.getElementById('gpsText');
    const gpsPill = document.getElementById('gpsPill');

    if (!gpsText || !gpsPill) return;

    gpsPill.classList.remove('lost', 'active');

    if (active) {
        gpsText.textContent = 'GPS: Đang hoạt động';
        gpsPill.classList.add('active');
    } else {
        gpsText.textContent = message || 'GPS: Mất tín hiệu';
        gpsPill.classList.add('lost');
    }
}

/* =========================================
   KHỞI TẠO NÚT GPS
========================================= */

function initializeGpsControl() {
    if (!state.map) return;

    const gpsControl = L.control({
        position: 'topright'
    });

    gpsControl.onAdd = function () {
        const button = L.DomUtil.create(
            'button',
            'gps-location-button'
        );

        button.innerHTML = '📍 Vị trí của tôi';

        button.style.cssText = `
            background: white;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px 14px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        `;

        L.DomEvent.disableClickPropagation(button);

        button.addEventListener('click', function () {

            // Nếu đã có tọa độ GPS thì quay về ngay
            if (currentGpsPosition) {
                state.map.setView(currentGpsPosition, 16);
                return;
            }

            // Nếu chưa có tọa độ thì lấy GPS rồi quay về
            startGpsTracking(true);
        });

        return button;
    };

    gpsControl.addTo(state.map);

    // Tự động khởi động GPS khi bản đồ sẵn sàng
    startGpsTracking();
}

/* =========================================
   BẮT ĐẦU THEO DÕI GPS
========================================= */

function startGpsTracking(recenter = false) {
    if (!navigator.geolocation) {
        updateGpsStatus(false, 'GPS: Không hỗ trợ');
        alert('Trình duyệt không hỗ trợ GPS.');
        return;
    }

    updateGpsStatus(false, 'GPS: Đang lấy vị trí...');

    navigator.geolocation.getCurrentPosition(
        function (position) {
            updateGpsPosition(position);

            // Quay bản đồ về vị trí GPS khi được yêu cầu
            if (recenter && currentGpsPosition) {
                state.map.setView(currentGpsPosition, 16);
            }
        },
        handleGpsError,
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        }
    );

    if (gpsWatchId !== null) {
        navigator.geolocation.clearWatch(gpsWatchId);
    }

    gpsWatchId = navigator.geolocation.watchPosition(
        updateGpsPosition,
        handleGpsError,
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        }
    );
}

/* =========================================
   CẬP NHẬT VỊ TRÍ GPS THẬT
========================================= */

function updateGpsPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    currentGpsPosition = L.latLng(lat, lng);

    updateGpsStatus(true);

    // Tạo hoặc cập nhật chấm xanh GPS
    if (!gpsMarker) {
        gpsMarker = L.circleMarker(currentGpsPosition, {
            radius: 9,
            color: '#ffffff',
            weight: 3,
            fillColor: '#2563eb',
            fillOpacity: 1
        }).addTo(state.map);

        gpsMarker.bindPopup('Vị trí GPS hiện tại');
    } else {
        gpsMarker.setLatLng(currentGpsPosition);
    }

    // Đồng bộ marker "Bạn ở đây" của app.js
    if (typeof updateUserPosition === 'function') {
        updateUserPosition(
            lat,
            lng,
            position.coords.accuracy
        );
    }

    // Căn giữa bản đồ ở lần nhận GPS đầu tiên
    if (!state.hasFirstGpsFix) {
        state.hasFirstGpsFix = true;
        state.map.setView(currentGpsPosition, 16);
    }

    console.log('GPS thực tế:', {
        latitude: lat,
        longitude: lng,
        accuracy: position.coords.accuracy
    });
}

/* =========================================
   XỬ LÝ LỖI GPS
========================================= */

function handleGpsError(error) {
    console.warn('[GPS] Không lấy được vị trí:', error.message);

    let message = 'GPS: Mất tín hiệu';

    switch (error.code) {
        case 1:
            message = 'GPS: Chưa cấp quyền vị trí';
            break;

        case 2:
            message = 'GPS: Không xác định được vị trí';
            break;

        case 3:
            message = 'GPS: Hết thời gian chờ';
            break;
    }

    updateGpsStatus(false, message);
}

/* =========================================
   CHỜ BẢN ĐỒ SẴN SÀNG
========================================= */

function waitForMap() {
    let attempts = 0;

    const timer = setInterval(function () {
        attempts++;

        if (typeof state !== 'undefined' && state.map) {
            clearInterval(timer);
            initializeGpsControl();
        }

        if (attempts >= 60) {
            clearInterval(timer);
            console.error(
                'Không thể khởi tạo GPS: Bản đồ chưa sẵn sàng.'
            );
        }
    }, 500);
}

// Khởi động quá trình chờ bản đồ
waitForMap();
