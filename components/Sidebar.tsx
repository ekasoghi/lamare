
import React from 'react';
import { MENU_ITEMS } from '../constants';
import { AppView } from '../types';
import { Menu, ChevronLeft, Zap } from 'lucide-react';

interface SidebarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isOpen, onToggle }) => {
  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#050B18]/90 backdrop-blur-2xl border-r border-white/5 transition-all duration-500 ease-in-out z-50 ${isOpen ? 'w-64' : 'w-20'} flex flex-col shadow-2xl`}
    >
      <div className="p-8 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate(AppView.DASHBOARD)}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-blue-900 border border-secondary/30 flex items-center justify-center font-bold text-secondary font-serif text-xl shadow-gold group-hover:scale-110 transition-transform">M</div>
            <span className="font-serif font-bold text-2xl tracking-tight text-white">LA MARE</span>
          </div>
        )}
        <button onClick={onToggle} className="p-2 hover:bg-secondary/10 rounded-xl transition-all text-secondary">
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} className="mx-auto" />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
        <ul className="space-y-3">
          {MENU_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 relative group overflow-hidden ${
                    isActive 
                    ? 'bg-secondary text-primary font-bold shadow-gold-lg' 
                    : 'text-neutral/60 hover:text-secondary hover:bg-white/5'
                  }`}
                >
                  <span className={`${isActive ? 'text-primary' : 'text-secondary group-hover:scale-110 transition-transform'}`}>{item.icon}</span>
                  {isOpen && <span className="text-sm tracking-wide font-medium">{item.label}</span>}
                  
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6">
        {isOpen ? (
          <div className="bg-gradient-to-br from-primary/40 to-darkBase p-6 rounded-[2rem] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-[-20px] right-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={80} className="text-secondary" />
            </div>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.25em] mb-2">Platform Status</p>
            <p className="text-white font-bold text-sm mb-3">Enterprise Suite ✨</p>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-[88%] shadow-gold"></div>
            </div>
            <p className="text-[10px] mt-2 text-white/40 font-semibold">88% Quota Remaining</p>
          </div>
        ) : (
          <div className="w-2 h-8 bg-secondary/20 rounded-full mx-auto relative overflow-hidden">
             <div className="absolute top-0 w-full h-1/2 bg-secondary animate-[bounce_2s_infinite]"></div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
