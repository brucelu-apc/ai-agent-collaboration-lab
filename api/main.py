from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from supabase import create_client, Client, ClientOptions
from pydantic import BaseModel

load_dotenv(override=True)

print(f"ENV DEBUG: URL={os.environ.get('SUPABASE_URL')}")

app = FastAPI(title="AI Agent Collaboration API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Setup
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

print(f"DEBUG: URL={url}")
print(f"DEBUG: KEY={key[:20]}...")

# Use 'ai_agent_lab' schema for isolation
supabase: Client = create_client(url, key, options=ClientOptions(schema="ai_agent_lab"))

class TaskCreate(BaseModel):
    title: str
    status: str = "pending"

@app.get("/")
async def root():
    return {"message": "AI Agent Collaboration API is running", "status": "healthy"}

@app.get("/agents/status")
async def get_agents_status():
    try:
        response = supabase.table("agents").select("*").execute()
        return {"agents": response.data}
    except Exception as e:
        print(f"ERROR: {e}")
        return {"error": str(e), "agents": []}

@app.get("/tasks")
async def get_tasks():
    try:
        response = supabase.table("tasks").select("*").order("created_at", desc=True).limit(10).execute()
        return {"tasks": response.data}
    except Exception as e:
        print(f"ERROR: {e}")
        return {"error": str(e), "tasks": []}

@app.post("/tasks")
async def create_task(task: TaskCreate):
    try:
        # Get the dango-3 agent id as default assignment
        agent_res = supabase.table("agents").select("id").eq("node_id", "dango-3").execute()
        agent_id = agent_res.data[0]['id'] if agent_res.data else None

        data = {
            "title": task.title,
            "status": task.status,
            "assigned_to": agent_id,
            "created_by": "human (web)"
        }
        response = supabase.table("tasks").insert(data).execute()
        return {"status": "success", "task": response.data}
    except Exception as e:
        print(f"ERROR creating task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
