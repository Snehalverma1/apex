
import React from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#007FFF]/5 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Decorative Lines */}
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
           <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
           <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl">
        <div className="mb-10 inline-flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-2.5 rounded-full backdrop-blur-lg">
          <UserCheck size={14} className="text-[#D4AF37]" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#D4AF37]">Human-Led Bespoke Strategy</span>
        </div>
        
        <h1 className="text-7xl md:text-[10rem] font-serif font-bold leading-[0.85] mb-12 tracking-tighter">
          Personal <br />
          <span className="gold-gradient italic px-2">Consultancy</span> <br />
          at Scale.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 font-light mb-16 max-w-4xl mx-auto leading-relaxed">
          Apex Strategy combines the speed of digital intelligence with the high-stakes execution of our senior partners. We personally engineer market dominance for global leaders.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <button 
            onClick={() => document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-12 py-6 bg-white text-black font-bold rounded-sm overflow-hidden transition-all hover:pr-16"
          >
            <span className="relative z-10 flex items-center gap-4 text-xs uppercase tracking-[0.2em]">
              Explore The Case Vault
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button 
            className="px-12 py-6 glass text-white font-bold rounded-sm border border-white/20 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all uppercase tracking-[0.3em] text-[10px]"
          >
            Direct Partner Line
          </button>
        </div>
      </div>

      {/* Floating Metrics Decoration */}
      <div className="absolute bottom-20 left-10 md:left-24 text-left hidden lg:block">
        <div className="text-4xl font-serif font-bold gold-gradient">$14B+</div>
        <div className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mt-2 font-bold">Capital Optimized</div>
      </div>
      
      <div className="absolute bottom-20 right-10 md:right-24 text-right hidden lg:block">
        <div className="text-4xl font-serif font-bold gold-gradient">100%</div>
        <div className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mt-2 font-bold">Partner Engagement</div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] to-transparent z-10" />
    </section>
  );
};

export default Hero;
