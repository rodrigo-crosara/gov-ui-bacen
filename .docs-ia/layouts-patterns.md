# BCB UI – Diretrizes de Layout, Grid e Padrões de UX (v5.0)

> **Status**: v5.0 (Diretrizes Canônicas de Grid 12 Colunas, Tipografia, Material Icons e Contratos Modulares de UX).
> Este documento é a **fonte da verdade para arquitetura de informação e diagramação** no Banco Central do Brasil.
> A IA e os webdesigners devem utilizar estes contratos semânticos para projetar interfaces dinâmicas, responsivas e acessíveis a partir da semântica dos dados, sem dependência de templates rígidos.

> [!IMPORTANT]
> **Definição de Escopo de Prototipagem (Casca Global Suprimida vs. Corpo Central de Conteúdo):**
> No portal institucional do BCB, barra de governo (`#barra-brasil`), cabeçalho (`<header>`), rodapé (`<footer>`) e breadcrumbs (`<nav aria-label="breadcrumb">`) são componentes fixos, globais e imutáveis mantidos centralizadamente pelo CMS institucional e simulados dinamicamente no visualizador técnico (`prototipos/_harness.html`).
> **É TERMINANTEMENTE PROIBIDO** gerar `<html>`, `<head>`, `<body>`, `<!DOCTYPE>`, tags `<script>`, casca externa (`<header>`, `<footer>`, breadcrumbs) ou estilos inline (`style="..."`) nos arquivos de protótipo (`prototipos/*.html`).
> A prototipagem restringe-se **exclusivamente à malha interna de conteúdo** (`<main id="conteudo-principal" class="bcb-container container py-4 mb-5">... </main>`), iniciando no `<h1>` institucional e encerrando no botão padronizado de retorno ao topo. Todas as diretrizes de casca global estão formalmente **suprimidas** das tarefas de prototipagem de página.

---

## 1. Sistema de Grid 12 Colunas & Container Institucional

Toda interface do portal interno do BCB é projetada sobre um grid modular flexível de 12 colunas com **gutter padrão de 24px** e container de largura máxima calibrada em **1440px**.

### 1.1 Átomos Estruturais do Grid

| Contrato de Classe | Tag Semântica Recomendada | Finalidade no Layout | Comportamento Responsivo |
|---|---|---|---|
| `.bcb-container` / `.container` | `<main>` ou `<div>` | Container institucional centralizado | Mobile (<768px): padding 15px; Desktop (≥1200px): padding 25px; Ultra-wide (≥1520px): `max-width: 1440px; margin: 0 auto;`. |
| `.bcb-row` / `.row` | `<div>` | Linha flexível com compensação de gutter | `display: flex; flex-wrap: wrap; margin: 0 -12px;`. |
| `.bcb-col-12` / `.col-12` | `<div>` | Largura total (100% / 12 colunas) | Ocupa 100% da largura disponível em todas as resoluções. |
| `.bcb-col-lg-8` / `.col-lg-8` | `<div>` | Coluna analítica/editorial (70% / 8 colunas) | Ocupa 8 colunas em desktops (≥992px); 100% em mobile e tablets. |
| `.bcb-col-lg-4` / `.col-lg-4` | `<div>` | Coluna lateral / sidebar (30% / 4 colunas) | Ocupa 4 colunas em desktops (≥992px); 100% em mobile e tablets. |
| `.bcb-col-md-6` / `.col-md-6` | `<div>` | Coluna proporcional 50/50 (6 colunas) | Ocupa 6 colunas em tablets/desktops (≥768px); 100% em mobile. |
| `.bcb-col-md-4` / `.col-md-4` | `<div>` | Coluna proporcional 33/33/33 (4 colunas) | Ocupa 4 colunas em tablets/desktops (≥768px); 100% em mobile. |
| `.bcb-section` | `<section>` | Espaçador modular vertical entre blocos | `margin-bottom: var(--bcb-spacing-2xl, 48px);`. |

---

## 2. Tipografia Institucional & Hierarquia de Informação

A tipografia oficial do BCB prioriza clareza, alta legibilidade e conformidade rigorosa com o e-MAG 3.1 e WCAG 1.3.1:

