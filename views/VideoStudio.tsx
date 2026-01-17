
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Layers, 
  Smartphone, 
  Monitor, 
  Clapperboard, 
  Wand2, 
  Settings, 
  Palette, 
  Type as Font, 
  Clock, 
  History,
  CheckCircle,
  Sparkles,
  Calendar
} from 'lucide-react';
import { Product, PlannerTask } from '../types';
import { SAMPLE_PRODUCTS } from '../constants';
import { generateVideoScript } from '../services/geminiService';
import Button from '../components/Button';

interface VideoStudioProps {
  initialProduct?: Product;
  onSchedule: (task: PlannerTask) => void;
}

const VideoStudio: React.FC<VideoStudioProps> = ({ initialProduct, onSchedule }) => {
  const [activeTool, setActiveTool] = useState('Faceless Video');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(initialProduct || SAMPLE_PRODUCTS[0]);
  const [generatedScript, setGeneratedScript] = useState('');

  useEffect(() => {
    if (initialProduct) setSelectedProduct(initialProduct);
  }, [initialProduct]);

  const tools = [
    { name: 'Faceless Video', icon: <Clapperboard size={20} />, desc: 'AI generates full video.' },
    { name: 'Short Form Video', icon: <Smartphone size={20} />, desc: 'Optimized for TikTok/Reels.' },
    { name: 'URL To Video', icon: <Monitor size={20} />, desc: 'Enter product URL.' },
    { name: 'History', icon: <History size={20} />, desc: 'Past generations.' },
  ];

  const handleGenerate = async () => {
    setIsProcessing(true);
    const script = await generateVideoScript(selectedProduct.name);
    setGeneratedScript(script || '');
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const handleSchedule = () => {
    const newTask: PlannerTask = {
      id: Date.now().toString(),
      title: `Video: ${selectedProduct.name}`,
      type: 'VIDEO',
      platform: 'TikTok',
      date: new Date().toISOString(),
      status: 'PENDING',
      color: 'bg-black text-white'
    };
    onSchedule(newTask);
    alert("Video task added to Planner!");
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="grid lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">Video Engine</h4>
            <div className="space-y-1">
              {tools.map(tool => (
                <button
                  key={tool.name}
                  onClick={() => setActiveTool(tool.name)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-semibold ${activeTool === tool.name ? 'bg-primary text-secondary' : 'text-gray-500 hover:bg-neutral dark:hover:bg-slate-800'}`}
                >
                  {tool.icon}
                  {tool.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-secondary/10 dark:bg-secondary/5 rounded-3xl p-6 border border-secondary/20">
             <div className="flex items-center gap-2 text-secondary mb-2">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">PRO TIP</span>
             </div>
             <p className="text-[10px] text-primary dark:text-gray-400 leading-relaxed font-medium">
               Neural voice cloning increases conversion by 40% on Short Form videos.
             </p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-gray-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
               <div>
                  <h3 className="text-3xl font-bold text-primary dark:text-white heading-elegant mb-2">{activeTool}</h3>
                  <p className="text-sm text-gray-400">Configure your creative requirements for: <span className="font-bold text-secondary">{selectedProduct.name}</span></p>
               </div>
               <div className="flex gap-2">
                 <Button onClick={handleGenerate} isLoading={isProcessing} size="sm" className="gap-2 shadow-lg"><Play size={16} /> Render Video</Button>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
               <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">AI Prompt / Script</label>
                    <textarea 
                      readOnly={!!generatedScript}
                      value={generatedScript}
                      placeholder="Click generate to create an elite script..."
                      className="w-full bg-neutral dark:bg-slate-800 border-none rounded-2xl p-4 text-sm min-h-[150px] focus:ring-2 focus:ring-secondary transition-all dark:text-white"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Art Style</label>
                      <select className="w-full bg-neutral dark:bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-secondary dark:text-white">
                        <option>Aesthetic/Clean</option>
                        <option>UGC Style</option>
                      </select>
                    </div>
                  </div>
               </div>

               <div className="bg-neutral/50 dark:bg-slate-800/50 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                  {isProcessing ? (
                    <div className="space-y-6 w-full">
                       <div className="relative w-24 h-24 mx-auto">
                          <div className="absolute inset-0 border-4 border-secondary/20 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                          <Wand2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary" size={32} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-primary dark:text-white mb-2 uppercase tracking-widest">Generating Assets...</p>
                       </div>
                    </div>
                  ) : generatedScript ? (
                    <div className="space-y-4">
                       <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 text-green-500 flex items-center justify-center mx-auto shadow-inner">
                          <CheckCircle size={32} />
                       </div>
                       <h4 className="font-bold text-primary dark:text-white">Video Ready</h4>
                       <Button size="sm" variant="secondary" onClick={handleSchedule} className="gap-2">
                          <Calendar size={14} /> Schedule Now
                       </Button>
                    </div>
                  ) : (
                    <>
                       <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center mb-6 text-primary dark:text-secondary group-hover:scale-110 transition-transform">
                          <Layers size={32} />
                       </div>
                       <h4 className="font-bold text-primary dark:text-white mb-2">Ready to Engine</h4>
                    </>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStudio;
