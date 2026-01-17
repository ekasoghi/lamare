
import React, { useState, useRef, useMemo } from 'react';
import { 
  User, Shield, CreditCard, Bell, Globe, LogOut, Moon, Sun, 
  Check, Camera, Palette, Lock, Mail, ScanFace, X, ShieldCheck, 
  Loader2, Fingerprint, Link as LinkIcon, ExternalLink, RefreshCw, AlertTriangle,
  Activity, Zap
} from 'lucide-react';
import Button from '../components/Button';

interface AccountCenterProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (val: boolean) => void;
  onLogout?: () => void;
}

const AccountCenter: React.FC<AccountCenterProps> = ({ isDarkMode, setIsDarkMode, onLogout }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile State - Updated with high-quality portrait matching the user request
  const [profile, setProfile] = useState({
    name: 'Rassanah Greta Adhikarya',
    email: 'rassanag@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400'
  });

  // Shopee Connection State
  const [shopeeConnection, setShopeeConnection] = useState({
    isConnected: true,
    affiliateId: 'AFF-882931',
    username: 'rassanah_official',
    lastSync: '2 mins ago'
  });
  const [isVerifyingShopee, setIsVerifyingShopee] = useState(false);

  // Security Verification State
  const [showFaceScan, setShowFaceScan] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  // Video Ref for Face Scan
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Form States
  const [brandKit, setBrandKit] = useState({ name: 'La Mare Affiliate', color: '#0A2463', font: 'Inter' });
  const [notifications, setNotifications] = useState({ email: true, dashboard: true, weekly: false });
  const [security, setSecurity] = useState({ twoFactor: true });

  // Generate mock health data for graphs
  const shopeeHealthData = useMemo(() => Array.from({ length: 12 }, () => Math.floor(Math.random() * 40) + 60), []);
  const geminiHealthData = useMemo(() => Array.from({ length: 12 }, () => Math.floor(Math.random() * 20) + 80), []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setActiveSection(null);
      setShowEditForm(false);
      setIsVerified(false);
    }, 1000);
  };

  const handleVerifyShopee = () => {
    setIsVerifyingShopee(true);
    setTimeout(() => {
      setIsVerifyingShopee(false);
      setShopeeConnection(prev => ({ ...prev, isConnected: true, lastSync: 'Just now' }));
    }, 2500);
  };

  const startFaceScan = async () => {
    setShowFaceScan(true);
    setIsVerifying(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
        stopCamera();
        
        setTimeout(() => {
          setShowFaceScan(false);
          setShowEditForm(true);
        }, 1500);
      }, 3000);
    } catch (err) {
      console.error("Camera access denied:", err);
      setIsVerifying(false);
      alert("Camera access is required for Face Recognition security verification.");
      setShowFaceScan(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-500">
      
      {/* Face Scan Security Overlay */}
      {showFaceScan && (
        <div className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-[3rem] p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-pulse"></div>
            
            <button 
              onClick={() => { setShowFaceScan(false); stopCamera(); }}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-secondary/30 p-2 overflow-hidden">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover rounded-full scale-x-[-1]"
                />
                {isVerifying && (
                  <div className="absolute inset-0 border-t-4 border-secondary animate-[spin_3s_linear_infinite] rounded-full"></div>
                )}
                {isVerifying && (
                  <div className="absolute inset-x-0 h-0.5 bg-secondary/50 shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-[bounce_2s_infinite]"></div>
                )}
                {isVerified && (
                  <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center animate-in fade-in zoom-in">
                    <ShieldCheck className="text-secondary" size={80} />
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 heading-elegant">
              {isVerified ? "Access Granted" : "Face Recognition"}
            </h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              {isVerified 
                ? "Identity confirmed. You can now modify your sensitive account data."
                : "Looking for biometric markers. Please look directly into the camera."}
            </p>

            <div className="flex items-center justify-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest">
              {isVerifying ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Scanning Identity...
                </>
              ) : isVerified ? (
                <>
                  <Check size={16} />
                  Verified Successfully
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Left Column: Profile & Integration Health */}
      <div className="lg:col-span-1 space-y-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 text-center">
          <div className="relative inline-block mb-6 group cursor-pointer">
            <img 
              src={profile.avatar} 
              alt="Avatar" 
              className="w-32 h-32 rounded-3xl border-4 border-secondary shadow-xl mx-auto group-hover:opacity-80 transition-opacity object-cover" 
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={32} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary dark:bg-secondary text-white dark:text-primary p-2 rounded-xl shadow-lg">
              <User size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-primary dark:text-white heading-elegant">{profile.name}</h3>
          <p className="text-gray-400 text-sm mb-6">{profile.email}</p>
          <div className="flex gap-2 justify-center">
            <Button 
              size="sm" 
              variant="outline" 
              className="dark:border-secondary dark:text-secondary gap-2"
              onClick={startFaceScan}
            >
              <Fingerprint size={16} /> Edit Profile
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Enhanced Integrations Health with Graphs */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6 px-2">
            <h4 className="font-bold text-primary dark:text-secondary text-sm uppercase tracking-wider">Integrations Health</h4>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Live
            </div>
          </div>
          <div className="space-y-6">
            {/* Shopee Health Item */}
            <div className="p-4 rounded-[2rem] bg-neutral/50 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/50 group hover:border-secondary/30 transition-all">
               <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-xl text-orange-500">
                      <Activity size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-primary dark:text-white">Shopee Sync</h5>
                      <p className="text-[10px] text-gray-400">Response Latency</p>
                    </div>
                 </div>
                 <span className="text-xs font-bold text-primary dark:text-secondary">98%</span>
               </div>
               {/* Mini Sparkline Chart */}
               <div className="h-10 flex items-end gap-1 px-1">
                 {shopeeHealthData.map((val, i) => (
                   <div 
                     key={i} 
                     className="flex-1 bg-orange-400/20 dark:bg-orange-400/10 rounded-t-sm group-hover:bg-orange-400/40 transition-colors"
                     style={{ height: `${val}%` }}
                   ></div>
                 ))}
               </div>
            </div>

            {/* Gemini Health Item */}
            <div className="p-4 rounded-[2rem] bg-neutral/50 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/50 group hover:border-secondary/30 transition-all">
               <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl text-blue-500">
                      <Zap size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-primary dark:text-white">Gemini AI Engine</h5>
                      <p className="text-[10px] text-gray-400">Success Rate</p>
                    </div>
                 </div>
                 <span className="text-xs font-bold text-primary dark:text-secondary">99.9%</span>
               </div>
               {/* Mini Sparkline Chart */}
               <div className="h-10 flex items-end gap-1 px-1">
                 {geminiHealthData.map((val, i) => (
                   <div 
                     key={i} 
                     className="flex-1 bg-blue-400/20 dark:bg-blue-400/10 rounded-t-sm group-hover:bg-blue-400/40 transition-colors"
                     style={{ height: `${val}%` }}
                   ></div>
                 ))}
               </div>
            </div>
          </div>
          <p className="mt-6 text-[9px] text-center text-gray-400 font-medium uppercase tracking-[0.2em]">
            Infrastructure uptime: 99.98%
          </p>
        </div>
      </div>

      {/* Right Column: Preferences & Settings */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
             <h3 className="text-xl font-bold text-primary dark:text-white heading-elegant">
               {showEditForm ? "Edit Profile Identity" : activeSection === 'connections' ? 'Affiliate Connections' : 'Account Preferences'}
             </h3>
             {(activeSection || showEditForm) && (
               <div className="flex gap-2">
                 <Button size="sm" variant="ghost" onClick={() => { setActiveSection(null); setShowEditForm(false); }}>Cancel</Button>
                 <Button size="sm" onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
               </div>
             )}
          </div>
          
          <div className="p-8 space-y-8">
            {/* Edit Profile Form */}
            {showEditForm ? (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
                <div className="bg-secondary/5 border border-secondary/20 p-4 rounded-2xl flex items-center gap-4 mb-8">
                   <div className="bg-secondary p-2 rounded-xl text-primary">
                     <ShieldCheck size={20} />
                   </div>
                   <p className="text-xs font-bold text-secondary uppercase tracking-widest">Identity Verified via Face ID</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-neutral dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-secondary transition-all dark:text-white" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="email" 
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full bg-neutral dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-secondary transition-all dark:text-white" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile Avatar Link</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={profile.avatar}
                      onChange={(e) => setProfile({...profile, avatar: e.target.value})}
                      className="w-full bg-neutral dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-secondary transition-all dark:text-white" 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Affiliate Connections Section */}
                <div className="space-y-4">
                  <SettingsItem 
                    icon={<LinkIcon className="text-primary dark:text-secondary" />} 
                    title="Affiliate & Marketplace" 
                    desc="Connect your Shopee Affiliate account to enable automated scraping and revenue tracking." 
                    onClick={() => setActiveSection(activeSection === 'connections' ? null : 'connections')}
                    action={
                      shopeeConnection.isConnected ? (
                        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-xl border border-green-100 dark:border-green-800">
                           <Check size={14} className="text-green-500" />
                           <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">Linked</span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="dark:border-secondary dark:text-secondary">Link Account</Button>
                      )
                    }
                  />
                  {activeSection === 'connections' && (
                    <div className="pl-16 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="bg-neutral-50 dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" className="w-24 h-24" />
                        </div>
                        <div className="flex items-start justify-between mb-6">
                           <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" className="w-7 h-7 brightness-0 invert" alt="Shopee" />
                             </div>
                             <div>
                               <h4 className="font-bold text-primary dark:text-white">Shopee Affiliate Program</h4>
                               <p className="text-xs text-gray-500">Global ID Integration</p>
                             </div>
                           </div>
                           <button 
                             onClick={() => setShopeeConnection({...shopeeConnection, isConnected: false})}
                             className="text-[10px] font-bold text-red-500 hover:underline uppercase tracking-widest"
                           >
                             Disconnect
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Affiliate ID</label>
                            <input 
                              type="text" 
                              value={shopeeConnection.affiliateId}
                              onChange={(e) => setShopeeConnection({...shopeeConnection, affiliateId: e.target.value})}
                              className="w-full bg-white dark:bg-slate-900 border-none rounded-xl p-3 text-sm dark:text-white" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Username</label>
                            <input 
                              type="text" 
                              value={shopeeConnection.username}
                              onChange={(e) => setShopeeConnection({...shopeeConnection, username: e.target.value})}
                              className="w-full bg-white dark:bg-slate-900 border-none rounded-xl p-3 text-sm dark:text-white" 
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                           <div className="flex items-center gap-2 text-[10px] text-gray-400">
                             <RefreshCw size={12} className={isVerifyingShopee ? 'animate-spin' : ''} />
                             Last synced: {shopeeConnection.lastSync}
                           </div>
                           <Button 
                             variant="secondary" 
                             size="sm" 
                             className="gap-2" 
                             onClick={handleVerifyShopee}
                             isLoading={isVerifyingShopee}
                           >
                             <Shield size={14} /> Verify & Sync API
                           </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-start gap-3">
                         <AlertTriangle className="text-blue-500 shrink-0 mt-0.5" size={18} />
                         <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                           Linking your Shopee account allows <strong>La Mare</strong> to fetch real-time trending products specifically for your region and track commission data automatically.
                         </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Theme Toggle */}
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-neutral dark:bg-slate-800 flex items-center justify-center shrink-0">
                    {isDarkMode ? <Moon className="text-secondary" /> : <Sun className="text-primary" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-primary dark:text-white mb-1">Theme Interface</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between elegant light and deep ocean dark modes.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isDarkMode} 
                        onChange={(e) => setIsDarkMode?.(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-secondary"></div>
                    </label>
                  </div>
                </div>

                {/* Security Section */}
                <div className="space-y-4">
                  <SettingsItem 
                    icon={<Shield className="text-primary dark:text-secondary" />} 
                    title="Security & 2FA" 
                    desc="Manage your password and multi-factor authentication methods." 
                    onClick={() => setActiveSection(activeSection === 'security' ? null : 'security')}
                  />
                  {activeSection === 'security' && (
                    <div className="pl-16 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-400 uppercase">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full bg-neutral dark:bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-secondary dark:text-white" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-neutral dark:bg-slate-800 rounded-xl mt-5">
                          <span className="text-sm font-semibold">Enable 2FA (WhatsApp)</span>
                          <input 
                            type="checkbox" 
                            checked={security.twoFactor} 
                            onChange={(e) => setSecurity({...security, twoFactor: e.target.checked})}
                            className="rounded border-gray-300 text-secondary focus:ring-secondary" 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Subscription Section */}
                <div className="space-y-4">
                  <SettingsItem 
                    icon={<CreditCard className="text-primary dark:text-secondary" />} 
                    title="Subscription Plan" 
                    desc="You are currently on the Pro Agency plan. Renewal date: Jan 15, 2025." 
                    onClick={() => setActiveSection(activeSection === 'billing' ? null : 'billing')}
                    action={<Button variant="outline" size="sm" className="dark:border-secondary dark:text-secondary">Manage Plan</Button>}
                  />
                  {activeSection === 'billing' && (
                    <div className="pl-16 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <PlanCard active title="Pro Agency" price="$99" />
                        <PlanCard title="Standard" price="$29" />
                        <PlanCard title="Starter" price="Free" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications Section */}
                <div className="space-y-4">
                  <SettingsItem 
                    icon={<Bell className="text-primary dark:text-secondary" />} 
                    title="Notifications" 
                    desc="Customize which alerts you receive via email and dashboard." 
                    onClick={() => setActiveSection(activeSection === 'notifications' ? null : 'notifications')}
                  />
                  {activeSection === 'notifications' && (
                    <div className="pl-16 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <NotificationToggle label="Email Sales Alerts" checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} />
                      <NotificationToggle label="Weekly Performance Report" checked={notifications.weekly} onChange={() => setNotifications({...notifications, weekly: !notifications.weekly})} />
                      <NotificationToggle label="Dashboard News" checked={notifications.dashboard} onChange={() => setNotifications({...notifications, dashboard: !notifications.dashboard})} />
                    </div>
                  )}
                </div>

                {/* Brand Kit Section */}
                <div className="space-y-4">
                  <SettingsItem 
                    icon={<Palette className="text-primary dark:text-secondary" />} 
                    title="Brand Kit Settings" 
                    desc="Set your default logos, fonts and colors for generated content." 
                    onClick={() => setActiveSection(activeSection === 'brand' ? null : 'brand')}
                  />
                  {activeSection === 'brand' && (
                    <div className="pl-16 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">Brand Name</label>
                          <input 
                            type="text" 
                            value={brandKit.name} 
                            onChange={(e) => setBrandKit({...brandKit, name: e.target.value})}
                            className="w-full bg-neutral dark:bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-secondary dark:text-white" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">Primary Color</label>
                          <div className="flex gap-3">
                            <input 
                              type="color" 
                              value={brandKit.color} 
                              onChange={(e) => setBrandKit({...brandKit, color: e.target.value})}
                              className="w-12 h-12 rounded-xl border-none cursor-pointer bg-transparent" 
                            />
                            <div className="flex-1 bg-neutral dark:bg-slate-800 rounded-xl flex items-center px-4 text-xs font-mono uppercase dark:text-white">
                              {brandKit.color}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsItem = ({ icon, title, desc, action, onClick }: { icon: any, title: string, desc: string, action?: any, onClick?: () => void }) => (
  <div className="flex gap-6 group cursor-pointer" onClick={onClick}>
    <div className="w-12 h-12 rounded-2xl bg-neutral dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h4 className="font-bold text-primary dark:text-white mb-1 group-hover:text-secondary transition-colors">{title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">{desc}</p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>{action}</div>
      </div>
    </div>
  </div>
);

const PlanCard = ({ title, price, active }: { title: string, price: string, active?: boolean }) => (
  <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${active ? 'border-secondary bg-secondary/5' : 'border-neutral dark:border-slate-800 hover:border-gray-300'}`}>
    <p className="text-xs font-bold text-gray-400 uppercase mb-1">{title}</p>
    <p className="text-xl font-bold text-primary dark:text-white mb-2">{price}<span className="text-xs font-normal">/mo</span></p>
    {active ? (
      <span className="text-[10px] font-bold text-secondary flex items-center gap-1">
        <Check size={12} /> Current
      </span>
    ) : (
      <span className="text-[10px] font-bold text-gray-400">Select</span>
    )}
  </div>
);

const NotificationToggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
  <div className="flex items-center justify-between p-4 bg-neutral dark:bg-slate-800 rounded-2xl">
    <span className="text-sm font-semibold dark:text-white">{label}</span>
    <input type="checkbox" checked={checked} onChange={onChange} className="rounded border-gray-300 text-secondary focus:ring-secondary" />
  </div>
);

export default AccountCenter;
