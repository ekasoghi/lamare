
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { ShoppingBag, TrendingUp, Zap, ShieldCheck, Check, Star, Users, Video, Sparkles, Calendar, Menu, X, ChevronRight, Globe, Shield, Trophy, Rocket, Crown } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
  onSignUp?: () => void;
  onDemo?: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onSignUp, onDemo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-darkBase font-sans text-neutral selection:bg-secondary selection:text-primary">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px] opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${scrolled ? 'bg-darkBase/80 backdrop-blur-2xl py-4 border-white/10' : 'bg-transparent py-8 border-transparent'}`}>
        <div className="flex items-center justify-between px-6 md:px-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-900 border border-secondary/40 flex items-center justify-center font-bold text-secondary font-serif text-xl md:text-2xl shadow-gold group-hover:scale-110 transition-transform">M</div>
            <span className="font-serif font-bold text-2xl md:text-3xl text-white tracking-tighter">La Mare</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 text-white/50 font-bold uppercase tracking-[0.2em] text-[10px]">
            <button onClick={() => scrollToSection('intelligence')} className="hover:text-secondary transition-colors futuristic-border py-2">Intelligence</button>
            <button onClick={() => scrollToSection('access')} className="hover:text-secondary transition-colors futuristic-border py-2">Access</button>
            <button onClick={() => scrollToSection('legacy')} className="hover:text-secondary transition-colors futuristic-border py-2">Legacy</button>
            <div className="h-6 w-px bg-white/10 mx-2"></div>
            <Button variant="ghost" onClick={onStart} className="text-secondary hover:text-white transition-colors">Sign In</Button>
            <Button variant="secondary" onClick={onSignUp || onStart} className="px-8 py-3.5 rounded-2xl shadow-gold font-black">Join Elite</Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-secondary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-darkBase/95 backdrop-blur-3xl" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-darkSurface border-l border-white/10 p-10 flex flex-col transition-transform duration-500 shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="mb-12 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary border border-secondary/40 flex items-center justify-center font-bold text-secondary font-serif text-lg">M</div>
              <span className="font-serif font-bold text-2xl text-white">Menu</span>
           </div>
           
           <div className="flex flex-col gap-8 flex-1">
              <MobileNavLink icon={<Zap size={18}/>} label="Intelligence" onClick={() => scrollToSection('intelligence')} />
              <MobileNavLink icon={<Shield size={18}/>} label="Access" onClick={() => scrollToSection('access')} />
              <MobileNavLink icon={<Globe size={18}/>} label="Legacy" onClick={() => scrollToSection('legacy')} />
           </div>

           <div className="space-y-4 pt-10 border-t border-white/5">
              <Button onClick={onStart} variant="outline" className="w-full py-4 border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-xs">Sign In</Button>
              <Button onClick={onSignUp || onStart} variant="secondary" className="w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-gold">Get Started</Button>
           </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-6 md:px-10 pt-48 md:pt-64 pb-32 md:pb-48 text-center max-w-6xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-black text-[10px] uppercase tracking-[0.5em] mb-12 animate-in fade-in slide-in-from-top-6 duration-1000">
          <Zap size={14} className="animate-pulse" /> The Sovereign Content Core
        </div>
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-white heading-elegant mb-10 md:mb-12 leading-[1] md:leading-[0.85] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Scale with <span className="text-secondary italic gold-text-glow">Precision</span> Efficiency.
        </h1>
        <p className="text-lg md:text-2xl text-white/40 mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed font-light px-4">
          Experience the definitive high-performance toolkit for Shopee Affiliates. 
          Where viral intelligence meets surgical automation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
          <Button 
            size="lg" 
            onClick={onSignUp || onStart} 
            className="text-lg px-12 md:px-16 py-5 md:py-6 rounded-[2rem] shadow-gold-lg bg-secondary text-primary font-black uppercase tracking-widest hover:scale-105 transition-all w-full sm:w-auto"
          >
            Start Your Journey
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={onDemo}
            className="text-lg py-5 md:py-6 px-12 md:px-16 rounded-[2rem] border-white/20 text-white hover:border-secondary hover:text-secondary group transition-all backdrop-blur-md bg-white/5 w-full sm:w-auto"
          >
            View Live Demo
            <div className="ml-3 w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] group-hover:animate-ping"></div>
          </Button>
        </div>
      </section>

      {/* Intelligence Section (Features) */}
      <section id="intelligence" className="py-24 md:py-32 bg-darkSurface/50 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-white heading-elegant mb-6 md:mb-8">Neural Intelligence Suite</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full"></div>
            <p className="text-white/20 mt-6 uppercase tracking-[0.3em] font-bold text-[10px] md:text-xs">Advanced Algorithms for Peak Conversions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <LandingFeatureCategory 
              title="Content Logic"
              icon={<Zap size={32} className="text-secondary" />}
              items={['Neural Idea Engine', 'Cinematic Scripting', 'Conversion Hooks', 'Brand Archetyping']}
            />
            <LandingFeatureCategory 
              title="Visual Core"
              icon={<Video size={32} className="text-secondary" />}
              items={['Faceless Rendering', 'Vertical Optimization', 'URL Synthesis', 'Bulk Mastering']}
            />
            <LandingFeatureCategory 
              title="Quantum AI"
              icon={<Sparkles size={32} className="text-secondary" />}
              items={['Neural Voice Cloning', 'Hyper-Real Thumbnails', 'Style Matrix', 'Face Persistence']}
            />
            <LandingFeatureCategory 
              title="Strategic Sync"
              icon={<Calendar size={32} className="text-secondary" />}
              items={['Omni-Platform Planner', 'Revenue Matrix', 'Audience Heatmaps', 'Scaling Protocols']}
            />
          </div>
        </div>
      </section>

      {/* Access Section (Pricing) */}
      <section id="access" className="py-32 md:py-48 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03),transparent)] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-24 md:mb-32">
            <div className="inline-block px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary font-black text-[9px] uppercase tracking-[0.4em] mb-6">Subscription Matrix</div>
            <h2 className="text-5xl md:text-7xl font-bold text-white heading-elegant mb-8">Tiered Access</h2>
            <p className="text-white/30 max-w-2xl mx-auto uppercase tracking-[0.3em] font-bold text-[10px] md:text-xs">Select your operational clearance level</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-end">
            {/* Starter Tier */}
            <PricingCard 
              title="Starter"
              badge="Foundation"
              icon={<Rocket className="text-white/40" size={24} />}
              price="Gratis"
              desc="Entry-level access to the La Mare intelligence core."
              features={[
                '50 Automated Scrapes / Day',
                'Single Platform Social Sync',
                'Basic AI Content Engine',
                'Weekly Revenue Reports',
                'Community Network Access'
              ]}
              onAction={onSignUp || onStart}
            />

            {/* Elite Tier */}
            <PricingCard 
              featured
              title="Elite"
              badge="Highly Recommended"
              icon={<Trophy className="text-secondary" size={32} />}
              price="Rp 450k"
              period="/bulan"
              desc="The professional standard for high-volume creators."
              features={[
                'Unlimited Neural Scraping',
                'Full Creative Studio Suite',
                '10 AI Video Renders / Month',
                'Neural Voice Synthesis',
                'Daily Strategy Intelligence',
                'Priority Processing Nodes'
              ]}
              onAction={onSignUp || onStart}
            />

            {/* Authority Tier */}
            <PricingCard 
              title="Authority"
              badge="Enterprise"
              icon={<Crown className="text-white/40" size={24} />}
              price="Rp 1.5m"
              period="/bulan"
              desc="Unrestricted power for agencies and large-scale operations."
              features={[
                'Master Clearance Level',
                'Unlimited Video Mastering',
                'White-Label Intelligence',
                'Dedicated Strategic Advisor',
                'Full Neural API Access',
                'Multi-Member Team Sync'
              ]}
              onAction={onSignUp || onStart}
            />
          </div>
        </div>
      </section>

      {/* Legacy Section (About) */}
      <section id="legacy" className="py-24 md:py-32 bg-primary/20 backdrop-blur-sm border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-secondary font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
                The La Mare Legacy
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white heading-elegant mb-10 leading-tight">
                Engineering <span className="text-secondary italic">Digital Prosperity</span>
              </h2>
              <div className="space-y-8 text-white/40 text-lg leading-relaxed font-light">
                <p>
                  Established with a vision to revolutionize the affiliate ecosystem, <span className="text-white font-semibold">La Mare</span> stands at the intersection of aesthetic luxury and brute computing force. 
                </p>
                <p>
                  Our platform is not just a tool; it is a legacy of digital craftsmanship by <span className="text-secondary font-bold">PT Bali Eka Mediatama</span>. We empower creators to transcend manual labor and enter the realm of autonomous enterprise.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-10 mt-16 border-t border-white/5 pt-10">
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2 font-serif">10K+</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">Global Affiliates</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2 font-serif">99.9%</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative group">
               <div className="absolute inset-0 bg-secondary/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <div className="aspect-[4/5] bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl relative">
                 <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000" 
                    alt="Legacy Headquarters" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkBase via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10">
                     <p className="text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-2">Authority Office</p>
                     <p className="text-white font-bold text-lg">Bali Global Hub</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-24 bg-darkSurface relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-4 gap-12 md:gap-16 mb-20">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center font-bold text-secondary font-serif text-2xl border border-secondary/20 shadow-gold">M</div>
                 <span className="font-serif font-bold text-3xl text-white">La Mare</span>
              </div>
              <p className="text-white/30 text-sm italic font-medium leading-relaxed">
                "Elevate Your Earning Elegance through superior intelligence and automation."
              </p>
            </div>
            <div>
              <h4 className="font-black text-white/20 mb-10 uppercase tracking-[0.4em] text-[10px]">Ecosystem</h4>
              <ul className="space-y-6 text-white/50 text-xs font-bold uppercase tracking-widest">
                <li><button onClick={() => scrollToSection('intelligence')} className="hover:text-secondary transition-colors">Intelligence</button></li>
                <li><button onClick={() => scrollToSection('access')} className="hover:text-secondary transition-colors">Access</button></li>
                <li><button onClick={() => scrollToSection('legacy')} className="hover:text-secondary transition-colors">Legacy</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white/20 mb-10 uppercase tracking-[0.4em] text-[10px]">Authority</h4>
              <ul className="space-y-6 text-white/50 text-xs font-bold uppercase tracking-widest">
                <li><button className="hover:text-secondary transition-colors">Media Kit</button></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Global Network</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white/20 mb-10 uppercase tracking-[0.4em] text-[10px]">Support</h4>
              <ul className="space-y-6 text-white/50 text-xs font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-secondary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Data Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] text-center md:text-left">© 2024 La Mare Operations. Part of PT Bali Eka Mediatama Group.</p>
            <div className="flex gap-8 text-white/20">
               <div className="h-6 w-6 rounded-lg bg-white/5 border border-white/10 hover:border-secondary transition-colors cursor-pointer"></div>
               <div className="h-6 w-6 rounded-lg bg-white/5 border border-white/10 hover:border-secondary transition-colors cursor-pointer"></div>
               <div className="h-6 w-6 rounded-lg bg-white/5 border border-white/10 hover:border-secondary transition-colors cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const MobileNavLink = ({ label, icon, onClick }: { label: string, icon: any, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-4 text-white/60 hover:text-secondary transition-all text-lg font-bold uppercase tracking-[0.2em] group"
  >
    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
      {icon}
    </div>
    {label}
    <ChevronRight size={16} className="ml-auto opacity-30" />
  </button>
);

