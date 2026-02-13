import os
from dotenv import load_dotenv

load_dotenv()

key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
print(f"KEY_IN_ENV: {key}")
