/**
 * BCB Design System — Live Studio & Visual Builder Engine
 * assets/js/builder-engine.js
 *
 * Motor de manipulação de nós, orquestração de drag-and-drop com SortableJS,
 * edição textual in-place anti-injeção e pipeline de exportação higienizada.
 */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else {
    root.BCBBuilderEngine = factory();
    root.BuilderStudio = root.BCBBuilderEngine; // Alias conveniente
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Configurações e Seletores
  const CONFIG = {
    overlayCssPath: '../assets/css/_builder-overlay.css',
    sortableJsPath: '../assets/js/vendor/sortable.min.js',
    dragHandleClass: 'studio-drag-handle',
    rowHandleClass: 'studio-row-handle',
    colHandleClass: 'studio-col-handle',
    componentHandleClass: 'studio-component-handle',
    draggableBlockClass: 'studio-draggable-block',
    draggableRowClass: 'studio-draggable-row',
    draggableColClass: 'studio-draggable-col',
    draggableComponentClass: 'studio-draggable-component',
    editingBodyClass: 'studio-editing',
    mainContentSelector: 'main#conteudo-principal, main.bcb-main-content, main',
    componentCandidateSelector: [
      '.card', '.bcb-card', '.gov-card', '.bcb-indicator-card',
      '.callout', '.bcb-callout',
      '.alert:not(.alert-list *)', '.bcb-alert',
      '.table-responsive',
      'blockquote.bcb-citacao', '.bcb-citacao',
      '.accordion > .card', '.accordion-item',
      '.bcb-carousel'
    ].join(', '),
    editableElementsSelector: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', '.lead',
      '.bcb-page-title', '.bcb-hero-title', '.bcb-hero-text',
      '.bcb-hero-banner__title', '.bcb-hero-banner__description',
      '.bcb-card-title', '.bcb-card-description',
      '.gov-card__title', '.gov-card__description',
      '.tag-bcb', '.badge',
      '.bcb-indicator-label', '.bcb-indicator-value', '.bcb-indicator-meta',
      '.bcb-callout-title', '.bcb-callout-description',
      '.bcb-callout p', '.bcb-alert-title', '.bcb-alert p',
      '.alert-list li', '.process-list li p', '.process-list li h3',
      '.bcb-stepper-title', '.bcb-stepper-desc',
      'cite', 'blockquote p',
      'th', 'td:not(.num-negative)'
    ].join(', '),
    excludedFromEditSelector: [
      '.studio-drag-handle',
      '.studio-drag-handle *',
      '.studio-row-handle',
      '.studio-row-handle *',
      '.studio-col-handle',
      '.studio-col-handle *',
      '.studio-component-handle',
      '.studio-component-handle *',
      '.bcb-back-to-top-wrapper',
      '.bcb-back-to-top-wrapper *',
      'svg', 'svg *',
      '.material-symbols-outlined',
      '.material-icons',
      'script', 'style'
    ].join(', ')
  };

  /**
   * Classe Principal do Motor do Builder
   */
  class BuilderEngine {
    constructor(options = {}) {
      this.options = Object.assign({
        iframe: null,
        onModeChange: null,
        onExport: null,
        onToast: null,
        onChange: null
      }, options);

      this.isEditing = true; // Inicia em modo edição por padrão
      this.sortableInstance = null;
      this.rowSortableInstances = [];
      this.columnSortableInstances = [];
      this.componentSortableInstances = [];
      this.targetWindow = null;
      this.targetDocument = null;
      this.cleanPasteBound = this.handleCleanPaste.bind(this);
      this.linkClickBound = this.handleLinkIntercept.bind(this);
      this.keydownBound = this.handleKeydown.bind(this);

      if (this.options.iframe) {
        this.bindIframe(this.options.iframe);
      }
    }

    /**
     * Vincula o engine a um <iframe>
     */
    bindIframe(iframe) {
      if (!iframe) return;
      this.iframe = iframe;

      const onIframeReady = () => {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          const win = iframe.contentWindow;
          if (doc && doc.body) {
            this.attachToDocument(doc, win);
          }
        } catch (err) {
          console.error('[BCBBuilderEngine] Erro ao acessar o iframe:', err);
        }
      };

      // Se o iframe já estiver carregado
      if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
        onIframeReady();
      }

      iframe.removeEventListener('load', iframe._bcbBuilderLoadHandler);
      iframe._bcbBuilderLoadHandler = onIframeReady;
      iframe.addEventListener('load', onIframeReady);
    }

    /**
     * Injeta dependências, prepara o DOM do alvo e inicia os listeners
     */
    attachToDocument(doc, win) {
      this.targetDocument = doc;
      this.targetWindow = win || window;

      // 1. Injetar a folha de apoio _builder-overlay.css
      this.injectOverlayStylesheet(doc);

      // 2. Garantir SortableJS no contexto do iframe
      this.ensureSortable(doc, win, () => {
        // 3. Descobrir seções, linhas, colunas e componentes e injetar handles
        this.setupDraggableBlocks(doc);
        this.setupDraggableRows(doc);
        this.setupDraggableColumns(doc);
        this.setupDraggableComponents(doc);

        // 4. Inicializar SortableJS em todos os níveis da hierarquia
        this.initSortable(doc, win);

        // 5. Configurar edição in-place
        this.setupInPlaceEditing(doc);

        // 6. Aplicar estado visual inicial do modo edição
        this.setEditMode(this.isEditing);
      });
    }

    /**
     * Injeta a folha de estilo _builder-overlay.css no iframe se não existir
     */
    injectOverlayStylesheet(doc) {
      if (!doc || !doc.head) return;
      const existingLink = doc.getElementById('studio-overlay-css');
      if (!existingLink) {
        const link = doc.createElement('link');
        link.id = 'studio-overlay-css';
        link.rel = 'stylesheet';
        link.href = CONFIG.overlayCssPath;
        doc.head.appendChild(link);
      }
    }

    /**
     * Garante a disponibilidade do SortableJS no escopo
     */
    ensureSortable(doc, win, callback) {
      const targetSortable = (win && win.Sortable) || window.Sortable;
      if (targetSortable) {
        if (callback) callback();
        return;
      }

      // Injetar script sortable.min.js no iframe
      const script = doc.createElement('script');
      script.id = 'studio-sortable-script';
      script.src = CONFIG.sortableJsPath;
      script.onload = () => {
        if (callback) callback();
      };
      script.onerror = () => {
        console.warn('[BCBBuilderEngine] Falha ao carregar Sortable local. Tentando fallback global...');
        if (window.Sortable) {
          if (win) win.Sortable = window.Sortable;
          if (callback) callback();
        }
      };
      doc.head.appendChild(script);
    }

    /**
     * 1. Descobre seções/organismos em <main> e injeta handles dedicados
     */
    setupDraggableBlocks(doc) {
      const main = doc.querySelector(CONFIG.mainContentSelector);
      if (!main) return;

      // Remover handles órfãos anteriores se houver
      const existingHandles = main.querySelectorAll(`.${CONFIG.dragHandleClass}`);
      existingHandles.forEach(h => h.remove());

      // Selecionar filhos diretos de main que representam blocos semânticos
      const children = Array.from(main.children);
      children.forEach((el, index) => {
        if (
          el.classList.contains('bcb-back-to-top-wrapper') ||
          el.tagName === 'SCRIPT' ||
          el.tagName === 'STYLE' ||
          el.classList.contains('studio-ui-injected')
        ) {
          return;
        }

        // Marcar como bloco arrastável
        el.classList.add(CONFIG.draggableBlockClass);
        el.setAttribute('data-studio-block', String(index + 1));

        // Injetar o handle dedicado (.studio-drag-handle) no trilho superior
        const handle = doc.createElement('button');
        handle.type = 'button';
        handle.className = CONFIG.dragHandleClass;
        handle.setAttribute('aria-label', `Arrastar para reorganizar seção ${index + 1}`);
        handle.setAttribute('title', 'Clique e arraste para reposicionar esta seção');
        handle.innerHTML = `
          <span class="material-symbols-outlined material-icons studio-drag-handle-icon" aria-hidden="true">drag_indicator</span>
          <span class="studio-drag-handle-label">Seção</span>
        `;

        handle.addEventListener('mousedown', (e) => e.stopPropagation());
        handle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
        });

        el.insertBefore(handle, el.firstChild);
      });
    }

    /**
     * 2. Descobre seções que contêm 2 ou mais linhas (.bcb-row / .row) e injeta handles dedicados
     */
    setupDraggableRows(doc) {
      const main = doc.querySelector(CONFIG.mainContentSelector);
      if (!main) return;

      const existingRowHandles = main.querySelectorAll(`.${CONFIG.rowHandleClass}`);
      existingRowHandles.forEach(h => h.remove());

      const containers = Array.from(main.children).filter(el => {
        return !el.classList.contains('bcb-back-to-top-wrapper') &&
               el.tagName !== 'SCRIPT' &&
               el.tagName !== 'STYLE' &&
               !el.classList.contains('studio-ui-injected');
      });

      containers.forEach(container => {
        const directRows = Array.from(container.children).filter(child => {
          return (child.classList.contains('bcb-row') || child.classList.contains('row')) &&
                 !child.classList.contains('studio-ui-injected') &&
                 child.tagName !== 'SCRIPT' &&
                 child.tagName !== 'STYLE';
        });

        // Habilitar reordenação de linha apenas se o container possuir 2 ou mais linhas irmãs
        if (directRows.length >= 2) {
          directRows.forEach((row, rowIndex) => {
            row.classList.add(CONFIG.draggableRowClass);
            row.setAttribute('data-studio-row', String(rowIndex + 1));

            const rowHandle = doc.createElement('button');
            rowHandle.type = 'button';
            rowHandle.className = CONFIG.rowHandleClass;
            rowHandle.setAttribute('aria-label', `Arrastar linha ${rowIndex + 1}`);
            rowHandle.setAttribute('title', 'Clique e arraste para reposicionar esta linha');
            rowHandle.innerHTML = `
              <span class="material-symbols-outlined material-icons studio-drag-handle-icon" aria-hidden="true">drag_indicator</span>
              <span class="studio-drag-handle-label">Linha</span>
            `;

            rowHandle.addEventListener('mousedown', (e) => e.stopPropagation());
            rowHandle.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
            });

            row.insertBefore(rowHandle, row.firstChild);
          });
        }
      });
    }

    /**
     * 3. Descobre linhas com 2 ou mais colunas e injeta handles de coluna dedicados
     */
    setupDraggableColumns(doc) {
      const main = doc.querySelector(CONFIG.mainContentSelector);
      if (!main) return;

      const existingColHandles = main.querySelectorAll(`.${CONFIG.colHandleClass}`);
      existingColHandles.forEach(h => h.remove());

      const rows = main.querySelectorAll('.bcb-row, .row');
      rows.forEach(row => {
        if (row.closest('table') || row.classList.contains('studio-ui-injected')) return;

        const cols = Array.from(row.children).filter(child => {
          return /(?:^|\s)(?:bcb-)?col(?:-|\s|$)/.test(child.className) &&
                 !child.classList.contains('studio-ui-injected') &&
                 child.tagName !== 'SCRIPT' &&
                 child.tagName !== 'STYLE';
        });

        // Habilitar arraste de coluna apenas se a linha possuir 2 ou mais colunas
        if (cols.length >= 2) {
          cols.forEach((col, colIndex) => {
            col.classList.add(CONFIG.draggableColClass);
            col.setAttribute('data-studio-col', String(colIndex + 1));

            const colHandle = doc.createElement('button');
            colHandle.type = 'button';
            colHandle.className = CONFIG.colHandleClass;
            colHandle.setAttribute('aria-label', `Arrastar coluna ${colIndex + 1}`);
            colHandle.setAttribute('title', 'Clique e arraste para reposicionar esta coluna');
            colHandle.innerHTML = `
              <span class="material-symbols-outlined material-icons studio-drag-handle-icon" aria-hidden="true">drag_indicator</span>
              <span class="studio-drag-handle-label">Coluna</span>
            `;

            colHandle.addEventListener('mousedown', (e) => e.stopPropagation());
            colHandle.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
            });

            col.insertBefore(colHandle, col.firstChild);
          });
        }
      });
    }

    /**
     * 4. Descobre containers com 2 ou mais componentes e injeta handles de componente dedicados
     */
    setupDraggableComponents(doc) {
      const main = doc.querySelector(CONFIG.mainContentSelector);
      if (!main) return;

      const existingCompHandles = main.querySelectorAll(`.${CONFIG.componentHandleClass}`);
      existingCompHandles.forEach(h => h.remove());

      const potentialContainers = main.querySelectorAll('[class*="col"], .accordion, .bcb-accordion, .card-deck, .card-group');

      potentialContainers.forEach(container => {
        const directChildren = Array.from(container.children).filter(child => {
          if (
            child.classList.contains('studio-ui-injected') ||
            child.tagName === 'SCRIPT' ||
            child.tagName === 'STYLE' ||
            child.classList.contains(CONFIG.colHandleClass) ||
            child.classList.contains(CONFIG.rowHandleClass) ||
            child.classList.contains(CONFIG.dragHandleClass)
          ) {
            return false;
          }
          return child.matches && child.matches(CONFIG.componentCandidateSelector);
        });

        // Habilitar reordenação de componentes se o container possuir 2 ou mais componentes irmãos
        if (directChildren.length >= 2) {
          directChildren.forEach((comp, compIndex) => {
            comp.classList.add(CONFIG.draggableComponentClass);
            comp.setAttribute('data-studio-component', String(compIndex + 1));

            const compHandle = doc.createElement('button');
            compHandle.type = 'button';
            compHandle.className = CONFIG.componentHandleClass;
            compHandle.setAttribute('aria-label', `Arrastar componente ${compIndex + 1}`);
            compHandle.setAttribute('title', 'Clique e arraste para reposicionar este componente');
            compHandle.innerHTML = `
              <span class="material-symbols-outlined material-icons studio-drag-handle-icon" aria-hidden="true">drag_indicator</span>
              <span class="studio-drag-handle-label">Componente</span>
            `;

            compHandle.addEventListener('mousedown', (e) => e.stopPropagation());
            compHandle.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
            });

            comp.insertBefore(compHandle, comp.firstChild);
          });
        }
      });
    }

    /**
     * Inicializa o SortableJS em todos os 4 níveis da hierarquia
     */
    initSortable(doc, win) {
      const main = doc.querySelector(CONFIG.mainContentSelector);
      if (!main) return;

      const SortableLib = (win && win.Sortable) || window.Sortable;
      if (!SortableLib) {
        console.error('[BCBBuilderEngine] Biblioteca SortableJS não disponível.');
        return;
      }

      // 1. Destruir instâncias anteriores
      if (this.sortableInstance) {
        try { this.sortableInstance.destroy(); } catch (e) {}
      }

      if (this.rowSortableInstances && this.rowSortableInstances.length > 0) {
        this.rowSortableInstances.forEach(inst => { try { inst.destroy(); } catch (e) {} });
      }
      this.rowSortableInstances = [];

      if (this.columnSortableInstances && this.columnSortableInstances.length > 0) {
        this.columnSortableInstances.forEach(inst => { try { inst.destroy(); } catch (e) {} });
      }
      this.columnSortableInstances = [];

      if (this.componentSortableInstances && this.componentSortableInstances.length > 0) {
        this.componentSortableInstances.forEach(inst => { try { inst.destroy(); } catch (e) {} });
      }
      this.componentSortableInstances = [];

      // 2. Nível 1: Sortable para Seções em <main>
      this.sortableInstance = SortableLib.create(main, {
        handle: `.${CONFIG.dragHandleClass}`,
        draggable: `.${CONFIG.draggableBlockClass}`,
        animation: 150,
        ghostClass: 'studio-sortable-ghost',
        chosenClass: 'studio-sortable-chosen',
        dragClass: 'studio-sortable-drag',
        filter: '.bcb-back-to-top-wrapper, script, style',
        preventOnFilter: true,
        disabled: !this.isEditing,
        onEnd: (evt) => {
          if (this.options.onChange) {
            this.options.onChange({
              type: 'reorder-section',
              oldIndex: evt.oldIndex,
              newIndex: evt.newIndex,
              item: evt.item
            });
          }
        }
      });

      // 3. Nível 2: Sortable para Linhas em containers com 2+ linhas
      const sectionContainers = Array.from(main.children);
      sectionContainers.forEach(container => {
        const hasDraggableRows = container.querySelector(`.${CONFIG.draggableRowClass}`);
        if (hasDraggableRows) {
          const rowSortable = SortableLib.create(container, {
            handle: `.${CONFIG.rowHandleClass}`,
            draggable: `.${CONFIG.draggableRowClass}`,
            animation: 150,
            ghostClass: 'studio-sortable-ghost',
            chosenClass: 'studio-sortable-chosen',
            dragClass: 'studio-sortable-drag',
            disabled: !this.isEditing,
            onEnd: (evt) => {
              if (this.options.onChange) {
                this.options.onChange({
                  type: 'reorder-row',
                  oldIndex: evt.oldIndex,
                  newIndex: evt.newIndex,
                  item: evt.item,
                  container: container
                });
              }
            }
          });
          this.rowSortableInstances.push(rowSortable);
        }
      });

      // 4. Nível 3: Sortable para Colunas em cada .bcb-row / .row com 2+ colunas
      const rows = main.querySelectorAll('.bcb-row, .row');
      rows.forEach(row => {
        const hasDraggableCols = row.querySelector(`.${CONFIG.draggableColClass}`);
        if (hasDraggableCols) {
          const colSortable = SortableLib.create(row, {
            handle: `.${CONFIG.colHandleClass}`,
            draggable: `.${CONFIG.draggableColClass}`,
            animation: 150,
            ghostClass: 'studio-sortable-ghost',
            chosenClass: 'studio-sortable-chosen',
            dragClass: 'studio-sortable-drag',
            disabled: !this.isEditing,
            onEnd: (evt) => {
              if (this.options.onChange) {
                this.options.onChange({
                  type: 'reorder-column',
                  oldIndex: evt.oldIndex,
                  newIndex: evt.newIndex,
                  item: evt.item,
                  row: row
                });
              }
            }
          });
          this.columnSortableInstances.push(colSortable);
        }
      });

      // 5. Nível 4: Sortable para Componentes em colunas ou containers com 2+ componentes
      const componentContainers = main.querySelectorAll('[class*="col"], .accordion, .bcb-accordion, .card-deck, .card-group');
      componentContainers.forEach(container => {
        const hasDraggableComponents = container.querySelector(`.${CONFIG.draggableComponentClass}`);
        if (hasDraggableComponents) {
          const compSortable = SortableLib.create(container, {
            handle: `.${CONFIG.componentHandleClass}`,
            draggable: `.${CONFIG.draggableComponentClass}`,
            group: 'studio-components',
            animation: 150,
            ghostClass: 'studio-sortable-ghost',
            chosenClass: 'studio-sortable-chosen',
            dragClass: 'studio-sortable-drag',
            disabled: !this.isEditing,
            onEnd: (evt) => {
              if (this.options.onChange) {
                this.options.onChange({
                  type: 'reorder-component',
                  oldIndex: evt.oldIndex,
                  newIndex: evt.newIndex,
                  item: evt.item,
                  from: evt.from,
                  to: evt.to
                });
              }
            }
          });
          this.componentSortableInstances.push(compSortable);
        }
      });
    }

    /**
     * Configura a edição in-place com contenteditable="plaintext-only" e sanitização de paste
     */
    setupInPlaceEditing(doc) {
      if (!doc) return;

      // Remover listeners anteriores para evitar duplicações
      doc.removeEventListener('paste', this.cleanPasteBound, true);
      doc.removeEventListener('click', this.linkClickBound, true);
      doc.removeEventListener('keydown', this.keydownBound, true);

      // Interceptar rigorosamente o evento @paste
      doc.addEventListener('paste', this.cleanPasteBound, true);

      // Interceptar cliques em links/botões no modo edição
      doc.addEventListener('click', this.linkClickBound, true);

      // Tratar teclas como Enter em títulos
      doc.addEventListener('keydown', this.keydownBound, true);

      this.updateEditableAttributes(doc);
    }

    /**
     * Atualiza os atributos contenteditable nos nós de texto do documento
     * Garante fidelidade 100% à versão renderizada sem desvios de layout ou espaços extras.
     */
    updateEditableAttributes(doc) {
      if (!doc) doc = this.targetDocument;
      if (!doc) return;

      const main = doc.querySelector(CONFIG.mainContentSelector);
      if (!main) return;

      const allCandidates = Array.from(main.querySelectorAll(CONFIG.editableElementsSelector));

      // Filtrar candidatos para evitar nós de edição aninhados (que causam desvios de layout no browser)
      const elements = allCandidates.filter(el => {
        if (el.closest(CONFIG.excludedFromEditSelector)) return false;

        // Se qualquer ancestral dentro de main também for um candidato elegível, não aninhe
        let parent = el.parentElement;
        while (parent && parent !== main) {
          if (allCandidates.includes(parent)) {
            return false;
          }
          parent = parent.parentElement;
        }
        return true;
      });

      elements.forEach(el => {
        if (this.isEditing) {
          el.setAttribute('contenteditable', 'true');
          el.setAttribute('spellcheck', 'false');
          el.setAttribute('data-studio-editable', 'true');
        } else {
          el.removeAttribute('contenteditable');
          el.removeAttribute('spellcheck');
          el.removeAttribute('data-studio-editable');
        }
      });
    }

    /**
     * Sanitizador estrito de @paste: extrai exclusivamente text/plain
     */
    handleCleanPaste(event) {
      if (!this.isEditing) return;

      const target = event.target;
      if (!target || !target.isContentEditable) return;

      event.preventDefault();
      event.stopPropagation();

      const clipboardData = event.clipboardData || (this.targetWindow && this.targetWindow.clipboardData);
      let text = '';
      if (clipboardData) {
        text = clipboardData.getData('text/plain') || '';
      }

      if (!text) return;

      // Normaliza quebras de linha múltiplas para evitar poluição tipográfica
      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

      const targetDoc = this.targetDocument || document;
      const targetWin = this.targetWindow || window;

      // Inserção limpa no cursor
      if (targetDoc.queryCommandSupported && targetDoc.queryCommandSupported('insertText')) {
        targetDoc.execCommand('insertText', false, text);
      } else {
        const selection = targetWin.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = targetDoc.createTextNode(text);
        range.insertNode(textNode);

        // Move o cursor para o final do texto inserido
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      if (this.options.onChange) {
        this.options.onChange({ type: 'paste', target });
      }
    }

    /**
     * Intercepta cliques durante o modo de edição para prevenir navegação
     */
    handleLinkIntercept(event) {
      if (!this.isEditing) return;

      // Se clicou em um link ou botão interativo
      const link = event.target.closest('a[href], button:not(.studio-drag-handle)');
      if (link && !link.classList.contains(CONFIG.dragHandleClass)) {
        // Se estiver focado para editar texto do próprio link, não navegue
        event.preventDefault();
      }
    }

    /**
     * Intercepta Enter em títulos/badges de linha única
     */
    handleKeydown(event) {
      if (!this.isEditing) return;

      const target = event.target;
      if (!target || !target.isContentEditable) return;

      const tagName = target.tagName.toLowerCase();
      const isSingleLine = /^(h[1-6]|span|th|strong|em)$/.test(tagName) ||
                           target.classList.contains('tag-bcb') ||
                           target.classList.contains('badge') ||
                           target.classList.contains('bcb-indicator-label') ||
                           target.classList.contains('bcb-indicator-value');

      if (event.key === 'Enter') {
        if (isSingleLine && !event.shiftKey) {
          event.preventDefault();
          target.blur(); // Finaliza a edição na linha
        }
      }
    }

    /**
     * Alterna entre Modo Edição (true) e Modo Pré-visualização (false)
     */
    setEditMode(enabled) {
      this.isEditing = Boolean(enabled);

      if (this.targetDocument && this.targetDocument.body) {
        this.targetDocument.body.classList.toggle(CONFIG.editingBodyClass, this.isEditing);
        this.updateEditableAttributes(this.targetDocument);
      }

      if (this.sortableInstance) {
        this.sortableInstance.option('disabled', !this.isEditing);
      }

      if (this.rowSortableInstances && this.rowSortableInstances.length > 0) {
        this.rowSortableInstances.forEach(inst => {
          try { inst.option('disabled', !this.isEditing); } catch (e) {}
        });
      }

      if (this.columnSortableInstances && this.columnSortableInstances.length > 0) {
        this.columnSortableInstances.forEach(inst => {
          try { inst.option('disabled', !this.isEditing); } catch (e) {}
        });
      }

      if (this.componentSortableInstances && this.componentSortableInstances.length > 0) {
        this.componentSortableInstances.forEach(inst => {
          try { inst.option('disabled', !this.isEditing); } catch (e) {}
        });
      }

      if (this.options.onModeChange) {
        this.options.onModeChange(this.isEditing);
      }
    }

    /**
     * Aplica o tema na página alvo (light, dark, high-contrast)
     */
    setTheme(themeKey) {
      if (!this.targetDocument) return;

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

      const docEl = this.targetDocument.documentElement;
      const body = this.targetDocument.body;

      if (docEl) {
        docEl.setAttribute('data-theme', themeAttr);
        docEl.setAttribute('data-contrast', contrastAttr);
      }
      if (body) {
        body.setAttribute('data-theme', themeAttr);
        body.setAttribute('data-contrast', contrastAttr);
      }
    }

    /**
     * ========================================================================
     * PIPELINE DE EXPORTAÇÃO E HIGIENIZAÇÃO DE HTML (5 ETAPAS)
     * ========================================================================
     */
    exportCleanHTML() {
      if (!this.targetDocument) {
        throw new Error('Documento alvo do builder não inicializado.');
      }

      // ETAPA 1: Clonar o DOM completo do palco de edição
      const cloneDocEl = this.targetDocument.documentElement.cloneNode(true);

      // ETAPA 2: Localizar e remover todos os elementos de interface do builder
      // 2.1 Remover handles de seções, linhas, colunas e componentes
      const handles = cloneDocEl.querySelectorAll(
        `.${CONFIG.dragHandleClass}, .${CONFIG.rowHandleClass}, .${CONFIG.colHandleClass}, .${CONFIG.componentHandleClass}`
      );
      handles.forEach(h => h.remove());

      // 2.2 Remover injected stylesheets/scripts do builder
      const overlayLink = cloneDocEl.querySelector('#studio-overlay-css');
      if (overlayLink) overlayLink.remove();

      const sortableScript = cloneDocEl.querySelector('#studio-sortable-script');
      if (sortableScript) sortableScript.remove();

      // 2.3 Remover qualquer container/overlay injetado
      const injectedUI = cloneDocEl.querySelectorAll('.studio-ui-injected, .studio-toolbar-injected');
      injectedUI.forEach(u => u.remove());

      // ETAPA 3: Remover todos os atributos dinâmicos e temporários
      const allElements = cloneDocEl.querySelectorAll('*');
      allElements.forEach(el => {
        // Remover atributos de edição
        el.removeAttribute('contenteditable');
        el.removeAttribute('spellcheck');
        el.removeAttribute('data-studio-editable');
        el.removeAttribute('data-studio-placeholder');
        el.removeAttribute('data-studio-block');
        el.removeAttribute('data-studio-row');
        el.removeAttribute('data-studio-col');
        el.removeAttribute('data-studio-component');

        // Remover classes do builder
        el.classList.remove(
          CONFIG.draggableBlockClass,
          CONFIG.draggableRowClass,
          CONFIG.draggableColClass,
          CONFIG.draggableComponentClass,
          CONFIG.editingBodyClass,
          'studio-sortable-ghost',
          'studio-sortable-chosen',
          'studio-sortable-drag',
          'sortable-ghost',
          'sortable-chosen',
          'sortable-drag'
        );

        // Remover atributos deixados pelo SortableJS
        el.removeAttribute('draggable');
        el.removeAttribute('data-id');

        // Se a classe ficou vazia após remoção, limpar o atributo class
        if (el.classList.length === 0 && el.hasAttribute('class')) {
          el.removeAttribute('class');
        }

        // Limpar atributos style deixados pelo SortableJS ou vazios
        if (el.hasAttribute('style')) {
          const styleVal = el.getAttribute('style');
          const cleanedStyle = styleVal
            .replace(/(?:will-change|transform|transition|cursor|-webkit-user-select|user-select)\s*:[^;]+;?/gi, '')
            .trim();
          if (cleanedStyle === '') {
            el.removeAttribute('style');
          } else {
            el.setAttribute('style', cleanedStyle);
          }
        }
      });

      // Limpar classes residuais no body do clone
      const cloneBody = cloneDocEl.querySelector('body');
      if (cloneBody) {
        cloneBody.classList.remove(CONFIG.editingBodyClass);
        if (cloneBody.classList.length === 0 && cloneBody.hasAttribute('class')) {
          cloneBody.removeAttribute('class');
        }
      }

      // ETAPA 4: Normalização estrutural e serialização HTML5
      const doctype = '<!DOCTYPE html>\n';
      let htmlString = doctype + cloneDocEl.outerHTML;

      // Normalizar quebras de linha e indentação
      htmlString = this.formatHTML(htmlString);

      // ETAPA 5: Retornar markup higienizado pronto para commit e testes
      return htmlString;
    }

    /**
     * Formatador/Identador leve para normalizar espaçamentos do HTML final
     */
    formatHTML(html) {
      if (!html) return '';

      // Preserva comentários de slots CMS canônicos
      // Remove linhas em branco excessivas consecutivas
      let formatted = html.replace(/(\r\n|\n|\r){3,}/g, '\n\n');

      // Garante fechamento limpo das tags estruturais
      formatted = formatted.trim() + '\n';
      return formatted;
    }

    /**
     * Validador em tempo real contra as regras de protótipos autônomos do BCB
     * Espelha as regras de tests/html/html-integrity.test.js e tests/prototipos/prototipos-lint.test.js
     */
    validateHTML(html) {
      const issues = [];
      const warnings = [];

      if (!html.trim().toLowerCase().startsWith('<!doctype html>')) {
        issues.push('DOCTYPE HTML5 ausente ou não é a primeira linha.');
      }
      if (!html.includes('lang="pt-BR"') && !html.includes("lang='pt-BR'")) {
        issues.push('Atributo lang="pt-BR" ausente no <html>.');
      }
      if (!html.toLowerCase().includes('charset="utf-8"')) {
        issues.push('Meta charset UTF-8 ausente.');
      }
      if (!html.includes('viewport')) {
        issues.push('Meta viewport ausente.');
      }

      // H1 único obrigatório (e-MAG 3.1)
      const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
      if (h1Count !== 1) {
        issues.push(`Quantidade inválida de <h1> (${h1Count}) — e-MAG 3.1 exige rigorosamente 1 H1.`);
      }

      // Main com id="conteudo-principal" e classe bcb-main-content
      if (!html.includes('id="conteudo-principal"')) {
        issues.push('Container <main id="conteudo-principal"> ausente.');
      }
      if (!html.includes('bcb-main-content')) {
        issues.push('Classe .bcb-main-content ausente em <main>.');
      }

      // Folha bcb-style.css e script bcb-ui.js
      if (!html.includes('bcb-style.css')) {
        issues.push('Folha oficial bcb-style.css ausente.');
      }
      if (!html.includes('bcb-ui.js')) {
        issues.push('Script oficial bcb-ui.js ausente.');
      }

      // Proibição de resíduos do builder
      if (html.includes('studio-drag-handle')) {
        issues.push('Resíduo de .studio-drag-handle detectado no HTML final.');
      }
      if (html.includes('studio-row-handle')) {
        issues.push('Resíduo de .studio-row-handle detectado no HTML final.');
      }
      if (html.includes('studio-col-handle')) {
        issues.push('Resíduo de .studio-col-handle detectado no HTML final.');
      }
      if (html.includes('studio-component-handle')) {
        issues.push('Resíduo de .studio-component-handle detectado no HTML final.');
      }
      if (html.includes('contenteditable')) {
        issues.push('Resíduo de contenteditable detectado no HTML final.');
      }
      if (html.includes('_builder-overlay.css')) {
        issues.push('Referência a _builder-overlay.css detectada no HTML final.');
      }

      // Remover comentários HTML para evitar falsos positivos em slots CMS canônicos
      const cleanMarkup = html.replace(/<!--[\s\S]*?-->/g, '');

      // Proibição de casca fixa
      if (cleanMarkup.includes('id="barra-brasil"')) {
        issues.push('Barra Brasil detectada — cascas fixas são providas pelo portal.');
      }
      if (cleanMarkup.match(/<header[\s>]/gi)) {
        issues.push('Tag <header> detectada em protótipo autônomo.');
      }
      if (cleanMarkup.match(/<footer[\s>]/gi)) {
        issues.push('Tag <footer> detectada em protótipo autônomo.');
      }
      if (cleanMarkup.includes('breadcrumb') || cleanMarkup.match(/<nav[^>]*aria-label=["'][^"']*(?:trilha|breadcrumb)/gi)) {
        issues.push('Breadcrumb detectado — cascas fixas são providas pelo portal.');
      }

      // Links proibidos
      const linksProibidos = html.match(/>\s*(clique aqui|saiba mais|leia mais|mais)\s*</gi) || [];
      if (linksProibidos.length > 0) {
        issues.push(`${linksProibidos.length} link(s) com texto não descritivo proibido ("clique aqui", "saiba mais").`);
      }

      return {
        isValid: issues.length === 0,
        issues,
        warnings
      };
    }

    /**
     * Faz download do HTML limpo com nome sugerido
     */
    downloadHTML(filename, htmlContent) {
      if (!htmlContent) htmlContent = this.exportCleanHTML();
      if (!filename) filename = 'prototipo-editado.html';

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }

    /**
     * Copia o HTML limpo para a área de transferência
     */
    async copyToClipboard(htmlContent) {
      if (!htmlContent) htmlContent = this.exportCleanHTML();

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(htmlContent);
          return true;
        } else {
          // Fallback para navegadores legados
          const textarea = document.createElement('textarea');
          textarea.value = htmlContent;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          const success = document.execCommand('copy');
          document.body.removeChild(textarea);
          return success;
        }
      } catch (err) {
        console.error('[BCBBuilderEngine] Erro ao copiar para o clipboard:', err);
        return false;
      }
    }
  }

  return {
    Engine: BuilderEngine,
    create: (options) => new BuilderEngine(options),
    CONFIG
  };
});
