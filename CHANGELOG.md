# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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
