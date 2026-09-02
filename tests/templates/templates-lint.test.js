#!/usr/bin/env node
/**
 * BCB Design System — Linter e Validador de Templates e Componentes
 * Valida conformidade estrutural, integridade de tokens e regras de acessibilidade
 * em todos os templates e páginas HTML geradas por IA.
 * Uso: node tests/templates/templates-lint.test.js
 */

const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..', '..');

let falhas = 0;
let sucessos = 0;
let avisos = 0;

console.log('\n🧹 BCB Design System — Linter de Templates e Integridade de Componentes');
console.log('='.repeat(70));

// Descobrir todos os arquivos HTML
function encontrarHTML(diretorio) {
  const arquivos = [];
  const itens = fs.readdirSync(diretorio, { withFileTypes: true });
  for (const item of itens) {
    const caminhoCompleto = path.join(diretorio, item.name);
    if (['node_modules', '.git', '.docs-ia', '.agent'].includes(item.name)) continue;
    if (item.isDirectory()) {
      arquivos.push(...encontrarHTML(caminhoCompleto));
    } else if (item.name.endsWith('.html')) {
      arquivos.push(caminhoCompleto);
    }
  }
  return arquivos;
}

const arquivosHTML = encontrarHTML(RAIZ_PROJETO);
console.log(`Auditando ${arquivosHTML.length} arquivo(s) HTML...\n`);

