
import React, { useState } from 'react';
import { getStrategyAdvice } from '../services/geminiService';
import { Lightbulb, Send, MessageSquareText, Target, BarChart, Rocket } from 'lucide-react';
import Button from '../components/Button';

const AIStrategy: React.FC = () => {
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statsSummary, setStatsSummary] = useState('Niche: Fashion, Current Sales: 120/mo, Top Category: Linen Shirts, Main Platforms: Instagram & TikTok');

  const fetchAdvice = async () => {
    setIsLoading(true);
    const result = await getStrategyAdvice(statsSummary);
    setAdvice(result || '');
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="bg-gradient-to-br from-primary to-blue-900 rounded-[2.5rem] p-12 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 heading-elegant leading-tight">
              Unlock Elite <span className="text-secondary italic">Growth</span> Insights
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
              Our strategy engine analyzes your performance metrics against global Shopee trends to deliver surgical recommendations for your business.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto lg:mx-0">
               <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3">
                  <Target className="text-secondary" />
                  <span className="text-sm font-semibold">Goal Targeting</span>
               </div>
               <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3">
                  <BarChart className="text-secondary" />
                  <span className="text-sm font-semibold">A/B Testing</span>
               </div>
            </div>
            <Button size="lg" variant="secondary" onClick={fetchAdvice} isLoading={isLoading} className="text-lg">
              Generate 24H Growth Plan
            </Button>
          </div>
          
          <div className="flex-1 w-full">
            <div className="bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 p-8 shadow-inner min-h-[300px] flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary">
                  <MessageSquareText size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest">AI Strategist</p>
                  <p className="text-sm font-semibold">Ready for analysis...</p>
                </div>
              </div>
              
              <div className="flex-1">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                     <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                     <p className="text-sm text-white/50 italic">Synthesizing market data...</p>
                  </div>
                ) : advice ? (
                  <div className="prose prose-invert max-w-none text-sm leading-relaxed overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                    {advice}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-white/30 p-8 space-y-4">
                    <Rocket size={48} />
                    <p>Enter your business context above or click generate for a baseline performance audit.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StrategyFeature 
          title="Competitor Benchmarking" 
          desc="See how your conversion rates stack up against top 1% affiliates in your niche."
          icon={<Target />}
        />
        <StrategyFeature 
          title="Optimal Posting Windows" 
          desc="AI identifies the exact hours when your specific audience is most likely to click."
          icon={<BarChart />}
        />
        <StrategyFeature 
          title="Niche Pivot Suggestions" 
          desc="Discover emerging high-commission categories before they become saturated."
          icon={<Lightbulb />}
        />
      </div>
    </div>
  );
};

const StrategyFeature = ({ title, desc, icon }: { title: string, desc: string, icon: any }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-secondary transition-all">
    <div className="w-12 h-12 rounded-2xl bg-primary text-secondary flex items-center justify-center mb-4">
      {icon}
    </div>
    <h4 className="font-bold text-primary mb-2">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default AIStrategy;
