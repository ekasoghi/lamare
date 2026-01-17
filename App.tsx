
import React, { useState, useEffect } from 'react';
import { AppView, PlannerTask, SocialAccount, Product } from './types';
import Landing from './views/Landing';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Verify2FA from './views/Verify2FA';
import ForgotPassword from './views/ForgotPassword';
import Dashboard from './views/Dashboard';
import TrendingScraper from './views/TrendingScraper';
import ContentStudio from './views/ContentStudio';
import VideoStudio from './views/VideoStudio';
import AITools from './views/AITools';
import Planner from './views/Planner';
import SocialIntegrations from './views/SocialIntegrations';
import Analytics from './views/Analytics';
import AIStrategy from './views/AIStrategy';
import AccountCenter from './views/AccountCenter';
import Sidebar from './components/Sidebar';
import { SAMPLE_PRODUCTS } from './constants';
import { LogOut } from 'lucide-react';
import Button from './components/Button';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); // Defaulting to true for the new theme
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pendingUser, setPendingUser] = useState<any>(null);

  // --- Global Integrated State ---
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(SAMPLE_PRODUCTS[0]);
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    { platform: 'Shopee', username: 'lamare_official', isConnected: true, followers: 12400, color: 'bg-orange-500' },
    { platform: 'Instagram', username: 'lamare.elite', isConnected: true, followers: 8500, color: 'bg-pink-600' },
    { platform: 'TikTok', username: 'lamare.trends', isConnected: false, followers: 0, color: 'bg-black' },
    { platform: 'Facebook', username: '', isConnected: false, followers: 0, color: 'bg-blue-600' },
  ]);

  useEffect(() => {
    const savedSession = localStorage.getItem('lamare_session');
    const savedTasks = localStorage.getItem('lamare_tasks');
    
    if (savedSession) {
      const user = JSON.parse(savedSession);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentView(AppView.DASHBOARD);
    }
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    // Force dark mode for the new aesthetic
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('lamare_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: PlannerTask) => setTasks([...tasks, task]);
  
  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('lamare_session', JSON.stringify(user));
    setCurrentView(AppView.DASHBOARD);
  };

  const handleDemo = () => {
    handleLogin({
      id: 'demo_premium',
      name: 'Rassanah Greta Adhikarya',
      email: 'rassanag@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400',
      role: 'Premium Member'
    });
  };

  const handleSignUpComplete = (userData: any) => {
    setPendingUser(userData);
    setCurrentView(AppView.VERIFY_2FA);
  };

  const handleVerificationSuccess = () => {
    if (pendingUser) {
      handleLogin(pendingUser);
      setPendingUser(null);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('lamare_session');
    setCurrentView(AppView.LANDING);
  };

  if (currentView === AppView.LANDING) {
    return (
      <Landing 
        onStart={() => isAuthenticated ? setCurrentView(AppView.DASHBOARD) : setCurrentView(AppView.LOGIN)} 
        onSignUp={() => setCurrentView(AppView.SIGNUP)}
        onDemo={handleDemo}
      />
    );
  }

  if (currentView === AppView.LOGIN && !isAuthenticated) {
    return (
      <Login 
        onLogin={handleLogin} 
        onForgotPassword={() => setCurrentView(AppView.FORGOT_PASSWORD)}
        onGoToSignUp={() => setCurrentView(AppView.SIGNUP)}
      />
    );
  }

  if (currentView === AppView.SIGNUP) {
    return <SignUp onSignUp={handleSignUpComplete} onBackToLogin={() => setCurrentView(AppView.LOGIN)} />;
  }

  if (currentView === AppView.VERIFY_2FA) {
    return <Verify2FA user={pendingUser} onVerified={handleVerificationSuccess} onBack={() => setCurrentView(AppView.SIGNUP)} />;
  }

  if (currentView === AppView.FORGOT_PASSWORD) {
    return <ForgotPassword onBackToLogin={() => setCurrentView(AppView.LOGIN)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard tasks={tasks} />;
      case AppView.SCRAPER: 
        return <TrendingScraper onPushToStudio={(p) => { setSelectedProduct(p); setCurrentView(AppView.CONTENT_STUDIO); }} />;
      case AppView.CONTENT_STUDIO: 
        return <ContentStudio initialProduct={selectedProduct} onSchedule={(t) => addTask(t)} />;
      case AppView.VIDEO_STUDIO: 
        return <VideoStudio initialProduct={selectedProduct} onSchedule={(t) => addTask(t)} />;
      case AppView.AI_TOOLS: return <AITools />;
      case AppView.PLANNER: return <Planner tasks={tasks} />;
      case AppView.SOCIAL: 
        return <SocialIntegrations accounts={socialAccounts} setAccounts={setSocialAccounts} />;
      case AppView.ANALYTICS: return <Analytics />;
      case AppView.STRATEGY: return <AIStrategy />;
      case AppView.ACCOUNT: 
        return <AccountCenter isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onLogout={handleLogout} />;
      default: return <Dashboard tasks={tasks} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-darkBase text-neutral transition-colors duration-500 overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      <Sidebar 
        activeView={currentView} 
        onNavigate={setCurrentView} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <main className={`flex-1 relative z-10 overflow-y-auto transition-all duration-500 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-white heading-elegant tracking-tight gold-text-glow">
                {currentView.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
              </h1>
              <div className="h-1 w-12 bg-secondary rounded-full mt-2"></div>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-6 bg-primary/20 backdrop-blur-md p-2 pl-6 rounded-3xl border border-white/5 shadow-gold">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white leading-none">{currentUser?.name || 'Guest User'}</p>
                  <p className="text-[10px] text-secondary uppercase tracking-[0.25em] mt-1 font-bold">Elite Creator</p>
                </div>
                <div className="relative">
                  <img src={currentUser?.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400"} alt="Avatar" className="w-12 h-12 rounded-2xl border-2 border-secondary/50 shadow-gold-lg object-cover transform hover:rotate-3 transition-transform" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-darkBase rounded-full"></div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="group flex items-center justify-center p-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all shadow-lg active:scale-95"
                title="Sign Out"
              >
                <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </header>
          
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
