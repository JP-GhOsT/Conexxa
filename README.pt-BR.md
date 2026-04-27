# Integração Azure DevOps MCP

🇺🇸 For the English version, see [README.md](README.md)

## Visão Geral

Este projeto utiliza o Azure DevOps MCP (Model Context Protocol) Server para integrar assistentes de IA, como o GitHub Copilot, diretamente ao Azure DevOps. Essa integração permite uma interação inteligente e baseada em evidências com artefatos do projeto, incluindo backlog, work items, boards, repositórios e pipelines.

O assistente de IA foi configurado para operar seguindo princípios rigorosos de engenharia e análise:

* Integridade e precisão factual
* Raciocínio baseado em evidências fundamentado nos dados do projeto
* Análise neutra e imparcial
* Comunicação clara e técnica
* Avaliação minuciosa de todas as informações disponíveis
* Raciocínio passo a passo para garantir rastreabilidade
* Uso eficaz das ferramentas disponíveis
* Reutilização automática do contexto já estabelecido no projeto

## Benefícios

* Criar e gerenciar work items diretamente pelo chat com IA
* Analisar o backlog utilizando dados reais do projeto
* Automatizar a criação de user stories, tarefas e bugs
* Melhorar o refinamento e a priorização do backlog
* Reduzir trabalho manual repetitivo
* Aumentar a produtividade e a consistência da equipe
* Garantir que as análises sejam fundamentadas em dados reais do Azure DevOps

## Estrutura do Repositório

```text
.vscode/
└── mcp.json

.github/
└── copilot-instructions.md
```

## Configuração do MCP

O arquivo `.vscode/mcp.json` configura o servidor Azure DevOps MCP para o Visual Studio Code.

### Exemplo de Configuração

```json
{
  "inputs": [
    {
      "id": "ado_org",
      "type": "promptString",
      "description": "Nome da organização no Azure DevOps"
    }
  ],
  "servers": {
    "ado": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@azure-devops/mcp",
        "${input:ado_org}"
      ]
    }
  }
}
```

## Princípios Operacionais da IA

O assistente de IA que interage com o Azure DevOps deve seguir os seguintes princípios:

1. **Integridade** – Nunca distorcer, omitir ou manipular informações.
2. **Análise Baseada em Evidências** – Basear todas as conclusões estritamente nos dados do Azure DevOps ou em informações explicitamente fornecidas pelo usuário.
3. **Neutralidade** – Manter objetividade e evitar suposições não fundamentadas.
4. **Execução Focada** – Permanecer totalmente alinhado à solicitação do usuário.
5. **Clareza Técnica** – Utilizar linguagem precisa e profissional.
6. **Minuciosidade** – Avaliar todos os work items e seus relacionamentos relevantes.
7. **Raciocínio Passo a Passo** – Apresentar análises em uma sequência lógica e rastreável.
8. **Melhoria Contínua** – Incorporar feedback para aprimorar análises futuras.
9. **Uso de Ferramentas** – Utilizar os recursos do Azure DevOps MCP sempre que aplicável.
10. **Reutilização de Contexto** – Reutilizar automaticamente identificadores já estabelecidos, como nome do projeto, equipe ou backlog.

## Instruções de Configuração

1. Clone este repositório.
2. Abra o projeto no Visual Studio Code.
3. Certifique-se de que o Node.js está instalado.
4. Quando solicitado, informe o nome da sua organização no Azure DevOps.
5. Autentique-se com sua conta do Azure DevOps.
6. Comece a utilizar interações com Azure DevOps assistidas por IA.

## Boas Práticas de Segurança

* Nunca envie Personal Access Tokens (PATs) ao repositório.
* Nunca armazene credenciais no controle de versão.
* Utilize autenticação individual para cada membro da equipe.
* Adicione arquivos sensíveis ao `.gitignore`.

### Entradas Recomendadas no `.gitignore`

```gitignore
.env
.azure-devops.json
```

## Exemplos de Prompts para IA

### Análise de Backlog

* Analyze the Conexxa backlog and identify missing or incomplete user stories.
* Review the backlog for duplicated or overlapping items.
* Evaluate user stories against INVEST criteria.
* Identify dependencies, risks, and prioritization opportunities.

### Criação de Work Items

* Create a user story for password recovery.
* Create a task for implementing the login API.
* Create a bug for invalid login error handling.

## Por que Utilizar Esta Integração?

Essa configuração transforma a IA de uma assistente passiva em uma parceira ativa de engenharia e gestão de projetos. Em vez de apenas gerar sugestões, a IA pode interagir diretamente com o Azure DevOps, analisar dados reais do projeto e fornecer recomendações confiáveis, rastreáveis e contextualizadas.

## Observação Importante

Esta integração é opcional para avaliação acadêmica, mas demonstra práticas avançadas de DevOps, integração com IA e engenharia de software moderna.

---

## Contribuidores

- João Paulo Zimmermann Matsui - [GitHub](https://github.com/JP-GhOsT) | [LinkedIn](https://linkedin.com/in/joaomatsui)
- Gustavo Sena de Souza - [GitHub](https://github.com/gustavosena025-dotcom) | [LinkedIn](https://www.linkedin.com/in/gustavo-sena-ads-ia/)
- Robson dos Santos Damasceno Lisboa - [GitHub](https://github.com/RobsonDamsceno) | [LinkedIn](https://www.linkedin.com/in/robson-damasceno-b35954356/)
- Caio dos Santos Gregorio da Rocha - [GitHub](https://github.com/caioogregorio) | [LinkedIn](https://www.linkedin.com/in/caioogregorio/)
- Diego Mathias da Fonseca - [GitHub](https://github.com/diegomathiasdev) | [LinkedIn](https://www.linkedin.com/in/diegomathiasdafonseca/)

---

**Projeto:** Conexxa  
**Plataforma:** Azure DevOps  
**Integração:** Azure DevOps MCP + Assistente de IA