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

    const rows = Array.from(tbody.querySelectorAll('tr')).filter(r => !r.classList.contains('bcb-table-empty-row'));
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
        const icon = header.querySelector('.sort-icon, .material-symbols-outlined, .material-icons');
        if (icon) icon.textContent = 'sort';
      }
    });

    // Ordenar linhas de dados
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

    // Reanexar linhas ordenadas preservando possíveis linhas de rodapé
    rows.forEach(row => tbody.appendChild(row));

    // Atualizar cabeçalho atual
    th.setAttribute('aria-sort', nextSort);
    const icon = th.querySelector('.sort-icon, .material-symbols-outlined, .material-icons');
    if (icon) {
      icon.textContent = nextSort === 'ascending' ? 'arrow_upward' : 'arrow_downward';
    }

    table.dispatchEvent(new CustomEvent('bcb:table:sort', {
      bubbles: true,
      detail: { columnIndex, direction: nextSort, th }
    }));
  }

  function initScrollIndicators() {
    const responsiveContainers = document.querySelectorAll('.table-responsive');
    responsiveContainers.forEach(container => {
      container.classList.add('has-scroll-indicator');
      const checkScroll = () => {
        const canScrollRight = container.scrollWidth > container.clientWidth && (container.scrollLeft + container.clientWidth < container.scrollWidth - 10);
        container.classList.toggle('can-scroll-right', canScrollRight);
      };
      checkScroll();
      container.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll, { passive: true });
    });
  }

  function initResponsiveCards() {
    const tables = document.querySelectorAll('.bcb-data-table, table.table');
    tables.forEach(table => {
      const thead = table.querySelector('thead');
      const tbody = table.querySelector('tbody');
      if (!thead || !tbody) return;

      const ths = Array.from(thead.querySelectorAll('th'));
      if (ths.length === 0) return;

      const headers = ths.map(th => {
        const clone = th.cloneNode(true);
        const icon = clone.querySelector('.sort-icon, .material-symbols-outlined, .material-icons');
        if (icon) icon.remove();
        return clone.innerText.trim();
      });

      const rows = tbody.querySelectorAll('tr');
      rows.forEach(row => {
        if (row.classList.contains('bcb-table-empty-row')) return;
        const cells = Array.from(row.children);
        cells.forEach((cell, idx) => {
          if (!cell.hasAttribute('data-label') && headers[idx]) {
            cell.setAttribute('data-label', headers[idx]);
          }
        });
      });
    });
  }

  const BcbDataTable = {
    init() {
      const sortableHeaders = document.querySelectorAll('.bcb-data-table th.sortable, table.table th.sortable');
      sortableHeaders.forEach(th => {
        if (!th.hasAttribute('tabindex')) {
          th.setAttribute('tabindex', '0');
        }
        if (!th.hasAttribute('role')) {
          th.setAttribute('role', 'button');
        }
        if (!th.hasAttribute('aria-label') && th.innerText) {
          th.setAttribute('aria-label', `Ordenar por ${th.innerText.trim()}`);
        }
      });

      document.addEventListener('click', (event) => {
        const th = event.target.closest('.bcb-data-table th.sortable, table.table th.sortable');
        if (th) {
          event.preventDefault();
          sortTableByColumn(th);
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          const th = event.target.closest('.bcb-data-table th.sortable, table.table th.sortable');
          if (th) {
            event.preventDefault();
            sortTableByColumn(th);
          }
        }
      });

      initScrollIndicators();
      initResponsiveCards();
    },
    update() {
      initScrollIndicators();
      initResponsiveCards();
    }
  };

  window.BcbDataTable = BcbDataTable;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbDataTable.init());
  } else {
    BcbDataTable.init();
  }
})();
