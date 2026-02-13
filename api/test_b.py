import os
from supabase import create_client, Client

url = "https://ooxjqlwwzdcnqljdcayv.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9veGpxbHd3emRjbnFsamRjYXl2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODUxODk2NCwiZXhwIjoyMDg0MDk0OTY0fQ.zXiVOpzvjp9CHkgFCJp2bPfnl6dO9_zeBrsYVXr2ptQ"

try:
    supabase = create_client(url, key)
    # This project has a 'portfolio' or similar?
    # Let's just try to list tables or something simple
    print("Testing Project B...")
    res = supabase.table("market_data").select("*").limit(1).execute()
    print("Success!")
    print(f"Data: {res.data}")
except Exception as e:
    print(f"Error: {e}")
