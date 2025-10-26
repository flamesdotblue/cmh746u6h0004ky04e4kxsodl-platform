import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Calendar, StickyNote, Settings } from 'lucide-react';

const navItems = [
  { name: 'Tasks', icon: CheckSquare },
  { name: 'Calendar', icon: Calendar },
  { name: 'Notes', icon: StickyNote },
  { name: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:min-h-[calc(100vh-64px)] border-r border-slate-200 bg-white/70 backdrop-blur sticky top-16">
        <div className="px-4 py-5">
          <nav className="space-y-1">
            {navItems.map(({ name, icon: Icon }) => (
              <a key={name} href="#dashboard" className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                <Icon className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
                <span>{name}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div className="lg:hidden fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/40" />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative h-full w-80 max-w-[85%] bg-white shadow-xl"
            >
              <div className="px-4 py-5">
                <div className="mb-4 text-xs font-semibold text-slate-500">Navigation</div>
                <nav className="space-y-1">
                  {navItems.map(({ name, icon: Icon }) => (
                    <button key={name} onClick={onClose} className="w-full text-left group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                      <Icon className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
                      <span>{name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
