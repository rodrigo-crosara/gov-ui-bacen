#!/usr/bin/env node
/**
 * BCB Design System — Compilador e Sincronizador de Design Tokens
 * Lê tokens.json (W3C Design Tokens Spec) e gera assets/css/_00-settings/_tokens.css.
 * Uso:
 *   node scripts/build-tokens.js          (Compilar)
 *   node scripts/build-tokens.js --check  (Validar se o CSS está sincronizado no CI)
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const TOKENS_JSON_PATH = path.join(RAIZ, 'tokens.json');
const TOKENS_CSS_PATH = path.join(RAIZ, 'assets', 'css', '_00-settings', '_tokens.css');

const isCheckMode = process.argv.includes('--check');

if (!fs.existsSync(TOKENS_JSON_PATH)) {
  console.error(`❌ Erro: Arquivo ${TOKENS_JSON_PATH} não encontrado.`);
  process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(TOKENS_JSON_PATH, 'utf8'));

// Função auxiliar para converter camelCase para kebab-case
function toKebab(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

const lines = [];
lines.push('/* ============= BCB Design System — Settings / Tokens ============= */');
lines.push('/* ATENÇÃO: Este arquivo é gerado automaticamente a partir de tokens.json. */');
lines.push('/* Para modificar tokens, edite tokens.json e execute: npm run build:tokens */');
lines.push('');
lines.push(':root {');

// 1. Base e Texto
lines.push('  /* ==========================================');
lines.push('     1. BASE E TEXTO');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.base) {
  for (const [k, v] of Object.entries(tokens.color.base)) {
    lines.push(`  --bcb-color-${toKebab(k)}: ${v.$value};`);
  }
}
lines.push('');

// 2. Brand (Primárias Oficiais)
lines.push('  /* ==========================================');
lines.push('     2. BRAND (Primárias Oficiais)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.brand) {
  const primaryKeys = ['blue', 'blueDark', 'gray80'];
  for (const k of primaryKeys) {
    if (tokens.color.brand[k]) {
      lines.push(`  --bcb-brand-${toKebab(k)}: ${tokens.color.brand[k].$value};`);
    }
  }
}
lines.push('');

// 3. Brand (Complementares)
lines.push('  /* ==========================================');
lines.push('     3. BRAND (Complementares)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.brand) {
  const primaryKeys = new Set(['blue', 'blueDark', 'gray80']);
  for (const [k, v] of Object.entries(tokens.color.brand)) {
    if (!primaryKeys.has(k)) {
      lines.push(`  --bcb-brand-${toKebab(k)}: ${v.$value};`);
    }
  }
}
lines.push('');

// 4. Interação e Botões
lines.push('  /* ==========================================');
lines.push('     4. INTERAÇÃO E BOTÕES');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.interaction) {
  for (const [k, v] of Object.entries(tokens.color.interaction)) {
    lines.push(`  --bcb-${toKebab(k)}: ${v.$value};`);
  }
}
lines.push('');

// 5. Alto Contraste
lines.push('  /* ==========================================');
lines.push('     5. MODO ALTO CONTRASTE (Acessibilidade)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.highContrast) {
  for (const [k, v] of Object.entries(tokens.color.highContrast)) {
    lines.push(`  --bcb-hc-${toKebab(k)}: ${v.$value};`);
  }
}
lines.push('');

// 6. Escala de Cinzas UI
lines.push('  /* ==========================================');
lines.push('     6. ESCALA DE CINZAS UI (Superfícies e Bordas)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.gray) {
  for (const [k, v] of Object.entries(tokens.color.gray)) {
    lines.push(`  --bcb-gray-${k}: ${v.$value};`);
  }
}
lines.push('');

// 7. Tamanhos de Fonte
lines.push('  /* ==========================================');
lines.push('     7. TAMANHOS DE FONTE (Fluída com clamp)');
lines.push('     ========================================== */');
if (tokens.typography && tokens.typography.fontSize) {
  for (const [k, v] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`  --bcb-font-${k}: ${v.$value};`);
  }
}
lines.push('');

// 8. Espaçamentos
lines.push('  /* ==========================================');
lines.push('     8. ESPAÇAMENTOS (Grid de 4px, base 16px)');
lines.push('     ========================================== */');
if (tokens.spacing) {
  for (const [k, v] of Object.entries(tokens.spacing)) {
    lines.push(`  --bcb-space-${k}: ${v.$value};`);
  }
}
lines.push('');

// 9. Bordas e Sombras
lines.push('  /* ==========================================');
lines.push('     9. BORDAS E SOMBRAS (Elevation)');
lines.push('     ========================================== */');
if (tokens.borderRadius) {
  for (const [k, v] of Object.entries(tokens.borderRadius)) {
    lines.push(`  --bcb-radius-${toKebab(k)}: ${v.$value};`);
  }
}
lines.push('');
if (tokens.boxShadow) {
  for (const [k, v] of Object.entries(tokens.boxShadow)) {
    lines.push(`  --bcb-shadow-${k}: ${v.$value};`);
  }
}
lines.push('');

// 10. Famílias Tipográficas
lines.push('  /* ==========================================');
lines.push('     10. FAMÍLIAS TIPOGRÁFICAS');
lines.push('     ========================================== */');
if (tokens.typography && tokens.typography.fontFamily) {
  for (const [k, v] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`  --bcb-font-${toKebab(k)}: ${v.$value};`);
  }
}
lines.push('');

// 11. Portal Primary e Feedback
lines.push('  /* ==========================================');
lines.push('     11. FEEDBACK E PORTAL');
lines.push('     ========================================== */');
lines.push('  --bcb-portal-primary: #22272B;');
if (tokens.color && tokens.color.feedback) {
  for (const [k, v] of Object.entries(tokens.color.feedback)) {
    lines.push(`  --bcb-feedback-${toKebab(k)}: ${v.$value};`);
  }
}

lines.push('}');
lines.push('');

const outputCSS = lines.join('\n');

if (isCheckMode) {
  if (!fs.existsSync(TOKENS_CSS_PATH)) {
    console.error(`❌ Erro: ${TOKENS_CSS_PATH} não existe.`);
    process.exit(1);
  }
  const currentCSS = fs.readFileSync(TOKENS_CSS_PATH, 'utf8');
  if (currentCSS.trim() !== outputCSS.trim()) {
    console.error('❌ Erro: _tokens.css está desatualizado em relação a tokens.json.');
    console.error('Execute: npm run build:tokens');
    process.exit(1);
  } else {
    console.log('✅ tokens.json e _tokens.css estão 100% sincronizados.');
    process.exit(0);
  }
} else {
  fs.writeFileSync(TOKENS_CSS_PATH, outputCSS, 'utf8');
  console.log(`✅ Design Tokens compilados com sucesso em ${TOKENS_CSS_PATH}`);
}
