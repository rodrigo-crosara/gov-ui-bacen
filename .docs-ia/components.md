# BCB UI – Components Library (Enterprise v2.0)

> **Status**: v2.0 (Auditoria Enterprise & Automação por IA — Mar/2026).
> Este documento é a especificação canônica de todos os componentes de interface do Banco Central do Brasil.
> Toda IA ou desenvolvedor deve seguir rigorosamente as assinaturas HTML, variantes válidas e diretrizes de **"O que fazer (Do)"** e **"O que não fazer (Don't)"**.

---

## Sumário de Componentes

1. [Botões (Buttons)](#1-botões-buttons)
2. [Links e Âncoras](#2-links-e-âncoras)
3. [Iconografia (Material Icons)](#3-iconografia-material-icons)
4. [Breadcrumbs Acessíveis](#4-breadcrumbs-acessíveis-bcb-breadcrumb-nav)
5. [Menu de Âncoras / Sidebar TOC](#5-menu-de-âncoras--sidebar-toc)
6. [Callouts e Alertas Estruturados](#6-callouts-e-alertas-estruturados)
7. [Tip Box (Dica Educativa)](#7-tip-box-dica-educativa)
8. [Citações e Testemunhos (Blockquotes)](#8-citações-e-testemunhos-blockquotes)
9. [Tags e Badges](#9-tags-e-badges)
10. [Process List (Passo a Passo)](#10-process-list-passo-a-passo)
11. [Stepper (Indicador de Etapas)](#11-stepper-indicador-de-etapas)
12. [Controles de Formulário e Validação](#12-controles-de-formulário-e-validação)
13. [Filtros e Busca Facetada](#13-filtros-e-busca-facetada)
14. [Data Table Responsiva (Séries e Taxas)](#14-data-table-responsiva-séries-e-taxas)
15. [Modais e Diálogos Acessíveis](#15-modais-e-diálogos-acessíveis)
16. [Alertas e Toast Notifications](#16-alertas-e-toast-notifications)
17. [Navegação em Abas (Tabs)](#17-navegação-em-abas-tabs)
18. [Accordions (Sanfonas Expansíveis)](#18-accordions-sanfonas-expansíveis)
19. [Cards de Links Rápidos (Listalinks)](#19-cards-de-links-rápidos-listalinks)
20. [Cards de Indicadores Econômicos](#20-cards-de-indicadores-econômicos)
21. [Download de Documentos](#21-download-de-documentos)
22. [Hero Banner Institucional](#22-hero-banner-institucional)
23. [Timeline Educativa (Storytelling)](#23-timeline-educativa-storytelling)
24. [Timeline Horizontal (Fases de Projeto)](#24-timeline-horizontal-fases-de-projeto)
25. [Carrossel de Vídeos](#25-carrossel-de-vídeos)
26. [Bloco de Transição Narrativa](#26-bloco-de-transição-narrativa)
27. [Botão Voltar ao Topo](#27-botão-voltar-ao-topo)
28. [Paginação e Tooltips de Glossário](#28-paginação-e-tooltips-de-glossário)
29. [Bloco de Métricas / KPI Card Financeiro](#30-bloco-de-métricas--kpi-card-financeiro-bcb-kpi-card)
30. [Barra de Utilidades da Página](#31-barra-de-utilidades-da-página-bcb-page-toolbar)
31. [Citação Institucional e Destaque Normativo](#32-citação-institucional-e-destaque-normativo-bcb-quote)
32. [Alertas Inline de Validação](#33-alertas-inline-de-validação-bcb-alert)

---

## 1. Botões (Buttons)

Botões são usados exclusivamente para **ações** (Call to Action - CTA), como enviar formulários, abrir modais, confirmar dados ou disparar eventos.

### Assinatura HTML Canônica
```html
<!-- Ação Primária -->
<button type="button" class="btn btn-primary">
  Salvar alterações
</button>

<!-- Ação Secundária com Ícone -->
<button type="button" class="btn btn-secondary d-inline-flex align-items-center">
  <span class="material-icons mr-1" aria-hidden="true">file_download</span>
  Exportar dados
</button>

<!-- Ação Alternativa / Outline -->
<button type="button" class="btn btn-outline-primary">
  Voltar
</button>

<!-- Ação Crítica / Perigo -->
<button type="button" class="btn btn-danger">
  Excluir chave
</button>

<!-- Botão de Ação Apenas com Ícone -->
<button type="button" class="btn btn-primary btn-icon" aria-label="Pesquisar registros">
  <span class="material-icons" aria-hidden="true">search</span>
</button>
```

### Variantes Válidas
- **Cores**: `.btn-primary` (Azul BCB), `.btn-secondary` (Azul Cinti), `.btn-outline-primary` (Contorno azul), `.btn-danger` (Marsala / Ação Crítica), `.btn-link` (Sem moldura).
- **Tamanhos**: `.btn-sm` (tabelas e ações densas), regular (padrão 40px), `.btn-lg` (conversão e hero).
- **Modificadores**: `.btn-block` (largura total 100%), `.btn-icon` (botão quadrado para ícone isolado com `aria-label`).

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Use `<button type="button">` ou `<button type="submit">` para ações na mesma tela. | NUNCA use `<button>` para navegar para outra página (use `<a>`). |
| Sempre defina texto claro iniciado por verbo no infinitivo ("Emitir certidão"). | NUNCA crie botões apenas com ícone sem `aria-label` descritivo. |
| Use `.btn-primary` apenas UMA vez por bloco principal de ações. | NUNCA aplique múltiplos botões primários competindo visualmente. |

---

## 2. Links e Âncoras

Links (`<a>`) são usados para navegação entre páginas, download de arquivos ou âncoras internas.

### Assinatura HTML Canônica
```html
<!-- Link Interno Padrão -->
<a href="/estabilidade-financeira" class="text-link">Consulte a agenda de estabilidade financeira</a>

<!-- Link Externo com Abertura em Nova Aba -->
<a href="https://www.gov.br" target="_blank" rel="noopener noreferrer" class="text-link" aria-label="Portal Gov.br (abre em nova aba)">
  Portal Gov.br
  <span class="material-icons md-18 align-middle" aria-hidden="true">open_in_new</span>
</a>

<!-- Link de Download com Formato e Tamanho -->
<a href="relatorio-inflacao.pdf" class="text-link" aria-label="Baixar Relatório de Inflação (PDF, 3.2 MB)">
  Relatório de Inflação (PDF, 3.2 MB)
  <span class="material-icons md-18 align-middle" aria-hidden="true">download</span>
</a>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Sempre inclua o formato e o tamanho em links de download `(PDF, 1.5 MB)`. | NUNCA use textos vazios como "clique aqui", "saiba mais" ou "leia mais" (WCAG 2.4.4). |
| Sempre use `target="_blank" rel="noopener noreferrer"` para links externos com `aria-label`. | NUNCA use `<br>` para empilhar links (use `<ul class="list-unstyled">`). |

---

## 3. Iconografia (Material Icons)

Utilize os ícones da biblioteca Google Material Icons.

Utilize a biblioteca **Google Material Icons** (Filled ou Outlined).

### Assinatura HTML Canônica
```html
<!-- Ícone Decorativo (Acompanha Texto) -->
<span class="material-icons" aria-hidden="true">account_balance</span>

<!-- Ícone Funcional (Sem Texto — Exige aria-label no container) -->
<button type="button" class="btn btn-icon" aria-label="Pesquisar">
  <span class="material-icons" aria-hidden="true">search</span>
</button>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Sempre inclua `aria-hidden="true"` em ícones que acompanham texto. | NUNCA use ícone sozinho sem `aria-label` no elemento pai clicável. |

---

## 4. Breadcrumbs Acessíveis (.bcb-breadcrumb-nav)

Trilha de navegação estrutural hierárquica oficial, permitindo ao cidadão compreender sua localização na árvore do portal e retornar aos níveis superiores.

### Assinatura HTML Canônica
```html
<nav aria-label="Trilha de navegação" class="bcb-breadcrumb-nav">
  <ol class="breadcrumb bcb-breadcrumb">
    <li class="breadcrumb-item">
      <a href="/"><span class="material-symbols-outlined material-icons bcb-breadcrumb-icon" aria-hidden="true">home</span> Início</a>
    </li>
    <li class="breadcrumb-item"><a href="/estabilidade-financeira">Estabilidade Financeira</a></li>
    <li class="breadcrumb-item active" aria-current="page">Taxa Selic e Copom</li>
  </ol>
</nav>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Sempre use `<nav aria-label="Trilha de navegação" class="bcb-breadcrumb-nav">`. | NUNCA omita `aria-label` na tag `<nav>` de navegação. |
| Use `<li class="breadcrumb-item active" aria-current="page">` no último item. | NUNCA coloque link no item ativo/página atual. |
| Utilize o separador visual automático via CSS (`chevron_right`). | NUNCA digite caracteres manuais como `>` ou `/` no HTML. |

---

## 5. Menu de Âncoras / Sidebar TOC

Menu lateral sticky para navegação interna em páginas longas.

### Assinatura HTML Canônica
```html
<aside class="bd-sidebar">
  <div class="bd-toc">
    <strong>Nesta página</strong>
    <nav aria-label="Navegação interna de seções" class="bd-links">
      <ul class="list-unstyled mb-0">
        <li><a href="#visao-geral" class="active">1. Visão Geral</a></li>
        <li><a href="#como-solicitar">2. Como Solicitar</a></li>
        <li><a href="#perguntas-frequentes">3. Perguntas Frequentes</a></li>
      </ul>
    </nav>
  </div>
</aside>
```

---

## 6. Callouts e Alertas Estruturados

Substitui o antigo `.bcb-olho`. Utilizado para destaques, avisos operacionais, normativos e orientações críticas.

### Assinatura HTML Canônica
```html
<div class="callout callout-brand callout-left-bordered">
  <span class="material-icons callout-icon" aria-hidden="true">info</span>
  <div class="callout-content">
    <h3 class="callout-title">Comunicado Importante</h3>
    <p>O Banco Central não envia e-mails solicitando confirmação de dados bancários ou senhas.</p>
  </div>
</div>
```

### Variantes Semânticas
- `.callout-brand`: Informativo / institucional (Azul).
- `.callout-success`: Confirmação / regra atendida (Verde).
- `.callout-warning`: Atenção / prazo / cuidado (Âmbar).
- `.callout-danger`: Erro / proibição / risco de fraude (Marsala).
- `.callout-neutral`: Curiosidade / nota neutra (Cinza).

### Estruturas
- `.callout-left-bordered`: Borda grossa à esquerda (padrão).
- `.callout-outline`: Contorno fechado com fundo branco.
- `.callout-elevated`: Elevação com sombra suave.

---

## 7. Tip Box (Dica Educativa)

Utilizado exclusivamente em materiais de educação e cidadania financeira.

### Assinatura HTML Canônica
```html
<div class="tip-box">
  <p class="mb-0">
    <strong>Dica Financeira:</strong> Organize seu orçamento mensal antes de contratar qualquer linha de crédito.
  </p>
</div>
```

---

## 8. Citações e Testemunhos (Blockquotes)

Destaca falas de autoridades, diretoria ou trechos de legislação.

### Assinatura HTML Canônica
```html
<blockquote class="bcb-citacao">
  <p class="mb-0">"A estabilidade de preços é o alicerce fundamental para o crescimento sustentável do país."</p>
  <footer class="blockquote-footer">Presidente do Banco Central do Brasil</footer>
</blockquote>
```

---

## 9. Tags e Badges

Identificam status, categorias de conteúdo ou tipos de documento.

### Assinatura HTML Canônica
```html
<span class="tag-bcb">Normativo</span>
<span class="tag-bcb primary">Em vigor</span>
<span class="tag-bcb">Comunicado Copom</span>
```

---

## 10. Process List (Passo a Passo)

Para fluxos lineares simples de 3 a 5 etapas.

### Assinatura HTML Canônica
```html
<ol class="process-list">
  <li>
    <h3 class="h5 mt-0 mb-1 color-1">Acesse o sistema Registrato</h3>
    <p class="text-body small mb-0">Faça login seguro com sua conta gov.br de nível prata ou ouro.</p>
  </li>
  <li>
    <h3 class="h5 mt-0 mb-1 color-1">Selecione o relatório desejado</h3>
    <p class="text-body small mb-0">Escolha entre chaves Pix, contas bancárias ou operações de crédito.</p>
  </li>
  <li>
    <h3 class="h5 mt-0 mb-1 color-1">Gere o documento</h3>
    <p class="text-body small mb-0">Baixe o relatório em formato PDF autenticado.</p>
  </li>
</ol>
```

---

## 11. Stepper (Indicador de Etapas)

Usado no topo de formulários multi-etapas (Wizards).

### Assinatura HTML Canônica
```html
<ul class="bcb-stepper" aria-label="Progresso do formulário">
  <li class="bcb-stepper-item completed">
    <div class="bcb-stepper-circle">
      <span class="material-icons md-18" aria-hidden="true">check</span>
    </div>
    <span class="bcb-stepper-title">1. Identificação</span>
  </li>
  <li class="bcb-stepper-item active" aria-current="step">
    <div class="bcb-stepper-circle">2</div>
    <span class="bcb-stepper-title">2. Solicitação</span>
  </li>
  <li class="bcb-stepper-item">
    <div class="bcb-stepper-circle">3</div>
    <span class="bcb-stepper-title">3. Confirmação</span>
  </li>
</ul>
```

---

## 12. Controles de Formulário e Validação

Inputs acessíveis com rótulos conectados por `for`/`id` e feedback de validação.

### Assinatura HTML Canônica
```html
<!-- Campo com Validação Válida -->
<div class="form-group">
  <label for="inputCPF">CPF do Solicitante <span class="text-danger">*</span></label>
  <input type="text" class="form-control is-valid" id="inputCPF" aria-describedby="feedbackCPF" required>
  <div id="feedbackCPF" class="valid-feedback">CPF validado com sucesso na base cadastral.</div>
</div>

<!-- Campo com Validação Inválida -->
<div class="form-group">
  <label for="inputEmail">E-mail Institucional <span class="text-danger">*</span></label>
  <input type="email" class="form-control is-invalid" id="inputEmail" aria-invalid="true" aria-describedby="feedbackEmail" required>
  <div id="feedbackEmail" class="invalid-feedback">Informe um endereço de e-mail válido.</div>
</div>

<!-- Campo Desabilitado -->
<div class="form-group">
  <label for="inputBloqueado">Número de Protocolo</label>
  <input type="text" class="form-control" id="inputBloqueado" value="2026-BCB-12345" disabled aria-disabled="true">
</div>

<!-- Switch Toggle -->
<div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="switchNotificacoes">
  <label class="custom-control-label" for="switchNotificacoes">Receber comunicados diários do Copom</label>
</div>
```

---

## 13. Filtros e Busca Facetada

Painel para busca refinada com múltiplos critérios simultâneos.

### Assinatura HTML Canônica
```html
<div class="bcb-filter-panel" role="region" aria-label="Filtros de pesquisa">
  <div class="bcb-filter-panel-header">
    <h3 class="bcb-filter-panel-title">
      <span class="material-icons" aria-hidden="true">filter_alt</span> Filtros
    </h3>
  </div>

  <!-- Grupo: Período -->
  <div class="bcb-filter-group">
    <label class="bcb-filter-label" for="dataInicio">Período de Publicação</label>
    <div class="bcb-date-range">
      <input type="date" class="form-control" id="dataInicio" aria-label="Data inicial">
      <span class="bcb-date-separator" aria-hidden="true">até</span>
      <input type="date" class="form-control" id="dataFim" aria-label="Data final">
    </div>
  </div>

  <!-- Grupo: Tipo de Ato -->
  <div class="bcb-filter-group">
    <span class="bcb-filter-label">Tipo de Normativo</span>
    <div class="custom-control custom-checkbox mb-2">
      <input type="checkbox" class="custom-control-input" id="filtroResolucao" checked>
      <label class="custom-control-label" for="filtroResolucao">Resoluções BCB</label>
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="filtroInstrucao">
      <label class="custom-control-label" for="filtroInstrucao">Instruções Normativas</label>
    </div>
  </div>

  <!-- Barra de Filtros Ativos -->
  <div class="bcb-active-filters" aria-label="Filtros ativos selecionados">
    <span class="bcb-active-filters-label">Ativos:</span>
    <span class="bcb-filter-chip">
      Resoluções BCB
      <button type="button" class="chip-remove-btn" aria-label="Remover filtro Resoluções BCB">
        <span class="material-icons" aria-hidden="true">close</span>
      </button>
    </span>
    <button type="button" class="bcb-clear-all-filters">Limpar todos</button>
  </div>
</div>
```

---

## 14. Data Table Responsiva (Séries e Taxas)

Tabela avançada para séries temporais, metas Selic e cotações com ordenação e paginação.

### Assinatura HTML Canônica
```html
<div class="bcb-data-table-container">
  <div class="bcb-data-table-header">
    <div>
      <h3 class="bcb-data-table-title">Histórico de Metas da Taxa Selic</h3>
      <div class="bcb-data-table-subtitle">Decisões do Comitê de Política Monetária (Copom)</div>
    </div>
    <div class="bcb-data-table-actions">
      <button type="button" class="btn btn-outline-primary btn-sm d-inline-flex align-items-center">
        <span class="material-icons mr-1" aria-hidden="true">file_download</span> CSV
      </button>
    </div>
  </div>

  <div class="table-responsive">
    <table class="bcb-data-table">
      <caption>Série temporal oficial de metas da taxa Selic definidas nas reuniões do Copom.</caption>
      <thead>
        <tr>
          <th scope="col" class="sortable" aria-sort="descending" tabindex="0">
            Reunião <span class="material-icons sort-icon" aria-hidden="true">arrow_upward</span>
          </th>
          <th scope="col" class="sortable" tabindex="0">
            Data Copom <span class="material-icons sort-icon" aria-hidden="true">sort</span>
          </th>
          <th scope="col" class="text-numeric sortable" tabindex="0">
            Meta Selic (% a.a.) <span class="material-icons sort-icon" aria-hidden="true">sort</span>
          </th>
          <th scope="col" class="text-center">Variação</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">268ª Reunião</th>
          <td>12/03/2026</td>
          <td class="text-numeric"><strong>14,25%</strong></td>
          <td class="text-center">
            <span class="bcb-trend-badge positive">
              <span class="material-icons md-18" aria-hidden="true">arrow_upward</span> +1,00 p.p.
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">267ª Reunião</th>
          <td>29/01/2026</td>
          <td class="text-numeric"><strong>13,25%</strong></td>
          <td class="text-center">
            <span class="bcb-trend-badge neutral">0,00 p.p.</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Rodapé com Paginação -->
  <div class="bcb-table-pagination">
    <span>Exibindo 1 a 10 de 268 registros</span>
    <nav aria-label="Paginação da tabela">
      <ul class="pagination pagination-sm">
        <li class="page-item disabled"><a class="page-link" href="#">Anterior</a></li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">Próximo</a></li>
      </ul>
    </nav>
  </div>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Alinhe valores numéricos e monetários rigorosamente à direita (`.text-numeric`). | NUNCA alinhe números financeiros à esquerda em tabelas. |
| Forneça sempre `<caption>` descritivo e `<th scope="col">`/`<th scope="row">`. | NUNCA crie tabelas sem marcação estrutural de cabeçalho. |

---

## 15. Modais e Diálogos Acessíveis

Janelas sobrepostas para confirmação ou inserção de dados.

### Assinatura HTML Canônica
```html
<div class="bcb-modal-backdrop" id="modalExemplo" role="dialog" aria-modal="true" aria-labelledby="modalTitulo" aria-describedby="modalDescricao">
  <div class="bcb-modal-dialog">
    <div class="bcb-modal-header">
      <h3 class="bcb-modal-title" id="modalTitulo">
        <span class="material-icons text-primary mr-1" aria-hidden="true">security</span>
        Confirmação de Acesso
      </h3>
      <button type="button" class="bcb-modal-close" aria-label="Fechar modal" data-dismiss="modal">
        <span class="material-icons" aria-hidden="true">close</span>
      </button>
    </div>
    <div class="bcb-modal-body" id="modalDescricao">
      <p>Você está prestes a acessar informações restritas do Sistema Financeiro Nacional. Deseja prosseguir com a autenticação Gov.br?</p>
    </div>
    <div class="bcb-modal-footer">
      <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancelar</button>
      <button type="button" class="btn btn-primary">Continuar com Gov.br</button>
    </div>
  </div>
</div>
```

---

## 16. Alertas e Toast Notifications

Notificações temporárias ou mensagens de status em tempo real.

### Assinatura HTML Canônica
```html
<!-- Toast Flutuante -->
<div class="bcb-toast-container" aria-live="polite" aria-atomic="true">
  <div class="bcb-toast toast-success" role="status">
    <span class="material-icons bcb-toast-icon" aria-hidden="true">check_circle</span>
    <div class="bcb-toast-body">
      <h4 class="bcb-toast-title">Relatório Gerado</h4>
      <p class="bcb-toast-message">O download da série temporal foi concluído com sucesso.</p>
    </div>
    <button type="button" class="bcb-toast-close" aria-label="Fechar notificação">
      <span class="material-icons" aria-hidden="true">close</span>
    </button>
  </div>
</div>

<!-- Alerta em Linha -->
<div class="bcb-alert alert-warning" role="alert">
  <span class="material-icons alert-icon" aria-hidden="true">warning</span>
  <div class="alert-body">
    <h4 class="alert-title">Manutenção Programada</h4>
    <p>O sistema Registrato estará em manutenção no domingo das 02h às 06h.</p>
  </div>
</div>
```

---

## 17. Exportação de Dados Abertos (Data Export)

Barra padronizada de exportação para dados abertos, séries temporais (SGS) e integração de desenvolvedores.

### Assinatura HTML Canônica
```html
<div class="bcb-data-export">
  <div class="bcb-data-export-info">
    <div class="bcb-data-export-icon">
      <span class="material-icons" aria-hidden="true">dataset</span>
    </div>
    <div>
      <h4 class="bcb-data-export-title">Exportar Série Histórica</h4>
      <p class="bcb-data-export-subtitle">Dados abertos oficiais do Banco Central do Brasil</p>
    </div>
  </div>
  <div class="bcb-data-export-actions">
    <a href="dados.csv" class="bcb-btn-export export-csv" role="button" aria-label="Exportar série em CSV">
      <span class="material-icons" aria-hidden="true">table_view</span> <span class="export-ext">CSV</span> (450 KB)
    </a>
    <a href="dados.json" class="bcb-btn-export export-json" role="button" aria-label="Exportar série em JSON">
      <span class="material-icons" aria-hidden="true">data_object</span> <span class="export-ext">JSON</span> API
    </a>
    <a href="/swagger" class="bcb-btn-export export-api" role="button" aria-label="Documentação Swagger REST">
      <span class="material-icons" aria-hidden="true">api</span> <span class="export-ext">API</span> REST
    </a>
  </div>
</div>
```

---

---

## 18. Navegação em Abas (Tabs)

Abas com chanfro da identidade visual do BCB.

### Assinatura HTML Canônica
```html
<div class="bcb-navegacaoabas">
  <nav>
    <div class="nav nav-tabs" role="tablist">
      <a class="nav-link active" id="tab-cidadao" data-toggle="tab" href="#cidadao" role="tab" aria-controls="cidadao" aria-selected="true">
        <span class="line"></span>
        <div class="icone"><span class="material-icons" aria-hidden="true">person</span></div>
        <div class="texto">Para o Cidadão</div>
      </a>
      <a class="nav-link" id="tab-empresas" data-toggle="tab" href="#empresas" role="tab" aria-controls="empresas" aria-selected="false">
        <span class="line"></span>
        <div class="icone"><span class="material-icons" aria-hidden="true">business</span></div>
        <div class="texto">Para Empresas</div>
      </a>
    </div>
  </nav>
  <div class="tab-content">
    <div class="tab-pane fade show active" id="cidadao" role="tabpanel" aria-labelledby="tab-cidadao">
      <p>Serviços bancários, chaves Pix e relatórios para pessoa física.</p>
    </div>
    <div class="tab-pane fade" id="empresas" role="tabpanel" aria-labelledby="tab-empresas">
      <p>Acesso a normativos, regulação e sistemas para pessoa jurídica.</p>
    </div>
  </div>
</div>
```

---

## 19. Accordions (Sanfonas Expansíveis)

Ideal para FAQs e seções secundárias de regulamentação.

### Assinatura HTML Canônica
```html
<div class="accordion modelo-1" id="faqAccordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <button class="btn text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <span>Quem pode solicitar o relatório no Registrato?</span>
        <span class="material-icons" aria-hidden="true">expand_more</span>
      </button>
    </div>
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#faqAccordion">
      <div class="card-body">
        Qualquer pessoa física ou jurídica que possua conta gov.br de nível prata ou ouro.
      </div>
    </div>
  </div>
</div>
```

---

## 20. Cards de Links Rápidos (Listalinks)

Grade de acessos rápidos a serviços.

### Assinatura HTML Canônica (Modelo 1)
```html
<div class="listalinks-light modelo-1">
  <div class="row">
    <div class="col-md-6 mb-3">
      <div class="h-100 d-flex align-items-center">
        <a href="/registrato" class="d-inline-flex rounded w-100 h-100">
          <div class="icon-container d-flex align-items-center justify-content-center rounded-left">
            <span class="material-icons md-36 color-1" aria-hidden="true">account_balance</span>
          </div>
          <div class="info-container align-self-center p-3">
            <span class="title color-1">Registrato</span><br>
            <span class="description">Consulte suas contas, empréstimos e chaves Pix.</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
```

---

## 21. Cards de Indicadores Econômicos & Mercado

Cards de destaque de valores e variações do mercado financeiro com suporte a tendências direcionais e semântica de mercado.

### Assinatura HTML Canônica (Variantes de Mercado)
```html
<!-- Indicador Padrão Institucional -->
<div class="bcb-indicator-card indicator-brand">
  <div class="bcb-indicator-label">Meta Selic (Copom)</div>
  <div class="bcb-indicator-value">
    14,25%
    <span class="bcb-indicator-trend positive">
      <span class="material-icons" aria-hidden="true">arrow_upward</span> +1,00 p.p.
    </span>
  </div>
  <div class="bcb-indicator-meta">Vigência: 13/03/2026 · 268ª Reunião</div>
</div>

<!-- Indicador Positivo (Alta Favorável / Liquidez) -->
<div class="bcb-indicator-card indicator-positive">
  <div class="bcb-indicator-label">Reservas Internacionais</div>
  <div class="bcb-indicator-value value-positive">
    US$ 355,8 bi
    <span class="bcb-indicator-trend positive">
      <span class="material-icons" aria-hidden="true">arrow_upward</span> +2,4%
    </span>
  </div>
  <div class="bcb-indicator-meta">Posição líquida internacional</div>
</div>

<!-- Indicador Negativo (Alerta Cambial / Inflação) -->
<div class="bcb-indicator-card indicator-negative">
  <div class="bcb-indicator-label">Dólar Comercial (PTAX)</div>
  <div class="bcb-indicator-value value-negative">
    R$ 5,7420
    <span class="bcb-indicator-trend negative">
      <span class="material-icons" aria-hidden="true">arrow_upward</span> +0,85%
    </span>
  </div>
  <div class="bcb-indicator-meta">Cotação de fechamento diário</div>
</div>

<!-- Indicador Neutro (Estabilidade) -->
<div class="bcb-indicator-card indicator-warning">
  <div class="bcb-indicator-label">IPCA (12 Meses)</div>
  <div class="bcb-indicator-value">
    4,10%
    <span class="bcb-indicator-trend neutral">
      <span class="material-icons" aria-hidden="true">trending_flat</span> 0,00
    </span>
  </div>
  <div class="bcb-indicator-meta">Meta: 3,00% (Tolerância: 4,50%)</div>
</div>
```

---

## 22. Download de Documentos

Cartões de arquivo com identificação de extensão e data.

### Assinatura HTML Canônica
```html
<div class="documentos">
  <a role="button" class="documento hvr-shadow d-flex text-decoration-none color-1" href="relatorio-estabilidade.pdf" aria-label="Baixar Relatório de Estabilidade Financeira (PDF, 4.8 MB)">
    <div class="icone text-white bg-color-1 d-flex align-items-center justify-content-center rounded-left">
      <div class="d-flex flex-column position-relative">
        <span class="material-icons md-36" aria-hidden="true">insert_drive_file</span>
        <span class="extensao bg-color-1">pdf</span>
      </div>
    </div>
    <div class="texto d-flex flex-column justify-content-center w-100 rounded-right pl-3">
      <span class="documento-title">Relatório de Estabilidade Financeira</span>
      <span class="documento-data">Publicado em: 02/09/2026 · Formato PDF (4.8 MB)</span>
    </div>
  </a>
</div>
```

---

## 23. Hero Banner Institucional

Banner visual de abertura de produtos ou temas prioritários (Drex, Pix, Open Finance).

### Assinatura HTML Canônica
```html
<div class="bcb-hero-banner shadow-sm">
  <div class="row">
    <div class="col-md-7 bcb-hero-content">
      <h2 class="bcb-hero-title">Drex: A Moeda Digital do Banco Central</h2>
      <div class="bcb-hero-text">
        Inovação e segurança para a economia digital brasileira através de tecnologia blockchain segura.
      </div>
      <div class="mt-auto text-md-left">
        <a href="#piloto" class="btn btn-sm btn-outline-primary bg-white">Conheça o Projeto Piloto</a>
      </div>
    </div>
    <div class="col-md-5 bcb-hero-img-container">
      <img src="../assets/img/hero-drex.jpg" alt="Representação gráfica da moeda digital Drex">
    </div>
  </div>
</div>
```

---

## 24. Timeline Educativa (Storytelling)

Jornada longa com cartões narrativos e ícones temáticos.

### Assinatura HTML Canônica
```html
<div class="timeline-container">
  <div class="step-card">
    <div class="step-details">
      <div class="step-header">
        <span class="material-icons step-icon" aria-hidden="true">savings</span>
        <h3 class="step-title">1. Diagnóstico Financeiro</h3>
      </div>
      <div class="step-content">
        <p>Mapeie todas as suas fontes de renda fixa e despesas correntes antes de planejar investimentos a longo prazo.</p>
      </div>
    </div>
    <div class="img-placeholder" style="background-image: url('educacao-1.jpg');" role="img" aria-label="Pessoa organizando planejamento financeiro em planilha"></div>
  </div>
</div>
```

---

## 25. Timeline Horizontal (Fases de Projeto)

Cronograma horizontal com marcos e datas.

### Assinatura HTML Canônica
```html
<div class="timeline-horizontal">
  <div class="timeline-h-step active">
    <div class="timeline-h-circle"><span class="material-icons md-18" aria-hidden="true">check</span></div>
    <div class="timeline-h-date">Fase 1</div>
    <div class="timeline-h-text">Testes de Infraestrutura e Privacidade</div>
  </div>
  <div class="timeline-h-step active">
    <div class="timeline-h-circle">2</div>
    <div class="timeline-h-date">Fase 2</div>
    <div class="timeline-h-text">Integração de Títulos Públicos Federais</div>
  </div>
  <div class="timeline-h-step">
    <div class="timeline-h-circle">3</div>
    <div class="timeline-h-date">Fase 3</div>
    <div class="timeline-h-text">Lançamento para o Público Amplo</div>
  </div>
</div>
```

---

## 26. Carrossel de Vídeos

Exibição horizontal com proporção 16:9 acessível.

### Assinatura HTML Canônica
```html
<div class="videos-destaque">
  <div class="video-item">
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen title="Vídeo explicativo: O que é a Taxa Selic"></iframe>
    </div>
    <p class="video-title">O que é a Taxa Selic e como ela impacta seu dia a dia</p>
  </div>
</div>
```

---

## 27. Bloco de Transição Narrativa

Conecta introduções a passos práticos.

### Assinatura HTML Canônica
```html
<div class="transition-block">
  <h3>Como colocar em prática?</h3>
  <p class="lead">Siga o passo a passo preparado pelos especialistas do Banco Central:</p>
  <span class="material-icons animated-arrow" aria-hidden="true">arrow_downward</span>
</div>
```

---

## 28. Botão Voltar ao Topo

Botão fixo que aparece na rolagem.

### Assinatura HTML Canônica
```html
<button class="bcb-back-to-top" id="backToTop" aria-label="Voltar ao topo da página">
  <span class="material-icons" aria-hidden="true">keyboard_arrow_up</span>
</button>
<script>
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
</script>
```

---

## 29. Paginação e Tooltips de Glossário

Navegação em páginas de listagens e explicações em termos técnicos.

### Assinatura HTML Canônica
```html
<!-- Tooltip de Glossário -->
O Copom definiu a meta para a 
<a href="#" class="bcb-tooltip-link" data-toggle="tooltip" title="Comitê de Política Monetária responsável pelas decisões de juros no Brasil.">taxa Selic</a>.

<!-- Inicialização JS obrigatória -->
<script>
  $(function () { $('[data-toggle="tooltip"]').tooltip(); });
</script>
```

---

## 30. Bloco de Métricas / KPI Card Financeiro (.bcb-kpi-card)

Exibição executiva de indicadores macroeconômicos, taxas de juros, índices de inflação e câmbio com badge de tendência direcional e data de referência.

### Assinatura HTML Canônica
```html
<div class="bcb-kpi-card kpi-brand">
  <div class="bcb-kpi-header">
    <span class="bcb-kpi-label">Taxa Selic Over</span>
    <span class="material-symbols-outlined material-icons bcb-kpi-icon" aria-hidden="true">account_balance</span>
  </div>
  <div class="bcb-kpi-body">
    <h4 class="bcb-kpi-value">14,25<span class="bcb-kpi-unit">% a.a.</span></h4>
  </div>
  <div class="bcb-kpi-footer">
    <span class="bcb-kpi-trend positive"><span class="material-symbols-outlined material-icons" aria-hidden="true">arrow_upward</span> +1,00 p.p.</span>
    <span class="bcb-kpi-date">12/03/2026</span>
  </div>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Use as variantes de borda semântica: `kpi-brand`, `kpi-success`, `kpi-warning`, `kpi-danger`. | NUNCA sobreponha estilos inline de cor nos valores. |
| Forneça sempre a data de referência no `.bcb-kpi-date` para transparência temporal. | NUNCA exiba indicadores sem unidade de medida explícita (`.bcb-kpi-unit`). |

---

## 31. Barra de Utilidades da Página (.bcb-page-toolbar)

Barra institucional com ações rápidas de produtividade (imprimir, copiar link, compartilhar) e carimbo de data da última modificação.

### Assinatura HTML Canônica
```html
<div class="bcb-page-toolbar" role="toolbar" aria-label="Utilidades da página">
  <div class="bcb-page-toolbar__meta">
    <span class="material-symbols-outlined material-icons" aria-hidden="true">schedule</span>
    <span>Última modificação em: <strong>12/03/2026 às 18:30</strong></span>
  </div>
  <div class="bcb-page-toolbar__actions">
    <button type="button" class="bcb-page-toolbar__btn" onclick="window.print();" aria-label="Imprimir página">
      <span class="material-symbols-outlined material-icons" aria-hidden="true">print</span> Imprimir
    </button>
    <button type="button" class="bcb-page-toolbar__btn" onclick="navigator.clipboard.writeText(window.location.href);" aria-label="Copiar link da página">
      <span class="material-symbols-outlined material-icons" aria-hidden="true">link</span> Copiar Link
    </button>
    <button type="button" class="bcb-page-toolbar__btn" aria-label="Compartilhar página">
      <span class="material-symbols-outlined material-icons" aria-hidden="true">share</span> Compartilhar
    </button>
  </div>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Garanta área de toque mínima de 44x44px nos botões utilitários. | NUNCA omita o `aria-label` descritivo na tag de toolbar ou nos botões de ação. |
| O componente é automaticamente oculto em mídias de impressão (`@media print`). | NUNCA posicione a barra de utilidades cobrindo textos do conteúdo principal. |

---

## 32. Citação Institucional e Destaque Normativo (.bcb-quote)

Bloco editorial para atas do Copom, pronunciamentos de dirigentes ou destaques de artigos de resoluções e circulares normativas do BCB.

### Assinatura HTML Canônica
```html
<!-- Citação Institucional -->
<blockquote class="bcb-quote">
  <p class="bcb-quote-text">"A firmeza na condução da política monetária é âncora primordial da estabilidade."</p>
  <footer class="bcb-quote-footer">
    <span class="bcb-quote-author">Diretoria Colegiada do Banco Central do Brasil</span>
    <span class="bcb-quote-role">Ata da 268ª Reunião Ordinária do Copom</span>
    <cite class="bcb-quote-cite">Brasília, Março de 2026</cite>
  </footer>
</blockquote>

<!-- Destaque Normativo -->
<div class="bcb-quote bcb-quote--normative">
  <p class="bcb-quote-text"><strong>Art. 3º</strong> As instituições autorizadas deverão manter canal dedicado...</p>
  <footer class="bcb-quote-footer">
    <span class="bcb-quote-author">Resolução BCB nº 103/2026</span>
    <span class="bcb-quote-role">Departamento de Regulação do Sistema Financeiro (DENOR)</span>
  </footer>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Use `<blockquote>` semântico para pronunciamentos e discursos com citação. | NUNCA use `<blockquote>` vazio ou sem identificação do autor/órgão emissor. |
| Use `.bcb-quote--normative` com borda institucional para artigos de lei e resoluções. | NUNCA misture diferentes fontes serifadas fora do padrão Cormorant Garamond. |

---

## 33. Alertas Inline de Validação (.bcb-alert)

Alertas contextuais com retorno operacional imediato, checklist de pendências e botão acessível de dispensa.

### Assinatura HTML Canônica
```html
<div class="bcb-alert alert-danger" role="alert">
  <span class="material-symbols-outlined material-icons alert-icon" aria-hidden="true">error</span>
  <div class="alert-content">
    <h4 class="alert-title">Pendências no formulário de adesão</h4>
    <p class="alert-message">Por favor, corrija os seguintes campos antes de submeter a proposta:</p>
    <ul class="alert-list">
      <li>O CNPJ informado não consta na base autorizada de participantes.</li>
    </ul>
  </div>
  <button type="button" class="alert-close" aria-label="Fechar alerta">
    <span class="material-symbols-outlined material-icons" aria-hidden="true">close</span>
  </button>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Utilize `role="alert"` para erros críticos e `role="status"` para avisos ou sucessos. | NUNCA use cores sem contraste adequado contra o fundo da caixa. |
| Inclua sempre `aria-label="Fechar alerta"` no botão `.alert-close`. | NUNCA exiba mensagens de erro sem orientações claras de resolução. |