#!/usr/bin/env node
/**
 * BCB Design System — Testes de Acessibilidade (WCAG 2.2 / 2.1 AA)
 * Executa pa11y contra cada página e template HTML do projeto descoberto dinamicamente.
 * Uso: node tests/a11y/a11y-runner.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..', '..');
const SERVIDOR_BASE = process.env.BASE_URL || 'http://localhost:8080';

// Função para descobrir dinamicamente todas as páginas HTML do projeto
function descobrirPaginasHTML(diretorio) {
  const paginas = [];
  const itens = fs.readdirSync(diretorio, { withFileTypes: true });

  for (const item of itens) {
    const caminhoCompleto = path.join(diretorio, item.name);
    if (['node_modules', '.git', '.docs-ia', '.agent'].includes(item.name)) continue;

    if (item.isDirectory()) {
      paginas.push(...descobrirPaginasHTML(caminhoCompleto));
    } else if (item.name.endsWith('.html')) {
      const caminhoRelativo = '/' + path.relative(RAIZ_PROJETO, caminhoCompleto).replace(/\\/g, '/');
      paginas.push(caminhoRelativo);
    }
  }

  return paginas.sort();
}

const PAGINAS = descobrirPaginasHTML(RAIZ_PROJETO);

let falhas = 0;
let sucessos = 0;

console.log('\n🔍 BCB Design System — Auditoria Dinâmica de Acessibilidade (WCAG 2.2 / 2.1 AA)');
console.log('='.repeat(70));
console.log(`Descobertas ${PAGINAS.length} página(s) HTML para auditoria:\n`);

for (const pagina of PAGINAS) {
  const url = `${SERVIDOR_BASE}${pagina}`;
  const nomeRelativo = pagina;

  try {
    const resultado = execSync(
      `npx pa11y --standard WCAG2AA --root-element "main" --reporter json "${url}"`,
      { encoding: 'utf8', timeout: 30000, stdio: ['pipe', 'pipe', 'pipe'] }
    );

    const problemas = JSON.parse(resultado);

    if (Array.isArray(problemas) && problemas.length > 0) {
      console.log(`\n❌ ${nomeRelativo} — ${problemas.length} problema(s):`);
      problemas.forEach((p, i) => {
        console.log(`   ${i + 1}. [${p.type}] ${p.message}`);
        if (p.selector) console.log(`      Seletor: ${p.selector}`);
      });
      falhas++;
    } else {
      console.log(`✅ ${nomeRelativo} — Aprovado em acessibilidade`);
      sucessos++;
    }
  } catch (erro) {
    if (erro.stdout) {
      try {
        const problemas = JSON.parse(erro.stdout);
        if (Array.isArray(problemas) && problemas.length > 0) {
          console.log(`\n⚠️  ${nomeRelativo} — ${problemas.length} problema(s):`);
          problemas.slice(0, 5).forEach((p, i) => {
            console.log(`   ${i + 1}. [${p.type}] ${p.message}`);
          });
          if (problemas.length > 5) {
            console.log(`   ... e mais ${problemas.length - 5} problema(s)`);
          }
          falhas++;
        }
      } catch {
        console.log(`⚠️  ${nomeRelativo} — Não foi possível conectar ao servidor (${SERVIDOR_BASE})`);
        falhas++;
      }
    } else {
      console.log(`⚠️  ${nomeRelativo} — Erro: ${erro.message.split('\n')[0]}`);
    }
  }
}

console.log('\n' + '='.repeat(70));
console.log(`Resultado: ${sucessos} aprovado(s), ${falhas} com problemas`);
console.log('='.repeat(70) + '\n');

process.exit(falhas > 0 ? 1 : 0);
