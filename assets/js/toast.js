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

  const BcbToast = {
    show({
      title = 'Notificação',
      message = '',
      type = 'info', // 'success' | 'warning' | 'danger' | 'info'
      duration = 4000,
      containerId = DEFAULT_CONTAINER_ID
    } = {}) {
      const container = getOrCreateContainer(containerId);
      const toast = document.createElement('div');
      toast.className = `bcb-toast toast-${type}`;
      toast.setAttribute('role', type === 'danger' ? 'alert' : 'status');

      const iconName = ICONS_BY_TYPE[type] || 'info';

      toast.innerHTML = `
        <span class="material-icons bcb-toast-icon" aria-hidden="true">${iconName}</span>
        <div class="bcb-toast-body">
          <h5 class="bcb-toast-title">${title}</h5>
          ${message ? `<p class="bcb-toast-message">${message}</p>` : ''}
        </div>
        <button type="button" class="bcb-toast-close" aria-label="Fechar notificação">
          <span class="material-icons" aria-hidden="true">close</span>
        </button>
      `;

      container.appendChild(toast);

      function removeToast() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 250);
      }

      const closeBtn = toast.querySelector('.bcb-toast-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', removeToast);
      }

      if (duration > 0) {
        setTimeout(removeToast, duration);
      }

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
