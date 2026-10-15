/**
 * ============================================================================
 * CLASIFICADOR MASIVO DE PEDIDOS EXCEL (TEMU / J&T EXPRESS)
 * Permite procesar manifiestos de 800+ paquetes en segundos, asignando
 * el sector automáticamente y alertando sobre direcciones dudosas.
 * ============================================================================
 */

(function() {
  let rawWorkbookData = null;
  let parsedRows = [];
  let currentFilter = 'all';
  let searchTerm = '';

  // Elementos del DOM
  const modalBtn = document.getElementById('excel-modal-btn');
  const modal = document.getElementById('excel-modal');
  const closeBtn = document.getElementById('excel-modal-close');
  const backdrop = document.getElementById('excel-modal-backdrop');
  const dropZone = document.getElementById('excel-drop-zone');
  const fileInput = document.getElementById('excel-file-input');
  const resultsPanel = document.getElementById('excel-results-panel');
  const searchInput = document.getElementById('excel-search-input');
  const exportBtn = document.getElementById('excel-export-btn');
  const tableBody = document.getElementById('excel-table-body');

  // Estadísticas
  const statTotal = document.getElementById('stat-total-count');
  const statOk = document.getElementById('stat-ok-count');
  const statWarning = document.getElementById('stat-warning-count');
  const sectorsBar = document.getElementById('excel-sectors-breakdown');

  // ─── APERTURA Y CIERRE DE MODAL ───
  function openModal() {
    if (modal) modal.style.display = 'flex';
  }

  function closeModal() {
    if (modal) modal.style.display = 'none';
  }

  modalBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  // ─── DRAG & DROP Y SUBIDA DE ARCHIVO ───
  dropZone?.addEventListener('click', () => fileInput?.click());

  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone?.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer?.files?.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput?.addEventListener('change', (e) => {
    if (e.target.files?.length > 0) {
      handleFile(e.target.files[0]);
    }
  });

  // ─── PROCESAMIENTO DEL EXCEL (SheetJS) ───
  function handleFile(file) {
    if (!window.XLSX) {
      alert('La biblioteca de Excel (SheetJS) no está cargada.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = window.XLSX.read(data, { type: 'array' });
        rawWorkbookData = workbook;

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = window.XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!json || json.length === 0) {
          alert('El archivo Excel está vacío.');
          return;
        }

        processExcelRows(json);
      } catch (err) {
        console.error('Error leyendo Excel:', err);
        alert('Error al leer el archivo Excel: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  // Detectar columnas clave automáticamente
  function detectColumns(firstRow) {
    const keys = Object.keys(firstRow);

    const addrKey = keys.find(k => /detallada|direcci[oó]n|address/i.test(k)) ||
                    keys.find(k => /direcci/i.test(k)) || keys[0];

    const guiaKey = keys.find(k => /gu[ií]a|tracking|c[oó]digo/i.test(k)) ||
                    keys.find(k => /n[uú]mero/i.test(k)) || keys[0];

    const destKey = keys.find(k => /destinatario|nombre|cliente/i.test(k)) || '';

    const distKey = keys.find(k => /colonia|distrito|ciudad/i.test(k)) || '';

    return { addrKey, guiaKey, destKey, distKey };
  }

  // Clasificar una dirección individual
  function classifySingleAddress(rawAddress, districtHint) {
    if (!rawAddress || typeof rawAddress !== 'string' || rawAddress.trim().length < 3) {
      return {
        sectorId: null,
        sectorName: 'Sin Sector',
        status: 'WARNING',
        reason: 'Dirección vacía o demasiado corta'
      };
    }

    const clean = rawAddress.trim();

    // 1. Capa 0: Caché persistente
    if (typeof window.lookupCache === 'function') {
      const cached = window.lookupCache(clean);
      if (cached && cached.sector) {
        return {
          sectorId: cached.sector.id,
          sectorName: cached.sector.name,
          color: cached.sector.color,
          status: 'OK',
          source: 'Caché'
        };
      }
    }

    // 2. Capa 1: Diccionario local de calles
    if (typeof window.findLocalStreetMatches === 'function') {
      const matches = window.findLocalStreetMatches(clean);
      if (matches && matches.length > 0) {
        const best = matches[0];
        // Verificar si tiene número de casa
        const hasNumber = /\b\d{1,5}\b/.test(clean);
        return {
          sectorId: best.sectorId,
          sectorName: `Sector ${best.sectorId}`,
          color: getSectorColor(best.sectorId),
          zone: best.zone,
          status: hasNumber ? 'OK' : 'WARNING',
          reason: hasNumber ? '' : 'Falta número exterior',
          source: 'Diccionario'
        };
      }
    }

    // 3. Revisión de calles limítrofes que requieren altura
    if (/angamos/i.test(clean)) {
      return { sectorId: null, sectorName: 'Revisar', status: 'WARNING', reason: 'Av. Angamos (especificar cuadra o número)' };
    }
    if (/marsano/i.test(clean)) {
      return { sectorId: null, sectorName: 'Revisar', status: 'WARNING', reason: 'Av. Tomás Marsano (especificar cuadra)' };
    }
    if (/panam[aá]/i.test(clean)) {
      return { sectorId: null, sectorName: 'Revisar', status: 'WARNING', reason: 'Av. Rep. de Panamá (especificar cuadra)' };
    }

    // 4. No identificada en Surquillo
    return {
      sectorId: null,
      sectorName: 'Dudosa',
      status: 'WARNING',
      reason: 'Calle no identificada en Surquillo'
    };
  }

  function getSectorColor(id) {
    const colors = {
      '1': '#3B82F6',
      '2': '#F59E0B',
      '3': '#EF4444',
      '4': '#10B981',
      '5': '#8B5CF6',
      '6': '#EC4899',
      '7': '#06B6D4'
    };
    return colors[id] || '#94A3B8';
  }

  function processExcelRows(rows) {
    const cols = detectColumns(rows[0]);
    parsedRows = [];

    const sectorCounts = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0 };
    let okCount = 0;
    let warningCount = 0;

    rows.forEach((r, idx) => {
      const guia = String(r[cols.guiaKey] || `FILA-${idx + 1}`);
      const address = String(r[cols.addrKey] || '');
      const dest = cols.destKey ? String(r[cols.destKey] || '') : '';
      const dist = cols.distKey ? String(r[cols.distKey] || '') : '';

      const classification = classifySingleAddress(address, dist);

      if (classification.status === 'OK' && classification.sectorId) {
        okCount++;
        sectorCounts[classification.sectorId] = (sectorCounts[classification.sectorId] || 0) + 1;
      } else {
        warningCount++;
      }

      parsedRows.push({
        index: idx + 1,
        guia,
        address,
        destinatario: dest,
        distrito: dist,
        sectorId: classification.sectorId,
        sectorName: classification.sectorName,
        color: classification.color || '#94a3b8',
        zone: classification.zone || '',
        status: classification.status,
        reason: classification.reason || '',
        originalRow: r
      });
    });

    // Actualizar métricas en pantalla
    if (statTotal) statTotal.textContent = parsedRows.length;
    if (statOk) statOk.textContent = okCount;
    if (statWarning) statWarning.textContent = warningCount;

    // Badges por sector
    if (sectorsBar) {
      sectorsBar.innerHTML = Object.entries(sectorCounts).map(([secId, count]) => {
        const color = getSectorColor(secId);
        return `
          <div class="sector-pill-filter" data-sector="${secId}" style="border-color: ${color}60; background: ${color}15;">
            <span class="pill-dot" style="background: ${color};"></span>
            <strong>S${secId}:</strong> ${count}
          </div>
        `;
      }).join('');

      // Clic para filtrar por sector
      sectorsBar.querySelectorAll('.sector-pill-filter').forEach(el => {
        el.addEventListener('click', () => {
          const sec = el.dataset.sector;
          currentFilter = (currentFilter === `sector-${sec}`) ? 'all' : `sector-${sec}`;
          renderTable();
        });
      });
    }

    if (dropZone) dropZone.style.display = 'none';
    if (resultsPanel) resultsPanel.style.display = 'block';

    renderTable();
  }

  // ─── RENDERIZADO DE TABLA Y FILTROS ───
  function renderTable() {
    if (!tableBody) return;

    const term = searchTerm.toLowerCase().trim();

    const filtered = parsedRows.filter(row => {
      // Filtro de estado / sector
      if (currentFilter === 'warning' && row.status !== 'WARNING') return false;
      if (currentFilter.startsWith('sector-')) {
        const sec = currentFilter.split('-')[1];
        if (row.sectorId !== sec) return false;
      }

      // Filtro de búsqueda por texto
      if (term) {
        const matchGuia = row.guia.toLowerCase().includes(term);
        const matchAddr = row.address.toLowerCase().includes(term);
        const matchDest = row.destinatario.toLowerCase().includes(term);
        if (!matchGuia && !matchAddr && !matchDest) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-muted);">No se encontraron pedidos con los filtros actuales</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.slice(0, 300).map(row => {
      const badgeHtml = row.sectorId
        ? `<span class="table-sector-badge" style="background: ${row.color}25; color: ${row.color}; border: 1px solid ${row.color}50;">Sector ${row.sectorId}</span>`
        : `<span class="table-sector-badge badge-warning">Sin Asignar</span>`;

      const statusHtml = row.status === 'OK'
        ? `<span class="status-tag status-ok">✅ Listo</span>`
        : `<span class="status-tag status-warning" title="${row.reason}">⚠️ ${row.reason || 'Dudosa'}</span>`;

      return `
        <tr>
          <td>${row.index}</td>
          <td><strong>${row.guia}</strong></td>
          <td>${row.destinatario || '-'}</td>
          <td>${row.address}</td>
          <td>${badgeHtml}</td>
          <td>${statusHtml}</td>
        </tr>
      `;
    }).join('');
  }

  // Buscador en la tabla
  searchInput?.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderTable();
  });

  // Botones de filtro (Todos / Dudosas)
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderTable();
    });
  });

  // ─── EXPORTACIÓN DE EXCEL ENRIQUECIDO ───
  exportBtn?.addEventListener('click', () => {
    if (!parsedRows || parsedRows.length === 0 || !window.XLSX) return;

    // Crear filas enriquecidas para exportar
    const exportData = parsedRows.map(r => ({
      'SECTOR_ASIGNADO': r.sectorId ? `Sector ${r.sectorId}` : 'NO_ASIGNADO',
      'ESTADO': r.status,
      'OBSERVACION': r.reason || 'Correcto',
      ...r.originalRow
    }));

    const worksheet = window.XLSX.utils.json_to_sheet(exportData);
    const workbook = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos_Sectorizados');

    const fileName = `Temu_Surquillo_Clasificado_${new Date().toISOString().slice(0, 10)}.xlsx`;
    window.XLSX.writeFile(workbook, fileName);
  });

})();
