#!/usr/bin/env node
/**
 * BCB Design System — Linter de Protótipos, Modularidade de Componentes e Acessibilidade
 * Valida a conformidade arquitetural, modularidade de componentes e acessibilidade (e-MAG / WCAG)
 * em todos os protótipos de interface e páginas HTML geradas pelo ecossistema.
 *
 * Uso: node tests/prototipos/prototipos-lint.test.js
 */

const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..', '..');

let falhas = 0;
let sucessos = 0;
let avisos = 0;

console.log('\n🧹 BCB Design System — Linter de Protótipos, Modularidade e Acessibilidade');
console.log('='.repeat(75));

const apenasPrototipos = process.argv.includes('--prototypes') || process.argv.includes('-p');

// Descobrir todos os arquivos HTML do projeto
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

let arquivosHTML = encontrarHTML(RAIZ_PROJETO);
if (apenasPrototipos) {
  arquivosHTML = arquivosHTML.filter(a => {
    const nomeRelativo = path.relative(RAIZ_PROJETO, a).replace(/\\/g, '/');
    return nomeRelativo.startsWith('prototipos/');
  });
  console.log(`[Modo Protótipos] Auditando exclusivamente a pasta prototipos/ (${arquivosHTML.length} arquivo(s))...\n`);
} else {
  console.log(`Auditando conformidade modular de ${arquivosHTML.length} arquivo(s) HTML...\n`);
}

// Coletar todas as classes legítimas do Design System (assets/css/**/*.css)
function coletarClassesCSS(dir, classes = new Set()) {
  if (!fs.existsSync(dir)) return classes;
  const itens = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of itens) {
    const caminho = path.join(dir, item.name);
    if (item.isDirectory()) {
      coletarClassesCSS(caminho, classes);
    } else if (item.name.endsWith('.css')) {
      const conteudo = fs.readFileSync(caminho, 'utf8');
      const matches = conteudo.matchAll(/\.([a-zA-Z0-9_-]+)/g);
      for (const m of matches) {
        classes.add(m[1]);
      }
    }
  }
  return classes;
}

const classesCSS = coletarClassesCSS(path.join(RAIZ_PROJETO, 'assets', 'css'));

// Catálogo de classes autorizadas do Bootstrap 4.6 e padrões oficiais do BCB Design System
const classesPadraoBootstrap = new Set([
  // Layout & Grid
  'container', 'container-fluid', 'row', 'col', 'no-gutters',
  // Display & Flex
  'd-none', 'd-inline', 'd-inline-block', 'd-block', 'd-flex', 'd-inline-flex',
  'd-sm-none', 'd-sm-block', 'd-sm-flex', 'd-md-none', 'd-md-block', 'd-md-flex', 'd-md-inline-flex',
  'd-lg-none', 'd-lg-block', 'd-lg-flex', 'd-xl-none', 'd-xl-block', 'd-xl-flex',
  'flex-row', 'flex-column', 'flex-row-reverse', 'flex-column-reverse', 'flex-wrap', 'flex-nowrap',
  'justify-content-start', 'justify-content-end', 'justify-content-center', 'justify-content-between', 'justify-content-around',
  'align-items-start', 'align-items-end', 'align-items-center', 'align-items-baseline', 'align-items-stretch',
  'align-self-start', 'align-self-end', 'align-self-center', 'align-self-baseline', 'align-self-stretch',
  'align-middle', 'flex-fill', 'flex-grow-0', 'flex-grow-1', 'flex-shrink-0', 'flex-shrink-1',
  // Tipografia & Cores
  'lead', 'small', 'font-weight-normal', 'font-weight-bold', 'font-weight-bolder', 'font-weight-light', 'font-italic',
  'font-size-sm', 'text-left', 'text-right', 'text-center', 'text-justify', 'text-nowrap', 'text-truncate',
  'text-muted', 'text-body', 'text-white', 'text-dark', 'text-primary', 'text-secondary', 'text-success', 'text-danger', 'text-warning', 'text-info',
  'bg-transparent', 'bg-white', 'bg-light', 'bg-dark', 'bg-primary', 'bg-secondary',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  // Botões & Badges
  'btn', 'btn-primary', 'btn-secondary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark', 'btn-link',
  'btn-outline-primary', 'btn-outline-secondary', 'btn-outline-success', 'btn-outline-danger',
  'btn-sm', 'btn-lg', 'btn-block',
  'badge', 'badge-primary', 'badge-secondary', 'badge-success', 'badge-danger', 'badge-warning', 'badge-info', 'badge-light', 'badge-dark', 'badge-pill',
  // Cards & Tabelas
  'card', 'card-body', 'card-header', 'card-footer', 'card-title', 'card-text', 'card-subtitle', 'card-deck', 'card-group',
  'table', 'table-responsive', 'table-bordered', 'table-striped', 'table-hover', 'table-sm', 'thead-light', 'thead-dark', 'thead-primary',
  'table-col-15', 'table-col-20', 'table-col-25', 'table-col-30', 'table-col-40', 'table-col-50',
  // Listas, Bordas & Arredondamentos
  'list-unstyled', 'list-inline', 'list-inline-item', 'list-group', 'list-group-item',
  'border', 'border-0', 'border-top', 'border-bottom', 'border-left', 'border-right',
  'rounded', 'rounded-top', 'rounded-bottom', 'rounded-left', 'rounded-right', 'rounded-circle', 'rounded-pill', 'rounded-0',
  'shadow', 'shadow-sm', 'shadow-lg', 'shadow-none', 'w-100', 'h-100', 'w-75', 'w-50', 'w-25', 'h-75', 'h-50', 'h-25',
  // Formulários & Navegação
  'form-control', 'form-control-sm', 'form-control-lg', 'form-group', 'form-check', 'form-check-input', 'form-check-label',
  'custom-select', 'custom-select-sm', 'custom-select-lg', 'custom-control', 'custom-switch',
  'nav', 'nav-tabs', 'nav-pills', 'nav-link', 'nav-item', 'tab-content', 'tab-pane',
  'breadcrumb', 'breadcrumb-item', 'alert', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info',
  'collapse', 'accordion', 'show', 'active', 'fade', 'collapsed',
  'embed-responsive', 'embed-responsive-16by9', 'embed-responsive-item',
  'blockquote-footer', 'sr-only',
  // Material Icons & Indicadores de Tendência BCB
  'material-symbols-outlined', 'material-icons', 'md-16', 'md-18', 'md-20', 'md-24', 'md-36', 'md-48',
  'up', 'down', 'stable',
  // Estruturas Canônicas de Página BCB
  'bcb-page-title', 'bcb-page-meta', 'bcb-breadcrumb-nav', 'bcb-back-to-top-wrapper', 'bcb-btn-back-to-top',
  'bcb-data-export-buttons', 'bcb-data-export-label', 'bcb-btn-export-icon', 'bcb-citacao-texto'
]);

