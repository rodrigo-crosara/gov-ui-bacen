# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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
