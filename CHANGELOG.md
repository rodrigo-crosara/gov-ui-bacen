# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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
