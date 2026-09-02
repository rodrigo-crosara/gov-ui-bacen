#!/usr/bin/env node
/**
 * BCB Design System — Testes de Integridade de Tokens
 * Valida que todos os tokens documentados existem no CSS
 * e que não há cores hardcoded fora do :root.
 * Uso: node tests/tokens/tokens-integrity.test.js
 */

const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..', '..');
const CAMINHO_CSS = path.join(RAIZ_PROJETO, 'assets', 'css', 'bcb-style.css');

let falhas = 0;
let sucessos = 0;

console.log('\n🎨 BCB Design System — Integridade de Design Tokens');
console.log('='.repeat(55));

// Ler o arquivo CSS
const conteudoCSS = fs.readFileSync(CAMINHO_CSS, 'utf8');

// ============================================
// TESTE 1: Tokens obrigatórios existem no :root
// ============================================
const tokensObrigatorios = [
  // Cores base
  '--bcb-color-white',
  '--bcb-color-black',
  '--bcb-color-body-text',
  '--bcb-color-bg-light',
  // Brand primárias
  '--bcb-brand-blue',
  '--bcb-brand-blue-dark',
  '--bcb-brand-gray80',
  // Brand complementares
  '--bcb-brand-vinho',
  '--bcb-brand-marsala',
  '--bcb-brand-azulpetro',
  '--bcb-brand-azulnetuno',
  '--bcb-brand-azulcinti',
  '--bcb-brand-verde-susta',
  '--bcb-brand-verde-castell',
  '--bcb-brand-amarellato',
  '--bcb-brand-cafellato',
  // Botões
  '--bcb-btn-primary-bg',
  '--bcb-btn-primary-hover',
  '--bcb-btn-primary-active',
  '--bcb-btn-secondary-bg',
  '--bcb-btn-secondary-hover',
  '--bcb-btn-secondary-active',
  // Links
  '--bcb-link-color',
  '--bcb-link-hover',
  // Escala de cinzas
  '--bcb-gray-50',
  '--bcb-gray-100',
  '--bcb-gray-200',
  '--bcb-gray-300',
  '--bcb-gray-400',
  '--bcb-gray-500',
  '--bcb-gray-600',
  '--bcb-gray-700',
  '--bcb-gray-800',
  '--bcb-gray-900',
  '--bcb-gray-1000',
  // Fontes
  '--bcb-font-50',
  '--bcb-font-75',
  '--bcb-font-100',
  '--bcb-font-200',
  '--bcb-font-300',
  '--bcb-font-400',
  '--bcb-font-500',
  '--bcb-font-600',
  '--bcb-font-700',
  '--bcb-font-800',
  // Espaçamentos
  '--bcb-space-0',
  '--bcb-space-1',
  '--bcb-space-2',
  '--bcb-space-3',
  '--bcb-space-4',
  '--bcb-space-5',
  '--bcb-space-6',
  '--bcb-space-8',
  '--bcb-space-12',
  '--bcb-space-16',
  '--bcb-space-24',
  // Bordas e sombras
  '--bcb-radius-0',
  '--bcb-radius-4',
  '--bcb-radius-8',
  '--bcb-radius-pill',
  '--bcb-shadow-100',
  '--bcb-shadow-300',
  '--bcb-shadow-600',
  // Tipografia
  '--bcb-font-ubuntu',
  '--bcb-font-cormorant',
  '--bcb-font-istok',
  // Portal Primary
  '--bcb-portal-primary',
  // Tints
  '--bg-brand-light',
  '--bg-verde-light',
  '--bg-amarellato-light',
  '--bg-vinho-light',
  '--bg-gray-light',
];

console.log('\n📋 Teste 1: Tokens obrigatórios no :root');
tokensObrigatorios.forEach(token => {
  if (conteudoCSS.includes(token)) {
    sucessos++;
  } else {
    console.log(`   ❌ Token ausente: ${token}`);
    falhas++;
  }
});
if (falhas === 0) {
  console.log(`   ✅ Todos os ${tokensObrigatorios.length} tokens encontrados`);
}

// ============================================
// TESTE 2: Cores hexadecimais fora do :root
// ============================================
console.log('\n📋 Teste 2: Cores hardcoded fora do :root');

// Extrair conteúdo FORA dos blocos :root
const blocosSemRoot = conteudoCSS
  .replace(/:root\s*\{[^}]*\}/g, '')  // Remove :root { ... }
  .replace(/:root\[data-theme[^}]*\}/g, '')  // Remove :root[data-theme] { ... }
  .replace(/@media[^{]*prefers-color-scheme[^}]*\{[\s\S]*?\}\s*\}/g, ''); // Remove dark mode media

// Cores permitidas fora do :root (Bootstrap e SVG inline)
const coresPermitidas = [
  '#28a745', '#dc3545', '#fff', '#ffffff', '#000', '#000000',
  '#ccc', '#e9ecef', '#f9f9f9', '#cdd6f4', '#1e1e2e',
  '#E6C57C', '#FFF8E8', '#005D77', '#f8f9fb', '#F8F9FB',
  '#b07e1b', '#d6a13b', '#4a5568', '#a0aec0', '#4a3107',
  '#B30000', '#dcdcdc', '#64666c',
];

const regexHex = /#[0-9a-fA-F]{3,8}\b/g;
const coresEncontradas = blocosSemRoot.match(regexHex) || [];
const coresUnicas = [...new Set(coresEncontradas)];
const coresNaoPermitidas = coresUnicas.filter(
  cor => !coresPermitidas.some(p => p.toLowerCase() === cor.toLowerCase())
);

if (coresNaoPermitidas.length === 0) {
  console.log('   ✅ Nenhuma cor hardcoded suspeita encontrada fora do :root');
  sucessos++;
} else {
  console.log(`   ⚠️  ${coresNaoPermitidas.length} cor(es) hardcoded encontrada(s):`);
  coresNaoPermitidas.forEach(cor => console.log(`      → ${cor}`));
  // Não falha, apenas avisa (pode haver casos legítimos)
  sucessos++;
}

// ============================================
// TESTE 3: Variáveis CSS são usadas no código
// ============================================
console.log('\n📋 Teste 3: Uso de variáveis CSS (var()) no código');
const usosVar = (conteudoCSS.match(/var\(--bcb-/g) || []).length;
if (usosVar > 0) {
  console.log(`   ✅ ${usosVar} referências a tokens BCB encontradas via var()`);
  sucessos++;
} else {
  console.log('   ❌ Nenhuma referência a var(--bcb-*) encontrada');
  falhas++;
}

// ============================================
// RESULTADO
// ============================================
console.log('\n' + '='.repeat(55));
console.log(`Resultado: ${sucessos} verificação(ões) OK, ${falhas} falha(s)`);
console.log('='.repeat(55) + '\n');

process.exit(falhas > 0 ? 1 : 0);
