
import React from 'react';
import { CalendarDays, Filter, ChevronLeft, ChevronRight, Plus, ExternalLink, Smartphone, CheckCircle } from 'lucide-react';
import { PlannerTask } from '../types';
import Button from '../components/Button';

interface PlannerProps {
  tasks: PlannerTask[];
}

const Planner: React.FC<PlannerProps> = ({ tasks }) => {
  const days = Array.from({ length: 35 }, (_, i) => i - 2); 
  const currentMonthDay = 15; // Simulated center of view

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        
        <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-6">
              <h3 className="text-2xl font-bold text-primary dark:text-white heading-elegant">October 2024</h3>
              <div className="flex gap-2">
                 <button className="p-2 hover:bg-neutral dark:hover:bg-slate-800 rounded-lg transition-colors"><ChevronLeft size={20}/></button>
                 <button className="p-2 hover:bg-neutral dark:hover:bg-slate-800 rounded-lg transition-colors"><ChevronRight size={20}/></button>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2"><Filter size={16} /> Filters</Button>
              <Button size="sm" className="gap-2 shadow-md"><Plus size={16} /> New Entry</Button>
           </div>
        </div>

        <div className="grid grid-cols-7 border-collapse">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="p-4 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-r border-gray-50 dark:border-slate-800 bg-neutral/30 dark:bg-slate-800/50">
              {day}
            </div>
          ))}
          {days.map((day, i) => {
            const isToday = day === currentMonthDay;
            const dayTasks = tasks.filter(t => new Date(t.date).getDate() === day);
            const isPrevMonth = day <= 0;
            const isNextMonth = day > 31;
            
            return (
              <div 
                key={i} 
                className={`min-h-[140px] p-4 border-b border-r border-gray-50 dark:border-slate-800 transition-colors hover:bg-neutral/20 dark:hover:bg-slate-800/30 group relative ${isPrevMonth || isNextMonth ? 'opacity-20' : ''}`}
              >
                <div className={`text-sm font-bold mb-3 ${isToday ? 'w-8 h-8 rounded-full bg-primary text-secondary flex items-center justify-center -ml-2 shadow-lg' : 'text-gray-400'}`}>
                  {day <= 0 ? 30 + day : day > 31 ? day - 31 : day}
                </div>
                
                <div className="space-y-1">
                  {dayTasks.map(task => (
                    <div key={task.id} className={`px-2 py-1 rounded-md text-[9px] font-bold truncate ${task.color} shadow-sm border border-white/10 cursor-pointer hover:scale-105 transition-transform flex items-center gap-1`}>
                      {task.status === 'PUBLISHED' && <CheckCircle size={8} />}
                      {task.title}
                    </div>
                  ))}
                </div>

                <button className="absolute bottom-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 bg-primary text-secondary rounded-lg transition-all hover:scale-110">
                   <Plus size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
         <div className="md:col-span-2 bg-primary text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="text-secondary" />
                  <h4 className="text-2xl font-bold heading-elegant">Smart Sync Active</h4>
               </div>
               <p className="text-white/60 mb-8 max-w-xl">
                 Your planner is synced with your Social Manager. Published entries update your analytics automatically.
               </p>
               <Button variant="secondary">Sync External Calendar</Button>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800">
            <h4 className="font-bold text-primary dark:text-white mb-6 heading-elegant">Upcoming Tasks</h4>
            <div className="space-y-6">
               {tasks.length > 0 ? tasks.slice(0, 3).map(task => (
                 <div key={task.id} className="flex justify-between items-center group cursor-pointer">
                    <div>
                       <p className="text-sm font-bold text-primary dark:text-gray-200 group-hover:text-secondary transition-colors">{task.title}</p>
                       <p className="text-[10px] text-gray-400 uppercase tracking-widest">{task.platform}</p>
                    </div>
                    <ExternalLink size={14} className="text-gray-300 group-hover:text-primary" />
                 </div>
               )) : <p className="text-xs text-gray-400 italic">No tasks scheduled.</p>}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Planner;
