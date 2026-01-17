
import React, { useState } from 'react';
import { SAMPLE_PRODUCTS } from '../constants';
import { generateCaption } from '../services/geminiService';
import { Wand2, Copy, RefreshCw, Send, Check } from 'lucide-react';
import Button from '../components/Button';

const ContentCreator: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(SAMPLE_PRODUCTS[0]);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await generateCaption(selectedProduct.name, selectedProduct.category);
    setCaption(result || '');
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in duration-700">
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-primary heading-elegant mb-6">Select Product</h3>
          <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {SAMPLE_PRODUCTS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                  selectedProduct.id === p.id 
                  ? 'bg-secondary/5 border-secondary shadow-sm' 
                  : 'bg-white border-transparent hover:border-gray-200'
                }`}
              >
                <img src={p.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                <div className="text-left">
                  <p className="text-sm font-bold text-primary line-clamp-1">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
              </button>
            ))}
          </div>
          <Button 
            className="w-full mt-6 gap-2" 
            onClick={handleGenerate} 
            isLoading={isGenerating}
            variant="primary"
          >
            <Wand2 size={18} /> Generate AI Caption
          </Button>
        </div>
      </div>

      <div className="bg-primary text-white p-8 rounded-3xl shadow-xl flex flex-col min-h-[500px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-serif">M</div>
            <span className="text-secondary font-bold text-sm tracking-widest uppercase">AI Creative Assistant</span>
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

        <div className="flex-1 bg-white/5 rounded-2xl p-6 relative overflow-hidden group">
          {!caption && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-white/30 space-y-4">
              <Wand2 size={48} className="animate-pulse" />
              <p>Choose a product and click generate to create elegant captions for your socials.</p>
            </div>
          ) : isGenerating ? (
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse"></div>
              <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse delay-75"></div>
              <div className="h-4 w-5/6 bg-white/10 rounded-full animate-pulse delay-150"></div>
              <div className="h-4 w-1/4 bg-white/10 rounded-full animate-pulse delay-200"></div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {caption}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="accent" className="flex-1 gap-2">
            <Send size={18} /> Post Now
          </Button>
          <Button variant="outline" className="flex-1 text-white border-white/20 hover:bg-white/10">
            Save as Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;
