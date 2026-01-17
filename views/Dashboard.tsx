
import React, { useState, useMemo } from 'react';
import { SAMPLE_ANALYTICS, SAMPLE_PRODUCTS } from '../constants';
import { TrendingUp, MousePointer2, CreditCard, Percent, ChevronRight, Info, Zap, Calendar, ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';
import { PlannerTask } from '../types';

interface DashboardProps {
  tasks: PlannerTask[];
}

type RangeType = 'Day' | 'Week' | 'Month';

const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
  const [activeRange, setActiveRange] = useState<RangeType>('Week');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate dynamic data based on range
  const chartData = useMemo(() => {
    switch (activeRange) {
      case 'Day':
        // Last 24 hours
        return Array.from({ length: 24 }, (_, i) => ({
          date: `${i}:00`,
          clicks: Math.floor(Math.random() * 40) + 10,
          conversions: Math.floor(Math.random() * 5),
          revenue: Math.floor(Math.random() * 150000) + 20000,
        }));
      case 'Week':
        return SAMPLE_ANALYTICS;
      case 'Month':
        // Last 30 days
        return Array.from({ length: 30 }, (_, i) => ({
          date: `${i + 1}`,
          clicks: Math.floor(Math.random() * 500) + 100,
          conversions: Math.floor(Math.random() * 50) + 5,
          revenue: Math.floor(Math.random() * 2000000) + 100000,
        }));
      default:
        return SAMPLE_ANALYTICS;
    }
  }, [activeRange]);

  const maxRevenue = useMemo(() => Math.max(...chartData.map(d => d.revenue)), [chartData]);

  const stats = [
    { label: "Today's Revenue", value: "Rp 860.000", change: "+12.5%", icon: <CreditCard className="text-secondary" /> },
    { label: "Total Clicks", value: "349", change: "+5.2%", icon: <MousePointer2 className="text-secondary" /> },
    { label: "Conversion Rate", value: "12.3%", change: "+1.1%", icon: <Percent className="text-secondary" /> },
    { label: "Commission Earned", value: "Rp 103.200", change: "+14.3%", icon: <TrendingUp className="text-secondary" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-125"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-secondary/10 rounded-2xl shadow-inner group-hover:rotate-12 transition-transform">
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'} border border-current/20`}>
                {stat.change}
              </span>
            </div>
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-3xl font-bold text-white mt-2 font-serif">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Flow Chart Card */}
        <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-white heading-elegant gold-text-glow">Revenue Flow</h3>
                <div className="flex items-center gap-1 text-green-400 text-[10px] font-bold bg-green-400/10 px-2 py-0.5 rounded-full">
                  <ArrowUpRight size={12} />
                  +8.4%
                </div>
              </div>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-2 flex items-center gap-2">
                <Calendar size={12} className="text-secondary" />
                Shopee Affiliate Performance Matrix
              </p>
            </div>

            <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              {(['Day', 'Week', 'Month'] as RangeType[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-5 py-2 text-[10px] uppercase tracking-widest rounded-xl font-black transition-all ${
                    activeRange === range 
                    ? 'bg-secondary text-primary shadow-gold' 
                    : 'text-white/40 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="h-80 flex items-end justify-between gap-1.5 sm:gap-3 relative mt-16 px-2">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none pb-8">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="w-full border-t border-white/5 flex items-center">
                  <span className="text-[8px] text-white/10 absolute -left-2 font-bold">
                    {Math.round((maxRevenue * (5 - i)) / 5).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {chartData.map((d, i) => {
              const heightPercentage = (d.revenue / maxRevenue) * 100;
              const isHovered = hoveredIndex === i;
              
              return (
                <div 
                  key={i} 
                  className="flex-1 flex flex-col items-center gap-4 group relative z-10"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute bottom-full mb-6 z-30 w-44 bg-darkBase/95 backdrop-blur-2xl border border-secondary/40 text-white p-5 rounded-[2.5rem] shadow-gold-lg animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-start mb-3">
                         <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{activeRange === 'Week' ? d.date : activeRange === 'Day' ? d.date : `DAY ${d.date}`}</span>
                         <Zap size={12} className="text-secondary animate-pulse" />
                      </div>
                      <p className="text-xl font-bold font-serif mb-4">Rp {d.revenue.toLocaleString()}</p>
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                         <div>
                           <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-0.5">Clicks</p>
                           <p className="text-sm font-bold">{d.clicks}</p>
                         </div>
                         <div>
                           <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-0.5">Conv.</p>
                           <p className="text-sm font-bold">{d.conversions}</p>
                         </div>
                      </div>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-darkBase border-b border-r border-secondary/40 rotate-45"></div>
                    </div>
                  )}

                  <div className="w-full h-full flex flex-col items-center justify-end">
                    {/* Ghost Bar background */}
                    <div className="absolute inset-x-0 bottom-8 top-0 bg-white/[0.02] rounded-t-xl group-hover:bg-white/[0.05] transition-colors pointer-events-none"></div>
                    
                    {/* Animated Bar */}
                    <div 
                      className={`w-full max-w-[12px] sm:max-w-[20px] rounded-t-full transition-all duration-1000 ease-out relative group ${
                        isHovered 
                        ? 'bg-secondary shadow-gold-lg scale-x-110' 
                        : 'bg-gradient-to-t from-secondary/5 to-secondary/40'
                      }`}
                      style={{ 
                        height: `${heightPercentage}%`,
                        transitionDelay: `${i * 30}ms`
                      }}
                    >
                      {/* Inner Glow/Shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-t-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-[shimmer_2s_infinite] rounded-t-full"></div>
                    </div>
                  </div>
                  
                  {/* Labels: Show every few points for month/day to avoid clutter */}
                  <span className={`text-[8px] font-black uppercase tracking-widest transition-colors duration-300 ${isHovered ? 'text-secondary' : 'text-white/20'}`}>
                    {(activeRange === 'Week' || (activeRange === 'Month' && i % 5 === 0) || (activeRange === 'Day' && i % 4 === 0)) ? d.date : ''}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-8">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary shadow-gold"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Revenue Target</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/5 border border-white/20"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Baseline</span>
             </div>
             <div className="ml-auto text-[10px] font-black text-secondary uppercase tracking-[0.3em] flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                Advanced Analytics Suite <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </div>

        {/* Trending Picks */}
        <div className="glass-card p-10 rounded-[3rem] shadow-2xl flex flex-col border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-[60px] rounded-full"></div>
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <h3 className="text-2xl font-bold text-white heading-elegant">Elite Trends</h3>
            <Zap size={18} className="text-secondary animate-pulse" />
          </div>
          <div className="space-y-6 flex-1 relative z-10">
            {SAMPLE_PRODUCTS.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center gap-5 group cursor-pointer p-3 rounded-[2rem] hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-lg shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-125 transition-all duration-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate group-hover:text-secondary transition-colors">{product.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[8px] border border-secondary/30 text-secondary px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{product.category}</span>
                    <p className="text-[10px] text-white/40 font-bold">{product.sales} sold</p>
                  </div>
                </div>
                <button className="p-3 rounded-xl bg-white/5 text-secondary group-hover:bg-secondary group-hover:text-primary transition-all shrink-0">
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-10 py-4 border-secondary/50 text-secondary hover:bg-secondary hover:text-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] relative z-10">
            Access Full Database
          </Button>
        </div>
      </div>

      {/* Footer Info Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-r from-primary/80 to-blue-900 p-8 rounded-[2.5rem] border border-secondary/20 shadow-gold flex flex-col sm:flex-row items-center justify-between group overflow-hidden relative gap-6">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="relative z-10">
              <p className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-2">Automated Ops</p>
              <h4 className="text-2xl font-bold text-white heading-elegant">{tasks.length} Active Deployments</h4>
           </div>
           <Button variant="secondary" className="px-10 py-4 rounded-2xl shadow-gold-lg relative z-10 w-full sm:w-auto font-black uppercase tracking-widest text-[10px]">Live Planner</Button>
        </div>
        <div className="glass-card p-8 rounded-[2.5rem] flex items-center justify-between group border border-white/5">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[2rem] bg-green-500/10 text-green-500 flex items-center justify-center shadow-inner border border-green-500/20">
                 <MousePointer2 size={24} className="group-hover:rotate-12 transition-transform" />
              </div>
              <div>
                 <h4 className="font-bold text-white text-lg">Quantum Sync Stable</h4>
                 <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mt-1">Real-time Node Connection</p>
              </div>
           </div>
           <div className="relative">
             <div className="h-3 w-3 rounded-full bg-green-500 animate-ping absolute inset-0"></div>
             <div className="h-3 w-3 rounded-full bg-green-500 relative"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
