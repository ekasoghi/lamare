
import React, { useState } from 'react';
import Button from '../components/Button';
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call to send reset email
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-slate-950 p-6">
      <div className="w-full max-w-md">
        <button 
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-widest uppercase">Back to Login</span>
        </button>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 text-center">
          {!isSent ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 text-secondary mb-8">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-3xl font-bold text-primary dark:text-white heading-elegant mb-4">Reset Password</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed text-sm">
                Enter the email associated with your account and we'll send an elegant link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-neutral-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-secondary transition-all" 
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full py-4 text-lg font-bold shadow-lg mt-4"
                  isLoading={isLoading}
                >
                  Send Reset Link
                </Button>
              </form>
            </div>
          ) : (
            <div className="animate-in zoom-in duration-500">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-8 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold text-primary dark:text-white heading-elegant mb-4">Email Sent</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed text-sm">
                We've sent a password reset link to <span className="text-primary dark:text-white font-bold">{email}</span>. Please check your inbox (and spam folder).
              </p>
              
              <div className="space-y-4">
                <Button 
                  onClick={onBackToLogin}
                  variant="outline"
                  className="w-full dark:border-secondary dark:text-secondary"
                >
                  Return to Login
                </Button>
                <p className="text-xs text-gray-400 italic">
                  Didn't receive the email? <button onClick={() => setIsSent(false)} className="text-secondary font-bold hover:underline">Try another address</button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