### 2.1 Contratos Tipográficos
- **Texto Corrido e UI:** Família `Inter`, `Rawline`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, `sans-serif`.
- **Títulos e Destaques:** Família `Inter`, `Ubuntu` ou `Rawline` com peso semântico adequado (`font-weight: 700`).
- **Valores Financeiros de Destaque:** Tipografia `Cormorant Garamond` ou `Inter` com classe `.bcb-kpi-value` ou `.bcb-indicator-value`.
- **Cores Oficiais:** `var(--bcb-color-text)` ou `.text-body` para corpo; `var(--bcb-color-neutral-40)` ou `.text-muted` para metadados; `var(--bcb-brand-azul-blue)` ou `.text-bcb-brand` para títulos.

### 2.2 Hierarquia Semântica Estrita (WCAG 1.3.1 / e-MAG 3.1)
- **H1 Único por Página:** Exatamente **1 tag `<h1>`** por protótipo com a classe `.bcb-page-title`. Proibido omitir, duplicar ou inserir elementos antes do H1.
- **Seções Principais (`<h2>`):** Identificam os grandes blocos temáticos (ex.: "Posicionamento da Autoridade Monetária", "Série Histórica", "Como Solicitar").
- **Subseções (`<h3>`):** Utilizadas para títulos de cards, etapas de steppers, itens de acordeão e subtópicos. NUNCA pule níveis (ex.: de `<h1>` direto para `<h3>`).
- **Parágrafos Lead:** Parágrafo de abertura com a classe `.lead` destacando a síntese executiva do ato ou serviço.

---

## 3. Contratos de Iconografia (Material Icons)

- **Biblioteca Homologada:** Google Material Symbols Outlined (`.material-symbols-outlined.material-icons`).
- **Acessibilidade Decorativa:** Sempre inclua `aria-hidden="true"` quando o ícone acompanhar texto explicativo:
  ```html
  <span class="material-symbols-outlined material-icons md-16 mr-1" aria-hidden="true">arrow_upward</span>
  ```
- **Acessibilidade Interativa (Ícone Isolado):** Botões apenas com ícone exigem obrigatoriamente `aria-label` descritivo na tag de ação:
  ```html
  <button type="button" class="btn btn-outline-secondary btn-icon" aria-label="Imprimir relatório">
    <span class="material-symbols-outlined material-icons" aria-hidden="true">print</span>
  </button>
  ```
- **Escala Canônica de Tamanhos:**
  - `.md-16`: 16px (micro-ações, inline com texto, badges)
  - `.md-18`: 18px (acordeões, botões compactos)
  - `.md-20`: 20px (títulos de cards, callouts compactos)
  - `.md-24`: 24px (tamanho padrão de ação)
  - `.md-36`: 36px (empty states, destaques)

---

## 4. Matriz Modular de Slots para o CMS BCB

Para permitir o recorte direto de blocos para o CMS do portal, delimite cada bloco com **comentários semânticos canônicos de slots**:

