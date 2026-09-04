# BCB UI – Components Library (Enterprise v3.0)

> **Status**: v3.0 (Auditoria Enterprise, Atomic Design & Automação por IA — Mar/2026).
> Este documento é a especificação canônica do **vocabulário atômico de interface** do Banco Central do Brasil.
> Toda IA e desenvolvedor deve seguir rigorosamente os contratos semânticos de classes Bootstrap 4.6, Material Icons e tokens CSS do BCB.

> [!IMPORTANT]
> **Escopo Estrito de Prototipagem (Fragmento de Conteúdo Central vs. Casca Global):**
> Componentes de casca global (`#barra-brasil`, `<header>`, `<footer>`, `<nav aria-label="breadcrumb">`) e tags de documento (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, `<script>`) são **suprimidos da prototipagem de páginas**. Esses elementos são mantidos de forma centralizada pelo CMS do portal do BCB e simulados dinamicamente no visualizador técnico (`prototipos/_harness.html`).
> Nos arquivos de protótipos (`prototipos/*.html`), a geração é **exclusiva para os blocos semânticos do corpo central (`<main id="conteudo-principal">... </main>`)**.

---

## 🏛️ Catálogo Prioritário de Blocos de Conteúdo Central

Ao transformar demandas em interfaces do Banco Central, priorize a combinação dos seguintes blocos canônicos de conteúdo central:

| Bloco de Conteúdo | Contratos de Classe / Markup | Finalidade Principal | Exemplos no BCB |
|---|---|---|---|
| **1. Indicadores & KPIs** | `.bcb-indicator-card`, `.bcb-kpi-card`, `.bcb-indicator-value`, `.bcb-indicator-trend` | Destaque numérico de metas econômicas, taxas, percentuais e variações temporais. | Meta da Taxa Selic, IPCA, PTAX, Reservas Internacionais. |
| **2. Cards de Conteúdo** | `.card.bcb-card`, `.card-header`, `.card-body`, `.listalinks` | Agrupamento temático de serviços, temas correlatos, atalhos rápidos e resumos normativos. | Canais de Atendimento, Prazos MED, Acesso a Sistemas. |
| **3. Tabelas de Dados** | `.table-responsive`, `.table.table-striped.table-hover`, `<caption>`, `.bcb-data-export` | Apresentação tabular densa com acessibilidade, alinhamento numérico à direita e toolbar de exportação. | Séries SGS (SGS 432), Histórico do Copom, Tarifas Bancárias. |
| **4. Alertas de Validação** | `.bcb-alert.bcb-alert-success|warning|danger|info`, `.alert` | Mensagens inline de feedback imediato, avisos contextuais e validações operacionais. | Confirmação de envio de demanda, avisos de instabilidade temporária. |
| **5. Callouts Estruturados** | `.callout.callout-warning|brand|danger`, `.callout-left-bordered` | Avisos de destaque normativo, segurança contra golpes, alertas de prazo e comunicados críticos. | Atenção a Golpes no Pix, Prazos para Contestação, Vigência de Circular. |
| **6. Formulários & Controles** | `.form-group`, `.form-control`, `.custom-select`, `.form-check`, `.bcb-filter-panel` | Filtros facetados de busca, consultas parametrizadas, simulações e formulários de serviços. | Filtro de Séries Temporais, Consulta de Cheque Especial, Busca de Normas. |
| **7. Seções Expansíveis** | `.accordion.modelo-1`, `.card-header`, `[data-toggle="collapse"]` | Perguntas frequentes (FAQ), detalhamentos técnicos opcionais e regulamentação minuciosa. | Dúvidas Frequentes do MED, Regras Operacionais Detalhadas. |
| **8. Listas de Processo** | `<ol class="process-list">`, `.process-step`, `.step-number` | Roteiro cronológico passo a passo de como o cidadão ou entidade financeira deve proceder. | Como Solicitar a Devolução Pix, Passo a Passo do Registrato. |
| **9. Call to Action (CTA)** | `.bcb-cta`, `.bcb-cta--primary`, `.bcb-cta--neutral`, `.bcb-btn-cta` | Destaque persuasivo de conversão ou ação prioritária para o cidadão/entidade. | Acionamento imediato do MED, Acesso ao Registrato. |
| **10. Carrossel Manchete** | `.bcb-carousel`, `.bcb-carousel__slide`, `.bcb-carousel__controls` | Painel rotativo de manchetes e alertas institucionais com controle acessível de pausa. | Destaques de Segurança Pix, Decisões do Copom, Avisos Urgentes. |
| **11. Tooltip Acessível** | `.bcb-tooltip`, `[data-tooltip]`, `.bcb-tooltip-term`, `.bcb-tooltip-btn` | Definição contextual sob demanda de termos financeiros técnicos e siglas. | Explicação de "Selic", "PSP", "Chave Pix", "MED". |
| **12. Tabelas Analíticas Oficiais** | `.table-digital`, `.table-strict`, `.bcb-table`, `.bcb-col-separator`, `.num-negative`, `.bcb-row-highlight`, `.bcb-row-total` | Matrizes numéricas e tabulares analíticas conforme Manual Corporativo do BCB. | Resumo PMS, Indicadores de Mercado, REF, Relatório de Inflação. |
| **13. Gráficos Interativos Highcharts** | `.bcb-chart-container`, `highcharts-theme-bcb.js`, `[data-bcb-chart]` | Representação gráfica interativa com paleta oficial de 12 cores sequenciais do BCB. | Histórico da Selic SGS 432, Séries Temporais Copom, Composição de Crédito. |

