/**
 * BCB Design System — Utilitário de Homologação Visual e Preview no Harness
 *
 * Lista os protótipos de fragmento disponíveis e imprime as URLs diretas de homologação
 * no visualizador técnico split-screen (_harness.html).
 *
 * Uso:
 *   node scripts/preview-harness.js
 *   node scripts/preview-harness.js <slug>
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const DIR_PROTOTIPOS = path.join(RAIZ, 'prototipos');
const DIR_DEMANDAS = path.join(RAIZ, '.docs-ia', 'exemplos-demandas');

// Mapa de correspondência protótipo -> demanda
const MAPA_DEMANDAS = {
  'copom-decisao-taxa-selic.html': '01-comunicado-normativo.md',
  'sgs-series-taxa-selic.html': '02-dados-sgs-indicadores.md',
  'mecanismo-especial-devolucao-med.html': '03-servico-passo-a-passo.md',
  'regras-cheque-especial.html': '04-conteudo-html-legado.md',
  'resolucao-bcb-dou.html': '05-entrada-nao-estruturada-dou.md'
};

const filtroSlug = process.argv[2] ? process.argv[2].replace('.html', '').toLowerCase() : null;

if (!fs.existsSync(DIR_PROTOTIPOS)) {
  console.error('❌ Diretório prototipos/ não encontrado.');
  process.exit(1);
}

const arquivos = fs.readdirSync(DIR_PROTOTIPOS)
  .filter(f => f.endsWith('.html') && !f.startsWith('_'))
  .filter(f => !filtroSlug || f.toLowerCase().includes(filtroSlug));

console.log('\n======================================================================');
console.log('🖥️  BCB Design System — Central de Homologação no Visualizador Técnico');
console.log('======================================================================');
console.log('Para inspecionar com servidor local ativo (porta 8080):\n');

if (arquivos.length === 0) {
  console.log(`⚠️  Nenhum protótipo encontrado correspondente a "${filtroSlug}".`);
} else {
  arquivos.forEach((arq, idx) => {
    const docMd = MAPA_DEMANDAS[arq] || '';
    const paramDoc = docMd ? `&doc=${docMd}` : '';
    const urlLocal = `http://localhost:8080/prototipos/_harness.html?src=${arq}${paramDoc}`;
    const urlArquivo = `prototipos/_harness.html?src=${arq}${paramDoc}`;

    console.log(`[${idx + 1}] ${arq.replace('.html', '')}`);
    console.log(`    🌐 URL Local:   ${urlLocal}`);
    console.log(`    📁 Caminho Rel: ${urlArquivo}`);
    if (docMd) {
      console.log(`    📄 Demanda:     .docs-ia/exemplos-demandas/${docMd}`);
    }
    console.log('----------------------------------------------------------------------');
  });
}

console.log('\n💡 Dica: Inicie o servidor local com "npm run serve" e abra a URL desejada.');
console.log('======================================================================\n');
