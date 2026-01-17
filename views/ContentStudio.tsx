
import React, { useState, useEffect } from 'react';
import { SAMPLE_PRODUCTS } from '../constants';
import { Product, PlannerTask } from '../types';
import { generateCaption, generateVideoScript, generateContentIdeas } from '../services/geminiService';
import { Wand2, Copy, RefreshCw, Lightbulb, FileText, Sparkles, Check, PenTool, Calendar } from 'lucide-react';
import Button from '../components/Button';

interface StudioProps {
  initialProduct?: Product;
  onSchedule: (task: PlannerTask) => void;
}

const ContentStudio: React.FC<StudioProps> = ({ initialProduct, onSchedule }) => {
  const [selectedProduct, setSelectedProduct] = useState(initialProduct || SAMPLE_PRODUCTS[0]);
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'CAPTION' | 'SCRIPT' | 'IDEAS'>('CAPTION');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    if (initialProduct) setSelectedProduct(initialProduct);
  }, [initialProduct]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    let result = '';
    try {
      if (mode === 'CAPTION') {
        result = await generateCaption(selectedProduct.name, selectedProduct.category) || '';
      } else if (mode === 'SCRIPT') {
        result = await generateVideoScript(selectedProduct.name) || '';
      } else if (mode === 'IDEAS') {
        result = await generateContentIdeas(selectedProduct.category) || '';
      }
      setOutput(result);
    } catch (e) {
      setOutput("Error processing request. Check your connection.");
    }
    setIsGenerating(false);
  };

  const handleSchedule = () => {
    if (!output) return;
    setIsScheduling(true);
    const newTask: PlannerTask = {
      id: Date.now().toString(),
      title: `${mode}: ${selectedProduct.name}`,
      type: mode === 'SCRIPT' ? 'VIDEO' : 'CAPTION',
      platform: 'Instagram',
      date: new Date().toISOString(),
      status: 'PENDING',
      color: 'bg-pink-100 text-pink-600'
    };
    onSchedule(newTask);
    setTimeout(() => {
      setIsScheduling(false);
      alert("Added to Content Planner!");
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in duration-700">
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-primary dark:text-white heading-elegant mb-6">Creation Tools</h3>
          
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button 
              onClick={() => setMode('CAPTION')}
              className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${mode === 'CAPTION' ? 'bg-secondary/10 border-secondary text-primary dark:text-secondary' : 'bg-neutral dark:bg-slate-800 border-transparent text-gray-500'}`}
            >
              <FileText size={24} className="mb-2" />
              <span className="text-[10px] font-bold uppercase">Caption</span>
            </button>
            <button 
              onClick={() => setMode('SCRIPT')}
              className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${mode === 'SCRIPT' ? 'bg-secondary/10 border-secondary text-primary dark:text-secondary' : 'bg-neutral dark:bg-slate-800 border-transparent text-gray-500'}`}
            >
              <PenTool size={24} className="mb-2" />
              <span className="text-[10px] font-bold uppercase">Script</span>
            </button>
            <button 
              onClick={() => setMode('IDEAS')}
              className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${mode === 'IDEAS' ? 'bg-secondary/10 border-secondary text-primary dark:text-secondary' : 'bg-neutral dark:bg-slate-800 border-transparent text-gray-500'}`}
            >
              <Lightbulb size={24} className="mb-2" />
              <span className="text-[10px] font-bold uppercase">Ideas</span>
            </button>
          </div>

          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Target Product</h4>
          <div className="grid grid-cols-1 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-6">
            {SAMPLE_PRODUCTS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                  selectedProduct.id === p.id 
                  ? 'bg-secondary/5 border-secondary shadow-sm' 
                  : 'bg-white dark:bg-slate-800 border-transparent hover:border-gray-200 dark:hover:border-slate-700'
                }`}
              >
                <img src={p.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                <div className="text-left">
                  <p className="text-sm font-bold text-primary dark:text-white line-clamp-1">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
              </button>
            ))}
          </div>

          <Button 
            className="w-full gap-2 py-4 shadow-xl" 
            onClick={handleGenerate} 
            isLoading={isGenerating}
            variant="primary"
          >
            <Sparkles size={18} /> Generate with AI
          </Button>
        </div>
      </div>

      <div className="bg-primary text-white p-8 rounded-3xl shadow-xl flex flex-col min-h-[600px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-serif">M</div>
            <span className="text-secondary font-bold text-sm tracking-widest uppercase">
              {mode === 'CAPTION' ? 'Caption' : mode === 'SCRIPT' ? 'Video Script' : 'Viral Ideas'}
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={copyToClipboard} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              {copied ? <Check className="text-green-400" size={20} /> : <Copy size={20} />}
            </button>
            <button onClick={handleGenerate} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-8 relative z-10 overflow-hidden group border border-white/10">
          {!output && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-white/30 space-y-4">
              <Wand2 size={48} className="animate-pulse" />
              <p className="max-w-xs">Pilih produk dan biarkan AI menciptakan konten untuk Anda.</p>
            </div>
          ) : isGenerating ? (
            <div className="space-y-6">
              <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse"></div>
              <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse delay-75"></div>
              <div className="h-4 w-5/6 bg-white/10 rounded-full animate-pulse delay-150"></div>
              <div className="h-4 w-2/3 bg-white/10 rounded-full animate-pulse delay-200"></div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none whitespace-pre-wrap font-sans text-sm leading-relaxed overflow-y-auto max-h-[450px] custom-scrollbar">
              {output}
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
          <Button variant="secondary" className="gap-2 shadow-lg" onClick={handleSchedule} isLoading={isScheduling}>
             <Calendar size={18} /> Schedule Post
          </Button>
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
            Export Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentStudio;
