#!/usr/bin/env node
/**
 * BCB Design System — Testes de Acessibilidade (WCAG 2.2 / 2.1 AA)
 * Executa pa11y e auditoria estática contra cada página e protótipo HTML do projeto.
 * Garante que os 4 protótipos de produção em prototipos/ atendam integralmente às normas de acessibilidade.
 *
 * Uso: node tests/a11y/a11y-runner.js [--prototypes]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..', '..');
const SERVIDOR_BASE = process.env.BASE_URL || 'http://localhost:8080';

// Matriz oficial de protótipos de produção homologados
const PROTOTIPOS_HOMOLOGADOS = [
  '/prototipos/copom-decisao-taxa-selic.html',
  '/prototipos/sgs-series-taxa-selic.html',
  '/prototipos/mecanismo-especial-devolucao-med.html',
  '/prototipos/regras-cheque-especial.html',
  '/prototipos/resolucao-bcb-dou.html'
];

// Função para descobrir dinamicamente todas as páginas HTML do projeto
function descobrirPaginasHTML(diretorio) {
  const paginas = [];
  const itens = fs.readdirSync(diretorio, { withFileTypes: true });

  for (const item of itens) {
    const caminhoCompleto = path.join(diretorio, item.name);
    if (['node_modules', '.git', '.docs-ia', '.agent', 'dist'].includes(item.name)) continue;

    if (item.isDirectory()) {
      paginas.push(...descobrirPaginasHTML(caminhoCompleto));
    } else if (item.name.endsWith('.html')) {
      const caminhoRelativo = '/' + path.relative(RAIZ_PROJETO, caminhoCompleto).replace(/\\/g, '/');
      paginas.push(caminhoRelativo);
    }
  }

  return paginas.sort();
}

let PAGINAS = descobrirPaginasHTML(RAIZ_PROJETO);
const apenasPrototipos = process.argv.includes('--prototypes') || process.argv.includes('-p');
if (apenasPrototipos) {
  PAGINAS = PAGINAS.filter(p => p.startsWith('/prototipos/'));
}

let falhas = 0;
let sucessos = 0;
const statusPrototipos = {};

console.log('\n🔍 BCB Design System — Auditoria de Acessibilidade (WCAG 2.2 / 2.1 AA)');
console.log('='.repeat(70));

// Verificar se os 4 protótipos homologados existem no repositório
const prototiposFaltantes = PROTOTIPOS_HOMOLOGADOS.filter(proto => {
  const caminhoFisico = path.join(RAIZ_PROJETO, proto.replace(/^\//, ''));
  return !fs.existsSync(caminhoFisico);
});

if (prototiposFaltantes.length > 0) {
  console.error(`❌ ERRO: Protótipos homologados ausentes no repositório: ${prototiposFaltantes.join(', ')}`);
  process.exit(1);
}

if (apenasPrototipos) {
  console.log(`[Modo Protótipos] Auditando ${PAGINAS.length} arquivo(s) em prototipos/:\n`);
} else {
  console.log(`Descobertas ${PAGINAS.length} página(s) HTML para auditoria:\n`);
}

function auditoriaEstaticaAcessibilidade(caminhoArquivo, caminhoRelativo) {
  const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
  const problemas = [];
  const ehHarness = path.basename(caminhoArquivo).startsWith('_');
  const ehPrototipo = caminhoRelativo.startsWith('/prototipos/') && !ehHarness;

  const ehDocumentoCompleto = conteudo.includes('<html') || conteudo.toLowerCase().includes('<!doctype');

  // 1. Tag html deve ter lang="pt-BR" (WCAG 3.1.1) - aplicado em documentos completos
  if (ehDocumentoCompleto && !conteudo.match(/<html[^>]*lang=["']pt-BR["']/i)) {
    problemas.push('Elemento <html> deve possuir lang="pt-BR" (WCAG 3.1.1).');
  }

  // 2. Head deve conter <meta name="viewport"> (WCAG 1.4.4 / 1.4.10) - aplicado em documentos completos
  if (ehDocumentoCompleto && !conteudo.includes('name="viewport"')) {
    problemas.push('Meta viewport ausente para responsividade (WCAG 1.4.4 / 1.4.10).');
  }

  // 3. Imagens devem conter atributo alt (WCAG 1.1.1)
  const tagsImg = conteudo.match(/<img[^>]*>/gi) || [];
  tagsImg.forEach(img => {
    if (!img.includes('alt=')) {
      problemas.push('Elemento <img> sem atributo alt (WCAG 1.1.1 Non-text Content).');
    }
  });

  // 4. Elemento main obrigatório com id="conteudo-principal" (WCAG 2.4.1)
  if (!conteudo.includes('<main') || !conteudo.includes('id="conteudo-principal"')) {
    problemas.push('Elemento <main id="conteudo-principal"> obrigatório para skip link e navegação de marcos (WCAG 2.4.1).');
  }

  // 5. Exatamente um H1 por documento (WCAG 1.3.1 / e-MAG 3.1)
  const totalH1 = (conteudo.match(/<h1[\s>]/gi) || []).length;
  if (totalH1 !== 1) {
    problemas.push(`Documento possui ${totalH1} tag(s) <h1> — exigido rigorosamente 1 H1 (WCAG 1.3.1 / e-MAG 3.1).`);
  }

  // 6. Tabelas devem possuir <caption> (WCAG 1.3.1)
  const totalTabelas = (conteudo.match(/<table[\s>]/gi) || []).length;
  const totalCaptions = (conteudo.match(/<caption[\s>]/gi) || []).length;
  if (totalTabelas > totalCaptions) {
    problemas.push(`${totalTabelas - totalCaptions} tabela(s) sem <caption> acessível (WCAG 1.3.1).`);
  }

  // 7. Proibição de textos de link genéricos (WCAG 2.4.4)
  const linksProibidos = conteudo.match(/>\s*(clique aqui|saiba mais|leia mais|mais)\s*</gi) || [];
  if (linksProibidos.length > 0) {
    problemas.push(`${linksProibidos.length} link(s) com texto não descritivo proibido ("clique aqui", "saiba mais", "leia mais").`);
  }

  // 8. Formulários devem possuir rótulos acessíveis (WCAG 1.3.1 / 4.1.2)
  const selectsSemLabel = (conteudo.match(/<select(?![^>]*aria-label)[^>]*id=["']([^"']+)["'][^>]*>/gi) || []).filter(sel => {
    const idMatch = sel.match(/id=["']([^"']+)["']/);
    if (!idMatch) return true;
    const id = idMatch[1];
    return !conteudo.includes(`for="${id}"`) && !conteudo.includes(`for='${id}'`);
  });
  if (selectsSemLabel.length > 0) {
    problemas.push(`${selectsSemLabel.length} elemento(s) <select> sem label acessível associado.`);
  }

  // 9. Protótipos de produção não devem conter scripts inline nem eventos inline
  if (ehPrototipo) {
    const tagsScriptInline = conteudo.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || [];
    if (tagsScriptInline.length > 0) {
      problemas.push(`${tagsScriptInline.length} bloco(s) de <script> inline detectado(s).`);
    }
    const handlersInline = conteudo.match(/\son[a-z]+=["'][^"']*["']/gi) || [];
    if (handlersInline.length > 0) {
      problemas.push(`${handlersInline.length} manipulador(es) inline detectado(s) (${handlersInline.join(', ')}).`);
    }

    // 10. Alvos de Toque Mobile Mínimos de 44x44px (WCAG 2.5.5 / 2.5.8 Target Size)
    const alvosReduzidosInline = conteudo.match(/style=["'][^"']*(?:height:\s*(?:1[0-9]|2[0-9]|3[0-5])px|min-height:\s*(?:1[0-9]|2[0-9]|3[0-5])px)[^"']*["']/gi) || [];
    if (alvosReduzidosInline.length > 0) {
      problemas.push(`${alvosReduzidosInline.length} elemento(s) com estilo inline reduzindo altura para menos de 44px (WCAG 2.5.5).`);
    }

    // 11. Semântica de Teclado e Foco em Botões ARIA (WCAG 2.1.1 / 4.1.2)
    const botoesCustomizados = conteudo.match(/<(?:div|span|a)[^>]*role=["']button["'][^>]*>/gi) || [];
    botoesCustomizados.forEach(btn => {
      if (!btn.includes('tabindex=') && !btn.includes('href=')) {
        problemas.push('Elemento com role="button" sem tabindex="0" detectado — impede ativação por teclado (WCAG 2.1.1).');
      }
    });

    // 12. Ordem de Foco e Proibição Estrita de Tabindex Positivo (WCAG 2.4.3 Focus Order)
    const tabindexPositivos = conteudo.match(/tabindex=["'][1-9]\d*["']/gi) || [];
    if (tabindexPositivos.length > 0) {
      problemas.push(`${tabindexPositivos.length} elemento(s) com tabindex positivo detectado(s). O uso de tabindex positivo quebra a ordem natural de foco do DOM.`);
    }

    // 13. Acessibilidade de Teclado em Tabelas com Rolagem Horizontal (WCAG 2.1.1 Keyboard)
    const tabelasResponsivas = conteudo.match(/<div[^>]*class=["'][^"']*table-responsive[^"']*["'][^>]*>/gi) || [];
    tabelasResponsivas.forEach(div => {
      if (!div.includes('tabindex="0"') && !div.includes("tabindex='0'")) {
        problemas.push('Container de rolagem horizontal .table-responsive sem tabindex="0" — impede que usuários de teclado consigam rolar a tabela (WCAG 2.1.1).');
      }
      if (!div.includes('role="region"') && !div.includes("role='region'")) {
        problemas.push('Container .table-responsive deve possuir role="region" para anunciar marco acessível de rolagem.');
      }
      if (!div.includes('aria-label=') && !div.includes('aria-labelledby=')) {
        problemas.push('Container .table-responsive deve possuir aria-label descritivo ou aria-labelledby identificando o conteúdo da tabela.');
      }
    });

    // 14. Navegação por Teclado: Trilha de Navegação (Breadcrumb) Acessível (em documentos da documentação)
    if (!ehPrototipo && conteudo.includes('breadcrumb')) {
      const matchNavBreadcrumb = conteudo.match(/<nav[^>]*aria-label=["']([^"']+)["'][^>]*>[\s\S]*?<ol[^>]*class=["'][^"']*breadcrumb/i);
      if (!matchNavBreadcrumb) {
        problemas.push('Trilha de navegação deve estar envolvida em <nav aria-label="..."> com <ol class="breadcrumb"> para navegação semântica.');
      }
      if (!conteudo.includes('aria-current="page"')) {
        problemas.push('O último item do breadcrumb deve conter aria-current="page" para indicar a página corrente na árvore de acessibilidade.');
      }
    }

    // 15. Navegação por Teclado: Botão de Retorno ao Topo
    if (!conteudo.includes('bcb-back-to-top') && !conteudo.includes('href="#conteudo-principal"')) {
      problemas.push('Protótipo deve conter botão ou link de retorno ao topo apontando para #conteudo-principal.');
    }

    // 16. Validação de Contraste e Cores do Design System (WCAG 1.4.3 / 1.4.11)
    const coresHexInline = conteudo.match(/style=["'][^"']*(?:color|background)[^"']*#[0-9a-fA-F]{3,8}[^"']*["']/gi) || [];
    if (coresHexInline.length > 0) {
      problemas.push(`${coresHexInline.length} cor(es) literal(is) inline detectada(s). Utilize exclusivamente variáveis semânticas do Design System para garantir contraste em Light, Dark e Alto Contraste.`);
    }

    // 17. Validação de Contraste de Texto Branco fora de Fundo Escuro
    const textosBrancosSemFundo = (conteudo.match(/class=["'][^"']*\btext-white\b[^"']*["']/gi) || []).filter(tag => {
      return !tag.includes('bg-') && !tag.includes('thead-') && !tag.includes('badge-') && !tag.includes('btn-');
    });
    if (textosBrancosSemFundo.length > 0) {
      problemas.push(`${textosBrancosSemFundo.length} ocorrência(s) de classe text-white sem classe de fundo escuro correspondente no elemento.`);
    }
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
      if (PROTOTIPOS_HOMOLOGADOS.includes(nomeRelativo)) statusPrototipos[nomeRelativo] = false;
    } else {
      console.log(`✅ ${nomeRelativo} — Aprovado em acessibilidade (pa11y WCAG2AA)`);
      sucessos++;
      if (PROTOTIPOS_HOMOLOGADOS.includes(nomeRelativo)) statusPrototipos[nomeRelativo] = true;
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
          if (PROTOTIPOS_HOMOLOGADOS.includes(nomeRelativo)) statusPrototipos[nomeRelativo] = false;
        }
      } catch {}
    }

    // Se pa11y não estava disponível ou servidor 8080 desligado, executa a auditoria estática WCAG 2.1 AA
    if (!pa11yExecutado) {
      const problemasEstaticos = auditoriaEstaticaAcessibilidade(caminhoArquivo, nomeRelativo);
      if (problemasEstaticos.length > 0) {
        console.log(`\n❌ ${nomeRelativo} — ${problemasEstaticos.length} problema(s) (Auditoria Estática WCAG 2.1 AA):`);
        problemasEstaticos.forEach((p, i) => console.log(`   ${i + 1}. ${p}`));
        falhas++;
        if (PROTOTIPOS_HOMOLOGADOS.includes(nomeRelativo)) statusPrototipos[nomeRelativo] = false;
      } else {
        console.log(`✅ ${nomeRelativo} — Aprovado em acessibilidade (Auditoria Estática WCAG 2.1 AA)`);
        sucessos++;
        if (PROTOTIPOS_HOMOLOGADOS.includes(nomeRelativo)) statusPrototipos[nomeRelativo] = true;
      }
    }
  }
}

// Relatório da Matriz Oficial de Protótipos
console.log('\n📊 Matriz de Homologação de Protótipos (WCAG 2.1 AA):');
console.log('-'.repeat(70));
PROTOTIPOS_HOMOLOGADOS.forEach(proto => {
  const status = statusPrototipos[proto] !== false ? '✅ Aprovado' : '❌ Falha';
  console.log(`  ${status} → ${proto}`);
});

console.log('\n' + '='.repeat(70));
console.log(`Resultado da Acessibilidade: ${sucessos} aprovado(s), ${falhas} com problemas`);
console.log('='.repeat(70) + '\n');

process.exit(falhas > 0 ? 1 : 0);
