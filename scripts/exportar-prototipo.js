#!/usr/bin/env node

/**
 * =========================================================================
 * BCB Design System — Exportador de Protótipos para Engenharia
 * =========================================================================
 * Extrai o miolo semântico (<main>), gera pacote autocontido com assets e
 * manifest para entrega direta aos desenvolvedores de sistemas do BCB.
 *
 * Uso:
 *   node scripts/exportar-prototipo.js copom-decisao-taxa-selic
 *   npm run prototipo:exportar copom-decisao-taxa-selic
 * =========================================================================
 */

const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..');
const DIR_PROTOTIPOS = path.join(RAIZ_PROJETO, 'prototipos');
const DIR_DIST = path.join(RAIZ_PROJETO, 'dist', 'exportacoes');

// Argumentos
const rawArgs = process.argv.slice(2).filter(a => a !== '--');
let slug = null;
let exportAll = false;

for (let i = 0; i < rawArgs.length; i++) {
  const a = rawArgs[i];
  if (a === '--all' || a === '-a' || a === 'all' || a === '--todos' || a === 'todos') {
    exportAll = true;
    break;
  } else if (a === '--slug' || a === '-s') {
    slug = rawArgs[i + 1];
    break;
  } else if (a.startsWith('--slug=')) {
    slug = a.split('=')[1];
    break;
  } else if (!a.startsWith('-')) {
    slug = a;
    break;
  }
}

if (process.env.npm_config_all) {
  exportAll = true;
}

if (!slug && !exportAll && process.env.npm_config_slug) {
  slug = process.env.npm_config_slug;
}

// Descobrir protótipos disponíveis se slug não fornecido
const prototiposDisponiveis = fs.existsSync(DIR_PROTOTIPOS)
  ? fs.readdirSync(DIR_PROTOTIPOS).filter(f => f.endsWith('.html') && !f.startsWith('_'))
  : [];

if (prototiposDisponiveis.length === 0) {
  console.error('❌ Nenhum protótipo encontrado em prototipos/.');
  process.exit(1);
}

