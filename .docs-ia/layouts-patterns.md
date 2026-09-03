# BCB UI – Diretrizes de Layout, Grid e Padrões de UX

> **Status**: v4.0.0 (Diretrizes Oficiais de Grid 12 Colunas, Tipografia, Material Icons e Padrões Composicionais de UX).
> Este documento é a **fonte da verdade para arquitetura de informação e diagramação** no Banco Central do Brasil.
> A IA e os webdesigners devem utilizar estes princípios para projetar interfaces dinâmicas, responsivas e acessíveis a partir da semântica dos dados, sem dependência de templates rígidos.

> [!IMPORTANT]
> **Definição de Escopo de Prototipagem (Casca Fixa vs. Miolo Central):**
> No portal institucional do BCB, cabeçalho (`<header>`), rodapé (`<footer>`) e breadcrumbs (`<nav aria-label="breadcrumb">`) são componentes fixos, globais e imutáveis mantidos centralizadamente pelo CMS.
> **É TERMINANTEMENTE PROIBIDO** gerar header, footer ou breadcrumbs nos arquivos de protótipo (`prototipos/*.html`).
> A prototipagem restringe-se **exclusivamente à malha interna de conteúdo** (`<main id="conteudo-principal" class="bcb-container">` ou `main.bcb-content-body`), iniciando no `<h1>` institucional e encerrando no botão de retorno ao topo. A casca institucional é simulada exclusivamente no harness técnico (`prototipos/_harness.html`).

---

## 1. Sistema de Grid 12 Colunas & Container Institucional

Toda interface do portal interno do BCB é projetada sobre um grid flexível de 12 colunas com **gutter padrão de 24px** e container de largura máxima calibrada em **1440px**.

### 1.1 Átomos do Grid

| Classe | Finalidade | Comportamento Responsivo |
|---|---|---|
| `.bcb-container` | Container institucional centralizado | Mobile: padding 15px; Desktop (≥1200px): padding 25px; Ultra-wide (≥1520px): `max-width: 1440px` com `margin: 0 auto;`. |
| `.bcb-row` | Linha flexível com compensação de gutter | `display: flex; flex-wrap: wrap; margin: 0 -12px;`. |
| `.bcb-row--gap` | Linha com espaçamento nativo via gap | `display: flex; flex-wrap: wrap; gap: var(--bcb-spacing-lg, 24px);`. |
| `.bcb-col-12` | Largura total (100% / 12 colunas) | Ocupa 100% da largura em todas as resoluções. |
| `.bcb-col-lg-8` | Coluna analítica/editorial (70% / 8 colunas) | Ocupa 8 colunas em desktops (≥992px); 100% em telas menores. |
| `.bcb-col-lg-4` | Coluna lateral / sidebar (30% / 4 colunas) | Ocupa 4 colunas em desktops (≥992px); 100% em telas menores. |
| `.bcb-col-md-6` | Coluna proporcional 50/50 (6 colunas) | Ocupa 6 colunas em tablets/desktops (≥768px); 100% em mobile. |
| `.bcb-col-md-4` | Coluna proporcional 33/33/33 (4 colunas) | Ocupa 4 colunas em tablets/desktops (≥768px); 100% em mobile. |
| `.bcb-section` | Espaçador modular vertical entre blocos | `margin-bottom: var(--bcb-spacing-2xl, 48px);`. |

---

## 2. Tipografia Institucional & Hierarquia de Informação

A tipografia oficial do BCB prioriza legibilidade em alta densidade de dados, respeitando o Manual de Marca e as diretrizes e-MAG 3.1:

### 2.1 Famílias Tipográficas
- **Texto Corrido e UI:** `Rawline`, `Inter`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, `sans-serif`.
- **Títulos e Destaques:** `Rawline`, `Inter` ou `Ubuntu` (fontes homologadas no Manual).
- **Entrelinha e Cores:** `line-height: 1.5; color: var(--bcb-color-text, #212529);`.

### 2.2 Hierarquia Semântica Estrita (WCAG 1.3.1 / e-MAG 3.1)
- **H1 Único por Página:** Toda página interna possui **exatamente 1 tag `<h1>`** com a classe `.bcb-page-title`. O H1 nunca pode ser omitido nem duplicado.
- **Seções Principais (`<h2>`):** Dividem os grandes blocos temáticos (ex: "Série Histórica", "Etapas de Solicitação", "Atos Vinculados").
- **Subseções (`<h3>`):** Utilizadas para títulos de cards, etapas de steppers, itens de acordeão e subtópicos.
- **Parágrafos Lead:** Parágrafo de abertura com classe `.lead` destacando a síntese executiva do ato ou serviço.
- **Citações Oficiais:** Utilize `.bcb-citacao` para declarações do Presidente ou Diretores do BCB.

