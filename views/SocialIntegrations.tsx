
import React from 'react';
import { Instagram, Facebook, Twitter, Smartphone, Music, CheckCircle2, AlertCircle } from 'lucide-react';
import { SocialAccount } from '../types';
import Button from '../components/Button';

interface SocialProps {
  accounts: SocialAccount[];
  setAccounts: React.Dispatch<React.SetStateAction<SocialAccount[]>>;
}

const SocialIntegrations: React.FC<SocialProps> = ({ accounts, setAccounts }) => {
  
  const toggleConnection = (platform: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.platform === platform) {
        return { ...acc, isConnected: !acc.isConnected, username: !acc.isConnected ? 'new_user_linked' : '' };
      }
      return acc;
    }));
  };

  const getIcon = (platform: string) => {
    switch(platform) {
      case 'Instagram': return <Instagram />;
      case 'TikTok': return <Music />;
      case 'Facebook': return <Facebook />;
      case 'X (Twitter)': return <Twitter />;
      case 'Shopee': return <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" className="w-6 h-6" />;
      default: return <Smartphone />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div key={acc.platform} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${acc.color} shadow-lg`}>
                {getIcon(acc.platform)}
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                acc.isConnected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {acc.isConnected ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                {acc.isConnected ? 'Connected' : 'Disconnected'}
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{acc.platform}</h3>
            <p className="text-sm text-gray-500 mb-6">Automate your {acc.platform} affiliate workflow.</p>
            <Button 
              variant={acc.isConnected ? 'outline' : 'primary'} 
              className="w-full"
              onClick={() => toggleConnection(acc.platform)}
            >
              {acc.isConnected ? 'Disconnect' : 'Connect Account'}
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-3xl font-bold heading-elegant mb-4">Content Calendar Integration</h3>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Sync your schedule with our internal smart scheduler to ensure high-traffic windows.
            </p>
            <Button variant="secondary" size="lg">Open Content Calendar</Button>
          </div>
          <div className="flex-1 grid grid-cols-7 gap-2">
            {[...Array(28)].map((_, i) => (
              <div key={i} className={`h-12 rounded-lg border border-white/10 ${i % 7 === 3 ? 'bg-secondary/20 border-secondary' : 'bg-white/5'} flex items-center justify-center text-[10px] font-bold`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialIntegrations;
