/**
 * BCB Design System — Pacote Unificado de Micro-scripts (Vanilla JS)
 * Inicializa Seletor de Temas (IIFE autônoma imediata), Modal, Toast, Tabs, Accordion e Data Table.
 * Arquitetura defensiva com tolerância a falhas e verificação estrita de nulidade.
 */

// 1. Alternador de Temas — Isolado em Função Autônoma Imediata (IIFE)
(function initBcbThemeImmediate() {
  'use strict';

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

    // Aplicação imediata no DOM (na tag <html> e <body>)
    try {
      if (document.documentElement) {
        document.documentElement.setAttribute('data-theme', themeAttr);
        document.documentElement.setAttribute('data-contrast', contrastAttr);
      }
      if (document.body) {
        document.body.setAttribute('data-theme', themeAttr);
        document.body.setAttribute('data-contrast', contrastAttr);
      }
    } catch (e) {}

    // Persistência segura em localStorage
    try {
      localStorage.setItem('bcb-theme', themeKey);
      localStorage.setItem('bcb-contrast', contrastAttr);
    } catch (e) {}

    // Atualização defensiva dos botões do seletor (.bcb-theme-btn--active e .active)
    try {
      const allButtons = document.querySelectorAll(
        '.bcb-theme-toggle button, .bcb-theme-btn, [data-theme-switcher], #btnThemeLight, #btnThemeDark, #btnThemeHighContrast'
      );

      allButtons.forEach(b => {
        const target = b.getAttribute('data-theme-switcher') ||
                       (b.id === 'btnThemeHighContrast' ? 'high-contrast' :
                        b.id === 'btnThemeDark' ? 'dark' : 'default');

        const isMatch = (target === themeKey) ||
                        (target === 'default' && (themeKey === 'light' || themeKey === 'default')) ||
                        (target === 'light' && (themeKey === 'light' || themeKey === 'default')) ||
                        (target === 'high-contrast' && (themeKey === 'high-contrast' || themeKey === 'high'));

        if (isMatch) {
          b.classList.add('active', 'bcb-theme-btn--active');
          b.setAttribute('aria-pressed', 'true');
        } else {
          b.classList.remove('active', 'bcb-theme-btn--active');
          b.setAttribute('aria-pressed', 'false');
        }
      });
    } catch (e) {}
  }

  function bindEvents() {
    try {
      const buttons = document.querySelectorAll(
        '.bcb-theme-toggle button, .bcb-theme-btn, [data-theme-switcher], #btnThemeLight, #btnThemeDark, #btnThemeHighContrast'
      );

      buttons.forEach(b => {
        b.addEventListener('click', () => {
          const mode = b.getAttribute('data-theme-switcher') ||
                       (b.id === 'btnThemeHighContrast' ? 'high-contrast' :
                        b.id === 'btnThemeDark' ? 'dark' : 'default');
          applyTheme(mode);
        });
      });
    } catch (e) {}
  }

  // Leitura fluida e aplicação imediata da preferência salva na tag <html>
  let savedTheme = 'default';
  try {
    savedTheme = localStorage.getItem('bcb-theme') ||
                 (document.documentElement ? document.documentElement.getAttribute('data-theme') : null) ||
                 'default';
  } catch (e) {}

  applyTheme(savedTheme);

  // Vincular eventos assim que o DOM estiver interativo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bindEvents();
      applyTheme(savedTheme);
    });
  } else {
    bindEvents();
    applyTheme(savedTheme);
  }

  // Exportar para escopo global para acesso programático
  window.BcbTheme = {
    applyTheme,
    init: () => {
      bindEvents();
      applyTheme(savedTheme);
    }
  };
})();

