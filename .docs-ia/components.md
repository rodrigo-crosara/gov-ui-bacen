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