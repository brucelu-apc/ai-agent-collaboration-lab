# Cost Control Guidelines 💰

This project is integrated with the **Vibe Coding Cost Control** framework. Every contributor (Human or Agent) must adhere to the following:

## 1. API Configuration (Helicone)
When using Anthropic SDK or other supported models, route through Helicone for observability:
- **Base URL**: `https://anthropic.helicone.ai`
- **Required Headers**:
  - `Helicone-Auth`: Bearer `HELICONE_API_KEY`
  - `Helicone-Property-Project`: `"人機協同展示"`
  - `Helicone-Property-Vibe`: `"true"`

## 2. Cost Logging
After significant development sessions or large API usage, record the consumption using the centralized logging tool:

```bash
python3 ../vibe-coding-cost-control/log_cost.py --project "人機協同展示" --model [MODEL_NAME] --tin [INPUT_TOKENS] --tout [OUTPUT_TOKENS]
```

## 3. Environment Variables
Ensure the following are set in `api/.env`:
- `HELICONE_API_KEY`: For API proxy authentication.
- `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY`: For logging to the `billing` schema.
