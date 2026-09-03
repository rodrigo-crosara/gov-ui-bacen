# Modelo 2: Demanda de Dados Tabulares & Séries Temporais SGS

> **Finalidade:** Utilizar quando a demanda envolver séries históricas quantitativas, metas econômicas, taxas diárias de câmbio ou índices de inflação.

---

### METADADOS DA DEMANDA
- **Origem / Solicitante:** Departamento de Estatísticas do Banco Central (DSTAT)
- **Objetivo da Comunicação:** Publicar a série histórica das últimas reuniões do Copom com visualização imediata das taxas em vigor e opção de exportação dos dados abertos.
- **Público-Alvo:** Pesquisadores, economistas, instituições autorizadas e cidadãos.
- **Padrão de UX Recomendado:** *Painel Analítico de Indicadores & Tabela Densa SGS*.

---

### DADOS BRUTOS DOS INDICADORES DE TOPO
- **Meta Selic Vigente:** 14,25% a.a. (Variação: +1,00 p.p. desde 13/03/2026)
- **Taxa Selic Efetiva Média:** 14,15% a.a. (Média ponderada do mercado Selic)
- **Meta de Inflação CMN (Centro):** 3,00% a.a. (Intervalo de tolerância: 1,50% a 4,50%)

---

### DADOS BRUTOS DA SÉRIE HISTÓRICA (TABULAR)
```csv
Reuniao;Data_Inicio;Data_Fim;Meta_Taxa_aa;Variacao_pp;Ata_Publicada
268ª;11/03/2026;12/03/2026;14.25;+1.00;Pendente
267ª;28/01/2026;29/01/2026;13.25;0.00;Sim
266ª;10/12/2025;11/12/2025;13.25;-0.25;Sim
265ª;05/11/2025;06/11/2025;13.50;-0.50;Sim
264ª;16/09/2025;17/09/2025;14.00;-0.25;Sim
263ª;29/07/2025;30/07/2025;14.25;+0.25;Sim
```

---

### INSTRUÇÃO AO AGENTE
> "Atue como Especialista em UI/UX do BCB. Diagramar o miolo do painel destacando os 3 números-chave no topo em cards (.bcb-indicator-card) no arranjo 33/33/33 (.bcb-col-md-4) com tendência colorida. Estruturar a série histórica em Data Table acessível com <caption>, thead institucional, alinhamento numérico à direita e bloco de exportação (.bcb-data-export) para CSV e JSON em largura total (.bcb-col-12)."
