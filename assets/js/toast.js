/**
 * BCB Design System — Toast Notifications (Vanilla JS)
 * Gerencia notificações flutuantes com auto-dismiss, animação e conformidade WAI-ARIA live region.
 */

(function () {
  'use strict';

  const DEFAULT_CONTAINER_ID = 'bcb-toast-container';

  function getOrCreateContainer(containerId = DEFAULT_CONTAINER_ID) {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.className = 'bcb-toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    return container;
  }

  const ICONS_BY_TYPE = {
    success: 'check_circle',
    warning: 'warning',
    danger: 'error',
    info: 'info'
  };

  const MAX_VISIBLE_TOASTS = 5;

  const BcbToast = {
    show({
      title = 'Notificação',
      message = '',
      type = 'info', // 'success' | 'warning' | 'danger' | 'info'
      duration = 4000,
      containerId = DEFAULT_CONTAINER_ID
    } = {}) {
      const container = getOrCreateContainer(containerId);

      // Controle de empilhamento (Stacking): remover o mais antigo se exceder o limite
      const currentToasts = container.querySelectorAll('.bcb-toast:not(.bcb-toast--leaving)');
      if (currentToasts.length >= MAX_VISIBLE_TOASTS) {
        const oldestToast = currentToasts[0];
        if (oldestToast._removeToast) {
          oldestToast._removeToast();
        }
      }

      const toast = document.createElement('div');
      toast.className = `bcb-toast toast-${type}`;
      toast.setAttribute('role', type === 'danger' ? 'alert' : 'status');

      const iconName = ICONS_BY_TYPE[type] || 'info';

      toast.innerHTML = `
        <span class="material-symbols-outlined material-icons bcb-toast-icon" aria-hidden="true">${iconName}</span>
        <div class="bcb-toast-body">
          <h5 class="bcb-toast-title">${title}</h5>
          ${message ? `<p class="bcb-toast-message">${message}</p>` : ''}
        </div>
        <button type="button" class="bcb-toast-close" aria-label="Fechar notificação">
          <span class="material-symbols-outlined material-icons" aria-hidden="true">close</span>
        </button>
      `;

      container.appendChild(toast);

      let dismissTimeout = null;
      let remainingTime = duration;
      let startTime = Date.now();

      function removeToast() {
        if (toast.classList.contains('bcb-toast--leaving')) return;
        toast.classList.add('bcb-toast--leaving');
        clearTimeout(dismissTimeout);
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }

      toast._removeToast = removeToast;

      function startTimer() {
        if (duration > 0 && remainingTime > 0) {
          startTime = Date.now();
          dismissTimeout = setTimeout(removeToast, remainingTime);
        }
      }

      function pauseTimer() {
        clearTimeout(dismissTimeout);
        const elapsed = Date.now() - startTime;
        remainingTime = Math.max(0, remainingTime - elapsed);
      }

      // Pausar auto-dismiss quando o usuário passar o mouse por cima
      toast.addEventListener('mouseenter', pauseTimer);
      toast.addEventListener('mouseleave', startTimer);

      const closeBtn = toast.querySelector('.bcb-toast-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeToast();
        });
      }

      startTimer();

      return toast;
    },

    init() {
      const toastTriggers = document.querySelectorAll('[data-bcb-toast], .bcb-toast, .bcb-toast-container');
      if (toastTriggers.length === 0) return;

      // Escutar cliques em gatilhos data-bcb-toast
      document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-bcb-toast]');
        if (trigger) {
          event.preventDefault();
          const title = trigger.getAttribute('data-toast-title') || 'Notificação';
          const message = trigger.getAttribute('data-toast-message') || '';
          const type = trigger.getAttribute('data-toast-type') || 'info';
          const duration = parseInt(trigger.getAttribute('data-toast-duration') || '4000', 10);
          BcbToast.show({ title, message, type, duration });
        }
      });
    }
  };

  window.BcbToast = BcbToast;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbToast.init());
  } else {
    BcbToast.init();
  }
})();
