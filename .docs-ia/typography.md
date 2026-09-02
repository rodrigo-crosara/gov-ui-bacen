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

### Títulos Padrão (Sans-Serif — Fonte Ubuntu)
A escala tipográfica é fluida e responsiva baseada nas Custom Properties com `clamp()`:

| Nível / Seletor | Custom Property | Faixa Fluida | Peso Base |
| :--- | :--- | :--- | :--- |
| `<h1>`, `.h1` | `var(--bcb-font-700)` | 1.8rem (28.8px) a 2.25rem (36px) | 500 (Medium) |
| `<h2>`, `.h2` | `var(--bcb-font-600)` | 1.6rem (25.6px) a 2.0rem (32px) | 500 (Medium) |
| `<h3>`, `.h3` | `var(--bcb-font-500)` | 1.4rem (22.4px) a 1.75rem (28px) | 500 (Medium) |
| `<h4>`, `.h4` | `var(--bcb-font-400)` | 1.25rem (20px) a 1.5rem (24px) | 500 (Medium) |
| `<h5>`, `.h5` | `var(--bcb-font-300)` | 1.125rem (18px) a 1.25rem (20px) | 500 (Medium) |
| `<h6>`, `.h6` | `var(--bcb-font-200)` | 1.0rem (16px) a 1.125rem (18px) | 500 (Medium), `text-transform: uppercase` |

### Títulos Excepcionais (Serif — Classe `.cormorant`)
Para usar esta variação serifada, adicione a classe CSS `.cormorant` à tag de título. A fonte muda para **Cormorant Garamond** com peso base **600**.

```html
<h2 class="cormorant">Notas à imprensa</h2>
```

---

## 4. Corpo de Texto (Body)

O portal utiliza uma escala fluida responsiva para o corpo do site, garantindo leitura agradável e acessível em qualquer dispositivo.

* **Cor Padrão:** `--bcb-color-body-text` (`#606060`).
* **Font-size base (`p`):** `var(--bcb-font-100)` (`clamp(0.875rem, 0.8rem + 0.38vw, 1rem)` — 14px a 16px).
* **Line-height:** `1.5rem` (proporciona ótimo respiro e ritmo vertical).
* **Links:** `--bcb-link-color` (`#1B75A6`), sublinhados no `:hover` (`#013F50`).

---

## 5. CSS Custom Properties & Classes Utilitárias

O código abaixo é aplicado globalmente pelo `bcb-style.css`:

```css
/* Famílias */
:root {
  --bcb-font-ubuntu: 'Ubuntu', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  --bcb-font-cormorant: 'Cormorant Garamond', serif;
  --bcb-font-istok: 'Istok Web', sans-serif;
}

/* Utilitário Serifado */
.cormorant {
  font-family: var(--bcb-font-cormorant) !important;
  font-weight: 600;
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
```