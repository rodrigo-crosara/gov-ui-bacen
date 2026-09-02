# BCB UI – Design Tokens & Brand Guidelines

> **Status**: v1.1 (Base Documental + Extração de Produção). Este arquivo unifica o Manual da Marca com os tokens absolutos extraídos via engenharia reversa do CSS em produção do portal (Bootstrap 4.6.2 customizado).

---

## 1. Identidade e Tom de Voz (Contexto para IA)
O Banco Central do Brasil (BCB) é a autoridade monetária do país. O design gerado a partir destes tokens deve refletir os valores da instituição: **Transparência, Excelência técnica, Confiança e Inovação**. A interface deve ser limpa, com suporte nativo e obrigatório ao Modo de Alto Contraste (WCAG).

---

## 2. Cores Institucionais e UI (Tokens Absolutos)

### CSS Custom Properties
```css
:root {
  /* ==========================================
     1. BASE E TEXTO
     ========================================== */
  --bcb-color-white: #FFFFFF;
  --bcb-color-black: #000000;
  --bcb-color-body-text: #606060; /* Extraído do body de produção */
  --bcb-color-bg-light: #e0ebee;  /* Extraído da classe .bg-color-12 */

  /* ==========================================
     2. BRAND (Primárias Oficiais)
     ========================================== */
  --bcb-brand-blue: #025C75;      /* Pantone 3025 - Classe .font-color-1 */
  --bcb-brand-gray80: #606062;    /* Pantone Cool Gray 10 - Classe .font-color-2 */

  /* ==========================================
     3. BRAND (Complementares)
     ========================================== */
  --bcb-brand-vinho: #2E4C59;
  --bcb-brand-marsala: #736063;
  --bcb-brand-azulpetro: #077391;
  --bcb-brand-azulnetuno: #476F82;
  --bcb-brand-azulcinti: #088694; /* Usado como botão secundário */
  --bcb-brand-verde-susta: #067078;
  --bcb-brand-verde-castell: #DEBE7F;
  --bcb-brand-amarellato: #F8D48D;
  --bcb-brand-cafellato: #47373A;

  /* ==========================================
     4. INTERAÇÃO E BOTÕES (Extraído de Produção)
     ========================================== */
  /* Primary Button */
  --bcb-btn-primary-bg: #025C75;
  --bcb-btn-primary-hover: #013F50;
  --bcb-btn-primary-active: #012F3C;
  
  /* Secondary Button */
  --bcb-btn-secondary-bg: #088694;
  --bcb-btn-secondary-hover: #066974;
  --bcb-btn-secondary-active: #055861;

  /* Links */
  --bcb-link-color: #3298D5;
  --bcb-link-hover: #0056B3;

  /* ==========================================
     5. MODO ALTO CONTRASTE (Acessibilidade)
     ========================================== */
  --bcb-hc-bg-level-1: #000000; /* Fundo principal */
  --bcb-hc-bg-level-2: #222222; /* Fundo de cards/blocos */
  --bcb-hc-bg-level-3: #333333; /* Fundo de botões e menus */
  --bcb-hc-text: #FFFFFF;
  --bcb-hc-link: #FFFF00;       /* Amarelo contraste máximo */
  --bcb-hc-border: #FFFFFF;
  
  /* ==========================================
     6. ESCALA DE CINZAS UI (Superfícies e Bordas)
     ========================================== */
  --bcb-gray-50:  #FAFBFC;
  --bcb-gray-100: #F3F5F7;
  --bcb-gray-200: #E6EAEF;
  --bcb-gray-300: #D0D7DF;
  --bcb-gray-400: #B7C0CB;
  --bcb-gray-500: #9AA6B2;
  --bcb-gray-600: #7E8A95;
  --bcb-gray-700: #606062; /* Equivalente ao Cinza80 Institucional */
  --bcb-gray-800: #3E454B;
  --bcb-gray-900: #22272B;
  --bcb-gray-1000: #0B0D0E;
  /* ==========================================
     7. TINTS DE SUPERFÍCIE (Callouts e Destaques)
     ========================================== */
  --bg-brand-light:      #f0f7f9;
  --bg-verde-light:      #f0f8f8;
  --bg-amarellato-light: #fefbfa;
  --bg-vinho-light:      #f5f7f8;
  --bg-gray-light:       #f8f9fb;
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