import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

function Sparkline({ data = [], color = '#0ea5e9' }) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const norm = (v) => ((v - min) / (max - min || 1)) * 100;
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - norm(d)}`).join(' ');
  return (
    <svg viewBox="0 0 100 100" className="h-12 w-full">
      <polyline fill="none" stroke={color} strokeWidth="3" points={points} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function MetricCard({ title, value, trend, up = true, color = 'text-slate-900', accent = 'text-emerald-600', chartColor }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-slate-500">{title}</div>
          <div className={`mt-1 text-2xl font-semibold ${color}`}>{value}</div>
        </div>
        <div className={`inline-flex items-center gap-1 rounded-full ${up ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'} px-2 py-1 text-xs font-medium`}>
          {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          <span>{trend}</span>
        </div>
      </div>
      <div className="mt-3">
        <Sparkline data={[3, 4, 6, 5, 7, 8, 9, 11, 10, 12]} color={chartColor || '#fb7185'} />
      </div>
    </motion.div>
  );
}

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const [error, setError] = useState({});

  function validate() {
    const e = {};
    if (!title.trim()) e.title = 'Please enter a task title.';
    if (due && isNaN(Date.parse(due))) e.due = 'Enter a valid date.';
    setError(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onAdd({ id: crypto.randomUUID(), title: title.trim(), due: due || null, done: false });
    setTitle('');
    setDue('');
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 sm:p-5 ring-1 ring-slate-200 shadow-sm">
      <div className="mb-3 text-sm font-medium text-slate-800">Add Task</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs text-slate-500 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={validate}
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-rose-300 ${error.title ? 'border-rose-300' : 'border-slate-200'}`}
            placeholder="e.g., Prepare weekly report"
          />
          {error.title && <p className="mt-1 text-xs text-rose-600">{error.title}</p>}
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Due date</label>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            onBlur={validate}
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-rose-300 ${error.due ? 'border-rose-300' : 'border-slate-200'}`}
          />
          {error.due && <p className="mt-1 text-xs text-rose-600">{error.due}</p>}
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400">
          <Plus className="h-4 w-4" /> Add Task
        </button>
      </div>
    </form>
  );
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Review design specs', due: null, done: false },
    { id: '2', title: 'Sync with team', due: new Date(Date.now() + 86400000).toISOString().slice(0, 10), done: false },
    { id: '3', title: 'Plan sprint backlog', due: null, done: true },
  ]);

  const metrics = useMemo(
    () => [
      { title: 'Tasks Completed', value: '42', trend: '+12%', up: true, chartColor: '#10b981' },
      { title: 'Focus Time', value: '18h', trend: '+5%', up: true, chartColor: '#6366f1' },
      { title: 'Overdue', value: '3', trend: '-8%', up: false, chartColor: '#f43f5e' },
      { title: 'Notes Created', value: '27', trend: '+3%', up: true, chartColor: '#0ea5e9' },
    ],
    []
  );

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function addTask(task) {
    setTasks((prev) => [task, ...prev]);
  }

  return (
    <div id="dashboard" className="space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <MetricCard key={m.title} {...m} />
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">My Tasks</h3>
                <p className="text-sm text-slate-500">Stay on top of your work with clear priorities.</p>
              </div>
            </div>
            <ul className="divide-y divide-slate-100">
              {tasks.map((t) => (
                <li key={t.id} className="flex items-start justify-between gap-3 px-5 py-3 hover:bg-slate-50 transition">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => toggleTask(t.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-400"
                    />
                    <div>
                      <div className={`text-sm ${t.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>{t.title}</div>
                      {t.due && (
                        <div className="mt-0.5 text-xs text-slate-500">Due {new Date(t.due).toLocaleDateString()}</div>
                      )}
                    </div>
                  </label>
                </li>
              ))}
              {tasks.length === 0 && (
                <li className="px-5 py-6 text-sm text-slate-500">No tasks yet. Add your first one.</li>
              )}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <TaskForm onAdd={addTask} />
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
            <div className="mb-3 text-sm font-medium text-slate-800">Schedule Overview</div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-md ${i % 6 === 0 ? 'bg-rose-200/70' : 'bg-slate-100'} hover:scale-[1.02] transition-transform`}></div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">A lightweight glance at your upcoming weeks.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
