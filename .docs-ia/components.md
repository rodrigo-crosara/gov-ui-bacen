# BCB UI – Components Library

> **Status**: v1.0. Este documento define os blocos de construção da interface do Banco Central do Brasil. Os agentes de IA devem consultar este arquivo para utilizar as classes e marcações corretas, garantindo consistência visual e conformidade com o e-Mag 3.1 e WCAG.

---

## 1. Botões (Buttons)

Botões são usados exclusivamente para **ações** (Call to Action - CTA), como enviar formulários, confirmar etapas ou disparar eventos na tela. 

> **Boas Práticas (Inspiradas no GDS/USWDS):** > - O rótulo do botão deve ser curto, claro e começar com um verbo de ação (ex: "Baixar relatório", "Salvar", "Confirmar dados").
> - Evite botões isolados. Agrupe opções relacionadas.

### 1.1 Variantes (Classes Bootstrap Customizadas)

| Variante | Classe CSS | Cor de Fundo | Cor do Texto | Uso Semântico |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | `.btn .btn-primary` | `--bcb-brand-blue` | Branco | Ação principal da página. Salvar, Enviar. |
| **Secondary** | `.btn .btn-secondary` | `--bcb-brand-azulcinti`| Branco | Ações secundárias ou de apoio. |
| **Outline** | `.btn .btn-outline-primary`| Transparente | Azul | Ações alternativas que não devem competir com a principal. |
| **Link** | `.btn .btn-link` | Transparente | `--bcb-link-color`| Ações menos destrutivas ou de cancelamento (ex: "Limpar formulário"). |

### 1.2 Tamanhos

* **Pequeno (`.btn-sm`):** Usado em ações auxiliares ou tabelas densas (ex: botão de "Sair").
* **Médio (Padrão):** Sem classe extra. Formato regular para o portal.
* **Grande (`.btn-lg`):** Usado em telas de conversão (Landing Pages) para amplo destaque.

### 1.3 Botões Especiais (Com Ícones)
Para botões que indicam continuidade ou download, utilize os ícones do Material Design integrados com flexbox.

```html
<button type="button" class="btn btn-primary d-flex align-items-center">
  Ver conteúdo <span class="material-icons-outlined ml-2">chevron_right</span>
</button>

<button type="button" class="btn btn-primary d-flex align-items-center">
  Baixar <span class="material-icons-outlined ml-2">file_download</span>
</button>
```

### ⚠️ Diretrizes Inquebráveis para a IA (Botões)

1. **Links com cara de Botão:** Se a "ação" for apenas navegar para outra URL, o elemento **deve** ser uma tag `<a>` utilizando as classes de botão (`<a href="..." class="btn btn-primary">`). Nunca use `<button>` para navegação de páginas.
2. **Estado Desabilitado:** Todo botão desabilitado deve conter o atributo `disabled` e usar as cores de cinza neutro (`#64666c`).

---

## 2. Links e Âncoras

Links (`<a>`) são usados para navegação entre páginas, download de arquivos ou âncoras dentro do mesmo documento.

### 2.1 Tipos de Links e Marcação

| Tipo | Marcação HTML / Atributos Obrigatórios |
| --- | --- |
| **Link Padrão** | `<a href="/destino">Texto</a>` |
| **Abre em Nova Aba** | `<a href="/destino" target="_blank" rel="noopener noreferrer">Texto</a>` |
| **Download de Arquivo** | `<a href="arquivo.pdf" aria-label="baixe a planilha completa">Baixar (pdf/1Mb)</a>` |
| **Âncora (Mesma Pág)** | `<a href="#secao-alvo">Ir para Seção</a>` (Usa `#` no href) |

### 2.2 Links em Títulos (Headings)

Quando um título ou subtítulo for um link, ele deve herdar a formatação do título, mas assumir a cor `AzulCinti` e aplicar sublinhado no *hover*.

```html
<h6>
  <a href="#" aria-label="Abre em nova aba ou janela">
    Link para outra página
    <i class="bi bi-box-arrow-in-up-right"></i>
  </a>
</h6>
```

