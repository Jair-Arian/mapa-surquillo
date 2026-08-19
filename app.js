/**
 * ============================================================================
 * MAPA SECTORIZADO DE SURQUILLO — Application Logic
 * Sistema de Clasificación Territorial v4.0 (GeoPerú + Subsectores + Rutas)
 * ============================================================================
 *
 * FUENTE DE DATOS:
 *   - dibujo_geoperu_7 rutas.geojson (Sectores principales)
 *   - MAPA_SUBSECTOR1.geojson (4 subsectores del Sector 1)
 *   - MAPA_SUBSECTOR2.geojson (2 subsectores del Sector 6)
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
      description: 'El sector más extenso (1.74 km²). Abarca toda la zona sureste del distrito. Dividido en 4 subsectores: 1-A, 1-B, 1-C y 1-D.',
      landmarks: ['La Calera de la Merced', 'Trabajadores Telefónicos', 'Open Plaza Angamos', 'Urb. CAPEBCO', 'El Pedregal', 'Aprovissp', 'Los Sauces I'],
      boundaries: ['Av. Tomás Marsano (Noroeste)', 'Av. Angamos Este (Norte)', 'Av. Aviación (Noreste)', 'Límite distrital Sur y Este'],
      polygon: [
        [-12.112500, -77.012150],
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
        [-12.112500, -77.012150]
      ]
    },
    {
      id: '2',
      name: 'Sector 2',
      shortName: 'Barrio Médico / Mantilla',
      color: '#F59E0B',
      description: 'Sector centro-sur (535,669 m²). Incluye Barrio Médico, Barrio Obrero, zonas residenciales entre Av. República de Panamá y Av. Tomás Marsano.',
      landmarks: ['Barrio Médico', 'Barrio Obrero', 'Av. Sergio Bernales', 'Calle Juan José Calle', 'Calle Víctor Alzamora', 'San Lorenzo'],
      boundaries: ['Av. Angamos Este (Norte)', 'Av. República de Panamá (Oeste)', 'Av. Tomás Marsano (Este)', 'Av. Roca y Boloña (Sur)'],
      polygon: [
        [-12.119420, -77.018280],
        [-12.120562, -77.018238],
        [-12.120544, -77.017286],
        [-12.119439, -77.017294],
        [-12.119379, -77.013808],
        [-12.118815, -77.013808],
        [-12.118790, -77.013258],
        [-12.117870, -77.013258],
        [-12.117692, -77.013193],
        [-12.115685, -77.010178],
        [-12.112500, -77.012150],
        [-12.112900, -77.018400],
        [-12.119420, -77.018280]
      ]
    },
    {
      id: '3',
      name: 'Sector 3',
      shortName: 'Surquillo Viejo / Tradicional',
      color: '#EF4444',
      description: 'Zona suroeste y casco tradicional (591,644 m²). Alta densidad residencial barrial.',
      landmarks: ['Surquillo Viejo', 'Mercado Central de Surquillo', 'Calle San Diego', 'Calle El Carmen', 'Jirón Gonzales Prada', 'Calle Leoncio Prado', 'Calle San Agustín', 'Jirón Dante', 'Aurora'],
      boundaries: ['Av. Angamos Este (Norte)', 'Av. Paseo de la República - Vía Expresa (Oeste)', 'Av. República de Panamá (Este)', 'Av. Roca y Boloña / Av. Roosevelt (Sur)'],
      polygon: [
        [-12.119420, -77.018280],
        [-12.112900, -77.018400],
        [-12.113400, -77.025900],
        [-12.117284, -77.026188],
        [-12.119175, -77.025843],
        [-12.119139, -77.025227],
        [-12.119296, -77.024882],
        [-12.119850, -77.024118],
        [-12.119420, -77.018280]
      ]
    },
    {
      id: '4',
      name: 'Sector 4',
      shortName: 'General Recavarren / Irribarren',
      color: '#10B981',
      description: 'Sector centro-oeste (556,323 m²). Zona residencial y comercial consolidada.',
      landmarks: ['General I. Recavarren', 'Jirón Salaverry', 'Jirón Manuel Irribarren', 'Jirón Domingo Elías', 'Calle José Manuel Iturregui', 'Avenida Andrés Aramburú'],
      boundaries: ['Av. Andrés Aramburú (Norte)', 'Av. Paseo de la República - Vía Expresa (Oeste)', 'Av. República de Panamá (Este)', 'Av. Angamos Este (Sur)'],
      polygon: [
        [-12.113400, -77.025900],
        [-12.108489, -77.026408],
        [-12.105650, -77.018700],
        [-12.112900, -77.018400],
        [-12.113400, -77.025900]
      ]
    },
    {
      id: '5',
      name: 'Sector 5',
      shortName: 'San Felipe / El Cóndor',
      color: '#8B5CF6',
      description: 'Sector central-norte (308,517 m²). Zona triangular.',
      landmarks: ['Luis Rebaza Córdova', 'El Cóndor', 'Avenida San Felipe', 'Calle San Lorenzo'],
      boundaries: ['Línea diagonal Aramburú-Angamos (Norte)', 'Av. Angamos Este (Sur)', 'Av. República de Panamá (Oeste)', 'Av. Tomás Marsano (Este)'],
      polygon: [
        [-12.112900, -77.018400],
        [-12.112500, -77.012150],
        [-12.104524, -77.018643],
        [-12.105650, -77.018700],
        [-12.112900, -77.018400]
      ]
    },
    {
      id: '6',
      name: 'Sector 6',
      shortName: 'Villa Victoria / Urb. Primavera',
      color: '#EC4899',
      description: 'Sector noreste (343,056 m²). Dividido en 2 subsectores: 6-A y 6-B.',
      landmarks: ['Villa Victoria', 'La Merced', 'Urb. Primavera de Monterrico', 'El Aeropuerto', 'Santo Tomás', 'Calle Avogrado'],
      boundaries: ['Av. Andrés Aramburú / Gálvez Barrenechea (Norte)', 'Av. Tomás Marsano / Diagonal (Suroeste)', 'Av. Angamos Este (Sur)'],
      polygon: [
        [-12.112500, -77.012150],
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
        [-12.101980, -77.018800],
        [-12.104524, -77.018643],
        [-12.112500, -77.012150]
      ]
    },
    {
      id: '7',
      name: 'Sector 7',
      shortName: 'Los Halcones / Los Negocios',
      color: '#06B6D4',
      description: 'Sector noroeste (476,081 m²). Entrada norte del distrito.',
      landmarks: ['Vict. de Emp. de Min. Viv.', 'Calle Las Águilas', 'Calle Los Halcones', 'Calle Los Negocios', 'Malcones'],
      boundaries: ['Av. Andrés Aramburú (Norte / Límite San Isidro)', 'Diagonal hacia Angamos (Sur)', 'Av. Paseo de la República - Vía Expresa (Oeste)', 'Av. República de Panamá (Este)'],
      polygon: [
        [-12.108489, -77.026408],
        [-12.106500, -77.027082],
        [-12.102845, -77.027333],
        [-12.101980, -77.018800],
        [-12.105650, -77.018700],
        [-12.108489, -77.026408]
      ]
    }
  ];

  // ──────────────────────────────────────────────────────────────────────────
  // 1B. SUBSECTORES — Coordenadas GeoPerú (MAPA_SUBSECTOR1 y MAPA_SUBSECTOR2)
  // ──────────────────────────────────────────────────────────────────────────

  const SUBSECTORS = [
    // ═══ SECTOR 1: 4 Subsectores ═══
    {
      id: '1-A',
      parentSectorId: '1',
      name: 'Subsector 1-A',
      shortName: 'La Calera / Doña Tomasita',
      color: '#60A5FA',
      area: '361,752 m²',
      polygon: [
        [-12.112582, -77.011965],
        [-12.112215, -77.007216],
        [-12.113842, -77.007096],
        [-12.115392, -77.006961],
        [-12.116167, -77.006819],
        [-12.116506, -77.006621],
        [-12.116707, -77.006529],
        [-12.117101, -77.006154],
        [-12.117344, -77.005935],
        [-12.117530, -77.005736],
        [-12.117787, -77.005595],
        [-12.117987, -77.005467],
        [-12.118209, -77.005333],
        [-12.120728, -77.003634],
        [-12.122105, -77.005758],
        [-12.112582, -77.011965]
      ]
    },
    {
      id: '1-B',
      parentSectorId: '1',
      name: 'Subsector 1-B',
      shortName: 'Trabajadores Telefónicos / Open Plaza',
      color: '#3B82F6',
      area: '719,892 m²',
      polygon: [
        [-12.112215, -77.007209],
        [-12.111757, -77.000197],
        [-12.115827, -76.999140],
        [-12.118817, -76.998376],
        [-12.120009, -76.998279],
        [-12.120721, -77.003631],
        [-12.117489, -77.005751],
        [-12.116693, -77.006522],
        [-12.116139, -77.006791],
        [-12.115385, -77.006947],
        [-12.112215, -77.007209]
      ]
    },
    {
      id: '1-C',
      parentSectorId: '1',
      name: 'Subsector 1-C',
      shortName: 'Urb. CAPEBCO / Aviación',
      color: '#2563EB',
      area: '355,126 m²',
      polygon: [
        [-12.111763, -77.000168],
        [-12.111217, -76.993693],
        [-12.111773, -76.993400],
        [-12.112043, -76.993807],
        [-12.112552, -76.994099],
        [-12.115494, -76.995595],
        [-12.117656, -76.996847],
        [-12.119882, -76.997596],
        [-12.119987, -76.998264],
        [-12.118807, -76.998366],
        [-12.117858, -76.998612],
        [-12.113689, -76.999677],
        [-12.111763, -77.000168]
      ]
    },
    {
      id: '1-D',
      parentSectorId: '1',
      name: 'Subsector 1-D',
      shortName: 'El Pedregal / Aprovissp',
      color: '#1D4ED8',
      area: '290,437 m²',
      polygon: [
        [-12.122109, -77.005743],
        [-12.126405, -77.002814],
        [-12.125826, -77.002366],
        [-12.125287, -77.002095],
        [-12.124865, -77.001561],
        [-12.124230, -77.000836],
        [-12.122217, -76.999475],
        [-12.121601, -76.998996],
        [-12.121480, -76.998898],
        [-12.121420, -76.998454],
        [-12.120573, -76.998373],
        [-12.119997, -76.998405],
        [-12.120733, -77.003622],
        [-12.122109, -77.005743]
      ]
    },
    // ═══ SECTOR 6: 2 Subsectores ═══
    {
      id: '6-A',
      parentSectorId: '6',
      name: 'Subsector 6-A',
      shortName: 'Villa Victoria / Aramburú',
      color: '#F472B6',
      area: '95,811 m²',
      polygon: [
        [-12.101972, -77.018746],
        [-12.102292, -77.016419],
        [-12.103157, -77.016523],
        [-12.103357, -77.016414],
        [-12.103566, -77.016101],
        [-12.104550, -77.016488],
        [-12.105125, -77.016532],
        [-12.105355, -77.016576],
        [-12.105530, -77.016541],
        [-12.105777, -77.016406],
        [-12.106476, -77.016872],
        [-12.104568, -77.018640],
        [-12.101972, -77.018746]
      ]
    },
    {
      id: '6-B',
      parentSectorId: '6',
      name: 'Subsector 6-B',
      shortName: 'Urb. Primavera / Monterrico',
      color: '#DB2777',
      area: '244,215 m²',
      polygon: [
        [-12.105788, -77.016403],
        [-12.106475, -77.016856],
        [-12.108333, -77.015257],
        [-12.110575, -77.013530],
        [-12.112416, -77.012284],
        [-12.112220, -77.009648],
        [-12.110266, -77.009798],
        [-12.110092, -77.009994],
        [-12.107329, -77.010514],
        [-12.107984, -77.014702],
        [-12.107204, -77.015380],
        [-12.106701, -77.015679],
        [-12.105788, -77.016403]
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

  // ──────────────────────────────────────────────────────────────────────────
  // 3. INITIALIZE MAP WITH GOOGLE MAPS TILES & LAYER CONTROL
  // ──────────────────────────────────────────────────────────────────────────

  // Google Maps Roadmap Layer (Calles oficiales actualizadas)
  const googleStreets = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Maps'
  });

  // Google Maps Satelital / Híbrido
  const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Maps'
  });

  // Esri World Street Map (Alta Precisión)
  const esriStreets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri'
  });

  // OpenStreetMap (Clásico)
  const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  });

  const map = L.map('map', {
    zoomControl: false,
    layers: [googleStreets]
  }).setView([-12.1120, -77.0140], 15);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Control de Capas (Permite cambiar entre Google Maps, Satelital, Esri y OSM)
  const baseMaps = {
    "🗺️ Google Maps (Calles Actualizadas)": googleStreets,
    "🛰️ Google Maps (Satelital / Híbrido)": googleHybrid,
    "🏙️ Esri Street Map (Alta Precisión)": esriStreets,
    "🌐 OpenStreetMap": osmLayer
  };

  L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

  // ──────────────────────────────────────────────────────────────────────────
  // 4. DRAW OFFICIAL DISTRICT BOUNDARY
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
  /** @type {Map<string, L.Polygon>} */
  const subsectorPolygonLayers = new Map();
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

    // Sectors are visual-only — no click/hover interactions

    // Add subtle background watermark label for each sector ("Sector 1", "Sector 2", etc.)
    const center = polygon.getBounds().getCenter();
    const bgLabelIcon = L.divIcon({
      className: 'sector-bg-label-wrapper',
      html: `<div class="sector-bg-label" style="--sector-label-color: ${sector.color};">${sector.name}</div>`,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });

    L.marker(center, {
      icon: bgLabelIcon,
      interactive: false,
      zIndexOffset: -50
    }).addTo(map);

    polygonLayers.set(sector.id, polygon);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 5B. DRAW SUBSECTOR POLYGONS (inner lines within Sector 1 & 6)
  // ──────────────────────────────────────────────────────────────────────────

  SUBSECTORS.forEach(sub => {
    const polygon = L.polygon(sub.polygon, {
      color: sub.color,
      fillColor: sub.color,
      fillOpacity: 0.15,
      weight: 1.5,
      dashArray: '4, 4'
    }).addTo(map);

    polygon.bindTooltip(`<strong>${sub.name}</strong><br>${sub.shortName}<br><em>${sub.area}</em>`, {
      sticky: true,
      className: 'sector-tooltip'
    });

    // Subsectors are visual-only — no click/hover interactions

    subsectorPolygonLayers.set(sub.id, polygon);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 5C. GOOGLE MAPS PLATFORM GEODATA & PERUVIAN ADDRESS FORMATTING
  // ──────────────────────────────────────────────────────────────────────────

  let googleGeocoder = null;
  let googleAutocompleteService = null;

  function initGoogleMapsServices() {
    if (window.google && window.google.maps) {
      if (google.maps.Geocoder && !googleGeocoder) {
        googleGeocoder = new google.maps.Geocoder();
      }
      if (google.maps.places && google.maps.places.AutocompleteService && !googleAutocompleteService) {
        googleAutocompleteService = new google.maps.places.AutocompleteService();
      }
    }
  }

  // Initialize immediately or on load
  initGoogleMapsServices();
  window.addEventListener('load', initGoogleMapsServices);

  /**
   * Cleans an official Google Maps formatted_address string
   * e.g. "Av. Tomás Marsano 777, Surquillo 15036, Perú" -> "Av. Tomás Marsano 777"
   */
  function cleanGoogleAddress(raw) {
    if (!raw) return '';
    const parts = raw.split(',');
    if (parts.length >= 1) {
      return cleanSpanishStreetName(parts[0].trim());
    }
    return cleanSpanishStreetName(raw.replace(/,?\s*Per[úu]/i, '').trim());
  }

  /**
   * Translates and normalizes English street terms from OpenStreetMap into Spanish.
   * e.g. "Tomás Marsano Avenue" -> "Avenida Tomás Marsano"
   * e.g. "Dante Street" -> "Calle Dante"
   */
  function cleanSpanishStreetName(str) {
    if (!str) return '';
    let s = str.trim();
    s = s.replace(/^(.*)\s+Avenue(?:\s+(\d+.*))?$/i, (match, p1, p2) => 'Avenida ' + p1 + (p2 ? ' ' + p2 : ''));
    s = s.replace(/^Avenue\s+(.*)$/i, 'Avenida $1');
    s = s.replace(/^(.*)\s+Street(?:\s+(\d+.*))?$/i, (match, p1, p2) => 'Calle ' + p1 + (p2 ? ' ' + p2 : ''));
    s = s.replace(/^Street\s+(.*)$/i, 'Calle $1');
    s = s.replace(/^(.*)\s+Road(?:\s+(\d+.*))?$/i, (match, p1, p2) => 'Avenida ' + p1 + (p2 ? ' ' + p2 : ''));
    s = s.replace(/^Av\.?\s+/i, 'Avenida ');
    return s.trim();
  }

  /**
   * Reformats a Nominatim display_name from Anglo format to Peruvian format.
   * "769, Avenida Tomás Marsano, ..." → "Avenida Tomás Marsano 769"
   * If the address doesn't start with a number, it's returned as-is (trimmed).
   * @param {string} displayName - Nominatim display_name string
   * @returns {string} Formatted address
   */
  function formatAddressPeruvian(displayName) {
    if (!displayName) return '';
    const parts = displayName.split(',');
    const first = parts[0]?.trim();
    const second = parts[1]?.trim();

    // If the first part is a house number (pure digits or digits with letter like "769" or "769A")
    if (first && second && /^\d+[A-Za-z]?$/.test(first)) {
      return cleanSpanishStreetName(`${second} ${first}`);
    }

    // Otherwise return first two parts normally
    return cleanSpanishStreetName((first + (second ? ', ' + second : '')).trim());
  }

  /**
   * Reverse Geocode a lat/lng point with Google Maps Geocoder as primary (exact house numbers),
   * and Photon as secondary fallback.
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {object} sector - Matched Sector object
   * @returns {Promise<string>} Formatted Spanish address with exact house number
   */
  async function reverseGeocodePoint(lat, lng, sector) {
    initGoogleMapsServices();

    // 1. PRIMARY: Official Google Maps Geocoder (Exact Door Numbers & Addresses)
    if (googleGeocoder) {
      try {
        const googleResult = await new Promise((resolve) => {
          googleGeocoder.geocode(
            { location: { lat, lng }, language: 'es', region: 'pe' },
            (results, status) => {
              if (status === 'OK' && results && results.length > 0) {
                // Find street_address or premise or route
                const best = results.find(r => r.types.includes('street_address') || r.types.includes('premise')) || results[0];
                resolve(cleanGoogleAddress(best.formatted_address));
              } else {
                resolve(null);
              }
            }
          );
        });
        if (googleResult) return googleResult;
      } catch (e) {
        console.warn('Google reverse geocode error:', e);
      }
    }

    // 2. Secondary Strategy: Photon (Komoot OSM - Fast fallback)
    try {
      const photonUrl = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lng}`;
      const res = await fetch(photonUrl);
      if (res.ok) {
        const json = await res.json();
        const p = json?.features?.[0]?.properties;
        if (p) {
          const street = cleanSpanishStreetName(p.street || p.name || '');
          const num = p.housenumber || '';
          const loc = p.locality || '';
          if (street && num) {
            return `${street} ${num}`;
          }
          if (street) {
            return loc && loc !== street && loc !== 'Surquillo' ? `${street} (${loc})` : street;
          }
          if (p.name) return cleanSpanishStreetName(p.name);
        }
      }
    } catch (e) {
      console.warn('Photon reverse geocode error:', e);
    }

    // 3. Tertiary Strategy: Nominatim OSM
    try {
      const nomUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const res = await fetch(nomUrl);
      if (res.ok) {
        const data = await res.json();
        if (data?.address) {
          const road = data.address.road || data.address.pedestrian || data.address.footway || data.address.street || '';
          const num = data.address.house_number || '';
          if (road && num) return cleanSpanishStreetName(`${road} ${num}`);
          if (road) return cleanSpanishStreetName(road);
        }
        if (data?.display_name) {
          return formatAddressPeruvian(data.display_name);
        }
      }
    } catch (e) {
      console.warn('Nominatim reverse geocode error:', e);
    }

    // 4. Fallback: Sector name
    return sector ? `Punto en ${sector.name}` : `Ubicación (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  }

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

  /**
   * Find subsector for a given point. Only checks subsectors of sectors 1 and 6.
   * @returns {object|null} The subsector object or null
   */
  function findSubsectorForPoint(lat, lng) {
    return SUBSECTORS.find(s => isPointInPolygon([lat, lng], s.polygon)) || null;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7. ROUTE RECORDER STATE & LOGIC
  // ──────────────────────────────────────────────────────────────────────────

  let isRecording = false;
  let routeStops = [];
  let routeMarkerLayers = [];
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
  const routeShareBtn = document.getElementById('route-share-btn');
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

      showToast('🔴 Grabador de ruta ACTIVADO. Busca direcciones o haz clic en el mapa.', 'info');
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

  // Add a stop to the active route (now includes subsector detection)
  function addStopToRoute(addressName, lat, lng, sector) {
    const subsector = findSubsectorForPoint(lat, lng);

    const newStop = {
      id: 'stop_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
      address: addressName,
      lat,
      lng,
      sectorId: sector.id,
      sectorName: sector.name,
      sectorShortName: sector.shortName,
      sectorColor: sector.color,
      subsectorId: subsector ? subsector.id : '',
      subsectorName: subsector ? subsector.name : '',
      subsectorShortName: subsector ? subsector.shortName : '',
      subsectorColor: subsector ? subsector.color : '',
      timestamp: Date.now()
    };

    routeStops.push(newStop);
    saveRouteToLocalStorage();
    renderRouteOnMap();
    renderRouteStopsUI();

    const subLabel = subsector ? ` (${subsector.name})` : '';
    showToast(`📍 Parada #${routeStops.length} agregada en ${sector.name}${subLabel}`, 'success');
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

  // Render Map Elements (Markers only, no connecting line)
  function renderRouteOnMap() {
    routeMarkerLayers.forEach(m => map.removeLayer(m));
    routeMarkerLayers = [];

    if (routePolylineLayer) {
      map.removeLayer(routePolylineLayer);
      routePolylineLayer = null;
    }

    if (routeStops.length === 0) return;

    routeStops.forEach((stop, idx) => {
      const markerColor = stop.subsectorColor || stop.sectorColor;
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="route-marker-icon" style="background-color: ${markerColor};">${idx + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const subInfo = stop.subsectorName ? `<br><span style="font-size:0.75rem; color:${stop.subsectorColor};">${stop.subsectorName}: ${stop.subsectorShortName}</span>` : '';
      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);
      marker.bindPopup(`
        <strong>Parada #${idx + 1}</strong><br>
        ${stop.address}<br>
        <span style="color: ${stop.sectorColor}; font-weight: 600;">${stop.sectorName}</span>${subInfo}
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

    routeStopsList.innerHTML = routeStops.map((stop, idx) => {
      const badgeLabel = stop.subsectorId ? stop.subsectorId : `S${stop.sectorId}`;
      const badgeColor = stop.subsectorColor || stop.sectorColor;
      return `
        <li class="route-stop-item">
          <div class="route-stop-info">
            <span class="route-stop-index">${idx + 1}</span>
            <span class="route-stop-address" title="${stop.address}">${stop.address}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span class="route-stop-badge" style="background: ${badgeColor}20; color: ${badgeColor}; border: 1px solid ${badgeColor}40;">
              ${badgeLabel}
            </span>
            <button class="route-stop-delete" data-index="${idx}" title="Eliminar parada">✕</button>
          </div>
        </li>
      `;
    }).join('');

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
    // On mobile, if the bottom sheet panel is open, tapping the map closes it and does NOT add a stop
    if (closeMobileSidebarIfOpen()) {
      return;
    }

    if (!isRecording) return;

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    const sector = findSectorForPoint(lat, lng);

    if (!sector) {
      showToast('⚠️ La ubicación presionada está fuera de Surquillo.', 'error');
      return;
    }

    const addressName = await reverseGeocodePoint(lat, lng, sector);
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
          Total: <strong style="color:var(--text-primary);">${routeStops.length} paradas</strong> | 
          Sectores: <strong style="color:var(--text-primary);">${sectorsWithStops.length} de 7</strong>
        </div>

        ${sectorsWithStops.map(g => `
          <div class="modal-sector-group">
            <div class="modal-sector-header" style="background: ${g.sector.color}18; color: ${g.sector.color}; border: 1px solid ${g.sector.color}35;">
              <span>${g.sector.name}: ${g.sector.shortName}</span>
              <span style="background:${g.sector.color}; color:#fff; padding:1px 8px; border-radius:10px; font-size:0.75rem;">
                ${g.stops.length}
              </span>
            </div>
            <ul class="modal-stop-list">
              ${g.stops.map(s => {
                const subTag = s.subsectorName ? `<span style="font-size:0.625rem; padding:1px 6px; border-radius:10px; background:${s.subsectorColor}20; color:${s.subsectorColor}; border:1px solid ${s.subsectorColor}40; margin-left:6px;">${s.subsectorId}</span>` : '';
                return `
                  <li class="modal-stop-item">
                    <span class="route-stop-index" style="background:${s.subsectorColor || g.sector.color}; color:#fff;">${s.originalIndex}</span>
                    <span style="flex:1;">${s.address}</span>
                    ${subTag}
                  </li>
                `;
              }).join('')}
            </ul>
          </div>
        `).join('')}
      `;
    } else {
      // Sequential Itinerary
      routeModalBody.innerHTML = `
        <div style="margin-bottom: var(--space-md); font-size: 0.8125rem; color: var(--text-secondary);">
          Itinerario secuencial (${routeStops.length} paradas):
        </div>
        <ul class="modal-stop-list" style="padding-left:0;">
          ${routeStops.map((stop, idx) => {
            const subTag = stop.subsectorName ? ` (${stop.subsectorId})` : '';
            return `
              <li class="modal-stop-item" style="justify-content: space-between;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="route-stop-index" style="background:${stop.subsectorColor || stop.sectorColor}; color:#fff;">${idx + 1}</span>
                  <span>${stop.address}</span>
                </div>
                <span class="route-stop-badge" style="background: ${stop.sectorColor}20; color: ${stop.sectorColor}; border: 1px solid ${stop.sectorColor}40;">
                  ${stop.sectorName}${subTag}
                </span>
              </li>
            `;
          }).join('')}
        </ul>
      `;
    }
  }

  // Copy Route Report formatted text (includes subsector info)
  function copyRouteReport() {
    if (routeStops.length === 0) {
      showToast('No hay paradas para copiar.', 'error');
      return;
    }

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
        const subLabel = s.subsectorName ? ` → ${s.subsectorName}` : '';
        report += `  Parada #${s.originalIndex}: ${s.address}${subLabel}\n`;
      });
    });

    report += `\n-----------------------------------\n`;
    report += `📍 ITINERARIO COMPLETO:\n`;
    routeStops.forEach((s, idx) => {
      const subLabel = s.subsectorId ? ` (${s.subsectorId})` : '';
      report += `${idx + 1}. [${s.sectorName}${subLabel}] ${s.address}\n`;
    });

    navigator.clipboard.writeText(report).then(() => {
      showToast('📋 ¡Reporte copiado al portapapeles!', 'success');
    }).catch(err => {
      console.error('Error copying text:', err);
      showToast('Error al copiar el reporte.', 'error');
    });
  }

  // Download Route CSV (Sector and Subsector in SEPARATE columns, Excel compatible)
  function downloadRouteCSV() {
    if (routeStops.length === 0) {
      showToast('No hay paradas para descargar.', 'error');
      return;
    }

    // Usar BOM de UTF-8 (\uFEFF) y punto y coma (;) como delimitador para compatibilidad total con Excel en español
    const sep = ';';
    let csv = '\uFEFF';
    
    // Encabezados de columna claros y separados
    csv += ['N° Parada', 'Direccion', 'Sector', 'Nombre Sector', 'Subsector', 'Nombre Subsector', 'Latitud', 'Longitud'].join(sep) + '\n';

    routeStops.forEach((s, idx) => {
      const addressClean = `"${(s.address || '').replace(/"/g, '""')}"`;
      const sectorId = `"${s.sectorName || 'Sector ' + s.sectorId}"`;
      const sectorName = `"${(s.sectorShortName || '')}"`;
      const subsectorId = s.subsectorId ? `"${s.subsectorId}"` : '"Sin Subsector"';
      const subsectorName = s.subsectorName ? `"${s.subsectorName} - ${s.subsectorShortName}"` : '"N/A"';
      
      const row = [
        idx + 1,
        addressClean,
        sectorId,
        sectorName,
        subsectorId,
        subsectorName,
        s.lat,
        s.lng
      ];

      csv += row.join(sep) + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ruta_surquillo_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('📥 Archivo CSV descargado con éxito (Columnas separadas para Excel).', 'success');
  }

  // ──────────────────────────────────────────────────────────────────────────
  // SHARE ROUTE LOGIC (URL PARAM + WHATSAPP / NATIVE SHARE)
  // ──────────────────────────────────────────────────────────────────────────

  function generateRouteShareURL() {
    if (routeStops.length === 0) return null;
    const minimalData = routeStops.map(s => ({
      a: s.address,
      t: s.lat,
      g: s.lng,
      s: s.sectorId,
      sub: s.subsectorId || ''
    }));
    const jsonStr = JSON.stringify(minimalData);
    const encoded = encodeURIComponent(btoa(encodeURIComponent(jsonStr)));
    const baseURL = window.location.origin + window.location.pathname;
    return `${baseURL}?ruta=${encoded}`;
  }

  async function shareRoute() {
    if (routeStops.length === 0) {
      showToast('No hay paradas para compartir.', 'error');
      return;
    }

    const shareURL = generateRouteShareURL();
    if (!shareURL) return;

    const shareText = `🗺️ Ruta en Surquillo (${routeStops.length} paradas). Abre el enlace para verla en el mapa:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ruta en Surquillo',
          text: shareText,
          url: shareURL
        });
        showToast('📲 ¡Ruta compartida con éxito!', 'success');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Navigator share error:', err);
        } else {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareURL}`);
      showToast('🔗 ¡Enlace de ruta copiado al portapapeles!', 'success');
    } catch (err) {
      showToast('Error al copiar el enlace.', 'error');
    }
  }

  function checkAndLoadSharedRoute() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('ruta');
    if (!sharedData) return;

    try {
      const jsonStr = decodeURIComponent(atob(decodeURIComponent(sharedData)));
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        routeStops = parsed.map((item, idx) => {
          const sector = SECTORS.find(sec => sec.id === item.s);
          const subsector = item.sub ? SUBSECTORS.find(sub => sub.id === item.sub) : null;
          return {
            id: 'stop_shared_' + idx + '_' + Date.now(),
            address: item.a || `Parada ${idx + 1}`,
            lat: parseFloat(item.t),
            lng: parseFloat(item.g),
            sectorId: item.s,
            sectorName: sector ? sector.name : `Sector ${item.s}`,
            sectorShortName: sector ? sector.shortName : '',
            sectorColor: sector ? sector.color : '#3B82F6',
            subsectorId: item.sub || null,
            subsectorName: subsector ? subsector.name : (item.sub || null),
            subsectorShortName: subsector ? subsector.shortName : '',
            subsectorColor: subsector ? subsector.color : null
          };
        });

        saveRouteToLocalStorage();
        renderRouteOnMap();
        renderRouteStopsUI();

        if (routeStops.length > 0) {
          const bounds = L.latLngBounds(routeStops.map(s => [s.lat, s.lng]));
          map.fitBounds(bounds, { padding: [60, 60] });
        }

        showToast(`🗺️ ¡Ruta compartida cargada! (${routeStops.length} paradas)`, 'success');

        const cleanURL = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanURL);
      }
    } catch (err) {
      console.error('Error al decodificar la ruta compartida:', err);
    }
  }

  // Event Listeners for Route Controls
  routeToggleBtn?.addEventListener('click', toggleRecording);
  routeSummaryBtn?.addEventListener('click', openRouteModal);
  routeClearBtn?.addEventListener('click', clearAllStops);
  routeModalClose?.addEventListener('click', closeRouteModal);
  routeModalBackdrop?.addEventListener('click', closeRouteModal);
  routeShareBtn?.addEventListener('click', shareRoute);
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

    // Highlight subsectors of this sector
    subsectorPolygonLayers.forEach((poly, subId) => {
      const sub = SUBSECTORS.find(s => s.id === subId);
      if (sub && sub.parentSectorId === sectorId) {
        poly.setStyle({ fillOpacity: 0.35, weight: 2.5, dashArray: '4, 4' });
      } else {
        poly.setStyle({ fillOpacity: 0.08, weight: 1, dashArray: '4, 4' });
      }
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

    // Check if this sector has subsectors
    const sectorSubsectors = SUBSECTORS.filter(s => s.parentSectorId === sector.id);
    let subsectorHTML = '';
    if (sectorSubsectors.length > 0) {
      subsectorHTML = `
        <div class="info-detail-title">📐 Subsectores</div>
        <ul class="info-detail-list">
          ${sectorSubsectors.map(s => `<li><span style="color:${s.color};font-weight:600;">${s.name}</span>: ${s.shortName} (${s.area})</li>`).join('')}
        </ul>
      `;
    }

    infoBody.innerHTML = `
      <div class="info-sector-badge" style="color: ${sector.color}; border-color: ${sector.color}40; background: ${sector.color}15;">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${sector.color};"></span>
        ${sector.shortName}
      </div>
      <p style="margin-bottom: var(--space-md);">${sector.description}</p>

      ${subsectorHTML}

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
    subsectorPolygonLayers.forEach(poly => {
      poly.setStyle({ fillOpacity: 0.15, weight: 1.5 });
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
  // 12. SEARCH FUNCTIONALITY (INTEGRATED WITH ROUTE RECORDER + SUBSECTORS)
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
    hideSuggestions();

    let lat = null;
    let lng = null;
    let foundAddress = query;

    try {
      // 1. PRIMARY STRATEGY: Official Google Maps Geocoder
      initGoogleMapsServices();
      if (googleGeocoder) {
        try {
          const googleResult = await new Promise((resolve) => {
            googleGeocoder.geocode(
              {
                address: query + ', Surquillo, Lima, Peru',
                language: 'es',
                region: 'pe'
              },
              (results, status) => {
                if (status === 'OK' && results && results.length > 0) {
                  const best = results[0];
                  resolve({
                    lat: best.geometry.location.lat(),
                    lng: best.geometry.location.lng(),
                    address: cleanGoogleAddress(best.formatted_address)
                  });
                } else {
                  resolve(null);
                }
              }
            );
          });

          if (googleResult) {
            lat = googleResult.lat;
            lng = googleResult.lng;
            foundAddress = googleResult.address;
          }
        } catch (e) {
          console.warn('Google search error:', e);
        }
      }

      // 2. Secondary Strategy: Photon (Fast & reliable fallback)
      if (lat === null) {
        try {
          const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query + ' Surquillo Lima')}&lat=-12.1128&lon=-77.0228&limit=1`;
          const res = await fetch(photonUrl);
          if (res.ok) {
            const json = await res.json();
            if (json?.features && json.features.length > 0) {
              const f = json.features[0];
              lng = f.geometry.coordinates[0];
              lat = f.geometry.coordinates[1];
              const p = f.properties;
              const street = cleanSpanishStreetName(p.street || p.name || '');
              const num = p.housenumber || '';
              if (street && num) foundAddress = `${street} ${num}`;
              else if (street) foundAddress = street;
            }
          }
        } catch (e) {
          console.warn('Photon search error:', e);
        }
      }

      // 3. Tertiary Strategy: Nominatim fallback
      if (lat === null) {
        try {
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Surquillo, Lima, Peru')}&limit=1`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              lat = parseFloat(data[0].lat);
              lng = parseFloat(data[0].lon);
              foundAddress = formatAddressPeruvian(data[0].display_name);
            }
          }
        } catch (err) {
          console.error('Nominatim search error:', err);
        }
      }

      if (lat === null || lng === null) {
        showToast('No se encontraron resultados para esta dirección', 'error');
        return;
      }

      const foundSector = findSectorForPoint(lat, lng);
      const foundSubsector = findSubsectorForPoint(lat, lng);

      if (searchMarker) {
        map.removeLayer(searchMarker);
      }

      searchMarker = L.marker([lat, lng]).addTo(map);

      if (foundSector) {
        const subInfo = foundSubsector
          ? `<br><span style="color:${foundSubsector.color};font-size:0.85em;">${foundSubsector.name}: ${foundSubsector.shortName}</span>`
          : '';

        searchMarker.bindPopup(
          `<strong>${foundAddress}</strong><br>` +
          `<span style="color:${foundSector.color};font-weight:600;">${foundSector.name}</span>` +
          subInfo
        ).openPopup();

        map.setView([lat, lng], 17, { animate: true });

        // IF RECORDING, ADD AUTOMATICALLY TO ROUTE!
        if (isRecording) {
          addStopToRoute(foundAddress, lat, lng, foundSector);
        } else {
          const subLabel = foundSubsector ? ` → ${foundSubsector.name}` : '';
          showToast(`📍 ${foundSector.name}${subLabel}: ${foundSector.shortName}`, 'success');
        }
      } else {
        searchMarker.bindPopup(
          `<strong>${foundAddress}</strong><br>` +
          `<em>Ubicación fuera de los sectores de Surquillo</em>`
        ).openPopup();

        map.setView([lat, lng], 16);
        showToast('⚠️ Dirección fuera de los 7 sectores de Surquillo.', 'error');
      }
    } catch (err) {
      console.error('Error en búsqueda:', err);
      showToast('Error al buscar la dirección', 'error');
    } finally {
      searchBtn?.classList.remove('loading');
    }
  }

  searchBtn?.addEventListener('click', handleSearch);

  // ──────────────────────────────────────────────────────────────────────────
  // 12A. AUTOCOMPLETE SUGGESTIONS DROPDOWN (GOOGLE PLACES + PHOTON)
  // ──────────────────────────────────────────────────────────────────────────

  const suggestionsEl = document.getElementById('search-suggestions');
  let suggestionTimer = null;
  let activeSuggestionIndex = -1;
  let currentSuggestions = [];

  /** Debounce helper */
  function debounce(fn, delay) {
    return (...args) => {
      clearTimeout(suggestionTimer);
      suggestionTimer = setTimeout(() => fn(...args), delay);
    };
  }

  /** Fetch suggestions using Google Places Autocomplete with Photon fallback */
  async function fetchSuggestions(query) {
    if (!query || query.length < 2) {
      hideSuggestions();
      return;
    }

    currentSuggestions = [];
    initGoogleMapsServices();

    // 1. PRIMARY: Official Google Places Autocomplete
    if (googleAutocompleteService && googleGeocoder) {
      try {
        const predictions = await new Promise((resolve) => {
          googleAutocompleteService.getPlacePredictions(
            {
              input: query + ', Surquillo',
              componentRestrictions: { country: 'pe' },
              locationRestriction: {
                north: -12.0900,
                south: -12.1350,
                east: -76.9850,
                west: -77.0350
              },
              language: 'es'
            },
            (preds, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && preds) {
                resolve(preds);
              } else {
                resolve([]);
              }
            }
          );
        });

        if (predictions && predictions.length > 0) {
          const geocodePromises = predictions.slice(0, 5).map(p => {
            return new Promise((resolve) => {
              googleGeocoder.geocode({ placeId: p.place_id }, (results, status) => {
                if (status === 'OK' && results && results.length > 0) {
                  const lat = results[0].geometry.location.lat();
                  const lng = results[0].geometry.location.lng();
                  const address = cleanGoogleAddress(results[0].formatted_address) || p.structured_formatting.main_text;
                  const sector = findSectorForPoint(lat, lng);
                  resolve({ lat, lng, address, sector });
                } else {
                  resolve(null);
                }
              });
            });
          });

          const resolved = (await Promise.all(geocodePromises)).filter(Boolean);
          if (resolved.length > 0) {
            currentSuggestions = resolved;
            renderSuggestions();
            return;
          }
        }
      } catch (e) {
        console.warn('Google autocomplete suggestions error:', e);
      }
    }

    // 2. Secondary Fallback: Photon (fast & free)
    try {
      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query + ' Surquillo')}&lat=-12.1128&lon=-77.0228&limit=5`;
      const res = await fetch(photonUrl);
      if (res.ok) {
        const data = await res.json();
        if (data?.features && data.features.length > 0) {
          currentSuggestions = data.features.map(f => {
            const lng = f.geometry.coordinates[0];
            const lat = f.geometry.coordinates[1];
            const p = f.properties;
            const street = cleanSpanishStreetName(p.street || p.name || '');
            const num = p.housenumber || '';
            const loc = p.locality || '';
            let address = street && num ? `${street} ${num}` : (street || cleanSpanishStreetName(p.name) || loc);
            if (loc && loc !== street && loc !== 'Surquillo' && !address.includes(loc)) {
              address += ` (${loc})`;
            }
            const sector = findSectorForPoint(lat, lng);
            return { lat, lng, address, sector };
          });
          if (currentSuggestions.length > 0) {
            renderSuggestions();
            return;
          }
        }
      }
    } catch (e) {
      console.warn('Photon suggestions failed:', e);
    }

    // 3. Tertiary Fallback: Nominatim
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Surquillo, Lima, Peru')}&limit=5&addressdetails=1`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          currentSuggestions = data.map(item => {
            const lat = parseFloat(item.lat);
            const lng = parseFloat(item.lon);
            const address = formatAddressPeruvian(item.display_name);
            const sector = findSectorForPoint(lat, lng);
            return { lat, lng, address, sector };
          });
          renderSuggestions();
          return;
        }
      }
    } catch (err) {
      console.log('Suggestions fetch error:', err);
    }

    hideSuggestions();
  }

  /** Render the suggestions list */
  function renderSuggestions() {
    if (!suggestionsEl || currentSuggestions.length === 0) {
      hideSuggestions();
      return;
    }

    activeSuggestionIndex = -1;
    suggestionsEl.innerHTML = currentSuggestions.map((s, i) => {
      const sectorBadge = s.sector
        ? `<span class="suggestion-sector" style="background:${s.sector.color}20;color:${s.sector.color};border:1px solid ${s.sector.color}40;">${s.sector.name}</span>`
        : `<span class="suggestion-sector">Fuera de Surquillo</span>`;

      return `<li role="option" data-index="${i}">
        <span class="suggestion-icon">📍</span>
        <span class="suggestion-address">${s.address}</span>
        ${sectorBadge}
      </li>`;
    }).join('');

    suggestionsEl.classList.add('visible');

    // Add click listeners to each suggestion
    suggestionsEl.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        const idx = parseInt(li.dataset.index, 10);
        selectSuggestion(idx);
      });
    });
  }

  /** Hide the suggestions dropdown */
  function hideSuggestions() {
    if (suggestionsEl) {
      suggestionsEl.classList.remove('visible');
      suggestionsEl.innerHTML = '';
    }
    currentSuggestions = [];
    activeSuggestionIndex = -1;
  }

  /** Select a suggestion by index */
  function selectSuggestion(index) {
    const s = currentSuggestions[index];
    if (!s) return;

    // Fill input with the formatted address
    if (searchInput) searchInput.value = s.address;
    hideSuggestions();

    // Place marker and fly to location
    if (searchMarker) map.removeLayer(searchMarker);

    searchMarker = L.marker([s.lat, s.lng]).addTo(map);

    if (s.sector) {
      const foundSubsector = findSubsectorForPoint(s.lat, s.lng);
      const subInfo = foundSubsector
        ? `<br><span style="color:${foundSubsector.color};font-size:0.85em;">${foundSubsector.name}: ${foundSubsector.shortName}</span>`
        : '';

      searchMarker.bindPopup(
        `<strong>${s.address}</strong><br>` +
        `<span style="color:${s.sector.color};font-weight:600;">${s.sector.name}</span>` +
        subInfo
      ).openPopup();

      map.setView([s.lat, s.lng], 17, { animate: true });

      if (isRecording) {
        addStopToRoute(s.address, s.lat, s.lng, s.sector);
      } else {
        const subLabel = foundSubsector ? ` → ${foundSubsector.name}` : '';
        showToast(`📍 ${s.sector.name}${subLabel}: ${s.sector.shortName}`, 'success');
      }
    } else {
      searchMarker.bindPopup(
        `<strong>${s.address}</strong><br>` +
        `<em>Ubicación fuera de los sectores de Surquillo</em>`
      ).openPopup();

      map.setView([s.lat, s.lng], 16);
      showToast('⚠️ Dirección fuera de los 7 sectores de Surquillo.', 'error');
    }
  }

  // Debounced input handler for suggestions
  const debouncedFetch = debounce(fetchSuggestions, 350);

  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim();
    debouncedFetch(query);
  });

  // Keyboard navigation for suggestions + Enter to search
  searchInput?.addEventListener('keydown', e => {
    const items = suggestionsEl?.querySelectorAll('li');
    const isOpen = suggestionsEl?.classList.contains('visible') && items?.length > 0;

    if (isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeSuggestionIndex = Math.min(activeSuggestionIndex + 1, items.length - 1);
        items.forEach((li, i) => li.classList.toggle('active', i === activeSuggestionIndex));
        items[activeSuggestionIndex]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeSuggestionIndex = Math.max(activeSuggestionIndex - 1, 0);
        items.forEach((li, i) => li.classList.toggle('active', i === activeSuggestionIndex));
        items[activeSuggestionIndex]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          selectSuggestion(activeSuggestionIndex);
        } else {
          hideSuggestions();
          handleSearch();
        }
      } else if (e.key === 'Escape') {
        hideSuggestions();
      }
    } else if (e.key === 'Enter') {
      handleSearch();
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-section')) {
      hideSuggestions();
    }
  });

  clearBtn?.addEventListener('click', () => {
    if (searchMarker) {
      map.removeLayer(searchMarker);
      searchMarker = null;
    }
    if (searchInput) searchInput.value = '';
    hideSuggestions();
    map.flyToBounds(districtOutline.getBounds(), { padding: [30, 30], duration: 1 });
    showToast('Búsqueda limpiada', 'info');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 12B. BÚSQUEDA POR VOZ (MICROFONO)
  // ──────────────────────────────────────────────────────────────────────────

  const micBtn = document.getElementById('mic-btn');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-PE';
    recognition.continuous = false;
    recognition.interimResults = false;

    let isListening = false;

    micBtn?.addEventListener('click', () => {
      if (isListening) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (e) {
          console.warn('Speech recognition error:', e);
        }
      }
    });

    recognition.onstart = () => {
      isListening = true;
      micBtn?.classList.add('listening');
      if (micBtn) micBtn.title = 'Escuchando... haz clic para detener';
      showToast('🎙️ Escuchando... Di tu dirección en Surquillo', 'info');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (searchInput) {
        searchInput.value = transcript;
      }
      showToast(`🎙️ Reconocido: "${transcript}"`, 'success');
      setTimeout(() => {
        handleSearch();
      }, 400);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      isListening = false;
      micBtn?.classList.remove('listening');
      if (event.error === 'not-allowed') {
        showToast('⚠️ Permiso de micrófono denegado en el navegador.', 'error');
      } else if (event.error === 'no-speech') {
        showToast('⚠️ No se detectó voz. Inténtalo de nuevo.', 'info');
      } else {
        showToast('⚠️ No se pudo procesar la voz.', 'error');
      }
    };

    recognition.onend = () => {
      isListening = false;
      micBtn?.classList.remove('listening');
      if (micBtn) micBtn.title = 'Dictar dirección por voz';
    };
  } else {
    micBtn?.addEventListener('click', () => {
      showToast('⚠️ Tu navegador no soporta el dictado por voz.', 'error');
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 13. SECTOR CARDS — NON-INTERACTIVE (visual reference only)
  // ──────────────────────────────────────────────────────────────────────────
  // Sector cards and subsector chips are now display-only.
  // No click/hover interactions needed.

  // ──────────────────────────────────────────────────────────────────────────
  // 13B. SECTORS PANEL TOGGLE
  // ──────────────────────────────────────────────────────────────────────────

  const sectorsToggleBtn = document.getElementById('sectors-toggle-btn');
  const sectorsPanel = document.getElementById('sectors-panel');

  sectorsToggleBtn?.addEventListener('click', () => {
    const isVisible = sectorsPanel.style.display !== 'none';
    sectorsPanel.style.display = isVisible ? 'none' : 'block';
    sectorsToggleBtn.classList.toggle('active', !isVisible);

    // On mobile, auto-expand sidebar to FULL (0% translateY) when opening sectors list
    if (window.innerWidth <= 768) {
      if (!isVisible) {
        setSidebarPosition(SNAP_FULL, true);
      } else if (currentSnap === SNAP_FULL) {
        setSidebarPosition(SNAP_HALF, true);
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 14. MOBILE SIDEBAR — DRAGGABLE BOTTOM SHEET
  // ──────────────────────────────────────────────────────────────────────────

  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const dragHandle = document.getElementById('sidebar-drag-handle');

  // Snap positions as % of viewport height that the sidebar SHOWS
  // translateY(X%) means X% is hidden, so showing = 100 - X
  const SNAP_CLOSED = 100;   // fully hidden (0% visible)
  const SNAP_SMALL = 82;     // ~18% visible (just search bar)
  const SNAP_HALF = 45;      // ~55% visible (default open)
  const SNAP_FULL = 0;       // 100% visible (full expansion up to 92vh!)

  let currentSnap = SNAP_CLOSED;
  let isDragging = false;
  let dragStartY = 0;
  let dragStartTranslate = 0;

  function setSidebarPosition(translateYPercent, animate = true) {
    if (!sidebar) return;
    if (animate) {
      sidebar.classList.remove('dragging');
    } else {
      sidebar.classList.add('dragging');
    }
    sidebar.style.transform = `translateY(${translateYPercent}%)`;
    currentSnap = translateYPercent;

    // Show/hide overlay
    if (translateYPercent < SNAP_CLOSED) {
      sidebar.classList.add('mobile-open');
    } else {
      sidebar.classList.remove('mobile-open');
    }
  }

  function closeMobileSidebarIfOpen() {
    if (window.innerWidth <= 768 && currentSnap < SNAP_CLOSED) {
      setSidebarPosition(SNAP_CLOSED, true);
      return true;
    }
    return false;
  }

  function getTranslateY() {
    const match = sidebar?.style.transform?.match(/translateY\(([^)]+)%\)/);
    return match ? parseFloat(match[1]) : SNAP_CLOSED;
  }

  function snapToNearest(currentY, velocity) {
    const snaps = [SNAP_FULL, SNAP_HALF, SNAP_SMALL, SNAP_CLOSED];

    // If flicking down fast, go to next lower snap
    if (velocity > 0.25) {
      const lower = snaps.find(s => s > currentY + 3);
      return lower !== undefined ? lower : SNAP_CLOSED;
    }
    // If flicking up fast, go to next higher snap
    if (velocity < -0.25) {
      const higher = [...snaps].reverse().find(s => s < currentY - 3);
      return higher !== undefined ? higher : SNAP_FULL;
    }

    // Otherwise snap to nearest
    let nearest = SNAP_HALF;
    let minDist = Infinity;
    snaps.forEach(snap => {
      const dist = Math.abs(currentY - snap);
      if (dist < minDist) {
        minDist = dist;
        nearest = snap;
      }
    });
    return nearest;
  }

  // Touch events for drag handle
  function handleDragStart(e) {
    if (window.innerWidth > 768) return;
    isDragging = true;
    dragStartY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartTranslate = getTranslateY();
    sidebar?.classList.add('dragging');
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragStartY;
    const viewportH = window.innerHeight;
    const deltaPercent = (deltaY / viewportH) * 100;
    const newTranslate = Math.max(SNAP_FULL, Math.min(SNAP_CLOSED, dragStartTranslate + deltaPercent));
    sidebar.style.transform = `translateY(${newTranslate}%)`;
  }

  function handleDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const deltaY = clientY - dragStartY;
    const viewportH = window.innerHeight;
    const velocity = deltaY / viewportH;
    const currentY = getTranslateY();
    const targetSnap = snapToNearest(currentY, velocity);
    setSidebarPosition(targetSnap, true);
  }

  // Attach drag events
  dragHandle?.addEventListener('touchstart', handleDragStart, { passive: true });
  document.addEventListener('touchmove', handleDragMove, { passive: false });
  document.addEventListener('touchend', handleDragEnd);

  // Mouse drag for desktop testing
  dragHandle?.addEventListener('mousedown', handleDragStart);
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);

  // Hamburger button opens to half position
  function toggleMobileSidebar() {
    if (currentSnap < SNAP_CLOSED) {
      setSidebarPosition(SNAP_CLOSED, true);
    } else {
      setSidebarPosition(SNAP_HALF, true);
    }
  }

  sidebarToggle?.addEventListener('click', toggleMobileSidebar);
  sidebarOverlay?.addEventListener('click', () => setSidebarPosition(SNAP_CLOSED, true));

  // ──────────────────────────────────────────────────────────────────────────
  // 15. LOADING SCREEN DISMISS
  // ──────────────────────────────────────────────────────────────────────────

  const loadingScreen = document.getElementById('loading-screen');

  map.once('tileload', () => {
    setTimeout(() => {
      loadingScreen?.classList.add('hidden');
    }, 200);
  });

  setTimeout(() => {
    loadingScreen?.classList.add('hidden');
  }, 800);

  // Check if URL has a shared route parameter and load it automatically
  checkAndLoadSharedRoute();

  // ──────────────────────────────────────────────────────────────────────────
  // 16. WELCOME TOAST
  // ──────────────────────────────────────────────────────────────────────────

  setTimeout(() => {
    showToast('🗺️ Mapa v4.0 — Subsectores y Grabador de Rutas Habilitados 🛣️', 'info');
  }, 1200);

});