function isClasseValida(cls) {
  if (classesCSS.has(cls) || classesPadraoBootstrap.has(cls)) return true;
  // Padrões dinâmicos de grid (ex: col-12, col-md-6, col-lg-8, bcb-col-12, etc.)
  if (/^(?:bcb-)?col(?:-(?:sm|md|lg|xl))?(?:-\d+)?$/.test(cls)) return true;
  // Padrões dinâmicos de espaçamento Bootstrap (ex: p-3, mb-0, mt-md-0, pt-md-4, px-2)
  if (/^[mp][trblxy]?(?:-(?:sm|md|lg|xl))?-(?:[0-5]|auto)$/.test(cls)) return true;
  // Padrões dinâmicos de flexbox responsivo Bootstrap (ex: flex-md-row, align-items-md-center, justify-content-lg-between)
  if (/^(?:flex|align-items|justify-content|align-self)(?:-(?:sm|md|lg|xl))?-(?:row|column|row-reverse|column-reverse|wrap|nowrap|start|end|center|between|around|baseline|stretch)$/.test(cls)) return true;
  // Padrões de gap (ex: gap-1, gap-2, gap-3, gap-4)
  if (/^gap-[1-4]$/.test(cls)) return true;
  return false;
}

for (const arquivo of arquivosHTML) {
  const nomeRelativo = path.relative(RAIZ_PROJETO, arquivo).replace(/\\/g, '/');
  const conteudo = fs.readFileSync(arquivo, 'utf8');
  const problemas = [];
  const alertas = [];
  const ehHarness = path.basename(arquivo).startsWith('_');
  const ehPrototipo = !ehHarness && nomeRelativo.startsWith('prototipos/');

  // 1. INTEGRIDADE DE ESTILOS E TOKENS OFICIAIS
  if (!conteudo.includes('bcb-style.css')) {
    problemas.push('Folha de estilo oficial bcb-style.css não importada.');
  }

  // 1.1 Proibir estilos inline (style="...") em todos os protótipos oficiais
  if (ehPrototipo) {
    const styleAttributes = conteudo.match(/style=["'][^"']*["']/gi) || [];
    if (styleAttributes.length > 0) {
      problemas.push(`${styleAttributes.length} ocorrência(s) de estilo inline (style="...") detectada(s). Utilize exclusivamente classes utilitárias do Design System (_helpers.css e tokens).`);
    }
  }

  // 1.2 Validar que todas as classes CSS utilizadas pertencem ao Design System ou Bootstrap homologado
  if (ehPrototipo) {
    const classMatches = conteudo.matchAll(/class=["']([^"']+)["']/g);
    const classesNaoMapeadas = new Set();
    for (const match of classMatches) {
      const listaClasses = match[1].split(/\s+/);
      for (const cls of listaClasses) {
        if (cls && !isClasseValida(cls)) {
          classesNaoMapeadas.add(cls);
        }
      }
    }
    if (classesNaoMapeadas.size > 0) {
      problemas.push(`Classe(s) não mapeada(s) no Design System detectada(s): ${Array.from(classesNaoMapeadas).map(c => `"${c}"`).join(', ')}.`);
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

    // 3.2.1 Proibição estrita de Breadcrumbs em protótipos (elemento de casca fixa provido pelo CMS)
    if (conteudo.includes('breadcrumb') || conteudo.match(/<nav[^>]*aria-label=["'][^"']*trilha/gi)) {
      problemas.push('Breadcrumb detectado em protótipo — a trilha de navegação é fixa e fornecida pelo portal institucional (simulada dinamicamente no _harness.html).');
    }

    // 3.3 Proibição de tags customizadas órfãs/obsoletas
    const tagsOrfas = conteudo.match(/<(?:bcb-accordion-page|bcb-callout|bcb-citacao|bcb-olho|listalinks)[\s>]/gi) || [];
    if (tagsOrfas.length > 0) {
      problemas.push(`${tagsOrfas.length} tag(s) obsoleta(s) detectada(s). Utilize componentes HTML5 nativos do BCB Design System.`);
    }

    // 3.4 Proibição estrita de scripts inline e manipuladores de evento inline (pasta prototipos/)
    const ehPrototipoOficial = nomeRelativo.startsWith('prototipos/') && !ehHarness;
    if (ehPrototipoOficial) {
      const tagsScriptInline = conteudo.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || [];
      if (tagsScriptInline.length > 0) {
        problemas.push(`${tagsScriptInline.length} bloco(s) de <script> inline detectado(s). A reatividade deve ser delegada exclusivamente a assets/js/bcb-ui.js.`);
      }
      const handlersInline = conteudo.match(/\son[a-z]+=["'][^"']*["']/gi) || [];
      if (handlersInline.length > 0) {
        problemas.push(`${handlersInline.length} manipulador(es) inline de evento detectado(s) (${handlersInline.join(', ')}). Utilize seletores de dados como data-action e delegue a assets/js/bcb-ui.js.`);
      }

    // 3.5 Restrição estrita de conteúdo ao container <main id="conteudo-principal" class="bcb-container">
      const matchBody = conteudo.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (matchBody) {
        const corpoBody = matchBody[1];
        const partes = corpoBody.split(/<main[\s\S]*?<\/main>/i);
        if (partes.length === 2) {
          const antesDoMain = partes[0].trim();
          const depoisDoMain = partes[1].trim();

          // Antes do main só é permitido whitespace e comentários HTML
          const tagsAntes = antesDoMain.replace(/<!--[\s\S]*?-->/g, '').trim();
          if (tagsAntes.length > 0 && tagsAntes.includes('<')) {
            problemas.push(`Nó HTML não autorizado detectado antes do <main>: "${tagsAntes.substring(0, 80)}...". Todo o conteúdo deve residir estritamente dentro de <main id="conteudo-principal">.`);
          }

          // Depois do main só é permitido whitespace, comentários, <script src="..."> e <noscript>
          const tagsDepois = depoisDoMain
            .replace(/<!--[\s\S]*?-->/g, '')
            .replace(/<script[^>]*src=[^>]*><\/script>/gi, '')
            .replace(/<noscript>[\s\S]*?<\/noscript>/gi, '')
            .trim();
          if (tagsDepois.length > 0 && tagsDepois.includes('<')) {
            problemas.push(`Nó HTML não autorizado detectado após o </main>: "${tagsDepois.substring(0, 80)}...". Nenhum nó estrutural pode ser irmão do container <main>.`);
          }
        }
      }

      // 3.6 Proibição de estilos inline arbitrários em protótipos oficiais
      const styleAttributes = conteudo.match(/style=["'][^"']*["']/gi) || [];
      if (styleAttributes.length > 0) {
        problemas.push(`${styleAttributes.length} ocorrência(s) de estilo inline (style="...") detectada(s). Utilize as classes oficiais do Design System (_helpers.css e tokens).`);
      }

      // 3.7 Validação da Hierarquia Tipográfica Sequencial (sem pular níveis)
      const tagsHeading = conteudo.match(/<h([1-6])[\s>]/gi) || [];
      const niveis = tagsHeading.map(h => parseInt(h.match(/<h([1-6])/i)[1], 10));
      let nivelAnterior = 1;
      for (let i = 0; i < niveis.length; i++) {
        const nivelAtual = niveis[i];
        if (i > 0 && nivelAtual > nivelAnterior + 1) {
          problemas.push(`Salto inválido na hierarquia tipográfica: <h${nivelAnterior}> seguido por <h${nivelAtual}> (WCAG 1.3.1). Não pule níveis de cabeçalho.`);
        }
        nivelAnterior = nivelAtual;
      }

      // 3.8 Validação Estrita de Iconografia Material Icons
      const iconesEstrangeiros = conteudo.match(/class=["'][^"']*(?:fa-|glyphicon-|feather-|lucide-)[^"']*["']/gi) || [];
      if (iconesEstrangeiros.length > 0) {
        problemas.push(`${iconesEstrangeiros.length} ícone(s) com biblioteca não homologada detectado(s). Padronize exclusivamente com Material Icons (.material-symbols-outlined.material-icons).`);
      }
    }

    // 3.9 Modularidade de Grid Flexível 12 Colunas Bootstrap Oficial
    if (!conteudo.includes('bcb-row') && !conteudo.includes('row')) {
      problemas.push('Protótipo não utiliza a estrutura de linhas do grid modular (.bcb-row / .row).');
    }
    const temColunas = conteudo.match(/(?:bcb-col-|col-(?:12|md-|lg-|sm-))/);
    if (!temColunas) {
      problemas.push('Protótipo não utiliza colunas modulares proporcionais do grid (.bcb-col-* / .col-*).');
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

// 4. VERIFICAÇÃO DE INTEGRIDADE FÍSICA E BIDIRECIONAL DA VITRINE (pages/prototipos.html <-> prototipos/)
const caminhoVitrine = path.join(RAIZ_PROJETO, 'pages', 'prototipos.html');
if (fs.existsSync(caminhoVitrine)) {
  console.log('\n🔎 Verificando integridade física e bidirecional da vitrine (pages/prototipos.html)...');
  const conteudoVitrine = fs.readFileSync(caminhoVitrine, 'utf8');
  
  const linksPrototipos = new Set();
  
  // Inspecionar exclusivamente tags <a> reais na vitrine
  const tagsA = conteudoVitrine.match(/<a\b[^>]*>/gi) || [];
  tagsA.forEach(tag => {
    // Caso 1: href="...prototipos/nome.html"
    const matchHref = tag.match(/href=["'](?:\.\.\/)?prototipos\/([^"'\?#]+\.html)["']/i);
    if (matchHref) {
      const nome = matchHref[1];
      if (!nome.startsWith('_')) linksPrototipos.add(nome);
    }
    // Caso 2: href="..._harness.html?src=nome.html..."
    const matchSrc = tag.match(/[?&]src=([^&"'\s#]+\.html)/i);
    if (matchSrc) {
      const nome = matchSrc[1];
      if (!nome.startsWith('_')) linksPrototipos.add(nome);
    }
  });

  let vitrineFalhas = 0;

  // 4.1 Validação Direta: Vitrine -> Disco
  linksPrototipos.forEach(nomeArquivo => {
    const caminhoFisico = path.join(RAIZ_PROJETO, 'prototipos', nomeArquivo);
    if (!fs.existsSync(caminhoFisico)) {
      console.error(`   ❌ ERRO: Protótipo listado na vitrine não encontrado em disco: prototipos/${nomeArquivo}`);
      vitrineFalhas++;
      falhas++;
    } else {
      console.log(`   ✅ Confirmado em disco: prototipos/${nomeArquivo}`);
    }
  });

  // 4.2 Validação Reversa: Disco -> Vitrine (Garantir zero protótipos órfãos em prototipos/)
  const dirPrototipos = path.join(RAIZ_PROJETO, 'prototipos');
  if (fs.existsSync(dirPrototipos)) {
    const arquivosNoDisco = fs.readdirSync(dirPrototipos)
      .filter(f => f.endsWith('.html') && !f.startsWith('_'));
    
    arquivosNoDisco.forEach(arquivoFisico => {
      if (!linksPrototipos.has(arquivoFisico)) {
        console.error(`   ❌ ERRO: Protótipo órfão detectado em prototipos/ não indexado na vitrine (pages/prototipos.html): ${arquivoFisico}`);
        vitrineFalhas++;
        falhas++;
      } else {
        console.log(`   ✅ Indexado na vitrine: ${arquivoFisico}`);
      }
    });
  }

  if (vitrineFalhas === 0) {
    console.log(`   ✨ Integridade bidirecional confirmada: Todos os ${linksPrototipos.size} protótipos em disco estão indexados na vitrine sem órfãos.`);
  }
}

console.log('\n' + '='.repeat(75));
console.log(`Resultado do Lint: ${sucessos} aprovado(s), ${falhas} falha(s), ${avisos} aviso(s)`);
console.log('='.repeat(75) + '\n');

if (falhas > 0) {
  process.exit(1);
}
