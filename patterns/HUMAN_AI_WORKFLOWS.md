# Human-AI Collaboration Patterns 👨‍💻🤝🤖

This document outlines the specific ways **米爸** and **小糰子 (Dango)** agents work together to achieve goals.

## 1. The "Architect & Builder" Pattern
- **Role (Human)**: Defines the vision, high-level architecture, and specific requirements (SPEC).
- **Role (Agent)**: Implements the code, creates files, and handles repetitive boilerplate.
- **Workflow**:
  1. Human: "Build a stock tracker with these requirements..."
  2. Agent: Drafts a technical SPEC.
  3. Human: Reviews and approves.
  4. Agent: Executes implementation.

## 2. The "Researcher & Synthesizer" Pattern
- **Role (Human)**: Defines the research topic and target questions.
- **Role (Agent)**: Searches the web, reads documentation, and synthesizes findings into a digestible report.
- **Workflow**:
  1. Human: "What are the best practices for Tailscale node security?"
  2. Agent: Performs `web_search` and `web_fetch`.
  3. Agent: Presents a summary with actionable recommendations.

## 3. The "Guardian & Operator" Pattern
- **Role (Human)**: Sets safety boundaries and risk tolerance.
- **Role (Agent)**: Monitors system health, performs security audits, and suggests hardening steps.
- **Workflow**:
  1. Human: "Audit my OpenClaw setup."
  2. Agent: Runs `healthcheck` and identifies risks.
  3. Human: Approves specific fixes.
  4. Agent: Applies changes.

## 4. The "Multi-Node Delegation" Pattern
- **Role (Human)**: Interacts with the primary Gateway agent (Dango 3).
- **Role (Primary Agent)**: Orchestrates tasks to remote nodes (Dango 1 & 2) based on capability or physical location.
- **Workflow**:
  1. Human: "Run this heavy data analysis on the server node."
  2. Dango 3: Dispatches task to Dango 1.
  3. Dango 1: Completes task and reports back.
  4. Dango 3: Presents final results to Human.
