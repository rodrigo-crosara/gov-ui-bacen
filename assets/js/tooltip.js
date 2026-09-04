/**
 * BCB Design System — Tooltip Acessível (Vanilla JS)
 * Totalmente compatível com WAI-ARIA Tooltip Pattern e WCAG 1.4.13 (Content on Hover or Focus).
 * Gerencia posicionamento dinâmico, acessibilidade por leitores de tela e fechamento via ESC.
 */

(function () {
  'use strict';

  let currentTooltipElement = null;
  let activeTrigger = null;
  let tooltipCounter = 0;

  const BcbTooltip = {
    init: function (rootElement) {
      const container = rootElement || document;
      const triggers = Array.from(container.querySelectorAll('[data-tooltip], .bcb-tooltip-trigger'));

      triggers.forEach(trigger => {
        if (trigger._bcbTooltipBound) return;
        trigger._bcbTooltipBound = true;

        // Se não for botão ou link nativo, torna focável por teclado
        const tagName = trigger.tagName.toLowerCase();
        if (tagName !== 'button' && tagName !== 'a' && !trigger.hasAttribute('tabindex')) {
          trigger.setAttribute('tabindex', '0');
        }

        // Se não tiver role específico e for termo de texto
        if (!trigger.getAttribute('role') && tagName !== 'button' && tagName !== 'a') {
          trigger.setAttribute('role', 'term');
        }

        trigger.addEventListener('mouseenter', () => BcbTooltip.show(trigger));
        trigger.addEventListener('mouseleave', () => BcbTooltip.hide());
        trigger.addEventListener('focusin', () => BcbTooltip.show(trigger));
        trigger.addEventListener('focusout', () => BcbTooltip.hide());
      });

      // Fechamento com tecla Escape (WCAG 1.4.13)
      if (!document._bcbTooltipKeyBound) {
        document._bcbTooltipKeyBound = true;
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && currentTooltipElement) {
            BcbTooltip.hide();
          }
        });
      }
    },

    show: function (trigger) {
      const text = trigger.getAttribute('data-tooltip') || trigger.getAttribute('title');
      if (!text || text.trim().length === 0) return;

      // Se o elemento usava atributo title nativo, remove para evitar tooltip duplicado do navegador
      if (trigger.hasAttribute('title')) {
        trigger._originalTitle = trigger.getAttribute('title');
        trigger.removeAttribute('title');
      }

      BcbTooltip.hide();

      activeTrigger = trigger;
      tooltipCounter++;
      const tooltipId = `bcb-tooltip-${tooltipCounter}`;

      const tooltip = document.createElement('div');
      tooltip.id = tooltipId;
      tooltip.className = 'bcb-tooltip';
      tooltip.setAttribute('role', 'tooltip');
      tooltip.textContent = text;

      document.body.appendChild(tooltip);
      currentTooltipElement = tooltip;

      // Associar semanticamente ao leitor de tela
      trigger.setAttribute('aria-describedby', tooltipId);

      const preferredPosition = trigger.getAttribute('data-tooltip-position') || 'top';
      BcbTooltip.position(trigger, tooltip, preferredPosition);

      // Forçar repaint e ativar classe
      requestAnimationFrame(() => {
        if (currentTooltipElement === tooltip) {
          tooltip.classList.add('is-visible', 'show');
        }
      });
    },

    hide: function () {
      if (activeTrigger) {
        if (activeTrigger._originalTitle) {
          activeTrigger.setAttribute('title', activeTrigger._originalTitle);
        }
        activeTrigger.removeAttribute('aria-describedby');
        activeTrigger = null;
      }

      if (currentTooltipElement) {
        const el = currentTooltipElement;
        el.classList.remove('is-visible', 'show');
        currentTooltipElement = null;
        setTimeout(() => {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }, 150);
      }
    },

    position: function (trigger, tooltip, position) {
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const margin = 8;

      let pos = position;
      let top = 0;
      let left = 0;

      // Inversão defensiva se vazar no topo
      if (pos === 'top' && triggerRect.top - tooltipRect.height - margin < 0) {
        pos = 'bottom';
      }

      if (pos === 'bottom') {
        top = triggerRect.bottom + scrollY + margin;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
      } else if (pos === 'left') {
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollX - tooltipRect.width - margin;
      } else if (pos === 'right') {
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollX + margin;
      } else { // top default
        top = triggerRect.top + scrollY - tooltipRect.height - margin;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
      }

      // Prevenir corte horizontal nas bordas da viewport
      if (left < 10) {
        left = 10;
      } else if (left + tooltipRect.width > viewportWidth - 10) {
        left = viewportWidth - tooltipRect.width - 10;
      }

      tooltip.className = `bcb-tooltip bcb-tooltip--${pos}`;
      tooltip.style.top = `${Math.round(top)}px`;
      tooltip.style.left = `${Math.round(left)}px`;
    }
  };

  window.BcbTooltip = BcbTooltip;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbTooltip.init());
  } else {
    BcbTooltip.init();
  }
})();
