# BCB UI – Layouts & Architecture Blueprints

> **Status**: v1.0 (Padrões Oficiais de Layout para Automação por IA — Mar/2026).
> Este documento fornece **blueprints estruturais completos** dos 4 padrões de página mais frequentes no portal do Banco Central do Brasil. Os agentes de IA devem utilizar estes esqueletos como base garantida de composição.

---

## 1. Blueprint 1: Página de Indicador Econômico

**Casos de Uso**: Taxa Selic, IPCA, Câmbio PTAX, Reservas Internacionais, Poupança.

### Diagrama Estrutural (Wireframe)
```
+---------------------------------------------------------------+
| Breadcrumb: Início > Economia > Taxa Selic                   |
+---------------------------------------------------------------+
| H1: Taxa Selic (Meta Copom)                                   |
| Meta info: Atualizado em 12/03/2026 · Fonte: BCB/Copom        |
+---------------------------------------------------------------+
| [Card Indicador: 14,25%] | [Card Indicador: Variação]         |
+---------------------------------------------------------------+
| Callout Brand: Último Comunicado da Decisão do Copom          |
+---------------------------------------------------------------+
| Data Table Responsiva (Série Histórica com Ordenação/Paging)  |
+---------------------------------------------------------------+
| Downloads de Dados Abertos (CSV, JSON, PDF)                   |
+---------------------------------------------------------------+
```

### Código Esqueleto (HTML Blueprint)
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Taxa Selic – Banco Central do Brasil</title>
  <meta name="description" content="Taxa básica de juros da economia brasileira definida pelo Copom.">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/bcb-style.css">
</head>
<body>
  <!-- Conteúdo Principal -->
  <main class="container py-4 mb-5" id="conteudo-principal">
    <!-- Breadcrumb -->
    <nav aria-label="Trilha de navegação" class="mb-3">
      <ul class="breadcrumb-bcb">
        <li><a href="/">Início</a></li>
        <li><a href="/estabilidade-financeira">Estabilidade Financeira</a></li>
        <li aria-current="page">Taxa Selic</li>
      </ul>
    </nav>

    <h1 class="bcb-page-title">Taxa Selic (Meta Copom)</h1>
    <div class="bcb-page-meta">
      <span class="tag-bcb primary">Indicador Oficial</span>
      <span>Última atualização: 12/03/2026</span>
    </div>

    <!-- Indicadores em Grade -->
    <div class="row mb-4">
      <div class="col-md-6 mb-3 mb-md-0">
        <div class="bcb-indicator-card">
          <div class="bcb-indicator-label">Taxa Meta Atual</div>
          <div class="bcb-indicator-value">14,25%
            <small class="bcb-indicator-trend up">
              <span class="material-icons" aria-hidden="true">arrow_upward</span> +1,00 p.p.
            </small>
          </div>
          <div class="bcb-indicator-meta">Vigência: a partir de 13/03/2026</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="bcb-indicator-card accent-green">
          <div class="bcb-indicator-label">Taxa Selic Efetiva (Anualizada)</div>
          <div class="bcb-indicator-value">14,15%</div>
          <div class="bcb-indicator-meta">Média ponderada das operações registradas no Selic</div>
        </div>
      </div>
    </div>

    <!-- Callout de Decisão -->
    <div class="callout callout-brand callout-left-bordered">
      <span class="material-icons callout-icon" aria-hidden="true">gavel</span>
      <div class="callout-content">
        <h2 class="callout-title h4">Decisão da 268ª Reunião do Copom</h2>
        <p>O Comitê de Política Monetária decidiu, por unanimidade, elevar a taxa Selic para 14,25% a.a., avaliando o cenário prospectivo de inflação.</p>
        <div class="callout-actions">
          <a href="/notas-copom" class="btn btn-primary btn-sm">Ler nota à imprensa</a>
        </div>
      </div>
    </div>

    <!-- Tabela Histórica -->
    <div class="bcb-data-table-container">
      <div class="bcb-data-table-header">
        <div>
          <h2 class="bcb-data-table-title h5">Série Histórica das Decisões do Copom</h2>
        </div>
      </div>
      <div class="table-responsive">
        <table class="bcb-data-table">
          <caption>Histórico das taxas de juros fixadas pelo Banco Central.</caption>
          <thead>
            <tr>
              <th scope="col">Reunião</th>
              <th scope="col">Data</th>
              <th scope="col" class="text-numeric">Meta (% a.a.)</th>
              <th scope="col" class="text-center">Variação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">268ª</th>
              <td>12/03/2026</td>
              <td class="text-numeric"><strong>14,25%</strong></td>
              <td class="text-center"><span class="bcb-trend-badge positive">+1,00</span></td>
            </tr>
            <tr>
              <th scope="row">267ª</th>
              <td>29/01/2026</td>
              <td class="text-numeric"><strong>13,25%</strong></td>
              <td class="text-center"><span class="bcb-trend-badge neutral">0,00</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <script src="../assets/js/bcb-ui.js"></script>