for (const arquivo of arquivosHTML) {
  const nomeRelativo = path.relative(RAIZ_PROJETO, arquivo).replace(/\\/g, '/');
  const conteudo = fs.readFileSync(arquivo, 'utf8');
  const problemas = [];
  const alertas = [];

  // REGRA 1: Proibir cores inline arbitrárias fora da documentação de paleta/amostras
  if (nomeRelativo.startsWith('templates/')) {
    const styleHexMatches = conteudo.match(/style=["'][^"']*#[0-9a-fA-F]{3,8}[^"']*["']/gi) || [];
    const hexNaoAutorizados = styleHexMatches.filter(s => !s.includes('#7F7F7F'));
    if (hexNaoAutorizados.length > 0) {
      problemas.push(`${hexNaoAutorizados.length} estilo(s) inline com cor hexadecimal hardcoded nos templates.`);
    }
  }

  // REGRA 2: Links genéricos proibidos (WCAG 2.4.4)
  const linksProibidos = conteudo.match(/>\s*(clique aqui|saiba mais|leia mais|mais)\s*</gi) || [];
  if (linksProibidos.length > 0) {
    problemas.push(`${linksProibidos.length} link(s) com texto proibido ("clique aqui", "saiba mais", "leia mais").`);
  }

  // REGRA 3: Ícones Material Icons devem ter aria-hidden="true" se forem decorativos
  const tagsIcone = conteudo.match(/<(?:span|i)[^>]*class=["'][^"']*material-icons[^"']*["'][^>]*>/gi) || [];
  const iconesSemAria = tagsIcone.filter(tag => !tag.includes('aria-hidden="true"') && !tag.includes("aria-hidden='true'") && !tag.includes('aria-label='));
  if (iconesSemAria.length > 0) {
    alertas.push(`${iconesSemAria.length} ícone(s) Material Icons potencialmente sem aria-hidden="true".`);
  }

  // REGRA 4: Tabelas de dados devem conter <caption>
  const totalTabelas = (conteudo.match(/<table[\s>]/gi) || []).length;
  const totalCaptions = (conteudo.match(/<caption[\s>]/gi) || []).length;
  if (totalTabelas > totalCaptions) {
    alertas.push(`${totalTabelas - totalCaptions} tabela(s) sem elemento <caption>.`);
  }

  // REGRA 5: Exatamente um H1 por página (e-MAG 3.1)
  const totalH1 = (conteudo.match(/<h1[\s>]/gi) || []).length;
  if (totalH1 !== 1) {
    problemas.push(`Quantidade inválida de <h1> (${totalH1}) — e-Mag 3.1 exige rigorosamente 1 H1 por página.`);
  }

  // REGRA 6: Presença do CSS oficial do BCB
  if (!conteudo.includes('bcb-style.css')) {
    problemas.push('Folha de estilo oficial bcb-style.css não importada.');
  }

  // REGRA 7: Validação Semântica Estrita do Miolo de Conteúdo nos Templates
  if (nomeRelativo.startsWith('templates/')) {
    // 7.1 Deve possuir exatamente um <main>
    const totalMain = (conteudo.match(/<main[\s>]/gi) || []).length;
    if (totalMain !== 1) {
      problemas.push(`Quantidade inválida de tags <main> (${totalMain}) — templates de conteúdo devem possuir exatamente 1 tag <main>.`);
    }

    // 7.2 O <main> deve possuir id="conteudo-principal"
    if (!conteudo.includes('id="conteudo-principal"') && !conteudo.includes("id='conteudo-principal'")) {
      problemas.push('Elemento <main> deve obrigatoriamente possuir id="conteudo-principal" para acessibilidade.');
    }

    // 7.3 Proibição de casca do portal
    if (conteudo.includes('id="barra-brasil"') || conteudo.includes("id='barra-brasil'")) {
      problemas.push('Barra Brasil (#barra-brasil) detectada em template de conteúdo.');
    }
    if (conteudo.match(/<header[\s>]/gi)) {
      problemas.push('Tag <header> detectada em template de conteúdo — templates devem focar exclusivamente no miolo semântico.');
    }
    const footersNaoCitacao = conteudo.match(/<footer(?![^>]*blockquote-footer)[^>]*>/gi) || [];
    if (footersNaoCitacao.length > 0) {
      problemas.push('Tag <footer> detectada em template de conteúdo — templates devem focar exclusivamente no miolo semântico.');
    }
    if (conteudo.match(/<nav[^>]*class=["'][^"']*govbr[^"']*["']/gi)) {
      problemas.push('Elemento <nav class="govbr..."> detectado em template de conteúdo.');
    }

    // 7.4 Proibição rigorosa de Breadcrumbs em templates (providos pelo portal)
    if (conteudo.match(/<nav[^>]*aria-label=["'][^"']*(?:breadcrumb|trilha)[^"']*["']/gi) ||
        conteudo.match(/class=["'][^"']*(?:bcb-breadcrumb|breadcrumb-bcb|breadcrumb)[^"']*["']/gi)) {
      problemas.push('Breadcrumb detectado em template de conteúdo — a trilha de navegação é provida pela casca do portal.');
    }

    // 7.5 Proibição de tags customizadas legadas ou órfãs
    const tagsOrfas = conteudo.match(/<(?:bcb-accordion-page|bcb-callout|bcb-citacao|bcb-olho|listalinks)[\s>]/gi) || [];
    if (tagsOrfas.length > 0) {
      problemas.push(`${tagsOrfas.length} tag(s) customizada(s) órfã(s) detectada(s). Use apenas componentes em HTML5 nativo.`);
    }
  }

  // Relatório do arquivo
  if (problemas.length === 0 && alertas.length === 0) {
    console.log(`✅ ${nomeRelativo}`);
    sucessos++;
  } else {
    if (problemas.length > 0) {
      console.log(`❌ ${nomeRelativo}`);
      problemas.forEach(p => console.log(`   ERRO: ${p}`));
      falhas++;
    } else {
      console.log(`⚠️  ${nomeRelativo}`);
      sucessos++;
    }
    alertas.forEach(a => {
      console.log(`   AVISO: ${a}`);
      avisos++;
    });
  }
}

console.log('\n' + '='.repeat(70));
console.log(`Resultado do Lint: ${sucessos} aprovado(s), ${falhas} falha(s), ${avisos} aviso(s)`);
console.log('='.repeat(70) + '\n');

process.exit(falhas > 0 ? 1 : 0);
