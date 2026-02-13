import { useState, useEffect } from 'react'

interface Agent {
  id: string;
  name: string;
  status: string;
}

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    // Use VITE_API_URL from env, fallback to localhost for development
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    fetch(`${apiUrl}/agents/status`)
      .then(res => res.json())
      .then(data => setAgents(data.agents))
      .catch(err => console.error("Failed to fetch agents", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-blue-400">AI Agent & Human Collaboration Lab</h1>
        <p className="text-gray-400 mt-2">Demonstrating Human-AI Synergy and Multi-Agent Orchestration</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Agent Status Card */}
        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">🤖</span> Agent Network Status
          </h2>
          <div className="space-y-4">
            {agents.map(agent => (
              <div key={agent.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                <span>{agent.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${agent.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {agent.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Tasks Card */}
        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">📋</span> Recent Collaboration Tasks
          </h2>
          <div className="text-sm text-gray-400 italic">
            Connecting to project history...
          </div>
        </section>

        {/* Human Commands Interface */}
        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">🎮</span> Human Command Center
          </h2>
          <input 
            type="text" 
            placeholder="Enter intent (e.g., 'Analyze market trends'...)"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
            Dispatch to Agents
          </button>
        </section>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        Built by 米爸 & 小糰子3號 | Powered by OpenClaw & Supabase
      </footer>
    </div>
  )
}

export default App
