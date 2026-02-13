import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

interface Agent {
  id: string;
  name: string;
  status: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  created_at: string;
  result?: any;
}

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchData = () => {
    // Fetch Agents
    fetch(`${apiUrl}/agents/status`)
      .then(res => res.json())
      .then(data => setAgents(data.agents || []))
      .catch(err => console.error("Failed to fetch agents", err));

    // Fetch Tasks
    fetch(`${apiUrl}/tasks`)
      .then(res => res.json())
      .then(data => {
        const fetchedTasks = data.tasks || [];
        setTasks(fetchedTasks);
        // Automatically select the newest task if none selected or if newest changed
        if (fetchedTasks.length > 0 && (!selectedTask || fetchedTasks[0].id !== selectedTask.id)) {
          setSelectedTask(fetchedTasks[0]);
        }
      })
      .catch(err => console.error("Failed to fetch tasks", err));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-blue-400">AI Agent & Human Collaboration Lab</h1>
        <p className="text-gray-400 mt-2">Demonstrating Human-AI Synergy and Multi-Agent Orchestration</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Network & Controls */}
        <div className="space-y-6">
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
        </div>

        {/* Middle Column: Task List */}
        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">📋</span> Recent Collaboration Tasks
          </h2>
          <div className="space-y-3">
            {tasks.length > 0 ? tasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => setSelectedTask(task)}
                className={`cursor-pointer p-3 rounded-lg border transition ${
                  selectedTask?.id === task.id ? 'bg-blue-500/10 border-blue-500' : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-blue-300">{task.title}</span>
                  <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                    task.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                    task.status === 'running' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500">
                  {new Date(task.created_at).toLocaleString()}
                </div>
              </div>
            )) : (
              <div className="text-sm text-gray-400 italic">
                Waiting for instructions from Telegram...
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Task Details/Result */}
        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">🔍</span> Task Output Details
          </h2>
          {selectedTask ? (
            <div className="flex-1 overflow-auto">
              <h3 className="text-blue-300 font-bold mb-2">{selectedTask.title}</h3>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 min-h-[400px]">
                {selectedTask.result ? (
                  <div className="prose prose-invert prose-blue max-w-none">
                    <ReactMarkdown>{selectedTask.result}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-600">
                    <p>Agent is processing...</p>
                    <div className="animate-pulse mt-2">● ● ●</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 italic">
              Select a task to view details
            </div>
          )}
        </section>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        Built by 米爸 & 小糰子3號 | Powered by OpenClaw & Supabase
      </footer>
    </div>
  )
}

export default App
