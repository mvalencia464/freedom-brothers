
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle,
  Star, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  PhoneMissed, 
  Bot, 
  Globe,
  ArrowRight,
  MessageSquare,
  Clock,
  Play,
  Calculator,
  HardHat,
  Smartphone,
  Users,
  Palmtree,
  Crown,
  Mail,
  Sparkles,
  Map,
  ArrowLeft
} from 'lucide-react';

const Logo = ({ className = "", onClick }: { className?: string, onClick?: () => void }) => (
  <img 
    src="https://storage.googleapis.com/msgsndr/TN3oWfBb9e5GQ7LIUkkd/media/69537574ee104710784a9cc6.webp" 
    alt="Remote Contractor System" 
    className={`h-12 md:h-16 w-auto brightness-100 cursor-pointer ${className}`}
    onClick={onClick}
  />
);

const WaitlistModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <XCircle size={24} />
        </button>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Secure Your Spot</h3>
          <p className="text-gray-400 text-sm">Join the waitlist for the 2026 release.</p>
        </div>
        <WaitlistForm title="System Access" type="system" onComplete={() => setTimeout(onClose, 2000)} />
      </div>
    </div>
  );
};

const WaitlistForm = ({ title, type, onComplete }: { title: string, type: 'mastermind' | 'retreat' | 'system', onComplete?: () => void }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type }),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }
      
      setSubmitted(true);
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h4 className="text-xl font-black uppercase tracking-tight mb-2">You're on the list</h4>
        <p className="text-gray-400 text-sm">We'll notify you as soon as the {title} doors open.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative group">
        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={20} />
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address" 
          className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all font-medium"
          required
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-6 bg-white text-black font-black text-lg rounded-2xl hover:bg-zinc-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
      >
        {loading ? 'SECURE PLACEMENT...' : `GET NOTIFIED FOR ${title.toUpperCase()}`}
        {!loading && <ArrowRight size={20} strokeWidth={3} />}
      </button>
      <p className="text-[10px] text-center font-black text-gray-600 uppercase tracking-[0.2em]">
        Strictly Limited Capacity • First Come First Served
      </p>
    </form>
  );
};

const Header = ({ setView, setIsModalOpen }: { setView: (v: string) => void, setIsModalOpen: (v: boolean) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Logo className="scale-90 md:scale-100 origin-left" onClick={() => { setView('home'); window.scrollTo(0, 0); }} />
        <div className="hidden md:flex items-center gap-8">
          <a href="#mechanism" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">The Logic</a>
          <a href="#mastermind" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">Mastermind</a>
          <a href="#retreat" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">Remote Retreat</a>
          <button onClick={() => setIsModalOpen(true)} className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all transform active:scale-95 shadow-lg">
            Get The System
          </button>
        </div>
      </div>
    </nav>
  );
};

const VideoPlaceholder = ({ title, sub }: { title: string, sub?: string }) => (
  <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
        <Play size={20} fill="black" className="ml-1 text-black" />
      </div>
    </div>
    <div className="absolute bottom-4 left-4 right-4">
      <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl transition-colors">
        <p className="text-[10px] font-black uppercase tracking-widest text-white mb-0.5">{title}</p>
        {sub && <p className="text-[8px] text-white/60 font-medium uppercase tracking-wider">{sub}</p>}
      </div>
    </div>
  </div>
);

const FeatureCard: React.FC<{ icon: any, title: string, outcome: string, desc: string }> = ({ icon: Icon, title, outcome, desc }) => (
  <div className="group relative p-8 rounded-[2.5rem] bg-zinc-950 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden">
    <div className="relative z-10">
      <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500">
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">{title}</h3>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{outcome}</p>
      <div className="h-[1px] w-full bg-white/10 mb-6 transition-all duration-700 origin-left"></div>
      <p className="text-gray-400 font-medium leading-relaxed text-sm">{desc}</p>
    </div>
  </div>
);

