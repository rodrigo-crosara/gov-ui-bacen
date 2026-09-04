# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [2.5.2] — 2026-09-04

### Adicionado
- **Gaveta Retrátil de Demandas no Harness (`prototipos/_harness.html`):**
  - Botão `#toggleDocBtn` com o texto "Ver Demanda" e ícone `description` na barra de ferramentas superior.
  - Gaveta lateral retrátil offcanvas à direita (`#docDrawer`, largura de ~420px com sombra, scroll independente e atalho de teclado `Escape` para fechar) para exibir o conteúdo da demanda (.md), permitindo abrir e fechar sem disputar nem alterar a área do `<iframe>`.
  - Leitura automática do parâmetro `doc` da URL (ex.: `?src=...&doc=01-comunicado-normativo.md` ou `?file=...&doc=...`) com abertura imediata e carregamento do respectivo arquivo de `.docs-ia/exemplos-demandas/`.
  - Mecanismo resiliente de contingência para execuções sob o protocolo `file:///` ou falhas de rede, disponibilizando link alternativo de abertura direta no navegador e renderização instantânea dos dados estruturados de insumo da demanda.

### Modificado
- **Calibração Dimensional e Cabeçalho de Tabelas Analíticas (`assets/css/_03-atoms/_tables.css`):**
  - Aplicação estrita de `background-color: var(--bcb-color-primary, #2E4C59) !important` e `color: #ffffff !important` diretamente em `.table-digital thead th`, assegurando que todas as células de cabeçalho (incluindo `rowspan` e `colspan`) recebam o fundo azul institucional e tipografia branca.
  - Prevenção do achatamento de colunas numéricas: inclusão de `overflow-x: auto` e rolagem suave em `.bcb-table-wrapper`, definição de `min-width: 760px` em `.bcb-table`, largura de 28% com `min-width: 180px` na primeira coluna descritiva (`th:first-child`, `td:first-child`), e `min-width: 48px`, `white-space: nowrap` e alinhamento à direita nas colunas numéricas subsequentes.
  - Vitrine oficial `pages/graficos.html` atualizada para utilizar `<table class="bcb-table table-digital">` envolvida diretamente por `.bcb-table-wrapper`, sem interferência de classes genéricas do Bootstrap.

## [2.5.1] — 2026-09-04

### Removido
- **Simulação de Casca Institucional em `prototipos/_harness.html`:**
  - Remoção integral dos blocos de simulação de casca institucional (`#simulatedShellTop` com Barra Brasil, Header BCB e Breadcrumb, e `#simulatedShellBottom` com Rodapé BCB).
  - Remoção da barra de ferramentas dos controles de alternância "Com Casca / Puro" (`#toggleShellBtn`), painel retrátil de briefing (`#briefingDrawer`), botão de cópia de HTML (`#btnCopyHtml`) e seletores duplicados de tema.
  - Limpeza completa de todas as classes CSS `.simulated-*` e funções/variáveis JavaScript associadas (`shellMode`, `simulatedBreadcrumbTitle`).

### Modificado
- **Visualizador Técnico de Protótipos (`prototipos/_harness.html`):**
  - Foco exclusivo na pré-visualização limpa do `<iframe>` nativo: largura e altura a 100% fluidas no modo Desktop, e dispositivos com moldura e cantos arredondados nos modos Tablet (768px) e Mobile (375px).
  - Barra de ferramentas superior minimalista contendo estritamente: Identificação institucional, Seletor de protótipos (`#selectPrototipo`), Alternador de viewports (Desktop, Tablet 768px, Mobile 375px) e Botão "Abrir em nova aba" (`#btnOpenNewTab` com `target="_blank"` e `rel="noopener noreferrer"`).
- **Documentação de Protótipos e Guia de IA (`pages/prototipos.html` e `pages/automacao-ia.html`):**
  - Atualização dos cartões conceituais, etapas de fluxo e botões de inspeção dos protótipos ativos para refletir a homologação direta no visualizador técnico sem injeção de cascas simuladas.

## [2.5.0] — 2026-09-04