</body>
</html>
```

---

## 2. Blueprint 2: Consulta de Dados e Normativos

**Casos de Uso**: Busca de Resoluções, Instruções Normativas, Estatísticas Monetárias, Tarifas Bancárias.

### Diagrama Estrutural (Wireframe)
```
+---------------------------------------------------------------+
| Breadcrumb: Início > Normas > Consulta                       |
+---------------------------------------------------------------+
| H1: Busca de Normativos e Resoluções                          |
+---------------------------------------------------------------+
| [Barra de Busca Overlay com Input Grande + Chips Rápidos]     |
+---------------------------------------------------------------+
| ROW (2 Colunas):                                              |
| - Col 4: Painel de Filtros (Datas, Tipo de Ato, Situação)     |
| - Col 8: Filtros Ativos + Lista/Tabela de Resultados Paginada |
+---------------------------------------------------------------+
```

### Componentes Chave:
- `.bcb-search-overlay` com `role="search"`.
- `.bcb-filter-panel` com `.custom-checkbox`, `.custom-switch` e `.bcb-date-range`.
- `.bcb-active-filters` com chips removíveis e contador de resultados.
- `.bcb-data-table-container` com badges de status (`.tag-bcb.primary`).

---

## 3. Blueprint 3: FAQ e Guia de Serviço ao Cidadão

**Casos de Uso**: Registrato, Valores a Receber, Mecanismo Especial de Devolução do Pix (MED), Denúncias e Reclamações.

### Diagrama Estrutural (Wireframe)
```
+---------------------------------------------------------------+
| Breadcrumb: Início > Cidadania Financeira > Serviço           |
+---------------------------------------------------------------+
| ROW (Layout 2 Colunas com Sidebar Sticky):                    |
| - Col 4 (Sidebar): Menu de Âncoras (.bd-sidebar TOC)          |
| - Col 8 (Conteúdo Principal):                                 |
|     - H1: Título do Serviço                                   |
|     - Callout Alerta: Cuidados contra Golpes / Prazos         |
|     - H2: O que é e para que serve                            |
|     - H2: Passo a Passo (Process List numerada 1..N)          |
|     - H2: Perguntas Frequentes (Accordion Expansível)         |
|     - H2: Downloads de Manuais e Guias                        |
+---------------------------------------------------------------+
| Botão Voltar ao Topo (.bcb-back-to-top)                       |
+---------------------------------------------------------------+
```

### Componentes Chave:
- `.bd-sidebar` com `.bd-toc` e links âncora `#secao`.
- `.callout.callout-warning` para avisos antifraude.
- `.process-list` para etapas sequenciais de execução do serviço.
- `.accordion.modelo-1` para dúvidas frequentes.
- `.documentos .documento` para manuais em PDF.

---

## 4. Blueprint 4: Landing Page Institucional / Produto

**Casos de Uso**: Drex (Moeda Digital), Pix, Open Finance, Agenda BC#, Cidadania Financeira.

### Diagrama Estrutural (Wireframe)
```
+---------------------------------------------------------------+
| Breadcrumb Opcional                                           |
+---------------------------------------------------------------+
| H1 Institucional + Hero Banner com Imagem e CTA Principal     |
+---------------------------------------------------------------+
| Grade 3 Colunas: Cards de Links (.listalinks-light modelo-5)  |
+---------------------------------------------------------------+
| Timeline Horizontal: Cronograma de Fases e Entregas           |
+---------------------------------------------------------------+
| Carrossel de Vídeos Explicativos (YouTube 16:9)               |
+---------------------------------------------------------------+
| Abas de Navegação (.bcb-navegacaoabas) para diferentes perfis |
+---------------------------------------------------------------+
```

