#!/usr/bin/env node
/**
 * BCB Design System — Testes de Integridade HTML
 * Valida estrutura semântica, acessibilidade básica e conformidade e-Mag.
 * Uso: node tests/html/html-integrity.test.js
 */

const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..', '..');

let falhas = 0;
let sucessos = 0;
let avisos = 0;

console.log('\n📄 BCB Design System — Integridade HTML (e-Mag / WCAG)');
console.log('='.repeat(60));

// Encontrar todos os HTML do projeto
function encontrarHTML(diretorio) {
  const arquivos = [];
  const itens = fs.readdirSync(diretorio, { withFileTypes: true });
  for (const item of itens) {
    const caminhoCompleto = path.join(diretorio, item.name);
    if (['node_modules', '.git', '.docs-ia', '.agent', 'dist'].includes(item.name)) continue;
    if (item.isDirectory()) {
      arquivos.push(...encontrarHTML(caminhoCompleto));
    } else if (item.name.endsWith('.html')) {
      arquivos.push(caminhoCompleto);
    }
  }
  return arquivos;
}

const arquivosHTML = encontrarHTML(RAIZ_PROJETO);
console.log(`\nEncontrados ${arquivosHTML.length} arquivo(s) HTML\n`);

for (const arquivo of arquivosHTML) {
  const nomeRelativo = path.relative(RAIZ_PROJETO, arquivo).replace(/\\/g, '/');
  const conteudo = fs.readFileSync(arquivo, 'utf8');
  const problemas = [];
  const alertas = [];

  const ehHarness = path.basename(arquivo).startsWith('_');
  const ehPrototipo = nomeRelativo.startsWith('prototipos/') && !ehHarness;
  const ehDocumentoCompleto = conteudo.includes('<html') || conteudo.toLowerCase().includes('<!doctype');

  // TESTE 1: lang="pt-BR" presente (em documentos completos de documentação e portal)
  if (ehDocumentoCompleto && !conteudo.includes('lang="pt-BR"') && !conteudo.includes("lang='pt-BR'")) {
    problemas.push('Atributo lang="pt-BR" ausente no <html>');
  }

  // TESTE 2: Meta charset (em documentos completos)
  if (ehDocumentoCompleto && !conteudo.toLowerCase().includes('charset="utf-8"') && 
      !conteudo.toLowerCase().includes("charset='utf-8'") &&
      !conteudo.toLowerCase().includes('charset=utf-8')) {
    problemas.push('Meta charset UTF-8 ausente');
  }

  // TESTE 3: Meta viewport (em documentos completos)
  if (ehDocumentoCompleto && !conteudo.includes('viewport')) {
    problemas.push('Meta viewport ausente (responsividade)');
  }

  // TESTE 4: H1 único obrigatório (e-Mag 3.1)
  const h1Matches = conteudo.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length !== 1) {
    problemas.push(`Quantidade inválida de <h1> (${h1Matches.length}) — e-Mag exige exatamente um H1 por página`);
  }

  // TESTE 5: Imagens sem alt
  const imgSemAlt = conteudo.match(/<img(?![^>]*alt=)[^>]*>/gi) || [];
  if (imgSemAlt.length > 0) {
    problemas.push(`${imgSemAlt.length} imagem(ns) sem atributo alt`);
  }

  // TESTE 6: Links "clique aqui" (WCAG 2.4.4)
  const linksProibidos = conteudo.match(/>\s*(clique aqui|saiba mais|leia mais|mais)\s*</gi) || [];
  if (linksProibidos.length > 0) {
    problemas.push(`${linksProibidos.length} link(s) com texto genérico proibido ("clique aqui", "saiba mais")`);
  }

  // TESTE 7: DOCTYPE (em documentos completos)
  if (ehDocumentoCompleto && !conteudo.trim().toLowerCase().startsWith('<!doctype html>')) {
    alertas.push('DOCTYPE HTML5 ausente ou não é a primeira linha');
  }

  // TESTE 8: Title tag (em documentos completos)
  if (ehDocumentoCompleto && !conteudo.includes('<title>') && !conteudo.includes('<title ')) {
    alertas.push('Tag <title> ausente');
  }

  // TESTE 9: Ícones decorativos sem aria-hidden
  const iconesSemAria = conteudo.match(/<(i|span)[^>]*class="[^"]*material-icons[^"]*"(?![^>]*aria-hidden)[^>]*>/gi) || [];
  if (iconesSemAria.length > 0) {
    alertas.push(`${iconesSemAria.length} ícone(s) Material Icons potencialmente sem aria-hidden="true"`);
  }

  // TESTE 10: Tabelas de dados sem <caption> (WCAG 1.3.1)
  const tabelasSemCaption = (conteudo.match(/<table[\s>]/gi) || []).length;
  const captions = (conteudo.match(/<caption[\s>]/gi) || []).length;
  if (tabelasSemCaption > captions) {
    alertas.push(`${tabelasSemCaption - captions} tabela(s) sem tag <caption>`);
  }

  // TESTE 11: Links target="_blank" sem rel="noopener noreferrer"
  const linksBlankSemRel = conteudo.match(/<a[^>]*target="_blank"(?![^>]*rel=)[^>]*>/gi) || [];
  if (linksBlankSemRel.length > 0) {
    problemas.push(`${linksBlankSemRel.length} link(s) com target="_blank" sem rel="noopener noreferrer"`);
  }

  // TESTE 12: Proibição de casca fixa do portal e validação do padrão autônomo nos protótipos
  if (ehPrototipo) {
    const conteudoSemComentarios = conteudo.replace(/<!--[\s\S]*?-->/g, '');

    // 12.1 Proibição estrita de elementos fixos do portal institucional
    if (conteudoSemComentarios.includes('id="barra-brasil"') || conteudoSemComentarios.includes("id='barra-brasil'")) {
      problemas.push('Barra Brasil (#barra-brasil) presente em protótipo — cascas externas são providas pelo portal');
    }
    if (conteudoSemComentarios.match(/<header[\s>]/gi)) {
      problemas.push('Tag <header> presente em protótipo — protótipos devem focar no miolo semântico');
    }
    const tagsFooter = conteudoSemComentarios.match(/<footer[\s>]/gi) || [];
    if (tagsFooter.length > 0) {
      problemas.push('Tag <footer> de rodapé presente em protótipo — protótipos devem focar no miolo semântico e utilizar <cite class="blockquote-footer"> para citações');
    }
    if (conteudoSemComentarios.includes('breadcrumb') || conteudoSemComentarios.match(/<nav[^>]*aria-label=["'][^"']*(?:trilha|breadcrumb)/gi)) {
      problemas.push('Breadcrumb presente em protótipo — trilhas de navegação são providas pelo portal');
    }

    // 12.2 Validação da casca técnica autônoma mínima
    if (!conteudo.trim().toLowerCase().startsWith('<!doctype html>')) {
      problemas.push('Tag <!DOCTYPE html> ausente no início do protótipo autônomo.');
    }
    if (!conteudo.includes('bcb-style.css')) {
      problemas.push('Folha de estilos bcb-style.css ausente no protótipo autônomo.');
    }
    if (!conteudo.includes('bcb-ui.js')) {
      problemas.push('Script oficial bcb-ui.js ausente no protótipo autônomo.');
    }
    if (!conteudo.includes('id="conteudo-principal"')) {
      problemas.push('Container <main id="conteudo-principal"> ausente no protótipo autônomo.');
    }
  }

  // TESTE 13: Validação da estrutura de navegação de tokens.html
  if (nomeRelativo === 'pages/tokens.html') {
    if (!conteudo.includes('class="ds-sidebar"') && !conteudo.includes("class='ds-sidebar'")) {
      problemas.push('tokens.html deve conter a sidebar de navegação (.ds-sidebar)');
    }
    if (!conteudo.includes('id="ds-sidebar-nav"')) {
      problemas.push('tokens.html deve identificar a barra de navegação com id="ds-sidebar-nav"');
    }
    if (!conteudo.includes('id="z-index"')) {
      problemas.push('tokens.html deve conter a seção dedicada de Z-Index (#z-index)');
    }
    if (!conteudo.includes('id="sombras"') || !conteudo.includes('id="bordas"')) {
      problemas.push('tokens.html deve conter as seções separadas de Sombras (#sombras) e Bordas (#bordas)');
    }
    if (!conteudo.includes('id="btnToggleSidebar"')) {
      problemas.push('tokens.html deve conter botão responsivo mobile (#btnToggleSidebar)');
    }
  }

  // TESTE 14: Validação da estrutura de navegação e componentes em components.html
  if (nomeRelativo === 'pages/components.html') {
    if (!conteudo.includes('class="ds-sidebar"') && !conteudo.includes("class='ds-sidebar'")) {
      problemas.push('components.html deve conter a sidebar de navegação (.ds-sidebar)');
    }
    if (!conteudo.includes('id="ds-sidebar-nav"')) {
      problemas.push('components.html deve identificar a barra de navegação com id="ds-sidebar-nav"');
    }
    if (!conteudo.includes('id="sidebarSearchInput"')) {
      problemas.push('components.html deve conter o campo de busca (#sidebarSearchInput)');
    }
    if (!conteudo.includes('id="categoryFilterGroup"')) {
      problemas.push('components.html deve conter os botões de filtro por categoria (#categoryFilterGroup)');
    }
    if (!conteudo.includes('id="btnToggleSidebar"')) {
      problemas.push('components.html deve conter botão responsivo mobile (#btnToggleSidebar)');
    }
    const novasSecoes = [
      'molecula-breadcrumbs',
      'molecula-kpi-card',
      'molecula-page-toolbar',
      'molecula-quote',
      'molecula-alert'
    ];
    novasSecoes.forEach(secId => {
      if (!conteudo.includes(`id="${secId}"`)) {
        problemas.push(`components.html deve conter a nova seção (#${secId})`);
      }
    });
    if (!conteudo.includes('btn-copy-css')) {
      problemas.push('components.html deve conter botões de cópia de classes CSS (.btn-copy-css)');
    }
    if (!conteudo.includes('ds-state-pills')) {
      problemas.push('components.html deve conter seletores de visualização de estados (.ds-state-pills)');
    }
  }

  // Reportar resultados
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

console.log('\n' + '='.repeat(60));
console.log(`Resultado: ${sucessos} OK, ${falhas} falha(s), ${avisos} aviso(s)`);
console.log('='.repeat(60) + '\n');

process.exit(falhas > 0 ? 1 : 0);
