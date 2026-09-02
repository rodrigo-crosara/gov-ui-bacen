#!/usr/bin/env node
/**
 * BCB Design System — Testes de Acessibilidade (WCAG 2.1 AA)
 * Roda pa11y contra cada template HTML do projeto.
 * Uso: node tests/a11y/a11y-runner.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..', '..');
const SERVIDOR_BASE = process.env.BASE_URL || 'http://localhost:8080';

// Páginas para testar
const PAGINAS = [
  '/index.html',
  '/templates/template-servico.html',
  '/templates/template-noticia.html',
  '/templates/drex.html',
  '/templates/desastres-naturais.html',
  '/templates/planejando-a-aposentadoria.html',
  '/templates/componente-callout.html',
  '/pages/tokens.html',
  '/pages/changelog.html',
];

let falhas = 0;
let sucessos = 0;

console.log('\n🔍 BCB Design System — Auditoria de Acessibilidade (WCAG 2.1 AA)');
console.log('='.repeat(65));

for (const pagina of PAGINAS) {
  const url = `${SERVIDOR_BASE}${pagina}`;
  const nomeArquivo = path.basename(pagina);

  try {
    const resultado = execSync(
      `npx pa11y --standard WCAG2AA --reporter json "${url}"`,
      { encoding: 'utf8', timeout: 30000, stdio: ['pipe', 'pipe', 'pipe'] }
    );

    const problemas = JSON.parse(resultado);

    if (Array.isArray(problemas) && problemas.length > 0) {
      console.log(`\n❌ ${nomeArquivo} — ${problemas.length} problema(s):`);
      problemas.forEach((p, i) => {
        console.log(`   ${i + 1}. [${p.type}] ${p.message}`);
        if (p.selector) console.log(`      Seletor: ${p.selector}`);
      });
      falhas++;
    } else {
      console.log(`✅ ${nomeArquivo} — Sem problemas de acessibilidade`);
      sucessos++;
    }
  } catch (erro) {
    // pa11y retorna exit code 2 quando encontra problemas
    if (erro.stdout) {
      try {
        const problemas = JSON.parse(erro.stdout);
        if (Array.isArray(problemas) && problemas.length > 0) {
          console.log(`\n⚠️  ${nomeArquivo} — ${problemas.length} problema(s):`);
          problemas.slice(0, 5).forEach((p, i) => {
            console.log(`   ${i + 1}. [${p.type}] ${p.message}`);
          });
          if (problemas.length > 5) {
            console.log(`   ... e mais ${problemas.length - 5} problema(s)`);
          }
          falhas++;
        }
      } catch {
        console.log(`⚠️  ${nomeArquivo} — Não foi possível conectar (servidor ativo?)`);
        falhas++;
      }
    } else {
      console.log(`⚠️  ${nomeArquivo} — Erro: ${erro.message.split('\n')[0]}`);
    }
  }
}

console.log('\n' + '='.repeat(65));
console.log(`Resultado: ${sucessos} aprovado(s), ${falhas} com problemas`);
console.log('='.repeat(65) + '\n');

process.exit(falhas > 0 ? 1 : 0);