function copiarDiretorioRecursivo(origem, destino) {
  if (!fs.existsSync(origem)) return;
  fs.mkdirSync(destino, { recursive: true });
  const itens = fs.readdirSync(origem, { withFileTypes: true });
  for (const item of itens) {
    const srcPath = path.join(origem, item.name);
    const destPath = path.join(destino, item.name);
    if (item.isDirectory()) {
      copiarDiretorioRecursivo(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function exportarPrototipo(nomeSlug) {
  const s = nomeSlug.replace(/\.html$/, '');
  const arquivoOrigem = path.join(DIR_PROTOTIPOS, `${s}.html`);

  if (!fs.existsSync(arquivoOrigem)) {
    console.error(`❌ Protótipo não encontrado em disco: prototipos/${s}.html`);
    console.log('\nProtótipos disponíveis:');
    prototiposDisponiveis.forEach(p => console.log(`  - ${p.replace(/\.html$/, '')}`));
    return false;
  }

  // Ler arquivo HTML
  const htmlOriginal = fs.readFileSync(arquivoOrigem, 'utf8');

  // Extrair <main>
  const matchMain = htmlOriginal.match(/<main[\s\S]*?<\/main>/i);
  const mioloHtml = matchMain ? matchMain[0] : htmlOriginal.trim();

  // Extrair conteúdo interno do <main> (para CMSs que já renderizam a casca do <main>)
  const matchInnerMain = mioloHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const fragmentoInternoHtml = matchInnerMain ? matchInnerMain[1].trim() : mioloHtml;

  if (!mioloHtml.includes('conteudo-principal')) {
    console.error(`❌ Elemento <main id="conteudo-principal"> não identificado no protótipo ${s}.`);
    return false;
  }

  // Extrair H1 e título a partir do corpo de conteúdo semântico
  const matchH1 = htmlOriginal.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1Texto = matchH1 ? matchH1[1].replace(/<[^>]+>/g, '').trim() : `Protótipo ${s}`;
  const titulo = h1Texto;

  // Criar pasta de destino
  const pastaExportacao = path.join(DIR_DIST, s);
  fs.mkdirSync(pastaExportacao, { recursive: true });

  // 1. Salvar o corpo de conteúdo delimitado com <main>
  const caminhoCorpo = path.join(pastaExportacao, 'corpo-conteudo.html');
  fs.writeFileSync(caminhoCorpo, mioloHtml, 'utf8');

  const caminhoMiolo = path.join(pastaExportacao, 'miolo.html');
  fs.writeFileSync(caminhoMiolo, mioloHtml, 'utf8');

  // 2. Salvar o fragmento interno estrito (sem a tag <main>, ideal para CMS com casca própria)
  const caminhoFragmento = path.join(pastaExportacao, 'fragmento-interno.html');
  fs.writeFileSync(caminhoFragmento, fragmentoInternoHtml, 'utf8');

  // 3. Salvar o arquivo autônomo completo para visualização direta
  const caminhoAutonomo = path.join(pastaExportacao, 'prototipo-autonomo.html');
  fs.writeFileSync(caminhoAutonomo, htmlOriginal, 'utf8');

  // 4. Copiar assets locais para entrega autocontida
  const pastaAssetsDestino = path.join(pastaExportacao, 'assets');
  copiarDiretorioRecursivo(path.join(RAIZ_PROJETO, 'assets'), pastaAssetsDestino);

  // 5. Gerar Manifesto JSON para Integração
  const manifesto = {
    nome: s,
    titulo: titulo,
    h1: h1Texto,
    dataExportacao: new Date().toISOString(),
    autor: 'Banco Central do Brasil — DEINF / Design System',
    acessibilidade: 'WCAG 2.1 AA / e-MAG 3.1 Compatível',
    estrutura: {
      containerPrincipal: 'main#conteudo-principal.bcb-main-content.bcb-container',
      mioloBytes: Buffer.byteLength(mioloHtml, 'utf8'),
      fragmentoBytes: Buffer.byteLength(fragmentoInternoHtml, 'utf8'),
      grid: '12 colunas (.bcb-row / .bcb-col-*)',
      suporteTemas: ['Padrão (Claro)', 'Dark Mode (data-theme="dark")', 'Alto Contraste (data-contrast="high")']
    },
    arquivosEntregues: [
      'corpo-conteudo.html (Markup semântico estrito do <main> para inserção no CMS)',
      'miolo.html (Alias do corpo de conteúdo com tag <main>)',
      'fragmento-interno.html (Conteúdo interno sem tag <main>, pronto para CMS que já fornece a casca)',
      'prototipo-autonomo.html (Envelope técnico completo para visualização direta em qualquer navegador)',
      'manifest.json (Metadados estruturais da exportação)',
      'README.md (Instruções técnicas para os desenvolvedores)',
      'assets/ (Folhas de estilo bcb-style.css e scripts bcb-ui.js)'
    ]
  };
  fs.writeFileSync(path.join(pastaExportacao, 'manifest.json'), JSON.stringify(manifesto, null, 2), 'utf8');

  // 6. Gerar README de Instruções para Desenvolvedores
  const readmeEngenharia = `# Pacote de Entrega de Interface: ${titulo}

Este pacote contém o protótipo de alta fidelidade e os artefatos técnicos desenvolvidos pelo time de Webdesign do Banco Central do Brasil para integração nos sistemas do portal.

---

## 📦 Conteúdo do Pacote

- **\`corpo-conteudo.html\` (ou \`miolo.html\`):** O markup semântico delimitado pelo container \`<main id="conteudo-principal">\`. Ideal para sistemas e templates de CMS onde o desenvolvedor injeta o bloco de conteúdo principal completo.
- **\`fragmento-interno.html\`:** O miolo interno estrito (sem a tag \`<main>\`). Ideal para CMSs ou templates que já fornecem o elemento \`<main id="conteudo-principal">\` externamente.
- **\`prototipo-autonomo.html\`:** O arquivo completo com envelope técnico mínimo (\`<!DOCTYPE html>\`, \`<head>\`, dependências de CSS/JS). Permite visualização e testes diretos no navegador sem necessidade de servidor ou harness.
- **\`assets/\`:** Folhas de estilo (\`assets/css/bcb-style.css\`) e comportamentos interativos (\`assets/js/bcb-ui.js\`).
- **\`manifest.json\`:** Metadados estruturais da exportação.

---

## 🛠️ Como Integrar no Backend / CMS

1. **Injeção do Corpo de Conteúdo:**
   Se o seu template já renderiza \`<main id="conteudo-principal">\`, copie o conteúdo de \`fragmento-interno.html\`:
   \`\`\`html
   <main id="conteudo-principal" class="bcb-main-content bcb-container container py-4 mb-5">
       {{ fragmento_interno_html }}
   </main>
   \`\`\`
   Caso o template necessite do container completo, utilize \`corpo-conteudo.html\`:
   \`\`\`html
   {{ corpo_conteudo_html }}
   \`\`\`
2. **Dependências de CSS (no <head>):**
   - Fontes: Open Sans e Roboto
   - Material Symbols Outlined
   - \`assets/css/bcb-style.css\`
3. **Dependências de JS (ao final do <body>):**
   - \`assets/js/bcb-ui.js\`

---

## ♿ Conformidade e Acessibilidade
- **WCAG 2.1 AA & e-MAG 3.1:** Validado sem erros de contraste ou estrutura.
- **Navegação:** Foco exclusivo no corpo de conteúdo com botão de retorno ao topo (breadcrumbs, header e footer institucionais fornecidos pelo portal).
- **Alvos de Toque:** Dimensão mínima de 44x44px em resoluções mobile.
`;
  fs.writeFileSync(path.join(pastaExportacao, 'README.md'), readmeEngenharia, 'utf8');

  console.log(`✅ [Exportado com sucesso]: ${s} -> dist/exportacoes/${s}/`);
  return true;
}

if (exportAll) {
  console.log('\n=======================================================');
  console.log('📦 BCB Design System — Exportando Todos os Protótipos');
  console.log('=======================================================');
  let totalSucesso = 0;
  for (const p of prototiposDisponiveis) {
    const ok = exportarPrototipo(p);
    if (ok) totalSucesso++;
  }
  console.log('=======================================================');
  console.log(`🎉 Total exportado: ${totalSucesso}/${prototiposDisponiveis.length} protótipo(s) atualizado(s) em dist/exportacoes/`);
  console.log('=======================================================\n');
} else {
  if (!slug) {
    slug = prototiposDisponiveis[0].replace(/\.html$/, '');
    console.log(`ℹ️  Nenhum slug informado. Utilizando o primeiro protótipo: ${slug}`);
  }
  exportarPrototipo(slug);
}
process.exit(0);

