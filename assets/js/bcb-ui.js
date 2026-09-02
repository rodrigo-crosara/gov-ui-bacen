/**
 * BCB Design System — Pacote Unificado de Micro-scripts (Vanilla JS)
 * Inicializa Modal, Toast, Tabs, Accordion, Data Table e Seletor de Temas.
 */

(function () {
  'use strict';

  // Gerenciador Global de Temas (Claro, Escuro e Alto Contraste)
  const BcbTheme = {
    init() {
      const btnLight = document.getElementById('btnThemeLight');
      const btnDark = document.getElementById('btnThemeDark');
      const btnContrast = document.getElementById('btnThemeHighContrast');

      function applyTheme(theme, contrast) {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-contrast', contrast);
        try {
          localStorage.setItem('bcb-theme', theme);
          localStorage.setItem('bcb-contrast', contrast);
        } catch (e) {}

        [btnLight, btnDark, btnContrast].forEach(b => {
          if (b) {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          }
        });

        if (contrast === 'high') {
          if (btnContrast) {
            btnContrast.classList.add('active');
            btnContrast.setAttribute('aria-pressed', 'true');
          }
        } else if (theme === 'dark') {
          if (btnDark) {
            btnDark.classList.add('active');
            btnDark.setAttribute('aria-pressed', 'true');
          }
        } else {
          if (btnLight) {
            btnLight.classList.add('active');
            btnLight.setAttribute('aria-pressed', 'true');
          }
        }
      }

      if (btnLight) btnLight.addEventListener('click', () => applyTheme('light', 'normal'));
      if (btnDark) btnDark.addEventListener('click', () => applyTheme('dark', 'normal'));
      if (btnContrast) btnContrast.addEventListener('click', () => applyTheme('dark', 'high'));

      // Restaurar preferência do usuário ou padrão
      try {
        const savedTheme = localStorage.getItem('bcb-theme') || document.documentElement.getAttribute('data-theme') || 'light';
        const savedContrast = localStorage.getItem('bcb-contrast') || document.documentElement.getAttribute('data-contrast') || 'normal';
        applyTheme(savedTheme, savedContrast);
      } catch (e) {}
    }
  };

  // Inicializador geral do Design System
  const BcbUI = {
    version: '2.1.0',
    init() {
      BcbTheme.init();
      if (window.BcbModal && typeof window.BcbModal.init === 'function') window.BcbModal.init();
      if (window.BcbToast && typeof window.BcbToast.init === 'function') window.BcbToast.init();
      if (window.BcbTabs && typeof window.BcbTabs.init === 'function') window.BcbTabs.init();
      if (window.BcbAccordion && typeof window.BcbAccordion.init === 'function') window.BcbAccordion.init();
      if (window.BcbDataTable && typeof window.BcbDataTable.init === 'function') window.BcbDataTable.init();
    }
  };

  window.BcbUI = BcbUI;
  window.BcbTheme = BcbTheme;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbUI.init());
  } else {
    BcbUI.init();
  }
})();
