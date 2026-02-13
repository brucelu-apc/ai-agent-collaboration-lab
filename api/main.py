from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

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
supabase: Client = create_client(url, key)

@app.get("/")
async def root():
    return {"message": "AI Agent Collaboration API is running", "status": "healthy"}

@app.get("/agents/status")
async def get_agents_status():
    # Placeholder for fetching agent status from DB or local state
    return {
        "agents": [
            {"id": "dango-1", "name": "小糰子1號", "status": "online"},
            {"id": "dango-2", "name": "小糰子2號", "status": "online"},
            {"id": "dango-3", "name": "小糰子3號", "status": "online"}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
