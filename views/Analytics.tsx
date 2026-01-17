
import React, { useState, useMemo } from 'react';
import { SAMPLE_ANALYTICS } from '../constants';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Download, TrendingUp, Calendar, Zap } from 'lucide-react';
import Button from '../components/Button';

type RangeType = 'Daily' | 'Weekly' | 'Monthly';

const Analytics: React.FC = () => {
  const [activeRange, setActiveRange] = useState<RangeType>('Daily');

  // Mock data generation for different ranges
  const data = useMemo(() => {
    switch (activeRange) {
      case 'Daily':
        return SAMPLE_ANALYTICS; // 7 days
      case 'Weekly':
        return [
          { date: 'W1', clicks: 1200, conversions: 80, revenue: 1600000 },
          { date: 'W2', clicks: 1500, conversions: 95, revenue: 1900000 },
          { date: 'W3', clicks: 1100, conversions: 70, revenue: 1400000 },
          { date: 'W4', clicks: 1800, conversions: 120, revenue: 2400000 },
          { date: 'W5', clicks: 2100, conversions: 150, revenue: 3000000 },
          { date: 'W6', clicks: 1900, conversions: 130, revenue: 2600000 },
          { date: 'W7', clicks: 2300, conversions: 170, revenue: 3400000 },
          { date: 'W8', clicks: 2500, conversions: 190, revenue: 3800000 },
        ];
      case 'Monthly':
        return [
          { date: 'Jan', clicks: 5000, conversions: 400, revenue: 8000000 },
          { date: 'Feb', clicks: 4500, conversions: 350, revenue: 7000000 },
          { date: 'Mar', clicks: 6000, conversions: 500, revenue: 10000000 },
          { date: 'Apr', clicks: 5500, conversions: 450, revenue: 9000000 },
          { date: 'May', clicks: 7000, conversions: 600, revenue: 12000000 },
          { date: 'Jun', clicks: 8500, conversions: 750, revenue: 15000000 },
          { date: 'Jul', clicks: 8000, conversions: 700, revenue: 14000000 },
          { date: 'Aug', clicks: 9500, conversions: 850, revenue: 17000000 },
          { date: 'Sep', clicks: 11000, conversions: 950, revenue: 19000000 },
          { date: 'Oct', clicks: 12500, conversions: 1100, revenue: 22000000 },
          { date: 'Nov', clicks: 14000, conversions: 1300, revenue: 26000000 },
          { date: 'Dec', clicks: 16000, conversions: 1500, revenue: 30000000 },
        ];
      default:
        return SAMPLE_ANALYTICS;
    }
  }, [activeRange]);

  const maxRevenue = useMemo(() => Math.max(...data.map(d => d.revenue)), [data]);
  const maxClicks = useMemo(() => Math.max(...data.map(d => d.clicks)), [data]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Performance Chart */}
        <div className="lg:col-span-2 glass-card rounded-[3rem] shadow-2xl p-10 border border-white/5 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-white heading-elegant gold-text-glow">Revenue Trends</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-2">
                Performance matrix for {activeRange.toLowerCase()} window
              </p>
            </div>
            
            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 self-end sm:self-auto">
              {(['Daily', 'Weekly', 'Monthly'] as RangeType[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-5 py-2 text-[9px] uppercase tracking-widest rounded-xl font-black transition-all ${
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
          
          <div className="h-80 flex items-end justify-between gap-3 px-2 relative">
             {/* Grid Lines */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-10 pt-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-full border-t border-white/5"></div>
                ))}
             </div>

             {data.map((item, i) => {
               const revHeight = (item.revenue / maxRevenue) * 100;
               const clickHeight = (item.clicks / maxClicks) * 60; // Max 60% height for clicks to avoid clutter
               
               return (
                 <div key={i} className="flex-1 flex flex-col items-center gap-4 group relative z-10">
                    <div className="w-full flex flex-col items-center justify-end gap-1 h-64">
                      {/* Click Bar (Ghostly/Secondary) */}
                      <div 
                        className="w-1/2 bg-primary/20 rounded-t-lg transition-all group-hover:bg-primary/40" 
                        style={{ height: `${clickHeight}%` }}
                        title={`Clicks: ${item.clicks}`}
                      ></div>
                      {/* Revenue Bar (Primary/Gold) */}
                      <div 
                        className="w-3/4 bg-gradient-to-t from-secondary/40 to-secondary rounded-t-xl transition-all group-hover:shadow-gold shadow-sm" 
                        style={{ height: `${revHeight}%` }}
                        title={`Revenue: Rp ${item.revenue.toLocaleString()}`}
                      >
                         <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-[shimmer_2s_infinite] rounded-t-xl"></div>
                      </div>
                    </div>
                    <span className="text-[8px] text-white/30 font-black uppercase tracking-widest truncate w-full text-center">
                      {item.date}
                    </span>
                 </div>
               );
             })}
          </div>

          <div className="flex gap-8 mt-12 pt-8 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-lg bg-secondary shadow-gold"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Revenue</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-lg bg-primary/40 border border-white/5"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Clicks</span>
            </div>
            <div className="ml-auto">
               <Button variant="ghost" size="sm" className="text-secondary hover:text-white gap-2 p-0">
                  <Download size={14}/> 
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Export .CSV</span>
               </Button>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-[#050B18] text-white rounded-[3rem] shadow-2xl p-10 flex flex-col justify-between overflow-hidden relative border border-white/5">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold heading-elegant text-white">Conversion Funnel</h3>
              <Zap size={18} className="text-secondary animate-pulse" />
            </div>
            <div className="space-y-8">
               <FunnelStep label="Views" value="12,400" percentage={100} />
               <FunnelStep label="Clicks" value="2,140" percentage={17} />
               <FunnelStep label="Checkouts" value="480" percentage={4} />
               <FunnelStep label="Final Sale" value="312" percentage={2.5} />
            </div>
          </div>
          <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <p className="text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-2">Efficiency Rating</p>
             <p className="text-4xl font-bold gold-text-glow">2.51%</p>
             <div className="flex items-center justify-center gap-1 text-green-400 text-[10px] font-bold uppercase tracking-widest mt-3">
                <ArrowUpRight size={14} /> +0.4% vs last period
             </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card rounded-[3rem] shadow-2xl overflow-hidden border border-white/5">
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <div>
             <h3 className="text-xl font-bold text-white heading-elegant">Recent Transactions</h3>
             <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Live from Shopee Gateway</p>
          </div>
          <button className="p-3 text-white/30 hover:text-secondary transition-colors bg-white/5 rounded-2xl">
             <MoreHorizontal />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-white/30 text-[9px] font-black uppercase tracking-[0.25em]">
                <th className="px-10 py-6">ID Node</th>
                <th className="px-10 py-6">Product Core</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Settlement</th>
                <th className="px-10 py-6 text-right">Authority Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <tr key={i} className="hover:bg-white/[0.03] transition-all group cursor-pointer">
                  <td className="px-10 py-6 font-mono text-[10px] text-white/40 tracking-tighter">TX-QUE-982{i}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 border border-white/5 flex items-center justify-center text-secondary text-[10px] font-bold">P{i}</div>
                      <span className="font-bold text-white group-hover:text-secondary transition-colors">Linen Elite Shirt Series</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-[9px] font-black uppercase tracking-widest border border-green-500/20">
                       Settled
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right font-medium text-white/60">Rp 250.000</td>
                  <td className="px-10 py-6 text-right font-black text-secondary">Rp 25.000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-white/[0.01] border-t border-white/5 text-center">
           <button className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] hover:text-secondary transition-colors">View Master Ledger</button>
        </div>
      </div>
    </div>
  );
};

const FunnelStep = ({ label, value, percentage }: { label: string, value: string, percentage: number }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
      <span className="text-white/40">{label}</span>
      <span className="text-white">{value}</span>
    </div>
    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
      <div 
        className="bg-gradient-to-r from-primary to-secondary h-full shadow-gold transition-all duration-1000" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default Analytics;
