FROM python:3.11-slim

WORKDIR /app

# Copy requirements from the api folder
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything from api folder to current WORKDIR
COPY api/ .

# Ensure the port is dynamic
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