### Componentes Chave:
- `.bcb-hero-banner` (com variação institucional ou sustentabilidade).
- `.listalinks-light.modelo-5` (caixas verticais de serviço com ícone grande).
- `.timeline-horizontal` com `.timeline-h-step.active`.
- `.videos-destaque` com `.video-item` e iframes acessíveis.
- `.bcb-navegacaoabas` com chanfro `.line` e abas Cidadão / Empresas.

---

## 5. Padrões de Estados de Interface (UI States)

Para tabelas financeiras, consultas de dados e componentes assíncronos, utilize sempre os padrões de estado oficiais:

### 5.1 Estado Vazio (Empty State)
Quando uma consulta ou filtro não retornar registros:

```html
<div class="bcb-empty-state text-center py-5 px-3">
  <div class="empty-state-icon mb-3">
    <span class="material-icons" style="font-size: 4rem; color: var(--bcb-gray-400);" aria-hidden="true">search_off</span>
  </div>
  <h3 class="h5 font-weight-bold text-dark mb-2">Nenhum registro encontrado</h3>
  <p class="text-muted mb-4" style="max-width: 480px; margin-left: auto; margin-right: auto;">
    Não foram encontrados normativos ou decisões para o período e critérios selecionados. Tente ajustar os filtros de busca.
  </p>
  <button type="button" class="btn btn-outline-primary btn-sm bcb-clear-all-filters">
    <span class="material-icons mr-1" aria-hidden="true">refresh</span> Limpar todos os filtros
  </button>
</div>
```

---

### 5.2 Estado de Carregamento (Skeleton Screen / Loading)
Durante a requisição de séries temporais ou cálculo de indicadores:

```html
<!-- Skeleton para Cards de Indicador -->
<div class="row">
  <div class="col-md-4">
    <div class="bcb-indicator-card bcb-skeleton-loading" aria-busy="true" aria-label="Carregando indicador...">
      <div class="skeleton-line" style="height: 14px; width: 60%; background: var(--bcb-gray-200); border-radius: 4px; margin-bottom: 12px;"></div>
      <div class="skeleton-line" style="height: 36px; width: 85%; background: var(--bcb-gray-300); border-radius: 6px; margin-bottom: 8px;"></div>
      <div class="skeleton-line" style="height: 12px; width: 50%; background: var(--bcb-gray-200); border-radius: 4px;"></div>
    </div>
  </div>
</div>

<!-- Skeleton para Linhas de Tabela de Dados -->
<div class="table-responsive" aria-busy="true">
  <table class="bcb-data-table">
    <caption class="sr-only">Carregando dados da série histórica...</caption>
    <thead>
      <tr>
        <th scope="col">Reunião</th>
        <th scope="col">Data</th>
        <th scope="col" class="text-numeric">Meta (% a.a.)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><div style="height: 16px; width: 80px; background: var(--bcb-gray-200); border-radius: 4px;"></div></td>
        <td><div style="height: 16px; width: 100px; background: var(--bcb-gray-200); border-radius: 4px;"></div></td>
        <td class="text-numeric"><div style="height: 16px; width: 60px; background: var(--bcb-gray-300); border-radius: 4px; margin-left: auto;"></div></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

### 5.3 Estado de Erro / Indisponibilidade de Dados (Error State)
Em caso de falha de conexão com os serviços de dados abertos ou timeout de API:

```html
<div class="callout callout-danger callout-left-bordered my-4" role="alert">
  <span class="material-icons callout-icon" aria-hidden="true">error_outline</span>
  <div class="callout-content">
    <h3 class="callout-title h5">Não foi possível carregar a série histórica</h3>
    <p class="mb-3">O serviço de dados do Banco Central está temporariamente indisponível para esta consulta. Por favor, tente novamente em alguns instantes.</p>
    <button type="button" class="btn btn-danger btn-sm d-inline-flex align-items-center" onclick="window.location.reload();">
      <span class="material-icons mr-1" aria-hidden="true">refresh</span> Tentar Novamente
    </button>
  </div>
</div>
```