---

## 3. Material Symbols como Reforço Semântico

Ícones não são meros enfeites; atuam como ancoragem cognitiva rápida para o cidadão e para os servidores:

- **Sintaxe Padrão:** `<span class="material-symbols-outlined" aria-hidden="true">nome_do_icone</span>`.
- **Acessibilidade Mandatória:** Sempre inclua `aria-hidden="true"` quando o ícone acompanhar texto explicativo. Se o ícone for interativo e isolado, declare `aria-label` descritivo.
- **Mapeamento Semântico de Ícones Homologados:**
  - *Indicadores e Economia:* `analytics`, `trending_up`, `trending_down`, `account_balance`, `payments`, `currency_exchange`.
  - *Avisos e Segurança:* `warning`, `gpp_bad`, `security`, `shield`, `verified`, `lock`.
  - *Fluxos e Processos:* `check_circle`, `touch_app`, `step`, `assignment`, `schedule`, `send`.
  - *Documentos e Dados:* `description`, `picture_as_pdf`, `table_view`, `download`, `data_object`, `tune`.

---

## 4. Matriz Modular de Slots para o CMS BCB

Para viabilizar que webdesigners e editores de conteúdo recortem blocos diretamente para as regiões do CMS do portal, o agente e a equipe devem delimitar cada bloco com **comentários semânticos canônicos**:

```html
<!-- [SLOT CMS: 100% - Abertura Institucional e Lead] -->
<section class="bcb-section">
  <div class="bcb-row">
    <div class="bcb-col-12">
      <h1 class="bcb-page-title">Título Oficial</h1>
      <div class="bcb-page-meta">...</div>
      <p class="lead mt-3 text-body">Lead descritivo...</p>
    </div>
  </div>
</section>

<!-- [SLOT CMS: 33/33/33 - Grade de Indicadores Econômicos] -->
<section class="bcb-section">
  <div class="bcb-row">
    <div class="bcb-col-12 bcb-col-md-4 mb-3 mb-md-0">...Card 1...</div>
    <div class="bcb-col-12 bcb-col-md-4 mb-3 mb-md-0">...Card 2...</div>
    <div class="bcb-col-12 bcb-col-md-4">...Card 3...</div>
  </div>
</section>

<!-- [SLOT CMS: 70% Conteúdo Analítico | 30% Sidebar de Apoio] -->
<section class="bcb-section">
  <div class="bcb-row">
    <div class="bcb-col-12 bcb-col-lg-8 mb-4 mb-lg-0">...Artigo / Notícia / Tabela...</div>
    <div class="bcb-col-12 bcb-col-lg-4">...Downloads / Resoluções / Ações...</div>
  </div>
</section>

<!-- [SLOT CMS: 50/50 - Comparativos ou Orientações Duplas] -->
<section class="bcb-section">
  <div class="bcb-row">
    <div class="bcb-col-12 bcb-col-md-6 mb-3 mb-md-0">...Bloco A...</div>
    <div class="bcb-col-12 bcb-col-md-6">...Bloco B...</div>
  </div>
</section>
```

---

## 5. Padrões Canônicos de Composição e UX (Semântica de Conteúdo)

Em vez de copiar templates rígidos, a interface deve ser projetada conforme o **padrão de UX mais adequado aos dados brutos**:

### Padrão A: Painéis Analíticos e Séries Temporais
- **Indicação:** Dados de reuniões do Copom, taxa Selic, IPCA, câmbio PTAX, reservas internacionais ou estatísticas monetárias.
- **Composição Típica:**
  1. *Slot 100%:* Abertura com `<h1>`, metadados de vigência e lead contextual.
  2. *Slot 33/33/33 ou 50/50:* Destaque de métricas em `.bcb-indicator-card` com variação percentual (`.bcb-indicator-trend up|down`).
  3. *Slot 100%:* Painel de filtros (`.bcb-filter-panel`) por data ou tipo de taxa.
  4. *Slot 100%:* Tabela de dados densa com `<caption>`, alinhamento numérico à direita e botões de exportação (`.bcb-data-export`).