```html
<!-- [SLOT CMS: 100% - Abertura Institucional e Lead] -->
<section class="bcb-section">
  <div class="bcb-row">
    <div class="bcb-col-12">
      <h1 class="bcb-page-title">Título Oficial da Página</h1>
      <div class="bcb-page-meta">
        <span class="tag-bcb primary">Categoria</span>
        <span>Publicado em: DD/MM/AAAA &bull; Banco Central do Brasil</span>
      </div>
      <p class="lead mt-3 text-body">Lead descritivo contextualizando o objetivo do ato ou serviço...</p>
    </div>
  </div>
</section>

<!-- [SLOT CMS: 33/33/33 - Grade de Indicadores em Destaque] -->
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

### Padrão A: Painéis Analíticos e Séries Temporais (SGS)
- **Indicação:** Copom, taxa Selic, IPCA, câmbio PTAX, reservas internacionais ou estatísticas monetárias.
- **Composição Típica:**
  1. *Slot 100%:* Abertura com `<h1>`, metadados de vigência e lead contextual.
  2. *Slot 33/33/33 ou 50/50:* Destaque de métricas em `.bcb-indicator-card` com variação percentual (`.bcb-indicator-trend up|down|neutral`).
  3. *Slot 100%:* Painel de filtros facetados por período ou status.
  4. *Slot 100%:* Tabela densa com `<caption>`, alinhamento numérico à direita e barra de exportação (`.bcb-data-export`).

### Padrão B: Comunicação Normativa e Atos Regulatórios
- **Indicação:** Notas à imprensa, decisões da Diretoria Colegiada, circulares normativas, minutas e resoluções.
- **Composição Típica:**
  1. *Slot 100%:* Abertura com `<h1>`, tags temáticas (`.tag-bcb.primary`) e data de publicação.
  2. *Slot 70/30:*
     - *Coluna 70% (`.bcb-col-lg-8`):* Texto jornalístico com subtítulos `<h2>`, citação diretorial (`.bcb-citacao` com `<cite class="blockquote-footer">`) e callout regulatório (`.callout.callout-warning`).
     - *Coluna 30% (`.bcb-col-lg-4`):* Bloco lateral com resoluções oficiais vinculadas (`.documentos .documento`) contendo formato e tamanho do arquivo em KB/MB.

### Padrão C: Serviços ao Cidadão e Guias Passo a Passo
- **Indicação:** Registrato, Valores a Receber, Mecanismo Especial de Devolução do Pix (MED), peticionamento e ouvidoria.
- **Composição Típica:**
  1. *Slot 100%:* Abertura institucional com `<h1>`, tag de serviço público e orientações gerais.
  2. *Slot 100%:* Alerta crítico de segurança elevado contra fraudes (`.callout.callout-warning.callout-elevated`).
  3. *Slot 70/30:*
     - *Coluna 70%:* Stepper cronológico (`<ol class="process-list">`) e acordeão de dúvidas (`.accordion.modelo-1`).
     - *Coluna 30%:* Card de prazos-chave e callout de canais oficiais (Central 145).

### Padrão D: Refatoração Semântica de Conteúdo Legado
- **Indicação:** Modernização de páginas antigas estruturadas com tabelas de layout, tags `<font>` ou estilos inline.
- **Composição Típica:**
  1. *Slot 100%:* Normalização do título no `<h1>` padronizado com classe `.bcb-page-title`.
  2. *Slot 70/30:* Conversão das tabelas em colunas proporcionais de grid 12 (`.bcb-col-lg-8` para conteúdo e `.bcb-col-lg-4` para atos vinculados).
  3. *Componentes Semânticos:* Substituição de caixas coloridas obsoletas por `.callout` acessível e cards institucionais `.bg-bcb-surface`.

### Padrão E: Painéis Comparativos e Tarifários do Sistema Financeiro
- **Indicação:** Comparativo de taxas de juros, rankings de tarifas bancárias, limites de crédito e condições operacionais de cooperativas/bancos.
- **Composição Típica:**
  1. *Slot 100%:* Abertura com `<h1>`, lead explicativo e data de apuração da amostra.
  2. *Slot 33/33/33:* Destaque de métricas médias e medianas do mercado com `.bcb-indicator-card--advanced`.
  3. *Slot 100%:* Tabela comparativa `.bcb-table-comparison` com barra de filtros locais integrados por segmento e botões de exportação CSV/JSON.

### Padrão F: Roteiros Decisórios e Fluxos Operacionais de Atendimento
- **Indicação:** Resolução de conflitos financeiros, fluxos de contestação de fraude, habilitação de operadores e peticionamento administrativo.
- **Composição Típica:**
  1. *Slot 100%:* Abertura institucional com `<h1>` e alerta regulatório preliminar em `.callout.callout-warning`.
  2. *Slot 70/30:*
     - *Coluna 70% (`.bcb-col-lg-8`):* Fluxograma textual acessível (`.bcb-decision-flow`) com bifurcações claras (*Se Fraude* vs. *Se Desacordo*) e prazos legais destacados.
     - *Coluna 30% (`.bcb-col-lg-4`):* Card de canais de atendimento oficiais (Ouvidoria BCB 145, e-SIC) e orientações de segurança.

---

## 6. Padrões de Estados de Interface (UI States — Zero Inline Styles)

### 6.1 Estado Vazio (Empty State)
Quando uma consulta ou filtro não retornar registros:

```html
<div class="bcb-empty-state bcb-empty-state-bordered" role="region" aria-label="Resultado da consulta">
  <div class="bcb-empty-state-icon">
    <span class="material-symbols-outlined material-icons md-36" aria-hidden="true">search_off</span>
  </div>
  <h3 class="bcb-empty-state-title">Nenhum registro encontrado</h3>
  <p class="bcb-empty-state-desc">
    Não foram encontrados dados para os critérios selecionados. Tente ajustar os filtros de busca.
  </p>
  <div class="bcb-empty-state-actions">
    <button type="button" class="btn btn-primary btn-sm d-inline-flex align-items-center gap-1" data-action="reset-filters">
      <span class="material-symbols-outlined material-icons md-16" aria-hidden="true">filter_alt_off</span>
      <span>Limpar Filtros</span>
    </button>
  </div>
