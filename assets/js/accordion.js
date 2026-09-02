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

      // Inicializar estados ARIA
      document.querySelectorAll('.accordion [data-toggle="collapse"], .accordion .card-header button').forEach(button => {
        const targetSelector = button.getAttribute('data-target') || button.getAttribute('href');
        if (targetSelector) {
          const target = document.querySelector(targetSelector);
          const isShow = target && target.classList.contains('show');
          button.setAttribute('aria-expanded', isShow ? 'true' : 'false');
          button.classList.toggle('collapsed', !isShow);
        }
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
