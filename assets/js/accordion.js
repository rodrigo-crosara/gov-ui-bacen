/**
 * BCB Design System — Accordions Expansíveis (Vanilla JS)
 * Sincroniza expansão/colapso, animação e atributos WAI-ARIA (aria-expanded, aria-controls).
 */

(function () {
  'use strict';

  function toggleAccordion(button) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const targetSelector = button.getAttribute('data-target') || button.getAttribute('href');
    if (!targetSelector) return;

    const targetCollapse = document.querySelector(targetSelector);
    if (!targetCollapse) return;

    const accordion = button.closest('.accordion');
    const parentSelector = button.getAttribute('data-parent') || (accordion ? '#' + accordion.id : null);

    // Se houver parent e estivermos abrindo, fecha os irmãos
    if (parentSelector && !isExpanded) {
      const parent = document.querySelector(parentSelector);
      if (parent) {
        const otherButtons = parent.querySelectorAll('[data-toggle="collapse"]');
        otherButtons.forEach(btn => {
          if (btn !== button) {
            btn.setAttribute('aria-expanded', 'false');
            btn.classList.add('collapsed');
            const otherTarget = document.querySelector(btn.getAttribute('data-target') || btn.getAttribute('href'));
            if (otherTarget) {
              otherTarget.classList.remove('show');
            }
          }
        });
      }
    }

    // Alternar o item clicado
    const nextState = !isExpanded;
    button.setAttribute('aria-expanded', nextState ? 'true' : 'false');
    button.classList.toggle('collapsed', !nextState);
    targetCollapse.classList.toggle('show', nextState);

    button.dispatchEvent(new CustomEvent('bcb:accordion:toggle', {
      bubbles: true,
      detail: { expanded: nextState, button, target: targetCollapse }
    }));
  }

  const BcbAccordion = {
    init() {
      const accordions = document.querySelectorAll('.accordion, [data-toggle="collapse"]');
      if (accordions.length === 0) return;

      document.addEventListener('click', (event) => {
        const button = event.target.closest('.accordion [data-toggle="collapse"], .accordion .card-header button');
        if (button) {
          event.preventDefault();
          toggleAccordion(button);
        }
      });

      // Navegação por teclado nos botões do acordeão
      document.addEventListener('keydown', (event) => {
        const button = event.target.closest('.accordion [data-toggle="collapse"], .accordion .card-header button');
        const accordion = button ? button.closest('.accordion') : event.target.closest('.accordion');

        if (event.key === 'Escape' || event.key === 'Esc') {
          // Fechar sanfona ativa com Escape
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

      // Inicializar estados e atributos WAI-ARIA
      document.querySelectorAll('.accordion').forEach((accordion, accIdx) => {
        const buttons = accordion.querySelectorAll('[data-toggle="collapse"], .card-header button');
        buttons.forEach((button, btnIdx) => {
          if (!button.id) button.id = `bcb-accordion-btn-${accIdx}-${btnIdx}`;
          const targetSelector = button.getAttribute('data-target') || button.getAttribute('href');
          if (targetSelector) {
            const target = document.querySelector(targetSelector);
            if (target) {
              button.setAttribute('aria-controls', target.id);
              if (!target.hasAttribute('role')) target.setAttribute('role', 'region');
              target.setAttribute('aria-labelledby', button.id);
              const isShow = target.classList.contains('show');
              button.setAttribute('aria-expanded', isShow ? 'true' : 'false');
              button.classList.toggle('collapsed', !isShow);
            }
          }
        });
      });
    }
  };

  window.BcbAccordion = BcbAccordion;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbAccordion.init());
  } else {
    BcbAccordion.init();
  }
})();
