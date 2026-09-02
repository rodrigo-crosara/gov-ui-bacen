# BCB UI – Design Tokens & Brand Guidelines

> **Status**: v2.0 (Manual de Marca Oficial do BCB + Especificação W3C Design Tokens). Este arquivo documenta a paleta cromática oficial, códigos Pantone, RGB, CMYK e regras de mapeamento semântico para geração e validação de código por IA.

---

## 1. Identidade e Tom de Voz (Contexto para IA)
O Banco Central do Brasil (BCB) é a autoridade monetária do país. O design gerado a partir destes tokens deve refletir os valores da instituição: **Transparência, Solidez técnica, Confiança e Inovação**. A interface deve ser limpa, com suporte nativo e obrigatório ao Modo Escuro e ao Modo de Alto Contraste (WCAG 2.2 AA / AAA e e-MAG 3.1).

---

## 2. Paleta Cromática Oficial do Manual de Marca do BCB

| Cor Oficial | Nome Token | HEX | Pantone | RGB | CMYK | Aplicação Principal / Semântica |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Azul Blue** | `azul-blue` | `#025C75` | 3025 C | (2, 92, 117) | 98, 21, 0, 54 | Cor primária institucional, botões principais, cabeçalhos e títulos h1 |
| **Azul Cinti** | `azulcinti` | `#077391` | 7698 C | (7, 115, 145) | 95, 21, 0, 43 | Hover de botão primário, links em destaque, botões secundários |
| **Azul Petro** | `azulpetro` | `#2E4C59` | 7546 C | (46, 76, 89) | 48, 15, 0, 65 | Estado active/focus de botões, divisores e fundos de contraste sóbrio |
| **Azul Netuno** | `azulnetuno` | `#476F82` | 7544 C | (71, 111, 130) | 45, 15, 0, 49 | Cor complementar, tags informativas, badges e divisores gráficos |
| **Verde Susta** | `verde-susta` | `#067078` | 7719 C | (6, 112, 120) | 95, 7, 0, 53 | Feedback de sucesso (`feedback.success`), agenda BC# Sustentabilidade, indicadores positivos |
| **Verde Castell** | `verde-castell` | `#088694` | 3145 C | (8, 134, 148) | 95, 9, 0, 42 | Botões secundários, temas de inovação, contraste e destaque no modo escuro |
| **Cinza 80** | `cinza-80` | `#606062` | Cool Gray 10 C | (96, 96, 98) | 2, 2, 0, 62 | Textos secundários (`text.secondary`), metadados, títulos secundários (`.font-color-2`) |
| **Amarellato Biscoito** | `amarellato-biscoito` | `#F8D48D` | 141 C | (248, 212, 141) | 0, 15, 43, 3 | Anel de foco acessível, superfície de alerta (`feedback.warning-surface`), banners hero |
| **Cafellato** | `cafellato` | `#DEBE7F` | 7508 C | (222, 190, 127) | 0, 14, 43, 13 | Borda de alerta (`feedback.warning-border`), cartões especiais e destaques editoriais |
| **Vinho Autêntico** | `vinho-autentico` | `#47373A` | 4975 C | (71, 55, 58) | 0, 23, 18, 72 | Feedback de perigo/erro (`feedback.danger`), contraste solene institucional |
| **Marsala Suave** | `marsala-suave` | `#736063` | 5005 C | (115, 96, 99) | 0, 17, 14, 55 | Indicadores de mercado com oscilação negativa (inflação/volatilidade), alertas secundários |

---

## 3. Mapeamento Semântico para IA

Para garantir robustez e manutenibilidade, utilize sempre os tokens semânticos:

| Propósito Semântico | Token CSS Recomendado | Token no `tokens.json` | Valor Light | Valor Dark |
| :--- | :--- | :--- | :--- | :--- |
| **Botão Primário (Normal)** | `var(--bcb-btn-primary-bg)` | `action.primary.default` | `#025C75` | `#077391` |
| **Botão Primário (Hover)** | `var(--bcb-btn-primary-hover)` | `action.primary.hover` | `#077391` | `#088694` |
| **Botão Primário (Active)** | `var(--bcb-btn-primary-active)` | `action.primary.active` | `#2E4C59` | `#0A9FD4` |
| **Botão Secundário (Normal)** | `var(--bcb-btn-secondary-bg)` | `action.secondary.default` | `#088694` | `#088694` |
| **Botão Secundário (Hover)** | `var(--bcb-btn-secondary-hover)` | `action.secondary.hover` | `#067078` | `#0EB880` |
| **Feedback Sucesso** | `var(--bcb-feedback-success)` | `feedback.success` | `#067078` | `#0EB880` |
| **Feedback Atenção (Fundo)** | `var(--bcb-feedback-warning-surface)` | `feedback.warningSurface` | `#F8D48D` | `#F9DEAA` |
| **Feedback Atenção (Borda)** | `var(--bcb-feedback-warning-border)` | `feedback.warningBorder` | `#DEBE7F` | `#DEBE7F` |
| **Feedback Erro / Perigo** | `var(--bcb-feedback-danger)` | `feedback.danger` | `#47373A` | `#8A7276` |
| **Texto Secundário / Apoio** | `var(--bcb-text-secondary)` | `text.secondary` | `#606062` | `#9AA6B2` |

