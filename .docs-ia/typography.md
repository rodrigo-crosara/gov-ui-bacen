# BCB UI – Typography & Accessibility Guidelines

> **Status**: v1.0 (Base Documental + Extração de Produção). Define as famílias tipográficas, hierarquia de títulos, responsividade e regras estritas de acessibilidade (e-Mag 3.1 / WCAG 2.0) para o Banco Central do Brasil.

---

## 1. Famílias Tipográficas (Font Families)

O portal utiliza três famílias tipográficas com propósitos semânticos bem definidos:

1. **Ubuntu (Principal / Default)**
   - **Uso:** Títulos padrão, interface (UI), botões e corpo de texto web.
   - **Características:** Traço simples e reto com cantos levemente arredondados.
   - **Pesos:** 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold).
   - **CSS Fallback:** `font-family: 'Ubuntu', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;`

2. **Cormorant Garamond (Serifada / Excepcional)**
   - **Uso:** Textos muito longos ou variações excepcionais e formais de títulos (aplicando a classe `.cormorant`).
   - **Pesos:** 300, 400, 500, 600.
   - **CSS Fallback:** `font-family: 'Cormorant Garamond', serif;`

3. **Istok Web (Alternativa de Marca)**
   - **Uso:** Fonte sem serifa alternativa, onde a letra "T" inclinada remete ao chanfro da identidade visual do BCB.

---

## 2. Regras Estritas de Acessibilidade (Diretrizes para a IA)

> ⚠️ **ATENÇÃO AGENTES DE IA:** As regras abaixo são INQUEBRÁVEIS e devem ser aplicadas em todo código HTML/React gerado.

* **Regra do H1 Único (e-Mag 3.1 / WCAG 1.3.1):** O nível `<h1>` deve representar o conteúdo principal da página. **É ESTRITAMENTE PROIBIDO** gerar mais de uma tag `<h1>` por página.
* **Hierarquia de Títulos:** As tags `<h2>` a `<h6>` devem ser usadas para subdividir o conteúdo sequencialmente. Não pule níveis (ex: não use um `<h4>` logo após um `<h2>`).
* **Idiomas Estrangeiros (e-Mag 3.2 / WCAG 3.1.2):** Qualquer termo ou frase em idioma estrangeiro (diferente do idioma principal da página) DEVE ser encapsulado em uma tag `<span>` com o atributo `lang` correto, acompanhado de itálico. 
    * *Exemplo Incorreto:* `Temos um novo background.`
    * *Exemplo Correto:* `Temos um novo <span lang="en"><i>background</i></span>.`

---

## 3. Escala Tipográfica (Headings)

Os títulos possuem tamanhos responsivos (Desktop / Mobile) e uma variação opcional serifada. A fonte padrão dos títulos é a **Ubuntu (peso 500)**.

### Títulos Padrão (Sans-Serif)
| Nível | Desktop (>= 992px) | Mobile (< 992px) | Peso | Estilo Extra |
| :--- | :--- | :--- | :--- | :--- |
| `<h1>` | 2.5rem (40px) | 1.8rem | 500 | - |
| `<h2>` | 1.8rem (28.8px) | 1.6rem | 500 | - |
| `<h3>` | 1.5rem (24px) | 1.3rem | 500 | - |
| `<h4>` | 1.32rem (~21px) | 1.1rem | 500 | - |
| `<h5>` | 1.2rem (19.2px) | 1.15rem | 500 | - |
| `<h6>` | 1.0rem (16px) | 0.9rem | 500 | `text-transform: uppercase` |

### Títulos Excepcionais (Serif - Classe `.cormorant`)
Para usar esta variação, adicione a classe CSS `.cormorant` à tag de título. A fonte muda para **Cormorant Garamond** e o peso base passa a ser **600**.

| Nível / Classe | Desktop | Peso |
| :--- | :--- | :--- |
| `<h1 class="cormorant">` | 2.2rem | 600 |
| `<h2 class="cormorant">` | 2.0rem | 600 |
| `<h3 class="cormorant">` | 1.9rem | 600 |
| `<h4 class="cormorant">` | 1.8rem | 600 |
| `<h5 class="cormorant">` | 1.7rem | 600 |
| `<h6 class="cormorant">` | 1.6rem | 600 |

---

## 4. Corpo de Texto (Body)

O portal utiliza uma fórmula de tipografia fluida para o corpo do site, garantindo leitura agradável em qualquer dispositivo.

* **Cor Padrão:** `--bcb-color-body-text` (`#606060`).
* **Font-size base:** `calc(15px + 0.1vw)` (Mínimo de 15px, crescendo suavemente em telas grandes).
* **Line-height:** `1.5rem` (Proporciona ótimo respiro entre as linhas).
* **Links:** `--bcb-link-color` (`#3298D5`), sublinhados apenas no `:hover` (`#0056B3`).

---

## 5. CSS Custom Properties & Classes Utilitárias

O código abaixo deve ser usado pelo Agente para gerar estilos consistentes:

```css
/* Famílias */
:root {
  --bcb-font-ubuntu: 'Ubuntu', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  --bcb-font-cormorant: 'Cormorant Garamond', serif;
  --bcb-font-istok: 'Istok Web', sans-serif;
}

/* Utilitários de Peso e Estilo */
.light   { font-weight: 300; }
.medium  { font-weight: 500; }  /* Padrão de títulos e <b> / <strong> */
.bold    { font-weight: 700; }
.italic  { font-style: italic; }

/* Utilitários de Acessibilidade / Textos */
.text-body { color: var(--bcb-color-body-text); }
.text-link { color: var(--bcb-link-color); text-decoration: none; }
.text-link:hover { color: var(--bcb-link-hover); text-decoration: underline; }