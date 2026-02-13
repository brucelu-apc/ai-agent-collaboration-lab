import os
from dotenv import load_dotenv
from supabase import create_client, Client, ClientOptions

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

print(f"URL: {url}")
print(f"Key Prefix: {key[:10]}...")

try:
    supabase = create_client(url, key)
    # Just try to get anything or check auth
    print("Connecting without schema option...")
    res = supabase.table("agents").select("*").execute()
    print("Success!")
    print(f"Data: {res.data}")
except Exception as e:
    print(f"Error: {e}")
