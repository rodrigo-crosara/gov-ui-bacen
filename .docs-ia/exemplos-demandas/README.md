# Catálogo de Modelos de Demanda (Briefings de Intake para IA)

Este diretório contém os **modelos canônicos de ingestão de dados** utilizados pela equipe de Webdesign do Banco Central do Brasil.

O fluxo de trabalho estabelecido é:
```
[Área Técnica do BCB] 
       ↓ (minuta, e-mail ou planilha crua)
[Webdesigner de Plantão] 
       ↓ (qualifica o objetivo, público e dados essenciais segundo estes modelos)
[Agente IA / Construtor de Prompts] 
       ↓ (analisa a semântica, escolhe os componentes ideais e projeta o layout)
[Protótipo de Alta Fidelidade (HTML5/CSS)]
```

---

## 📁 Modelos Disponíveis

| Arquivo | Cenário de Uso | Padrão de UX Gerado | Componentes Típicos |
|---|---|---|---|
| [`01-comunicado-normativo.md`](./01-comunicado-normativo.md) | Decisões do Copom, minutas do Pix, circulares e comunicados à imprensa | **Comunicação Normativa (70/30)** | Lead editorial, citações em bloco, callouts regulatórios e downloads (.documento) |
| [`02-dados-sgs-indicadores.md`](./02-dados-sgs-indicadores.md) | Séries do Sistema Gerenciador de Séries Temporais (SGS), metas de inflação e taxas | **Painel Analítico de Indicadores** | Cards de indicadores (33/33/33 ou 50/50), filtros e Data Table com exportação CSV/JSON |
| [`03-servico-passo-a-passo.md`](./03-servico-passo-a-passo.md) | Serviços ao cidadão (Registrato, Valores a Receber, MED, canais de atendimento) | **Guia de Serviço com Stepper** | Process List ordenada, callouts elevados de segurança (antifraude) e acordeão de dúvidas |
| [`04-conteudo-html-legado.md`](./04-conteudo-html-legado.md) | Conversão de tabelas de layout e HTML antigo de e-mails ou CMS legado | **Refatoração Semântica em Grid 12** | Substituição de tabelas de apresentação por `.bcb-row` e `.bcb-col-*` nativas |

---

## 🛠️ Como Utilizar no Dia a Dia

1. **Escolha o modelo correspondente** à demanda recebida da área de negócio.
2. **Preencha os campos estruturados** (Origem, Objetivo, Público-Alvo, Texto/Dados e Anexos).
3. **Cole o briefing no chat do agente** ou alimente o Construtor de Prompts em `pages/automacao-ia.html`.
4. **O agente conceberá o miolo semântico** no grid oficial de 12 colunas, 100% livre de cascas externas redundantes e pronto para o CMS do portal.
