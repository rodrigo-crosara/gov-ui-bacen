/**
 * BCB Design System — Pacote Unificado de Micro-scripts (Vanilla JS)
 * Inicializa Modal, Toast, Tabs, Accordion, Data Table e Seletor de Temas.
 */

(function () {
  'use strict';

  // Gerenciador Global de Temas (Claro/Padrão, Escuro e Alto Contraste)
  const BcbTheme = {
    init() {
      const btnLight = document.getElementById('btnThemeLight');
      const btnDark = document.getElementById('btnThemeDark');
      const btnContrast = document.getElementById('btnThemeHighContrast');
      const allSwitchers = Array.from(document.querySelectorAll('[data-theme-switcher]'));

      function applyTheme(themeKey) {
        let themeAttr = 'light';
        let contrastAttr = 'normal';

        if (themeKey === 'dark') {
          themeAttr = 'dark';
          contrastAttr = 'normal';
        } else if (themeKey === 'high-contrast' || themeKey === 'high') {
          themeAttr = 'high-contrast';
          contrastAttr = 'high';
        } else {
          themeAttr = 'light';
          contrastAttr = 'normal';
        }

        // Aplica na tag html e body
        document.documentElement.setAttribute('data-theme', themeAttr);
        document.documentElement.setAttribute('data-contrast', contrastAttr);
        if (document.body) {
          document.body.setAttribute('data-theme', themeAttr);
          document.body.setAttribute('data-contrast', contrastAttr);
        }

        try {
          localStorage.setItem('bcb-theme', themeKey);
          localStorage.setItem('bcb-contrast', contrastAttr);
        } catch (e) {}

        // Sincroniza botões da navbar padrão
        [btnLight, btnDark, btnContrast].forEach(b => {
          if (b) {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          }
        });

        if (contrastAttr === 'high') {
          if (btnContrast) {
            btnContrast.classList.add('active');
            btnContrast.setAttribute('aria-pressed', 'true');
          }
        } else if (themeAttr === 'dark') {
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

        // Sincroniza botões genéricos [data-theme-switcher]
        allSwitchers.forEach(b => {
          const target = b.getAttribute('data-theme-switcher');
          const isMatch = (target === themeKey) ||
                          (target === 'default' && (themeKey === 'light' || themeKey === 'default')) ||
                          (target === 'light' && (themeKey === 'light' || themeKey === 'default')) ||
                          (target === 'high-contrast' && (themeKey === 'high-contrast' || themeKey === 'high'));
          if (isMatch) {
            b.classList.add('active');
            b.setAttribute('aria-pressed', 'true');
          } else {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          }
        });
      }

      if (btnLight) btnLight.addEventListener('click', () => applyTheme('light'));
      if (btnDark) btnDark.addEventListener('click', () => applyTheme('dark'));
      if (btnContrast) btnContrast.addEventListener('click', () => applyTheme('high-contrast'));

      allSwitchers.forEach(b => {
        b.addEventListener('click', () => {
          const mode = b.getAttribute('data-theme-switcher');
          applyTheme(mode);
        });
      });

      // Restaurar preferência salva do usuário ou padrão
      try {
        const savedTheme = localStorage.getItem('bcb-theme') ||
                           document.documentElement.getAttribute('data-theme') ||
                           'light';
        applyTheme(savedTheme);
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