### ⚠️ Diretrizes Inquebráveis para a IA (Acessibilidade e-Mag / WCAG)

1. **Proibição de Textos Vazios (WCAG 2.4.4):** O texto do link DEVE fazer sentido fora de contexto. É expressamente **PROIBIDO** gerar links com os textos "clique aqui", "saiba mais", "leia mais" ou "mais".
2. **Informação de Arquivos:** Todo link de download DEVE conter, no final do texto do link e entre parênteses, o formato do arquivo e seu tamanho (ex: `Relatório Anual (PDF, 2MB)`).
3. **Uso de ARIA Labels (WCAG 3.2.5):** Se o link for um ícone ou se abrir em uma nova aba, ele DEVE conter um atributo `aria-label` descritivo. Exemplo: `aria-label="Acesse o Registrato (abrirá em nova aba)"`.
4. **Agrupamento sem Quebras:** É proibido usar a tag `<br>` para separar links adjacentes. Eles devem ser organizados em listas (`<ul>` ou `<ol>`).

---

## 3. Iconografia (Material Icons)
O portal utiliza a biblioteca **Material Icons** do Google.

### 3.1 Estilos Disponíveis
* **Padrão (Filled):** Use a classe `material-icons`. Possui a biblioteca completa e melhor legibilidade geral.
* **Alternativo (Outlined):** Use a classe `material-icons-outlined` para ícones secundários ou que exijam traço fino.

### 3.2 Inserção HTML
Você pode usar a tag `<span>` ou `<i>`. O padrão preferencial da IA deve ser o `<span>`.
Exemplo: `<span class="material-icons">home</span>` ou `<i class="material-icons-outlined">search</i>`.

### ⚠️ Diretrizes Inquebráveis para a IA (Acessibilidade)
1. **Ícones Decorativos:** Devem ter `aria-hidden="true"`. Ex: `<span class="material-icons" aria-hidden="true">chevron_right</span>`
2. **Ícones Semânticos (Sem Texto):** O botão ou link pai DEVE ter um `aria-label`. Ex: `<button aria-label="Fechar"><span class="material-icons" aria-hidden="true">close</span></button>`

---

## 4. Navegação em Abas (Tabs / navegacaoabas)
O BCB utiliza abas baseadas no Bootstrap 4, mas encapsuladas e estilizadas para conter o "chanfro" da identidade visual.

### 4.1 Estrutura HTML Padrão
Sempre envolva o bloco na tag semântica (ou pseudo-componente) `<navegacaoabas>`. 

**Atenção à regra do Chanfro:** Toda tag `<a>` com a classe `.nav-link` DEVE ter como seu primeiro filho um `<span class="line"></span>`. Isso gera o detalhe visual de marcação do BCB.

```html
<navegacaoabas>
  <nav>
    <div class="nav nav-tabs" role="tablist">
      <a class="nav-link active" data-toggle="tab" href="#tab1" role="tab">
        <span class="line"></span>
        <div class="icone"><span class="material-icons">person</span></div>
        <div class="texto">Cidadão</div>
      </a>
    </div>
  </nav>
  <div class="tab-content">
    <span class="line"></span>
    <div class="tab-pane fade show active" id="tab1" role="tabpanel">Conteúdo</div>
  </div>
</navegacaoabas>
```

---

## 5. Cards de Links Rápidos (listalinks)
Usados para navegação em formato de grade (Grid). O ícone fica em um bloco à esquerda com a cor primária, e o texto à direita.

### 5.1 Estrutura HTML Padrão
Devem ser renderizados dentro de uma div com a classe `.row` para usar o grid do Bootstrap. A tag `<a>` principal deve ter as classes `.hvr-shadow .d-flex .no-underline`.

