/**
 * BCB Design System — Data Table Responsiva (Vanilla JS)
 * Ordenação de colunas com detecção numérica (padrão pt-BR / taxas e percentuais) e atualização de aria-sort.
 */

(function () {
  'use strict';

  function parseCellContent(text) {
    if (!text) return '';
    const cleanText = text.trim();

    // Detecção de número / taxa / moeda brasileira (ex: 14,25%, +1,00 p.p., R$ 5,30, -0,50)
    const numericCandidate = cleanText
      .replace(/[R$\s%p\.]/gi, '') // remove R$, %, p.p., pontos de milhar
      .replace(',', '.');          // converte vírgula decimal para ponto

    const num = parseFloat(numericCandidate);
    if (!isNaN(num) && !isNaN(numericCandidate)) {
      return num;
    }

    return cleanText.toLowerCase();
  }

  function sortTableByColumn(th) {
    const table = th.closest('table');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr'));
    if (rows.length <= 1) return;

    const allTh = Array.from(th.parentNode.children);
    const columnIndex = allTh.indexOf(th);
    if (columnIndex === -1) return;

    const currentSort = th.getAttribute('aria-sort') || 'none';
    const nextSort = currentSort === 'ascending' ? 'descending' : 'ascending';

    // Resetar outros cabeçalhos
    allTh.forEach(header => {
      if (header !== th && header.classList.contains('sortable')) {
        header.setAttribute('aria-sort', 'none');
        const icon = header.querySelector('.sort-icon, .material-icons');
        if (icon) icon.textContent = 'sort';
      }
    });

    // Ordenar linhas
    rows.sort((rowA, rowB) => {
      const cellA = rowA.children[columnIndex];
      const cellB = rowB.children[columnIndex];

      const valA = parseCellContent(cellA ? cellA.innerText : '');
      const valB = parseCellContent(cellB ? cellB.innerText : '');

      if (typeof valA === 'number' && typeof valB === 'number') {
        return nextSort === 'ascending' ? valA - valB : valB - valA;
      }

      const strA = String(valA);
      const strB = String(valB);
      return nextSort === 'ascending'
        ? strA.localeCompare(strB, 'pt-BR')
        : strB.localeCompare(strA, 'pt-BR');
    });

    // Reanexar linhas ordenadas
    rows.forEach(row => tbody.appendChild(row));

    // Atualizar cabeçalho atual
    th.setAttribute('aria-sort', nextSort);
    const icon = th.querySelector('.sort-icon, .material-icons');
    if (icon) {
      icon.textContent = nextSort === 'ascending' ? 'arrow_upward' : 'arrow_downward';
    }

    table.dispatchEvent(new CustomEvent('bcb:table:sort', {
      bubbles: true,
      detail: { columnIndex, direction: nextSort, th }
    }));
  }

  const BcbDataTable = {
    init() {
      document.addEventListener('click', (event) => {
        const th = event.target.closest('.bcb-data-table th.sortable, table.table th.sortable');
        if (th) {
          event.preventDefault();
          sortTableByColumn(th);
        }
      });
    }
  };

  window.BcbDataTable = BcbDataTable;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbDataTable.init());
  } else {
    BcbDataTable.init();
  }
})();
