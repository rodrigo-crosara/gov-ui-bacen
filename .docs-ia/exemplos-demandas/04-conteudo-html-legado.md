# Modelo 4: Demanda de Refatoração de HTML Legado / Conteúdo Desestruturado

> **Finalidade:** Utilizar quando o insumo vier em formato de HTML copiado de e-mails antigos, minutas de CMS obsoleto com tabelas de layout (`<table>` usadas para posicionamento), fontes hardcoded ou estilos inline despadronizados.

---

### METADADOS DA DEMANDA
- **Origem / Solicitante:** Departamento de Comunicação Interna e Externa
- **Objetivo da Demanda:** Modernizar e converter código HTML antigo para a arquitetura semântica oficial do BCB Design System, eliminando tabelas de diagramação e estilos inline.
- **Padrão de UX Recomendado:** *Refatoração Semântica em Grid 12 Colunas (.bcb-row e .bcb-col-*)*.

---

### CÓDIGO HTML BRUTO / LEGADO FORNECIDO
```html
<table width="100%" border="0" cellpadding="10" cellspacing="0" bgcolor="#f5f5f5">
  <tr>
    <td colspan="2">
      <font face="Arial" size="5" color="#003366"><b>ATENÇÃO: Novas Regras de Cheque Especial e Limite de Crédito</b></font><br>
      <font face="Arial" size="2" color="#666666">Publicado em 14/02/2026 pelo Banco Central</font>
    </td>
  </tr>
  <tr>
    <td width="70%" valign="top">
      <p style="font-family: Arial; font-size: 14px; color: #333333; line-height: 1.6;">
        O Banco Central estabeleceu novas diretrizes para a contratação e manutenção do limite de cheque especial 
        para pessoas físicas e microempresas. As instituições financeiras ficam obrigadas a emitir alerta prévio 
        quando o correntista entrar no limite emergencial, oferecendo alternativa de parcelamento com juros reduzidos.
      </p>
      <div style="background-color: #fff3cd; border: 1px solid #ffeeba; padding: 15px; color: #856404; margin: 15px 0;">
        <b>IMPORTANTE:</b> O banco não pode cobrar tarifa de disponibilização para limites de crédito contratados até R$ 500,00.
      </div>
      <p style="font-family: Arial; font-size: 14px; color: #333333;">
        Caso o consumidor utilize mais de 15% do limite por 30 dias consecutivos, o banco deverá obrigatoriamente 
        apresentar propostas de renegociação no extrato e aplicativo.
      </p>
    </td>
    <td width="30%" valign="top" bgcolor="#e9ecef" style="padding: 15px;">
      <font face="Arial" size="3" color="#003366"><b>DOCUMENTOS RELACIONADOS</b></font>
      <hr color="#003366">
      <p><a href="/normas/res4920.pdf" style="color: #0066cc;">Resolução BCB 4.920 (PDF)</a></p>
      <p><a href="/normas/faq-cheque.pdf" style="color: #0066cc;">Perguntas e Respostas (PDF)</a></p>
    </td>
  </tr>
</table>
```

---

### INSTRUÇÃO AO AGENTE
> "Atue como Especialista em UI/UX do BCB. Converter este HTML legado em um miolo semântico moderno e acessível: substituir as tabelas de layout pelo Grid de 12 colunas do BCB em arranjo 70/30 (.bcb-col-12.bcb-col-lg-8 e .bcb-col-12.bcb-col-lg-4), converter a fonte e cores antigas para a tipografia oficial e variáveis CSS do Manual de Marca, transformar o aviso inline em um .callout.callout-warning acessível, e estruturar os links da barra lateral como cards canônicos de download (.documentos .documento)."