> 🚫 **GUIAS DE CASCA GLOBAL SUPRIMIDOS:** Barra de Governo (#barra-brasil), Cabeçalho Principal (<header>), Rodapé Institucional (<footer>) e Trilha de Navegação (breadcrumbs) **NÃO integram o catálogo de componentes a serem produzidos nas páginas de protótipos**.

---

## Sumário Atômico de Componentes do Conteúdo Central

### Nível 1: Átomos Semânticos
1. [Botões (Buttons)](#1-botões-buttons) — `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline-primary`
2. [Links e Âncoras](#2-links-e-âncoras) — `.text-link`
3. [Iconografia Material Icons](#3-iconografia-material-icons) — `.material-symbols-outlined.material-icons`
4. [Tags e Badges](#9-tags-e-badges) — `.badge`, `.tag-bcb`
5. [Controles de Formulário e Validação](#12-controles-de-formulário-e-validação) — `.form-control`, `.custom-select`
6. [Botão Voltar ao Topo](#27-botão-voltar-ao-topo) — `.bcb-back-to-top-wrapper`, `.bcb-btn-back-to-top`
7. [Tooltip Acessível](#38-tooltip-acessível-bcb-tooltip) — `.bcb-tooltip`, `[data-tooltip]`, `.bcb-tooltip-term`, `.bcb-tooltip-btn`

### Nível 2: Moléculas Funcionais
8. [Bloco de Métricas / KPI Card Financeiro](#30-bloco-de-métricas--kpi-card-financeiro-bcb-kpi-card) — `.bcb-kpi-card`, `.bcb-indicator-card`
9. [Callouts e Alertas Estruturados](#6-callouts-e-alertas-estruturados) — `.callout.callout-warning|brand|danger`
10. [Alertas Inline de Validação](#33-alertas-inline-de-validação-bcb-alert) — `.bcb-alert`
11. [Citações e Destaques Normativos](#8-citações-e-testemunhos-blockquotes) — `.bcb-citacao`, `.bcb-quote` com `<cite>`
12. [Download de Documentos](#21-download-de-documentos) — `.documentos .documento`
13. [Barra de Utilidades da Página](#31-barra-de-utilidades-da-página-bcb-page-toolbar) — `.bcb-page-toolbar`
14. [Cards de Links Rápidos (Listalinks)](#19-cards-de-links-rápidos-listalinks) — `.listalinks`
15. [Tip Box (Dica Educativa)](#7-tip-box-dica-educativa) — `.tip-box`
16. [Call to Action (CTA)](#39-call-to-action-cta-bcb-cta) — `.bcb-cta`, `.bcb-cta--primary`, `.bcb-cta--neutral`, `.bcb-btn-cta`
17. [Tabelas Analíticas Oficiais](#41-tabelas-analíticas-oficiais-table-digital-e-table-strict) — `.table-digital`, `.table-strict`, `.bcb-table`

### Nível 3: Organismos e Padrões Compostos
18. [Data Table Responsiva com Exportação](#14-data-table-responsiva-séries-e-taxas) — `.table-responsive`, `.bcb-data-export`
19. [Process List / Stepper Sequencial](#10-process-list-passo-a-passo) — `<ol class="process-list">`
20. [Accordions (Sanfonas Expansíveis)](#18-accordions-sanfonas-expansíveis) — `.accordion.modelo-1`
21. [Filtros e Busca Facetada](#13-filtros-e-busca-facetada) — `.bcb-filter-panel`
22. [Navegação em Abas (Tabs)](#17-navegação-em-abas-tabs) — `.nav-tabs`
23. [Modais e Diálogos Acessíveis](#15-modais-e-diálogos-acessíveis) — `.modal`
24. [Indicadores Financeiros Avançados](#34-indicadores-financeiros-avançados-bcb-indicator-card--advanced) — `.bcb-indicator-card--advanced`
25. [Tabelas Comparativas com Filtros Locais](#35-tabelas-comparativas-com-filtros-locais-bcb-table-comparison) — `.bcb-table-comparison`
26. [Bloco de Metadados Normativos](#36-bloco-de-metadados-normativos-bcb-norm-metadata) — `.bcb-norm-metadata`
27. [Fluxogramas Textuais e Passo a Passo com Decisão](#37-fluxogramas-textuais-e-passo-a-passo-com-decisão-bcb-decision-flow) — `.bcb-decision-flow`
28. [Carrossel Manchete Institucional](#40-carrossel-manchete-institucional-bcb-carousel) — `.bcb-carousel`
29. [Gráficos Interativos Highcharts](#42-gráficos-interativos-highcharts-bcb-chart-container) — `.bcb-chart-container`, `highcharts-theme-bcb.js`

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

## 4. Breadcrumbs Acessíveis (.bcb-breadcrumb-nav) — Casca Institucional / Harness Only

> ⚠️ **COMPONENTE DE CASCA FIXA (TOTALMENTE PROIBIDO NO MIOLO DE PROTÓTIPOS):**
> A trilha de navegação (breadcrumb) é mantida de forma fixa e centralizada pelo CMS do Banco Central e simulada dinamicamente no visualizador técnico (`prototipos/_harness.html`).
> **NUNCA GERE BREADCRUMBS** nos arquivos de protótipos (`prototipos/*.html`). Esta seção documenta a assinatura semântica exclusiva para o harness técnico e para os templates centrais do portal.

### Assinatura HTML Canônica (Casca Institucional)
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
| Sempre use `<nav aria-label="Trilha de navegação" class="bcb-breadcrumb-nav">` na casca do portal. | NUNCA inclua breadcrumbs no miolo `<main>` de arquivos em `prototipos/*.html`. |
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

## 6. Callouts e Alertas Estruturados (`.bcb-callout` / `.callout`)

Utilizado para destaques, avisos operacionais, normativos, dicas editoriais e orientações críticas.

### Assinatura HTML Canônica (Padrão BEM)
```html
<aside class="bcb-callout bcb-callout--info" aria-label="Comunicado Importante">
  <div class="bcb-callout__header">
    <span class="material-symbols-outlined material-icons bcb-callout__icon" aria-hidden="true">info</span>
    <span class="bcb-callout__title">Comunicado Importante</span>
  </div>
  <div class="bcb-callout__body">
    <p class="mb-0">O Banco Central não envia e-mails solicitando confirmação de dados bancários ou senhas.</p>
  </div>
</aside>
```

### Variantes Temáticas Homologadas
- `.bcb-callout--info`: Informativo / institucional (Azul BCB `#2E4C59`).
- `.bcb-callout--warning`: Atenção / prazo / cuidado (Âmbar institucional).
- `.bcb-callout--success`: Confirmação / regra atendida (Verde sustentável).
- `.bcb-callout--danger`: Erro / proibição / risco de fraude (Vinho autêntico).
- `.bcb-callout--editorial`: Dica editorial, educação financeira ou nota instrutiva (Ícone `tips_and_updates` e fundo suave).

---

## 7. Callout Editorial — Dicas Educativas (`.bcb-callout--editorial`)

> [!NOTE]
> **Substituição da antiga Tip Box:** A classe isolada `.tip-box` foi descontinuada e consolidada como a variante `.bcb-callout.bcb-callout--editorial`, mantendo total retrocompatibilidade visual.

### Assinatura HTML Canônica
```html
<aside class="bcb-callout bcb-callout--editorial" aria-label="Dica Financeira">
  <div class="bcb-callout__header">
    <span class="material-symbols-outlined material-icons bcb-callout__icon" aria-hidden="true">tips_and_updates</span>
    <span class="bcb-callout__title">Dica de Planejamento:</span>
  </div>
  <div class="bcb-callout__body">
    <p class="mb-0">Monte uma reserva de emergência equivalente a no mínimo 6 meses de suas despesas essenciais antes de iniciar investimentos de longo prazo.</p>
  </div>
</aside>
```

---

## 8. Citações e Testemunhos (Blockquotes)

Destaca falas de autoridades, diretoria ou trechos de legislação.

### Assinatura HTML Canônica
```html
<blockquote class="bcb-citacao">
  <p class="mb-0">"A estabilidade de preços é o alicerce fundamental para o crescimento sustentável do país."</p>
  <cite class="blockquote-footer">Presidente do Banco Central do Brasil</cite>
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
<!-- Modal com calibragem de largura (.bcb-modal--sm | --md | --lg | --xl) -->
<div class="bcb-modal-backdrop" id="modalExemplo" role="dialog" aria-modal="true" aria-labelledby="modalTitulo" aria-describedby="modalDescricao">
  <div class="bcb-modal-dialog bcb-modal--md">
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

### Modificadores de Largura Homologados
- `.bcb-modal--sm`: 400px (Confirmações simples, alertas curtos).
- `.bcb-modal--md`: 600px (Largura padrão de diálogos de confirmação e formulários rápidos).
- `.bcb-modal--lg`: 850px (Visualização de tabelas, relatórios e formulários multi-campo).
- `.bcb-modal--xl`: 1140px (Painéis analíticos densos e auditorias de dados).

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

## 20. Cards de Navegação e Links Rápidos (`.bcb-card-link`)

Grade de acessos a serviços e destaques temáticos.

### Assinatura HTML Canônica — Modelo 1 (Lista de Links Institucional)
```html
<div class="row">
  <div class="col-md-6 mb-3 bcb-card-link bcb-card-link--modelo-1">
    <a href="/registrato">
      <div class="icon-container">
        <span class="material-symbols-outlined material-icons md-24" aria-hidden="true">account_balance</span>
      </div>
      <div class="item-card">
        <div class="title">Registrato</div>
        <p class="description">Consulte suas contas, empréstimos e chaves Pix vinculadas ao seu CPF.</p>
      </div>
    </a>
  </div>
</div>
```

### Assinatura HTML Canônica — Modelo 2 (Card de Destaque Horizontal Responsivo)
```html
<div class="row">
  <div class="col-lg-6 mb-3 bcb-card-link bcb-card-link--modelo-2">
    <a href="/drex">
      <div class="thumbnail-container">
        <img src="imagem-destaque.jpg" alt="Drex Real Digital">
      </div>
      <div class="item-card">
        <div class="tag-container">
          <span class="badge badge-primary">Moeda Digital</span>
        </div>
        <div class="title">Plataforma Drex</div>
        <p class="description">Infraestrutura do Real Digital desenvolvida pelo BCB para serviços financeiros inteligentes.</p>
      </div>
    </a>
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

## 23. Hero Banner Institucional (`.bcb-hero-banner`)

Banner visual de abertura de produtos ou temas prioritários (Drex, Pix, Open Finance) com suporte à variante split com imagem lateral (`.bcb-hero-banner--split`).

### Assinatura HTML Canônica (Variante Split)
```html
<div class="bcb-hero-banner bcb-hero-banner--split">
  <div class="bcb-hero-content">
    <span class="badge badge-warning text-dark font-weight-bold mb-2 align-self-start">Inovação Financeira</span>
    <h2 class="bcb-hero-title">Drex: A Moeda Digital do Banco Central</h2>
    <p class="bcb-hero-text">
      Inovação e segurança para a economia digital brasileira através de plataforma com liquidação garantida pelo BCB.
    </p>
    <div>
      <a href="#piloto" class="btn btn-warning font-weight-bold px-4 py-2">Conheça o Projeto Piloto</a>
    </div>
  </div>
  <div class="bcb-hero-img-container">
    <img src="../assets/img/hero-drex.jpg" alt="Representação gráfica da moeda digital Drex">
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

## 26. Carrossel de Vídeos (`.bcb-video-carousel`)

Exibição horizontal acessível com proporção 16:9, botões de rolagem por setas e suporte a touch scroll-snap.

### Assinatura HTML Canônica
```html
<div class="bcb-video-carousel" aria-label="Galeria de vídeos institucionais">
  <div class="bcb-video-carousel__header">
    <h3 class="bcb-video-carousel__title">
      <span class="material-symbols-outlined material-icons" aria-hidden="true">ondemand_video</span> Vídeos Educativos
    </h3>
    <div class="bcb-video-carousel__controls">
      <button type="button" class="bcb-video-carousel__btn" aria-label="Vídeos anteriores">
        <span class="material-symbols-outlined material-icons" aria-hidden="true">chevron_left</span>
      </button>
      <button type="button" class="bcb-video-carousel__btn" aria-label="Próximos vídeos">
        <span class="material-symbols-outlined material-icons" aria-hidden="true">chevron_right</span>
      </button>
    </div>
  </div>
  <div class="bcb-video-carousel__track">
    <div class="bcb-video-carousel__item">
      <div class="bcb-video-carousel__media">
        <iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen title="Vídeo explicativo: O que é a Taxa Selic"></iframe>
      </div>
      <div class="bcb-video-carousel__body">
        <span class="bcb-video-carousel__tag">Economia</span>
        <div class="bcb-video-carousel__item-title">O que é a Taxa Selic e como ela impacta seu dia a dia</div>
        <span class="bcb-video-carousel__duration">
          <span class="material-symbols-outlined material-icons" aria-hidden="true">schedule</span> 03:45
        </span>
      </div>
    </div>
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
    <button type="button" class="bcb-page-toolbar__btn" data-action="print" aria-label="Imprimir página">
      <span class="material-symbols-outlined material-icons" aria-hidden="true">print</span> Imprimir
    </button>
    <button type="button" class="bcb-page-toolbar__btn" data-action="copy-link" aria-label="Copiar link da página">
      <span class="material-symbols-outlined material-icons" aria-hidden="true">link</span> Copiar Link
    </button>
    <button type="button" class="bcb-page-toolbar__btn" data-action="share" aria-label="Compartilhar página">
      <span class="material-symbols-outlined material-icons" aria-hidden="true">share</span> Compartilhar
    </button>
  </div>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Garanta área de toque mínima de 44x44px nos botões utilitários. | NUNCA use manipuladores inline (`onclick=`). Delegue eventos a seletores semânticos (`data-action`). |
| O componente é automaticamente oculto em mídias de impressão (`@media print`). | NUNCA posicione a barra de utilidades cobrindo textos do conteúdo principal. |

---

## 32. Citação Institucional e Destaque Normativo (.bcb-quote)

Bloco editorial para atas do Copom, pronunciamentos de dirigentes ou destaques de artigos de resoluções e circulares normativas do BCB.

### Assinatura HTML Canônica
```html
<!-- Citação Institucional -->
<blockquote class="bcb-quote">
  <p class="bcb-quote-text">"A firmeza na condução da política monetária é âncora primordial da estabilidade."</p>
  <cite class="bcb-quote-footer">
    <span class="bcb-quote-author">Diretoria Colegiada do Banco Central do Brasil</span>
    <span class="bcb-quote-role">Ata da 268ª Reunião Ordinária do Copom</span>
    <span class="bcb-quote-cite">Brasília, Março de 2026</span>
  </cite>
</blockquote>

<!-- Destaque Normativo -->
<div class="bcb-quote bcb-quote--normative">
  <p class="bcb-quote-text"><strong>Art. 3º</strong> As instituições autorizadas deverão manter canal dedicado...</p>
  <cite class="bcb-quote-footer">
    <span class="bcb-quote-author">Resolução BCB nº 103/2026</span>
    <span class="bcb-quote-role">Departamento de Regulação do Sistema Financeiro (DENOR)</span>
  </cite>
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

---

## 34. Indicadores Financeiros Avançados (.bcb-indicator-card--advanced)

Painel molecular para apresentação de metas de política monetária e variáveis financeiras com bandas de tolerância superior/inferior, variação temporal e status de mercado.

### Assinatura HTML Canônica
```html
<div class="card bcb-indicator-card bcb-indicator-card--advanced border shadow-sm p-3 bg-bcb-surface">
  <div class="d-flex justify-content-between align-items-center mb-2">
    <span class="text-uppercase font-weight-bold small text-muted">Meta para a Inflação (IPCA)</span>
    <span class="badge badge-success">Dentro da Meta</span>
  </div>
  <div class="d-flex align-items-baseline mb-2">
    <span class="bcb-indicator-value h2 font-weight-bold mb-0 text-bcb-brand">3,00%</span>
    <span class="ml-2 small text-muted">ao ano (Centro)</span>
  </div>
  <!-- Barra Visual de Intervalo de Tolerância -->
  <div class="bcb-tolerance-band mb-2" aria-label="Banda de tolerância de 1,50% a 4,50%">
    <div class="d-flex justify-content-between small text-muted mb-1">
      <span>Piso: 1,50%</span>
      <span class="font-weight-bold text-dark">Atual: 3,75%</span>
      <span>Teto: 4,50%</span>
    </div>
    <div class="progress" style="height: 6px;">
      <div class="progress-bar bg-info" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </div>
  <div class="d-flex justify-content-between align-items-center pt-2 border-top small text-muted">
    <span>Acumulado 12 meses: <strong class="text-body">+3,75%</strong></span>
    <span class="bcb-indicator-trend down text-success font-weight-bold">
      <span class="material-symbols-outlined material-icons md-16" aria-hidden="true">trending_down</span> -0,12 p.p.
    </span>
  </div>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Use `aria-label` descritivo na barra de tolerância para leitores de tela. | NUNCA oculte o piso e o teto da meta em comunicados do Copom. |
| Use `.badge-success` ou `.badge-warning` para indicar enquadramento regulatório. | NUNCA utilize estilos inline fora de tokens ou classes utilitárias. |

---

## 35. Tabelas Comparativas com Filtros Locais (.bcb-table-comparison)

Tabela densa para comparação de taxas, tarifas e condições operacionais de agentes do sistema financeiro com painel de filtros rápidos integrado no topo.

### Assinatura HTML Canônica
```html
<div class="bcb-table-comparison-wrapper border rounded p-3 bg-bcb-surface">
  <!-- Barra de Filtros Locais -->
  <div class="bcb-table-toolbar d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom" style="gap: 0.75rem;">
    <div class="d-flex flex-wrap align-items-center" style="gap: 0.5rem;">
      <label for="filtroSegmento" class="small font-weight-bold mb-0 text-muted">Segmento:</label>
      <select id="filtroSegmento" class="custom-select custom-select-sm" data-action="filter-table">
        <option value="todos">Todos os Bancos</option>
        <option value="comercial">Bancos Comerciais</option>
        <option value="cooperativa">Cooperativas de Crédito</option>
      </select>
    </div>
    <div class="bcb-data-export btn-group btn-group-sm" role="group" aria-label="Exportar tabela comparativa">
      <button type="button" class="btn btn-outline-secondary" data-action="export-csv">CSV</button>
      <button type="button" class="btn btn-outline-secondary" data-action="export-json">JSON</button>
    </div>
  </div>

  <!-- Tabela Acessível -->
  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered table-sm mb-0">
      <caption class="sr-only">Comparativo de Taxas Médias Praticadas pelas Instituições Financeiras</caption>
      <thead class="thead-light">
        <tr>
          <th scope="col">Instituição Financeira</th>
          <th scope="col">Modalidade</th>
          <th scope="col" class="text-right">Taxa Mínima (% a.m.)</th>
          <th scope="col" class="text-right">Taxa Média (% a.a.)</th>
          <th scope="col" class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="font-weight-normal">Banco do Brasil S.A.</th>
          <td>Crédito Pessoal</td>
          <td class="text-right">1,45%</td>
          <td class="text-right">18,90%</td>
          <td class="text-center"><span class="badge badge-success">Vigente</span></td>
        </tr>
        <tr>
          <th scope="row" class="font-weight-normal">Caixa Econômica Federal</th>
          <td>Crédito Pessoal</td>
          <td class="text-right">1,39%</td>
          <td class="text-right">17,80%</td>
          <td class="text-center"><span class="badge badge-success">Vigente</span></td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="bg-light font-weight-bold">
          <th scope="row" colspan="2">Média Geral do Sistema Financeiro</th>
          <td class="text-right">1,42%</td>
          <td class="text-right">18,35%</td>
          <td class="text-center">&bull;</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Sempre use `scope="col"` no `<thead>` e `scope="row"` na primeira célula do `<tbody>`. | NUNCA omita o alinhamento à direita (`.text-right`) para colunas de percentuais e valores monetários. |
| Inclua sempre `<caption>` acessível para leitores de tela. | NUNCA faça filtros locais com scripts inline; delegue a `assets/js/bcb-ui.js`. |

---

## 36. Bloco de Metadados Normativos (.bcb-norm-metadata)

Card institucional posicionado logo abaixo do título em páginas de atos normativos, resoluções e instruções regulatórias para identificação jurídica inequívoca.

### Assinatura HTML Canônica
```html
<div class="card bcb-norm-metadata border mb-4 bg-bcb-surface">
  <div class="card-body p-3">
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-2" style="gap: 0.5rem;">
      <div class="d-flex align-items-center" style="gap: 0.5rem;">
        <span class="tag-bcb primary">Resolução BCB</span>
        <span class="font-weight-bold text-bcb-brand">Nº 489, de 12 de Março de 2026</span>
      </div>
      <span class="badge badge-success">Vigente</span>
    </div>
    <div class="row small text-muted">
      <div class="col-12 col-md-4 mb-1 mb-md-0">
        <span class="d-block font-weight-bold text-dark">Autoridade Expedidora:</span>
        <span>Diretoria Colegiada do Banco Central</span>
      </div>
      <div class="col-12 col-md-4 mb-1 mb-md-0">
        <span class="d-block font-weight-bold text-dark">Data de Publicação no DOU:</span>
        <span>13/03/2026 &bull; Seção 1, Página 42</span>
      </div>
      <div class="col-12 col-md-4">
        <span class="d-block font-weight-bold text-dark">Atos Alterados / Revogados:</span>
        <span>Altera Resolução nº 320/2024; Revoga Circular nº 3.900/2020.</span>
      </div>
    </div>
  </div>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Destaque a data e a seção do Diário Oficial da União (DOU) para validade jurídica. | NUNCA invente números de ato normativo sem conferência com a área demandante. |
| Use tags semânticas `.tag-bcb` para classificar a espécie normativa. | NUNCA posicione o bloco de metadados antes do `<h1>` principal. |

---

## 37. Fluxogramas Textuais e Passo a Passo com Decisão (`.bcb-decision-flow`)

Roteiro sequencial de tomada de decisão que substitui imagens inacessíveis de fluxograma por nós semânticos de decisão (*Se Sim*, *Se Não*), prazos e encaminhamentos oficiais, com espaçamento generoso e badges direcionais contrastantes.

### Assinatura HTML Canônica
```html
<div class="bcb-decision-flow-wrapper my-4">
  <h3 class="h5 font-weight-bold mb-3 text-bcb-brand">Fluxograma Operacional de Contestação</h3>
  <ol class="bcb-decision-flow">
    <!-- Nó 1: Ação Inicial -->
    <li class="bcb-decision-node">
      <div class="bcb-decision-node__header">
        <span class="bcb-decision-node__step">1</span>
        <div class="bcb-decision-node__content">
          <h4 class="bcb-decision-node__title">Identificação da Transação Suspeita</h4>
          <p class="bcb-decision-node__desc">A vítima detecta movimentação não autorizada ou induzida por golpe no extrato da conta.</p>
          <div class="bcb-decision-node__meta">
            <strong>Prazo Máximo:</strong> Até 80 dias da realização do Pix para acionar a instituição bancária.
          </div>
        </div>
      </div>
    </li>

    <!-- Nó 2: Bifurcação de Decisão com Badges Sim / Não -->
    <li class="bcb-decision-node">
      <div class="bcb-decision-node__header">
        <span class="bcb-decision-node__step">2</span>
        <div class="bcb-decision-node__content">
          <h4 class="bcb-decision-node__title">Abertura de Notificação de Infração (MED)</h4>
          <div class="bcb-decision-branches">
            <div class="bcb-decision-branch">
              <span class="bcb-decision-badge--yes">
                <span class="material-symbols-outlined material-icons md-18" aria-hidden="true">check</span> Sim &bull; Fraude Comprovada
              </span>
              <p>O banco recebedor bloqueia os recursos cautelarmente por até 72h e realiza o estorno em 96h.</p>
            </div>
            <div class="bcb-decision-branch">
              <span class="bcb-decision-badge--no">
                <span class="material-symbols-outlined material-icons md-18" aria-hidden="true">close</span> Não &bull; Desacordo Comercial
              </span>
              <p>O MED não se aplica. O consumidor deve recorrer ao Procon ou Juizado Especial Cível.</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ol>
</div>
```

| O que fazer (Do) ✅ | O que não fazer (Don't) ❌ |
|---|---|
| Use `<ol>` ou listas estruturadas com badges numerados para ordem lógica de leitura. | NUNCA utilize imagens bitmap (PNG/JPG) com fluxogramas gráficos sem equivalente textual acessível. |
| Deixe os ramos alternativos (sucesso vs. recusa) explicitamente visíveis e contrabalanceados. | NUNCA omita os prazos máximos regulamentares associados a cada etapa. |

---

## 38. Tooltip Acessível (`.bcb-tooltip`)

> **Nível Atômico**: Átomo Semântico  
> **Finalidade**: Disponibilizar explicações breves, definições de termos técnicos ou siglas do Sistema Financeiro sob demanda via mouse (`hover`) e teclado (`focus`), em total conformidade com a WCAG 2.1 (Critério 1.4.13 - Content on Hover or Focus).

### Contratos de Classe e Atributos

| Classe / Atributo | Elemento | Finalidade |
|---|---|---|
| `data-tooltip="texto"` | Qualquer elemento interativo ou textual com `tabindex="0"` | Conteúdo textual da dica acessível injetado dinamicamente. |
| `data-tooltip-pos="top\|bottom\|left\|right"` | Elemento disparador | Preferência de posicionamento geométrico relativo ao gatilho. |
| `.bcb-tooltip-term` | `<span>` ou `<abbr>` | Termo técnico sublinhado com linha pontilhada institucional. |
| `.bcb-tooltip-btn` | `<button type="button">` | Botão redondo de apoio/ajuda contextual (44x44px de área de toque). |
| `role="tooltip"` | Injetado no balão dinâmico | Identificação semântica para leitores de tela com `aria-describedby`. |

### Exemplo de Implementação Canônica

```html
<!-- Termo técnico em parágrafo -->
<p>
  A liquidação das operações no âmbito do 
  <span class="bcb-tooltip-term" data-tooltip="Sistema de Pagamentos Instantâneos criado pelo BCB para transferências em tempo real 24/7." tabindex="0">Pix</span>
  ocorre no 
  <span class="bcb-tooltip-term" data-tooltip="Sistema de Pagamentos Instantâneos que liquida transações interbancárias no BCB." tabindex="0">SPI</span>.
</p>

<!-- Botão auxiliar de ajuda com ícone -->
<button type="button" class="bcb-tooltip-btn" data-tooltip="Informações confidenciais sob sigilo bancário da Lei Complementar nº 105/2001." data-tooltip-pos="top" aria-label="Informações sobre Sigilo Bancário">
  <span class="material-symbols-outlined material-icons" aria-hidden="true">help_outline</span>
</button>
```

---

## 39. Call to Action — CTA (`.bcb-cta`)

> **Nível Atômico**: Molécula Funcional  
> **Finalidade**: Destacar ações prioritárias, canais de segurança urgente ou chamadas de conversão do cidadão ou entidade financeira em páginas de serviços e normas.

### Contratos de Classe

| Classe | Finalidade |
|---|---|
| `.bcb-cta` | Container principal flexível e responsivo da chamada de ação. |
| `.bcb-cta--primary` | Variante de destaque máximo com gradiente institucional azul BCB. |
| `.bcb-cta--neutral` | Variante neutra elegante para formulários de consulta ou serviços rotineiros. |
| `.bcb-cta--centered` | Variante com alinhamento centralizado de texto e botão. |
| `.bcb-cta--stacked` | Força disposição vertical em cards estreitos ou colunas laterais. |
| `.bcb-cta__content` | Bloco textual agrupando tag, título, descrição e metadados. |
| `.bcb-cta__tag` | Pílula semântica superior identificando a natureza da ação. |
| `.bcb-cta__title` | Título persuasivo e conciso (`<h4>` ou `<h3>`). |
| `.bcb-cta__description`| Texto explicativo das orientações práticas. |
| `.bcb-cta__action` | Container do botão de ação com alinhamento responsivo. |
| `.bcb-btn-cta` | Botão dimensionado com padding ampliado e micro-interação. |

### Exemplo de Implementação Canônica (Primário e Centralizado)
```html
<!-- CTA Primário Institucional -->
<div class="bcb-cta bcb-cta--primary" role="region" aria-label="Ação Prioritária do Cidadão">
  <div class="bcb-cta__content">
    <span class="bcb-cta__tag">
      <span class="material-symbols-outlined material-icons" aria-hidden="true">security</span> Canal Oficial de Segurança
    </span>
    <h3 class="bcb-cta__title">Foi vítima de fraude ou golpe financeiro via Pix?</h3>
    <p class="bcb-cta__description">
      Registre a contestação no seu banco imediatamente para acionar o Mecanismo Especial de Devolução (MED) e bloquear os valores suspeitos em até 30 minutos.
    </p>
    <div class="bcb-cta__meta">
      <span class="material-symbols-outlined material-icons" aria-hidden="true">schedule</span> Atendimento ágil &bull; Resolução BCB nº 103/2021
    </div>
  </div>
  <div class="bcb-cta__action">
    <a href="#solicitar-med" class="btn btn-light bcb-btn-cta">
      Acionar Mecanismo MED <span class="material-symbols-outlined material-icons" aria-hidden="true">arrow_forward</span>
    </a>
  </div>
</div>

<!-- CTA Centralizado Neutro -->
<div class="bcb-cta bcb-cta--neutral bcb-cta--centered" role="region" aria-label="Notificações">
  <div class="bcb-cta__content">
    <span class="bcb-cta__tag"><span class="material-symbols-outlined material-icons">mail</span> Notificações Oficiais</span>
    <h3 class="bcb-cta__title">Receba as Atualizações Oficiais do Banco Central</h3>
    <p class="bcb-cta__description">Inscreva seu e-mail institucional para receber comunicados em primeira mão.</p>
  </div>
  <div class="bcb-cta__action">
    <a href="#newsletter" class="btn btn-primary bcb-btn-cta">Cadastrar E-mail</a>
  </div>
</div>
```

---

## 40. Carrossel Manchete Institucional (`.bcb-carousel`)

> **Nível Atômico**: Organismo Composto  
> **Finalidade**: Exibição rotativa acessível de manchetes centrais, decisões do Copom, alertas de segurança e destaques de relatórios, aderente às diretrizes WAI-ARIA Carousel e WCAG 2.2.2 (Pause, Stop, Hide).

### Contratos de Classe e Acessibilidade

| Classe / Atributo | Finalidade |
|---|---|
| `.bcb-carousel` | Elemento raiz com `role="region"`, `aria-roledescription="carrossel"` e `aria-label`. |
| `data-autoplay="true\|false"` | Ativa rotação automática temporizada (desativada automaticamente quando `prefers-reduced-motion`). |
| `data-interval="5000"` | Intervalo de exibição de cada slide em milissegundos. |
| `.bcb-carousel__inner` | Container com `aria-live="polite"` contendo a lista de slides. |
| `.bcb-carousel__slide` | Slide individual com `role="group"`, `aria-roledescription="slide"` e `aria-label="X de Y"`. |
| `.bcb-carousel__media` | Área de imagem ou ícone ilustrativo temático. |
| `.bcb-carousel__content` | Bloco textual com tag, título, lead e botão de ação. |
| `.bcb-carousel__controls` | Barra inferior de controle agrupando indicadores e botões. |
| `.bcb-carousel__btn--playpause` | Botão essencial de acessibilidade para alternar reproduzir e pausar a rotação. |

### Exemplo de Implementação Canônica

```html
<div class="bcb-carousel" data-autoplay="true" data-interval="6000" role="region" aria-roledescription="carrossel" aria-label="Destaques Institucionais do Banco Central">
  <div class="bcb-carousel__inner" aria-live="polite">
    <div class="bcb-carousel__slide is-active" role="group" aria-roledescription="slide" aria-label="1 de 2">
      <div class="bcb-carousel__media">
        <div class="bcb-carousel__media-placeholder">
          <span class="material-symbols-outlined material-icons" aria-hidden="true">account_balance</span>
        </div>
      </div>
      <div class="bcb-carousel__content">
        <span class="bcb-carousel__tag">
          <span class="material-symbols-outlined material-icons" aria-hidden="true">trending_up</span> Política Monetária
        </span>
        <h3 class="bcb-carousel__title">Copom mantém taxa Selic e reforça convergência da inflação</h3>
        <p class="bcb-carousel__lead">
          O Comitê avaliou o cenário internacional e doméstico ao definir a meta para a taxa Selic.
        </p>
        <a href="#ata" class="btn btn-primary bcb-carousel__action">
          Ler Ata do Copom <span class="material-symbols-outlined material-icons" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </div>
  </div>
  <div class="bcb-carousel__controls">
    <div class="bcb-carousel__indicators" role="tablist" aria-label="Slides">
      <button type="button" class="bcb-carousel__dot is-active" role="tab" aria-selected="true" aria-label="Slide 1" data-slide-index="0"></button>
    </div>
    <div class="bcb-carousel__nav-btns">
      <button type="button" class="bcb-carousel__btn bcb-carousel__btn--prev" aria-label="Slide anterior">
        <span class="material-symbols-outlined material-icons" aria-hidden="true">chevron_left</span>
      </button>
      <button type="button" class="bcb-carousel__btn bcb-carousel__btn--playpause" aria-label="Pausar rotação automática">
        <span class="material-symbols-outlined material-icons" aria-hidden="true">pause</span>
      </button>
      <button type="button" class="bcb-carousel__btn bcb-carousel__btn--next" aria-label="Próximo slide">
        <span class="material-symbols-outlined material-icons" aria-hidden="true">chevron_right</span>
      </button>
    </div>
  </div>
</div>
```

---

## 41. Tabelas Analíticas Oficiais (`.table-digital` e `.table-strict`)

> **Nível Atômico**: Molécula / Organismo  
> **Finalidade**: Matrizes tabulares numéricas segundo as normas do **Manual Corporativo de Padrão Visual para Tabelas e Gráficos do Banco Central do Brasil**.

### Modelos Oficiais Normativos

1. **Padrão Digital (`.table-digital`)**:
   - Destinado a páginas web, painéis, consultas operacionais e dashboards.
   - Cabeçalho com fundo corporativo `#2E4C59` e texto em `#FFFFFF`.
   - Efeito zebra suave nas linhas pares: `rgba(46, 76, 89, 0.04)`.
   - Realce de linhas prioritárias com `.bcb-row-highlight` (`rgba(242, 181, 87, 0.15)` e texto `#4a3107`).
   - Valores negativos destacados com `.num-negative` (`#B30000`, negrito WCAG AAA).

2. **Padrão Estrito / Documental (`.table-strict`)**:
   - Destinado a relatórios técnicos, Relatório de Estabilidade Financeira (REF), Relatório de Inflação e PDFs.
   - Fundo neutro sem preenchimento, separador pontilhado (`1px dotted #606060`) sob o cabeçalho.
   - Linhas sólidas de abertura e fechamento superior/inferior.
   - Linha de totalização `.bcb-row-total` na cor `#2E4C59` em negrito.
   - Separadores verticais finos `.bcb-col-separator` (`0.5pt solid #dcdcdc`).

### Regras Tipográficas e Espaciais Obrigatórias
- Tipografia: `Arial, sans-serif` estrita (título 9pt negrito, subtítulo 8pt itálico, dados 8pt).
- Entrelinha (`line-height`): 12.75pt a 14pt.
- Alinhamento: primeira coluna textual à esquerda, colunas de dados e números à direita.
- Cabeçalho flexível: `.bcb-table-header-flex` com título e unidade de medida.
- Rodapé de fontes: `.bcb-table-source` com borda superior fina de 1px.

---

## 42. Gráficos Interativos Highcharts (`.bcb-chart-container`)

> **Nível Atômico**: Organismo Composto  
> **Finalidade**: Renderização gráfica padronizada alimentada pelo tema institucional `highcharts-theme-bcb.js`, aderente às normas do Manual Corporativo do BC.

### Paleta Mestra de 12 Cores Sequenciais

A sequência de cores é estrita e imutável. As séries numéricas adotam as cores na ordem exata:

| Série | Cor HEX | RGB | Classificação |
|---|---|---|---|
| **Série 01** | `#2E4C59` | RGB(46, 76, 89) | Primária (Série principal) |
| **Série 02** | `#F2B557` | RGB(242, 181, 87) | Primária |
| **Série 03** | `#6BAEBF` | RGB(107, 174, 191) | Primária |
| **Série 04** | `#804C29` | RGB(128, 76, 41) | Primária |
| **Série 05** | `#87007C` | RGB(135, 0, 124) | Primária |
| **Série 06** | `#D46C6B` | RGB(212, 108, 107) | Primária |
| **Série 07** | `#088492` | RGB(8, 132, 146) | Secundária |
| **Série 08** | `#D295BE` | RGB(210, 149, 190) | Secundária |
| **Série 09** | `#ECCAB1` | RGB(236, 202, 177) | Secundária |
| **Série 10** | `#AEAEAE` | RGB(174, 174, 174) | Secundária |
| **Série 11** | `#736063` | RGB(115, 96, 99) | Secundária |
| **Série 12** | `#C3A061` | RGB(195, 160, 97) | Secundária |

### Diretrizes Estruturais dos Gráficos
- **Linhas de Grade (Gridlines)**: `#606060` com 50% de opacidade (`rgba(96, 96, 96, 0.5)`).
- **Tipografia**: `Arial, sans-serif` em todos os títulos, legendas, tooltips e eixos.
- **Localização pt-BR**: Formatação de milhares com ponto (`.`), decimais com vírgula (`,`) e meses em português.
- **Acessibilidade e-MAG**: O contêiner `.bcb-chart-container` deve possuir `role="region"` e `aria-label`.
- **Declaração Automática**: Pode ser instanciado via script modular ou declarativamente via `[data-bcb-chart]` no script `bcb-ui.js`.

---

## 43. Card de Notícia Editorial (`.bcb-news-card--editorial`)

> **Nível Atômico**: Molécula / Organismo  
> **Finalidade**: Cartões editoriais de notícias e manchetes jornalísticas com imagem em proporção 16:9, metadados semânticos de categoria e data, resumo informativo (lead) e ações de compartilhamento.

### Assinatura HTML Canônica
```html
<article class="bcb-news-card bcb-news-card--editorial">
  <div class="bcb-news-card__media">
    <img src="imagem-noticia.jpg" alt="Descrição da imagem da notícia">
  </div>
  <div class="bcb-news-card__body">
    <div class="bcb-news-card__meta">
      <span class="bcb-news-card__category">Copom</span>
      <time class="bcb-news-card__date" datetime="2026-03-12T18:30:00">
        <span class="material-symbols-outlined material-icons" aria-hidden="true">calendar_today</span> 12/03/2026 18:30
      </time>
    </div>
    <h3 class="bcb-news-card__title">
      <a href="/noticia/copom-selic">Copom eleva a taxa Selic para 14,25% ao ano na 268ª reunião</a>
    </h3>
    <p class="bcb-news-card__intro">
      O Comitê de Política Monetária do Banco Central decidiu elevar os juros básicos para assegurar a convergência da inflação à meta.
    </p>
    <div class="bcb-news-card__footer">
      <span class="bcb-news-card__author">Comunicação BCB</span>
      <div class="bcb-news-card__share">
        <button type="button" class="bcb-share-btn" aria-label="Compartilhar notícia">
          <span class="material-symbols-outlined material-icons md-18" aria-hidden="true">share</span>
        </button>
      </div>
    </div>
  </div>
</article>
```