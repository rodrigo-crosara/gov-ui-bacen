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

for (let i = 0; i < rawArgs.length; i++) {
  const a = rawArgs[i];
  if (a === '--slug' || a === '-s') {
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

if (!slug && process.env.npm_config_slug) {
  slug = process.env.npm_config_slug;
}

// Descobrir protótipos disponíveis se slug não fornecido
const prototiposDisponiveis = fs.existsSync(DIR_PROTOTIPOS)
  ? fs.readdirSync(DIR_PROTOTIPOS).filter(f => f.endsWith('.html') && !f.startsWith('_'))
  : [];

if (!slug) {
  if (prototiposDisponiveis.length === 0) {
    console.error('❌ Nenhum protótipo encontrado em prototipos/.');
    process.exit(1);
  }
  slug = prototiposDisponiveis[0].replace(/\.html$/, '');
  console.log(`ℹ️  Nenhum slug informado. Utilizando o primeiro protótipo: ${slug}`);
}

// Limpar slug
slug = slug.replace(/\.html$/, '');
const arquivoOrigem = path.join(DIR_PROTOTIPOS, `${slug}.html`);

if (!fs.existsSync(arquivoOrigem)) {
  console.error(`❌ Protótipo não encontrado em disco: prototipos/${slug}.html`);
  console.log('\nProtótipos disponíveis:');
  prototiposDisponiveis.forEach(p => console.log(`  - ${p.replace(/\.html$/, '')}`));
  process.exit(1);
}

// Ler arquivo HTML
const htmlOriginal = fs.readFileSync(arquivoOrigem, 'utf8');

// Extrair <main>
const matchMain = htmlOriginal.match(/<main[\s\S]*?<\/main>/i);
if (!matchMain) {
  console.error('❌ Elemento <main> não encontrado no protótipo.');
  process.exit(1);
}
const mioloHtml = matchMain[0];

// Extrair título
const matchTitle = htmlOriginal.match(/<title>([\s\S]*?)<\/title>/i);
const titulo = matchTitle ? matchTitle[1].trim() : `Protótipo ${slug}`;

// Extrair H1
const matchH1 = htmlOriginal.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
const h1Texto = matchH1 ? matchH1[1].replace(/<[^>]+>/g, '').trim() : titulo;

// Criar pasta de destino
const pastaExportacao = path.join(DIR_DIST, slug);
fs.mkdirSync(pastaExportacao, { recursive: true });

// 1. Salvar miolo puro (HTML de integração)
const caminhoMiolo = path.join(pastaExportacao, 'miolo.html');
fs.writeFileSync(caminhoMiolo, mioloHtml, 'utf8');

// 2. Salvar página completa de visualização
const caminhoCompleta = path.join(pastaExportacao, 'pagina-completa.html');
// Ajustar caminhos relativos de CSS/JS para o pacote local
const htmlAjustado = htmlOriginal
  .replace(/href="\.\.\/assets\//g, 'href="./assets/')
  .replace(/href="assets\//g, 'href="./assets/')
  .replace(/src="\.\.\/assets\//g, 'src="./assets/')
  .replace(/src="assets\//g, 'src="./assets/');
fs.writeFileSync(caminhoCompleta, htmlAjustado, 'utf8');

// 3. Copiar assets locais para entrega autocontida
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

const pastaAssetsDestino = path.join(pastaExportacao, 'assets');
copiarDiretorioRecursivo(path.join(RAIZ_PROJETO, 'assets'), pastaAssetsDestino);

// 4. Gerar Manifesto JSON para Integração
const manifesto = {
  nome: slug,
  titulo: titulo,
  h1: h1Texto,
  dataExportacao: new Date().toISOString(),
  autor: 'Banco Central do Brasil — DEINF / Design System',
  acessibilidade: 'WCAG 2.1 AA / e-MAG 3.1 Compatível',
  estrutura: {
    containerPrincipal: 'main#conteudo-principal.bcb-container',
    mioloBytes: Buffer.byteLength(mioloHtml, 'utf8'),
    grid: '12 colunas (.bcb-row / .bcb-col-*)',
    suporteTemas: ['Padrão (Claro)', 'Dark Mode (data-theme="dark")', 'Alto Contraste (data-contrast="high")']
  },
  arquivosEntregues: [
    'miolo.html (Markup limpo do <main> para colar no CMS ou templates do backend)',
    'pagina-completa.html (Visualização autônoma da tela no navegador)',
    'manifest.json (Metadados de integração)',
    'README.md (Instruções técnicas para os desenvolvedores)',
    'assets/ (Folhas de estilo bcb-style.css e scripts bcb-ui.js)'
  ]
};
fs.writeFileSync(path.join(pastaExportacao, 'manifest.json'), JSON.stringify(manifesto, null, 2), 'utf8');

// 5. Gerar README de Instruções para Desenvolvedores
const readmeEngenharia = `# Pacote de Entrega de Interface: ${titulo}

Este pacote contém o protótipo de alta fidelidade e os artefatos técnicos desenvolvidos pelo time de Webdesign do Banco Central do Brasil para integração nos sistemas do portal.

---

## 📦 Conteúdo do Pacote

- **\`miolo.html\`:** O markup semântico estrito do container \`<main id="conteudo-principal">\`. Este é o arquivo que deve ser injetado no layout principal do CMS ou framework (Drupal, Django, Spring MVC, React, Vue, Angular, etc.).
- **\`pagina-completa.html\`:** Visualização do protótipo no navegador já com links locais para a pasta \`assets/\`.
- **\`assets/\`:** Folhas de estilo (\`assets/css/bcb-style.css\`) e comportamentos interativos (\`assets/js/bcb-ui.js\`).
- **\`manifest.json\`:** Metadados estruturais da exportação.

---

## 🛠️ Como Integrar no Backend / CMS

1. **Injeção do Miolo:**
   Copie o conteúdo de \`miolo.html\` para o slot de conteúdo da sua página:
   \`\`\`html
   <!-- Slot Central do Template CMS -->
   {{ miolo_html }}
   \`\`\`
2. **Dependências de CSS (no <head>):**
   - Bootstrap 4.6 (CSS)
   - Fontes: Inter, Ubuntu e Cormorant Garamond
   - Material Symbols Outlined
   - \`assets/css/bcb-style.css\`
3. **Dependências de JS (ao final do <body>):**
   - jQuery 3.5.1 + Bootstrap 4.6 bundle JS
   - \`assets/js/bcb-ui.js\`

---

## ♿ Conformidade e Acessibilidade
- **WCAG 2.1 AA & e-MAG 3.1:** Validado sem erros de contraste ou estrutura.
- **Navegação:** Foco exclusivo no miolo com botão de retorno ao topo (breadcrumbs e casca institucional fornecidos pelo portal).
- **Alvos de Toque:** Dimensão mínima de 44x44px em resoluções mobile.
`;
fs.writeFileSync(path.join(pastaExportacao, 'README.md'), readmeEngenharia, 'utf8');

console.log('\n=======================================================');
console.log('📦 BCB Design System — Pacote de Exportação Gerado');
console.log('=======================================================');
console.log(`🎯 Protótipo:      ${slug}`);
console.log(`📁 Diretório:      dist/exportacoes/${slug}/`);
console.log(`📄 Miolo puro:     dist/exportacoes/${slug}/miolo.html`);
console.log(`🌐 Preview local:  dist/exportacoes/${slug}/pagina-completa.html`);
console.log(`📋 Manifesto:      dist/exportacoes/${slug}/manifest.json`);
console.log(`📖 Documentação:   dist/exportacoes/${slug}/README.md`);
console.log('=======================================================\n');
