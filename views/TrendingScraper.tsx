
import React, { useState } from 'react';
import { SAMPLE_PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import { Filter, Search, Download, Calendar, ExternalLink, PenTool, Video } from 'lucide-react';
import Button from '../components/Button';

interface ScraperProps {
  onPushToStudio: (product: Product) => void;
}

const TrendingScraper: React.FC<ScraperProps> = ({ onPushToStudio }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isScraping, setIsScraping] = useState(false);

  const startScrape = () => {
    setIsScraping(true);
    setTimeout(() => setIsScraping(false), 2000);
  };

  const filteredProducts = activeCategory === 'All' 
    ? SAMPLE_PRODUCTS 
    : SAMPLE_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'bg-neutral dark:bg-slate-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={startScrape} isLoading={isScraping} size="sm" className="gap-2">
            <Search size={16} /> Scrape Trends
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={product.image} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={product.name} 
              />
              <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-secondary px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {product.category}
              </div>
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                <Button size="sm" variant="secondary" className="gap-2" onClick={() => onPushToStudio(product)}>
                  <PenTool size={14} /> Create Content
                </Button>
                <Button size="sm" variant="accent" className="gap-2" onClick={() => onPushToStudio(product)}>
                  <Video size={14} /> Make Video
                </Button>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-primary dark:text-white mb-2 line-clamp-1">{product.name}</h4>
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-secondary">Rp {product.price.toLocaleString()}</p>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Comm.</p>
                  <p className="text-sm font-bold text-accent">Rp {product.commission.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-50 dark:border-slate-800">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Performance</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm font-bold text-primary dark:text-gray-300">{product.rating}</span>
                    <span className="text-yellow-400 text-xs">★★★★★</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Monthly Sales</p>
                  <p className="text-sm font-bold text-primary dark:text-gray-300 mt-1">{product.sales}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingScraper;
