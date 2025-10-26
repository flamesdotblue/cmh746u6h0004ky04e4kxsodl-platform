import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Hero />
      <div className="relative">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-16 pt-6 lg:pt-8">
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
}
