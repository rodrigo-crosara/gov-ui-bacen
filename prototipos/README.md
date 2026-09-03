# Repositório Oficial de Protótipos de Interface (BCB Design System)

Este diretório armazena exclusivamente as **telas e protótipos de alta fidelidade gerados pelo agente de IA** a partir de demandas reais de negócio do Banco Central do Brasil.

---

## 🎯 Princípios Fundamentais de Prototipagem

1. **Foco Estrito no Miolo Semântico:**
   Todo protótipo modela exclusivamente o conteúdo interno da página, iniciando diretamente em:
   ```html
   <main id="conteudo-principal" class="bcb-container container py-4 mb-5">
   ```
2. **Ausência Total de Cascas Globais Externas e Breadcrumbs:**
   Nenhum arquivo neste diretório deve conter `<header>`, `<footer>`, `#barra-brasil` ou breadcrumbs. Esses elementos são componentes fixos e imutáveis fornecidos de forma centralizada pelo CMS do portal institucional.
3. **Navegação de Retorno ao Topo Acessível:**
   Inserido na base do `<main>` via `.bcb-back-to-top-wrapper` com link âncora `#conteudo-principal` e ícone `arrow_upward`. A trilha de navegação (breadcrumb) e a casca são simuladas exclusivamente no visualizador técnico (`_harness.html`).
4. **Grid 12 Colunas Oficial do BCB:**
   A diagramação modular utiliza `.bcb-row` e colunas proporcionais (`.bcb-col-12`, `.bcb-col-lg-8`, `.bcb-col-lg-4`, `.bcb-col-md-6`, `.bcb-col-md-4`) com comentários delimitadores de slots CMS (`<!-- [SLOT CMS: ...] -->`).
5. **Resiliência Cromática nos 3 Temas:**
   Todos os elementos utilizam exclusivamente variáveis CSS semânticas (`var(--bcb-*)`), garantindo conformidade e contraste ótimo em Modo Claro, Modo Escuro (`data-theme="dark"`) e Alto Contraste (`data-contrast="high"`).
6. **Zero Scripts Inline:**
   Nenhuma lógica JavaScript ou manipulador de evento (`onclick=`, etc.) pode ser adicionada inline. A reatividade deve ser delegada exclusivamente a seletores semânticos (ex.: `data-action="print"`) consumidos por `assets/js/bcb-ui.js`.

---

## 🖥️ Visualizador Técnico (`_harness.html`) & Split-Screen de Demandas

O [`_harness.html`](./_harness.html) é o ambiente técnico oficial para homologação de telas. Ele permite inspecionar qualquer miolo isolado sem cascas externas, oferecendo alternadores dinâmicos de viewports e temas.

### 1. Parâmetros de URL Suportados

Você pode abrir o harness diretamente parametrizado com a tela e o briefing desejados:

```text
prototipos/_harness.html?src=[arquivo-prototipo.html]&doc=[arquivo-demanda.md]
```

- **`src` (string):** Nome do arquivo do protótipo a carregar no iframe (ex.: `copom-decisao-taxa-selic.html`).
- **`doc` (string):** Arquivo de briefing de demanda correspondente em `.docs-ia/exemplos-demandas/` (ex.: `01-comunicado-normativo.md`).

> Ao informar `src` ou `doc`, o visualizador abre automaticamente em **modo split-screen**, exibindo a gaveta lateral retrátil com o briefing original da área de negócio ao lado da interface interativa.

### 2. Controles de Inspeção Disponíveis no Harness
- **Briefing da Demanda:** Painel lateral split-screen exibindo metadados, insumo textual bruto e a instrução canônica repassada ao agente.
- **Alternador de Viewports:**
  - **Desktop:** Largura fluida com limite de 1440px (`.viewport-desktop`).
  - **Tablet:** 768px centralizado com moldura de dispositivo (`.viewport-tablet`).
  - **Mobile:** 375px centralizado com moldura de smartphone (`.viewport-mobile`).
- **Alternador de Temas:** Padrão (Claro), Escuro (`data-theme="dark"`) e Alto Contraste (`data-contrast="high"`).
- **Copiar HTML do Miolo:** Botão rápido na barra superior que extrai e copia para a área de transferência o markup limpo do container `<main>`, pronto para inclusão no CMS.

---

## 🚀 Guia Operacional para o Webdesigner: Adicionando Novos Protótipos

Para integrar uma nova demanda ao ecossistema:

### Passo 1: Criar o Scaffold da Demanda
Execute o comando CLI automatizado:
```bash
npm run demanda:criar -- --slug meu-novo-servico --titulo "Consulta ao Crédito Rural" --demanda 05
```
Isso gerará o template estruturado em `.docs-ia/exemplos-demandas/05-meu-novo-servico.md`.

### Passo 2: Preencher o Briefing com a Demanda da Área Técnica
Cole o texto bruto, metadados, anexos e instruções de UX no markdown recém-criado.

### Passo 3: Solicitar a Prototipagem ao Agente de IA
Instrua o agente:
> *"Atue como Especialista em UI/UX do BCB. Leia a demanda em `.docs-ia/exemplos-demandas/05-meu-novo-servico.md` e gere o protótipo correspondente em `prototipos/meu-novo-servico.html` seguindo rigorosamente a skill `gerador-ui-bcb`."*

### Passo 4: Registrar a Nova Tela no Harness e na Vitrine
1. Adicione a opção no `<select id="selectPrototipo">` e no dicionário `DEMANDAS` em `prototipos/_harness.html`.
2. Adicione o card de exibição na vitrine `pages/prototipos.html` com os links para o harness parametrizado (`_harness.html?src=meu-novo-servico.html&doc=05-meu-novo-servico.md`) e para a tela isolada.

### Passo 5: Validar a Suíte de Qualidade
```bash
# Validar linter de modularidade, restrição de miolo e vínculos
npm run lint:prototypes

# Validar matriz de acessibilidade WCAG 2.1 AA
npm run test:a11y:prototypes

# Executar a suíte de validação integrada
npm run test:prototypes
```

---

## 📁 Catálogo dos Protótipos Oficiais

| Protótipo | Demanda Vinculada | Padrão de Layout | Status |
|---|---|---|---|
| [`copom-decisao-taxa-selic.html`](./copom-decisao-taxa-selic.html) | `01-comunicado-normativo.md` | Layout 70/30 com citação e downloads | ✅ Homologado |
| [`sgs-series-taxa-selic.html`](./sgs-series-taxa-selic.html) | `02-dados-sgs-indicadores.md` | Painel Analítico & Tabela Densa SGS | ✅ Homologado |
| [`mecanismo-especial-devolucao-med.html`](./mecanismo-especial-devolucao-med.html) | `03-servico-passo-a-passo.md` | Stepper `.process-list`, Alerta Elevado e FAQ | ✅ Homologado |
| [`regras-cheque-especial.html`](./regras-cheque-especial.html) | `04-conteudo-html-legado.md` | Refatoração Semântica 70/30 de Legado | ✅ Homologado |
