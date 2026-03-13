# BCB UI – Components Library

> **Status**: v1.1 (Auditoria Enterprise — Mar/2026). Este documento define os blocos de construção da interface do Banco Central do Brasil. Os agentes de IA devem consultar este arquivo para utilizar as classes e marcações corretas, garantindo consistência visual e conformidade com o e-Mag 3.1 e WCAG.

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

---

## 22. Campos de Texto (Text Inputs)
Usados para coletar informações textuais curtas. Todo input deve possuir um `<label>` claro e, se necessário, um texto de ajuda (`.form-text`).

```html
<div class="form-group">
  <label for="inputNome">Nome completo</label>
  <input type="text" class="form-control" id="inputNome" aria-describedby="nomeHelp">
  <small id="nomeHelp" class="form-text text-muted">Insira seu nome exatamente como consta no documento oficial.</small>
</div>
```

---

## 23. Seleção (Checkboxes e Radios)
Utilize a estrutura `.custom-control` do Bootstrap 4 para garantir alinhamento e contraste corretos.

- **Radio**: Para selecionar apenas UMA opção.
- **Checkbox**: Para selecionar VÁRIAS opções ou confirmar termos.

```html
<div class="custom-control custom-checkbox mb-3">
  <input type="checkbox" class="custom-control-input" id="checkTermos">
  <label class="custom-control-label" for="checkTermos">Declaro que li e concordo com os termos de uso.</label>
</div>

<div class="custom-control custom-radio">
  <input type="radio" id="radioPessoaFisica" name="tipoPessoa" class="custom-control-input">
  <label class="custom-control-label" for="radioPessoaFisica">Pessoa Física (CPF)</label>
</div>
```

---

## 24. Select Customizado (Menu Suspenso)
Use a classe `.custom-select` do Bootstrap 4, que recebe automaticamente a estilização BCB (borda, foco azul, padding).

```html
<div class="form-group">
  <label for="selectUF">Estado (UF)</label>
  <select class="custom-select" id="selectUF">
    <option selected disabled>Selecione...</option>
    <option>Distrito Federal</option>
    <option>São Paulo</option>
  </select>
</div>
```

---

## 25. Anexo de Arquivo (File Input)
Use a estrutura `.custom-file` do Bootstrap 4. O botão "Selecionar" recebe automaticamente a cor Brand Blue do BCB.

```html
<div class="form-group">
  <label for="fileAnexo">Documento comprobatório</label>
  <div class="custom-file">
    <input type="file" class="custom-file-input" id="fileAnexo">
    <label class="custom-file-label" for="fileAnexo">Nenhum arquivo selecionado</label>
  </div>
  <small class="form-text text-muted">Formatos aceitos: PDF, JPG, PNG. Máximo: 5MB.</small>
</div>
```

---

## 26. Estados de Validação (Form Validation)
O BCB usa as classes nativas `.is-valid` e `.is-invalid` do Bootstrap 4, customizadas com ícones SVG inline e cores de feedback.

### 26.1 Input Válido
```html
<input type="email" class="form-control is-valid" id="inputEmail" value="ok@mail.com">
<div class="valid-feedback">E-mail verificado com sucesso.</div>
```

### 26.2 Input Inválido
```html
<input type="text" class="form-control is-invalid" id="inputCPF" value="123.456.789-0">
<div class="invalid-feedback">CPF inválido. Verifique o número digitado.</div>
```

### ⚠️ Diretrizes Inquebráveis para a IA (Validação)
1. **Feedback visual claro:** Todo campo inválido DEVE ter uma mensagem `.invalid-feedback` explicando o erro de forma clara e em português.
2. **Nunca use apenas cor:** O ícone SVG no campo garante que usuários daltônicos identifiquem o estado. Mantenha sempre a classe `.is-valid`/`.is-invalid`.
3. **Campos obrigatórios:** Se o campo é obrigatório e está vazio, a mensagem deve ser "Campo obrigatório."

---

## 27. Busca Avançada com Filtros (Search Overlay)
Padrão extraído do portal oficial do BCB. Inclui um campo de busca com ícone e chips de filtro por categoria.

### 27.1 Estrutura HTML
```html
<div class="bcb-search-overlay">
  <div class="bcb-search-input-group">
    <span class="material-icons" aria-hidden="true">search</span>
    <input type="text" placeholder="O que você procura?" aria-label="Campo de busca">
  </div>
  <div class="bcb-search-filters">
    <label>Filtrar por:</label>
    <span class="bcb-chip active">Tudo</span>
    <span class="bcb-chip">Notícias</span>
    <span class="bcb-chip">Publicações</span>
    <span class="bcb-chip">Normativos</span>
  </div>
</div>
```

### ⚠️ Diretrizes
1. O chip ativo recebe a classe `.active` (fundo Brand Blue).
2. O campo de busca DEVE ter `aria-label` descritivo.

---

## 28. Cards de Indicadores Econômicos
Cards com borda superior colorida para exibir indicadores-chave (Selic, IPCA, Câmbio), inspirados no Panorama Econômico do bcb.gov.br.

