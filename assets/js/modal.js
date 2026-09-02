/**
 * BCB Design System — Modal Acessível (Vanilla JS)
 * Gerencia ciclo de vida, focus-trap, fechamento via ESC/backdrop e conformidade WAI-ARIA.
 */

(function () {
  'use strict';

  let activeModal = null;
  let previousActiveElement = null;

  const FOCUSABLE_SELECTORS = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]'
  ].join(', ');

  function getFocusableElements(element) {
    return Array.from(element.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
      el => !el.hasAttribute('disabled') && el.offsetParent !== null
    );
  }

  function trapFocus(event) {
    if (!activeModal || event.key !== 'Tab') return;

    const focusable = getFocusableElements(activeModal);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape' && activeModal) {
      BcbModal.close(activeModal.id);
    }
  }

  const BcbModal = {
    open(modalId) {
      const modal = typeof modalId === 'string' ? document.getElementById(modalId.replace('#', '')) : modalId;
      if (!modal) return;

      previousActiveElement = document.activeElement;
      activeModal = modal;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('role', 'dialog');
      document.body.style.overflow = 'hidden';

      const focusable = getFocusableElements(modal);
      if (focusable.length > 0) {
        // Focar o primeiro elemento focável ou o botão de fechar
        const closeBtn = modal.querySelector('.bcb-modal-close, [data-dismiss="bcb-modal"]');
        if (closeBtn) {
          closeBtn.focus();
        } else {
          focusable[0].focus();
        }
      }

      document.addEventListener('keydown', trapFocus);
      document.addEventListener('keydown', handleKeyDown);

      // Evento customizado
      modal.dispatchEvent(new CustomEvent('bcb:modal:opened', { bubbles: true }));
    },

    close(modalId) {
      const modal = typeof modalId === 'string' ? document.getElementById(modalId.replace('#', '')) : modalId;
      if (!modal) return;

      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      document.removeEventListener('keydown', trapFocus);
      document.removeEventListener('keydown', handleKeyDown);

      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }

      activeModal = null;
      modal.dispatchEvent(new CustomEvent('bcb:modal:closed', { bubbles: true }));
    },

    init() {
      // Gatilhos de abertura
      document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-toggle="bcb-modal"], [data-bcb-modal-target]');
        if (trigger) {
          event.preventDefault();
          const target = trigger.getAttribute('data-target') || trigger.getAttribute('data-bcb-modal-target') || trigger.getAttribute('href');
          if (target) BcbModal.open(target);
        }

        // Gatilhos de fechamento
        const closeTrigger = event.target.closest('.bcb-modal-close, [data-dismiss="bcb-modal"]');
        if (closeTrigger) {
          event.preventDefault();
          const modal = closeTrigger.closest('.bcb-modal-backdrop, [role="dialog"]');
          if (modal) BcbModal.close(modal.id);
        }

        // Fechar ao clicar no backdrop (fora do diálogo)
        if (event.target.classList.contains('bcb-modal-backdrop') && event.target.classList.contains('active')) {
          BcbModal.close(event.target.id);
        }
      });
    }
  };

  window.BcbModal = BcbModal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbModal.init());
  } else {
    BcbModal.init();
  }
})();
