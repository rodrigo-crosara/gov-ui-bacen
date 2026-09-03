#!/usr/bin/env node

/**
 * =========================================================================
 * BCB Design System — Gerador CLI de Demandas Estruturadas (Multiformato)
 * =========================================================================
 * Cria o scaffold padronizado de uma nova demanda da área de negócio em
 * .docs-ia/exemplos-demandas/<numero>-<slug>.md para processamento pela IA.
 *
 * Suporta múltiplos formatos de entrada:
 *   - Arquivos: .txt, .md, .html, .json, .eml, .csv (--arquivo / --file / --input)
 *   - Texto direto via flag: --texto "conteúdo bruto..."
 *   - Entrada via stdin (pipe): cat email.eml | npm run demanda:criar
 *
 * Uso:
 *   npm run demanda:criar -- --slug meu-servico --titulo "Meu Serviço"
 *   npm run demanda:criar -- --arquivo ./minuta.html
 *   npm run demanda:criar -- --arquivo ./comunicado.eml --slug seguranca-pix
 * =========================================================================
 */

const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..');
const DIR_DEMANDAS = path.join(RAIZ_PROJETO, '.docs-ia', 'exemplos-demandas');

// 1. Processamento de Argumentos
const rawArgs = process.argv.slice(2).filter(a => a !== '--');
const positionalArgs = rawArgs.filter(a => !a.startsWith('-'));

function getArg(flag, alias = null, defaultValue = null) {
  for (let i = 0; i < rawArgs.length; i++) {
    if (rawArgs[i] === flag || (alias && rawArgs[i] === alias)) {
      return rawArgs[i + 1] && !rawArgs[i + 1].startsWith('-') ? rawArgs[i + 1] : defaultValue;
    }
    if (rawArgs[i].startsWith(`${flag}=`)) {
      return rawArgs[i].split('=')[1];
    }
    if (alias && rawArgs[i].startsWith(`${alias}=`)) {
      return rawArgs[i].split('=')[1];
    }
  }
  return defaultValue;
}

// Descobrir próximo número sequencial de demanda existente
function proximoNumeroDemanda() {
  if (!fs.existsSync(DIR_DEMANDAS)) return '05';
  const arquivos = fs.readdirSync(DIR_DEMANDAS);
  const numeros = arquivos
    .map(f => {
      const m = f.match(/^(\d+)-/);
      return m ? parseInt(m[1], 10) : 0;
    })
    .filter(n => n > 0);
  const max = numeros.length > 0 ? Math.max(...numeros) : 4;
  return String(max + 1).padStart(2, '0');
}

