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

  // Suporte a sincronização de temas via postMessage (harness / iframes)
  window.addEventListener('message', (event) => {
    try {
      if (event.data && event.data.action === 'set-theme' && event.data.theme) {
        applyTheme(event.data.theme);
      }
    } catch(e) {}
  });
})();

// 2. Módulos de Componentes — Inicialização Defensiva Condicional
(function initBcbComponents() {
  'use strict';

  const BcbUI = {
    version: '2.5.0',
    init() {
      // 1. Modais Acessíveis (WCAG 2.1 AA — Focus Trap, Escape e Retorno de Foco)
      try {
        let lastFocusedElement = null;

        function openModal(modal, trigger) {
          lastFocusedElement = trigger || document.activeElement;
          modal.classList.add('active');
          modal.setAttribute('aria-hidden', 'false');
          modal.setAttribute('aria-modal', 'true');
          modal.setAttribute('role', 'dialog');
          document.body.style.overflow = 'hidden';

          // Focar no primeiro elemento focável ou no próprio modal
          const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            modal.setAttribute('tabindex', '-1');
            modal.focus();
          }
        }

        function closeModal(modal) {
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
          if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
          }
        }

        // Delegação de cliques para abertura e fechamento
        document.addEventListener('click', (event) => {
          const trigger = event.target.closest('[data-toggle="bcb-modal"], [data-bcb-modal-target]');
          if (trigger) {
            event.preventDefault();
            const targetId = trigger.getAttribute('data-target') || trigger.getAttribute('data-bcb-modal-target') || trigger.getAttribute('href');
            if (targetId) {
              const modal = document.getElementById(targetId.replace('#', ''));
              if (modal) openModal(modal, trigger);
            }
          }

          const closeTrigger = event.target.closest('.bcb-modal-close, [data-dismiss="bcb-modal"]');
          if (closeTrigger) {
            event.preventDefault();
            const modal = closeTrigger.closest('.bcb-modal-backdrop, [role="dialog"]');
            if (modal) closeModal(modal);
          }

          if (event.target.classList.contains('bcb-modal-backdrop') && event.target.classList.contains('active')) {
            closeModal(event.target);
          }
        });

        // Ouvinte de teclado: Escape e Focus Trap
        document.addEventListener('keydown', (event) => {
          const activeModal = document.querySelector('.bcb-modal-backdrop.active, [role="dialog"].active');
          if (!activeModal) return;

          if (event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            closeModal(activeModal);
            return;
          }

          if (event.key === 'Tab') {
            const focusables = Array.from(activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
              .filter(el => !el.disabled && el.offsetParent !== null);
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (event.shiftKey) {
              if (document.activeElement === first || document.activeElement === activeModal) {
                event.preventDefault();
                last.focus();
              }
            } else {
              if (document.activeElement === last) {
                event.preventDefault();
                first.focus();
              }
            }
          }
        });
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de modal', e);
      }

      // 2. Navegação em Abas (Tabs — Padrão W3C WAI-ARIA com Setas de Teclado)
      try {
        function switchTab(currentTab, targetTab) {
          if (!targetTab) return;
          const tabList = currentTab.closest('[role="tablist"], .nav-tabs');
          if (!tabList) return;

          const allTabs = Array.from(tabList.querySelectorAll('[role="tab"], .nav-link'));
          allTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
          });

          targetTab.classList.add('active');
          targetTab.setAttribute('aria-selected', 'true');
          targetTab.setAttribute('tabindex', '0');
          targetTab.focus();

          const targetSelector = targetTab.getAttribute('href') || targetTab.getAttribute('data-target');
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

        // Inicializar tabindex, aria-selected, aria-controls e role=tabpanel
        document.querySelectorAll('[role="tablist"], .nav-tabs').forEach((tabList, listIdx) => {
          const tabs = tabList.querySelectorAll('[role="tab"], .nav-link');
          tabs.forEach((t, tIdx) => {
            if (!t.id) t.id = `bcb-ui-tab-${listIdx}-${tIdx}`;
            const isActive = t.classList.contains('active') || t.getAttribute('aria-selected') === 'true';
            t.setAttribute('tabindex', isActive ? '0' : '-1');
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
            const targetSelector = t.getAttribute('href') || t.getAttribute('data-target');
            if (targetSelector && targetSelector.startsWith('#')) {
              const panel = document.querySelector(targetSelector);
              if (panel) {
                t.setAttribute('aria-controls', panel.id);
                if (!panel.hasAttribute('role')) panel.setAttribute('role', 'tabpanel');
                if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '0');
                panel.setAttribute('aria-labelledby', t.id);
              }
            }
          });
        });

        // Clique em aba
        document.addEventListener('click', (event) => {
          const tab = event.target.closest('[role="tab"], .bcb-navegacaoabas .nav-link, .nav-tabs .nav-link[data-toggle="tab"]');
          if (tab) {
            event.preventDefault();
            switchTab(tab, tab);
          }
        });

        // Navegação por setas (Left / Right / Home / End)
        document.addEventListener('keydown', (event) => {
          const currentTab = event.target.closest('[role="tab"], .nav-tabs .nav-link');
          if (!currentTab) return;

          const tabList = currentTab.closest('[role="tablist"], .nav-tabs');
          if (!tabList) return;

          const tabs = Array.from(tabList.querySelectorAll('[role="tab"], .nav-link'));
          const index = tabs.indexOf(currentTab);
          if (index === -1) return;

          let nextTab = null;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault();
            nextTab = tabs[(index + 1) % tabs.length];
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            nextTab = tabs[(index - 1 + tabs.length) % tabs.length];
          } else if (event.key === 'Home') {
            event.preventDefault();
            nextTab = tabs[0];
          } else if (event.key === 'End') {
            event.preventDefault();
            nextTab = tabs[tabs.length - 1];
          }

          if (nextTab) switchTab(currentTab, nextTab);
        });
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de tabs', e);
      }

      // 3. Accordions (W3C WAI-ARIA com Navegação por Setas Up/Down e ESC)
      try {
        function toggleAccordion(button) {
          const targetSelector = button.getAttribute('data-target') || button.getAttribute('href');
          if (!targetSelector) return;
          const target = document.querySelector(targetSelector);
          if (!target) return;

          const isShown = target.classList.contains('show');
          button.setAttribute('aria-expanded', !isShown ? 'true' : 'false');
          button.classList.toggle('collapsed', isShown);
          target.classList.toggle('show', !isShown);
        }

        document.addEventListener('click', (event) => {
          const button = event.target.closest('.accordion [data-toggle="collapse"], .accordion .card-header button');
          if (button) {
            event.preventDefault();
            toggleAccordion(button);
          }
        });

        // Teclado no accordion (ArrowDown, ArrowUp, Home, End e Escape)
        document.addEventListener('keydown', (event) => {
          const button = event.target.closest('.accordion [data-toggle="collapse"], .accordion .card-header button');
          const accordion = button ? button.closest('.accordion') : event.target.closest('.accordion');

          if (event.key === 'Escape' || event.key === 'Esc') {
            if (accordion) {
              const openPanels = accordion.querySelectorAll('.collapse.show');
              openPanels.forEach(panel => {
                const trigger = accordion.querySelector(`[data-target="#${panel.id}"], [href="#${panel.id}"]`);
                if (trigger) {
                  event.preventDefault();
                  toggleAccordion(trigger);
                  trigger.focus();
                }
              });
            }
            return;
          }

          if (!button || !accordion) return;

          const allButtons = Array.from(accordion.querySelectorAll('[data-toggle="collapse"], .card-header button'));
          const idx = allButtons.indexOf(button);
          if (idx === -1) return;

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            allButtons[(idx + 1) % allButtons.length].focus();
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            allButtons[(idx - 1 + allButtons.length) % allButtons.length].focus();
          } else if (event.key === 'Home') {
            event.preventDefault();
            allButtons[0].focus();
          } else if (event.key === 'End') {
            event.preventDefault();
            allButtons[allButtons.length - 1].focus();
          }
        });

        // Inicializar atributos WAI-ARIA nos accordions
        document.querySelectorAll('.accordion').forEach((acc, accIdx) => {
          const btns = acc.querySelectorAll('[data-toggle="collapse"], .card-header button');
          btns.forEach((b, bIdx) => {
            if (!b.id) b.id = `bcb-ui-acc-btn-${accIdx}-${bIdx}`;
            const targetSel = b.getAttribute('data-target') || b.getAttribute('href');
            if (targetSel) {
              const target = document.querySelector(targetSel);
              if (target) {
                b.setAttribute('aria-controls', target.id);
                if (!target.hasAttribute('role')) target.setAttribute('role', 'region');
                target.setAttribute('aria-labelledby', b.id);
                const isShow = target.classList.contains('show');
                b.setAttribute('aria-expanded', isShow ? 'true' : 'false');
                b.classList.toggle('collapsed', !isShow);
              }
            }
          });
        });
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de accordion', e);
      }

      // 4. Data Tables Acessíveis (Ordenação por Teclado e aria-sort)
      try {
        function setupDataTables() {
          const sortableHeaders = document.querySelectorAll('.bcb-data-table th.sortable, table.table th.sortable, th[data-sort]');
          sortableHeaders.forEach(th => {
            if (!th.getAttribute('tabindex')) th.setAttribute('tabindex', '0');
            if (!th.getAttribute('role')) th.setAttribute('role', 'columnheader');
            if (!th.getAttribute('aria-sort')) th.setAttribute('aria-sort', 'none');

            function performSort() {
              const table = th.closest('table');
              if (!table) return;
              const tbody = table.querySelector('tbody');
              if (!tbody) return;

              const colIndex = Array.from(th.parentNode.children).indexOf(th);
              const currentSort = th.getAttribute('aria-sort');
              const newSort = currentSort === 'ascending' ? 'descending' : 'ascending';

              // Resetar outros headers
              th.parentNode.querySelectorAll('th').forEach(h => {
                if (h !== th && h.hasAttribute('aria-sort')) h.setAttribute('aria-sort', 'none');
              });
              th.setAttribute('aria-sort', newSort);

              const rows = Array.from(tbody.querySelectorAll('tr'));
              rows.sort((rowA, rowB) => {
                const cellA = rowA.children[colIndex] ? rowA.children[colIndex].innerText.trim() : '';
                const cellB = rowB.children[colIndex] ? rowB.children[colIndex].innerText.trim() : '';
                const numA = parseFloat(cellA.replace(/[^0-9,-]/g, '').replace(',', '.'));
                const numB = parseFloat(cellB.replace(/[^0-9,-]/g, '').replace(',', '.'));

                if (!isNaN(numA) && !isNaN(numB)) {
                  return newSort === 'ascending' ? numA - numB : numB - numA;
                }
                return newSort === 'ascending' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
              });

              rows.forEach(r => tbody.appendChild(r));
            }

            if (!th._hasSortListener) {
              th._hasSortListener = true;
              th.addEventListener('click', performSort);
              th.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  performSort();
                }
              });
            }
          });
        }

        setupDataTables();
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
        console.warn('BCB UI: Verificação defensiva de cópia de código', e);
      }

      // 7. Ações de Impressão e Exportação Não-Intrusivas ([data-action="print"], .bcb-btn-print)
      try {
        if (!document._bcbPrintBound) {
          document._bcbPrintBound = true;
          document.addEventListener('click', (e) => {
            const printBtn = e.target.closest('[data-action="print"], .bcb-btn-print');
            if (printBtn) {
              e.preventDefault();
              window.print();
            }
          });
        }
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de print listener', e);
      }

      // 8. Carrossel Manchete Acessível (.bcb-carousel)
      try {
        if (window.BcbCarousel && typeof window.BcbCarousel.init === 'function') {
          window.BcbCarousel.init();
        } else {
          const carousels = document.querySelectorAll('.bcb-carousel');
          carousels.forEach((carousel) => {
            if (carousel._bcbBound) return;
            carousel._bcbBound = true;
            const slides = Array.from(carousel.querySelectorAll('.bcb-carousel__slide'));
            const indicators = Array.from(carousel.querySelectorAll('.bcb-carousel__indicator'));
            const prevBtn = carousel.querySelector('.bcb-carousel__prev, [data-carousel="prev"]');
            const nextBtn = carousel.querySelector('.bcb-carousel__next, [data-carousel="next"]');
            const playPauseBtn = carousel.querySelector('.bcb-carousel__toggle-play, [data-carousel="toggle-play"]');
            let current = 0;
            let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            let timer = null;
            const delay = parseInt(carousel.getAttribute('data-interval'), 10) || 6000;

            function goTo(idx) {
              if (idx < 0 || idx >= slides.length) return;
              slides.forEach((s, i) => {
                const isActive = i === idx;
                s.classList.toggle('is-active', isActive);
                s.classList.toggle('active', isActive);
                s.setAttribute('aria-hidden', !isActive ? 'true' : 'false');
              });
              indicators.forEach((ind, i) => {
                const isSelected = i === idx;
                ind.classList.toggle('is-active', isSelected);
                ind.setAttribute('aria-selected', isSelected ? 'true' : 'false');
                ind.setAttribute('tabindex', isSelected ? '0' : '-1');
              });
              current = idx;
            }

            function startTimer() {
              if (timer) clearInterval(timer);
              if (playing && slides.length > 1) {
                timer = setInterval(() => {
                  goTo((current + 1) % slides.length);
                }, delay);
              }
            }

            function stopTimer() {
              if (timer) {
                clearInterval(timer);
                timer = null;
              }
            }

            if (prevBtn) {
              prevBtn.addEventListener('click', () => {
                goTo((current - 1 + slides.length) % slides.length);
              });
            }

            if (nextBtn) {
              nextBtn.addEventListener('click', () => {
                goTo((current + 1) % slides.length);
              });
            }

            if (playPauseBtn) {
              playPauseBtn.addEventListener('click', () => {
                playing = !playing;
                const icon = playPauseBtn.querySelector('.material-symbols-outlined, .material-icons');
                if (icon) icon.textContent = playing ? 'pause' : 'play_arrow';
                playPauseBtn.setAttribute('aria-label', playing ? 'Pausar carrossel' : 'Iniciar carrossel');
                if (playing) startTimer(); else stopTimer();
              });
            }

            indicators.forEach((ind, i) => {
              ind.addEventListener('click', () => {
                goTo(i);
              });
            });

            carousel.addEventListener('mouseenter', stopTimer);
            carousel.addEventListener('mouseleave', () => { if (playing) startTimer(); });
            carousel.addEventListener('focusin', stopTimer);
            carousel.addEventListener('focusout', (e) => {
              if (!carousel.contains(e.relatedTarget) && playing) startTimer();
            });

            goTo(0);
            if (playing) startTimer();
          });
        }
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de carrossel', e);
      }

      // 9. Tooltip Acessível ([data-tooltip], .bcb-tooltip-trigger)
      try {
        if (window.BcbTooltip && typeof window.BcbTooltip.init === 'function') {
          window.BcbTooltip.init();
        } else {
          let activeTip = null;
          let activeTrig = null;

          function hideTip() {
            if (activeTip) {
              activeTip.classList.remove('is-visible', 'show');
              if (activeTrig) activeTrig.removeAttribute('aria-describedby');
              const toRemove = activeTip;
              setTimeout(() => { if (toRemove.parentNode) toRemove.parentNode.removeChild(toRemove); }, 150);
              activeTip = null;
              activeTrig = null;
            }
          }

          function showTip(trigger) {
            const text = trigger.getAttribute('data-tooltip') || trigger.getAttribute('title');
            if (!text) return;
            hideTip();

            activeTrig = trigger;
            const tip = document.createElement('div');
            const tipId = `bcb-tooltip-auto-${Date.now()}`;
            tip.id = tipId;
            tip.className = 'bcb-tooltip';
            tip.setAttribute('role', 'tooltip');
            tip.textContent = text;
            document.body.appendChild(tip);
            trigger.setAttribute('aria-describedby', tipId);

            const rect = trigger.getBoundingClientRect();
            const tipRect = tip.getBoundingClientRect();
            const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;

            let top = rect.top + scrollY - tipRect.height - 8;
            let left = rect.left + scrollX + (rect.width / 2) - (tipRect.width / 2);
            let pos = 'top';

            if (rect.top - tipRect.height - 8 < 0) {
              pos = 'bottom';
              top = rect.bottom + scrollY + 8;
            }

            if (left < 10) left = 10;
            if (left + tipRect.width > window.innerWidth - 10) left = window.innerWidth - tipRect.width - 10;

            tip.className = `bcb-tooltip bcb-tooltip--${pos}`;
            tip.style.top = `${Math.round(top)}px`;
            tip.style.left = `${Math.round(left)}px`;

            requestAnimationFrame(() => tip.classList.add('is-visible', 'show'));
            activeTip = tip;
          }

          document.querySelectorAll('[data-tooltip], .bcb-tooltip-trigger').forEach(trigger => {
            if (trigger._bcbTipBound) return;
            trigger._bcbTipBound = true;
            if (trigger.tagName.toLowerCase() !== 'button' && trigger.tagName.toLowerCase() !== 'a' && !trigger.hasAttribute('tabindex')) {
              trigger.setAttribute('tabindex', '0');
            }
            trigger.addEventListener('mouseenter', () => showTip(trigger));
            trigger.addEventListener('mouseleave', hideTip);
            trigger.addEventListener('focusin', () => showTip(trigger));
            trigger.addEventListener('focusout', hideTip);
          });

          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && activeTip) hideTip();
          });
        }
      } catch (e) {
        console.warn('BCB UI: Verificação defensiva de tooltip', e);
      }

      // 10. Inicialização Automática e Declarativa de Gráficos Highcharts Oficiais
      try {
        if (typeof Highcharts !== 'undefined') {
          // Gráfico Selic Histórico SGS & Copom
          const selicContainers = document.querySelectorAll('#chartSelicCopom, #chartSelicSgs, [data-bcb-chart="selic-history"]');
          selicContainers.forEach(selicContainer => {
            if (selicContainer && !selicContainer._bcbChartInitialized) {
              selicContainer._bcbChartInitialized = true;
              Highcharts.chart(selicContainer, {
                chart: { type: 'spline' },
                title: { text: 'Evolução da Taxa Selic Fixada pelo Copom' },
                subtitle: { text: 'Série SGS 432 — Histórico recente de metas de juros (% a.a.)' },
                xAxis: {
                  categories: ['263ª (Jul/25)', '264ª (Set/25)', '265ª (Nov/25)', '266ª (Dez/25)', '267ª (Jan/26)', '268ª (Mar/26)'],
                  crosshair: true,
                  title: { text: 'Reunião do Copom' }
                },
                yAxis: {
                  title: { text: 'Taxa Meta (% a.a.)' },
                  min: 12.5,
                  max: 15.0,
                  tickInterval: 0.5
                },
                tooltip: {
                  shared: true,
                  crosshairs: true,
                  valueSuffix: '% a.a.'
                },
                plotOptions: {
                  spline: {
                    dataLabels: {
                      enabled: true,
                      format: '{y:.2f}%'
                    },
                    enableMouseTracking: true
                  }
                },
                series: [{
                  name: 'Meta Selic (% a.a.)',
                  data: [14.25, 14.00, 13.50, 13.25, 13.25, 14.25],
                  marker: {
                    enabled: true,
                    radius: 5
                  }
                }]
              });
            }
          });
        }
      } catch (e) {
        console.warn('BCB UI: Erro na inicialização defensiva de gráficos Highcharts', e);
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

