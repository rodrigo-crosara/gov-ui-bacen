#!/usr/bin/env node

/**
 * =========================================================================
 * BCB Design System — Gerador CLI de Demandas Estruturadas
 * =========================================================================
 * Cria o scaffold padronizado de uma nova demanda da área de negócio em
 * .docs-ia/exemplos-demandas/<numero>-<slug>.md para processamento pela IA.
 *
 * Uso:
 *   node scripts/nova-demanda.js --numero 05 --slug credito-rural --titulo "Crédito Rural"
 *   npm run demanda:criar -- --slug nova-regulacao --titulo "Regulação Cambial"
 * =========================================================================
 */

const fs = require('fs');
const path = require('path');

const RAIZ_PROJETO = path.resolve(__dirname, '..');
const DIR_DEMANDAS = path.join(RAIZ_PROJETO, '.docs-ia', 'exemplos-demandas');

// 1. Processamento de Argumentos
const rawArgs = process.argv.slice(2).filter(a => a !== '--');
const positionalArgs = rawArgs.filter(a => !a.startsWith('-'));

function getArg(flag, alias, defaultValue = null) {
  for (let i = 0; i < rawArgs.length; i++) {
    if (rawArgs[i] === flag || rawArgs[i] === alias) {
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

const numero = getArg('--numero', '-n') || getArg('--demanda', '-d') || proximoNumeroDemanda();
let slug = getArg('--slug', '-s') || positionalArgs[0] || `nova-demanda-${numero}`;
let titulo = getArg('--titulo', '-t') || positionalArgs[1] || 'Nova Demanda Institucional';
const padrao = getArg('--padrao', '-p') || 'Comunicação Normativa (Layout 70/30)';
const origem = getArg('--origem', '-o') || 'Departamento Técnico do Banco Central do Brasil';

// Sanitizar slug
slug = slug
  .toLowerCase()
  .replace(/^--?[a-z]+=/, '')
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/--+/g, '-')
  .replace(/^-|-$/g, '');

const nomeArquivo = `${numero}-${slug}.md`;
const caminhoArquivo = path.join(DIR_DEMANDAS, nomeArquivo);

// Garantir diretório
if (!fs.existsSync(DIR_DEMANDAS)) {
  fs.mkdirSync(DIR_DEMANDAS, { recursive: true });
}

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
[Cole aqui o conteúdo bruto recebido: e-mail de diretor, minuta de circular,
tabela desestruturada, regras normativas ou memorando técnico sem formatação prévia]
\`\`\`

---

### DOCUMENTOS E ATOS REGULATÓRIOS VINCULADOS
- **Ato 1:** Resolução BCB nº [Número]/2026 — *[Nome Oficial do Ato]* (Formato: PDF, Tamanho: 120 KB).
- **Ato 2:** Nota Técnica Conjunta DEINF/DSTAT (Formato: PDF, Tamanho: 85 KB).

---

### INSTRUÇÃO AO AGENTE
> "Atue como Especialista em UI/UX do BCB. Diagramar o miolo desta demanda adotando as diretrizes oficiais de .antigravityrules e da skill gerador-ui-bcb. Salvar o protótipo canônico em prototipos/${slug}.html contendo H1 único, grid 12 colunas, breadcrumb semântico e botão de retorno ao topo, isento de cascas externas e sem scripts inline."
`;

fs.writeFileSync(caminhoArquivo, template, 'utf8');

console.log('\n=======================================================');
console.log('✨ BCB Design System — Nova Demanda Criada com Sucesso');
console.log('=======================================================');
console.log(`📄 Arquivo gerado: .docs-ia/exemplos-demandas/${nomeArquivo}`);
console.log(`🏷️  Slug sugerido:  ${slug}`);
console.log(`📌 Número:         ${numero}`);
console.log('\nPróximos Passos recomendados:');
console.log(`1. Edite o briefing em: .docs-ia/exemplos-demandas/${nomeArquivo}`);
console.log(`2. Solicite a prototipagem à IA para gerar: prototipos/${slug}.html`);
console.log(`3. Homologue no Harness Split-Screen:`);
console.log(`   prototipos/_harness.html?src=${slug}.html&doc=${nomeArquivo}`);
console.log('=======================================================\n');
