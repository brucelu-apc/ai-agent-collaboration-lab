# AI Agent & Human Collaboration Lab 👨‍💻🤝🤖

This repository serves as a demonstration and playground for **Human-AI Partnership** and **Multi-Agent Orchestration** within the OpenClaw ecosystem.

## 🎯 Objectives
- **Human-AI Synergy**: Showcase how 米爸 and AI agents (Dango series) collaborate on complex tasks.
- **Task Delegation**: Demonstrate effective handoffs between human intent and agent execution.
- **Multi-Agent Support**: Use multiple specialized agents to support human-led projects.
- **Infrastructure**: Explore cross-node communication via Tailscale to enable collaboration anywhere.

## 🛠 Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS (Deployed on **Vercel**)
- **Backend**: Python (FastAPI) (Containerized or Serverless)
- **Database**: **Supabase** (PostgreSQL + Auth + RLS)
- **VCS**: GitHub

## 🏗 Project Structure
- `/web`: React frontend.
- `/api`: FastAPI backend.
- `/patterns`: Documentation of Human-AI collaboration workflows.
- `/docs`: Project documentation and guides.

## 🚀 Getting Started
### Frontend
```bash
cd web
npm install
npm run dev
```

### Backend
```bash
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🚀 Collaboration Patterns
1. **Interactive Refinement**: Human provides a vision, Agent drafts, and they iterate together.
2. **Execution Handoff**: Human defines the SPEC, Agent builds, Human verifies.
3. **Multi-Node Support**: Human interacts with a central "Brain" (Gateway) that orchestrates nodes (Dango 1 & 2) for heavy lifting.

---
*Created by 米爸 & 小糰子3號*