</div>
```

---

### 6.2 Estado de Carregamento (Skeleton Screen)
Durante o consumo assíncrono de séries temporais ou APIs de dados:

```html
<div class="bcb-row" aria-busy="true" aria-label="Carregando indicadores econômicos...">
  <div class="bcb-col-12 bcb-col-md-6">
    <div class="bcb-skeleton-indicator p-3 border rounded bg-bcb-surface">
      <div class="bcb-skeleton bcb-skeleton-text w-50 mb-2"></div>
      <div class="bcb-skeleton bcb-skeleton-value w-25 mb-2"></div>
      <div class="bcb-skeleton bcb-skeleton-text w-75 mb-0"></div>
    </div>
  </div>
</div>
```

---

### 6.3 Estado de Erro ou Indisponibilidade (Error State)
Em caso de indisponibilidade de serviço ou falha de requisição:

```html
<div class="callout callout-danger callout-left-bordered my-4" role="alert">
  <span class="material-symbols-outlined material-icons callout-icon" aria-hidden="true">error_outline</span>
  <div class="callout-content">
    <h3 class="callout-title h5">Não foi possível carregar os dados</h3>
    <p class="mb-3 text-body">O serviço de dados do Banco Central está temporariamente indisponível. Por favor, tente novamente em instantes.</p>
    <button type="button" class="btn btn-danger btn-sm d-inline-flex align-items-center gap-1" data-action="retry">
      <span class="material-symbols-outlined material-icons md-16" aria-hidden="true">refresh</span>
      <span>Tentar Novamente</span>
    </button>
  </div>
</div>
```

---

## 7. Padrões de Destaque Editorial, Ações Prioritárias e Apoio Contextual

### 7.1 Carrossel Manchete Institucional no Topo Editorial
- **Localização:** Posicionado logo abaixo do `<h1>` institucional e parágrafo `.lead`, servindo como manchete rotativa para até 3 a 5 tópicos de máxima relevância.
- **Acessibilidade Obrigatória:** Sempre fornecer controles manuais de pausa/reprodução e respeitar a preferência do usuário `prefers-reduced-motion`.
- **Composição:** Imagem ou ícone temático à esquerda (desktop), tag de assunto, título persuasivo em `<h4>` ou `<h3>`, parágrafo resumo e botão primário direcionador.

### 7.2 Bloco de Chamada para Ação (Call to Action — CTA)
- **Localização:** Final de jornadas de esclarecimento (ex.: após regras do MED ou explicação do Registrato) ou como destaque urgente no meio da página.
- **Variantes Semânticas:**
  - `.bcb-cta--primary`: Gradiente institucional azul profundo com botão em alto contraste para ações críticas de segurança ou serviços essenciais.
  - `.bcb-cta--neutral`: Fundo neutro com borda suave para consultas secundárias e formulários rotineiros.

### 7.3 Tooltips e Dicionário de Siglas Técnicas
- **Aplicação Estrita:** Termos financeiros com siglas complexas (`Selic`, `SPI`, `MED`, `PSP`, `PTAX`, `IPCA`) devem ser envolvidos em `<span class="bcb-tooltip-term" data-tooltip="...">` com `tabindex="0"`.
- **WCAG 1.4.13:** Dicas contextuais nunca devem ocultar conteúdo essencial permanentemente e devem fechar ao pressionar a tecla `Escape`.

