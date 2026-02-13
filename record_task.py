import argparse
import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client, ClientOptions

def main():
    parser = argparse.ArgumentParser(description="Record a task to Supabase from Telegram.")
    parser.add_argument("--title", required=True, help="Task title")
    parser.add_argument("--status", default="running", help="Task status")
    
    args = parser.parse_args()

    # Load env from the lab's API folder
    env_path = os.path.join(os.path.dirname(__file__), "api", ".env")
    load_dotenv(env_path, override=True)
    
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    
    if not url or not key:
        print("Error: Supabase credentials not found.")
        sys.exit(1)

    try:
        supabase = create_client(url, key, options=ClientOptions(schema="ai_agent_lab"))
        
        # Get the dango-3 agent id
        agent_res = supabase.table("agents").select("id").eq("node_id", "dango-3").execute()
        agent_id = agent_res.data[0]['id'] if agent_res.data else None

        data = {
            "title": args.title,
            "status": args.status,
            "assigned_to": agent_id,
            "created_by": "human (telegram)"
        }
        
        supabase.table("tasks").insert(data).execute()
        print(f"Reflected task on web: {args.title}")
        
    except Exception as e:
        print(f"Error recording task: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