### Adicionado
- **Integração do Manual Corporativo de Padrão Visual para Tabelas e Gráficos do BCB:**
  - **Design Tokens Oficiais (`tokens.json` & `_tokens.css`):** Criação das famílias semânticas `color.chart` (paleta sequencial de 12 cores corporativas com 6 primárias e 6 secundárias, além da linha de grade neutra em 50% de opacidade) e `color.table` (variáveis estruturais para tipografia Arial, cabeçalhos `#2E4C59`, zebras suaves, realces `#F2B557`, números negativos `#B30000` e totalizações).
  - **Estilização Canônica de Tabelas (`assets/css/_03-atoms/_tables.css`):** Implementação dos modelos corporativos oficiais:
    - `.table-digital`: Para telas de portais, consultas web e dashboards. Cabeçalho contrastante `#2E4C59` com texto branco, zebra suave em `rgba(46, 76, 89, 0.04)` e destaque via `.bcb-row-highlight`.
    - `.table-strict`: Para documentos analíticos formais, relatórios técnicos (REF, RI, Atas) e exportações PDF. Fundo limpo sem preenchimento, separador pontilhado (`1px dotted #606060`) sob o cabeçalho, fechamento superior e inferior sólido, separador vertical fino `.bcb-col-separator` (`0.5pt solid #dcdcdc`) e linha de totalização `.bcb-row-total` em `#2E4C59`.
    - Componentes auxiliares: `.bcb-table-wrapper`, cabeçalho flexível `.bcb-table-header-flex` com título e unidade de medida, e rodapé de notas e fontes `.bcb-table-source`.
  - **Tema Oficial Highcharts (`assets/js/highcharts-theme-bcb.js`):** Criação de pacote UMD autônomo com registro automático em `Highcharts.setOptions()`, aplicando a paleta sequencial imutável das 12 cores, tipografia estrita `Arial, sans-serif`, eixos neutros `#606060`, linhas de grade a 50% de opacidade e localização pt-BR completa (dias da semana, meses e formatação numérica decimal com vírgula e milhar com ponto).
  - **Nova Vitrine Oficial (`pages/graficos.html`):** Página dedicada de documentação visual e técnica, apresentando:
    - Catálogo das 12 Cores Sequenciais (swatches com HEX, RGB e hierarquia primária/secundária).
    - 3 Gráficos Highcharts Interativos (Demonstração das 12 cores em colunas, Série Temporal Multissérie com Selic/IPCA/Câmbio e Composição em Colunas Empilhadas).
    - Tabelas Analíticas Oficiais com o dataset normativo oficial do Manual (Resumo PMS Abril 2026).
    - Diretrizes e boas práticas do Manual Corporativo do BCB e snippets copiáveis para integração.
  - **Atualização da Navegação Global e Hub:** Adicionado o item de menu "Gráficos e Tabelas" no cabeçalho sticky de todas as páginas da documentação (`index.html`, `pages/components.html`, `pages/tokens.html`, `pages/prototipos.html`, `pages/automacao-ia.html`, `pages/changelog.html`) e novo card em destaque no hub institucional (`index.html`).
  - **Enriquecimento do Protótipo Canônico (`prototipos/sgs-series-taxa-selic.html`):** Adição de representação gráfica interativa Highcharts da trajetória da Selic Meta e conversão da tabela para `.table.table-bordered.table-digital` com números negativos destacados via `.num-negative` (`#B30000`).
  - **Inicialização Declarativa em Micro-scripts (`assets/js/bcb-ui.js`):** Adicionado módulo 10 com inicialização automática e defensiva de gráficos Highcharts via atributo `[data-bcb-chart]` ou ID canônico, eliminando qualquer necessidade de scripts inline em conformidade com as regras de protótipos autônomos.
  - **Calibração de Temas (`_dark-mode.css` e `_high-contrast.css`):** Adicionadas regras específicas e tokens para tabelas analíticas e contêineres de gráficos no Dark Mode e no Alto Contraste (WCAG 2.2 AAA / e-MAG 3.1).
  - **Documentação para IA e Webdesigners (`.docs-ia/components.md` e `SKILL.md`):** Especificações 41 e 42 incluídas no vocabulário de componentes, e nova Regra Normativa 9 cadastrada na skill oficial do gerador de UI do BCB.

