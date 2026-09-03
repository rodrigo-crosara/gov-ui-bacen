# Modelo 5: Demanda de Entrada Não Estruturada (E-mail Corporativo & Cópia do DOU)

> **Finalidade:** Utilizar quando o insumo recebido da área técnica for um texto bruto desestruturado, como o encaminhamento de uma thread de e-mail interno, despacho ministerial, minuta de processo SEI ou extrato copiado diretamente do Diário Oficial da União (DOU) com cabeçalhos burocráticos e notas de rodapé misturadas.

---

### METADADOS DA DEMANDA EXTRAÍDOS DO INSUMO
- **Origem / Solicitante:** Gabinete da Diretoria de Regulação (DINOR) / Secretaria do Comef
- **Objetivo da Demanda:** Publicar no portal a decisão do Comitê de Estabilidade Financeira (Comef) que fixou o Adicional Contracíclico de Capital Principal do Brasil (ACCPBrasil) e estabeleceu novos prazos de adequação prudencial para conglomerados bancários.
- **Público-Alvo:** Diretorias de risco das instituições financeiras, analistas prudenciais e pesquisadores do sistema financeiro.
- **Padrão de UX Recomendado:** *Comunicação Regulatória com Metadados Normativos, Indicadores Avançados e Layout Modular 70/30*.

---

### TEXTO BRUTO FORNECIDO PELA ÁREA TÉCNICA (THREAD DE E-MAIL COM EXTRATO DOU)
```text
De: silva.reg@bcb.gov.br
Enviada em: segunda-feira, 2 de março de 2026 18:42
Para: webdesign.portal@bcb.gov.br
Assunto: FWD: URGENTE: Publicar no portal - Deliberação Comef DOU de hoje

Colegas do Webdesign,
Favor subir no portal a deliberação aprovada hoje no Comef conforme texto que saiu no Diário Oficial. 
Importante deixar bem destacado o percentual do ACCPBrasil que subiu para 0,50% e o prazo limite de adequação 
de 12 meses para os bancos do Segmento 1 (S1). 
Seguem os dados brutos copiados da publicação oficial:

--- INÍCIO DA CÓPIA DO DIÁRIO OFICIAL DA UNIÃO (DOU Seção 1, 02/03/2026, p. 118) ---
BANCO CENTRAL DO BRASIL
DIRETORIA COLEGIADA
RESOLUÇÃO BCB Nº 492, DE 2 DE MARÇO DE 2026
Processo Eletrônico nº 24.0.000109283-4

O Comitê de Estabilidade Financeira (Comef) do Banco Central do Brasil, no uso das atribuições que lhe conferem os arts. 9º e 15 do Regimento Interno, resolve:
Art. 1º Fixar o valor do Adicional Contracíclico de Capital Principal relativo ao Brasil (ACCPBrasil) em 0,50% (cinquenta centésimos por cento).
Parágrafo único. O percentual de que trata o caput aplica-se sobre o montante dos ativos ponderados pelo risco (RWA) dos conglomerados prudenciais enquadrados nos Segmentos 1 (S1) e 2 (S2).
Art. 2º As instituições financeiras deverão comprovar a observância ao novo requerimento no prazo impreterível de 12 (doze) meses contados a partir da data de publicação desta Resolução.
Art. 3º O Comef avalia que o ambiente de crédito no Sistema Financeiro Nacional (SFN) permanece resiliente, com níveis adequados de liquidez e provisões, justificando a ativação prudencial do colchão de capital contracíclico diante da aceleração no ritmo de concessões corporativas.
Art. 4º Fica revogada a Resolução BCB nº 398, de 14 de agosto de 2024.
Art. 5º Esta Resolução entra em vigor na data de sua publicação.

(assinado eletronicamente)
DIRETOR DE REGULAÇÃO DO BANCO CENTRAL DO BRASIL
--- FIM DA CÓPIA ---

Anexos:
- Deliberacao_Comef_Res492.pdf (PDF oficial assinado, 210 KB)
- Quadro_Metodologico_ACCP.xlsx (Planilha de parâmetros técnicos, 95 KB)
```

---

### TRATAMENTO E MAPEAMENTO HEURÍSTICO PARA COMPONENTES CENTRAIS
A partir da análise do texto bruto, o intake identifica e organiza a arquitetura de blocos:

1. **Abertura e H1 Canônico:**
   - Título oficial: *"Resolução BCB nº 492: Fixação do Adicional Contracíclico de Capital (ACCPBrasil)"* com tag `.tag-bcb.primary` (*"Estabilidade Financeira"*).
2. **Bloco de Metadados Normativos (`.bcb-norm-metadata`):**
   - Extração da vigência (*"Vigente a partir de 02/03/2026"*), autoridade (*"Comef / Diretoria Colegiada"*), processo SEI e revogação expressa (*"Revoga Resolução nº 398/2024"*).
3. **Indicador Financeiro Avançado (`.bcb-indicator-card--advanced`):**
   - Destaque imediato do valor de 0,50% do ACCPBrasil com badge *"Ativação Prudencial"* e nota de aplicação sobre o RWA dos segmentos S1 e S2.
4. **Layout 70/30 Modular:**
   - **Coluna Editorial (70%):** Lead explicativo, transcrição resumida dos artigos, callout de prazo de adequação (12 meses) e síntese da avaliação de risco do Comef.
   - **Coluna Lateral (30%):** Quadro de arquivos vinculados para download (`.documentos .documento`) com PDF e planilha de parâmetros.
5. **Navegação de Retorno ao Topo:**
   - Link acessível `#conteudo-principal` em `.bcb-back-to-top-wrapper`.

---

### INSTRUÇÃO AO AGENTE
> "Atue como Especialista em UI/UX do BCB. Processar esta entrada não estruturada (cópia de e-mail com extrato do DOU) e convertê-la exclusivamente no corpo central de conteúdo acessível da página, iniciando diretamente em <main id=\"conteudo-principal\" class=\"bcb-container container py-4 mb-5\"> com H1 único (.bcb-page-title) e encerrando em </main> com botão de retorno ao topo. Incluir o bloco de metadados normativos (.bcb-norm-metadata) com identificação do ato e situação de vigência, card de indicador financeiro avançado (.bcb-indicator-card--advanced) com o percentual de 0,50% do ACCPBrasil, layout 70/30 com callout de advertência para o prazo de 12 meses e coluna lateral com os 2 arquivos para download (.documentos .documento). É terminantemente proibido incluir tags de documento completo (<html>, <head>, <body>, <!DOCTYPE>), tags <script>, cascas externas (<header>, <footer>, breadcrumbs) ou estilos inline (style=\"...\")."
