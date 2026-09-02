/**
 * BCB Design System — Pacote Unificado de Micro-scripts (Vanilla JS)
 * Inicializa Modal, Toast, Tabs, Accordion e Data Table.
 */

(function () {
  'use strict';

  // Inicializador geral do Design System
  const BcbUI = {
    version: '1.2.0',
    init() {
      if (window.BcbModal && typeof window.BcbModal.init === 'function') window.BcbModal.init();
      if (window.BcbToast && typeof window.BcbToast.init === 'function') window.BcbToast.init();
      if (window.BcbTabs && typeof window.BcbTabs.init === 'function') window.BcbTabs.init();
      if (window.BcbAccordion && typeof window.BcbAccordion.init === 'function') window.BcbAccordion.init();
      if (window.BcbDataTable && typeof window.BcbDataTable.init === 'function') window.BcbDataTable.init();
    }
  };

  window.BcbUI = BcbUI;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbUI.init());
  } else {
    BcbUI.init();
  }
})();
