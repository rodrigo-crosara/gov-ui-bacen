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

function auditoriaEstaticaAcessibilidade(caminhoArquivo) {
  const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
  const problemas = [];

  // 1. Tag html deve ter lang="pt-BR"
  if (!conteudo.match(/<html[^>]*lang=["']pt-BR["']/i)) {
    problemas.push('Elemento <html> deve possuir lang="pt-BR" (WCAG 3.1.1).');
  }

  // 2. Head deve conter <meta name="viewport">
  if (!conteudo.includes('name="viewport"')) {
    problemas.push('Meta viewport ausente para responsividade (WCAG 1.4.4 / 1.4.10).');
  }

  // 3. Imagens devem conter atributo alt
  const tagsImg = conteudo.match(/<img[^>]*>/gi) || [];
  tagsImg.forEach(img => {
    if (!img.includes('alt=')) {
      problemas.push('Elemento <img> sem atributo alt (WCAG 1.1.1 Non-text Content).');
    }
  });

  // 4. Elemento main obrigatório com id="conteudo-principal"
  if (!conteudo.includes('<main') || !conteudo.includes('id="conteudo-principal"')) {
    problemas.push('Elemento <main id="conteudo-principal"> obrigatório para skip link e navegação de marcos (WCAG 2.4.1).');
  }

  // 5. Exatamente um H1 por documento
  const totalH1 = (conteudo.match(/<h1[\s>]/gi) || []).length;
  if (totalH1 !== 1) {
    problemas.push(`Documento possui ${totalH1} tag(s) <h1> — exigido rigorosamente 1 H1 (WCAG 1.3.1 / e-MAG 3.1).`);
  }

  // 6. Tabelas devem possuir <caption>
  const totalTabelas = (conteudo.match(/<table[\s>]/gi) || []).length;
  const totalCaptions = (conteudo.match(/<caption[\s>]/gi) || []).length;
  if (totalTabelas > totalCaptions) {
    problemas.push(`${totalTabelas - totalCaptions} tabela(s) sem <caption> acessível (WCAG 1.3.1).`);
  }

  return problemas;
}

for (const pagina of PAGINAS) {
  const caminhoArquivo = path.join(RAIZ_PROJETO, pagina.replace(/^\//, ''));
  const url = `${SERVIDOR_BASE}${pagina}`;
  const nomeRelativo = pagina;

  let pa11yExecutado = false;

  try {
    const resultado = execSync(
      `npx pa11y --standard WCAG2AA --root-element "main" --reporter json "${url}"`,
      { encoding: 'utf8', timeout: 15000, stdio: ['pipe', 'pipe', 'pipe'] }
    );

    const problemas = JSON.parse(resultado);
    pa11yExecutado = true;

    if (Array.isArray(problemas) && problemas.length > 0) {
      console.log(`\n❌ ${nomeRelativo} — ${problemas.length} problema(s):`);
      problemas.forEach((p, i) => {
        console.log(`   ${i + 1}. [${p.type}] ${p.message}`);
        if (p.selector) console.log(`      Seletor: ${p.selector}`);
      });
      falhas++;
    } else {
      console.log(`✅ ${nomeRelativo} — Aprovado em acessibilidade (pa11y WCAG2AA)`);
      sucessos++;
    }
  } catch (erro) {
    // Se pa11y retornou JSON de violação
    if (erro.stdout) {
      try {
        const problemas = JSON.parse(erro.stdout);
        if (Array.isArray(problemas) && problemas.length > 0) {
          pa11yExecutado = true;
          console.log(`\n❌ ${nomeRelativo} — ${problemas.length} problema(s):`);
          problemas.slice(0, 5).forEach((p, i) => {
            console.log(`   ${i + 1}. [${p.type}] ${p.message}`);
          });
          falhas++;
        }
      } catch {}
    }

    // Se pa11y não estava disponível ou servidor 8080 desligado, executa a auditoria estática WCAG 2.1 AA
    if (!pa11yExecutado) {
      const problemasEstaticos = auditoriaEstaticaAcessibilidade(caminhoArquivo);
      if (problemasEstaticos.length > 0) {
        console.log(`\n❌ ${nomeRelativo} — ${problemasEstaticos.length} problema(s) (Auditoria Estática WCAG 2.1 AA):`);
        problemasEstaticos.forEach((p, i) => console.log(`   ${i + 1}. ${p}`));
        falhas++;
      } else {
        console.log(`✅ ${nomeRelativo} — Aprovado em acessibilidade (Auditoria Estática WCAG 2.1 AA)`);
        sucessos++;
      }
    }
  }
}

console.log('\n' + '='.repeat(70));
console.log(`Resultado da Acessibilidade: ${sucessos} aprovado(s), ${falhas} com problemas`);
console.log('='.repeat(70) + '\n');

process.exit(falhas > 0 ? 1 : 0);
