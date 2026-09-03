# Modelo 3: Demanda de Serviço ao Cidadão & Guia com Stepper

> **Finalidade:** Utilizar quando a demanda envolver serviços públicos digitais do BCB, solicitações de cidadãos, requerimentos com etapas ordenadas e alertas preventivos contra fraudes.

---

### METADADOS DA DEMANDA
- **Origem / Solicitante:** Departamento de Atendimento Institucional (DEATI) / Gerência do Pix
- **Objetivo da Comunicação:** Explicar ao cidadão como contestar transações fraudulentas via Mecanismo Especial de Devolução (MED) do Pix, ressaltando que o BCB não cobra taxas nem solicita senhas.
- **Público-Alvo:** Pessoas físicas, correntistas bancários e usuários do Pix.
- **Padrão de UX Recomendado:** *Guia de Serviço com Stepper Sequencial, Alertas Críticos e FAQ*.

---

### INSUMO BRUTO COM ETAPAS E REGRAS
```text
Nome do Serviço: Mecanismo Especial de Devolução (MED) do Pix

O que é: O MED é a ferramenta criada pelo Banco Central para facilitar a devolução de valores em 
casos de suspeita fundada de fraude ou golpe envolvendo o Pix.

Quem tem direito: Qualquer pessoa física que tenha sido vítima de golpe ou transferência via Pix 
induzida por fraude ou engenharia social. Não cobre desacordos comerciais (ex: comprou mercadoria e não gostou).

Como solicitar (Etapas obrigatórias):
1. Registro imediato da infração no banco: Você deve procurar o banco ou instituição de onde o 
   Pix foi enviado em até 80 dias contados a partir da data da transação e solicitar a abertura de contestação via MED.
2. Análise e bloqueio cautelar: O banco recebedor do dinheiro analisa o alerta e pode bloquear cautelarmente 
   os recursos da conta de destino por até 72 horas para verificação.
3. Conclusão da análise: Se a fraude for comprovada pela perícia bancária, o valor é estornado 
   integral ou parcialmente para a sua conta em até 96 horas.

Aviso Crítico de Segurança:
O Banco Central NUNCA entra em contato por WhatsApp, e-mail ou telefone para negociar devoluções de Pix. 
Nenhum servidor do BCB está autorizado a solicitar senhas, tokens ou dados de cartão. O processo é 
sempre feito diretamente pelo aplicativo do seu próprio banco. Não pague nenhuma taxa para liberar valores!

Dúvidas frequentes:
- O que acontece se a conta golpista já estiver sem saldo? O MED tenta monitorar novos ingressos por determinado período.
- Posso pedir o MED em caso de erro na chave digitada? Não. O MED é exclusivo para fraudes. Erro de digitação deve ser resolvido amigavelmente com o recebedor.
```

---

### INSTRUÇÃO AO AGENTE
> "Atue como Especialista em UI/UX do BCB. Diagramar exclusivamente o corpo central de conteúdo do serviço, iniciando diretamente em <main id=\"conteudo-principal\" class=\"bcb-container container py-4 mb-5\"> com H1 único (.bcb-page-title) e encerrando em </main> com botão de retorno ao topo. Incluir abertura institucional em 100%, stepper sequencial (<ol class=\"process-list\">) numerado com as 3 etapas de solicitação, callout de alerta de segurança elevado (.callout.callout-warning.callout-elevated) com alto contraste destacando o aviso contra golpes, e seção final de dúvidas com acordeão acessível (.accordion.modelo-1). É terminantemente proibido incluir tags de documento completo (<html>, <head>, <body>, <!DOCTYPE>), tags <script>, cascas externas (<header>, <footer>, breadcrumbs) ou estilos inline (style=\"...\")."
