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
}

```

---

## 3. Tamanhos de Fonte (Base 16px)

```css
:root {
  --bcb-font-50:   0.75rem;   /* 12px - Legendas menores */
  --bcb-font-75:   0.875rem;  /* 14px - Textos secundários */
  --bcb-font-100:  1rem;      /* 16px - Corpo de texto padrão */
  --bcb-font-200:  1.125rem;  /* 18px - Destaques em parágrafos */
  --bcb-font-300:  1.25rem;   /* 20px - Subtítulos (H4, H5) */
  --bcb-font-400:  1.5rem;    /* 24px - Títulos de seção (H3) */
  --bcb-font-500:  1.75rem;   /* 28px - Títulos de página (H2) */
  --bcb-font-600:  2rem;      /* 32px - Títulos principais (H1) */
  --bcb-font-700:  2.25rem;   /* 36px - Banners */
  --bcb-font-800:  3rem;      /* 48px - Hero / Numerais grandes */
}

```

---

## 4. Espaçamentos (Grid de 4px)

```css
:root {
  --bcb-space-0:  0px;
  --bcb-space-1:  4px;
  --bcb-space-2:  8px;
  --bcb-space-3:  12px;
  --bcb-space-4:  16px;  /* Espaçamento interno padrão de botões/cards */
  --bcb-space-5:  20px;
  --bcb-space-6:  24px;  /* Respiro entre elementos pareados */
  --bcb-space-8:  32px;  /* Separação de seções menores */
  --bcb-space-12: 48px;
  --bcb-space-16: 64px;  /* Respiro de blocos na página principal */
  --bcb-space-24: 96px;
}

```

---

## 5. Bordas e Sombras (Elevation)

```css
:root {
  /* Border Radii */
  --bcb-radius-0:   0px;     /* O Bacen usa muitos cantos retos na web atual */
  --bcb-radius-4:   4px;     /* Bordas sutis para campos de formulário */
  --bcb-radius-8:   8px;     /* Cards modernos */
  --bcb-radius-pill: 9999px; /* Badges e Tags */

  /* Shadows (Elevação suave compatível com acessibilidade) */
  --bcb-shadow-100: 0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04);
  --bcb-shadow-300: 0 2px 4px rgba(0,0,0,0.10), 0 3px 3px rgba(0,0,0,0.08); /* Hover em Cards */
  --bcb-shadow-600: 3px 3px 10px 0 hsla(0,0%,76%,0.5); /* Sombra pesada extraída de modais/cards */
}

```