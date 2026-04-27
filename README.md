# Azure DevOps MCP Integration

🇧🇷 Para a versão em português, veja [README.pt-BR.md](README.pt-BR.md)

## Overview

This project uses the Azure DevOps MCP (Model Context Protocol) Server to integrate AI assistants, such as GitHub Copilot, directly with Azure DevOps. This integration enables intelligent, evidence-based interaction with project artifacts, including backlogs, work items, boards, repositories, and pipelines.

The AI assistant is configured to operate under strict engineering and analytical principles:

* Integrity and factual accuracy
* Evidence-based reasoning grounded in project data
* Neutral and unbiased analysis
* Clear, technical communication
* Thorough evaluation of all available information
* Step-by-step reasoning for traceability
* Effective use of available tools
* Automatic reuse of established project context

## Benefits

* Create and manage work items directly from AI chat
* Analyze the backlog using real project data
* Automate the creation of user stories, tasks, and bugs
* Improve backlog refinement and prioritization
* Reduce repetitive manual work
* Increase team productivity and consistency
* Ensure analysis is grounded in actual Azure DevOps data

## Repository Structure

```text
.vscode/
└── mcp.json

.github/
└── copilot-instructions.md
```

## MCP Configuration

The `.vscode/mcp.json` file configures the Azure DevOps MCP server for Visual Studio Code.

### Example Configuration

```json
{
  "inputs": [
    {
      "id": "ado_org",
      "type": "promptString",
      "description": "Azure DevOps organization name"
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

## AI Operating Principles

The AI assistant interacting with Azure DevOps must adhere to the following principles:

1. **Integrity** – Never distort, omit, or manipulate information.
2. **Evidence-Based Analysis** – Base all conclusions strictly on Azure DevOps data or explicit user input.
3. **Neutrality** – Maintain objectivity and avoid unsupported assumptions.
4. **Focused Execution** – Remain aligned with the user's request.
5. **Technical Clarity** – Use precise and professional language.
6. **Thoroughness** – Evaluate all relevant work items and relationships.
7. **Step-by-Step Reasoning** – Present analyses in a logical, traceable sequence.
8. **Continuous Improvement** – Incorporate feedback to refine future analyses.
9. **Tool Utilization** – Use Azure DevOps MCP capabilities whenever applicable.
10. **Context Reuse** – Automatically reuse established project identifiers such as project name, team, or backlog.

## Setup Instructions

1. Clone this repository.
2. Open the project in Visual Studio Code.
3. Ensure Node.js is installed.
4. When prompted, enter your Azure DevOps organization name.
5. Authenticate with your Azure DevOps account.
6. Start using AI-powered Azure DevOps interactions.

## Security Best Practices

* Never commit Personal Access Tokens (PATs).
* Never store credentials in source control.
* Use individual authentication for each team member.
* Add sensitive files to `.gitignore`.

### Recommended `.gitignore` Entries

```gitignore
.env
.azure-devops.json
```

## Example AI Prompts

### Backlog Analysis

* Analyze the Conexxa backlog and identify missing or incomplete user stories.
* Review the backlog for duplicated or overlapping items.
* Evaluate user stories against INVEST criteria.
* Identify dependencies, risks, and prioritization opportunities.

### Work Item Creation

* Create a user story for password recovery.
* Create a task for implementing the login API.
* Create a bug for invalid login error handling.

## Why Use This Integration?

This setup transforms AI from a passive assistant into an active engineering and project management companion. Instead of only generating suggestions, the AI can interact directly with Azure DevOps, analyze real project data, and provide reliable, traceable, and context-aware recommendations.

## Important Note

This integration is optional for academic evaluation but demonstrates advanced DevOps, AI integration, and modern software engineering practices.

---

## Contributors

- João Paulo Zimmermann Matsui - [GitHub](https://github.com/JP-GhOsT) | [Linkedin](https://linkedin.com/in/joaomatsui)
- Gustavo Sena de Souza - [GitHub](https://github.com/gustavosena025-dotcom) | [Linkedin](https://www.linkedin.com/in/gustavo-sena-ads-ia/)
- Robson dos Santos Damasceno Lisboa - [GitHub](https://github.com/RobsonDamsceno) | [Linkedin](https://www.linkedin.com/in/robson-damasceno-b35954356/)
- Caio dos Santos Gregorio da Rocha - [GitHub](https://github.com/caioogregorio) | [Linkedin](https://www.linkedin.com/in/caioogregorio/)
- Diego Mathias da Fonseca - [GitHub](https://github.com/diegomathiasdev) | [Linkedin](https://www.linkedin.com/in/diegomathiasdafonseca/)

---

**Project:** Conexxa
**Platform:** Azure DevOps
**Integration:** Azure DevOps MCP + AI Assistant
