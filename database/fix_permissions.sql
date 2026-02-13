-- Grant Usage on Schema
GRANT USAGE ON SCHEMA ai_agent_lab TO postgres, anon, authenticated, service_role;

-- Grant Permissions on Tables
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ai_agent_lab TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA ai_agent_lab TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA ai_agent_lab TO postgres, anon, authenticated, service_role;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA ai_agent_lab GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA ai_agent_lab GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA ai_agent_lab GRANT ALL ON FUNCTIONS TO postgres, anon, authenticated, service_role;