```html
<listalinks>
  <div class="buffer">
    <div class="row">
      <div class="col-sm-6 mb-2">
        <a class="hvr-shadow d-flex no-underline" href="#">
          <div class="icone text-white bg-color-1 d-flex align-items-center justify-content-center rounded-left">
            <span class="material-icons" aria-hidden="true">chevron_right</span>
          </div>
          <div class="texto d-flex align-items-center w-100 rounded-right font-color-1">Busca de normas</div>
        </a>
      </div>
    </div>
  </div>
</listalinks>
```

---

## 6. Lista de Notícias (bcb-noticias)
Usado para exibir uma lista de links de notas à imprensa ou atualizações.

### 6.1 Estrutura HTML Padrão
Deve ser envolvido em `<bcb-noticias>`. A lista deve usar as classes do Bootstrap (`list-unstyled`, `d-flex`). A tag `<a>` que envolve o texto da notícia deve usar a classe `.color-1`.

```html
<bcb-noticias>
  <div class="componente">
    <h2 class="titulo cormorant">Notas à imprensa</h2>
    <div class="box notas pl-sm-3">
      <ul class="list-unstyled">
        <li>
          <div class="d-flex">
            <span aria-hidden="true" class="bullet material-icons md-18 mr-2 align-self-start">chevron_right</span>
            <div>
              <span class="mr-2 text-muted">10/03/2026</span>
              <a class="color-1 font-weight-bold" href="#">BC faz consulta pública para aprimorar regras...</a>
            </div>
          </div>
        </li>
      </ul>
      <a class="btn btn-outline-primary btn-sm btn-block mt-3" href="/noticias">
        Mais notas à imprensa <span aria-hidden="true" class="material-icons md-18">chevron_right</span>
      </a>
    </div>
  </div>
</bcb-noticias>
```

---

## 7. Barra Gov.br
Todo site governamental brasileiro deve incluir a Barra Brasil no topo absoluto da página.

### 7.1 Estrutura HTML
Deve ser injetada logo após a abertura do `<body>`.

```html
<div id="barra-brasil" style="background:#7F7F7F; height: 20px; padding:0 0 0 10px;display:block;">
  <ul id="menu-barra-temp" style="list-style:none;">
    </li>
  </ul>
</div>
<script defer="defer" src="//barra.brasil.gov.br/barra.js" type="text/javascript"></script>
```

---

## 8. Cabeçalho (Header)
O cabeçalho do portal contém a logomarca centralizada e os links de acessibilidade no canto superior direito.

### 8.1 Estrutura HTML Padrão
```html
<header role="banner">
  <div class="container position-relative h-100">
    <div id="accessibility-wrapper">
      <div class="d-flex justify-content-end">
        <ul id="portal-siteactions" class="list-unstyled d-flex mb-0 text-uppercase">
          <li class="d-none d-lg-block"><a class="font-color-1" href="#">Acessibilidade</a></li>
          <li><a class="font-color-1" href="#">Alto Contraste</a></li>
        </ul>
      </div>
    </div>
    <a title="Banco Central do Brasil" href="/"><img src="https://www.bcb.gov.br/assets/svg/logo-bcb.svg" alt="Banco Central do Brasil" class="brand"></a>
  </div>
</header>
```

---

## 9. Rodapé (Footer)
O rodapé contém links úteis, redes sociais e a missão da instituição.