### 28.1 Estrutura HTML
```html
<div class="bcb-indicator-card">
  <div class="bcb-indicator-label">Taxa Selic (Meta)</div>
  <div class="bcb-indicator-value">14,25%
    <small class="bcb-indicator-trend up">
      <span class="material-icons" aria-hidden="true">arrow_upward</span> +1,00 p.p.
    </small>
  </div>
  <div class="bcb-indicator-meta">Copom — 12/03/2026</div>
</div>
```

### 28.2 Variantes de Cor
| Classe | Borda Superior | Uso |
|---|---|---|
| (padrão) | `--bcb-brand-blue` | Indicadores monetários (Selic, CDI) |
| `.accent-green` | Verde `#28a745` | Câmbio / valores em queda |
| `.accent-amber` | Dourado `#F8D48D` | Inflação / índices de preço |

### 28.3 Tendência (Trend)
Use `.bcb-indicator-trend.up` (vermelho, seta para cima) ou `.down` (verde, seta para baixo).

---

## 29. Botão Voltar ao Topo (Back to Top)
Botão fixo no canto inferior direito, aparece ao rolar a página além de 400px. Extraído do bcb.gov.br.

### 29.1 Estrutura HTML
```html
<button class="bcb-back-to-top" id="backToTop" aria-label="Voltar ao topo da página">
  <span class="material-icons" aria-hidden="true">keyboard_arrow_up</span>
</button>
```

### 29.2 JavaScript Necessário
```javascript
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

---

## 30. Stepper (Indicador de Etapas)
Usado em serviços como o Registrato para guiar o usuário em processos de múltiplas telas.

### 30.1 Estrutura HTML
```html
<ul class="bcb-stepper">
  <li class="bcb-stepper-item completed">
    <div class="bcb-stepper-circle">
      <span class="material-icons-outlined" style="font-size: 16px; vertical-align: middle;">check</span>
    </div>
    <span class="bcb-stepper-title">Autenticação</span>
  </li>
  <li class="bcb-stepper-item active">
    <div class="bcb-stepper-circle">2</div>
    <span class="bcb-stepper-title">Dados do Pedido</span>
  </li>
  <li class="bcb-stepper-item">
    <div class="bcb-stepper-circle">3</div>
    <span class="bcb-stepper-title">Confirmação</span>
  </li>
</ul>
```

### 30.2 Estados
| Classe | Visual | Uso |
|---|---|---|
| (padrão) | Círculo cinza | Etapa futura |
| `.active` | Círculo azul BCB, título em negrito | Etapa atual |
| `.completed` | Círculo azul Cinti + ícone check | Etapa concluída |

---

## 31. Paginação e Tooltips de Glossário

### 31.1 Paginação
Utilize a marcação padrão do Bootstrap 4. O CSS do BCB sobrescreve as cores automaticamente.

```html
<nav aria-label="Navegação de página">
  <ul class="pagination">
    <li class="page-item disabled"><a class="page-link" href="#">Anterior</a></li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Próximo</a></li>
  </ul>
</nav>
```

### 31.2 Tooltip de Glossário
Termos técnicos financeiros devem usar `.bcb-tooltip-link` combinada com os atributos de tooltip do Bootstrap.

```html
<a href="#" class="bcb-tooltip-link" data-toggle="tooltip" title="Taxa básica de juros da economia brasileira, definida pelo Copom.">
  Taxa Selic
</a>
```

> ⚠️ Lembre-se de inicializar os tooltips via JavaScript: `$('[data-toggle="tooltip"]').tooltip();`

---

## 32. Padrões de Layout (Grid do Bootstrap)
O BCB utiliza o sistema de 12 colunas do Bootstrap 4. A IA DEVE respeitar as seguintes proporções:

| Layout | Sidebar | Conteúdo | Quando Usar |
|---|---|---|---|
| **Editorial com Menu** | `col-md-4` | `col-md-8` | Páginas de serviço, conteúdo longo |
| **Grade de Cards (3 col.)** | — | `col-md-4` × 3 | Indicadores, links rápidos |
| **Grade de Cards (2 col.)** | — | `col-md-6` × 2 | Comparações, destaque |
| **Formulário Centralizado** | — | `col-md-8 offset-md-2` | Formulários longos de serviço |
| **Conteúdo Full-width** | — | `col-12` | Tabelas, alertas |

---

## 33. Timeline Educativa (Storytelling)
Componente focado em guiar o usuário por uma jornada de aprendizado ou passos detalhados. Usado na área de Cidadania Financeira.

### 33.1 Estrutura HTML
```html
<div class="timeline-container">
  <div class="card step-card d-block p-0">
    <div class="d-lg-flex flex-row-reverse align-items-stretch">
      <div class="img-placeholder" style="background-image: url('caminho/imagem.jpg');"></div>
      <div class="step-details border-0 w-100">
        <div class="step-header">
          <i class="material-icons step-icon" aria-hidden="true">school</i>
          <h2 class="step-title">1. Título do Passo</h2>
        </div>
        <div class="step-content pt-2 px-4 pb-0">
          <p>Conteúdo descritivo do passo da jornada.</p>
        </div>
      </div>
    </div>
    <div class="w-100 px-4 pb-4 pt-3 position-relative" style="background-color: #F8F9FB;">
      <div class="step-content pt-0 p-0 m-0">
        <p>Conteúdo adicional que ocupa a largura total do card.</p>
      </div>
    </div>
  </div>
