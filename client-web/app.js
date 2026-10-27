
// =========================================================================
// 10-LANGUAGE COMPREHENSIVE LOCALIZATION (UI + SCRIPTS + AUDIO)
// =========================================================================
const LANG_MAP = {
  vi: { code: 'vi', tag: 'vi-VN', name: 'Tiếng Việt', flag: '🇻🇳' },
  en: { code: 'en', tag: 'en-US', name: 'English', flag: '🇬🇧' },
  zh: { code: 'zh', tag: 'zh-CN', name: '中文', flag: '🇨🇳' },
  ja: { code: 'ja', tag: 'ja-JP', name: '日本語', flag: '🇯🇵' },
  ko: { code: 'ko', tag: 'ko-KR', name: '한국어', flag: '🇰🇷' },
  fr: { code: 'fr', tag: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  ru: { code: 'ru', tag: 'ru-RU', name: 'Русский', flag: '🇷🇺' },
  de: { code: 'de', tag: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
  es: { code: 'es', tag: 'es-ES', name: 'Español', flag: '🇪🇸' },
  th: { code: 'th', tag: 'th-TH', name: 'ไทย', flag: '🇹🇭' }
};

const UI_LOCALES = {
  vi: {
    screenTitle: 'Quản lí du lịch Quận 1',
    gpsLost: 'GPS: Mất tín hiệu',
    gpsSearching: 'GPS: Đang lấy vị trí...',
    gpsSim: 'GPS: Mô phỏng',
    gpsReal: 'GPS Thật',
    distLabelPrefix: 'KHOẢNG CÁCH TỚI',
    zoneStatusLabel: 'TRẠNG THÁI VÙNG',
    zoneInside: 'Trong vùng (30m)',
    zoneOutside: 'Ngoài vùng',
    highlightBadge: '★ ĐIỂM NỔI BẬT',
    startNarration: 'Bắt đầu thuyết minh',
    pauseNarration: 'Tạm dừng thuyết minh',
    rewindBtn: 'Lùi 10 giây',
    speedBtn: 'Tốc độ đọc',
    bannerComing: 'Đã đến',
    bannerSub: 'Đang tự động phát thuyết minh di tích...',
    tabMap: 'Bản đồ',
    tabTours: 'Lộ trình',
    tabSettings: 'Cài đặt',
    toursTitle: 'Tuyến tham quan gợi ý',
    toursSubtitle: 'Danh sách các vùng di tích tiêu biểu tại TP. Hồ Chí Minh',
    tour1Badge: 'ĐANG THAM GIA',
    tour1Title: 'Tuyến Di tích Lịch sử Quận 1',
    tour1Desc: 'Khám phá dấu ấn kiến trúc và lịch sử hào hùng qua Dinh Độc Lập, Bưu điện Trung tâm và Nhà thờ Đức Bà.',
    tour2Badge: 'ĐỀ XUẤT',
    tour2Title: 'Tuyến Văn hóa & Di sản Sài Gòn',
    tour2Desc: 'Tổng quan các bảo tàng nghệ thuật, kiến trúc Pháp cổ và chợ Bến Thành truyền thống.',
    tour3Badge: 'BUỔI CHIỀU',
    tour3Title: 'Tuyến Công viên & Không gian Xanh',
    tour3Desc: 'Thư giãn qua mảng xanh Công viên Tao Đàn, Thảo Cầm Viên và Quảng trường đi bộ.',
    settingsTitle: 'Cài đặt hệ thống',
    settingsSubtitle: 'Tùy biến ngôn ngữ, định vị và chế độ thử nghiệm',
    groupAudio: 'ÂM THANH & THUYẾT MINH',
    langLabel: 'Ngôn ngữ thuyết minh',
    langSub: 'Chọn ngôn ngữ giao diện & giọng đọc kịch bản',
    autoPlayLabel: 'Tự động phát khi tới gần',
    autoPlaySub: 'Tự kích hoạt khi cách dưới 30m',
    groupSim: 'CÔNG CỤ KIỂM THỬ & GIẢ LẬP GPS',
    simDesc: 'Dùng để test tính năng thuyết minh trực tiếp mà không cần ra hiện trường:',
    simNear: 'Giả lập: Đứng tại Dinh (Khoảng cách: 10m)',
    simFar: 'Giả lập: Ra xa Dinh (Khoảng cách: 350m)',
    simReal: 'Dùng GPS thiết bị thực tế',
    groupInfo: 'THÔNG TIN ỨNG DỤNG',
    versionLabel: 'Phiên bản',
    targetLabel: 'Tọa độ đích'
  },
  en: {
    screenTitle: 'Heritage Map',
    gpsLost: 'GPS: Signal Lost',
    gpsSearching: 'GPS: Acquiring...',
    gpsSim: 'GPS: Simulation',
    gpsReal: 'Live GPS',
    distLabelPrefix: 'DISTANCE TO',
    zoneStatusLabel: 'ZONE STATUS',
    zoneInside: 'Inside zone (30m)',
    zoneOutside: 'Outside zone',
    highlightBadge: '★ HIGHLIGHT',
    startNarration: 'Start Audio Tour',
    pauseNarration: 'Pause Audio Tour',
    rewindBtn: 'Rewind 10s',
    speedBtn: 'Voice Speed',
    bannerComing: 'Arrived at',
    bannerSub: 'Playing automatic narration...',
    tabMap: 'Map',
    tabTours: 'Tours',
    tabSettings: 'Settings',
    toursTitle: 'Suggested Tour Routes',
    toursSubtitle: 'Iconic historic and cultural sites in Ho Chi Minh City',
    tour1Badge: 'ACTIVE TOUR',
    tour1Title: 'District 1 Historic Trail',
    tour1Desc: 'Explore historic architecture through Independence Palace, Central Post Office, and Notre-Dame.',
    tour2Badge: 'RECOMMENDED',
    tour2Title: 'Saigon Heritage & Culture',
    tour2Desc: 'Overview of art museums, French colonial architecture, and Ben Thanh Market.',
    tour3Badge: 'AFTERNOON',
    tour3Title: 'Parks & Green Spaces Trail',
    tour3Desc: 'Relax through Tao Dan Park, the Botanical Gardens, and walking promenades.',
    settingsTitle: 'App Settings',
    settingsSubtitle: 'Customize languages, positioning, and test modes',
    groupAudio: 'AUDIO & NARRATION',
    langLabel: 'Narration Language',
    langSub: 'Select interface language and speech voice',
    autoPlayLabel: 'Auto-play on arrival',
    autoPlaySub: 'Trigger automatically within 30m zone',
    groupSim: 'GPS TESTING & SIMULATION',
    simDesc: 'Tools to simulate visitor movements without traveling:',
    simNear: 'Simulate: At Palace (Distance: 10m)',
    simFar: 'Simulate: Away from Palace (Distance: 350m)',
    simReal: 'Use Real Device GPS',
    groupInfo: 'APP INFORMATION',
    versionLabel: 'Version',
    targetLabel: 'Target Coordinates'
  },
  zh: {
    screenTitle: '历史遗迹地图',
    gpsLost: 'GPS: 信号丢失',
    gpsSearching: 'GPS: 正在定位...',
    gpsSim: 'GPS: 模拟模式',
    gpsReal: '实时 GPS',
    distLabelPrefix: '距离',
    zoneStatusLabel: '区域状态',
    zoneInside: '在区域内 (30米)',
    zoneOutside: '在区域外',
    highlightBadge: '★ 核心亮点',
    startNarration: '开始语音解说',
    pauseNarration: '暂停语音解说',
    rewindBtn: '快退 10 秒',
    speedBtn: '语速调节',
    bannerComing: '已到达',
    bannerSub: '正在自动播放遗迹语音解说...',
    tabMap: '地图',
    tabTours: '游览路线',
    tabSettings: '系统设置',
    toursTitle: '推荐游览路线',
    toursSubtitle: '胡志明市最具代表性的历史文化地标一览',
    tour1Badge: '正在进行',
    tour1Title: '第一区历史古迹专线',
    tour1Desc: '探索独立宫、中央邮局和圣母大教堂的建筑精髓与历史风貌。',
    tour2Badge: '特别推荐',
    tour2Title: '西贡文化与遗产之旅',
    tour2Desc: '纵览艺术博物馆、法式古典建筑以及热闹的滨城传统市场。',
    tour3Badge: '午后休闲',
    tour3Title: '公园与生态绿地漫步',
    tour3Desc: '漫步陶丹公园、动植物园与繁华步行街，感受惬意午后。',
    settingsTitle: '系统偏好设置',
    settingsSubtitle: '定制语言、定位与开发者测试模式',
    groupAudio: '音频与语音解说',
    langLabel: '解说语言设置',
    langSub: '切换全应用界面文字与朗读语种',
    autoPlayLabel: '靠近时自动播放',
    autoPlaySub: '进入30米范围内自动触发语音',
    groupSim: 'GPS 模拟与测试工具',
    simDesc: '无需亲临现场，直接在设备上模拟测试导览功能：',
    simNear: '模拟: 位于统一宫 (10米)',
    simFar: '模拟: 远离统一宫 (350米)',
    simReal: '启用设备真实 GPS',
    groupInfo: '应用程序信息',
    versionLabel: '版本号',
    targetLabel: '目标坐标'
  },
  ja: {
    screenTitle: '史跡マップ',
    gpsLost: 'GPS: 信号なし',
    gpsSearching: 'GPS: 取得中...',
    gpsSim: 'GPS: シミュレーション',
    gpsReal: '実機 GPS',
    distLabelPrefix: '目的地までの距離:',
    zoneStatusLabel: 'ゾーン状態',
    zoneInside: 'エリア内 (30m)',
    zoneOutside: 'エリア外',
    highlightBadge: '★ おすすめ史跡',
    startNarration: '音声ガイドを開始',
    pauseNarration: '音声ガイドを一時停止',
    rewindBtn: '10秒戻る',
    speedBtn: '読み上げ速度',
    bannerComing: '到着しました:',
    bannerSub: '自動音声ガイドを再生しています...',
    tabMap: '地図',
    tabTours: 'ツアールート',
    tabSettings: '設定',
    toursTitle: 'おすすめ観光ルート',
    toursSubtitle: 'ホーチミン市を代表する象徴的な歴史遺産リスト',
    tour1Badge: '参加中',
    tour1Title: '1区の歴史的建造物めぐり',
    tour1Desc: '統一会堂、サイゴン中央郵便局、サイゴン大聖堂を巡る歴史探訪。',
    tour2Badge: 'おすすめ',
    tour2Title: 'サイゴン遺産と文化コース',
    tour2Desc: '美術館、コロニアル建築、そして活気あふれるベンタイン市場。',
    tour3Badge: '午後コース',
    tour3Title: '緑豊かな公園リフレッシュルート',
    tour3Desc: 'タオダン公園、動植物園、歩行者天国で過ごす穏やかな時間。',
    settingsTitle: 'システム設定',
    settingsSubtitle: '言語切り替え、位置情報、テストモード',
    groupAudio: '音声＆オーディオ設定',
    langLabel: '音声ガイド言語',
    langSub: '表示言語と音声エンジンの切り替え',
    autoPlayLabel: '接近時に自動再生',
    autoPlaySub: '30m以内に入ると自動で解説を開始',
    groupSim: 'GPS シミュレーションツール',
    simDesc: '現地に行かずに音声ガイド機能をテストできます：',
    simNear: '模擬: 統一会堂付近 (10m)',
    simFar: '模擬: 統一会堂から離脱 (350m)',
    simReal: '実機 GPS を使用',
    groupInfo: 'アプリ情報',
    versionLabel: 'バージョン',
    targetLabel: '目的地座標'
  },
  ko: {
    screenTitle: '유적지 지도',
    gpsLost: 'GPS: 신호 없음',
    gpsSearching: 'GPS: 위치 수신 중...',
    gpsSim: 'GPS: 시뮬레이션',
    gpsReal: '실시간 GPS',
    distLabelPrefix: '까지의 거리:',
    zoneStatusLabel: '구역 상태',
    zoneInside: '구역 진입 (30m)',
    zoneOutside: '구역 밖',
    highlightBadge: '★ 주요 명소',
    startNarration: '오디오 가이드 시작',
    pauseNarration: '오디오 가이드 일시중지',
    rewindBtn: '10초 뒤로',
    speedBtn: '재생 속도',
    bannerComing: '도착 완료:',
    bannerSub: '자동 오디오 해설을 재생 중입니다...',
    tabMap: '지도',
    tabTours: '투어 코스',
    tabSettings: '설정',
    toursTitle: '추천 여행 코스',
    toursSubtitle: '호치민시의 대표적인 역사 및 문화 명소 목록',
    tour1Badge: '참여 중',
    tour1Title: '1구 역사 유적지 코스',
    tour1Desc: '통일궁, 중앙우체국, 사이공 노트르담 대성당을 둘러보는 코스.',
    tour2Badge: '추천 코스',
    tour2Title: '사이공 문화 & 헤리티지',
    tour2Desc: '미술관, 고풍스러운 프랑스 식민지 건축, 벤탄 전통 시장.',
    tour3Badge: '오후 투어',
    tour3Title: '공원 & 도심 속 녹지 산책',
    tour3Desc: '타오단 공원, 동식물원, 보행자 광장에서 즐기는 여유.',
    settingsTitle: '시스템 설정',
    settingsSubtitle: '언어, 위치 설정 및 테스트 모드 변경',
    groupAudio: '오디오 & 해설 설정',
    langLabel: '해설 언어 선택',
    langSub: '앱 화면 언어 및 음성 합성 엔진 변경',
    autoPlayLabel: '근접 시 자동 재생',
    autoPlaySub: '반경 30m 진입 시 자동 해설 재생',
    groupSim: 'GPS 테스트 도구',
    simDesc: '현장에 가지 않고도 가이드 기능을 테스트할 수 있습니다:',
    simNear: '시뮬레이션: 통일궁 위치 (10m)',
    simFar: '시뮬레이션: 통일궁 멀리 (350m)',
    simReal: '실제 단말기 GPS 사용',
    groupInfo: '앱 정보',
    versionLabel: '버전',
    targetLabel: '목표 좌표'
  },
  fr: {
    screenTitle: 'Carte du Patrimoine',
    gpsLost: 'GPS: Signal perdu',
    gpsSearching: 'GPS: Recherche...',
    gpsSim: 'GPS: Simulation',
    gpsReal: 'GPS Réel',
    distLabelPrefix: 'DISTANCE JUSQU\'À',
    zoneStatusLabel: 'STATUT DE LA ZONE',
    zoneInside: 'Dans la zone (30m)',
    zoneOutside: 'Hors zone',
    highlightBadge: '★ POINT FORT',
    startNarration: 'Démarrer l\'audioguide',
    pauseNarration: 'Mettre en pause',
    rewindBtn: 'Recul 10s',
    speedBtn: 'Vitesse de lecture',
    bannerComing: 'Arrivé à',
    bannerSub: 'Lecture automatique du guide audio...',
    tabMap: 'Carte',
    tabTours: 'Circuits',
    tabSettings: 'Paramètres',
    toursTitle: 'Circuits Recommandés',
    toursSubtitle: 'Les monuments historiques emblématiques d\'Hô Chi Minh-Ville',
    tour1Badge: 'EN COURS',
    tour1Title: 'Circuit Historique du 1er Arrondissement',
    tour1Desc: 'Découvrez le Palais de la Réunification, la Poste centrale et Notre-Dame.',
    tour2Badge: 'CONSEILLÉ',
    tour2Title: 'Patrimoine et Culture de Saïgon',
    tour2Desc: 'Musées d\'art, architecture coloniale et le célèbre marché Ben Thanh.',
    tour3Badge: 'APRÈS-MIDI',
    tour3Title: 'Parcs et Espaces Verts',
    tour3Desc: 'Détendez-vous au parc Tao Dan, au Jardin botanique et sur les promenades.',
    settingsTitle: 'Paramètres du Système',
    settingsSubtitle: 'Langues, localisation et modes de test',
    groupAudio: 'AUDIO ET NARRATION',
    langLabel: 'Langue de l\'audioguide',
    langSub: 'Changer la langue de l\'interface et de la voix',
    autoPlayLabel: 'Lecture automatique',
    autoPlaySub: 'Activation automatique à moins de 30 mètres',
    groupSim: 'SIMULATION ET TESTS GPS',
    simDesc: 'Outils de test sans déplacement physique :',
    simNear: 'Simuler : Au Palais (10m)',
    simFar: 'Simuler : Loin du Palais (350m)',
    simReal: 'Utiliser le GPS Réel',
    groupInfo: 'INFORMATIONS SUR L\'APPLICATION',
    versionLabel: 'Version',
    targetLabel: 'Coordonnées cibles'
  },
  ru: {
    screenTitle: 'Карта Памятников',
    gpsLost: 'GPS: Сигнал потерян',
    gpsSearching: 'GPS: Поиск спутников...',
    gpsSim: 'GPS: Симуляция',
    gpsReal: 'Живой GPS',
    distLabelPrefix: 'РАССТОЯНИЕ ДО',
    zoneStatusLabel: 'СТАТУС ЗОНЫ',
    zoneInside: 'В зоне (30м)',
    zoneOutside: 'Вне зоны',
    highlightBadge: '★ ГЛАВНОЕ МЕСТО',
    startNarration: 'Начать аудиогид',
    pauseNarration: 'Приостановить аудиогид',
    rewindBtn: 'Назад на 10с',
    speedBtn: 'Скорость речи',
    bannerComing: 'Вы прибыли в',
    bannerSub: 'Автоматическое воспроизведение аудиогида...',
    tabMap: 'Карта',
    tabTours: 'Маршруты',
    tabSettings: 'Настройки',
    toursTitle: 'Рекомендуемые Экскурсии',
    toursSubtitle: 'Главные исторические достопримечательности Хошимина',
    tour1Badge: 'АКТИВЕН',
    tour1Title: 'Исторический район 1',
    tour1Desc: 'Дворец Воссоединения, Центральный почтамт и собор Сайгонской Богоматери.',
    tour2Badge: 'СОВЕТУЕМ',
    tour2Title: 'Культурное наследие Сайгона',
    tour2Desc: 'Художественные музеи, колониальная архитектура и рынок Бен Тхань.',
    tour3Badge: 'ВЕЧЕРНИЙ',
    tour3Title: 'Парки и зеленые зоны',
    tour3Desc: 'Отдых в парке Тао Дан, Ботаническом саду и на пешеходных улицах.',
    settingsTitle: 'Настройки Системы',
    settingsSubtitle: 'Выбор языка, геолокация и режимы тестирования',
    groupAudio: 'ЗВУК И АУДИОГИД',
    langLabel: 'Язык аудиогида',
    langSub: 'Изменить язык интерфейса и голос озвучки',
    autoPlayLabel: 'Автостарт при приближении',
    autoPlaySub: 'Активация в радиусе 30 метров от объекта',
    groupSim: 'ТЕСТИРОВАНИЕ И СИМУЛЯЦИЯ GPS',
    simDesc: 'Инструменты для проверки аудиогида без выхода на улицу:',
    simNear: 'Симуляция: У Дворца (10м)',
    simFar: 'Симуляция: Вдали от Дворца (350м)',
    simReal: 'Включить реальный GPS',
    groupInfo: 'О ПРИЛОЖЕНИИ',
    versionLabel: 'Версия',
    targetLabel: 'Координаты цели'
  },
  de: {
    screenTitle: 'Denkmal-Karte',
    gpsLost: 'GPS: Kein Signal',
    gpsSearching: 'GPS: Ortung läuft...',
    gpsSim: 'GPS: Simulation',
    gpsReal: 'Echtes GPS',
    distLabelPrefix: 'ENTFERNUNG ZU',
    zoneStatusLabel: 'ZONENSTATUS',
    zoneInside: 'In der Zone (30m)',
    zoneOutside: 'Außerhalb der Zone',
    highlightBadge: '★ HÖHEPUNKT',
    startNarration: 'Audiotour starten',
    pauseNarration: 'Audiotour pausieren',
    rewindBtn: '10s zurück',
    speedBtn: 'Geschwindigkeit',
    bannerComing: 'Angekommen bei',
    bannerSub: 'Automatische Audioführung wird abgespielt...',
    tabMap: 'Karte',
    tabTours: 'Touren',
    tabSettings: 'Einstellungen',
    toursTitle: 'Empfohlene Tour-Routen',
    toursSubtitle: 'Die berühmtesten Wahrzeichen von Ho-Chi-Minh-Stadt',
    tour1Badge: 'AKTIV',
    tour1Title: 'Historischer Pfad Distrikt 1',
    tour1Desc: 'Wiedervereinigungspalast, Hauptpostamt und Kathedrale Notre-Dame.',
    tour2Badge: 'EMPFOHLEN',
    tour2Title: 'Kultur & Erbe von Saigon',
    tour2Desc: 'Kunstmuseen, französische Kolonialarchitektur und Ben-Thanh-Markt.',
    tour3Badge: 'NACHMITTAG',
    tour3Title: 'Parks & Grüne Oasen',
    tour3Desc: 'Entspannung im Tao-Dan-Park, Botanischen Garten und auf Promenaden.',
    settingsTitle: 'Systemeinstellungen',
    settingsSubtitle: 'Sprache, Ortung und Testmodi anpassen',
    groupAudio: 'AUDIO & SPRACHFÜHRUNG',
    langLabel: 'Sprache der Führung',
    langSub: 'Oberflächensprache und Sprachausgabe wählen',
    autoPlayLabel: 'Automatisch abspielen',
    autoPlaySub: 'Automatische Aktivierung innerhalb von 30m',
    groupSim: 'GPS-TEST & SIMULATION',
    simDesc: 'Funktionen direkt ohne Vor-Ort-Besuch testen:',
    simNear: 'Simulieren: Am Palast (10m)',
    simFar: 'Simulieren: Weit entfernt (350m)',
    simReal: 'Echtes Geräte-GPS nutzen',
    groupInfo: 'APP-INFORMATIONEN',
    versionLabel: 'Version',
    targetLabel: 'Zielkoordinaten'
  },
  es: {
    screenTitle: 'Mapa de Monumentos',
    gpsLost: 'GPS: Sin señal',
    gpsSearching: 'GPS: Obteniendo ubicación...',
    gpsSim: 'GPS: Simulación',
    gpsReal: 'GPS Real',
    distLabelPrefix: 'DISTANCIA A',
    zoneStatusLabel: 'ESTADO DE ZONA',
    zoneInside: 'En la zona (30m)',
    zoneOutside: 'Fuera de la zona',
    highlightBadge: '★ DESTACADO',
    startNarration: 'Iniciar audioguía',
    pauseNarration: 'Pausar audioguía',
    rewindBtn: 'Retroceder 10s',
    speedBtn: 'Velocidad de voz',
    bannerComing: 'Has llegado a',
    bannerSub: 'Reproduciendo audioguía automáticamente...',
    tabMap: 'Mapa',
    tabTours: 'Rutas',
    tabSettings: 'Ajustes',
    toursTitle: 'Rutas Recomendadas',
    toursSubtitle: 'Monumentos históricos y culturales de Ciudad Ho Chi Minh',
    tour1Badge: 'EN CURSO',
    tour1Title: 'Ruta Histórica del Distrito 1',
    tour1Desc: 'Descubra el Palacio de la Reunificación, Correos Central y Notre-Dame.',
    tour2Badge: 'SUGERIDA',
    tour2Title: 'Patrimonio y Cultura de Saigón',
    tour2Desc: 'Museos de arte, arquitectura colonial y el mercado Ben Thanh.',
    tour3Badge: 'TARDE',
    tour3Title: 'Parques y Espacios Verdes',
    tour3Desc: 'Relájese en el Parque Tao Dan, el Jardín Botánico y los bulevares.',
    settingsTitle: 'Ajustes del Sistema',
    settingsSubtitle: 'Personalice idiomas, ubicación y pruebas',
    groupAudio: 'AUDIO Y NARRACIÓN',
    langLabel: 'Idioma de audioguía',
    langSub: 'Cambiar idioma de la interfaz y voz del sintetizador',
    autoPlayLabel: 'Reproducción automática',
    autoPlaySub: 'Se activa al acercarse a menos de 30 metros',
    groupSim: 'HERRAMIENTAS DE PRUEBA GPS',
    simDesc: 'Pruebe la audioguía sin desplazarse al lugar físico:',
    simNear: 'Simular: En el Palacio (10m)',
    simFar: 'Simular: Lejos del Palacio (350m)',
    simReal: 'Usar GPS Real del Dispositivo',
    groupInfo: 'INFORMACIÓN DE LA APP',
    versionLabel: 'Versión',
    targetLabel: 'Coordenadas destino'
  },
  th: {
    screenTitle: 'แผนที่แหล่งประวัติศาสตร์',
    gpsLost: 'GPS: สัญญาณขาดหาย',
    gpsSearching: 'GPS: กำลังค้นหาตำแหน่ง...',
    gpsSim: 'GPS: โหมดจำลอง',
    gpsReal: 'GPS จริง',
    distLabelPrefix: 'ระยะทางถึง',
    zoneStatusLabel: 'สถานะโซน',
    zoneInside: 'อยู่ในโซน (30 ม.)',
    zoneOutside: 'อยู่นอกโซน',
    highlightBadge: '★ ไฮไลต์สำคัญ',
    startNarration: 'เริ่มฟังการบรรยาย',
    pauseNarration: 'หยุดการบรรยายชั่วคราว',
    rewindBtn: 'ย้อนหลัง 10 วิ',
    speedBtn: 'ความเร็วเสียง',
    bannerComing: 'คุณมาถึงแล้ว:',
    bannerSub: 'กำลังเล่นเสียงบรรยายนำเที่ยวอัตโนมัติ...',
    tabMap: 'แผนที่',
    tabTours: 'เส้นทางทัวร์',
    tabSettings: 'การตั้งค่า',
    toursTitle: 'เส้นทางท่องเที่ยวแนะนำ',
    toursSubtitle: 'สถานที่สำคัญทางประวัติศาสตร์และวัฒนธรรมในนครโฮจิมินห์',
    tour1Badge: 'กำลังเข้าร่วม',
    tour1Title: 'เส้นทางประวัติศาสตร์เขต 1',
    tour1Desc: 'สัมผัสสถาปัตยกรรมผ่านทำเนียบอิสรภาพ ไปรษณีย์กลาง และมหาวิหารน็อทร์-ดาม',
    tour2Badge: 'แนะนำพิเศษ',
    tour2Title: 'มรดกและวัฒนธรรมไซง่อน',
    tour2Desc: 'พิพิธภัณฑ์ศิลปะ สถาปัตยกรรมยุคอาณานิคม และตลาดเบนถั่นดั้งเดิม',
    tour3Badge: 'ช่วงบ่าย',
    tour3Title: 'สวนสาธารณะและพื้นที่สีเขียว',
    tour3Desc: 'ผ่อนคลายในสวนเต๋าตาน สวนสัตว์และพฤกษศาสตร์ และลานคนเดิน',
    settingsTitle: 'การตั้งค่าระบบ',
    settingsSubtitle: 'ปรับแต่งภาษา การระบุตำแหน่ง และโหมดทดสอบ',
    groupAudio: 'ระบบเสียงและการบรรยาย',
    langLabel: 'ภาษาเสียงบรรยาย',
    langSub: 'เปลี่ยนภาษาข้อความและเสียงอ่านทั้งหมดในแอป',
    autoPlayLabel: 'เล่นอัตโนมัติเมื่อใกล้ถึง',
    autoPlaySub: 'เริ่มบรรยายอัตโนมัติเมื่ออยู่ภายในระยะ 30 เมตร',
    groupSim: 'เครื่องมือจำลอง GPS',
    simDesc: 'ใช้ทดสอบระบบนำเที่ยวโดยไม่ต้องเดินทางไปสถานที่จริง:',
    simNear: 'จำลอง: อยู่ที่ทำเนียบ (10 ม.)',
    simFar: 'จำลอง: อยู่ห่างจากทำเนียบ (350 ม.)',
    simReal: 'ใช้ GPS จริงจากอุปกรณ์',
    groupInfo: 'ข้อมูลแอปพลิเคชัน',
    versionLabel: 'เวอร์ชัน',
    targetLabel: 'พิกัดเป้าหมาย'
  }
};


// Map popup localized strings
UI_LOCALES.vi.youAreHere = 'Bạn ở đây';
UI_LOCALES.en.youAreHere = 'You are here';
UI_LOCALES.zh.youAreHere = '您在这里';
UI_LOCALES.ja.youAreHere = '現在地';
UI_LOCALES.ko.youAreHere = '현재 위치';
UI_LOCALES.fr.youAreHere = 'Vous êtes ici';
UI_LOCALES.ru.youAreHere = 'Вы здесь';
UI_LOCALES.de.youAreHere = 'Sie sind hier';
UI_LOCALES.es.youAreHere = 'Estás aquí';
UI_LOCALES.th.youAreHere = 'คุณอยู่ที่นี่';

const POI_MULTILANG_SCRIPTS = {
  // 1. Dinh Độc Lập
  'q1-poi-0001': {
    name: {
      vi: 'Dinh Độc Lập',
      en: 'Independence Palace',
      zh: '统一宫 (独立宫)',
      ja: '統一会堂',
      ko: '통일궁',
      fr: 'Palais de la Réunification',
      ru: 'Дворец Воссоединения',
      de: 'Wiedervereinigungspalast',
      es: 'Palacio de la Reunificación',
      th: 'ทำเนียบอิสรภาพ'
    },
    address: {
      vi: '135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1',
      en: '135 Nam Ky Khoi Nghia, Ben Thanh, District 1',
      zh: '第一区滨城坊南圻起义路135号',
      ja: '1区ベンタイン区ナムキーコイギア通り135番地',
      ko: '1군 벤탄동 남키코이응이아 135번지',
      fr: '135 rue Nam Ky Khoi Nghia, Ben Thanh, 1er Arrondissement',
      ru: 'Ул. Нам Ки Кхой Нгиа, 135, район 1',
      de: '135 Nam Ky Khoi Nghia, Ben Thanh, Distrikt 1',
      es: '135 Nam Ky Khoi Nghia, Ben Thanh, Distrito 1',
      th: '135 ถนน Nam Ky Khoi Nghia แขวง Ben Thanh เขต 1'
    },
    script: {
      vi: 'Chào mừng bạn đến Dinh Độc Lập, còn gọi là Dinh Thống Nhất. Đây là công trình lịch sử mang tính biểu tượng của Sài Gòn, chứng kiến thời khắc lịch sử ngày 30 tháng 4 năm 1975.',
      en: 'Welcome to Independence Palace, also known as Reunification Palace. This iconic historic landmark witnessed the historic reunification of Vietnam on April 30, 1975.',
      zh: '欢迎来到独立宫，又称统一宫。这是胡志明市最具标志性的历史建筑，见证了1975年4月30日国家统一的历史时刻。',
      ja: '統一会堂（旧大統領官邸）へようこそ。ここはホーチミン市を代表する歴史的建造物であり、1975年4月30日の歴史的瞬間を見届けました。',
      ko: '호치민시의 역사적 상징인 통일궁(독립궁)에 오신 것을 환영합니다. 1975년 4월 30일 베트남 통일의 역사적 순간을 직접 목격한 장소입니다.',
      fr: 'Bienvenue au Palais de la Réunification. Cet édifice historique emblématique de Saïgon a été le théâtre des événements marquants du 30 avril 1975.',
      ru: 'Добро пожаловать во Дворец Воссоединения — выдающийся исторический памятник Сайгона, ставший свидетелем исторического дня 30 апреля 1975 года.',
      de: 'Willkommen im Wiedervereinigungspalast. Dieses historische Wahrzeichen Saigons war Schauplatz der historischen Ereignisse vom 30. April 1975.',
      es: 'Bienvenido al Palacio de la Reunificación. Este emblemático monumento histórico de Saigón fue testigo del momento histórico del 30 de abril de 1975.',
      th: 'ยินดีต้อนรับสู่ทำเนียบอิสรภาพ แลนด์มาร์กประวัติศาสตร์สำคัญของนครโฮจิมินห์ ซึ่งเป็นสถานที่สำคัญในเหตุการณ์ประวัติศาสตร์วันที่ 30 เมษายน 1975'
    }
  },
  // 2. Nhà Thờ Đức Bà
  'q1-poi-0002': {
    name: {
      vi: 'Nhà Thờ Đức Bà',
      en: 'Notre-Dame Cathedral',
      zh: '西贡圣母大教堂',
      ja: 'サイゴン大聖堂',
      ko: '사이공 노트르담 대성당',
      fr: 'Cathédrale Notre-Dame',
      ru: 'Собор Сайгонской Богоматери',
      de: 'Kathedrale Notre-Dame',
      es: 'Catedral de Notre-Dame',
      th: 'มหาวิหารน็อทร์-ดาม'
    },
    address: {
      vi: '01 Công xã Paris, Phường Bến Nghé, Quận 1',
      en: '01 Cong xa Paris, Ben Nghe, District 1',
      zh: '第一区滨义坊巴黎公社广场1号',
      ja: '1区ベンゲ区コンサーパリス広場1番地',
      ko: '1군 벤응에동 파리 코뮌 광장 1번지',
      fr: '01 Place de la Commune de Paris, Ben Nghe, 1er Arrondissement',
      ru: 'Площадь Парижской Коммуны, 1, район 1',
      de: '01 Cong xa Paris, Ben Nghe, Distrikt 1',
      es: '01 Plaza de la Comuna de París, Ben Nghe, Distrito 1',
      th: '01 จัตุรัสปารีสคอมมูน แขวง Ben Nghe เขต 1'
    },
    script: {
      vi: 'Bạn đang đứng trước Nhà Thờ Đức Bà Sài Gòn, kiệt tác kiến trúc Gothic cổ kính được xây dựng từ năm 1877 với toàn bộ gạch ngói nhập khẩu từ Marseille, Pháp.',
      en: 'You are standing in front of Saigon Notre-Dame Cathedral, an architectural masterpiece built in 1877 with all red bricks imported from Marseille, France.',
      zh: '您正身处于西贡圣母大教堂前。这座宏伟的哥特式建筑建于1877年，所有红色红砖均从法国马赛直接进口。',
      ja: 'サイゴン大聖堂の前に立っています。1877年に建設されたネオ・ロマネスク様式の傑作で、赤レンガはすべてフランスのマルセイユから運ばれました。',
      ko: '사이공 노트르담 대성당 앞입니다. 1877년 프랑스 마르세유에서 수입한 붉은 벽돌로 건축된 고풍스러운 네오 고딕 양식의 걸작입니다.',
      fr: 'Vous vous trouvez devant la cathédrale Notre-Dame de Saïgon, chef-d\'œuvre architectural néo-roman édifié en 1877 avec des briques rouges importées de Marseille.',
      ru: 'Вы находитесь перед собором Сайгонской Богоматери, шедевром неоготической архитектуры 1877 года, построенным из красного кирпича, привезенного из Марселя.',
      de: 'Sie stehen vor der Kathedrale Notre-Dame von Saigon, einem Meisterwerk aus dem Jahr 1877, erbaut aus roten Ziegeln aus Marseille.',
      es: 'Se encuentra frente a la Catedral de Notre-Dame de Saigón, obra maestra construida en 1877 con ladrillos rojos importados de Marsella, Francia.',
      th: 'คุณกำลังยืนอยู่หน้ามหาวิหารน็อทร์-ดามแห่งไซง่อน สถาปัตยกรรมชิ้นเอกที่สร้างขึ้นในปี 1877 ด้วยอิฐสีแดงทั้งหมดที่นำเข้าจากเมืองมาร์เซย์ ประเทศฝรั่งเศส'
    }
  },
  // 3. Bưu Điện Trung Tâm
  'q1-poi-0003': {
    name: {
      vi: 'Bưu Điện Trung Tâm',
      en: 'Central Post Office',
      zh: '西贡中央邮局',
      ja: 'サイゴン中央郵便局',
      ko: '사이공 중앙우체국',
      fr: 'Poste centrale de Saïgon',
      ru: 'Центральный почтамт Сайгона',
      de: 'Hauptpostamt Saigon',
      es: 'Oficina Central de Correos',
      th: 'ไปรษณีย์กลางไซง่อน'
    },
    address: {
      vi: '02 Công xã Paris, Phường Bến Nghé, Quận 1',
      en: '02 Cong xa Paris, Ben Nghe, District 1',
      zh: '第一区滨义坊巴黎公社广场2号',
      ja: '1区ベンゲ区コンサーパリス広場2番地',
      ko: '1군 벤응에동 파리 코뮌 광장 2번지',
      fr: '02 Place de la Commune de Paris, Ben Nghe, 1er Arrondissement',
      ru: 'Площадь Парижской Коммуны, 2, район 1',
      de: '02 Cong xa Paris, Ben Nghe, Distrikt 1',
      es: '02 Plaza de la Comuna de París, Ben Nghe, Distrito 1',
      th: '02 จัตุรัสปารีสคอมมูน แขวง Ben Nghe เขต 1'
    },
    script: {
      vi: 'Bưu Điện Trung Tâm Sài Gòn là một trong những công trình kiến trúc thời Pháp đẹp nhất tại Quận 1, kết hợp hài hòa giữa phong cách Phục Hưng phương Tây và họa tiết phương Đông.',
      en: 'The Saigon Central Post Office is one of the most stunning French colonial buildings in District 1, masterfully blending Renaissance architecture with oriental motifs.',
      zh: '西贡中央邮局是第一区最美丽的法式建筑之一，完美融合了西方文艺复兴建筑风格与东方精致花纹。',
      ja: 'サイゴン中央郵便局は、1区で最も美しいフランス植民地時代の建築物の一つで、ルネサンス様式と東洋の装飾が見事に調和しています。',
      ko: '사이공 중앙우체국은 서양 르네상스 건축 양식과 동양의 섬세한 장식이 조화를 이룬 1구의 대표적인 유서 깊은 프랑스 식민지 시대 건축물입니다.',
      fr: 'La Poste centrale de Saïgon est l\'un des plus beaux exemples de l\'architecture coloniale française, mêlant style Renaissance et ornements orientaux.',
      ru: 'Центральный почтамт Сайгона — одно из красивейших колониальных зданий французской эпохи, гармонично сочетающее стиль ренессанс с восточными мотивами.',
      de: 'Das Hauptpostamt Saigon ist ein meisterhaftes Kolonialgebäude, das Renaissance-Architektur mit orientalischen Verzierungen verbindet.',
      es: 'La Oficina Central de Correos de Saigón es uno de los edificios coloniales franceses más hermosos, fusionando el estilo renacentista con detalles orientales.',
      th: 'ไปรษณีย์กลางไซง่อนเป็นหนึ่งในอาคารยุคอาณานิคมฝรั่งเศสที่สวยงามที่สุดในเขต 1 ผสมผสานสถาปัตยกรรมเรเนซองส์เข้ากับลวดลายตะวันออกได้อย่างลงตัว'
    }
  },
  // 4. Nhà Hát Lớn Thành Phố
  'q1-poi-0004': {
    name: {
      vi: 'Nhà Hát Thành Phố',
      en: 'Saigon Opera House',
      zh: '西贡歌剧院',
      ja: '市民劇場（オペラハウス）',
      ko: '사이공 오페라 하우스',
      fr: 'Opéra de Saïgon',
      ru: 'Оперный театр Сайгона',
      de: 'Opernhaus Saigon',
      es: 'Ópera de Saigón',
      th: 'โรงละครแห่งชาติไซง่อน'
    },
    address: {
      vi: '07 Công Trường Lam Sơn, Phường Bến Nghé, Quận 1',
      en: '07 Lam Son Square, Ben Nghe, District 1',
      zh: '第一区滨义坊蓝山广场7号',
      ja: '1区ベンゲ区ラムソン広場7番地',
      ko: '1군 벤응에동 람손 광장 7번지',
      fr: '07 Place Lam Son, Ben Nghe, 1er Arrondissement',
      ru: 'Площадь Лам Сон, 7, район 1',
      de: '07 Lam Son Square, Ben Nghe, Distrikt 1',
      es: '07 Plaza Lam Son, Ben Nghe, Distrito 1',
      th: '07 จัตุรัส Lam Son แขวง Ben Nghe เขต 1'
    },
    script: {
      vi: 'Nhà Hát Lớn Thành Phố khánh thành năm 1900 mang đậm phong cách kiến trúc Flamboyant Pháp, là trung tâm biểu diễn nghệ thuật danh giá hàng đầu.',
      en: 'Inaugurated in 1900, the Saigon Opera House features splendid French Flamboyant architecture and remains the premier performing arts center in the city.',
      zh: '西贡歌剧院于1900年落成，拥有浓郁的法国华丽哥特风范，是胡志明市顶级的高雅艺术表演殿堂。',
      ja: '1900年に開場した市民劇場（オペラハウス）は、優美なフランス・フランボワイヤン様式を誇る最高峰の舞台芸術の中心地です。',
      ko: '1900년에 개관한 사이공 오페라 하우스는 우아한 프랑스 건축 양식을 자랑하는 호치민시 최고의 대표적인 예술 공연장입니다.',
      fr: 'Inauguré en 1900, l\'Opéra de Saïgon arbore une remarquable façade néo-classique et demeure le cœur des représentations artistiques de la ville.',
      ru: 'Открытый в 1900 году Оперный театр Сайгона в стиле французского неоклассицизма является ведущей сценой исполнительского искусства города.',
      de: 'Das 1900 eingeweihte Opernhaus Saigon besticht durch elegante französische Architektur und ist die führende Bühne der Stadt.',
      es: 'Inaugurada en 1900, la Ópera de Saigón destaca por su arquitectura de estilo francés y es el principal centro de artes escénicas de la ciudad.',
      th: 'โรงละครแห่งชาติไซง่อนเปิดในปี 1900 โดดเด่นด้วยสถาปัตยกรรมแบบฝรั่งเศสอันวิจิตร และเป็นศูนย์กลางการแสดงศิลปะชั้นนำของเมือง'
    }
  },
  // 5. Chợ Bến Thành
  'q1-poi-0005': {
    name: {
      vi: 'Chợ Bến Thành',
      en: 'Ben Thanh Market',
      zh: '滨城市场',
      ja: 'ベンタイン市場',
      ko: '벤탄 시장',
      fr: 'Marché Ben Thanh',
      ru: 'Рынок Бен Тхань',
      de: 'Ben-Thanh-Markt',
      es: 'Mercado Ben Thanh',
      th: 'ตลาดเบนถั่น'
    },
    address: {
      vi: 'Đường Lê Lợi, Phường Bến Thành, Quận 1',
      en: 'Le Loi Street, Ben Thanh, District 1',
      zh: '第一区滨城坊黎利路',
      ja: '1区ベンタイン区レロイ通り',
      ko: '1군 벤탄동 레러이 거리',
      fr: 'Rue Le Loi, Ben Thanh, 1er Arrondissement',
      ru: 'Ул. Ле Лой, район 1',
      de: 'Le-Loi-Straße, Ben Thanh, Distrikt 1',
      es: 'Calle Le Loi, Ben Thanh, Distrito 1',
      th: 'ถนน Le Loi แขวง Ben Thanh เขต 1'
    },
    script: {
      vi: 'Chợ Bến Thành với tháp đồng hồ bốn mặt nổi tiếng là trái tim thương mại sôi động của Quận 1, nơi du khách thỏa sức khám phá ẩm thực đường phố và văn hóa bản địa đặc sắc.',
      en: 'Ben Thanh Market with its iconic clock tower is the bustling commercial heart of District 1, where visitors immerse in street food and vibrant local culture.',
      zh: '以标志性四面钟楼著称的滨城市场是第一区的繁华商业心脏，游客可以在此尽情探索地道街头美食与生动文化。',
      ja: '有名な時計塔を持つベンタイン市場は、活気あふれる1区の商業の中心地であり、名物グルメや伝統文化を楽しめる必訪スポットです。',
      ko: '상징적인 4면 시계탑으로 유명한 벤탄 시장은 활기 넘치는 1구의 상업 중심지로 베트남 전통 길거리 음식과 문화를 만끽할 수 있는 곳입니다.',
      fr: 'Le marché Ben Thanh et sa célèbre tour de l\'horloge constituent le cœur commercial vibrant du 1er arrondissement, haut lieu de la gastronomie et de l\'artisanat.',
      ru: 'Рынок Бен Тхань с его знаменитой часовой башней — шумное коммерческое сердце 1-го района, где кипит уличная торговля и аутентичная культура.',
      de: 'Der Ben-Thanh-Markt mit seinem markanten Uhrturm ist das pulsierende Handelszentrum von Distrikt 1 und ein Paradies für Street Food.',
      es: 'El Mercado Ben Thanh, con su icónica torre del reloj, es el corazón comercial de Saigón, famoso por su gastronomía callejera y artesanía local.',
      th: 'ตลาดเบนถั่นพร้อมหอนาฬิกาสี่ด้านอันเป็นเอกลักษณ์ คือหัวใจทางการค้าที่คึกคักของเขต 1 ที่ซึ่งนักท่องเที่ยวจะได้สัมผัสอาหารริมทางและวัฒนธรรมท้องถิ่น'
    }
  },
  // 6. Bảo Tàng Chứng Tích Chiến Tranh
  'q1-poi-0006': {
    name: {
      vi: 'Bảo Tàng Chứng Tích Chiến Tranh',
      en: 'War Remnants Museum',
      zh: '战争遗迹博物馆',
      ja: '戦争証跡博物館',
      ko: '전쟁유적박물관',
      fr: 'Musée des Vestiges de la Guerre',
      ru: 'Музей военных реликвий',
      de: 'Kriegsopfermuseum',
      es: 'Museo de los Vestigios de la Guerra',
      th: 'พิพิธภัณฑ์ร่องรอยสงคราม'
    },
    address: {
      vi: '28 Võ Văn Tần, Phường 6, Quận 3 (Giáp ranh Q.1)',
      en: '28 Vo Van Tan, Ward 6, District 3',
      zh: '第三区第六坊武文秦路28号',
      ja: '3区6坊ボーバンタン通り28番地',
      ko: '3군 6동 보반탄 28번지',
      fr: '28 rue Vo Van Tan, 3e Arrondissement',
      ru: 'Ул. Во Ван Тан, 28, район 3',
      de: '28 Vo Van Tan, Distrikt 3',
      es: '28 Vo Van Tan, Distrito 3',
      th: '28 ถนน Vo Van Tan แขวง 6 เขต 3'
    },
    script: {
      vi: 'Bảo Tàng Chứng Tích Chiến Tranh lưu giữ hàng ngàn hiện vật và tư liệu lịch sử quý giá, truyền tải thông điệp sâu sắc về khát vọng hòa bình và sự kiên cường của dân tộc.',
      en: 'The War Remnants Museum houses thousands of historic artifacts and photographic records, conveying a powerful message of peace, resilience, and human spirit.',
      zh: '战争遗迹博物馆收藏了数以千计的珍贵历史文物与影像资料，向全世界传递了对和平的珍视与坚韧的民族精神。',
      ja: '戦争証跡博物館には数千点もの貴重な遺物や写真記録が展示されており、平和の尊さと力強いメッセージを今に伝えています。',
      ko: '전쟁유적박물관은 수천 점의 역사적 유물과 사진 기록을 소장하고 있으며, 평화에 대한 깊은 염원과 역사적 교훈을 전하는 명소입니다.',
      fr: 'Le Musée des Vestiges de la Guerre abrite des milliers de documents et de photographies poignants, portant un message universel de paix et de résilience.',
      ru: 'Музей военных реликвий хранит тысячи ценных исторических экспонатов и фотографий, передавая глубокое послание о мире и стойкости народа.',
      de: 'Das Kriegsopfermuseum beherbergt Tausende historischer Dokumente und Fotos und vermittelt eine eindringliche Botschaft des Friedens.',
      es: 'El Museo de los Vestigios de la Guerra alberga miles de valiosos artefactos históricos y fotografías, transmitiendo un mensaje universal de paz.',
      th: 'พิพิธภัณฑ์ร่องรอยสงครามเก็บรักษาโบราณวัตถุและบันทึกภาพถ่ายประวัติศาสตร์นับพันชิ้น เพื่อสื่อถึงข้อความแห่งสันติภาพและความเข้มแข็งของมนุษยชาติ'
    }
  }
};

// Flexible POI multi-language resolver matching ID or names
function findPoiMultilang(poi) {
  if (!poi) return null;
  if (typeof POI_MULTILANG_SCRIPTS === 'undefined') return null;

  // Direct ID check
  if (POI_MULTILANG_SCRIPTS[poi.id]) return POI_MULTILANG_SCRIPTS[poi.id];

  // Map fallback IDs
  if (poi.id === 'poi-dinh-doc-lap') return POI_MULTILANG_SCRIPTS['q1-poi-0001'];
  if (poi.id === 'poi-nha-tho-duc-ba') return POI_MULTILANG_SCRIPTS['q1-poi-0002'];
  if (poi.id === 'poi-buu-dien') return POI_MULTILANG_SCRIPTS['q1-poi-0003'];
  if (poi.id === 'poi-nha-hat') return POI_MULTILANG_SCRIPTS['q1-poi-0004'];
  if (poi.id === 'poi-cho-ben-thanh') return POI_MULTILANG_SCRIPTS['q1-poi-0005'];
  if (poi.id === 'poi-bao-tang') return POI_MULTILANG_SCRIPTS['q1-poi-0006'];

  // Fuzzy check on name and ID
  const str = ((poi.id || '') + ' ' + (poi.name || '')).toLowerCase();
  if (str.includes('dinh') || str.includes('độc lập') || str.includes('doc lap') || str.includes('independence') || str.includes('reunification')) {
    return POI_MULTILANG_SCRIPTS['q1-poi-0001'];
  }
  if (str.includes('đức bà') || str.includes('duc ba') || str.includes('notre')) {
    return POI_MULTILANG_SCRIPTS['q1-poi-0002'];
  }
  if (str.includes('bưu điện') || str.includes('buu dien') || str.includes('post office')) {
    return POI_MULTILANG_SCRIPTS['q1-poi-0003'];
  }
  if (str.includes('nhà hát') || str.includes('nha hat') || str.includes('opera')) {
    return POI_MULTILANG_SCRIPTS['q1-poi-0004'];
  }
  if (str.includes('bến thành') || str.includes('ben thanh')) {
    return POI_MULTILANG_SCRIPTS['q1-poi-0005'];
  }
  if (str.includes('chứng tích') || str.includes('chung tich') || str.includes('war remnants')) {
    return POI_MULTILANG_SCRIPTS['q1-poi-0006'];
  }
  return null;
}

function getLocalizedPoi(poi, lang) {
  if (!poi) return poi;
  const l = lang || state.selectedLang || 'vi';
  const multilang = findPoiMultilang(poi);
  if (!multilang) return poi;

  const locName = (multilang.name && multilang.name[l]) ? multilang.name[l] : poi.name;
  const locAddr = (multilang.address && multilang.address[l]) ? multilang.address[l] : (poi.address || poi.category || 'TP. Hồ Chí Minh');
  const locScript = (multilang.script && multilang.script[l]) ? multilang.script[l] : (poi.ttsScript || locName);

  return {
    ...poi,
    name: locName,
    address: locAddr,
    ttsScript: locScript
  };
}

function applyUiTranslations(lang) {
  const l = lang || state.selectedLang || 'vi';
  const t = UI_LOCALES[l] || UI_LOCALES.vi;

  // 1. Top Header
  const screenTitle = document.getElementById('screenTitle');
  if (screenTitle) screenTitle.innerText = t.screenTitle;

  // 2. Map Bottom Bar
  const distLabel = document.getElementById('distLabel');
  if (distLabel && state.activePoi) {
    const locPoi = getLocalizedPoi(state.activePoi, l);
    distLabel.innerText = `${t.distLabelPrefix} ${locPoi.name.toUpperCase()}`;
  }
  const rightLabel = document.querySelector('.overlay-col.right-col .overlay-label');
  if (rightLabel) rightLabel.innerText = t.zoneStatusLabel;

  // 3. Highlight Badge
  const highlightBadge = document.querySelector('.highlight-badge');
  if (highlightBadge) highlightBadge.innerText = t.highlightBadge;

  // 4. CTA Button
  const startNarrationText = document.getElementById('startNarrationText');
  if (startNarrationText && state.activePoi) {
    const locPoi = getLocalizedPoi(state.activePoi, l);
    startNarrationText.innerText = state.isPlaying ? `${t.pauseNarration}: ${locPoi.name}` : `${t.startNarration}: ${locPoi.name}`;
  }

  // 5. Controls Tooltips
  const rewindBtn = document.getElementById('rewindBtn');
  if (rewindBtn) rewindBtn.title = t.rewindBtn;
  const speedBtn = document.getElementById('speedBtn');
  if (speedBtn) speedBtn.title = t.speedBtn;

  // 6. Tabs
  const btnTabMap = document.getElementById('btnTabMap');
  const btnTabTours = document.getElementById('btnTabTours');
  const btnTabSettings = document.getElementById('btnTabSettings');
  if (btnTabMap) {
    const lbl = btnTabMap.querySelector('.tab-label');
    if (lbl) lbl.innerText = t.tabMap;
  }
  if (btnTabTours) {
    const lbl = btnTabTours.querySelector('.tab-label');
    if (lbl) lbl.innerText = t.tabTours;
  }
  if (btnTabSettings) {
    const lbl = btnTabSettings.querySelector('.tab-label');
    if (lbl) lbl.innerText = t.tabSettings;
  }

  // 7. Tab 2: Tours
  const tabTours = document.getElementById('tabTours');
  if (tabTours) {
    const h2 = tabTours.querySelector('.tours-header h2');
    const p = tabTours.querySelector('.tours-header p');
    if (h2) h2.innerText = t.toursTitle;
    if (p) p.innerText = t.toursSubtitle;

    const cards = tabTours.querySelectorAll('.tour-card');
    if (cards[0]) {
      const b = cards[0].querySelector('.tour-badge');
      const name = cards[0].querySelector('.tour-name');
      const desc = cards[0].querySelector('.tour-desc');
      if (b) b.innerText = t.tour1Badge;
      if (name) name.innerText = t.tour1Title;
      if (desc) desc.innerText = t.tour1Desc;
    }
    if (cards[1]) {
      const b = cards[1].querySelector('.tour-badge');
      const name = cards[1].querySelector('.tour-name');
      const desc = cards[1].querySelector('.tour-desc');
      if (b) b.innerText = t.tour2Badge;
      if (name) name.innerText = t.tour2Title;
      if (desc) desc.innerText = t.tour2Desc;
    }
    if (cards[2]) {
      const b = cards[2].querySelector('.tour-badge');
      const name = cards[2].querySelector('.tour-name');
      const desc = cards[2].querySelector('.tour-desc');
      if (b) b.innerText = t.tour3Badge;
      if (name) name.innerText = t.tour3Title;
      if (desc) desc.innerText = t.tour3Desc;
    }
  }

  // 8. Tab 3: Settings
  const tabSettings = document.getElementById('tabSettings');
  if (tabSettings) {
    const h2 = tabSettings.querySelector('.settings-header h2');
    const p = tabSettings.querySelector('.settings-header p');
    if (h2) h2.innerText = t.settingsTitle;
    if (p) p.innerText = t.settingsSubtitle;

    const groups = tabSettings.querySelectorAll('.settings-group');
    if (groups[0]) {
      const gTitle = groups[0].querySelector('.group-title');
      const lbls = groups[0].querySelectorAll('.setting-label');
      const subs = groups[0].querySelectorAll('.setting-subtext');
      if (gTitle) gTitle.innerText = t.groupAudio;
      if (lbls[0]) lbls[0].innerText = t.langLabel;
      if (subs[0]) subs[0].innerText = t.langSub;
      if (lbls[1]) lbls[1].innerText = t.autoPlayLabel;
      if (subs[1]) subs[1].innerText = t.autoPlaySub;
    }
    if (groups[1]) {
      const gTitle = groups[1].querySelector('.group-title');
      const desc = groups[1].querySelector('.tool-desc');
      if (gTitle) gTitle.innerText = t.groupSim;
      if (desc) desc.innerHTML = `<span class="flask-icon">🧪</span> ${t.simDesc}`;

      const simNearText = document.querySelector('#simNearBtn .btn-text');
      const simFarText = document.querySelector('#simFarBtn .btn-text');
      const realGpsText = document.querySelector('#realGpsBtn .btn-text');
      if (simNearText) simNearText.innerHTML = `<b>${t.simNear}</b>`;
      if (simFarText) simFarText.innerHTML = `<b>${t.simFar}</b>`;
      if (realGpsText) realGpsText.innerHTML = `<b>${t.simReal}</b>`;
    }
    if (groups[2]) {
      const gTitle = groups[2].querySelector('.group-title');
      const lbls = groups[2].querySelectorAll('.info-label');
      if (gTitle) gTitle.innerText = t.groupInfo;
      if (lbls[0]) lbls[0].innerText = t.versionLabel;
      if (lbls[1]) lbls[1].innerText = t.targetLabel;
    }
  }

  // 9. Active POI details update
  if (state.activePoi) {
    const locPoi = getLocalizedPoi(state.activePoi, l);
    dom.poiName.innerText = locPoi.name;
    if (dom.sheetPoiName) dom.sheetPoiName.innerText = locPoi.name;
    dom.poiAddress.innerText = locPoi.address;
    dom.poiScriptText.innerText = locPoi.ttsScript;
  }

  // 10. Update User Marker Popup
  if (state.userMarker) {
    state.userMarker.bindPopup(`<b>${t.youAreHere || 'Bạn ở đây'}</b>`);
  }

  // 11. Refresh map landmark markers with localized labels
  if (typeof renderPoiMarkers === 'function') {
    renderPoiMarkers();
  }
}

/**
 * TOURISM NAVIGATION SYSTEM - CLIENT WEB APP
 * Features:
 * - Real GPS tracking with live customer location updates
 * - 30m Geofencing around heritage POIs with automatic audio/TTS narration
 * - Graceful fallback to simulation mode for desktop/laptop testing
 * - Interactive 3-tab smartphone UI (Bản đồ, Lộ trình, Cài đặt)
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
  GEOFENCE_COOLDOWN_MS: 60000, // 60s cooldown per POI to avoid repeated triggers in the same zone
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
  accuracyCircle: null,
  watchId: null,
  hasFirstGpsFix: false,
  poiMarkers: {},
  poiGeofenceCircles: {},
  lastTriggeredTime: {},
  audioDuration: 135,
  audioCurrentTime: 0,
  playbackInterval: null,
  bannerTimeout: null,
};

// DOM References
const dom = {
  screenTitle: document.getElementById('screenTitle'),
  gpsPill: document.getElementById('gpsPill'),
  gpsText: document.getElementById('gpsText'),
  distLabel: document.getElementById('distLabel'),
  distValue: document.getElementById('distValue'),
  zoneBadge: document.getElementById('zoneBadge'),
  recenterBtn: document.getElementById('recenterBtn'),
  geofenceBanner: document.getElementById('geofenceBanner'),
  bannerTitle: document.getElementById('bannerTitle'),
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
  // Automatically start requesting and tracking real GPS from device
  startGpsTracking();
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
window.addEventListener('pointerdown', unlockAudio, { capture: true });

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
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
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

  // Standard Google Maps Tile Layer (no watermark, crisp Vietnamese labels)
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
  const _initLoc = (typeof UI_LOCALES !== 'undefined' && UI_LOCALES[state.selectedLang || 'vi']) ? UI_LOCALES[state.selectedLang || 'vi'] : { youAreHere: 'Bạn ở đây' };
  state.userMarker.bindPopup(`<b>${_initLoc.youAreHere || 'Bạn ở đây'}</b>`);

  // Map click moves user in simulation mode
  state.map.on('click', (e) => {
    // If user clicks the map, pause real GPS watch temporarily so they can test any coordinates
    if (!state.isSimulating && state.watchId !== null) {
      navigator.geolocation.clearWatch(state.watchId);
      state.watchId = null;
      state.isSimulating = true;
      dom.gpsPill.className = 'gps-badge sim';
      dom.gpsText.innerText = 'GPS: Mô phỏng';
      if (dom.recenterBtn) dom.recenterBtn.classList.remove('active-tracking');
    }
    updateUserPosition(e.latlng.lat, e.latlng.lng);
  });
}

function renderPoiMarkers() {
  if (!state.map) return;
  Object.values(state.poiMarkers).forEach(m => state.map.removeLayer(m));
  Object.values(state.poiGeofenceCircles).forEach(c => state.map.removeLayer(c));
  state.poiMarkers = {};
  state.poiGeofenceCircles = {};

  const l = state.selectedLang || 'vi';

  state.pois.forEach(poi => {
    const locPoi = (typeof getLocalizedPoi === 'function') ? getLocalizedPoi(poi, l) : poi;
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
          <div class="poi-label-pill">${locPoi.name}</div>
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
  checkGeofenceAndDistances();
}

// ==========================================
// 4. REAL GPS & POSITION TRACKING
// ==========================================
function startGpsTracking() {
  if (!navigator.geolocation) {
    onGpsPositionError({ code: 0, message: 'Thiết bị không hỗ trợ Geolocation' });
    return;
  }

  dom.gpsPill.className = 'gps-badge connecting';
  dom.gpsText.innerText = 'GPS: Đang lấy vị trí thực...';

  // 1. Get fast immediate fix from hardware GPS
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log('[GPS Fast Fix Received]:', pos.coords.latitude, pos.coords.longitude);
      onGpsPositionUpdate(pos);
    },
    (err) => {
      console.warn('[GPS Fast Fix Pending]:', err.message);
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );

  // 2. Continuous real-time position tracking
  if (state.watchId !== null) {
    navigator.geolocation.clearWatch(state.watchId);
    state.watchId = null;
  }

  state.watchId = navigator.geolocation.watchPosition(
    onGpsPositionUpdate,
    onGpsPositionError,
    {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 15000
    }
  );
}

function onGpsPositionUpdate(pos) {
  const { latitude, longitude, accuracy } = pos.coords;
  state.isSimulating = false;
  state.hasRealGps = true;

  dom.gpsPill.className = 'gps-badge active';
  const _lGps = state.selectedLang || 'vi';
  const _tGps = (typeof UI_LOCALES !== 'undefined' && UI_LOCALES[_lGps]) ? UI_LOCALES[_lGps] : { gpsReal: 'GPS Thật', youAreHere: 'Bạn ở đây' };
  dom.gpsText.innerText = accuracy ? `${_tGps.gpsReal}: ±${Math.round(accuracy)}m` : _tGps.gpsReal;
  if (state.userMarker) {
    state.userMarker.bindPopup(`<b>${_tGps.youAreHere || 'Bạn ở đây'}</b>`);
  }
  if (dom.recenterBtn) dom.recenterBtn.classList.add('active-tracking');

  // Cập nhật vị trí và marker người dùng tới đúng tọa độ GPS thực tế
  updateUserPosition(latitude, longitude, accuracy);

  // Căn giữa bản đồ vào vị trí GPS thực tế của du khách
  if (!state.hasFirstGpsFix) {
    state.hasFirstGpsFix = true;
    state.map.setView([latitude, longitude], 16);
  }
}

function onGpsPositionError(err) {
  console.warn('[GPS] Vị trí phần cứng:', err.message);
  // Laptop/Mac without GPS chip or permission denied -> fallback gracefully to simulation
  state.isSimulating = true;
  dom.gpsPill.className = 'gps-badge sim';
  dom.gpsText.innerText = 'GPS: Mô phỏng';
  if (dom.recenterBtn) dom.recenterBtn.classList.remove('active-tracking');
}

function updateUserPosition(lat, lng, accuracy = null) {
  state.currentLat = lat;
  state.currentLng = lng;

  if (state.userMarker) {
    state.userMarker.setLatLng([lat, lng]);
  }

  // Draw or update GPS Accuracy Circle
  if (accuracy && accuracy < 250) {
    if (!state.accuracyCircle) {
      state.accuracyCircle = L.circle([lat, lng], {
        radius: accuracy,
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.12,
        weight: 1
      }).addTo(state.map);
    } else {
      state.accuracyCircle.setLatLng([lat, lng]);
      state.accuracyCircle.setRadius(accuracy);
    }
  } else if (state.accuracyCircle) {
    state.map.removeLayer(state.accuracyCircle);
    state.accuracyCircle = null;
  }

  checkGeofenceAndDistances();
}

// ==========================================
// 5. 30M GEOFENCING & AUTO-NARRATION LOGIC
// ==========================================
function checkGeofenceAndDistances() {
  if (!state.pois || state.pois.length === 0) return;

  const l = state.selectedLang || 'vi';
  const t = (typeof UI_LOCALES !== 'undefined' && UI_LOCALES[l]) ? UI_LOCALES[l] : UI_LOCALES.vi;

  let closestPoi = null;
  let closestDist = Infinity;
  let poiInsideZone = null;

  // Search across all POIs
  for (const poi of state.pois) {
    const dist = calculateHaversine(state.currentLat, state.currentLng, poi.lat, poi.lng);
    if (dist < closestDist) {
      closestDist = dist;
      closestPoi = poi;
    }
    const radius = poi.radiusM || CONFIG.GEOFENCE_RADIUS_M || 30;
    if (dist <= radius) {
      poiInsideZone = poi;
    }
  }

  const targetPoi = poiInsideZone || closestPoi || state.activePoi;
  if (!targetPoi) return;

  const locTargetPoi = (typeof getLocalizedPoi === 'function') ? getLocalizedPoi(targetPoi, l) : targetPoi;
  const targetDist = calculateHaversine(state.currentLat, state.currentLng, targetPoi.lat, targetPoi.lng);
  const roundedDist = Math.round(targetDist);

  // Update Distance Display in active language
  dom.distLabel.innerText = `${t.distLabelPrefix} ${locTargetPoi.name.toUpperCase()}`;
  dom.distValue.innerText = roundedDist >= 1000 ? `${(roundedDist / 1000).toFixed(1)} km` : `${roundedDist} m`;

  if (poiInsideZone) {
    // --- DU KHÁCH ĐÃ ĐI VÀO VÙNG 30M ---
    dom.zoneBadge.className = 'zone-badge inside';
    dom.zoneBadge.innerText = `${t.zoneInside} (${roundedDist}m)`;

    // Switch active POI to the one entered
    if (!state.activePoi || state.activePoi.id !== poiInsideZone.id) {
      selectPoi(poiInsideZone, false);
    }

    // Trigger Auto Narration
    if (state.autoPlayGeofence) {
      const now = Date.now();
      const lastTime = state.lastTriggeredTime[poiInsideZone.id] || 0;
      if (now - lastTime > CONFIG.GEOFENCE_COOLDOWN_MS) {
        state.lastTriggeredTime[poiInsideZone.id] = now;
        console.log(`[GEOFENCE TRIGGERED] Entered: ${locTargetPoi.name} (${roundedDist}m)`);
        
        // Audio notification cue
        playNotificationChime();

        // Show banner notification in active language
        showGeofenceBanner(poiInsideZone);

        // Auto start narration
        startPlayback();
      }
    }
  } else {
    // --- NGOÀI VÙNG 30M ---
    dom.zoneBadge.className = 'zone-badge outside';
    const distFormatted = roundedDist >= 1000 ? `${(roundedDist / 1000).toFixed(1)}km` : `${roundedDist}m`;
    dom.zoneBadge.innerText = `${t.zoneOutside} (${distFormatted})`;
    hideGeofenceBanner();

    // If not playing, keep card synced to closest landmark
    if (closestPoi && (!state.activePoi || !state.isPlaying)) {
      if (!state.activePoi || state.activePoi.id !== closestPoi.id) {
        selectPoi(closestPoi, false);
      }
    }
  }
}

function showGeofenceBanner(poi) {
  if (!dom.geofenceBanner) return;
  const l = state.selectedLang || 'vi';
  const t = (typeof UI_LOCALES !== 'undefined' && UI_LOCALES[l]) ? UI_LOCALES[l] : UI_LOCALES.vi;
  const locPoi = (typeof getLocalizedPoi === 'function') ? getLocalizedPoi(poi, l) : poi;

  dom.bannerTitle.innerText = `${t.bannerComing} ${locPoi.name}!`;
  const subSpan = dom.geofenceBanner.querySelector('.banner-sub');
  if (subSpan) subSpan.innerText = t.bannerSub;

  dom.geofenceBanner.classList.remove('hidden');
  clearTimeout(state.bannerTimeout);
  state.bannerTimeout = setTimeout(() => {
    hideGeofenceBanner();
  }, 10000);
}

function hideGeofenceBanner() {
  if (!dom.geofenceBanner) return;
  dom.geofenceBanner.classList.add('hidden');
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
// 6. POI SELECTION & UI SYNC
// ==========================================
function selectPoi(poi, autoPlay = false) {
  const isSame = state.activePoi && state.activePoi.id === poi.id;
  state.activePoi = poi;

  const l = state.selectedLang || 'vi';
  const t = (typeof UI_LOCALES !== 'undefined' && UI_LOCALES[l]) ? UI_LOCALES[l] : UI_LOCALES.vi;
  const locPoi = (typeof getLocalizedPoi === 'function') ? getLocalizedPoi(poi, l) : poi;

  // Update Player Card
  dom.poiName.innerText = locPoi.name;
  if (dom.sheetPoiName) dom.sheetPoiName.innerText = locPoi.name;
  dom.poiAddress.innerText = locPoi.address || 'Quận 1, TP. Hồ Chí Minh';
  dom.poiThumb.src = poi.imageUrl || 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=200&auto=format&fit=crop&q=80';
  dom.startNarrationText.innerText = state.isPlaying ? `${t.pauseNarration}: ${locPoi.name}` : `${t.startNarration}: ${locPoi.name}`;
  dom.poiScriptText.innerText = locPoi.ttsScript || locPoi.name;

  state.audioDuration = poi.durationSec || 135;
  dom.timeTotal.innerText = formatTime(state.audioDuration);

  // Center Map on selected POI
  state.map.panTo([poi.lat, poi.lng]);
  resetAudioProgress();

  if (autoPlay) {
    if (isSame && state.isPlaying) return;
    startPlayback();
  } else if (!state.isPlaying) {
    stopPlayback();
  }
}

// ==========================================
// REALTIME DEVICE ONLINE & TRACKING
// ==========================================
function getOrCreateDeviceId() {
  let devId = localStorage.getItem('poi_tour_device_id') || sessionStorage.getItem('poi_tour_device_id');
  if (!devId) {
    devId = 'dev_' + window.screen.width + 'x' + window.screen.height + '_' + Math.random().toString(36).substring(2, 9);
    try {
      localStorage.setItem('poi_tour_device_id', devId);
      sessionStorage.setItem('poi_tour_device_id', devId);
    } catch (e) {}
  }
  return devId;
}

function sendRealtimeHeartbeat() {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const devId = getOrCreateDeviceId();
  fetch(CONFIG.REALTIME_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'DEVICE_ONLINE', deviceId: devId, deviceType: isMobile ? 'mobile' : 'web' })
  }).catch(() => {});
}

function sendDeviceOffline() {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const devId = getOrCreateDeviceId();
  const payload = JSON.stringify({ type: 'DEVICE_OFFLINE', deviceId: devId, deviceType: isMobile ? 'mobile' : 'web' });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(CONFIG.REALTIME_URL, new Blob([payload], { type: 'application/json' }));
  } else {
    fetch(CONFIG.REALTIME_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => {});
  }
}

// Heartbeat every 3s
setInterval(sendRealtimeHeartbeat, 3000);
sendRealtimeHeartbeat();

// Instant offline detection on page leave / background
window.addEventListener('pagehide', sendDeviceOffline);
window.addEventListener('beforeunload', sendDeviceOffline);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    sendDeviceOffline();
  } else if (document.visibilityState === 'visible') {
    sendRealtimeHeartbeat();
  }
});

function notifyPoiPlay(poi) {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const devId = getOrCreateDeviceId();
  fetch(CONFIG.REALTIME_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'POI_PLAY',
      deviceId: devId,
      poiId: poi.id,
      poiName: poi.name,
      language: state.selectedLang || 'vi',
      deviceType: isMobile ? 'mobile' : 'web'
    })
  }).catch(() => {});
}

// ==========================================
// 7. AUDIO & TTS NARRATION ENGINE
// ==========================================
function togglePlayback() {
  unlockAudio();
  if (state.isPlaying) {
    stopPlayback();
  } else {
    startPlayback();
  }
}

function startPlayback() {
  if (state.activePoi) notifyPoiPlay(state.activePoi);
  if (!state.activePoi) return;

  unlockAudio();
  state.isPlaying = true;
  updatePlayButtonUI(true);
  const _l = state.selectedLang || 'vi';
  const _t = (typeof UI_LOCALES !== 'undefined' && UI_LOCALES[_l]) ? UI_LOCALES[_l] : { pauseNarration: 'Tạm dừng thuyết minh' };
  const _loc = (typeof getLocalizedPoi === 'function') ? getLocalizedPoi(state.activePoi, _l) : state.activePoi;
  dom.startNarrationText.innerText = `${_t.pauseNarration}: ${_loc.name}`;

  // Notification chime
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
  if (!('speechSynthesis' in window) || !state.activePoi) return;

  window.speechSynthesis.cancel();
  if (window.speechSynthesis.paused) window.speechSynthesis.resume();

  const currentLang = state.selectedLang || 'vi';
  const langMeta = (typeof LANG_MAP !== 'undefined' && LANG_MAP[currentLang]) ? LANG_MAP[currentLang] : { tag: 'vi-VN' };
  
  // 1. Get localized text in the exact selected language
  const locPoi = (typeof getLocalizedPoi === 'function') ? getLocalizedPoi(state.activePoi, currentLang) : state.activePoi;
  const textToSpeak = locPoi.ttsScript || locPoi.name;
  
  console.log(`[TTS] Speaking in ${currentLang} (${langMeta.tag}):`, textToSpeak.substring(0, 40) + '...');
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  window._activeUtterance = utterance;

  utterance.lang = langMeta.tag;
  utterance.rate = state.playbackSpeed || 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // 2. Resolve available voices for this specific language
  if (!availableVoices || availableVoices.length === 0) {
    availableVoices = window.speechSynthesis.getVoices();
  }

  // Find exact or closest matching voice for current language
  const prefix = currentLang.toLowerCase();
  const matchedVoice = availableVoices.find(v => {
    const vLang = v.lang.toLowerCase().replace('_', '-');
    return vLang.startsWith(prefix) || vLang.includes(langMeta.tag.toLowerCase());
  });

  if (matchedVoice) {
    utterance.voice = matchedVoice;
    console.log('[TTS Voice Bound]:', matchedVoice.name, matchedVoice.lang);
  }

  utterance.onend = () => {
    window._activeUtterance = null;
    stopPlayback();
  };

  utterance.onerror = (e) => {
    window._activeUtterance = null;
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      console.warn('SpeechSynthesis error:', e.error);
      stopPlayback();
    }
  };

  setTimeout(() => {
    try {
      window.speechSynthesis.speak(utterance);
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    } catch (err) {
      console.warn('SpeechSynthesis blocked pending gesture:', err);
    }
  }, 60);
}

function stopPlayback() {
  state.isPlaying = false;
  updatePlayButtonUI(false);
  if (state.activePoi) {
    const _l2 = state.selectedLang || 'vi';
  const _t2 = (typeof UI_LOCALES !== 'undefined' && UI_LOCALES[_l2]) ? UI_LOCALES[_l2] : { startNarration: 'Bắt đầu thuyết minh' };
  const _loc2 = (typeof getLocalizedPoi === 'function') ? getLocalizedPoi(state.activePoi, _l2) : state.activePoi;
  dom.startNarrationText.innerText = `${_t2.startNarration}: ${_loc2.name}`;
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
// 8. TAB NAVIGATION & EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  // Bottom Tab Navigation
  dom.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      switchTab(targetId, btn);
    });
  });

  // Floating Recenter / GPS Button on Map
  if (dom.recenterBtn) {
    dom.recenterBtn.addEventListener('click', () => {
      unlockAudio();
      state.map.setView([state.currentLat, state.currentLng], 17);
      startGpsTracking();
    });
  }

  // Geofence Notification Banner Click
  if (dom.geofenceBanner) {
    dom.geofenceBanner.addEventListener('click', () => {
      unlockAudio();
      startPlayback();
      hideGeofenceBanner();
    });
  }

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
    console.log('[Language Changed to]:', state.selectedLang);
    stopPlayback();
    if (typeof applyUiTranslations === 'function') {
      applyUiTranslations(state.selectedLang);
    }
    if (state.activePoi) {
      selectPoi(state.activePoi, false);
    }
    checkGeofenceAndDistances();
  });

  dom.autoPlayToggle.addEventListener('change', (e) => {
    state.autoPlayGeofence = e.target.checked;
  });

  // Simulation Tool 1: Near Dinh (10m) -> Triggers 30m geofence
  dom.simNearBtn.addEventListener('click', () => {
    if (state.watchId !== null) {
      navigator.geolocation.clearWatch(state.watchId);
      state.watchId = null;
    }
    state.isSimulating = true;
    dom.gpsPill.className = 'gps-badge sim';
    dom.gpsText.innerText = 'GPS: Mô phỏng';
    if (dom.recenterBtn) dom.recenterBtn.classList.remove('active-tracking');
    updateUserPosition(10.77685, 106.69530); // ~10m from Dinh
    switchTab('tabMap', document.getElementById('btnTabMap'));
  });

  // Simulation Tool 2: Far from Dinh (350m)
  dom.simFarBtn.addEventListener('click', () => {
    if (state.watchId !== null) {
      navigator.geolocation.clearWatch(state.watchId);
      state.watchId = null;
    }
    state.isSimulating = true;
    dom.gpsPill.className = 'gps-badge sim';
    dom.gpsText.innerText = 'GPS: Mô phỏng';
    if (dom.recenterBtn) dom.recenterBtn.classList.remove('active-tracking');
    stopPlayback();
    updateUserPosition(10.77450, 106.69420); // ~316m - 350m
    switchTab('tabMap', document.getElementById('btnTabMap'));
  });

  // Simulation Tool 3: Real Device GPS
  dom.realGpsBtn.addEventListener('click', () => {
    startGpsTracking();
    switchTab('tabMap', document.getElementById('btnTabMap'));
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