### Modificado
- **Compilador de Tokens (`scripts/build-tokens.js`):** Seções 8.1 e 8.2 adicionadas para geração automatizada dos tokens de gráficos e tabelas analíticas, com verificação de paridade 100% aprovada.
- **Versão do Orquestrador (`assets/js/bcb-ui.js`):** Bump de versão de `2.1.0` para `2.5.0`.

## [2.4.0] — 2026-09-04

### Adicionado
- **Componente Call to Action — CTA (`.bcb-cta`):** Nova molécula em `assets/css/_04-molecules/_cta.css` para ações prioritárias do cidadão e conversões diretas, com suporte a variantes `.bcb-cta--primary` (gradiente institucional azul petróleo), `.bcb-cta--neutral` (borda lateral azul e fundo suave) e `.bcb-cta--stacked` (centralizado), suportando tags semânticas, título, texto explicativo, metadados e botão `.bcb-btn-cta`.
- **Componente Carrossel Manchete (`.bcb-carousel`):** Novo organismo editorial em `assets/css/_05-organisms/_carousel.css` e `assets/js/carousel.js`, compatível com WAI-ARIA Carousel Pattern, WCAG 2.2.2 (Pause, Stop, Hide) e `prefers-reduced-motion`, com navegação por teclado (Setas, Home, End), botões acessíveis de navegação (área de toque 44x44px) e controle de alternância reproduzir/pausar.
- **Componente Tooltip Acessível (`.bcb-tooltip`):** Novo átomo contextual em `assets/css/_03-atoms/_tooltip.css` e `assets/js/tooltip.js`, ativável declarativamente via `[data-tooltip]` e `[data-tooltip-pos]`, com cálculo dinâmico de viewport e detecção de colisões para inversão automática de borda, associação semântica `aria-describedby` e descarte com a tecla `Escape` (WCAG 1.4.13).
- **Integração no Catálogo Vivo (`pages/components.html`):** Adicionadas seções demonstrativas 1.8 (Tooltip Acessível), 2.20 (Call to Action) e 3.12 (Carrossel Manchete) com snippets de código copiáveis e classes CSS.
- **Documentação para IA e Webdesigners (`.docs-ia/` e `SKILL.md`):** Adicionadas diretrizes em `.docs-ia/components.md`, `.docs-ia/layouts-patterns.md` e regras heurísticas em `.agent/skills/gerador-ui-bcb/SKILL.md` para orientação de geração de protótipos com estes componentes.
- **Aplicação no Protótipo Real (`prototipos/mecanismo-especial-devolucao-med.html`):** Incorporação de Carrossel Manchete com avisos operacionais, Tooltips em termos técnicos regulatórios e CTA primário antifraude.