</div>
```

### 33.2 Diretrizes
1. A linha vertical dourada (`.timeline-container::before`) conecta os cards visualmente.
2. O `.step-icon` deve usar ícones Material Icons que representem o tema do passo.
3. Em desktop (≥992px) o layout muda para horizontal (imagem à direita, conteúdo à esquerda).
4. Use pelo menos 2 step-cards para justificar a timeline visual.

---

## 34. Tip Box (Caixa de Dica)
Variação de alerta específica para contextos educacionais. Cor de fundo palha (`#FFF8E8`) com borda azul escura (`#005D77`).

```html
<div class="tip-box">
  <p class="mb-0"><strong>Dica:</strong> O Aprender Valor tem um portal só dele. Acesse e saiba mais!</p>
</div>
```

### ⚠️ Quando Usar
- Em páginas educativas, tutoriais e jornadas do cidadão.
- **NÃO** substitui o `bcb-olho` para avisos ou alertas formais. Use Tip Box apenas em contexto de aprendizado.

---

## 35. Hero Banner (Banner Principal)
Utilizado logo abaixo do `<h1>` para abrir páginas temáticas ou de produtos principais (ex: Pix, Open Finance, Cidadania Financeira).

### 35.1 Estrutura HTML Padrão
```html
<div class="bcb-hero-banner shadow-sm">
  <div class="row">
    <div class="col-md-6 bcb-hero-content">
      <h2 class="bcb-hero-title">Título de Impacto do Tema</h2>
      <div class="bcb-hero-text">
        Texto descritivo ou subtítulo que explica o tema da página de forma clara.
      </div>
      <div class="mt-auto text-md-right text-left">
        <a href="#" class="btn btn-sm btn-outline-primary bg-white">Ação ou Link Principal</a>
      </div>
    </div>
    <div class="col-md-6 bcb-hero-img-container">
      <img src="caminho/imagem.jpg" alt="Descrição da imagem">
    </div>
  </div>
</div>
```

### 35.2 Variantes de Cor
| Classe Extra | Cor de Fundo | Uso |
|---|---|---|
| (padrão) | `--bcb-brand-blue` (`#025C75`) | Tema geral / institucional |
| `.bg-verde-susta` | `#0A663A` | Sustentabilidade, ESG, agenda verde |
| `.bg-vinho` | `--bcb-brand-vinho` (`#2E4C59`) | Temas especiais, regulações |

### ⚠️ Diretrizes
1. O título (`.bcb-hero-title`) usa a cor amarelato (`--bcb-brand-amarellato`) para contraste sobre fundo escuro.
2. A imagem deve ter `alt` descritivo obrigatoriamente (e-Mag).
3. Use **apenas 1 Hero Banner** por página, sempre logo após o `<h1>`.

---

## 36. Carrossel de Vídeos (YouTube)
Usado para agrupar múltiplos vídeos sem poluir verticalmente a página. Possui scroll horizontal nativo (CSS Snap).

### 36.1 Estrutura HTML
```html
<div class="videos-destaque">
  <div class="video-item">
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen title="Título do vídeo"></iframe>
    </div>
    <p class="video-title">Título descritivo do vídeo</p>
  </div>
  <!-- Repita .video-item para cada vídeo -->
</div>
```

### ⚠️ Diretrizes
1. Cada `<iframe>` DEVE ter o atributo `title` descritivo (e-Mag/WCAG).
2. O `.video-container` mantém proporção 16:9 automaticamente via `padding-bottom: 56.25%`.
3. Recomenda-se entre 3 e 6 vídeos por carrossel.

---

## 37. Timeline Horizontal (Marcos e Fases)
Ideal para demonstrar a evolução de um projeto (ex: Fases do Open Finance, cronograma do Pix).

### 37.1 Estrutura HTML
```html
<div class="timeline-horizontal">
  <div class="timeline-h-step active">
    <div class="timeline-h-circle"></div>
    <div class="timeline-h-date">Fev/2021</div>
    <div class="timeline-h-text">Início da Fase 1: Dados Abertos</div>
  </div>
  <div class="timeline-h-step active">
    <div class="timeline-h-circle"></div>
    <div class="timeline-h-date">Ago/2021</div>
    <div class="timeline-h-text">Início da Fase 2: Dados de Clientes</div>
  </div>
  <div class="timeline-h-step">
    <div class="timeline-h-circle"></div>
    <div class="timeline-h-date">Out/2021</div>
    <div class="timeline-h-text">Início da Fase 3: Serviços</div>
  </div>
</div>
```

### 37.2 Estados
| Classe | Visual | Uso |
|---|---|---|
| (padrão) | Círculo cinza | Fase futura |
| `.active` | Círculo azul BCB | Fase concluída ou em andamento |