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

    // 3.2.1 Validação de conformidade semântica de Breadcrumbs padronizados (WCAG 2.4.4 / e-MAG)
    if (conteudo.includes('breadcrumb')) {
      if (!conteudo.includes('aria-label="Trilha de navegação"') && !conteudo.includes("aria-label='Trilha de navegação'") && !conteudo.includes('aria-label="Breadcrumb"')) {
        alertas.push('Breadcrumb deve conter aria-label descritivo (ex.: aria-label="Trilha de navegação").');
      }
      if (!conteudo.includes('aria-current="page"')) {
        alertas.push('Último item ativo do breadcrumb deve conter aria-current="page" para acessibilidade.');
      }
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