const LandingFeatureCategory = ({ title, icon, items }: { title: string, icon: any, items: string[] }) => (
  <div className="p-10 md:p-12 rounded-[3.5rem] bg-darkBase border border-white/5 hover:border-secondary transition-all hover:shadow-gold-lg group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-secondary/10 transition-colors"></div>
    <div className="mb-10 p-5 rounded-2xl bg-white/5 w-fit border border-white/5 group-hover:border-secondary/30 transition-all">
      {icon}
    </div>
    <h3 className="text-xl md:text-2xl font-bold text-white mb-8 heading-elegant tracking-tight group-hover:text-secondary transition-colors">{title}</h3>
    <ul className="space-y-5">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-4 text-[10px] text-white/40 font-bold uppercase tracking-widest group-hover:text-white/70 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-gold" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const PricingCard = ({ title, badge, icon, price, period, desc, features, featured, onAction }: { title: string, badge: string, icon: any, price: string, period?: string, desc: string, features: string[], featured?: boolean, onAction: () => void }) => (
  <div className={`p-10 md:p-14 rounded-[4rem] border transition-all relative flex flex-col overflow-hidden group h-full ${featured ? 'bg-gradient-to-b from-[#0A2463] to-[#020617] text-white border-secondary shadow-gold-lg scale-100 lg:scale-105 z-10' : 'bg-white/5 backdrop-blur-2xl text-white border-white/10 hover:border-white/20'}`}>
    {featured && (
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-secondary to-transparent animate-pulse"></div>
    )}
    
    <div className="mb-10 flex justify-between items-start">
      <div className="space-y-2">
        <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${featured ? 'text-secondary' : 'text-white/30'}`}>{badge}</span>
        <h3 className={`text-4xl font-bold heading-elegant ${featured ? 'gold-text-glow' : 'text-white'}`}>{title}</h3>
      </div>
      <div className={`p-4 rounded-3xl ${featured ? 'bg-secondary/10' : 'bg-white/5'} transition-colors group-hover:scale-110 duration-500`}>
        {icon}
      </div>
    </div>

    <div className="flex items-baseline gap-2 mb-8">
      <span className="text-5xl font-black font-serif tracking-tighter">{price}</span>
      {period && <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${featured ? 'text-white/40' : 'text-white/20'}`}>{period}</span>}
    </div>

    <p className={`text-xs mb-12 font-medium leading-relaxed ${featured ? 'text-white/60' : 'text-white/30'}`}>{desc}</p>
    
    <div className="flex-1 space-y-6 mb-16">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Operational Clearances:</p>
      <ul className="space-y-5">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest group/item">
            <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 border transition-all ${featured ? 'bg-secondary/10 border-secondary/40 text-secondary group-hover/item:bg-secondary group-hover/item:text-primary' : 'bg-white/5 border-white/10 text-white/30'}`}>
              <Check size={12} />
            </div>
            <span className={featured ? 'text-white/80' : 'text-white/50'}>{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <Button 
      variant={featured ? 'secondary' : 'primary'} 
      className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl transition-all hover:scale-105 active:scale-95 ${featured ? 'bg-secondary text-primary' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
      onClick={onAction}
    >
      Initialize Access
    </Button>
  </div>
);

export default Landing;
