
import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Share2, 
  PenTool, 
  BarChart3, 
  UserCircle, 
  Lightbulb,
  Video,
  Sparkles,
  CalendarDays
} from 'lucide-react';
import { AppView } from './types';

export const COLORS = {
  primary: '#0A2463',
  secondary: '#D4AF37',
  accent: '#FF6B6B',
  neutral: '#F5F5F5',
};

export const MENU_ITEMS = [
  { id: AppView.DASHBOARD, label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { id: AppView.SCRAPER, label: 'Trend Scraper', icon: <Search size={20} /> },
  { id: AppView.CONTENT_STUDIO, label: 'Content Studio', icon: <PenTool size={20} /> },
  { id: AppView.VIDEO_STUDIO, label: 'Video Studio', icon: <Video size={20} /> },
  { id: AppView.AI_TOOLS, label: 'AI Magic Tools', icon: <Sparkles size={20} /> },
  { id: AppView.PLANNER, label: 'Content Planner', icon: <CalendarDays size={20} /> },
  { id: AppView.SOCIAL, label: 'Social Manager', icon: <Share2 size={20} /> },
  { id: AppView.ANALYTICS, label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: AppView.STRATEGY, label: 'AI Strategy', icon: <Lightbulb size={20} /> },
  { id: AppView.ACCOUNT, label: 'Account Center', icon: <UserCircle size={20} /> },
];

export const CATEGORIES = ['All', 'Fashion', 'Electronics', 'Beauty', 'Home Living', 'Babies', 'Hobbies'];

export const SAMPLE_PRODUCTS: any[] = [
  { id: '1', name: 'Premium Linen Shirt', price: 250000, commission: 25000, sales: 1200, rating: 4.8, category: 'Fashion', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Wireless Noise Cancelling Headphones', price: 1500000, commission: 150000, sales: 850, rating: 4.9, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Organic Glow Serum', price: 175000, commission: 17500, sales: 3400, rating: 4.7, category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Ergonomic Office Chair', price: 1200000, commission: 120000, sales: 500, rating: 4.6, category: 'Home Living', image: 'https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Silk Sleep Mask', price: 85000, commission: 8500, sales: 2100, rating: 4.8, category: 'Fashion', image: 'https://images.unsplash.com/photo-1583073030863-342200dc8955?auto=format&fit=crop&q=80&w=400' },
];

export const SAMPLE_ANALYTICS = [
  { date: 'Mon', clicks: 400, conversions: 24, revenue: 480000 },
  { date: 'Tue', clicks: 300, conversions: 13, revenue: 260000 },
  { date: 'Wed', clicks: 200, conversions: 98, revenue: 1960000 },
  { date: 'Thu', clicks: 278, conversions: 39, revenue: 780000 },
  { date: 'Fri', clicks: 189, conversions: 48, revenue: 960000 },
  { date: 'Sat', clicks: 239, conversions: 38, revenue: 760000 },
  { date: 'Sun', clicks: 349, conversions: 43, revenue: 860000 },
];
