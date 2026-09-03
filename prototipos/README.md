# Repositório Oficial de Protótipos de Interface (BCB Design System)

Este diretório armazena exclusivamente as **telas e protótipos de alta fidelidade gerados pelo agente de IA** a partir de demandas reais de negócio do Banco Central do Brasil.

---

## 🎯 Princípios de Prototipagem

1. **Foco Estrito no Miolo Semântico:**
   Todo protótipo neste diretório modela o conteúdo interno da página delimitado por:
   ```html
   <main id="conteudo-principal" class="bcb-container container py-4 mb-5">
   ```
2. **Ausência Total de Cascas do Portal:**
   Nenhum arquivo neste diretório deve conter `<header>`, `<footer>`, barras federais externas, breadcrumbs ou menus globais externos. Esses elementos são providos de forma centralizada pelo CMS institucional.
3. **Grid 12 Colunas Oficial do BCB:**
   A diagramação é construída utilizando `.bcb-row` e colunas proporcionais (`.bcb-col-12`, `.bcb-col-lg-8`, `.bcb-col-lg-4`, `.bcb-col-md-6`, `.bcb-col-md-4`) com comentários de slots CMS delimitadores (`<!-- [SLOT CMS: ...] -->`).
4. **Resiliência Cromática (3 Temas):**
   Todos os componentes utilizam exclusivamente variáveis CSS semânticas (`var(--bcb-*)`), garantindo conformidade com Modo Claro, Modo Escuro (`data-theme="dark"`) e Alto Contraste (`data-contrast="high"`).

---

## 🖥️ Como Visualizar e Testar no Navegador

Para inspecionar um protótipo sem casca externa no navegador com suporte a alternância instantânea de temas, utilize o visualizador técnico:

👉 [`_harness.html`](./_harness.html)

Ou abra diretamente qualquer protótipo HTML individual desta pasta (que já inclui o boilerplate mínimo com as dependências do BCB, Bootstrap e Material Symbols).

---

## 🧪 Testes Automatizados no Ciclo de Desenvolvimento

Para validar apenas os protótipos desta pasta:
```bash
# Validar modularidade de grid e regras de componentes
npm run lint:prototypes

# Validar acessibilidade estática e WCAG 2.2 AA
npm run test:a11y:prototypes

# Executar a suíte completa de protótipos
npm run test:prototypes
```
