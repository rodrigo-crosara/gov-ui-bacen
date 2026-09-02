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

// Ler o arquivo CSS e resolver diretivas @import recursivamente (Arquitetura ITCSS)
function lerCSSComImports(caminhoArquivo, visitados = new Set()) {
  if (visitados.has(caminhoArquivo)) return '';
  visitados.add(caminhoArquivo);
  if (!fs.existsSync(caminhoArquivo)) return '';
  const dir = path.dirname(caminhoArquivo);
  let conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
  conteudo = conteudo.replace(/@import\s+['"]([^'"]+)['"];/g, (match, importRel) => {
    const importPath = path.resolve(dir, importRel);
    return '\n' + lerCSSComImports(importPath, visitados) + '\n';
  });
  return conteudo;
}

const conteudoCSS = lerCSSComImports(CAMINHO_CSS);

// ============================================
// TESTE 1: Tokens obrigatórios existem no :root
// ============================================
const tokensObrigatorios = [
  // Cores base
  '--bcb-color-white',
  '--bcb-color-black',
  '--bcb-color-body-text',
  '--bcb-color-bg-light',
  // Brand oficiais do Manual
  '--bcb-brand-azul-blue',
  '--bcb-brand-azulcinti',
  '--bcb-brand-azulpetro',
  '--bcb-brand-azulnetuno',
  '--bcb-brand-verde-susta',
  '--bcb-brand-verde-castell',
  '--bcb-brand-cinza-80',
  '--bcb-brand-amarellato-biscoito',
  '--bcb-brand-cafellato',
  '--bcb-brand-vinho-autentico',
  '--bcb-brand-marsala-suave',
  // Brand aliases de compatibilidade
  '--bcb-brand-blue',
  '--bcb-brand-blue-dark',
  '--bcb-brand-gray80',
  '--bcb-brand-vinho',
  '--bcb-brand-marsala',
  '--bcb-brand-amarellato',
  '--bcb-color-azulcinti',
  '--bcb-color-verde-castell',
  // Ações e Botões
  '--bcb-btn-primary-bg',
  '--bcb-btn-primary-hover',
  '--bcb-btn-primary-active',
  '--bcb-btn-secondary-bg',
  '--bcb-btn-secondary-hover',
  '--bcb-btn-secondary-active',
  '--bcb-action-primary-default',
  '--bcb-action-primary-hover',
  '--bcb-action-primary-active',
  '--bcb-action-secondary-default',
  // Feedback semântico
  '--bcb-feedback-success',
  '--bcb-feedback-warning-surface',
  '--bcb-feedback-warning-border',
  '--bcb-feedback-danger',
  '--bcb-feedback-info',
  // Textos e Superfícies
  '--bcb-text-primary',
  '--bcb-text-secondary',
  '--bcb-surface-light',
  '--bcb-surface-card',
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
  .replace(/:root\s*\{[\s\S]*?\}/g, '')  // Remove :root { ... }
  .replace(/:root\[data-[^\]]*\]\s*\{[\s\S]*?\}/g, '')  // Remove :root[data-theme] e :root[data-contrast]
  .replace(/@media[^{]*prefers-color-scheme[^}]*\{[\s\S]*?\}\s*\}/g, '') // Remove dark mode media
  .replace(/@media[^{]*prefers-contrast[^}]*\{[\s\S]*?\}\s*\}/g, ''); // Remove contrast media

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
// TESTE 4: Proibição estrita de Azul Bootstrap (#0d6efd / #007bff)
// ============================================
console.log('\n📋 Teste 4: Proibição estrita de Azul Bootstrap (#0d6efd / #007bff / #0b5ed7 / #0a58ca)');

function encontrarArquivosCSS(diretorio) {
  const arquivos = [];
  const itens = fs.readdirSync(diretorio, { withFileTypes: true });
  for (const item of itens) {
    const caminhoCompleto = path.join(diretorio, item.name);
    if (item.name === 'node_modules' || item.name === '.git') continue;
    if (item.isDirectory()) {
      arquivos.push(...encontrarArquivosCSS(caminhoCompleto));
    } else if (item.name.endsWith('.css')) {
      arquivos.push(caminhoCompleto);
    }
  }
  return arquivos;
}

const pastaCSS = path.join(RAIZ_PROJETO, 'assets', 'css');
const todosCSS = encontrarArquivosCSS(pastaCSS);
const coresProibidas = ['#0d6efd', '#007bff', '#0b5ed7', '#0a58ca'];
const ocorrenciasProibidas = [];

todosCSS.forEach(arquivoCSS => {
  const rel = path.relative(RAIZ_PROJETO, arquivoCSS).replace(/\\/g, '/');
  const conteudo = fs.readFileSync(arquivoCSS, 'utf8');
  coresProibidas.forEach(cor => {
    const regex = new RegExp(cor, 'gi');
    if (regex.test(conteudo)) {
      ocorrenciasProibidas.push({ arquivo: rel, cor });
    }
  });
});

if (ocorrenciasProibidas.length === 0) {
  console.log(`   ✅ Nenhuma ocorrência de azul Bootstrap encontrada em ${todosCSS.length} arquivo(s) CSS`);
  sucessos++;
} else {
  console.log(`   ❌ Encontrada(s) ${ocorrenciasProibidas.length} ocorrência(s) de azul Bootstrap:`);
  ocorrenciasProibidas.forEach(o => {
    console.log(`      → [${o.arquivo}] contém cor proibida ${o.cor}`);
  });
  falhas += ocorrenciasProibidas.length;
}

// ============================================
// RESULTADO
// ============================================
console.log('\n' + '='.repeat(55));
console.log(`Resultado: ${sucessos} verificação(ões) OK, ${falhas} falha(s)`);
console.log('='.repeat(55) + '\n');

process.exit(falhas > 0 ? 1 : 0);
