/**
 * BCB Design System — Navegação em Abas (Vanilla JS)
 * Suporte a chanfro angular, navegação por teclado (ArrowLeft/Right, Home/End) e WAI-ARIA Tabs Pattern.
 */

(function () {
  'use strict';

  function activateTab(tabElement) {
    if (!tabElement || tabElement.getAttribute('aria-selected') === 'true') return;

    const tabList = tabElement.closest('[role="tablist"], .nav-tabs');
    if (!tabList) return;

    const targetSelector = tabElement.getAttribute('href') || tabElement.getAttribute('data-target');
    if (!targetSelector) return;

    const targetPanel = document.querySelector(targetSelector);

    // Desativar todas as abas no mesmo tablist
    const allTabs = Array.from(tabList.querySelectorAll('[role="tab"], [data-toggle="tab"], .nav-link'));
    allTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });

    // Ativar a aba selecionada
    tabElement.classList.add('active');
    tabElement.setAttribute('aria-selected', 'true');
    tabElement.removeAttribute('tabindex');

    // Desativar painéis irmãos
    if (targetPanel) {
      const tabContent = targetPanel.closest('.tab-content');
      if (tabContent) {
        Array.from(tabContent.querySelectorAll('.tab-pane')).forEach(p => {
          p.classList.remove('active', 'show');
        });
      }
      targetPanel.classList.add('active', 'show');
    }

    tabElement.dispatchEvent(new CustomEvent('bcb:tab:change', {
      bubbles: true,
      detail: { tab: tabElement, panel: targetPanel }
    }));
  }

  function handleKeydown(event) {
    const tab = event.target.closest('[role="tab"], .nav-tabs .nav-link');
    if (!tab) return;

    const tabList = tab.closest('[role="tablist"], .nav-tabs');
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"], .nav-tabs .nav-link'));
    const index = tabs.indexOf(tab);
    if (index === -1) return;

    let targetTab = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        targetTab = tabs[(index + 1) % tabs.length];
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        targetTab = tabs[(index - 1 + tabs.length) % tabs.length];
        break;
      case 'Home':
        event.preventDefault();
        targetTab = tabs[0];
        break;
      case 'End':
        event.preventDefault();
        targetTab = tabs[tabs.length - 1];
        break;
    }

    if (targetTab) {
      targetTab.focus();
      activateTab(targetTab);
    }
  }

  const BcbTabs = {
    init() {
      const tabLists = document.querySelectorAll('.bcb-navegacaoabas, .nav-tabs, [role="tablist"]');
      if (tabLists.length === 0) return;

      // Escutar cliques em abas
      document.addEventListener('click', (event) => {
        const tab = event.target.closest('[role="tab"], .bcb-navegacaoabas .nav-link, .nav-tabs .nav-link[data-toggle="tab"]');
        if (tab) {
          event.preventDefault();
          activateTab(tab);
        }
      });

      // Escutar navegação por teclado
      document.addEventListener('keydown', handleKeydown);

      // Garantir atributos ARIA iniciais se ausentes
      document.querySelectorAll('.bcb-navegacaoabas, .nav-tabs, [role="tablist"]').forEach((tabList, listIndex) => {
        if (!tabList.hasAttribute('role')) tabList.setAttribute('role', 'tablist');
        
        const tabs = Array.from(tabList.querySelectorAll('.nav-link, [role="tab"]'));
        tabs.forEach((tab, tabIndex) => {
          if (!tab.hasAttribute('role')) tab.setAttribute('role', 'tab');
          if (!tab.id) tab.id = `bcb-tab-${listIndex}-${tabIndex}`;

          const isActive = tab.classList.contains('active');
          tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
          tab.setAttribute('tabindex', isActive ? '0' : '-1');

          const targetSelector = tab.getAttribute('href') || tab.getAttribute('data-target');
          if (targetSelector && targetSelector.startsWith('#')) {
            const panel = document.querySelector(targetSelector);
            if (panel) {
              tab.setAttribute('aria-controls', panel.id);
              if (!panel.hasAttribute('role')) panel.setAttribute('role', 'tabpanel');
              if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '0');
              panel.setAttribute('aria-labelledby', tab.id);
            }
          }
        });
      });
    }
  };

  window.BcbTabs = BcbTabs;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbTabs.init());
  } else {
    BcbTabs.init();
  }
})();
