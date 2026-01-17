
import React, { useState } from 'react';
import Button from '../components/Button';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, Smartphone, Info } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
  onForgotPassword: () => void;
  onGoToSignUp?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onForgotPassword, onGoToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Mock Authentication Logic
    setTimeout(() => {
      if (email === 'rassanag@gmail.com' && password === 'lamare2024') {
        onLogin({
          id: '1',
          name: 'Rassanah Greta Adhikarya',
          email: 'rassanag@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400',
          role: 'Premium Member'
        });
      } else if (email === 'admin@lamare.com' && password === 'password') {
        onLogin({
          id: 'admin',
          name: 'Admin La Mare',
          email: 'admin@lamare.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
          role: 'Admin'
        });
      } else if (email.includes('@') && password.length >= 6) {
        onLogin({
          id: 'user_123',
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: 'Member'
        });
      } else {
        setError('Invalid credentials. Please check your email and password.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-slate-950 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary text-secondary font-serif text-4xl font-bold shadow-2xl mb-8 transform hover:scale-110 transition-transform duration-300">M</div>
          <h1 className="text-4xl font-bold text-primary dark:text-white heading-elegant mb-3">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Elevate your earning elegance today.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
          
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 flex items-center gap-3 text-red-600 dark:text-red-400 text-sm animate-in shake duration-300">
              <AlertCircle size={18} />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Password</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 pr-12 text-sm focus:ring-2 focus:ring-secondary transition-all dark:text-white" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end px-1 mt-1">
                <button 
                  type="button"
                  onClick={onForgotPassword}
                  className="text-xs font-bold text-secondary hover:text-primary dark:hover:text-white transition-colors underline underline-offset-4 decoration-secondary/30"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-secondary cursor-pointer" 
              />
              <label htmlFor="remember" className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer select-none">Remember this device</label>
            </div>

            <Button 
              type="submit"
              className="w-full py-4 text-lg font-bold shadow-xl rounded-2xl"
              isLoading={isLoading}
            >
              Sign In to Platform
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white dark:bg-slate-900 px-4 text-gray-400 font-bold tracking-[0.3em]">Or Authentication with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 hover:bg-neutral-50 dark:hover:bg-slate-800 transition-all text-sm font-bold text-gray-600 dark:text-gray-300 group">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4 group-hover:scale-110 transition-transform" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 hover:bg-neutral-50 dark:hover:bg-slate-800 transition-all text-sm font-bold text-gray-600 dark:text-gray-300 group">
              <Smartphone className="w-4 h-4 group-hover:scale-110 transition-transform text-secondary" />
              Phone
            </button>
          </div>
        </div>

        <p className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400 font-medium">
          Don't have an elite account yet? <button onClick={onGoToSignUp} className="text-secondary font-bold hover:text-primary dark:hover:text-white transition-colors border-b border-secondary/30">Apply for Access</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