### Padrão B: Comunicação Normativa e Atos Regulatórios
- **Indicação:** Notas à imprensa, decisões de diretoria, circulares normativas, minutas do Pix e resoluções.
- **Composição Típica:**
  1. *Slot 100%:* Abertura com `<h1>`, badges temáticas (`.tag-bcb.primary`) e data do ato.
  2. *Slot 70/30:*
     - *Coluna 70% (`.bcb-col-lg-8`):* Texto jornalístico com hierarquia de subtítulos `<h2>`, citação diretorial (`.bcb-citacao`) e callout regulatório (`.callout.callout-warning`).
     - *Coluna 30% (`.bcb-col-lg-4`):* Bloco lateral com resoluções oficiais vinculadas (`.documentos .documento`) contendo formato e tamanho do arquivo.

### Padrão C: Serviços ao Cidadão e Guias Passo a Passo
- **Indicação:** Registrato, Valores a Receber, Mecanismo Especial de Devolução do Pix (MED), peticionamento e ouvidoria.
- **Composição Típica:**
  1. *Slot 100%:* Abertura institucional com `<h1>`, selo de serviço digital e orientações gerais.
  2. *Slot 100%:* Stepper cronológico (`<ol class="process-list">`) com etapas claras de acesso.
  3. *Slot 70/30:*
     - *Coluna 70%:* Tabela explicativa de requisitos ou documentos necessários.
     - *Coluna 30%:* Box elevado de alerta antifraude (`.callout.callout-warning.callout-elevated`) e orientações sobre contas Gov.br (Prata/Ouro).
  4. *Slot 100%:* Seção de dúvidas frequentes com acordeão oficial acessível (`.accordion.modelo-1`).

### Padrão D: Conteúdo Educativo e Leitura Aprofundada
- **Indicação:** Cartilhas de cidadania financeira, guias de aposentadoria, medidas preventivas e educação financeira escolar.
- **Composição Típica:**
  1. *Slot 100% (Largura Controlada):* Container centralizado (`.bcb-row.justify-content-center` com `.bcb-col-12.bcb-col-lg-10`) para evitar fadiga visual.
  2. *Slot 50/50:* Destaques práticos, reflexões e caixas comparativas (`.bcb-col-md-6`).
  3. *Slot 100%:* Dicas práticas destacadas com `.tip-box` e links para download de materiais de apoio.

---

## 6. Padrões de Estados de Interface (UI States)

### 6.1 Estado Vazio (Empty State)
Quando uma busca ou filtro de série temporal não retornar registros:

```html
<div class="bcb-empty-state bcb-empty-state-bordered" role="region" aria-label="Resultado da consulta">
  <div class="bcb-empty-state-icon">
    <span class="material-symbols-outlined" aria-hidden="true">search_off</span>
  </div>
  <h3 class="bcb-empty-state-title">Nenhum registro encontrado</h3>
  <p class="bcb-empty-state-desc">
    Não foram encontrados dados para o período selecionado. Tente ajustar os parâmetros de busca.
  </p>
  <div class="bcb-empty-state-actions">
    <button type="button" class="btn btn-primary btn-sm d-inline-flex align-items-center" style="gap: 0.35rem;">
      <span class="material-symbols-outlined" style="font-size: 1rem;" aria-hidden="true">filter_alt_off</span> Limpar Filtros
    </button>
  </div>
</div>
```

---

### 6.2 Estado de Carregamento (Skeleton Screen)
Durante a requisição de séries temporais ou APIs de dados abertos:

```html
<div class="row" aria-busy="true" aria-label="Carregando indicadores...">
  <div class="col-md-6">
    <div class="bcb-skeleton-indicator">
      <div class="bcb-skeleton bcb-skeleton-text w-50 mb-2"></div>
      <div class="bcb-skeleton" style="height: 2.25rem; width: 40%; margin-bottom: 0.5rem;"></div>
      <div class="bcb-skeleton bcb-skeleton-text w-75 mb-0"></div>
    </div>
  </div>
</div>
```

---

### 6.3 Estado de Erro ou Indisponibilidade (Error State)
Em caso de falha de conexão ou timeout em consultas de séries históricas:

```html
<div class="callout callout-danger callout-left-bordered my-4" role="alert">
  <span class="material-symbols-outlined callout-icon" aria-hidden="true">error_outline</span>
  <div class="callout-content">
    <h3 class="callout-title h5">Não foi possível carregar os dados</h3>
    <p class="mb-3">O serviço de dados do Banco Central está temporariamente indisponível. Por favor, tente novamente em instantes.</p>
    <button type="button" class="btn btn-danger btn-sm d-inline-flex align-items-center" onclick="window.location.reload();">
      <span class="material-symbols-outlined mr-1" aria-hidden="true">refresh</span> Tentar Novamente
    </button>
  </div>
</div>
```
