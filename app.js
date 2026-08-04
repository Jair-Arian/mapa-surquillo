/**
 * ============================================================================
 * MAPA SECTORIZADO DE SURQUILLO — Application Logic
 * Sistema de Clasificación Territorial v3.1 (GeoPerú + Grabador de Rutas)
 * ============================================================================
 *
 * FUENTE DE DATOS: dibujo_geoperu_7 rutas.geojson (GeoPerú gob.pe)
 * FUNCIONALIDAD ADICIONAL: Grabador de Rutas por Sector y Exportación
 */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────────────────────────────────────
  // 1. POLÍGONOS DE LOS 7 SECTORES — Coordenadas GeoPerú Oficiales
  // ──────────────────────────────────────────────────────────────────────────

  const SECTORS = [
    {
      id: '1',
      name: 'Sector 1',
      shortName: 'La Calera / Higuereta / El Pedregal',
      color: '#3B82F6',
      description: 'El sector más extenso (1.74 km²). Abarca toda la zona sureste del distrito: La Calera de la Merced, Trabajadores Telefónicos, Suc. Kiey Sueyoshi, Aurora Este II Etapa, Condominio Doña Tomasita, Jorge Chávez, Los Sauces, Urb. Los Jardines de Higuereta, Aprovissp y El Pedregal. Coordenadas GeoPerú oficiales.',
      landmarks: ['La Calera de la Merced', 'Trabajadores Telefónicos', 'Suc. Kiey Sueyoshi', 'Aurora Este II Etapa', 'Condominio Doña Tomasita', 'Jorge Chávez', 'Los Sauces I', 'Urb. Los Jardines de Higuereta', 'Aprovissp', 'El Pedregal', 'Urb. CAPEBCO', 'San Atanacio de Pedregal'],
      boundaries: ['Av. Tomás Marsano (Noroeste)', 'Av. Angamos Este (Norte)', 'Av. Aviación (Noreste)', 'Límite distrital Sur y Este'],
      polygon: [
        [-12.112557, -77.012073],
        [-12.126454, -77.002746],
        [-12.125563, -77.002365],
        [-12.124340, -77.000934],
        [-12.121590, -76.999002],
        [-12.121423, -76.998782],
        [-12.121433, -76.998331],
        [-12.120024, -76.998281],
        [-12.119887, -76.997580],
        [-12.112776, -76.994277],
        [-12.111669, -76.993455],
        [-12.111253, -76.993611],
        [-12.112557, -77.012073]
      ]
    },
    {
      id: '2',
      name: 'Sector 2',
      shortName: 'Barrio Médico / Mantilla',
      color: '#F59E0B',
      description: 'Sector centro-sur (535,669 m²). Incluye Barrio Médico, Barrio Obrero, zonas residenciales entre Av. República de Panamá y Av. Tomás Marsano, desde Av. Angamos Este hasta Av. Roca y Boloña y Av. Mayor Arce de la Oliva. Coordenadas GeoPerú oficiales.',
      landmarks: ['Barrio Médico', 'Barrio Obrero', 'Av. Sergio Bernales', 'Calle Juan José Calle', 'Calle Víctor Alzamora', 'San Lorenzo'],
      boundaries: ['Av. Angamos Este (Norte)', 'Av. República de Panamá (Oeste)', 'Av. Tomás Marsano (Este)', 'Av. Roca y Boloña / Av. Mcal. Andrés A. Cáceres (Sur)'],
      polygon: [
        [-12.119439, -77.018269],
        [-12.120562, -77.018238],
        [-12.120544, -77.017286],
        [-12.119439, -77.017294],
        [-12.119379, -77.013808],
        [-12.118815, -77.013808],
        [-12.118790, -77.013258],
        [-12.117870, -77.013258],
        [-12.117692, -77.013193],
        [-12.115685, -77.010178],
        [-12.112509, -77.012163],
        [-12.112948, -77.018389],
        [-12.119439, -77.018269]
      ]
    },
    {
      id: '3',
      name: 'Sector 3',
      shortName: 'Surquillo Viejo / Tradicional',
      color: '#EF4444',
      description: 'Zona suroeste y casco tradicional (591,644 m²). Alta densidad residencial barrial. Incluye Surquillo Viejo, Gonzales Prada, Calle San Diego, Aurora, Calle El Carmen. Limitado por la Vía Expresa al oeste. Coordenadas GeoPerú oficiales.',
      landmarks: ['Surquillo Viejo', 'Mercado Central de Surquillo', 'Calle San Diego', 'Calle El Carmen', 'Jirón Gonzales Prada', 'Calle Leoncio Prado', 'Calle San Agustín', 'Jirón Dante', 'Aurora'],
      boundaries: ['Av. Angamos Este (Norte)', 'Av. Paseo de la República - Vía Expresa (Oeste)', 'Av. República de Panamá (Este)', 'Av. Roca y Boloña / Av. Roosevelt (Sur)'],
      polygon: [
        [-12.119416, -77.018288],
        [-12.112946, -77.018424],
        [-12.113476, -77.025942],
        [-12.117284, -77.026188],
        [-12.119175, -77.025843],
        [-12.119139, -77.025227],
        [-12.119296, -77.024882],
        [-12.119850, -77.024118],
        [-12.119416, -77.018288]
      ]
    },
    {
      id: '4',
      name: 'Sector 4',
      shortName: 'General Recavarren / Irribarren',
      color: '#10B981',
      description: 'Sector centro-oeste (556,323 m²). Zona residencial y comercial consolidada entre la Vía Expresa y el corredor de Av. República de Panamá. Incluye General I. Recavarren, Jirón Salaverry, Jirón Manuel Irribarren. Coordenadas GeoPerú oficiales.',
      landmarks: ['General I. Recavarren', 'Jirón Salaverry', 'Jirón Manuel Irribarren', 'Jirón Domingo Elías', 'Calle José Manuel Iturregui', 'Avenida Andrés Aramburú'],
      boundaries: ['Av. Andrés Aramburú (Norte)', 'Av. Paseo de la República - Vía Expresa (Oeste)', 'Av. República de Panamá (Este)', 'Av. Angamos Este (Sur)'],
      polygon: [
        [-12.113381, -77.025877],
        [-12.108573, -77.026383],
        [-12.105693, -77.018692],
        [-12.112875, -77.018458],
        [-12.113381, -77.025877]
      ]
    },
    {
      id: '5',
      name: 'Sector 5',
      shortName: 'San Felipe / El Cóndor',
      color: '#8B5CF6',
      description: 'Sector central-norte (308,517 m²). Zona triangular entre Av. República de Panamá, Av. Angamos Este y Av. Tomás Marsano. Incluye Luis Rebaza Córdova, El Cóndor, Urb. Primavera de Monterrico. Coordenadas GeoPerú oficiales.',
      landmarks: ['Luis Rebaza Córdova', 'El Cóndor', 'Avenida San Felipe', 'Calle San Lorenzo'],
      boundaries: ['Línea diagonal Aramburú-Angamos (Norte)', 'Av. Angamos Este (Sur)', 'Av. República de Panamá (Oeste)', 'Av. Tomás Marsano (Este)'],
      polygon: [
        [-12.112839, -77.018397],
        [-12.112429, -77.012284],
        [-12.104524, -77.018643],
        [-12.112839, -77.018397]
      ]
    },
    {
      id: '6',
      name: 'Sector 6',
      shortName: 'Villa Victoria / Urb. Primavera',
      color: '#EC4899',
      description: 'Sector noreste (343,056 m²). Comprende Villa Victoria, La Merced, Urb. Primavera de Monterrico, El Aeropuerto. Limita con San Borja al norte. Coordenadas GeoPerú oficiales.',
      landmarks: ['Villa Victoria', 'La Merced', 'Urb. Primavera de Monterrico', 'El Aeropuerto', 'Santo Tomás', 'Calle Avogrado'],
      boundaries: ['Av. Andrés Aramburú / Gálvez Barrenechea (Norte)', 'Av. Tomás Marsano / Diagonal (Suroeste)', 'Av. Angamos Este (Sur)'],
      polygon: [
        [-12.112464, -77.012120],
        [-12.112229, -77.009624],
        [-12.110256, -77.009788],
        [-12.110192, -77.009966],
        [-12.107307, -77.010470],
        [-12.108001, -77.014673],
        [-12.107617, -77.015094],
        [-12.107088, -77.015449],
        [-12.106366, -77.015925],
        [-12.105562, -77.016579],
        [-12.104485, -77.016523],
        [-12.104019, -77.016383],
        [-12.103526, -77.016149],
        [-12.103261, -77.016588],
        [-12.102284, -77.016467],
        [-12.101955, -77.018774],
        [-12.104315, -77.018622],
        [-12.112464, -77.012120]
      ]
    },
    {
      id: '7',
      name: 'Sector 7',
      shortName: 'Los Halcones / Los Negocios',
      color: '#06B6D4',
      description: 'Sector noroeste (476,081 m²). Entrada norte del distrito en el límite con San Isidro. Incluye Vict. de Emp. de Min. Viv., Calle Las Águilas, Calle Los Halcones y Calle Los Negocios. Coordenadas GeoPerú oficiales.',
      landmarks: ['Vict. de Emp. de Min. Viv.', 'Calle Las Águilas', 'Calle Los Halcones', 'Calle Los Negocios', 'Malcones'],
      boundaries: ['Av. Andrés Aramburú (Norte / Límite San Isidro)', 'Diagonal hacia Angamos (Sur)', 'Av. Paseo de la República - Vía Expresa (Oeste)', 'Av. República de Panamá (Este)'],
      polygon: [
        [-12.108489, -77.026408],
        [-12.106500, -77.027082],
        [-12.102845, -77.027333],
        [-12.101980, -77.018972],
        [-12.105622, -77.018734],
        [-12.108489, -77.026408]
      ]
    }
  ];

  // ──────────────────────────────────────────────────────────────────────────
  // 2. PERÍMETRO OFICIAL DEL DISTRITO
  // ──────────────────────────────────────────────────────────────────────────

  const SURQUILLO_OFFICIAL_BOUNDARY = [
    [-12.102845, -77.027333],
    [-12.101980, -77.018972],
    [-12.101955, -77.018774],
    [-12.102284, -77.016467],
    [-12.103261, -77.016588],
    [-12.103526, -77.016149],
    [-12.104019, -77.016383],
    [-12.104485, -77.016523],
    [-12.105562, -77.016579],
    [-12.106366, -77.015925],
    [-12.107088, -77.015449],
    [-12.107617, -77.015094],
    [-12.108001, -77.014673],
    [-12.107307, -77.010470],
    [-12.110192, -77.009966],
    [-12.110256, -77.009788],
    [-12.112229, -77.009624],
    [-12.111253, -76.993611],
    [-12.111669, -76.993455],
    [-12.112776, -76.994277],
    [-12.119887, -76.997580],
    [-12.120024, -76.998281],
    [-12.121433, -76.998331],
    [-12.121423, -76.998782],
    [-12.121590, -76.999002],
    [-12.124340, -77.000934],
    [-12.125563, -77.002365],
    [-12.126454, -77.002746],
    [-12.112557, -77.012073],
    [-12.112509, -77.012163],
    [-12.112948, -77.018389],
    [-12.119439, -77.018269],
    [-12.119416, -77.018288],
    [-12.119850, -77.024118],
    [-12.119296, -77.024882],
    [-12.119139, -77.025227],
    [-12.119175, -77.025843],
    [-12.117284, -77.026188],
    [-12.113476, -77.025942],
    [-12.108573, -77.026383],
    [-12.108489, -77.026408],
    [-12.106500, -77.027082],
    [-12.102845, -77.027333]
  ];

  // ──────────────────────────────────────────────────────────────────────────
  // 3. INITIALIZE LEAFLET MAP
  // ──────────────────────────────────────────────────────────────────────────

  const map = L.map('map', {
    zoomControl: false
  }).setView([-12.1120, -77.0140], 15);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Datos: <a href="https://visor.geoperu.gob.pe/">GeoPerú</a>',
    maxZoom: 19
  }).addTo(map);

  // ──────────────────────────────────────────────────────────────────────────
  // 4. DRAW OFFICIAL DISTRICT BOUNDARY (LÍNEA AZUL GENERAL)
  // ──────────────────────────────────────────────────────────────────────────

  const districtOutline = L.polygon(SURQUILLO_OFFICIAL_BOUNDARY, {
    color: '#2563EB',
    fillColor: 'transparent',
    fillOpacity: 0,
    weight: 3,
    dashArray: '10, 6',
    interactive: false
  }).addTo(map);

  map.fitBounds(districtOutline.getBounds(), { padding: [30, 30] });

  // ──────────────────────────────────────────────────────────────────────────
  // 5. DRAW SECTOR POLYGONS
  // ──────────────────────────────────────────────────────────────────────────

  /** @type {Map<string, L.Polygon>} */
  const polygonLayers = new Map();
  let selectedSectorId = null;
  let searchMarker = null;

  SECTORS.forEach(sector => {
    const polygon = L.polygon(sector.polygon, {
      color: sector.color,
      fillColor: sector.color,
      fillOpacity: 0.28,
      weight: 2.5
    }).addTo(map);

    polygon.bindTooltip(`<strong>${sector.name}</strong><br>${sector.shortName}`, {
      sticky: true,
      className: 'sector-tooltip'
    });

    polygon.on('click', (e) => {
      // If NOT recording, select sector as usual
      if (!isRecording) {
        selectSector(sector.id);
      }
    });

    polygon.on('mouseover', function () {
      if (selectedSectorId !== sector.id) {
        this.setStyle({ fillOpacity: 0.50, weight: 3.5 });
      }
    });

    polygon.on('mouseout', function () {
      if (selectedSectorId !== sector.id) {
        this.setStyle({ fillOpacity: 0.28, weight: 2.5 });
      }
    });

    polygonLayers.set(sector.id, polygon);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 6. POINT-IN-POLYGON (RAY-CASTING)
  // ──────────────────────────────────────────────────────────────────────────

  function isPointInPolygon(point, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];
      const intersect = ((yi > point[1]) !== (yj > point[1])) &&
        (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function findSectorForPoint(lat, lng) {
    return SECTORS.find(s => isPointInPolygon([lat, lng], s.polygon)) || null;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7. ROUTE RECORDER STATE & LOGIC
  // ──────────────────────────────────────────────────────────────────────────

  let isRecording = false;
  /** @type {Array<{id: string, address: string, lat: number, lng: number, sectorId: string, sectorName: string, sectorColor: string, timestamp: number}>} */
  let routeStops = [];
  /** @type {L.Marker[]} */
  let routeMarkerLayers = [];
  /** @type {L.Polyline|null} */
  let routePolylineLayer = null;

  // DOM Elements for Route Recorder
  const routeToggleBtn = document.getElementById('route-toggle-btn');
  const routeSummaryBtn = document.getElementById('route-summary-btn');
  const routeStatus = document.getElementById('route-status');
  const routeStopCounter = document.getElementById('route-stop-counter');
  const routeStopsContainer = document.getElementById('route-stops-container');
  const routeStopsList = document.getElementById('route-stops-list');
  const routeClearBtn = document.getElementById('route-clear-btn');
  const recordingBadge = document.getElementById('recording-badge');
  const footerStopsCounter = document.getElementById('footer-stops');

  // Modal Elements
  const routeModal = document.getElementById('route-modal');
  const routeModalBackdrop = document.getElementById('route-modal-backdrop');
  const routeModalClose = document.getElementById('route-modal-close');
  const routeModalBody = document.getElementById('route-modal-body');
  const routeCopyBtn = document.getElementById('route-copy-btn');
  const routeDownloadBtn = document.getElementById('route-download-btn');
  let activeModalTab = 'by-sector';

  // Toggle Recording State
  function toggleRecording() {
    isRecording = !isRecording;

    if (isRecording) {
      routeToggleBtn.classList.remove('route-btn--start');
      routeToggleBtn.classList.add('route-btn--stop');
      routeToggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="6" width="12" height="12" rx="2"></rect>
        </svg>
        <span>Finalizar Ruta</span>
      `;
      routeStatus.style.display = 'flex';
      routeStopsContainer.style.display = 'block';
      if (recordingBadge) recordingBadge.style.display = 'inline-flex';

      showToast('🔴 Grabador de ruta ACTIVADO. Cada dirección buscada o clic en mapa agregará una parada.', 'info');
    } else {
      routeToggleBtn.classList.remove('route-btn--stop');
      routeToggleBtn.classList.add('route-btn--start');
      routeToggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Iniciar Ruta</span>
      `;
      routeStatus.style.display = 'none';
      if (recordingBadge) recordingBadge.style.display = 'none';

      if (routeStops.length > 0) {
        openRouteModal();
        showToast('🏁 Ruta finalizada. Revisa el resumen por sectores.', 'success');
      } else {
        showToast('Grabación pausada. No habías registrado paradas.', 'info');
      }
    }
  }

  // Add a stop to the active route
  function addStopToRoute(addressName, lat, lng, sector) {
    const newStop = {
      id: 'stop_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
      address: addressName,
      lat,
      lng,
      sectorId: sector.id,
      sectorName: sector.name,
      sectorShortName: sector.shortName,
      sectorColor: sector.color,
      timestamp: Date.now()
    };

    routeStops.push(newStop);
    saveRouteToLocalStorage();
    renderRouteOnMap();
    renderRouteStopsUI();

    showToast(`📍 Parada #${routeStops.length} agregada en ${sector.name}`, 'success');
  }

  // Delete an individual stop from route
  function deleteStopFromRoute(index) {
    if (index >= 0 && index < routeStops.length) {
      const removed = routeStops.splice(index, 1)[0];
      saveRouteToLocalStorage();
      renderRouteOnMap();
      renderRouteStopsUI();
      showToast(`Parada eliminada (${removed.address})`, 'info');
    }
  }

  // Clear all stops
  function clearAllStops() {
    if (routeStops.length === 0) return;
    routeStops = [];
    saveRouteToLocalStorage();
    renderRouteOnMap();
    renderRouteStopsUI();
    showToast('Toda la ruta ha sido borrada', 'info');
  }

  // Render Map Elements (Markers + Polyline)
  function renderRouteOnMap() {
    // Clear previous markers
    routeMarkerLayers.forEach(m => map.removeLayer(m));
    routeMarkerLayers = [];

    if (routePolylineLayer) {
      map.removeLayer(routePolylineLayer);
      routePolylineLayer = null;
    }

    if (routeStops.length === 0) return;

    // Draw connecting line
    const latLngs = routeStops.map(s => [s.lat, s.lng]);
    routePolylineLayer = L.polyline(latLngs, {
      color: '#3B82F6',
      weight: 3.5,
      dashArray: '6, 8',
      opacity: 0.85
    }).addTo(map);

    // Draw numbered markers
    routeStops.forEach((stop, idx) => {
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="route-marker-icon" style="background-color: ${stop.sectorColor};">${idx + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);
      marker.bindPopup(`
        <strong>Parada #${idx + 1}</strong><br>
        ${stop.address}<br>
        <span style="color: ${stop.sectorColor}; font-weight: 600;">${stop.sectorName}: ${stop.sectorShortName}</span>
      `);

      routeMarkerLayers.push(marker);
    });
  }

  // Render Sidebar Live Stops UI
  function renderRouteStopsUI() {
    const count = routeStops.length;
    if (routeStopCounter) routeStopCounter.textContent = `${count} ${count === 1 ? 'parada' : 'paradas'}`;
    if (footerStopsCounter) footerStopsCounter.textContent = count.toString();

    if (routeSummaryBtn) {
      routeSummaryBtn.disabled = count === 0;
    }

    if (!routeStopsList) return;

    if (count === 0) {
      routeStopsList.innerHTML = `<li class="route-stop-item" style="color: var(--text-muted); text-align: center;">No hay paradas en la ruta</li>`;
      return;
    }

    routeStopsList.innerHTML = routeStops.map((stop, idx) => `
      <li class="route-stop-item">
        <div class="route-stop-info">
          <span class="route-stop-index">${idx + 1}</span>
          <span class="route-stop-address" title="${stop.address}">${stop.address}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="route-stop-badge" style="background: ${stop.sectorColor}20; color: ${stop.sectorColor}; border: 1px solid ${stop.sectorColor}40;">
            S${stop.sectorId}
          </span>
          <button class="route-stop-delete" data-index="${idx}" title="Eliminar parada">✕</button>
        </div>
      </li>
    `).join('');

    // Attach delete listeners
    routeStopsList.querySelectorAll('.route-stop-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.dataset.index, 10);
        deleteStopFromRoute(index);
      });
    });
  }

  // Map Click Listener to add stops when recording
  map.on('click', async (e) => {
    if (!isRecording) return;

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    const sector = findSectorForPoint(lat, lng);

    if (!sector) {
      showToast('⚠️ La ubicación presionada está fuera de Surquillo.', 'error');
      return;
    }

    // Try reverse geocoding for a friendly street name
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    let addressName = `Ubicación en ${sector.name} (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

    try {
      const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (response.ok) {
        const data = await response.json();
        if (data && data.display_name) {
          const parts = data.display_name.split(',');
          addressName = (parts[0] + (parts[1] ? ', ' + parts[1] : '')).trim();
        }
      }
    } catch (err) {
      console.log('Reverse geocode failed, using coordinates fallback');
    }

    addStopToRoute(addressName, lat, lng, sector);
  });

  // LocalStorage Persistence
  function saveRouteToLocalStorage() {
    try {
      localStorage.setItem('surquillo_route_stops', JSON.stringify(routeStops));
    } catch (e) {
      console.warn('Unable to save to localStorage:', e);
    }
  }

  function loadRouteFromLocalStorage() {
    try {
      const saved = localStorage.getItem('surquillo_route_stops');
      if (saved) {
        routeStops = JSON.parse(saved);
        renderRouteOnMap();
        renderRouteStopsUI();
      }
    } catch (e) {
      console.warn('Unable to load from localStorage:', e);
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 8. ROUTE SUMMARY MODAL & EXPORT
  // ──────────────────────────────────────────────────────────────────────────

  function openRouteModal() {
    if (!routeModal) return;

    renderModalContent();
    routeModal.style.display = 'flex';
  }

  function closeRouteModal() {
    if (routeModal) routeModal.style.display = 'none';
  }

  function renderModalContent() {
    if (!routeModalBody) return;

    if (routeStops.length === 0) {
      routeModalBody.innerHTML = `
        <div class="modal-empty-state">
          <p>📍 Aún no has registrado ninguna parada en tu ruta.</p>
          <p style="font-size: 0.75rem; margin-top: 8px;">Haz clic en <strong>Iniciar Ruta</strong> y busca direcciones o presiona sobre el mapa.</p>
        </div>
      `;
      return;
    }

    if (activeModalTab === 'by-sector') {
      // Group stops by sector
      const grouped = {};
      SECTORS.forEach(s => {
        grouped[s.id] = { sector: s, stops: [] };
      });

      routeStops.forEach((stop, idx) => {
        if (grouped[stop.sectorId]) {
          grouped[stop.sectorId].stops.push({ ...stop, originalIndex: idx + 1 });
        }
      });

      const sectorsWithStops = Object.values(grouped).filter(g => g.stops.length > 0);

      routeModalBody.innerHTML = `
        <div style="margin-bottom: var(--space-md); font-size: 0.8125rem; color: var(--text-secondary);">
          Total de paradas: <strong style="color:var(--text-primary);">${routeStops.length}</strong> | 
          Sectores recorridos: <strong style="color:var(--text-primary);">${sectorsWithStops.length} de 7</strong>
        </div>

        ${sectorsWithStops.map(g => `
          <div class="modal-sector-group">
            <div class="modal-sector-header" style="background: ${g.sector.color}18; color: ${g.sector.color}; border: 1px solid ${g.sector.color}35;">
              <span>${g.sector.name}: ${g.sector.shortName}</span>
              <span style="background:${g.sector.color}; color:#fff; padding:1px 8px; border-radius:10px; font-size:0.75rem;">
                ${g.stops.length} ${g.stops.length === 1 ? 'dirección' : 'direcciones'}
              </span>
            </div>
            <ul class="modal-stop-list">
              ${g.stops.map(s => `
                <li class="modal-stop-item">
                  <span class="route-stop-index" style="background:${g.sector.color}; color:#fff;">${s.originalIndex}</span>
                  <span>${s.address}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      `;
    } else {
      // Sequential Itinerary
      routeModalBody.innerHTML = `
        <div style="margin-bottom: var(--space-md); font-size: 0.8125rem; color: var(--text-secondary);">
          Itinerario secuencial ordenado de la ruta (${routeStops.length} paradas):
        </div>
        <ul class="modal-stop-list" style="padding-left:0;">
          ${routeStops.map((stop, idx) => `
            <li class="modal-stop-item" style="justify-content: space-between;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="route-stop-index" style="background:${stop.sectorColor}; color:#fff;">${idx + 1}</span>
                <span>${stop.address}</span>
              </div>
              <span class="route-stop-badge" style="background: ${stop.sectorColor}20; color: ${stop.sectorColor}; border: 1px solid ${stop.sectorColor}40;">
                ${stop.sectorName}
              </span>
            </li>
          `).join('')}
        </ul>
      `;
    }
  }

  // Copy Route Report formatted text
  function copyRouteReport() {
    if (routeStops.length === 0) {
      showToast('No hay paradas para copiar.', 'error');
      return;
    }

    // Group by sector
    const grouped = {};
    SECTORS.forEach(s => { grouped[s.id] = { sector: s, stops: [] }; });
    routeStops.forEach((stop, idx) => {
      if (grouped[stop.sectorId]) {
        grouped[stop.sectorId].stops.push({ ...stop, originalIndex: idx + 1 });
      }
    });

    const sectorsWithStops = Object.values(grouped).filter(g => g.stops.length > 0);

    let report = `🗺️ RESUMEN DE RUTA EN SURQUILLO\n`;
    report += `===================================\n`;
    report += `• Total de paradas: ${routeStops.length}\n`;
    report += `• Sectores recorridos: ${sectorsWithStops.length} de 7\n`;
    report += `• Fecha: ${new Date().toLocaleDateString('es-PE')} ${new Date().toLocaleTimeString('es-PE')}\n\n`;

    report += `📌 DESGLOSE POR SECTOR:\n`;
    report += `-----------------------------------\n`;

    sectorsWithStops.forEach(g => {
      report += `\n[${g.sector.name.toUpperCase()} - ${g.sector.shortName}]\n`;
      g.stops.forEach(s => {
        report += `  Parada #${s.originalIndex}: ${s.address}\n`;
      });
    });

    report += `\n-----------------------------------\n`;
    report += `📍 ITINERARIO COMPLETO (ORDEN CRONOLÓGICO):\n`;
    routeStops.forEach((s, idx) => {
      report += `${idx + 1}. [${s.sectorName}] ${s.address}\n`;
    });

    navigator.clipboard.writeText(report).then(() => {
      showToast('📋 ¡Reporte copiado al portapapeles con éxito!', 'success');
    }).catch(err => {
      console.error('Error copying text:', err);
      showToast('Error al copiar el reporte.', 'error');
    });
  }

  // Download Route CSV
  function downloadRouteCSV() {
    if (routeStops.length === 0) {
      showToast('No hay paradas para descargar.', 'error');
      return;
    }

    let csv = `Numero,Direccion,Sector,Sector_Nombre,Latitud,Longitud\n`;
    routeStops.forEach((s, idx) => {
      const cleanAddress = `"${s.address.replace(/"/g, '""')}"`;
      csv += `${idx + 1},${cleanAddress},"${s.sectorId}","${s.sectorName}",${s.lat},${s.lng}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ruta_surquillo_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('📥 Archivo CSV descargado con éxito.', 'success');
  }

  // Event Listeners for Route Controls
  routeToggleBtn?.addEventListener('click', toggleRecording);
  routeSummaryBtn?.addEventListener('click', openRouteModal);
  routeClearBtn?.addEventListener('click', clearAllStops);
  routeModalClose?.addEventListener('click', closeRouteModal);
  routeModalBackdrop?.addEventListener('click', closeRouteModal);
  routeCopyBtn?.addEventListener('click', copyRouteReport);
  routeDownloadBtn?.addEventListener('click', downloadRouteCSV);

  // Tab switching in modal
  document.querySelectorAll('.route-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.route-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeModalTab = tab.dataset.tab;
      renderModalContent();
    });
  });

  // Load saved route on init
  loadRouteFromLocalStorage();

  // ──────────────────────────────────────────────────────────────────────────
  // 9. SELECT SECTOR
  // ──────────────────────────────────────────────────────────────────────────

  function selectSector(sectorId) {
    const sector = SECTORS.find(s => s.id === sectorId);
    if (!sector) return;

    selectedSectorId = sectorId;

    polygonLayers.forEach((poly, id) => {
      poly.setStyle({
        fillOpacity: id === sectorId ? 0.58 : 0.12,
        weight: id === sectorId ? 4 : 2
      });
    });

    const poly = polygonLayers.get(sectorId);
    if (poly) {
      map.flyToBounds(poly.getBounds(), { padding: [50, 50], duration: 1.2 });
    }

    document.querySelectorAll('.sector-card').forEach(card => {
      card.classList.toggle('active', card.dataset.sector === sectorId);
    });

    showInfoPanel(sector);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 10. INFO PANEL
  // ──────────────────────────────────────────────────────────────────────────

  const infoPanel = document.getElementById('info-panel');
  const infoTitle = document.getElementById('info-title');
  const infoBody = document.getElementById('info-body');
  const infoClose = document.getElementById('info-close');

  function showInfoPanel(sector) {
    if (!infoPanel || !infoBody) return;

    infoTitle.textContent = sector.name;

    infoBody.innerHTML = `
      <div class="info-sector-badge" style="color: ${sector.color}; border-color: ${sector.color}40; background: ${sector.color}15;">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${sector.color};"></span>
        ${sector.shortName}
      </div>
      <p style="margin-bottom: var(--space-md);">${sector.description}</p>

      <div class="info-detail-title">🏛️ Hitos de Referencia</div>
      <ul class="info-detail-list">
        ${sector.landmarks.map(l => `<li>${l}</li>`).join('')}
      </ul>

      <div class="info-detail-title">🛣️ Límites Sectoriales</div>
      <ul class="info-detail-list">
        ${sector.boundaries.map(b => `<li>${b}</li>`).join('')}
      </ul>
    `;

    infoPanel.classList.add('visible');
  }

  function hideInfoPanel() {
    if (infoPanel) infoPanel.classList.remove('visible');
  }

  if (infoClose) {
    infoClose.addEventListener('click', () => {
      hideInfoPanel();
      clearSelection();
    });
  }

  function clearSelection() {
    selectedSectorId = null;
    polygonLayers.forEach(poly => {
      poly.setStyle({ fillOpacity: 0.28, weight: 2.5 });
    });
    document.querySelectorAll('.sector-card').forEach(card => {
      card.classList.remove('active');
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 11. TOAST NOTIFICATIONS
  // ──────────────────────────────────────────────────────────────────────────

  function showToast(message, type = 'info') {
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 12. SEARCH FUNCTIONALITY (INTEGRATED WITH ROUTE RECORDER)
  // ──────────────────────────────────────────────────────────────────────────

  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const clearBtn = document.getElementById('clear-btn');

  async function handleSearch() {
    const query = searchInput?.value?.trim();
    if (!query) {
      showToast('Por favor ingrese una dirección', 'error');
      return;
    }

    searchBtn?.classList.add('loading');

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Surquillo, Lima, Peru')}&limit=1`;

    try {
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (!data || data.length === 0) {
        showToast('No se encontraron resultados para esta dirección', 'error');
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);
      const foundSector = findSectorForPoint(lat, lng);

      if (searchMarker) {
        map.removeLayer(searchMarker);
      }

      searchMarker = L.marker([lat, lng]).addTo(map);

      if (foundSector) {
        searchMarker.bindPopup(
          `<strong>${query}</strong><br>` +
          `<span style="color:${foundSector.color};font-weight:600;">${foundSector.name}</span><br>` +
          `${foundSector.shortName}`
        ).openPopup();

        selectSector(foundSector.id);

        // IF RECORDING, ADD AUTOMATICALLY TO ROUTE!
        if (isRecording) {
          addStopToRoute(query, lat, lng, foundSector);
        } else {
          showToast(`📍 Pertenece al ${foundSector.name}: ${foundSector.shortName}`, 'success');
        }

        const poly = polygonLayers.get(foundSector.id);
        if (poly?._path) {
          poly._path.classList.add('pulse-polygon');
          setTimeout(() => poly._path.classList.remove('pulse-polygon'), 4500);
        }

        const card = document.querySelector(`.sector-card[data-sector="${foundSector.id}"]`);
        if (card) {
          card.classList.add('pulse');
          setTimeout(() => card.classList.remove('pulse'), 4500);
        }
      } else {
        searchMarker.bindPopup(
          `<strong>${query}</strong><br>` +
          `<em>Ubicación fuera de los sectores de Surquillo</em>`
        ).openPopup();

        map.setView([lat, lng], 16);
        showToast('⚠️ La dirección se encuentra fuera de los 7 sectores de Surquillo.', 'error');
      }
    } catch (err) {
      console.error('Error en búsqueda:', err);
      showToast('Error al conectar con el servicio de geocodificación', 'error');
    } finally {
      searchBtn?.classList.remove('loading');
    }
  }

  searchBtn?.addEventListener('click', handleSearch);
  searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });

  clearBtn?.addEventListener('click', () => {
    if (searchMarker) {
      map.removeLayer(searchMarker);
      searchMarker = null;
    }
    if (searchInput) searchInput.value = '';
    hideInfoPanel();
    clearSelection();
    map.flyToBounds(districtOutline.getBounds(), { padding: [30, 30], duration: 1 });
    showToast('Búsqueda limpiada', 'info');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 13. SECTOR CARD INTERACTIONS
  // ──────────────────────────────────────────────────────────────────────────

  document.querySelectorAll('.sector-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.sector;
      if (id) selectSector(id);
    });

    card.addEventListener('mouseenter', () => {
      const id = card.dataset.sector;
      const poly = polygonLayers.get(id);
      if (poly && selectedSectorId !== id) {
        poly.setStyle({ fillOpacity: 0.50, weight: 3.5 });
      }
    });

    card.addEventListener('mouseleave', () => {
      const id = card.dataset.sector;
      const poly = polygonLayers.get(id);
      if (poly && selectedSectorId !== id) {
        poly.setStyle({ fillOpacity: 0.28, weight: 2.5 });
      }
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 14. MOBILE SIDEBAR TOGGLE
  // ──────────────────────────────────────────────────────────────────────────

  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  function toggleMobileSidebar() {
    sidebar?.classList.toggle('mobile-open');
    sidebarOverlay?.classList.toggle('visible');
  }

  sidebarToggle?.addEventListener('click', toggleMobileSidebar);
  sidebarOverlay?.addEventListener('click', toggleMobileSidebar);

  // ──────────────────────────────────────────────────────────────────────────
  // 15. LOADING SCREEN DISMISS
  // ──────────────────────────────────────────────────────────────────────────

  const loadingScreen = document.getElementById('loading-screen');

  map.once('tileload', () => {
    setTimeout(() => {
      loadingScreen?.classList.add('hidden');
    }, 400);
  });

  setTimeout(() => {
    loadingScreen?.classList.add('hidden');
  }, 2500);

  // ──────────────────────────────────────────────────────────────────────────
  // 16. WELCOME TOAST
  // ──────────────────────────────────────────────────────────────────────────

  setTimeout(() => {
    showToast('🗺️ Mapa v3.1 — Grabador de Rutas por Sectores Habilitado 🛣️', 'info');
  }, 1200);

});