const VideoEmbed = ({ src, title }: { src: string, title: string }) => (
  <div className="relative aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
    <iframe 
      src={src} 
      frameBorder="0" 
      webkitallowfullscreen="true" 
      mozallowfullscreen="true" 
      allowFullScreen 
      className="absolute top-0 left-0 w-full h-full"
      title={title}
    ></iframe>
  </div>
);

const PlannerPage = ({ setView }: { setView: (v: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm">
            <Map size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Free Tool</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.85] text-gradient">
            2026 Strategic<br/>War Map
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
            The exact planning framework for 8-figure growth. Learn the Sam Evans war map methodology to dominate your market in 2026.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-20">
          <VideoEmbed 
            src="https://www.youtube.com/embed/l6lV30ds3XI?start=1818" 
            title="Sam Evans War Map Tutorial" 
          />
          <div className="mt-8 p-8 rounded-3xl bg-zinc-950 border border-white/5 text-center">
            <p className="text-gray-400 mb-8 font-medium italic">"The quality of your business is determined by the quality of your map."</p>
            <a 
              href="https://plan.stokeleads.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black text-xl rounded-2xl hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-2xl"
            >
              ACCESS YOUR FREE WAR MAP ACCOUNT <ArrowRight size={24} strokeWidth={3} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      <Header setView={setView} setIsModalOpen={setIsModalOpen} />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {view === 'home' ? (
        <>
          {/* HERO SECTION */}
          <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] bg-white/[0.02] blur-[180px] rounded-full -z-10 animate-float"></div>
            
            <div className="max-w-6xl mx-auto relative z-10 text-center">
              <div className="mb-8 inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Now Available 2026</span>
              </div>

              <h1 className="text-4xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.85] text-gradient max-w-5xl mx-auto">
                Run Your Business Without Answering the Phone
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
                Book more jobs, miss fewer leads, and step off the site using the same system Jordan Webb used to run a multi-7-figure construction business from 3,000 miles away.
              </p>

              <div className="max-w-5xl mx-auto mb-12">
                <VideoEmbed 
                  src="https://www.loom.com/embed/3e768b9a3fc4430ca7d10497542d82a1" 
                  title="Remote Contractor System Overview" 
                />
              </div>

              <div className="flex flex-col items-center gap-6">
                <button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto px-16 py-6 bg-white text-black font-black text-xl rounded-2xl hover:bg-zinc-200 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  GET THE SYSTEM <ArrowRight size={22} strokeWidth={3} />
                </button>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                  Built by an active contractor • No contracts • Cancel anytime
                </p>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section id="testimonials" className="py-32 px-6 bg-black">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20 space-y-4">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Proof</p>
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase">What Your Peers Are Seeing</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <VideoPlaceholder title="Roofing Owner — 2× Revenue" sub="Mike's Scale Story" />
                <VideoPlaceholder title="HVAC Company — #1 on Google" sub="Dominating Local Search" />
                <VideoPlaceholder title="Solar Installer — Faster Scaling" sub="Speed To Lead Win" />
                
                <VideoPlaceholder title="Deck Builder — Remote Mastery" sub="Hawaii to Alaska Workflow" />
                <VideoPlaceholder title="Painting Pro — Review Engine" sub="From 3 to 150+ Reviews" />
                <VideoPlaceholder title="Landscaping — No Missed Calls" sub="Recovered $40k in 1 Week" />
                
                <VideoPlaceholder title="Plumbing Guru — AI Chat Bot" sub="Booking Jobs While Asleep" />
                <VideoPlaceholder title="Remodeling — SMS Profit Center" sub="Re-marketing Masterclass" />
                <VideoPlaceholder title="General Contractor — Exit Strategy" sub="Stepping Off the Jobsite" />
              </div>
            </div>
          </section>

          {/* THE PAIN */}
          <section className="py-32 px-6 bg-zinc-950/50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-7xl font-black mb-16 tracking-tighter uppercase text-center">Every Missed Call Is a Lost Job</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
                <div className="p-10 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 group hover:border-white/20 transition-all">
                  <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center mb-6 shadow-xl transition-all">
                    <XCircle size={24} strokeWidth={3} />
                  </div>
                  <p className="text-xl font-black leading-tight uppercase tracking-tight mb-2">Homeowners don’t leave voicemails</p>
                  <p className="text-sm text-gray-500 font-medium">If you don't answer, they simply move to the next person on Google.</p>
                </div>
                <div className="p-10 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 group hover:border-white/20 transition-all">
                  <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center mb-6 shadow-xl transition-all">
                    <Clock size={24} strokeWidth={3} />
                  </div>
                  <p className="text-xl font-black leading-tight uppercase tracking-tight mb-2">Slow follow-up kills trust</p>
                  <p className="text-sm text-gray-500 font-medium">A lead that waits 10 minutes is 100x more likely to go cold.</p>
                </div>
                <div className="p-10 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 group hover:border-white/20 transition-all">
                  <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center mb-6 shadow-xl transition-all">
                    <TrendingUp size={24} strokeWidth={3} />
                  </div>
                  <p className="text-xl font-black leading-tight uppercase tracking-tight mb-2">Competitors answer faster than you</p>
                  <p className="text-sm text-gray-500 font-medium">Big companies have offices. You have a ladder. You're losing the speed game.</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-4">
                  You don’t have a marketing problem.
                </p>
                <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-zinc-600">
                  You have a response-speed problem.
                </p>
              </div>
            </div>
          </section>

          {/* THE MECHANISM */}
          <section id="mechanism" className="py-32 px-6 bg-black border-y border-white/5">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-3xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">This System Responds in<br/>Under 60 Seconds—Every Time</h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Works 24/7. Even nights. Even weekends.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12 relative">
                <div className="hidden md:block absolute top-12 left-[30%] right-[30%] h-[2px] bg-gradient-to-r from-white/5 via-white/20 to-white/5 -z-10"></div>
                
                <div className="space-y-6 text-center group">
                  <div className="w-24 h-24 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center mx-auto shadow-2xl relative transition-all">
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full font-black flex items-center justify-center transition-all">1</div>
                    <HardHat size={40} className="text-white/40 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Lead Calls or Fills Form</h3>
                    <p className="text-gray-400 text-sm font-medium">You’re on a ladder. Phone stays in your pocket. You're focused on the work.</p>
                  </div>
                </div>

                <div className="space-y-6 text-center group">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl relative transition-all">
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full font-black flex items-center justify-center">2</div>
                    <Smartphone size={40} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">System Texts Them Instantly</h3>
                    <p className="text-gray-400 text-sm font-medium">They stop searching. They start texting you. The touchpoint is established instantly.</p>
                  </div>
                </div>

                <div className="space-y-6 text-center group">
                  <div className="w-24 h-24 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center mx-auto shadow-2xl relative transition-all">
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full font-black flex items-center justify-center transition-all">3</div>
                    <CheckCircle2 size={40} className="text-white/40 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">You Win the Job</h3>
                    <p className="text-gray-400 text-sm font-medium">Lead captured. Follow-up running. No call answered, but the contract is signed.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOUNDER PROOF */}
          <section className="py-32 px-6 bg-black relative overflow-hidden">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Founder</p>
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">Built by a Contractor—<br/><span className="text-zinc-500 italic">Not a Marketer</span></h2>
                </div>
                <div className="space-y-8 text-xl text-gray-400 font-medium leading-relaxed">
                  <p>For five years, I ran my multi-seven-figure deck business in Anchorage, Alaska while living in Honolulu, Hawaii.</p>
                  <p className="font-black text-white uppercase tracking-tight">No gurus. No agencies. Just systems that worked.</p>
                  <p>I built this because I was tired of being trapped in my own business. I needed a system that functioned when I wasn't there.</p>
                </div>
                <div className="pt-4">
                  <div className="flex flex-col">
                    <span className="text-4xl font-serif italic text-white mb-2 leading-none">Jordan Webb</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Active Contractor & Founder</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group">
                  <img 
                    src="https://storage.googleapis.com/msgsndr/TN3oWfBb9e5GQ7LIUkkd/media/696546c8c7683b7244e10c9f.png" 
                    className="grayscale opacity-90 aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-1000" 
                    alt="Jordan Webb" 
                  />
                  <div className="absolute bottom-12 left-12 z-20 space-y-2">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-black">AK</div>
                       <ArrowRight className="text-white/40" />
                       <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-black">HI</div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60">3,000 MILES. ZERO MISSED LEADS.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* THE TRANSFORMATION GRID */}
          <section className="py-32 px-6 bg-zinc-950">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-black mb-16 tracking-tighter uppercase text-center">The Transformation</h2>
              
              <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-2xl">
                <div className="grid grid-cols-2 text-center border-b border-white/10">
                  <div className="p-6 md:p-8 bg-zinc-900/50 text-gray-400 font-black uppercase tracking-widest text-xs">Without System</div>
                  <div className="p-6 md:p-8 bg-white/5 text-white font-black uppercase tracking-widest text-xs">With System</div>
                </div>
                
                {[
                  { label: "Phone Ringing on Jobsite", old: "Missed Call = Lost $20k", new: "Instant Automated Text Back" },
                  { label: "New Website Lead", old: "Called back 3 hours later (Gone)", new: "Personal Text in <60 Seconds" },
                  { label: "Google Reviews", old: "Asking manually (Forget 90%)", new: "Automated Review Engine" },
                  { label: "Business Location", old: "Tethered to the jobsite", new: "Remote Management (3,000mi)" },
                  { label: "After Hours Leads", old: "Lost until morning", new: "24/7 AI Receptionist Qualifies" },
                  { label: "Repeat Business", old: "Hoping they remember you", new: "SMS Profit Center Marketing" }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-2 border-b border-white/5 last:border-0 items-center">
                    <div className="p-6 md:p-8 flex items-start gap-3 border-r border-white/5 opacity-60">
                      <XCircle size={18} className="text-zinc-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest mb-1">{row.label}</p>
                        <p className="text-xs md:text-sm font-bold">{row.old}</p>
                      </div>
                    </div>
                    <div className="p-6 md:p-8 flex items-start gap-3 bg-white/[0.02]">
                      <CheckCircle2 size={18} className="text-white shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">{row.label}</p>
                        <p className="text-xs md:text-sm font-bold text-white">{row.new}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURES GRID */}
          <section id="features" className="py-32 px-6 relative overflow-hidden bg-black">
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-24">
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase mb-6">Everything You Need.<br/><span className="text-zinc-800">Nothing You Don’t.</span></h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard 
                  icon={Zap} 
                  title="Instant Lead Response" 
                  outcome="< 60s Response Time" 
                  desc="Win jobs before competitors even check their voicemail. Automated follow-up that hits as soon as the lead does." 
                />
                <FeatureCard 
                  icon={PhoneMissed} 
                  title="Missed Call Text-Back" 
                  outcome="Save $20k Jobs" 
                  desc="If you miss a call, the system texts them instantly. No voicemail needed. No lost revenue from busy hands." 
                />
                <FeatureCard 
                  icon={Bot} 
                  title="24/7 AI Website Chat" 
                  outcome="Auto-Qualify Leads" 
                  desc="Qualifies leads while you’re on-site or sleeping. Captures intent and contact info without you lifting a finger." 
                />
                <FeatureCard 
                  icon={Star} 
                  title="Google Review Engine" 
                  outcome="Higher Rankings" 
                  desc="More reviews lead to higher rankings and cheaper leads. Automatically ask every customer for a review." 
                />
                <FeatureCard 
                  icon={Globe} 
                  title="Local SEO Setup" 
                  outcome="Rank Where People Search" 
                  desc="We set up your local presence so you show up exactly where homeowners are already looking for your services." 
                />
                <FeatureCard 
                  icon={MessageSquare} 
                  title="SMS Profit Center" 
                  outcome="Repeat Business" 
                  desc="Market to your existing database with 98% open rates. Get repeat business without spending a dime on ads." 
                />
              </div>
            </div>
          </section>

          {/* ROI MATH SECTION */}
          <section className="py-32 px-6 bg-zinc-950 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20 space-y-4">
                <h2 className="text-3xl md:text-7xl font-black tracking-tighter uppercase leading-none">The Math Is Stupid Simple</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center bg-black border border-white/5 rounded-[3rem] p-12 md:p-20 shadow-2xl">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase text-gray-500 tracking-widest">Revenue Recovery</p>
                    <div className="flex items-end gap-3">
                       <span className="text-5xl md:text-7xl font-black tracking-tighter text-white">$120,000</span>
                    </div>
                    <p className="text-sm font-medium text-gray-400 italic">Save just 6 jobs per year at $20,000 each.</p>
                  </div>

                  <div className="w-full h-[1px] bg-white/5"></div>

                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase text-gray-500 tracking-widest">System Investment</p>
                    <div className="flex items-end gap-3">
                       <span className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-600">$3,564</span>
                       <span className="text-xs text-zinc-700 font-bold uppercase mb-2">/ YEAR</span>
                    </div>
                    <p className="text-sm font-medium text-gray-400 italic">Flat monthly cost of $297/mo.</p>
                  </div>
                </div>

                <div className="bg-zinc-900/50 p-12 rounded-[2.5rem] border border-white/5 text-center space-y-6">
                  <Calculator size={48} className="mx-auto text-white/10 mb-4" />
                  <p className="text-6xl md:text-8xl font-black tracking-tighter text-indigo-500 animate-float">3,300%</p>
                  <p className="text-xl font-black uppercase tracking-widest text-white">ROI</p>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pt-4">CONSERVATIVE ESTIMATE</p>
                </div>
              </div>
            </div>
          </section>

          {/* OFFER SECTION */}
          <section id="pricing" className="py-32 px-6 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-7xl font-black mb-20 tracking-tighter uppercase leading-[0.9]">Your New Operating System</h2>
              
              <div className="p-10 md:p-24 bg-zinc-950 rounded-[4rem] border border-white/10 relative overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                <div className="mb-14">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-3xl font-black text-white/20">$</span>
                    <span className="text-7xl md:text-9xl font-black tracking-tighter">297</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">PER MONTH • ALL FEATURES INCLUDED</p>
                </div>

                <div className="grid md:grid-cols-2 gap-y-6 gap-x-12 mb-16 text-left max-w-2xl mx-auto">
                  {[
                    "Speed-to-Lead Automation",
                    "Missed Call Recovery",
                    "AI Website Chat",
                    "Review & Reputation System",
                    "Local SEO Setup",
                    "SMS Marketing",
                    "Customer Database",
                    "No Contracts. Cancel Anytime."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <CheckCircle2 size={18} className="text-white shrink-0 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-8">
                  <button onClick={() => setIsModalOpen(true)} className="block w-full py-8 bg-white text-black font-black text-2xl rounded-3xl hover:bg-zinc-200 transition-all transform active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    GET THE SYSTEM
                  </button>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-4">
                     <p className="text-white/40 font-bold text-[10px] tracking-widest uppercase flex items-center gap-2">
                      <ShieldCheck size={16} /> Secure Checkout
                    </p>
                    <p className="text-white/40 font-bold text-[10px] tracking-widest uppercase flex items-center gap-2">
                      <XCircle size={16} /> No Hidden Fees
                    </p>
                    <p className="text-white/40 font-bold text-[10px] tracking-widest uppercase flex items-center gap-2">
                      <HardHat size={16} /> Contractor-Built
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FINAL CLOSE */}
          <section className="py-40 px-6 text-center bg-zinc-950/50 relative overflow-hidden">
            <div className="max-w-4xl mx-auto space-y-12">
               <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                Stop Losing Jobs Because You Were Busy Doing the Work
              </h2>
              <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto">
                Build a business that runs even when you’re not there. Freedom starts with a system.
              </p>
              <div className="pt-6">
                <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-4 px-16 py-8 bg-white text-black font-black text-2xl rounded-2xl hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-[0_30px_60px_rgba(255,255,255,0.1)]">
                  CLAIM YOUR SYSTEM <ArrowRight size={28} strokeWidth={3} />
                </button>
              </div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em] pt-8">
                Built by Jordan Webb • Alaska to Hawaii Scale
              </p>
            </div>
          </section>

          {/* MASTERMIND SECTION */}
          <section id="mastermind" className="py-32 px-6 relative overflow-hidden border-t border-white/5">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-white/10 bg-white/5">
                  <Crown size={14} className="text-indigo-400" />
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Elite Community</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                  Mastermind<br/><span className="text-white/20">The Inner Circle</span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed font-medium">
                  Join the 1% of contractors who have cracked the remote code. This isn't just a course—it's a high-level operators scaling to 8-figures while reclaiming their time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-sm">Weekly Elite Calls</h4>
                      <p className="text-xs text-gray-500">Direct access to Jordan and top-tier guest experts.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-sm">Scaling Playbooks</h4>
                      <p className="text-xs text-gray-500">Every SOP, hire plan, and remote system we use.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-950/50 border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600/20 blur-2xl rounded-full"></div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6 text-center">Secure Your Waitlist Spot</h3>
                <WaitlistForm title="Mastermind" type="mastermind" />
              </div>
            </div>
          </section>

          {/* REMOTE CONTRACTOR RETREAT SECTION */}
          <section id="retreat" className="py-32 px-6 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none grayscale">
              <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070" className="w-full h-full object-cover" alt="Retreat vibe" />
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-white/10 bg-white/5 mx-auto">
                  <Palmtree size={14} className="text-emerald-400" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Tropical Strategy session</span>
                </div>
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                  Remote Retreat 2026
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 font-medium">
                  4 Days in Paradise. Working <span className="text-white italic underline">on</span> your business, not in it. 
                  The ultimate immersive strategy session for contractors ready to exit the field.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                {[
                  { title: "Ultra-Luxury", desc: "Private villas, world-class dining, and zero distractions.", icon: <Star size={24}/> },
                  { title: "Deep Strategy", desc: "Full breakdown of your business model for the 2026 market.", icon: <TrendingUp size={24}/> },
                  { title: "Connection", desc: "Forge lifelong bonds with other high-performing owners.", icon: <Users size={24}/> }
                ].map((item, i) => (
                  <div key={i} className="p-10 rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-white/10 group hover:border-white/30 transition-all">
                    <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tight mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="max-w-xl mx-auto">
                <div className="p-2 bg-white/5 rounded-[2rem] border border-white/10">
                   <WaitlistForm title="Remote Retreat" type="retreat" />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <PlannerPage setView={setView} />
      )}

      {/* FOOTER */}
      <footer className="py-24 border-t border-white/5 bg-black px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8">
            <Logo onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="scale-75 origin-left" />
            <p className="text-gray-600 text-[10px] font-black tracking-[0.2em] uppercase max-w-xs leading-relaxed">
              © 2026 REMOTE CONTRACTOR SYSTEM.<br/>THE EXACT BLUEPRINT FOR CONTRACTOR SCALE.<br/>FREEDOM BROTHERS.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-2">
                <li><button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest">Home</button></li>
                <li><a href="#mastermind" className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest">Mastermind</a></li>
                <li><a href="#retreat" className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest">Retreat</a></li>
                <li><a href="#pricing" className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest">Pricing</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Free Tools</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setView('planner')}
                    className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest"
                  >
                    2026 Planner
                  </button>
                </li>
                <li>
                  <a 
                    href="https://plan.stokeleads.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest"
                  >
                    StokeLeads Plan
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-8 left-8 right-8 z-40 md:hidden">
        <button onClick={() => setIsModalOpen(true)} className="w-full py-5 bg-white text-black font-black rounded-2xl text-center flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.9)] uppercase tracking-widest text-sm transform active:scale-95">
          CLAIM YOUR SYSTEM <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
