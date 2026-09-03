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

    if (fs.existsSync(caminhoResolvido)) {
      const ext = path.extname(caminhoResolvido).toLowerCase();
      const rawContent = fs.readFileSync(caminhoResolvido, 'utf8');

      if (ext === '.json') {
        try {
          const parsed = JSON.parse(rawContent);
          conteudoBruto = parsed.conteudo || parsed.texto || parsed.descricao || JSON.stringify(parsed, null, 2);
          tituloDetectado = parsed.titulo || parsed.title;
          origemDetectada = parsed.origem || parsed.departamento;
          padraoDetectado = parsed.padrao || parsed.padraoUX;
          if (parsed.atos && Array.isArray(parsed.atos)) atosDetectados = parsed.atos;
        } catch (e) {
          conteudoBruto = rawContent;
        }
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
    } else {
      console.warn(`⚠️  Arquivo não encontrado: ${caminhoArquivo}. Prosseguindo com scaffold padrão.`);
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
> "Atue como Especialista em UI/UX do BCB. Diagramar o miolo desta demanda adotando as diretrizes oficiais de .antigravityrules e da skill gerador-ui-bcb. Salvar o protótipo canônico em prototipos/${slug}.html contendo H1 único, grid 12 colunas Bootstrap, breadcrumb semântico e botão de retorno ao topo, isento de cascas externas e sem scripts inline."
`;

fs.writeFileSync(caminhoArquivoDestino, template, 'utf8');

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