---

## 4. CSS Custom Properties (`:root`)
```css
:root {
  /* ==========================================
     1. BASE E TEXTO
     ========================================== */
  --bcb-color-white: #FFFFFF;
  --bcb-color-black: #000000;
  --bcb-color-body-text: #606060;
  --bcb-color-bg-light: #E0EBEE;

  /* ==========================================
     2. BRAND (Cores Oficiais do Manual de Marca)
     ========================================== */
  --bcb-brand-azul-blue: #025C75;
  --bcb-brand-azulcinti: #077391;
  --bcb-brand-azulpetro: #2E4C59;
  --bcb-brand-azulnetuno: #476F82;
  --bcb-brand-verde-susta: #067078;
  --bcb-brand-verde-castell: #088694;
  --bcb-brand-cinza-80: #606062;
  --bcb-brand-amarellato-biscoito: #F8D48D;
  --bcb-brand-cafellato: #DEBE7F;
  --bcb-brand-vinho-autentico: #47373A;
  --bcb-brand-marsala-suave: #736063;

  /* Aliases de compatibilidade */
  --bcb-brand-blue: #025C75;
  --bcb-brand-blue-dark: #013F50;
  --bcb-brand-gray80: #606062;
  --bcb-brand-vinho: #47373A;
  --bcb-brand-marsala: #736063;
  --bcb-brand-amarellato: #F8D48D;
  --bcb-color-azulcinti: #077391;
  --bcb-color-verde-castell: #088694;

  /* ==========================================
     3. AÇÕES E INTERAÇÃO
     ========================================== */
  --bcb-btn-primary-bg: #025C75;
  --bcb-btn-primary-hover: #077391;
  --bcb-btn-primary-active: #2E4C59;
  --bcb-btn-secondary-bg: #088694;
  --bcb-btn-secondary-hover: #067078;
  --bcb-btn-secondary-active: #2E4C59;
  --bcb-link-color: #1B75A6;
  --bcb-link-hover: #025C75;

  /* ==========================================
     4. FEEDBACK SEMÂNTICO
     ========================================== */
  --bcb-feedback-success: #067078;
  --bcb-feedback-warning-surface: #F8D48D;
  --bcb-feedback-warning-border: #DEBE7F;
  --bcb-feedback-danger: #47373A;
  --bcb-feedback-info: #025C75;

  /* ==========================================
     5. ESCALA DE CINZAS UI
     ========================================== */
  --bcb-gray-50:  #FAFBFC;
  --bcb-gray-100: #F3F5F7;
  --bcb-gray-200: #E6EAEF;
  --bcb-gray-300: #D0D7DF;
  --bcb-gray-400: #B7C0CB;
  --bcb-gray-500: #9AA6B2;
  --bcb-gray-600: #7E8A95;
  --bcb-gray-700: #606062;
  --bcb-gray-800: #3E454B;
  --bcb-gray-900: #22272B;
  --bcb-gray-1000: #0B0D0E;
}
```

---

## 3. Tamanhos de Fonte (Escala Fluida Responsiva via `clamp()`)

```css
:root {
  --bcb-font-50:   0.75rem;                                      /* 12px fixo - Legendas mínimas */
  --bcb-font-75:   clamp(0.75rem, 0.675rem + 0.38vw, 0.875rem);  /* 12px a 14px - Textos secundários */
  --bcb-font-100:  clamp(0.875rem, 0.8rem + 0.38vw, 1rem);       /* 14px a 16px - Corpo de texto padrão (p) */
  --bcb-font-200:  clamp(1rem, 0.925rem + 0.38vw, 1.125rem);     /* 16px a 18px - Subtítulos menores (h6) */
  --bcb-font-300:  clamp(1.125rem, 1.05rem + 0.38vw, 1.25rem);   /* 18px a 20px - Subtítulos (h5) */
  --bcb-font-400:  clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);      /* 20px a 24px - Títulos de seção (h4) */
  --bcb-font-500:  clamp(1.4rem, 1.19rem + 1.05vw, 1.75rem);     /* 22.4px a 28px - Títulos de bloco (h3) */
  --bcb-font-600:  clamp(1.6rem, 1.36rem + 1.2vw, 2rem);         /* 25.6px a 32px - Títulos de página (h2) */
  --bcb-font-700:  clamp(1.8rem, 1.53rem + 1.35vw, 2.25rem);     /* 28.8px a 36px - Título principal (h1) */
  --bcb-font-800:  clamp(2.2rem, 1.72rem + 2.4vw, 3rem);         /* 35.2px a 48px - Hero / Banners */
}
```

