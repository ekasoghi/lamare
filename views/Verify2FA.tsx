
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Mail, MessageCircle, ArrowLeft, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

interface Verify2FAProps {
  user: any;
  onVerified: () => void;
  onBack: () => void;
}

const Verify2FA: React.FC<Verify2FAProps> = ({ user, onVerified, onBack }) => {
  const [step, setStep] = useState<'CHOICE' | 'VERIFY'>('CHOICE');
  const [method, setMethod] = useState<'EMAIL' | 'WHATSAPP' | null>(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any;
    if (step === 'VERIFY' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSelectMethod = (m: 'EMAIL' | 'WHATSAPP') => {
    setMethod(m);
    setIsLoading(true);
    // Simulate sending OTP to the requested channel
    setTimeout(() => {
      setIsLoading(false);
      setStep('VERIFY');
      setTimer(60);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input for smoother UX
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.some(v => v === '')) return;
    
    setIsLoading(true);
    // Simulate high-security verification check
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Brief delay to show success state before navigating
      setTimeout(onVerified, 1200);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-slate-950 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/20 backdrop-blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800 text-center relative overflow-hidden">
          {step === 'CHOICE' ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-secondary/10 text-secondary mb-4 relative">
                <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping opacity-20"></div>
                <ShieldCheck size={48} className="relative z-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary dark:text-white heading-elegant mb-3">Security Protocol</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-2">
                  To maintain the integrity of our affiliate network, 2FA verification is mandatory. Please choose your delivery channel.
                </p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => handleSelectMethod('EMAIL')}
                  disabled={isLoading}
                  className="w-full group flex items-center gap-6 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 hover:border-secondary hover:bg-secondary/5 transition-all text-left"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary text-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Mail size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary dark:text-white text-base">Verify via Email</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Delivery to {user?.email || 'Registered Address'}</p>
                  </div>
                </button>

                <button 
                  onClick={() => handleSelectMethod('WHATSAPP')}
                  disabled={isLoading}
                  className="w-full group flex items-center gap-6 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 hover:border-secondary hover:bg-secondary/5 transition-all text-left"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <MessageCircle size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary dark:text-white text-base">WhatsApp OTP</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Instant delivery via WhatsApp</p>
                  </div>
                </button>
              </div>

              {isLoading && (
                <div className="flex items-center justify-center gap-3 text-secondary text-xs font-bold uppercase tracking-[0.2em] mt-8">
                  <Loader2 className="animate-spin" size={16} />
                  Generating Secure Token...
                </div>
              )}
              
              <button 
                onClick={onBack} 
                className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors mt-8"
              >
                Cancel and Restart
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              {isSuccess ? (
                <div className="py-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-24 h-24 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
                    <CheckCircle2 size={56} className="relative z-10" />
                  </div>
                  <h2 className="text-4xl font-bold text-primary dark:text-white heading-elegant">Identity Verified</h2>
                  <p className="text-gray-400 mt-3 font-medium">Entering your private dashboard...</p>
                </div>
              ) : (
                <>
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-6">
                      {method === 'EMAIL' ? <Mail size={24} /> : <MessageCircle size={24} />}
                    </div>
                    <h2 className="text-3xl font-bold text-primary dark:text-white heading-elegant mb-3">Confirm Token</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Enter the 6-digit access code sent to your <span className="font-bold text-primary dark:text-white">{method === 'EMAIL' ? 'Email' : 'WhatsApp'}</span>.
                    </p>
                  </div>

                  <div className="flex justify-between gap-3 max-w-sm mx-auto">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        value={digit}
                        maxLength={1}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        className="w-12 h-16 text-center text-3xl font-serif font-bold bg-neutral-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-secondary transition-all dark:text-white"
                      />
                    ))}
                  </div>

                  <div className="space-y-6 pt-4">
                    <Button 
                      className="w-full py-5 text-lg font-bold shadow-2xl rounded-2xl"
                      onClick={handleVerify}
                      isLoading={isLoading}
                      disabled={otp.some(v => v === '')}
                    >
                      Authenticate Account
                    </Button>

                    <div className="text-xs font-bold uppercase tracking-[0.2em]">
                      {timer > 0 ? (
                        <p className="text-gray-400">Request new code in <span className="text-secondary">{timer}s</span></p>
                      ) : (
                        <button 
                          onClick={() => handleSelectMethod(method!)}
                          className="text-secondary hover:text-primary dark:hover:text-white transition-colors underline underline-offset-4"
                        >
                          Resend Token Now
                        </button>
                      )}
                    </div>

                    <button 
                      onClick={() => { setStep('CHOICE'); setOtp(['','','','','','']); }}
                      className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors mx-auto group"
                    >
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Methods
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify2FA;