### 9.1 Estrutura HTML Padrão
```html
<footer role="contentinfo">
  <div class="container arts"><span class="line"></span></div>
  <div class="t px-4 px-md-0">
    <div class="container">
      <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
        <span class="font-weight-bold font-color-1 mr-lg-3 mb-2 mb-lg-0">Siga o BC</span>
        <ul class="list-unstyled redes-sociais mb-0">
          <li><a href="#" title="Instagram">IG</a></li>
          <li><a href="#" title="LinkedIn">IN</a></li>
          <li><a href="#" title="X">X</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="b">
    <div class="container">
      <div class="d-lg-flex align-items-lg-center justify-content-lg-between py-3 bottom">
        <div class="missao mb-2 mb-lg-0 mr-lg-3">Garantir a estabilidade de preços, zelar por um sistema financeiro sólido e eficiente, e fomentar o bem-estar econômico da sociedade.</div>
        <div class="info">
          <ul class="list-inline text-lg-right mb-0">
            <li class="list-inline-item"><a href="#">Fale conosco</a></li>
            <li class="list-inline-item"><a href="#">Política de privacidade</a></li>
        </div>
      </div>
    </div>
  </div>
</footer>

---

## 10. Listas (Lists e Spacing Scale)
Para listas ordenadas (`<ol>`) e não ordenadas (`<ul>`), o BCB utiliza classes utilitárias para espaçamento entre os itens (margin-bottom).
- Use `.spacing-scale-1x` (8px de espaço)
- Use `.spacing-scale-2x` (16px de espaço - Padrão recomendado)
- Use `.spacing-scale-3x` (24px de espaço)

---

## 11. Box "Olho" (Callout / Destaque)
Usado para destacar trechos importantes no meio de uma massa de texto. A cor de fundo tem uma transparência de 8% da cor principal.

### 11.1 Estrutura Angular
A IA deve utilizar a tag `<bcb-olho>`. O conteúdo HTML interno deve ser passado como string na propriedade `[texto]`. O título interno deve ser no máximo `<h3>`.
```html
<bcb-olho [texto]="'<h4>Atenção</h4><p>Este é um texto de destaque gerado pela IA.</p>'"></bcb-olho>
```

---

## 12. Accordions (Sanfonas expansíveis)
Avalie o uso para enxugar páginas com muito conteúdo.

- **Modelo 1 (Sólido)**: Fundo cinza, usado para blocos autônomos.
- **Modelo 2 (Transparente)**: Sem bordas, exclusivo para o meio de textos em andamento.

### 12.1 Estrutura Angular
Use a tag `<bcb-accordion-page>` passando os parâmetros.

```html
<bcb-accordion-page [card_header]="'Título da Sanfona'" [card_body]="'<p>Conteúdo HTML interno</p>'" [aria_expanded]="false" [modelo]="'1'"></bcb-accordion-page>
```

---

## 13. Citações (Blockquotes)
Componente padronizado para exibir citações oficiais ou de autoridades.

### 13.1 Estrutura Angular
```html
<bcb-citacao [autor]="'Nome do Autor'" [citacao]="'Texto da citação completa sem aspas.'"></bcb-citacao>
```

---

## 14. Tabelas de Dados (Tables)
O BCB utiliza a estrutura de tabelas responsivas do Bootstrap 4 com uma classe customizada para o cabeçalho.

### 14.1 Estrutura HTML Padrão
Sempre envolva a tabela em uma div `.table-responsive`. A tag `<table>` deve usar as classes `.table` e, opcionalmente, `.table-striped` ou `.table-bordered`. O cabeçalho `<thead>` DEVE usar a classe `.thead-primary`.

```html
<div class="table-responsive">
  <table class="table table-striped table-bordered">
    <thead class="thead-primary">
      <tr><th>Coluna 1</th><th>Coluna 2</th></tr>
    </thead>
    <tbody>
      <tr><td>Dado 1</td><td>Dado 2</td></tr>
    </tbody>
  </table>
</div>
```

---

## 15. Alertas (Alerts)
Para caixas de destaque simples, use os alertas nativos do Bootstrap.

- `.alert-success`: Fundo verde claro. Usado para dicas ou títulos de seção.
- `.alert-danger`: Fundo vermelho. Usado para restrições ou alertas críticos.

---

## 16. Lista de Documentos (Downloads)
Usado para disponibilizar arquivos (PDF, DOCX, XLSX) no meio do conteúdo.

### 16.1 Estrutura HTML
Crie uma div `.documentos` contendo links `.documento`.

```html
<div class="documentos">
  <a role="button" class="documento hvr-shadow d-flex text-decoration-none color-1" href="arquivo.pdf" aria-label="Baixar Relatório (PDF)">
    <div class="icone text-white bg-color-1 d-flex align-items-center justify-content-center rounded-left">
      <div class="d-flex flex-column position-relative">
        <span class="material-icons md-36" aria-hidden="true">insert_drive_file</span>
        <span class="extensao bg-color-1">pdf</span>
      </div>
    </div>
    <div class="texto d-flex flex-column justify-content-center w-100 rounded-right pl-3">
      <span class="documento-title">Título do Documento ou Relatório</span>
      <span class="documento-data">Publicado em: 10/03/2026</span>
    </div>
  </a>
