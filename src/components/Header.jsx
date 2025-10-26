import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, User, ChevronDown, LogOut, Settings } from 'lucide-react';

export default function Header({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 backdrop-blur bg-white/70">
      <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 h-16">
        <button onClick={onMenuClick} className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400">
          <Menu className="h-5 w-5" />
        </button>
        <div className="font-semibold text-slate-900">CalmFlow</div>
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-lg bg-white ring-1 ring-slate-200 px-3 py-1.5 focus-within:ring-rose-300 transition">
            <Search className="h-4 w-4 text-slate-400" />
            <input placeholder="Search" className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-400" />
          </div>
          <button className="relative inline-flex items-center justify-center rounded-full p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>
          <div className="relative" ref={menuRef}>
            <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-full px-2 py-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300">
                <User className="h-4 w-4 text-slate-600" />
              </span>
              <span className="hidden sm:block text-sm font-medium text-slate-800">Alex Morgan</span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-slate-200">
                <div className="px-3 py-2 text-xs text-slate-500">Signed in as <span className="font-medium text-slate-700">alex@calmflow.app</span></div>
                <div className="py-1">
                  <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings className="h-4 w-4 text-slate-400" /> Settings
                  </a>
                  <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <LogOut className="h-4 w-4 text-slate-400" /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