---

## 4. Espaçamentos (Grid de 4px, base 16px em `rem`)

```css
:root {
  --bcb-space-0:  0;
  --bcb-space-1:  0.25rem; /* 4px */
  --bcb-space-2:  0.5rem;  /* 8px */
  --bcb-space-3:  0.75rem; /* 12px */
  --bcb-space-4:  1rem;    /* 16px - Padrão de componentes */
  --bcb-space-5:  1.25rem; /* 20px */
  --bcb-space-6:  1.5rem;  /* 24px - Respiro entre elementos */
  --bcb-space-8:  2rem;    /* 32px - Separação de seções */
  --bcb-space-12: 3rem;    /* 48px */
  --bcb-space-16: 4rem;    /* 64px - Separação de grandes blocos */
  --bcb-space-24: 6rem;    /* 96px */
}
```

---

## 5. Bordas e Sombras (Elevation)

```css
:root {
  /* Border Radii */
  --bcb-radius-0:   0;
  --bcb-radius-4:   0.25rem; /* 4px - Campos e botões sutis */
  --bcb-radius-8:   0.5rem;  /* 8px - Cards e modais */
  --bcb-radius-pill: 9999px; /* Badges, chips e tags */

  /* Shadows (Elevação suave compatível com acessibilidade) */
  --bcb-shadow-100: 0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04);
  --bcb-shadow-300: 0 2px 4px rgba(0,0,0,0.10), 0 3px 3px rgba(0,0,0,0.08); /* Hover em Cards */
  --bcb-shadow-600: 3px 3px 10px 0 hsla(0,0%,76%,0.5); /* Sombra pesada */
}
```

---

## 6. Modo Escuro (Dark Mode)

O Design System suporta modo escuro via `@media (prefers-color-scheme: dark)` e `data-theme="dark"`. **Todos os tokens de superfície, texto e interação são invertidos automaticamente.** O agente de IA **NUNCA** deve usar cores hardcoded — sempre usar `var(--bcb-*)`.

### Tokens sobrescritos no modo escuro:
```css
:root[data-theme="dark"] {
  --bcb-color-white: #121212;        /* Fundo principal escurecido */
  --bcb-color-black: #FFFFFF;        /* Texto principal claro */
  --bcb-color-body-text: #D0D7DF;    /* Texto de corpo cinza claro */
  --bcb-color-bg-light: #1A1F24;     /* Fundo de seções alternadas */

  /* Escala de Cinzas completa (invertida) */
  --bcb-gray-50 a --bcb-gray-1000;   /* De #0B0D0E a #F3F5F7 */

  /* Brand mais vibrantes para contraste em fundo escuro */
  --bcb-brand-blue: #0A9FD4;         /* Azul mais claro */
  --bcb-brand-azulcinti: #0BB0C0;    /* Cinti mais vibrante */

  /* Links e botões mais claros */
  --bcb-link-color: #5BB8E8;         /* Link azul claro */
  --bcb-link-hover: #8AD0F5;         /* Hover mais claro */

  /* Sombras mais fortes */
  --bcb-shadow-100/300/600;          /* Opacidade aumentada */

  /* Callout tints escurecidos */
  --bg-brand-light: #0d2a33;
  --bg-verde-light: #0d2a25;
  --bg-amarellato-light: #2a2210;
}
```

---

## 7. Modo Alto Contraste (e-Mag 3.1 / WCAG AAA)

Ativado via `@media (prefers-contrast: more)` ou `data-contrast="high"`. Projetado para acessibilidade máxima.

### Princípios do Alto Contraste:
- **Superfícies**: Todas pretas (#000000)
- **Texto**: Tudo branco (#FFFFFF)
- **Links**: Amarelo (#FFFF00) — contraste máximo sobre preto
- **Bordas**: Brancas (substituem sombras removidas)
- **Sombras**: Todas `none`
- **Border-radius**: Todos `0` (cantos retos)
- **Foco**: Outline de 4px amarelo (#FFFF00)

### Tokens sobrescritos no alto contraste:
```css
:root[data-contrast="high"] {
  --bcb-color-white: #000000;
  --bcb-color-body-text: #FFFFFF;
  --bcb-link-color: #FFFF00;
  --bcb-link-hover: #FFFF66;
  --bcb-brand-amarellato: #FFFF00;    /* Anel de foco */
  --bcb-shadow-100/300/600: none;     /* Sem sombras */
  --bcb-radius-4/8: 0;               /* Sem bordas arredondadas */
}
```

> ⚠️ **REGRA PARA IA**: Nunca gere CSS inline ou cores hardcoded. Usando apenas `var(--bcb-*)`, o código funciona automaticamente nos 3 modos (claro, escuro e alto contraste).