// 2. Normalização e Parsing Multiformato de Entrada
function normalizarEntrada(caminhoArquivo, textoDireto) {
  let conteudoBruto = '';
  let tituloDetectado = null;
  let origemDetectada = null;
  let padraoDetectado = null;
  let atosDetectados = [];

  if (caminhoArquivo) {
    const caminhoResolvido = path.isAbsolute(caminhoArquivo)
      ? caminhoArquivo
      : path.resolve(process.cwd(), caminhoArquivo);

    if (!fs.existsSync(caminhoResolvido)) {
      console.error(`\n❌ Erro de Validação: Arquivo de demanda não encontrado: ${caminhoArquivo}`);
      console.error('Certifique-se de que o caminho do arquivo está correto e acessível.\n');
      process.exit(1);
    }

    const ext = path.extname(caminhoResolvido).toLowerCase();
    const rawContent = fs.readFileSync(caminhoResolvido, 'utf8');

    if (!rawContent || rawContent.trim().length === 0) {
      console.error(`\n❌ Erro de Validação: O arquivo de demanda está vazio: ${caminhoArquivo}\n`);
      process.exit(1);
    }

    if (ext === '.json') {
      let parsed;
      try {
        parsed = JSON.parse(rawContent);
      } catch (e) {
        console.error(`\n❌ Erro de Validação: Formato JSON inválido ou malformado em ${caminhoArquivo}: ${e.message}\n`);
        process.exit(1);
      }

      // Validação estrita do schema de entrada JSON acordado com o webdesigner
      const errosSchema = [];
      const textoEncontrado = parsed.conteudo || parsed.texto || parsed.descricao || parsed.conteudoBruto;
      const tituloEncontrado = parsed.titulo || parsed.title;
      const origemEncontrada = parsed.origem || parsed.departamento;

      if (!textoEncontrado || typeof textoEncontrado !== 'string' || textoEncontrado.trim().length === 0) {
        errosSchema.push("Campo obrigatório 'conteudo' (ou 'texto'/'descricao') ausente ou vazio.");
      }
      if (!tituloEncontrado || typeof tituloEncontrado !== 'string' || tituloEncontrado.trim().length === 0) {
        errosSchema.push("Campo obrigatório 'titulo' (ou 'title') ausente ou vazio.");
      }
      if (!origemEncontrada || typeof origemEncontrada !== 'string' || origemEncontrada.trim().length === 0) {
        errosSchema.push("Campo obrigatório 'origem' (ou 'departamento') ausente ou vazio.");
      }

      if (errosSchema.length > 0) {
        console.error('\n❌ Erro de Schema da Demanda (JSON não atende ao contrato acordado com o Webdesigner):');
        errosSchema.forEach(err => console.error(`   - ${err}`));
        console.error('\nSchema esperado:');
        console.error('   {\n     "titulo": "Título da Demanda",\n     "origem": "Departamento Solicitante",\n     "conteudo": "Texto bruto da demanda...",\n     "padrao": "Padrão de UX",\n     "atos": ["Resolução BCB nº ..."]\n   }\n');
        process.exit(1);
      }

      conteudoBruto = textoEncontrado.trim();
      tituloDetectado = tituloEncontrado.trim();
      origemDetectada = origemEncontrada.trim();
      padraoDetectado = parsed.padrao || parsed.padraoUX || null;
      if (parsed.atos && Array.isArray(parsed.atos)) atosDetectados = parsed.atos;
    } else if (ext === '.html' || ext === '.htm') {
      // Extração de título de HTML legado
      const matchTitle = rawContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || rawContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (matchTitle) tituloDetectado = matchTitle[1].replace(/<[^>]+>/g, '').trim();

      // Limpeza de tags pesadas preservando conteúdo textual
      conteudoBruto = rawContent
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<br\s*[\/]?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<\/tr>/gi, '\n')
        .replace(/<\/h[1-6]>/gi, '\n\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
    } else if (ext === '.eml') {
      // Parsing de mensagem de e-mail institucional
      const matchDe = rawContent.match(/(?:From|De):\s*(.*)/i);
      const matchAssunto = rawContent.match(/(?:Subject|Assunto):\s*(.*)/i);
      if (matchDe) origemDetectada = matchDe[1].trim();
      if (matchAssunto) tituloDetectado = matchAssunto[1].trim();

      // Isolar corpo do e-mail após cabeçalhos duplos
      const partes = rawContent.split(/\r?\n\r?\n/);
      conteudoBruto = partes.slice(1).join('\n\n').trim();
    } else {
      // .txt, .md, .csv
      conteudoBruto = rawContent.trim();
      const linhas = conteudoBruto.split('\n');
      if (linhas[0] && (linhas[0].startsWith('# ') || linhas[0].startsWith('Assunto:'))) {
        tituloDetectado = linhas[0].replace(/^(?:#\s*|Assunto:\s*)/i, '').trim();
      }
    }
  } else if (textoDireto) {
    conteudoBruto = textoDireto.trim();
  }

  // Heurística de UX baseada no conteúdo
  if (!padraoDetectado && conteudoBruto) {
    const lower = conteudoBruto.toLowerCase();
    if (lower.includes('copom') || lower.includes('selic') || lower.includes('sgs') || lower.includes('série') || lower.includes('taxa')) {
      padraoDetectado = 'Painel Analítico & Séries Temporais (SGS)';
    } else if (lower.includes('passo a passo') || lower.includes('como solicitar') || lower.includes('etapas') || lower.includes('med ')) {
      padraoDetectado = 'Serviço ao Cidadão (Stepper .process-list)';
    } else if (lower.includes('resolução') || lower.includes('circular') || lower.includes('diretoria colegiada') || lower.includes('normativo')) {
      padraoDetectado = 'Comunicação Normativa (Layout 70/30 com downloads)';
    } else if (lower.includes('legado') || lower.includes('tabela') || lower.includes('cheque especial')) {
      padraoDetectado = 'Refatoração Semântica de Conteúdo Legado';
    }
  }

  return {
    conteudoBruto,
    tituloDetectado,
    origemDetectada,
    padraoDetectado,
    atosDetectados
  };
}

// 3. Padrões Homologados no BCB Design System
const PADROES_HOMOLOGADOS = [
  'Comunicação Normativa (Layout 70/30 com downloads)',
  'Comunicação Normativa (Layout 70/30)',
  'Painel Analítico & Séries Temporais (SGS)',
  'Painel Analítico de Indicadores',
  'Serviço ao Cidadão (Stepper .process-list)',
  'Guia de Serviço com Stepper',
  'Refatoração Semântica de Conteúdo Legado',
  'Refatoração Semântica em Grid 12'
];

// Ler parâmetros CLI
const caminhoArquivo = getArg('--arquivo', '-a') || getArg('--file', '-f') || getArg('--input', '-i');
const textoDireto = getArg('--texto') || getArg('--raw');

const entrada = normalizarEntrada(caminhoArquivo, textoDireto);

const numero = getArg('--numero', '-n') || getArg('--demanda', '-d') || proximoNumeroDemanda();
let slug = getArg('--slug', '-s') || positionalArgs[0] || (entrada.tituloDetectado ? entrada.tituloDetectado.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `nova-demanda-${numero}`);
let titulo = getArg('--titulo', '-t') || entrada.tituloDetectado || positionalArgs[1] || 'Nova Demanda Institucional';
const padrao = getArg('--padrao', '-p') || entrada.padraoDetectado || 'Comunicação Normativa (Layout 70/30 com downloads)';
const origem = getArg('--origem', '-o') || entrada.origemDetectada || 'Departamento Técnico do Banco Central do Brasil';

// Sanitizar slug
slug = slug
  .toLowerCase()
  .replace(/^--?[a-z]+=/, '')
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/--+/g, '-')
  .replace(/^-|-$/g, '');

// 4. Validação Rigorosa de Insumos da Demanda (Schema Validation)
const errosValidacao = [];

if (!slug || slug.length < 3 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  errosValidacao.push(`Slug inválido: "${slug}". O slug deve estar em kebab-case alfanumérico (ex.: seguranca-pix).`);
}

if (!titulo || titulo.trim().length < 4 || titulo.startsWith('[') || titulo === 'Nova Demanda Institucional' && !textoDireto && !caminhoArquivo) {
  errosValidacao.push(`Título inválido ou genérico: "${titulo}". Forneça um título descritivo oficial.`);
}

if (!origem || origem.trim().length < 3) {
  errosValidacao.push(`Origem / Solicitante inválido: "${origem}". Especifique a área técnica solicitante.`);
}

if (!PADROES_HOMOLOGADOS.includes(padrao)) {
  errosValidacao.push(`Padrão de UX não homologado: "${padrao}".\nPadrões homologados aceitos:\n` +
    PADROES_HOMOLOGADOS.map(p => `     - ${p}`).join('\n'));
}

if (textoDireto !== null && textoDireto !== undefined && textoDireto.trim().length === 0) {
  errosValidacao.push('O texto direto fornecido (--texto / --raw) está vazio.');
}

if (caminhoArquivo && (!entrada.conteudoBruto || entrada.conteudoBruto.trim().length === 0)) {
  errosValidacao.push(`O arquivo "${caminhoArquivo}" não contém dados textuais válidos para processamento.`);
}

if (errosValidacao.length > 0) {
  console.error('\n=======================================================');
  console.error('❌ Rejeição de Demanda — Conteúdo Fora do Schema Acordado');
  console.error('=======================================================');
  errosValidacao.forEach(e => console.error(`   - ${e}`));
  console.error('=======================================================\n');
  process.exit(1);
}

const nomeArquivo = `${numero}-${slug}.md`;
const caminhoArquivoDestino = path.join(DIR_DEMANDAS, nomeArquivo);

// Garantir diretório
if (!fs.existsSync(DIR_DEMANDAS)) {
  fs.mkdirSync(DIR_DEMANDAS, { recursive: true });
}

// Insumo bruto normalizado
const textoBrutoFinal = entrada.conteudoBruto
  ? entrada.conteudoBruto
  : `[Cole aqui o conteúdo bruto recebido: e-mail de diretor, minuta de circular,\ntabela desestruturada, regras normativas ou memorando técnico sem formatação prévia]`;

// Atos regulatórios
const atosTexto = entrada.atosDetectados && entrada.atosDetectados.length > 0
  ? entrada.atosDetectados.map((a, i) => `- **Ato ${i + 1}:** ${a}`).join('\n')
  : `- **Ato 1:** Resolução BCB nº [Número]/2026 — *[Nome Oficial do Ato]* (Formato: PDF, Tamanho: 120 KB).\n- **Ato 2:** Nota Técnica Conjunta DEINF/DSTAT (Formato: PDF, Tamanho: 85 KB).`;

// Scaffold Markdown da Demanda
const template = `# Modelo ${parseInt(numero, 10)}: Demanda de ${titulo}

> **Finalidade:** Utilizar quando a demanda envolver comunicação institucional, serviços digitais ou atos normativos do BCB.

---

### METADADOS DA DEMANDA
- **Origem / Solicitante:** ${origem}
- **Objetivo da Comunicação:** Descrever concisamente o objetivo central deste comunicado, indicador ou serviço para o cidadão e mercado financeiro.
- **Público-Alvo:** Cidadãos, instituições financeiras autorizadas, pesquisadores e imprensa.
- **Padrão de UX Recomendado:** *${padrao}*.

---

### TEXTO BRUTO FORNECIDO PELA ÁREA TÉCNICA
\`\`\`text
${textoBrutoFinal}
\`\`\`

---

### DOCUMENTOS E ATOS REGULATÓRIOS VINCULADOS
${atosTexto}

---

### INSTRUÇÃO AO AGENTE
> "Atue como Especialista em UI/UX do BCB. Diagramar exclusivamente a malha de conteúdo interno desta demanda adotando as diretrizes oficiais de .antigravityrules e da skill gerador-ui-bcb. Salvar o protótipo canônico em prototipos/${slug}.html contendo ESTRITAMENTE o container <main id=\"conteudo-principal\" class=\"bcb-container container py-4 mb-5\"> com H1 único (.bcb-page-title), seções em .bcb-section, grid 12 colunas Bootstrap (.bcb-row e .bcb-col-*) e botão de retorno ao topo. É TERMINANTEMENTE PROIBIDO gerar tags globais (<html>, <head>, <body>, <!DOCTYPE>), casca externa (sem <header>, sem <footer>, sem breadcrumbs) ou estilos inline (style=\"...\")."
`;

fs.writeFileSync(caminhoArquivoDestino, template, 'utf8');

// Opcional: Gerar esqueleto inicial do protótipo em prototipos/<slug>.html se solicitado (--html / --scaffold-html)
const deveGerarHtml = getArg('--html') || getArg('--scaffold-html') || getArg('--prototipo');
const caminhoPrototipoHtml = path.join(RAIZ_PROJETO, 'prototipos', `${slug}.html`);

if (deveGerarHtml && !fs.existsSync(caminhoPrototipoHtml)) {
  const htmlCentralScaffold = `<!-- CONTEÚDO PRINCIPAL (Miolo Semântico Iniciado no H1 Único — Restrito Estritamente ao <main>) -->
<main id="conteudo-principal" class="bcb-container container py-4 mb-5">
    
    <!-- [SLOT CMS: 100% - Abertura Institucional e Lead] -->
    <section class="bcb-section">
        <div class="bcb-row">
            <div class="bcb-col-12">
                <h1 class="bcb-page-title">${titulo}</h1>
                <div class="bcb-page-meta">
                    <span class="tag-bcb primary">Institucional</span>
                    <span>Publicado em: ${new Date().toLocaleDateString('pt-BR')} &bull; ${origem}</span>
                </div>
                <p class="lead mt-3 text-body">
                    [Contextualização executiva do objetivo deste ato normativo, indicador ou serviço público]
                </p>
            </div>
        </div>
    </section>

    <!-- [SLOT CMS: 70% Conteúdo Principal | 30% Sidebar de Apoio] -->
    <section class="bcb-section">
        <div class="bcb-row">
            <div class="bcb-col-12 bcb-col-lg-8 mb-4 mb-lg-0">
                <h2 class="h4 font-weight-bold mb-3 text-bcb-brand">Diretrizes Oficiais</h2>
                <p class="text-body">
                    [Detalhamento técnico da matéria regulatória ou serviço ao cidadão]
                </p>
            </div>
            <div class="bcb-col-12 bcb-col-lg-4">
                <div class="card p-3 border mb-4 bg-bcb-surface">
                    <h2 class="h5 font-weight-bold mb-3 text-bcb-brand">Atos Vinculados</h2>
                    <div class="documentos">
                        <!-- Componentes .documento -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- [NAVEGAÇÃO: Retorno ao Topo Acessível (WCAG 2.4.1)] -->
    <div class="bcb-back-to-top-wrapper text-right mt-5 pt-3 border-top">
        <a href="#conteudo-principal" class="btn btn-outline-secondary btn-sm bcb-btn-back-to-top" aria-label="Voltar ao início do conteúdo desta página">
            <span class="material-symbols-outlined material-icons md-16 align-middle" aria-hidden="true">arrow_upward</span>
            <span>Voltar ao topo</span>
        </a>
    </div>

</main>
`;
  fs.writeFileSync(caminhoPrototipoHtml, htmlCentralScaffold, 'utf8');
  console.log(`🧩 Esqueleto central HTML gerado: prototipos/${slug}.html`);
}

console.log('\n=======================================================');
console.log('✨ BCB Design System — Nova Demanda Criada com Sucesso');
console.log('=======================================================');
console.log(`📄 Arquivo gerado: .docs-ia/exemplos-demandas/${nomeArquivo}`);
console.log(`🏷️  Slug sugerido:  ${slug}`);
console.log(`📌 Número:         ${numero}`);
console.log(`🎨 Padrão UX:      ${padrao}`);
console.log(`🏛️  Origem:         ${origem}`);
console.log('\nPróximos Passos recomendados:');
console.log(`1. Edite ou revise o briefing em: .docs-ia/exemplos-demandas/${nomeArquivo}`);
console.log(`2. Solicite a prototipagem à IA para gerar: prototipos/${slug}.html`);
console.log(`3. Homologue no Harness Split-Screen:`);
console.log(`   prototipos/_harness.html?src=${slug}.html&doc=${nomeArquivo}`);
console.log('=======================================================\n');
