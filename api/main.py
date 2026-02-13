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
        # Fallback to hardcoded for UI testing if table doesn't exist yet
        return {
            "error": str(e),
            "agents": [
                {"id": "dango-1", "name": "小糰子1號 (Fallback)", "status": "online"},
                {"id": "dango-2", "name": "小糰子2號 (Fallback)", "status": "online"}
            ]
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
