---
name: gerador-ui-bcb
description: Ative esta habilidade SEMPRE que o usuário fornecer um conteúdo em texto bruto, documento ou rascunho e pedir para transformá-lo em uma tela, página ou componente de interface de usuário.
---

# Fluxo de Execução: Gerador de Interface BCB

Quando esta habilidade for invocada, siga rigorosamente os passos abaixo em ordem:

## Passo 1: Análise Estrutural do Conteúdo
- Leia o texto fornecido pelo usuário e identifique as hierarquias de informação.
- Determine qual será o Título Principal (`<h1>`).
- Agrupe parágrafos, identifique listas, tabelas de dados e possíveis ações (que devem virar botões).

## Passo 2: Consulta de Conformidade (Design System)
- Acesse a pasta `/.design-system-docs/`.
- Revise as regras de tipografia em `typography.md` para garantir o tamanho correto dos títulos.
- Consulte `components.md` para verificar qual a classe correta para os links e botões identificados.

## Passo 3: Geração de Código
- Escreva o código (HTML ou componente React, dependendo do framework do projeto atual).
- **Atenção:** Se houver chamadas para ação (CTAs), use o padrão `<a href="..." class="btn btn-primary">`.
- **Atenção:** Se houver avisos ou textos formais, verifique se a classe `.cormorant` é aplicável em algum subtítulo.

## Passo 4: Auditoria de Acessibilidade Automática
Antes de entregar o código final ao usuário, faça uma revisão silenciosa:
- O código possui apenas um `<h1>`?
- Os links possuem texto descritivo?
- Os contrastes (variáveis usadas) estão de acordo com o `tokens.md`?

## Passo 5: Entrega
Apresente o código final e descreva brevemente as decisões de design tomadas com base no Design System do BCB.