// 2. Módulos de Componentes — Inicialização Defensiva Condicional
(function initBcbComponents() {
  'use strict';

  const BcbUI = {
    version: '2.1.0',
    init() {
      // 1. Modais
      try {
        const modals = document.querySelectorAll('.bcb-modal, [data-toggle="bcb-modal"], [data-bcb-modal-target]');
        if (modals.length > 0) {
          if (window.BcbModal && typeof window.BcbModal.init === 'function') {
            window.BcbModal.init();
          } else {
            // Fallback embutido caso modal.js não tenha sido importado separadamente
            document.addEventListener('click', (event) => {
              const trigger = event.target.closest('[data-toggle="bcb-modal"], [data-bcb-modal-target]');
              if (trigger) {
                event.preventDefault();
                const targetId = trigger.getAttribute('data-target') || trigger.getAttribute('data-bcb-modal-target') || trigger.getAttribute('href');
                if (targetId) {
                  const modal = document.getElementById(targetId.replace('#', ''));
                  if (modal) {
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                    modal.setAttribute('aria-modal', 'true');
                    document.body.style.overflow = 'hidden';
                  }
                }
              }
              const closeTrigger = event.target.closest('.bcb-modal-close, [data-dismiss="bcb-modal"]');
              if (closeTrigger) {
                event.preventDefault();
                const modal = closeTrigger.closest('.bcb-modal-backdrop, [role="dialog"]');
                if (modal) {
                  modal.classList.remove('active');
                  modal.setAttribute('aria-hidden', 'true');
                  document.body.style.overflow = '';
                }
              }
              if (event.target.classList.contains('bcb-modal-backdrop') && event.target.classList.contains('active')) {
                event.target.classList.remove('active');
                event.target.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
              }
            });
          }
        }
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de modal', e);
      }

      // 2. Navegação em Abas (Tabs)
      try {
        const tabs = document.querySelectorAll('.bcb-navegacaoabas, .nav-tabs, [role="tablist"]');
        if (tabs.length > 0) {
          if (window.BcbTabs && typeof window.BcbTabs.init === 'function') {
            window.BcbTabs.init();
          } else {
            document.addEventListener('click', (event) => {
              const tab = event.target.closest('[role="tab"], .bcb-navegacaoabas .nav-link, .nav-tabs .nav-link[data-toggle="tab"]');
              if (tab) {
                event.preventDefault();
                const tabList = tab.closest('[role="tablist"], .nav-tabs');
                if (tabList) {
                  tabList.querySelectorAll('[role="tab"], .nav-link').forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                  });
                  tab.classList.add('active');
                  tab.setAttribute('aria-selected', 'true');
                }
                const targetSelector = tab.getAttribute('href') || tab.getAttribute('data-target');
                if (targetSelector) {
                  const panel = document.querySelector(targetSelector);
                  if (panel) {
                    const content = panel.closest('.tab-content');
                    if (content) {
                      content.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active', 'show'));
                    }
                    panel.classList.add('active', 'show');
                  }
                }
              }
            });
          }
        }
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de tabs', e);
      }

      // 3. Accordions
      try {
        const accordions = document.querySelectorAll('.accordion, [data-toggle="collapse"]');
        if (accordions.length > 0) {
          if (window.BcbAccordion && typeof window.BcbAccordion.init === 'function') {
            window.BcbAccordion.init();
          } else {
            document.addEventListener('click', (event) => {
              const button = event.target.closest('.accordion [data-toggle="collapse"], .accordion .card-header button');
              if (button) {
                event.preventDefault();
                const targetSelector = button.getAttribute('data-target') || button.getAttribute('href');
                if (targetSelector) {
                  const target = document.querySelector(targetSelector);
                  if (target) {
                    const isShown = target.classList.contains('show');
                    button.setAttribute('aria-expanded', !isShown ? 'true' : 'false');
                    button.classList.toggle('collapsed', isShown);
                    target.classList.toggle('show', !isShown);
                  }
                }
              }
            });
          }
        }
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de accordion', e);
      }

      // 4. Data Tables
      try {
        const tables = document.querySelectorAll('.bcb-data-table, table.table th.sortable');
        if (tables.length > 0) {
          if (window.BcbDataTable && typeof window.BcbDataTable.init === 'function') {
            window.BcbDataTable.init();
          }
        }
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de data-table', e);
      }

      // 5. Toasts
      try {
        const toasts = document.querySelectorAll('[data-bcb-toast], .bcb-toast, .bcb-toast-container');
        if (toasts.length > 0) {
          if (window.BcbToast && typeof window.BcbToast.init === 'function') {
            window.BcbToast.init();
          }
        }
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de toast', e);
      }

      // 6. Botões de Copiar Código (.btn-copy-code)
      try {
        const copyButtons = document.querySelectorAll('.btn-copy-code');
        if (copyButtons.length > 0) {
          copyButtons.forEach(btn => {
            if (btn._hasCopyListener) return;
            btn._hasCopyListener = true;
            btn.addEventListener('click', () => {
              const codeId = btn.getAttribute('data-code');
              const codeElement = codeId ? document.getElementById(codeId) : (btn.nextElementSibling && btn.nextElementSibling.querySelector('code'));
              if (codeElement) {
                const textToCopy = codeElement.innerText || codeElement.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                  const originalHTML = btn.innerHTML;
                  btn.innerHTML = '<span class="material-symbols-outlined material-icons md-18" aria-hidden="true">check</span> Copiado!';
                  btn.style.background = 'var(--bcb-color-verde-castell, #088694)';
                  btn.style.color = '#ffffff';
                  setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.style.color = '';
                  }, 2000);

                  if (window.BcbToast && typeof window.BcbToast.show === 'function') {
                    window.BcbToast.show({
                      title: 'Código Copiado!',
                      message: 'O snippet HTML foi copiado para a área de transferência.',
                      type: 'success',
                      duration: 3000
                    });
                  }
                }).catch(err => {
                  console.error('BCB UI: Erro ao copiar código:', err);
                });
              }
            });
          });
        }
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de copiar código', e);
      }
    }
  };

  window.BcbUI = BcbUI;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbUI.init());
  } else {
    BcbUI.init();
  }
})();

