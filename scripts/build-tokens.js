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

// Resolução de referências de tokens no formato {color.brand.azul-blue}
function resolveValue(val) {
  if (typeof val !== 'string') return val;
  if (val.startsWith('{') && val.endsWith('}')) {
    const pathParts = val.slice(1, -1).split('.');
    let cur = tokens;
    for (const p of pathParts) {
      if (!cur) break;
      cur = cur[p];
    }
    if (cur && cur.$value !== undefined) {
      return resolveValue(cur.$value);
    }
  }
  return val;
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
    lines.push(`  --bcb-color-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 2. Brand (Cores Oficiais do Manual de Marca do BCB)
lines.push('  /* ==========================================');
lines.push('     2. BRAND (Cores Oficiais do Manual de Marca)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.brand) {
  for (const [k, v] of Object.entries(tokens.color.brand)) {
    lines.push(`  --bcb-brand-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
  // Aliases de compatibilidade para código e templates legados
  lines.push('  /* Aliases de compatibilidade */');
  lines.push(`  --bcb-brand-blue: ${resolveValue(tokens.color.brand['azul-blue']?.$value || '#025C75')};`);
  lines.push('  --bcb-brand-blue-dark: #013F50;');
  lines.push(`  --bcb-brand-gray80: ${resolveValue(tokens.color.brand['cinza-80']?.$value || '#606062')};`);
  lines.push(`  --bcb-brand-vinho: ${resolveValue(tokens.color.brand['vinho-autentico']?.$value || '#47373A')};`);
  lines.push(`  --bcb-brand-marsala: ${resolveValue(tokens.color.brand['marsala-suave']?.$value || '#736063')};`);
  lines.push(`  --bcb-brand-amarellato: ${resolveValue(tokens.color.brand['amarellato-biscoito']?.$value || '#F8D48D')};`);
  lines.push(`  --bcb-color-azul-blue: ${resolveValue(tokens.color.brand['azul-blue']?.$value || '#025C75')};`);
  lines.push(`  --bcb-color-azulcinti: ${resolveValue(tokens.color.brand['azulcinti']?.$value || '#077391')};`);
  lines.push(`  --bcb-color-azulpetro: ${resolveValue(tokens.color.brand['azulpetro']?.$value || '#2E4C59')};`);
  lines.push(`  --bcb-color-verde-castell: ${resolveValue(tokens.color.brand['verde-castell']?.$value || '#088694')};`);
  lines.push(`  --bcb-color-vinho-autentico: ${resolveValue(tokens.color.brand['vinho-autentico']?.$value || '#47373A')};`);
}
lines.push('');

// 3. Ações e Interação
lines.push('  /* ==========================================');
lines.push('     3. AÇÕES E INTERAÇÃO (Botões e Links)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.action) {
  const primary = tokens.color.action.primary;
  if (primary) {
    lines.push(`  --bcb-btn-primary-bg: ${resolveValue(primary.default?.$value)};`);
    lines.push(`  --bcb-btn-primary-hover: ${resolveValue(primary.hover?.$value)};`);
    lines.push(`  --bcb-btn-primary-active: ${resolveValue(primary.active?.$value)};`);
    lines.push(`  --bcb-action-primary-default: ${resolveValue(primary.default?.$value)};`);
    lines.push(`  --bcb-action-primary-hover: ${resolveValue(primary.hover?.$value)};`);
    lines.push(`  --bcb-action-primary-active: ${resolveValue(primary.active?.$value)};`);
  }
  const secondary = tokens.color.action.secondary;
  if (secondary) {
    lines.push(`  --bcb-btn-secondary-bg: ${resolveValue(secondary.default?.$value)};`);
    lines.push(`  --bcb-btn-secondary-hover: ${resolveValue(secondary.hover?.$value)};`);
    lines.push(`  --bcb-btn-secondary-active: ${resolveValue(secondary.active?.$value)};`);
    lines.push(`  --bcb-action-secondary-default: ${resolveValue(secondary.default?.$value)};`);
    lines.push(`  --bcb-action-secondary-hover: ${resolveValue(secondary.hover?.$value)};`);
    lines.push(`  --bcb-action-secondary-active: ${resolveValue(secondary.active?.$value)};`);
  }
  const link = tokens.color.action.link;
  if (link) {
    lines.push(`  --bcb-link-color: ${resolveValue(link.default?.$value)};`);
    lines.push(`  --bcb-link-hover: ${resolveValue(link.hover?.$value)};`);
  }
}
lines.push('');

// 4. Feedback Semântico
lines.push('  /* ==========================================');
lines.push('     4. FEEDBACK SEMÂNTICO (Success, Warning, Danger, Info)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.feedback) {
  for (const [k, v] of Object.entries(tokens.color.feedback)) {
    lines.push(`  --bcb-feedback-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
  if (tokens.color.feedback.warningBorder) {
    lines.push(`  --bcb-feedback-warning: ${resolveValue(tokens.color.feedback.warningBorder.$value)};`);
  }
}
lines.push('');

// 5. Texto e Superfície
lines.push('  /* ==========================================');
lines.push('     5. TEXTO E SUPERFÍCIE');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.text) {
  for (const [k, v] of Object.entries(tokens.color.text)) {
    lines.push(`  --bcb-text-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
}
if (tokens.color && tokens.color.surface) {
  for (const [k, v] of Object.entries(tokens.color.surface)) {
    lines.push(`  --bcb-surface-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 6. Alto Contraste
lines.push('  /* ==========================================');
lines.push('     6. MODO ALTO CONTRASTE (Acessibilidade)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.highContrast) {
  for (const [k, v] of Object.entries(tokens.color.highContrast)) {
    lines.push(`  --bcb-hc-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 7. Escala de Cinzas UI
lines.push('  /* ==========================================');
lines.push('     7. ESCALA DE CINZAS UI (Superfícies e Bordas)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.gray) {
  for (const [k, v] of Object.entries(tokens.color.gray)) {
    lines.push(`  --bcb-gray-${k}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 8. Tints dos Callouts
lines.push('  /* ==========================================');
lines.push('     8. TINTS DE SUPERFÍCIE (Callouts e Destaques)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.tint) {
  for (const [k, v] of Object.entries(tokens.color.tint)) {
    lines.push(`  --bg-${toKebab(k).replace('-light', '')}-light: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 8.1. Paleta Mestra Oficial de Gráficos (12 Cores Sequenciais - Manual Corporativo BCB)
lines.push('  /* ==========================================');
lines.push('     8.1 PALETA MESTRA DE GRÁFICOS (12 Cores Sequenciais BCB)');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.chart) {
  for (const [k, v] of Object.entries(tokens.color.chart)) {
    lines.push(`  --bcb-chart-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 8.2. Cores Estruturais e Funcionais de Tabelas (Manual Corporativo BCB)
lines.push('  /* ==========================================');
lines.push('     8.2 CORES ESTRUTURAIS E FUNCIONAIS DE TABELAS');
lines.push('     ========================================== */');
if (tokens.color && tokens.color.table) {
  for (const [k, v] of Object.entries(tokens.color.table)) {
    lines.push(`  --bcb-table-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 9. Tamanhos de Fonte
lines.push('  /* ==========================================');
lines.push('     9. TAMANHOS DE FONTE (Fluída com clamp)');
lines.push('     ========================================== */');
if (tokens.typography && tokens.typography.fontSize) {
  for (const [k, v] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`  --bcb-font-${k}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 10. Espaçamentos
lines.push('  /* ==========================================');
lines.push('     10. ESPAÇAMENTOS (Grid de 4px, base 16px)');
lines.push('     ========================================== */');
if (tokens.spacing) {
  for (const [k, v] of Object.entries(tokens.spacing)) {
    lines.push(`  --bcb-space-${k}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 11. Bordas e Sombras
lines.push('  /* ==========================================');
lines.push('     11. BORDAS E SOMBRAS (Elevation)');
lines.push('     ========================================== */');
if (tokens.borderRadius) {
  for (const [k, v] of Object.entries(tokens.borderRadius)) {
    lines.push(`  --bcb-radius-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');
if (tokens.boxShadow) {
  for (const [k, v] of Object.entries(tokens.boxShadow)) {
    lines.push(`  --bcb-shadow-${k}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 12. Famílias Tipográficas
lines.push('  /* ==========================================');
lines.push('     12. FAMÍLIAS TIPOGRÁFICAS');
lines.push('     ========================================== */');
if (tokens.typography && tokens.typography.fontFamily) {
  for (const [k, v] of Object.entries(tokens.typography.fontFamily)) {
    lines.push(`  --bcb-font-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
}
lines.push('');

// 13. Portal Primary
lines.push('  /* ==========================================');
lines.push('     13. PORTAL PRIMARY');
lines.push('     ========================================== */');
lines.push('  --bcb-portal-primary: #22272B;');
lines.push('');

// 14. Z-Index (Camadas de Interface)
lines.push('  /* ==========================================');
lines.push('     14. Z-INDEX (Escala de Camadas)');
lines.push('     ========================================== */');
if (tokens.zIndex) {
  for (const [k, v] of Object.entries(tokens.zIndex)) {
    lines.push(`  --bcb-z-${toKebab(k)}: ${resolveValue(v.$value)};`);
  }
}

lines.push('}');
lines.push('');

// 15. Compatibilidade Bootstrap e Padrões Visuais BCB
lines.push('/* ==========================================');
lines.push('   15. COMPATIBILIDADE BOOTSTRAP & UTILITÁRIOS OFICIAIS');
lines.push('   ========================================== */');
lines.push('.text-primary {');
lines.push('  color: var(--bcb-color-primary, #2E4C59) !important;');
lines.push('}');
lines.push('');
lines.push('.bg-primary {');
lines.push('  background-color: var(--bcb-color-primary, #2E4C59) !important;');
lines.push('}');
lines.push('');
lines.push('.border-primary {');
lines.push('  border-color: var(--bcb-color-primary, #2E4C59) !important;');
lines.push('}');
lines.push('');
lines.push('.badge-primary {');
lines.push('  background-color: var(--bcb-color-primary, #2E4C59) !important;');
lines.push('  color: #ffffff !important;');
lines.push('}');
lines.push('');
lines.push('/* Textos institucionais e badges com a cor da marca por padrão */');
lines.push('.text-bcb-brand,');
lines.push('.font-color-1 {');
lines.push('  color: var(--bcb-color-primary, #2E4C59) !important;');
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

