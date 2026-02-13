-- Create Schema for Isolation
CREATE SCHEMA IF NOT EXISTS ai_agent_lab;

-- Agents Table
CREATE TABLE IF NOT EXISTS ai_agent_lab.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    status TEXT DEFAULT 'offline',
    node_id TEXT UNIQUE,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS ai_agent_lab.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending', -- pending, running, completed, failed
    assigned_to UUID REFERENCES ai_agent_lab.agents(id),
    created_by TEXT DEFAULT 'human', -- human or agent id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    payload JSONB DEFAULT '{}'::jsonb,
    result JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS (Row Level Security) - Optional but recommended
ALTER TABLE ai_agent_lab.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agent_lab.tasks ENABLE ROW LEVEL SECURITY;

-- Simple Policy: Allow all for now (Adjust for Auth later)
CREATE POLICY "Allow all access to agents" ON ai_agent_lab.agents FOR ALL USING (true);
CREATE POLICY "Allow all access to tasks" ON ai_agent_lab.tasks FOR ALL USING (true);
