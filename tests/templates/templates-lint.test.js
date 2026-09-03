#!/usr/bin/env node
/**
 * BCB Design System — Linter de Protótipos, Modularidade de Componentes e Acessibilidade
 * Valida a conformidade arquitetural, modularidade de componentes e acessibilidade (e-MAG / WCAG)
 * em todos os protótipos de interface e páginas HTML geradas pelo ecossistema.
 *
 * Uso: node tests/templates/templates-lint.test.js
 */

const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..', '..');

let falhas = 0;
let sucessos = 0;
let avisos = 0;

console.log('\n🧹 BCB Design System — Linter de Protótipos, Modularidade e Acessibilidade');
console.log('='.repeat(75));

// Descobrir todos os arquivos HTML do projeto
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
console.log(`Auditando conformidade modular de ${arquivosHTML.length} arquivo(s) HTML...\n`);

for (const arquivo of arquivosHTML) {
  const nomeRelativo = path.relative(RAIZ_PROJETO, arquivo).replace(/\\/g, '/');
  const conteudo = fs.readFileSync(arquivo, 'utf8');
  const problemas = [];
  const alertas = [];
  const ehPrototipo = nomeRelativo.startsWith('templates/');

  // 1. INTEGRIDADE DE ESTILOS E TOKENS OFICIAIS
  if (!conteudo.includes('bcb-style.css')) {
    problemas.push('Folha de estilo oficial bcb-style.css não importada.');
  }

  // Proibir cores hexadecimais arbitrárias inline em protótipos
  if (ehPrototipo) {
    const styleHexMatches = conteudo.match(/style=["'][^"']*#[0-9a-fA-F]{3,8}[^"']*["']/gi) || [];
    const hexNaoAutorizados = styleHexMatches.filter(s => !s.includes('#7F7F7F'));
    if (hexNaoAutorizados.length > 0) {
      problemas.push(`${hexNaoAutorizados.length} cor(es) hexadecimal(is) arbitrária(s) inline detectada(s). Utilize variáveis CSS do Design System.`);
    }
  }

  // 2. ACESSIBILIDADE ESTRUTURAL E SEMÂNTICA (e-MAG 3.1 / WCAG 2.2 AA)
  // 2.1 Rigorosamente 1 tag <h1> por página
  const totalH1 = (conteudo.match(/<h1[\s>]/gi) || []).length;
  if (totalH1 !== 1) {
    problemas.push(`Quantidade inválida de <h1> (${totalH1}) — e-Mag 3.1 exige rigorosamente 1 H1 por página.`);
  }

  // 2.2 Proibição de textos de link genéricos (WCAG 2.4.4)
  const linksProibidos = conteudo.match(/>\s*(clique aqui|saiba mais|leia mais|mais)\s*</gi) || [];
  if (linksProibidos.length > 0) {
    problemas.push(`${linksProibidos.length} link(s) com texto não descritivo proibido ("clique aqui", "saiba mais", "leia mais").`);
  }

  // 2.3 Ícones decorativos com aria-hidden="true"
  const tagsIcone = conteudo.match(/<(?:span|i)[^>]*class=["'][^"']*(?:material-icons|material-symbols)[^"']*["'][^>]*>/gi) || [];
  const iconesSemAria = tagsIcone.filter(tag => !tag.includes('aria-hidden="true"') && !tag.includes("aria-hidden='true'") && !tag.includes('aria-label='));
  if (iconesSemAria.length > 0) {
    alertas.push(`${iconesSemAria.length} ícone(s) decorativo(s) potencialmente sem aria-hidden="true".`);
  }

  // 2.4 Tabelas de dados devem conter elemento <caption>
  const totalTabelas = (conteudo.match(/<table[\s>]/gi) || []).length;
  const totalCaptions = (conteudo.match(/<caption[\s>]/gi) || []).length;
  if (totalTabelas > totalCaptions) {
    alertas.push(`${totalTabelas - totalCaptions} tabela(s) sem elemento <caption> para leitores de tela.`);
  }

  // 2.5 Imagens devem possuir atributo alt
  const totalImagens = (conteudo.match(/<img[\s>]/gi) || []).length;
  const totalImagensAlt = (conteudo.match(/<img[^>]*alt=["'][^"']*["']/gi) || []).length;
  if (totalImagens > totalImagensAlt) {
    problemas.push(`${totalImagens - totalImagensAlt} imagem(ns) sem atributo alt obrigatório.`);
  }

  // 3. MODULARIDADE E RESTRIÇÃO AO MIOLO DA INTERFACE (PROTÓTIPOS)
  if (ehPrototipo) {
    // 3.1 Exatamente 1 elemento <main> identificado como conteúdo principal
    const totalMain = (conteudo.match(/<main[\s>]/gi) || []).length;
    if (totalMain !== 1) {
      problemas.push(`Quantidade inválida de tags <main> (${totalMain}) — protótipos devem conter exatamente 1 tag <main>.`);
    }
    if (!conteudo.includes('id="conteudo-principal"') && !conteudo.includes("id='conteudo-principal'")) {
      problemas.push('Elemento <main> deve obrigatoriamente possuir id="conteudo-principal" para acessibilidade.');
    }

    // 3.2 Proibição estrita de casca externa e elementos redundantes
    if (conteudo.includes('id="barra-brasil"') || conteudo.includes("id='barra-brasil'")) {
      problemas.push('Barra Brasil (#barra-brasil) detectada — cascas externas são providas pelo portal.');
    }
    if (conteudo.match(/<header[\s>]/gi)) {
      problemas.push('Tag <header> detectada em protótipo — a prototipagem foca exclusivamente no miolo semântico da página.');
    }
    const footersNaoCitacao = conteudo.match(/<footer(?![^>]*blockquote-footer)[^>]*>/gi) || [];
    if (footersNaoCitacao.length > 0) {
      problemas.push('Tag <footer> detectada em protótipo — rodapés globais são providos pelo portal.');
    }
    if (conteudo.match(/<nav[^>]*class=["'][^"']*govbr[^"']*["']/gi)) {
      problemas.push('Elemento <nav class="govbr..."> detectado em protótipo.');
    }
    if (conteudo.match(/<nav[^>]*aria-label=["'][^"']*(?:breadcrumb|trilha)[^"']*["']/gi) ||
        conteudo.match(/class=["'][^"']*(?:bcb-breadcrumb|breadcrumb-bcb|breadcrumb)[^"']*["']/gi)) {
      problemas.push('Breadcrumb detectado em protótipo — trilhas de navegação são providas pela casca do CMS.');
    }

    // 3.3 Proibição de tags customizadas órfãs/obsoletas
    const tagsOrfas = conteudo.match(/<(?:bcb-accordion-page|bcb-callout|bcb-citacao|bcb-olho|listalinks)[\s>]/gi) || [];
    if (tagsOrfas.length > 0) {
      problemas.push(`${tagsOrfas.length} tag(s) obsoleta(s) detectada(s). Utilize componentes HTML5 nativos do BCB Design System.`);
    }

    // 3.4 Modularidade de Grid Flexível 12 Colunas
    if (!conteudo.includes('bcb-row') && !conteudo.includes('row')) {
      problemas.push('Protótipo não utiliza a estrutura de linhas do grid modular (.bcb-row).');
    }
    const temColunas = conteudo.match(/(?:bcb-col-|col-(?:12|md-|lg-|sm-))/);
    if (!temColunas) {
      problemas.push('Protótipo não utiliza colunas modulares proporcionais do grid (.bcb-col-*).');
    }
  }

  // Consolidação de resultados por arquivo
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

console.log('\n' + '='.repeat(75));
console.log(`Resultado do Lint: ${sucessos} aprovado(s), ${falhas} falha(s), ${avisos} aviso(s)`);
console.log('='.repeat(75) + '\n');

process.exit(falhas > 0 ? 1 : 0);
