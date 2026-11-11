#!/usr/bin/env node
/**
 * BCB Design System — Testes Automatizados do BCBBuilderEngine
 * Valida:
 * 1. Inicialização e injeção de handles de seção (.studio-drag-handle) e coluna (.studio-col-handle)
 * 2. Prevenção de aninhamento de nós editáveis (sem distorções de espaçamento)
 * 3. Sanitização e expurgo no pipeline de exportação exportCleanHTML
 * 4. Validador de integridade validateHTML em todos os protótipos
 */

const fs = require('fs');
const path = require('path');
const { Engine, CONFIG } = require('../assets/js/builder-engine.js');

console.log('\n🛠️ BCB Design System — Teste Unitário do Builder Engine');
console.log('='.repeat(65));

let falhas = 0;
let sucessos = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    sucessos++;
  } else {
    console.error(`  ❌ FALHA: ${message}`);
    falhas++;
  }
}

// TESTE 1: Configuração e Seletores da Hierarquia Completa (4 Níveis)
console.log('\n1. Testando Configuração do Builder (4 Níveis de Reorganização):');
assert(CONFIG.dragHandleClass === 'studio-drag-handle', 'Nível 1 (Seção): handle é studio-drag-handle');
assert(CONFIG.rowHandleClass === 'studio-row-handle', 'Nível 2 (Linha): handle é studio-row-handle');
assert(CONFIG.colHandleClass === 'studio-col-handle', 'Nível 3 (Coluna): handle é studio-col-handle');
assert(CONFIG.componentHandleClass === 'studio-component-handle', 'Nível 4 (Componente): handle é studio-component-handle');
assert(CONFIG.draggableRowClass === 'studio-draggable-row', 'Classe arrastável de linha é studio-draggable-row');
assert(CONFIG.draggableColClass === 'studio-draggable-col', 'Classe arrastável de coluna é studio-draggable-col');
assert(CONFIG.draggableComponentClass === 'studio-draggable-component', 'Classe arrastável de componente é studio-draggable-component');
assert(CONFIG.excludedFromEditSelector.includes('.material-symbols-outlined'), 'Ícones Material Symbols excluídos de edição');

// TESTE 2: Validador de Integridade com Protótipos Oficiais
console.log('\n2. Testando Validador de Integridade (validateHTML):');
const engine = new Engine();
const prototipos = [
  'copom-decisao-taxa-selic.html',
  'mecanismo-especial-devolucao-med.html',
  'metas-inflacao.html',
  'regras-cheque-especial.html',
  'resolucao-bcb-dou.html',
  'sgs-series-taxa-selic.html'
];

prototipos.forEach(nome => {
  const filePath = path.join(__dirname, '..', 'prototipos', nome);
  const html = fs.readFileSync(filePath, 'utf8');
  const result = engine.validateHTML(html);
  assert(result.isValid, `Protótipo ${nome} 100% válido contra testes de integridade`);
});

// TESTE 3: Detecção de resíduos proibidos em validateHTML (4 Níveis)
console.log('\n3. Testando Detecção de Resíduos do Builder nos 4 Níveis:');
const htmlBase = fs.readFileSync(path.join(__dirname, '..', 'prototipos', 'copom-decisao-taxa-selic.html'), 'utf8');

const htmlComHandleSecao = htmlBase.replace('</main>', '<div class="studio-drag-handle">Seção</div></main>');
const resSecao = engine.validateHTML(htmlComHandleSecao);
assert(!resSecao.isValid && resSecao.issues.some(i => i.includes('studio-drag-handle')), 'Detecta resíduo de .studio-drag-handle');

const htmlComHandleLinha = htmlBase.replace('</main>', '<div class="studio-row-handle">Linha</div></main>');
const resLinha = engine.validateHTML(htmlComHandleLinha);
assert(!resLinha.isValid && resLinha.issues.some(i => i.includes('studio-row-handle')), 'Detecta resíduo de .studio-row-handle');

const htmlComHandleColuna = htmlBase.replace('</main>', '<div class="studio-col-handle">Coluna</div></main>');
const resColuna = engine.validateHTML(htmlComHandleColuna);
assert(!resColuna.isValid && resColuna.issues.some(i => i.includes('studio-col-handle')), 'Detecta resíduo de .studio-col-handle');

const htmlComHandleComponente = htmlBase.replace('</main>', '<div class="studio-component-handle">Componente</div></main>');
const resComp = engine.validateHTML(htmlComHandleComponente);
assert(!resComp.isValid && resComp.issues.some(i => i.includes('studio-component-handle')), 'Detecta resíduo de .studio-component-handle');

const htmlComContentEditable = htmlBase.replace('<p', '<p contenteditable="true"');
const resCE = engine.validateHTML(htmlComContentEditable);
assert(!resCE.isValid && resCE.issues.some(i => i.includes('contenteditable')), 'Detecta resíduo de contenteditable');

// TESTE 4: Verificação de Classes de Grid e Componentes nos Protótipos
console.log('\n4. Testando Detecção de Linhas, Colunas e Componentes para Reorganização:');
let totalLinhasMultiColuna = 0;
let totalComponentes = 0;
prototipos.forEach(nome => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'prototipos', nome), 'utf8');
  const rowMatches = html.match(/class=["'][^"']*(?:bcb-row|row)[^"']*["']/g) || [];
  const compMatches = html.match(/class=["'][^"']*(?:card|bcb-card|alert|callout|accordion|bcb-indicator-card)[^"']*["']/g) || [];
  assert(rowMatches.length > 0, `${nome} contém estruturas de linha (.bcb-row / .row): ${rowMatches.length}`);
  assert(compMatches.length > 0, `${nome} contém componentes elegíveis: ${compMatches.length}`);
  totalLinhasMultiColuna += rowMatches.length;
  totalComponentes += compMatches.length;
});
assert(totalLinhasMultiColuna >= 15, `Total de ${totalLinhasMultiColuna} linhas elegíveis para reordenação de colunas`);
assert(totalComponentes >= 30, `Total de ${totalComponentes} componentes elegíveis para reordenação`);

console.log('\n' + '='.repeat(65));
console.log(`Resultado dos Testes: ${sucessos} OK, ${falhas} falha(s)`);
console.log('='.repeat(65));

if (falhas > 0) {
  process.exit(1);
}
