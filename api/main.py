from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from supabase import create_client, Client, ClientOptions

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

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
