
import React, { useState } from 'react';
import { Mic, Image as ImageIcon, Sparkles, Volume2, Wand2, Download, Play, Check, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { GoogleGenAI } from "@google/genai";

const AITools: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  const generateThumbnail = async () => {
    if (!prompt) return alert("Enter a visual concept!");
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `A high quality vertical social media thumbnail for: ${prompt}. Professional lighting, viral aesthetic, text overlay "ELITE DEAL".` }] },
        config: { imageConfig: { aspectRatio: "9:16" } }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setThumbnailUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to generate image. Please try again.");
    }
    setIsProcessing(false);
  };

  const handleVoiceClone = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 3000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
      
      {/* Voice Cloning Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-16 h-16 rounded-2xl bg-primary text-secondary flex items-center justify-center shadow-lg">
              <Mic size={32} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-primary dark:text-white heading-elegant">AI Voice Cloning</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Neural Audio Suite</p>
           </div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Clone your voice or use elite personas for persuasive affiliate narrations. 
        </p>

        <div className="space-y-6 flex-1">
           <div className="bg-neutral dark:bg-slate-800 rounded-2xl p-6 border-2 border-dashed border-gray-200 dark:border-slate-700 text-center cursor-pointer hover:bg-primary/5 transition-colors" onClick={handleVoiceClone}>
              <Volume2 className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm font-bold text-primary dark:text-gray-300">Upload 15s Sample</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Neural model training</p>
           </div>
           
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Selected Persona</label>
              <div className="flex gap-2">
                 <PersonaChip active name="Elite Male" />
                 <PersonaChip name="Cheerful Female" />
                 <PersonaChip name="Calm/Luxe" />
              </div>
           </div>
        </div>

        <Button 
          className="w-full mt-10 gap-2" 
          onClick={handleVoiceClone} 
          isLoading={isProcessing}
          variant={isSuccess ? 'secondary' : 'primary'}
        >
          {isSuccess ? <><Check size={18} /> Model Ready</> : <><Sparkles size={18} /> Train Voice Model</>}
        </Button>
      </div>

      {/* Thumbnail Generator Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-16 h-16 rounded-2xl bg-secondary text-primary flex items-center justify-center shadow-lg">
              <ImageIcon size={32} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-primary dark:text-white heading-elegant">Thumbnail Pro</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Visual Visual Engine</p>
           </div>
        </div>
        
        <div className="flex-1 space-y-6">
           {thumbnailUrl ? (
             <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-black border-4 border-secondary relative group">
                <img src={thumbnailUrl} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Button size="sm" variant="secondary" onClick={() => setThumbnailUrl(null)}>Create Another</Button>
                </div>
             </div>
           ) : (
             <>
               <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Generate high-CTR thumbnails for Shopee affiliate posts using Gemini 2.5 Visual Intelligence.
               </p>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Visual Concept</label>
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Product close-up with neon lighting..."
                    className="w-full bg-neutral dark:bg-slate-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-secondary transition-all dark:text-white"
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <select className="bg-neutral dark:bg-slate-800 rounded-xl p-3 text-sm dark:text-white">
                    <option>TikTok Cover</option>
                    <option>IG Square</option>
                  </select>
                  <select className="bg-neutral dark:bg-slate-800 rounded-xl p-3 text-sm dark:text-white">
                    <option>Hyper-Realistic</option>
                    <option>Minimalist</option>
                  </select>
               </div>
             </>
           )}
        </div>

        <Button 
          className="w-full mt-10 gap-2 shadow-xl" 
          onClick={generateThumbnail} 
          isLoading={isProcessing}
          disabled={!!thumbnailUrl}
        >
          <Wand2 size={18} /> Generate Variation
        </Button>
      </div>

    </div>
  );
};

const PersonaChip = ({ name, active }: { name: string, active?: boolean }) => (
  <button className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${active ? 'bg-secondary text-primary shadow-md' : 'bg-neutral dark:bg-slate-800 text-gray-400 hover:text-primary'}`}>
    {name}
  </button>
);

export default AITools;
