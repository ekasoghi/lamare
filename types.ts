
export enum AppView {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  VERIFY_2FA = 'VERIFY_2FA',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  SCRAPER = 'SCRAPER',
  CONTENT_STUDIO = 'CONTENT_STUDIO',
  VIDEO_STUDIO = 'VIDEO_STUDIO',
  AI_TOOLS = 'AI_TOOLS',
  PLANNER = 'PLANNER',
  SOCIAL = 'SOCIAL',
  ANALYTICS = 'ANALYTICS',
  STRATEGY = 'STRATEGY',
  ACCOUNT = 'ACCOUNT'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  commission: number;
  sales: number;
  rating: number;
  category: string;
  image: string;
  url: string;
}

export interface PlannerTask {
  id: string;
  title: string;
  type: 'VIDEO' | 'CAPTION' | 'STRATEGY';
  platform: string;
  date: string; // ISO format
  status: 'PENDING' | 'PUBLISHED';
  color: string;
}

export interface AnalyticsData {
  date: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface SocialAccount {
  platform: string;
  username: string;
  isConnected: boolean;
  followers: number;
  color: string;
}