</div>
```

---

## 17. Cards de Conteúdo (Listalinks Light)
Usados para navegação principal ou apresentação de múltiplos serviços. A estrutura usa o grid do Bootstrap (`.row` e `.col-md-X`).

### 17.1 Modelo 1 (Com Sombra e Fundo)
Estrutura horizontal com ícone à esquerda. Efeito de elevação no hover.
```html
<div class="listalinks-light modelo-1">
  <div class="row">
    <div class="col-md-6 mb-3">
      <div class="h-100 d-flex align-items-center">
        <a href="#" class="d-inline-flex rounded w-100 h-100">
          <div class="icon-container d-flex align-items-center justify-content-center rounded-left">
            <span class="material-icons md-36 color-1" aria-hidden="true">campaign</span>
          </div>
          <div class="info-container align-self-center p-3">
            <p class="mb-0">
              <span class="title color-1">Título do Card</span><br>
              <span class="description">Breve descrição do serviço oferecido.</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
```

### 17.2 Modelo 5 (Caixas Grandes Verticalizadas)
Usado em aterrissagens. O ícone fica centralizado acima do título.

```html
<div class="listalinks-light modelo-5">
  <div class="row">
    <div class="col-md-4 mb-3">
      <div class="h-100 d-flex align-items-center">
        <a href="#" class="flex-column align-items-center justify-content-center p-3 flex-grow-1 bg-light d-inline-flex rounded w-100 h-100">
          <div class="icon-container d-flex align-items-center justify-content-center">
            <span class="material-icons md-36 color-1" aria-hidden="true">support_agent</span>
          </div>
          <div class="info-container align-self-center text-center">
            <p class="mb-0">
              <span class="title color-1 text-uppercase d-block mt-3">Título Central</span><br>
              <span class="description">Descrição centralizada.</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
```

---

## 18. Breadcrumb (Trilha de Navegação)
Indica a localização atual da página na hierarquia do site. O BCB usa um fundo azul escuro para este elemento.

```html
<nav aria-label="Navegação secundária">
  <ul class="breadcrumb-bcb">
    <li><a href="/">Página Inicial</a></li>
    <li><a href="/estabilidade">Estabilidade Financeira</a></li>
    <li aria-current="page">Normas</li>
  </ul>
</nav>
```

---

## 19. Menu de Âncoras (In-page Navigation)
Usado em páginas longas (textos densos) para navegação rápida entre os capítulos (H2 e H3).

```html
<aside class="bd-sidebar">
  <div class="bd-toc">
    <strong>Nesta página</strong>
    <nav aria-label="Navegação âncora" class="bd-links">
      <ul class="list-unstyled mb-0">
        <li><a href="#secao1" class="active">1. Introdução</a></li>
        <li><a href="#secao2">2. Regras Gerais</a></li>
      </ul>
    </nav>
  </div>
</aside>
```

---

## 20. Tags (Etiquetas)
Usadas para categorizar conteúdo ou destacar status (ex: "Novo", "Em consulta").

```html
<span class="tag-bcb">Comunicado</span>
<span class="tag-bcb primary">Novo</span>
```

---

## 21. Process List (Passo a Passo)
Usado para explicar fluxos de serviços ou instruções sequenciais.

```html
<ul class="process-list">
  <li>
    <h4 class="h5 mt-0 mb-1 color-1">Acesse o sistema</h4>
    <p class="text-body text-sm">Faça login com sua conta gov.br nível prata ou ouro.</p>
  </li>
  <li>
    <h4 class="h5 mt-0 mb-1 color-1">Preencha os dados</h4>
    <p class="text-body text-sm">Insira as informações solicitadas no formulário.</p>
  </li>
</ul>
```