### Modificado
- **Suporte Completo a Temas (`_dark-mode.css` e `_high-contrast.css`):** Adicionadas regras de alto contraste (bordas de 2px #FFFFFF, realces #FFFF00) e tema escuro calibrado para CTA, Carrossel e Tooltip.
- **Orquestrador Central (`assets/js/bcb-ui.js` e `assets/css/bcb-style.css`):** Registrados imports CSS respeitando a Regra Estrita nº 1 e rotinas de inicialização resilientes com fallback nos micro-scripts.

## [2.3.0] — 2026-09-04

### Adicionado
- **Padrão de Protótipos Autônomos com Delimitação em `<main>`:** Reestruturação da arquitetura de prototipagem para envelopes técnicos mínimos autônomos (`<!DOCTYPE html>`, `<html>`, `<head>` com `bcb-style.css`, fontes e Material Symbols, e `<script src="../assets/js/bcb-ui.js"></script>` antes de `</body>`), permitindo renderização direta e imediata em qualquer navegador (incluindo protocolo local `file:///`).
- **Novo Visualizador Harness com Iframe Dinâmico (`prototipos/_harness.html`):** Carregamento direto via `frame.src = slug` eliminando restrições de CORS em arquivos locais, com novo alternador "Modo: Com Casca / Puro", botão "Abrir Isolado", cópia direta de HTML do miolo e sincronização de temas (Light/Dark/High Contrast) via atributos DOM e `postMessage`.
- **Extração Cirúrgica de Fragmento Interno no Exportador (`scripts/exportar-prototipo.js`):** Geração automática de `fragmento-interno.html` (miolo interno puro sem `<main>` para CMS com casca própria) juntamente com `corpo-conteudo.html` (com container `<main>`), `prototipo-autonomo.html` (envelope completo) e manifesto detalhado.
- **Scaffold Autônomo em `scripts/nova-demanda.js`:** Suporte à geração de esqueleto HTML completo com envelope técnico mínimo e `<main id="conteudo-principal" class="bcb-main-content bcb-container container py-4 mb-5">`.

### Modificado
- **Conversão de Todos os Protótipos Canônicos:** Reestruturação integral dos 5 protótipos de produção (`copom-decisao-taxa-selic.html`, `sgs-series-taxa-selic.html`, `mecanismo-especial-devolucao-med.html`, `regras-cheque-especial.html` e `resolucao-bcb-dou.html`) para o padrão autônomo com classe `.bcb-main-content`, preservando zero casca do portal (sem header, sem footer, sem breadcrumb).
- **Linters e Testes de Integridade (`tests/prototipos/prototipos-lint.test.js` e `tests/html/html-integrity.test.js`):** Ajustados para validar rigorosamente a casca técnica mínima (DOCTYPE, meta charset, viewport, title, CSS e JS do BCB) e certificar a ausência estrita de casca fixa do portal e estilos inline.
- **Formalização nas Regras do Agente (`.antigravityrules` e `.agent/skills/gerador-ui-bcb/SKILL.md`):** Seção 4 e Etapa 5 reformuladas com o contrato de saída, boilerplate canônico e checklist de prototipagem autônoma.

## [2.2.0] — 2026-09-03

### Adicionado
- **Desacoplamento Completo da Casca Fixa em Protótipos:** Todos os arquivos sob o diretório `prototipos/` foram convertidos em fragmentos puros de conteúdo semântico (`<main id="conteudo-principal">... </main>`), banindo rigorosamente tags de documento (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`), tags `<script>` e cascas globais (`#barra-brasil`, `<header>`, `<footer>`, `<nav aria-label="breadcrumb">`).
- **Casca Estática de Homologação Resiliente (`prototipos/_harness.html`):** Visualizador técnico atualizado para injetar automaticamente a casca simulada institucional (Barra Brasil, Header BCB, Breadcrumb dinâmico extraído do H1/tag do fragmento e Footer BCB), bem como folhas de estilo (Bootstrap 4.6, Fontes BCB, Material Symbols e `bcb-style.css`) e scripts (`bcb-ui.js`) para visualização de fragmentos isolados.
- **Novas Regras de Linting de Fragmentos (`tests/prototipos/prototipos-lint.test.js`):** Validação estrita que exige que o protótipo inicie diretamente no container `<main id="conteudo-principal">` e finalize em `</main>`, com proibição explícita de `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` e `<script>`.
- **Auditoria de Acessibilidade Flexibilizada (`tests/a11y/a11y-runner.js`):** Testes de `lang="pt-BR"`, `<meta name="viewport">` e breadcrumbs ajustados para validar apenas documentos completos, liberando fragmentos puros de falsos positivos.
- **Scripts de Validação e Homologação Rápida:** Adicionados comandos `npm run validar:rapido` e `npm run harness:preview` para verificação unificada de tokens, HTML e protótipos.

### Modificado
- **Regras do Agente (`.antigravityrules` e `.agent/skills/gerador-ui-bcb/SKILL.md`):** Seções 4 e 6 atualizadas para instruir o agente a gerar unicamente o fragmento de conteúdo interno `<main id="conteudo-principal">`, proibindo cascas e scripts inline.
- **Scripts de Automação (`scripts/nova-demanda.js` e `scripts/exportar-prototipo.js`):** `nova-demanda.js` atualizado para instruir e gerar scaffold exclusivo de `<main>`. `exportar-prototipo.js` modificado para exportar exclusivamente o corpo de conteúdo (`corpo-conteudo.html` e `miolo.html`), suprimindo a geração de `pagina-completa.html`.
- **Refatoração dos 4 Protótipos Canônicos:** `copom-decisao-taxa-selic.html`, `mecanismo-especial-devolucao-med.html`, `regras-cheque-especial.html` e `sgs-series-taxa-selic.html` agora contêm exclusivamente a malha de `<main id="conteudo-principal">`.
- **Documentação de Arquitetura e IA:** Atualizados `pages/prototipos.html`, `pages/automacao-ia.html`, `.docs-ia/components.md`, `.docs-ia/layouts-patterns.md` e modelos em `.docs-ia/exemplos-demandas/`, destacando o catálogo prioritário de blocos centrais e suprimindo guias de casca global.

## [2.1.0] — 2026-09-03

### Adicionado
- **Diretório Oficial de Protótipos (`prototipos/`):** Instituição do repositório canônico para versionamento de telas modulares diagramadas pelo motor de IA a partir de demandas reais de negócio.
- **Quatro Protótipos Homologados em Produção:**
  - `prototipos/copom-decisao-taxa-selic.html`: Comunicado oficial da 268ª Reunião do Copom com grade 33/33/33, citação diretorial, atos regulatórios e série histórica SGS 432.
  - `prototipos/sgs-series-taxa-selic.html`: Painel analítico de séries temporais com busca facetada, tabela densa acessível, exportação de dados abertos (CSV/JSON) e endpoint REST Swagger.
  - `prototipos/mecanismo-especial-devolucao-med.html`: Guia de serviço ao cidadão com stepper sequencial (`.process-list`), callout elevado de alerta contra golpes, FAQ em acordeão acessível e quadro de prazos.
  - `prototipos/regras-cheque-especial.html`: Refatoração semântica de HTML legado em arranjo 70/30 com callout de isenção tarifária até R$ 500 e sidebar de downloads normativos (`.documentos`).
- **Harness Técnico de Homologação Visual (`prototipos/_harness.html`):** Visualizador técnico sem cascas de portal, equipado com seletores de viewport (Desktop 1440px, Tablet 768px, Mobile 375px) e alternador dinâmico de 3 temas (Padrão, Escuro e Alto Contraste).
- **Scripts Dedicados no `package.json`:** Comandos ágeis `npm run lint:prototypes`, `npm run test:a11y:prototypes` e `npm run test:prototypes`.
- **Auditoria de Acessibilidade Estendida (`tests/a11y/a11y-runner.js`):** Matriz oficial que audita e valida os 4 protótipos de produção contra WCAG 2.1 AA.
- **Reatividade Não-Intrusiva em `assets/js/bcb-ui.js`:** Suporte automático a `[data-action="print"]` eliminando manipuladores de eventos inline nos protótipos.

### Modificado
- **Virada Conceitual de Templates para Protótipos:** Substituição formal de `pages/templates.html` por `pages/prototipos.html`, reposicionando a página como "Catálogo de Protótipos & Telas".
- **Unificação da Navegação do Portal:** Atualizados os links e rótulos da barra de navegação superior em `index.html` e em todas as páginas de `pages/`, referenciando o novo catálogo de protótipos.
- **Reorganização da Suíte de Testes:** Migração de `tests/templates/` para `tests/prototipos/prototipos-lint.test.js` com regra estrita de ausência de scripts ou eventos inline em protótipos.
- **Aprimoramento da Skill de IA (`gerador-ui-bcb/SKILL.md`):** Adicionada diretriz obrigatória de persistência em `prototipos/<slug>.html` e checklist mandatório de diagramação (ritmo vertical de 48px, escala de tokens de padding/margin, hierarquia de cabeçalhos e estados de feedback).

## [2.0.0] — 2026-09-02

### Adicionado
- **Micro-padrões Financeiros de Mercado (`_card-indicator.css`):** Suporte a variantes semânticas de mercado positivo (`.indicator-positive`, `--bcb-brand-verde-susta`), negativo (`.indicator-negative`, `--bcb-brand-marsala`), neutro (`.indicator-warning`) e badges de tendência com setas direcionais cambiais/inflação.
- **Molécula de Exportação de Dados Abertos (`_data-export.css`):** Barra padronizada para download de séries temporais em CSV, JSON, planilhas e APIs REST (Swagger), compatível com Alto Contraste e Modo Escuro.
- **Lapidação da Vitrine de Componentes (`pages/components.html`):** Inclusão da seção 2.12 Exportação de Dados Abertos, demonstração de estados completos de formulário (disabled, invalid com aria-describedby), expansão da Data Table para 5 linhas com ordenação dinâmica e paginação.
- **Documentação Canônica Atualizada (`.docs-ia/components.md`):** 29 seções rigorosamente numeradas com sumário sincronizado, regras Do/Don't e assinaturas HTML completas.

### Modificado (Breaking Change)
- **Remoção do Invólucro Global do Portal:** Deletados os arquivos legados de casca (`_govbr-bar.css`, `_header.css`, `_footer.css`) e eliminados `@import` e estilos associados em `bcb-style.css`, `_high-contrast.css` e `_dark-mode.css`.
- **Higienização de 100% dos Templates HTML:** Removidos `#barra-brasil`, scripts da barra Brasil, `<header>` e `<footer>` de todos os arquivos HTML (`index.html`, `pages/*.html`, `templates/*.html`).
- **Reorientação do Design System para Miolo de Conteúdo:** Todas as páginas iniciam diretamente no container semântico `<main id="conteudo-principal" class="container">` com rigorosamente **um único `<h1>`** por página.
- **Skill de IA v3.0 (.agent/skills/gerador-ui-bcb/SKILL.md):** Reorientada para geração exclusiva de miolo semântico, banindo explicitamente cabeçalhos, rodapés ou cascas de portal e fixando a validação de H1 único.
- **Auditoria e Testes Automatizados:** Atualizados `html-integrity.test.js` e `templates-lint.test.js` para exigir estritamente `assert count(h1) === 1`, `main id="conteudo-principal"` e proibir cascas globais nos templates. `a11y-runner.js` atualizado para auditar diretamente o elemento `<main>`.

## [1.3.0] — 2026-09-02

### Adicionado
- **Vitrine Completa de Componentes (`pages/components.html`):** Catálogo vivo com 29 blocos de demonstração interativa cobrindo 100% dos Átomos, Moléculas, Organismos e Utilitários do BCB.
- **Alternador de 3 Temas Funcional:** Controles segmentados no cabeçalho para alternância instantânea entre Modo Padrão (Claro), Modo Escuro e Alto Contraste (e-MAG).
- **Filtro de Busca na Sidebar:** Campo de busca em tempo real para filtragem instantânea de componentes no catálogo.
- **Variantes de Botões:** Criação do módulo modular `assets/css/_03-atoms/_buttons.css` com `.btn-danger`, `.btn-icon` e estados de foco WCAG 2.2 AAA.

### Corrigido e Otimizado
- **Header e Contraste:** Limpeza completa de cores fixas em `_header.css` e vinculação de 100% dos elementos a variáveis semânticas CSS (`var(--bcb-*)`).
- **Navegação do Alto Contraste:** Eliminação de quebra de layout ao alternar entre os modos de alto contraste e claro/escuro.
- **Conformidade e-MAG 3.1:** 100% das páginas HTML (11/11) agora possuem H1 único, `lang="pt-BR"`, skip links, labels descritivos e zero alertas de ícones sem `aria-hidden`.
- **Documentação IA (`.docs-ia/components.md`):** Atualização com variantes de botões críticos e classes padronizadas.

## [1.2.1] — 2026-09-02

### Adicionado
- **Micro-scripts Vanilla JS (`assets/js/`):** Implementados `modal.js` (com focus-trap e ESC), `toast.js` (auto-dismiss e WAI-ARIA live region), `tabs.js` (navegação por setas e chanfro), `accordion.js` (sincronização de `aria-expanded`) e `data-table.js` (ordenação client-side numérica e alfanumérica).
- **Entrypoint Unificado JS:** Criação de `assets/js/bcb-ui.js` para inicialização automática dos componentes interativos.
- **Template Oficial de Indicadores:** Criação de `templates/template-indicadores.html` combinando cards de indicadores, painel de filtros facetados, série temporal histórica e download de dados abertos.
- **Pipeline de Design Tokens:** Criação de `scripts/build-tokens.js` com suporte a compilação de `tokens.json` para `_tokens.css` e modo `--check` para validação no CI.
- **Padrões de Estados de Interface (UI States):** Documentados em `.docs-ia/layouts-patterns.md` os padrões de *Empty State*, *Skeleton Screen / Loading* e *Error State*.

### Corrigido e Padronizado
- **Propagação de Acessibilidade:** Injeção da Barra Gov.br oficial e Skip Links e-MAG em todos os templates (`index.html`, `template-servico.html`, `template-noticia.html`, `drex.html`, `desastres-naturais.html`, `planejando-a-aposentadoria.html`, `componente-callout.html`, `tokens.html` e `changelog.html`).
- **CI/CD Workflow (.github/workflows/ci.yml):** Adicionada validação de sincronização de tokens (`npm run check:tokens-sync`) e testes de templates obrigatórios.
- **Skill IA (.agent/skills/gerador-ui-bcb/SKILL.md v2.2):** Inclusão da regra mandatória para inserção dos Skip Links e Barra Brasil no boilerplate de qualquer nova tela.

## [1.2.0] — 2026-09-02

### Adicionado
- **Exportação de Design Tokens (W3C / Figma):** Criação do `tokens.json` padronizado para consumo programático por IA, scripts de build e plugins Figma.
- **Data Table Responsiva (Átomo/Molécula):** Componente `.bcb-data-table-container` com ordenação de cabeçalhos (`aria-sort`), paginação embutida, alinhamento numérico tabular (`.text-numeric`), badges de variação (`.bcb-trend-badge`) e presets para cotações e taxa Selic.
- **Filtros e Busca Facetada (Molécula):** Componente `.bcb-filter-panel` com suporte a date ranges (`.bcb-date-range`), switch toggles (`.custom-switch`), checkboxes agrupados e barra de chips ativos (`.bcb-active-filters`).
- **Organismo Modal/Dialog Acessível:** Componente `.bcb-modal-backdrop` e `.bcb-modal-dialog` em conformidade com WAI-ARIA Dialog Pattern (`role="dialog"`, `aria-modal="true"`, bloqueio de foco).
- **Alertas e Toast Notifications:** Componentes `.bcb-toast` e `.bcb-alert` com `role="alert"`, `aria-live="polite"` e variantes semânticas (success, warning, danger, info).
- **Identidade Federal e Skip Links:** Módulos oficiais `_govbr-bar.css` (Barra Brasil) e `_skip-links.css` para navegação rápida acessível por teclado (Alt + 1..4).
- **Módulo Dedicado de Alto Contraste:** Folha `_high-contrast.css` em `assets/css/_02-generic/` com regras completas e bordas forçadas para e-MAG 3.1 e WCAG 2.2 AAA.
- **Vitrine Viva de Componentes:** Criação de `pages/components.html` com alternador em tempo real de temas (Claro, Escuro, Alto Contraste), preview interativo, filtros na sidebar e cópia de snippets HTML.
- **Blueprints Estruturais de Layout:** Criação de `.docs-ia/layouts-patterns.md` com 4 blueprints oficiais (Indicador Econômico, Consulta de Normativos, FAQ/Serviço ao Cidadão, Landing Institucional).
- **Linter Automatizado de Templates:** Script `npm run lint:templates` (`tests/templates/templates-lint.test.js`) para validação contínua de tokens, classes e acessibilidade.
- **Auditoria Dinâmica de Acessibilidade:** Atualização de `tests/a11y/a11y-runner.js` com auto-descoberta de todas as páginas e templates.

### Atualizado
- **Documentação de Componentes (.docs-ia/components.md):** Assinaturas HTML canônicas, variantes suportadas e regras rigorosas de "O que fazer (Do)" vs "O que não fazer (Don't)" para todos os componentes.
- **Skill IA (.agent/skills/gerador-ui-bcb/SKILL.md v2.1):** Inclusão de Few-Shot Prompts estruturados para geração de protótipos de alta fidelidade a partir de briefings sintéticos.

## [1.1.0] — 2026-09-01

### Corrigido
- **Contraste de Links (WCAG 1.4.3):** `--bcb-link-color` ajustado para `#1B75A6` (razão de contraste 4.8:1 sobre branco) e hover para `#013F50`.
- **Foco Acessível (WCAG 2.4.11):** `:focus-visible` no tema claro agora utiliza `3px solid var(--bcb-brand-blue)` (contraste >= 3:1), mantendo `4px solid #FFFF00` no Alto Contraste.
- **Modo Escuro Completo:** Inclusão de todos os tokens brand complementares (`--bcb-brand-vinho`, `--bcb-brand-marsala`, `--bcb-brand-verde-susta`, `--bcb-brand-verde-castell`, `--bcb-brand-amarellato`, `--bcb-brand-cafellato`, `--bcb-brand-gray80`, `--bcb-brand-azulnetuno`).
- **Unificação de `:root`:** Movidos os tints de callouts (`--bg-*-light`) para o `:root` principal no topo do CSS, eliminando declaração fragmentada.
- **Tipografia em Tabelas:** Conversão de unidades legadas `pt` para unidades responsivas web (`rem` / `px`).
- **Sintaxe CSS:** Padronização de seletores de atributo com aspas `[role="banner"]` e `[role="contentinfo"]`, pseudo-elementos CSS3 `::after`, espaçamento antes de `!important`.
- **Hierarquia de Headings:** Correção de saltos de níveis (`h2 > h4`) e tags de cabeçalho antecedentes ao `h1` em todos os 6 templates e no catálogo `index.html`.
- **Acessibilidade em Ícones:** Adicionado `aria-hidden="true"` a todos os ícones decorativos do Material Icons.
- **Acessibilidade em Tabelas:** Adicionada tag `<caption class="sr-only">` em todas as tabelas de dados.
- **Metadados de Download:** Especificado formato e tamanho em MB/KB em todos os links de download de documentos.
- **Eliminação de CSS Desalinhado:** Migrados `desastres-naturais.html`, `planejando-a-aposentadoria.html` e `componente-callout.html` para consumir o arquivo central `bcb-style.css`.
- **Referência em `.antigravityrules`:** Corrigido caminho da pasta de documentação para `/.docs-ia/`.
- **Import Inválido em Testes:** Removido import `glob` indevido de `path` em `tests/html/html-integrity.test.js`.

### Adicionado
- **Modo Alto Contraste Oficial:** Suporte completo via `@media (prefers-contrast: more)` e `:root[data-contrast="high"]` (e-Mag 3.1 / WCAG AAA).
- **Classes de Botões Nativas:** Implementadas `.btn-primary`, `.btn-secondary`, `.btn-outline-primary` e `.btn-link` em `bcb-style.css`.
- **Utilitários de Ícones:** Classes `.md-18`, `.md-24`, `.md-36`, `.md-48` para dimensionamento de Material Icons.
- **Utilitário Serifado:** Classe `.cormorant` para tipografia editorial Cormorant Garamond.
- **Vitrine Completa de Templates:** Exibição de todos os 6 templates na seção `#templates` de `index.html`.
- **Skill IA v2.0:** Atualização completa de `.agent/skills/gerador-ui-bcb/SKILL.md`.

## [1.0.0] — 2026-09-01

### Adicionado
- Inicialização do projeto como pacote npm (`@bcb/gov-ui`)
- Modularização CSS em Atomic Design (Settings, Tools, Generic, Atoms, Molecules, Organisms, Utilities)
- Pipeline CI/CD com GitHub Actions (lint CSS, lint HTML, testes de acessibilidade)
- Linting automático: Stylelint para CSS, HTMLHint para HTML
- Testes automatizados de integridade de tokens e validação HTML
- Testes de acessibilidade com pa11y (WCAG 2.1 AA)
- Página interativa de design tokens (`pages/tokens.html`)
- Página de changelog renderizada (`pages/changelog.html`)
- EditorConfig para consistência de formatação
- Versionamento semântico (SemVer)

### Mantido
- Todos os 38 componentes documentados em `.docs-ia/components.md`
- Arquivo CSS monolítico `bcb-style.css` como fallback retrocompatível
- Templates existentes (`template-servico.html`, `template-noticia.html`, etc.)
- Docker Compose para servir via Nginx
- Suporte a Dark Mode via `prefers-color-scheme` e `data-theme`
