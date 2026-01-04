
import React from 'react';
import { Layers, Globe, Zap, ArrowRight, ShieldCheck, TrendingUp, Cpu, BarChart3, Bot } from 'lucide-react';
import { Service } from '../types';
import * as LucideIcons from 'lucide-react';

interface ServicePageProps {
  services: Service[];
  onContactClick: () => void;
}

const DynamicIcon = ({ name, className }: { name: string; className: string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <Icon className={className} size={32} />;
};

const ServicePage: React.FC<ServicePageProps> = ({ services, onContactClick }) => {
  return (
    <div className="pt-32 pb-24 bg-[#050505]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center max-w-4xl mx-auto">
          <span className="text-[12px] uppercase tracking-[0.6em] text-[#007FFF] font-black block mb-6">Capabilities Portfolio</span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-10 leading-tight">
            Architecting <span className="gold-gradient italic">Competitive</span> Superiority.
          </h1>
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">
            Our services aren't off-the-shelf. We provide specialized growth engineering, combining human partner expertise with AI-driven execution for the world's most ambitious leaders.
          </p>
          <div className="flex justify-center gap-8">
             <div className="flex items-center gap-3 px-6 py-3 glass rounded-full border border-[#D4AF37]/30">
                <ShieldCheck size={16} className="text-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300">ISO 27001 Certified Strategy</span>
             </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-6 space-y-32 mb-40">
        {services.map((service, index) => (
          <div key={service.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}>
            <div className="lg:w-1/2">
               <div className="w-20 h-20 bg-[#007FFF]/10 rounded-3xl flex items-center justify-center mb-10 border border-[#007FFF]/20 blue-glow">
                  <DynamicIcon name={service.iconName} className="text-[#007FFF]" />
               </div>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">{service.title}</h2>
               <p className="text-lg text-gray-400 font-light leading-relaxed mb-10">
                 {service.detailedContent}
               </p>
               <ul className="space-y-4 mb-10">
                  {['Custom ROI Models', 'Zero-Latency Implementation', 'Dedicated Partner Lead'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-gray-500">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                       {item}
                    </li>
                  ))}
               </ul>
               <button 
                onClick={onContactClick}
                className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-[#D4AF37] hover:text-white transition-colors"
               >
                 Inquire about {service.title} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
            <div className="lg:w-1/2 w-full aspect-video glass rounded-3xl border border-white/5 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-[#007FFF]/10 via-transparent to-[#D4AF37]/5" />
               <div className="absolute inset-0 flex items-center justify-center">
                  {/* Decorative AI visual */}
                  <div className="relative">
                    <div className="w-48 h-48 border border-white/10 rounded-full animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Bot size={48} className="text-white/20" />
                    </div>
                  </div>
               </div>
               <div className="absolute bottom-10 left-10 p-6 glass rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-loose">
                    "This pillar utilizes our proprietary Apex Matrix v2.0 for predictive outcome modeling."
                  </p>
               </div>
            </div>
          </div>
        ))}
      </section>

      {/* Methodology Brief */}
      <section className="bg-white/[0.02] py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <span className="text-[11px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold block mb-10">The Apex Standard</span>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { label: 'Audit', icon: <BarChart3 /> },
                { label: 'Weaponize', icon: <Zap /> },
                { label: 'Deploy', icon: <TrendingUp /> },
                { label: 'Optimize', icon: <Cpu /> }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      {/* Fix: Cast step.icon to React.ReactElement<any> to resolve TypeScript error regarding 'size' and 'className' props not existing on unknown element types in cloneElement */}
                      {React.cloneElement(step.icon as React.ReactElement<any>, { size: 24, className: 'text-[#007FFF]' })}
                   </div>
                   <span className="text-sm font-bold uppercase tracking-[0.3em]">{step.label}</span>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
