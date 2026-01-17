
import React, { useState } from 'react';
import Button from '../components/Button';
import { Mail, Lock, User, ArrowLeft, ShieldCheck, Smartphone, Check } from 'lucide-react';

interface SignUpProps {
  onSignUp: (userData: any) => void;
  onBackToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onBackToLogin }) => {
  const [method, setMethod] = useState<'EMAIL' | 'PHONE' | 'CHOICE'>('CHOICE');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API registration process
    setTimeout(() => {
      onSignUp({
        id: Date.now().toString(),
        name,
        email: method === 'EMAIL' ? email : (phone ? `${phone}@phone.lamare` : ''),
        phone: method === 'PHONE' ? phone : '',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email || phone || name}`,
        role: 'Member'
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSSO = () => {
    setIsLoading(true);
    // Simulate immediate login via SSO (skipping 2FA for SSO usually)
    setTimeout(() => {
      onSignUp({
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
        role: 'Member'
      });
    }, 1000);
  };

  if (method === 'CHOICE') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-slate-950 p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.05),transparent)] pointer-events-none"></div>
        <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <button 
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-gray-400 hover:text-primary dark:hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Return to Login</span>
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-primary text-secondary font-serif text-5xl font-bold shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-500">M</div>
            <h1 className="text-4xl font-bold text-primary dark:text-white heading-elegant mb-3">Begin Your Journey</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Select an elite onboarding method below.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleGoogleSSO}
              disabled={isLoading}
              className="w-full flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <img src="https://www.google.com/favicon.ico" className="w-6 h-6 group-hover:scale-110 transition-transform" alt="Google" />
                <span className="font-bold text-primary dark:text-white">Continue with Google</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-neutral dark:bg-slate-800 flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-colors">
                <ArrowLeft className="rotate-180" size={14} />
              </div>
            </button>

            <button 
              onClick={() => setMethod('EMAIL')}
              className="w-full flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary dark:text-secondary group-hover:scale-110 transition-transform">
                  <Mail size={16} />
                </div>
                <span className="font-bold text-primary dark:text-white">Sign up with Email</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-neutral dark:bg-slate-800 flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-colors">
                <ArrowLeft className="rotate-180" size={14} />
              </div>
            </button>

            <button 
              onClick={() => setMethod('PHONE')}
              className="w-full flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <Smartphone size={16} />
                </div>
                <span className="font-bold text-primary dark:text-white">Join via Phone Number</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-neutral dark:bg-slate-800 flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-colors">
                <ArrowLeft className="rotate-180" size={14} />
              </div>
            </button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Securely Powered by La Mare Auth</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-slate-950 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.05),transparent)] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <button 
          onClick={() => setMethod('CHOICE')}
          className="flex items-center gap-2 text-gray-400 hover:text-primary dark:hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Change Method</span>
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-primary text-secondary font-serif text-4xl font-bold shadow-2xl mb-8">M</div>
          <h1 className="text-4xl font-bold text-primary dark:text-white heading-elegant mb-3">
            {method === 'EMAIL' ? 'Email Registration' : 'Phone Registration'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Join the elite Shopee Affiliate community.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rassanah Greta"
                  className="w-full bg-neutral-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-secondary transition-all dark:text-white" 
                />
              </div>
            </div>

            {method === 'EMAIL' ? (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-neutral-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-secondary transition-all dark:text-white" 
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-1">Phone Number</label>
                <div className="relative group">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 812..."
                    className="w-full bg-neutral-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-secondary transition-all dark:text-white" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-1">Create Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-secondary transition-all dark:text-white" 
                />
              </div>
            </div>

            <div className="bg-secondary/10 dark:bg-secondary/5 border border-secondary/20 p-5 rounded-2xl flex gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed uppercase tracking-wider font-bold">
                Mandatory 2FA verification via <span className="text-secondary">Email</span> or <span className="text-secondary">WhatsApp</span> will be required after this step.
              </p>
            </div>

            <Button 
              type="submit"
              className="w-full py-4 text-lg font-bold shadow-xl rounded-2xl"
              isLoading={isLoading}
            >
              Continue to Verification
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
