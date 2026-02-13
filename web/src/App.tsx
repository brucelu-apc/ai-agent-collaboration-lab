import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
    <div className="min-h-screen bg-[#0d1117] text-gray-200 font-sans p-4 md:p-8">
      <header className="mb-12 border-b border-gray-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            AI Agent Collaboration Lab
          </h1>
          <p className="text-gray-500 mt-2 font-medium tracking-wide">
            Human-AI Synergy & Multi-Agent Orchestration
          </p>
        </div>
        <div className="hidden md:block text-right text-xs text-gray-600">
          v1.2.0 • Live Control
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Network & Controls */}
        <div className="lg:col-span-3 space-y-6">
          {/* Agent Status Card */}
          <section className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-2xl">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-6 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Node Network
            </h2>
            <div className="space-y-4">
              {agents.map(agent => (
                <div key={agent.id} className="flex justify-between items-center bg-gray-800/40 p-4 rounded-xl border border-gray-700/50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center mr-3 text-blue-400 text-lg">🤖</div>
                    <span className="font-semibold text-sm">{agent.name}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase ${
                    agent.status === 'online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {agent.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Human Commands Interface */}
          <section className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-2xl">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-6 flex items-center">
              🎮 Command Center
            </h2>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Enter new intent..."
                className="w-full bg-black/40 border border-gray-700 group-hover:border-gray-600 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all mb-4 text-white"
              />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]">
              Dispatch Request
            </button>
          </section>
        </div>

        {/* Middle Column: Task List */}
        <section className="lg:col-span-4 bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-2xl">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-6 flex items-center">
            📋 Task Stream
          </h2>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {tasks.length > 0 ? tasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => setSelectedTask(task)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                  selectedTask?.id === task.id 
                    ? 'bg-blue-600/10 border-blue-500/50 shadow-inner' 
                    : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/60'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-bold text-sm ${selectedTask?.id === task.id ? 'text-blue-400' : 'text-gray-300'}`}>
                    {task.title}
                  </span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                    task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                    task.status === 'running' ? 'bg-amber-500/10 text-amber-400 animate-pulse' : 'bg-gray-500/10 text-gray-500'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <div className="text-[10px] text-gray-600 font-medium">
                  {new Date(task.created_at).toLocaleString()}
                </div>
              </div>
            )) : (
              <div className="text-center py-20">
                <div className="text-4xl mb-4 opacity-20">📡</div>
                <p className="text-sm text-gray-600 italic">Waiting for Telegram link...</p>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Task Details/Result */}
        <section className="lg:col-span-5 bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-2xl flex flex-col">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-6 flex items-center">
            🔍 Analysis Output
          </h2>
          {selectedTask ? (
            <div className="flex-1 overflow-auto custom-scrollbar">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{selectedTask.title}</h3>
                <div className="text-xs text-gray-500">Node: Dango-3 • {new Date(selectedTask.created_at).toLocaleTimeString()}</div>
              </div>
              <div className="bg-black/30 p-8 rounded-2xl border border-gray-800/50 min-h-[400px] shadow-inner">
                {selectedTask.result ? (
                  <div className="prose prose-invert prose-blue max-w-none prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-img:mx-auto prose-img:max-h-[300px]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedTask.result}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-gray-600">
                    <div className="relative w-16 h-16 mb-6">
                       <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="font-bold tracking-widest text-xs uppercase animate-pulse">Synthesizing Data...</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600 py-20">
              <div className="text-6xl mb-6 opacity-10">👁️</div>
              <p className="text-sm font-medium italic">Select an active stream to inspect</p>
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
