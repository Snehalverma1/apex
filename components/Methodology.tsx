
import React from 'react';
import { Target, ShieldCheck, Cpu, BarChart3 } from 'lucide-react';

const Methodology: React.FC = () => {
  const steps = [
    {
      icon: <Target className="text-[#007FFF]" />,
      title: "Deep Diagnostics",
      desc: "We begin with an exhaustive audit of your technical and operational architecture to identify hidden friction points."
    },
    {
      icon: <Cpu className="text-[#D4AF37]" />,
      title: "AI Weaponization",
      desc: "Not just integration—we build custom LLM-powered ecosystems designed for your specific vertical dominance."
    },
    {
      icon: <ShieldCheck className="text-[#007FFF]" />,
      title: "Execution Rigor",
      desc: "Our implementation teams operate with military precision, ensuring zero-downtime transformations."
    },
    {
      icon: <BarChart3 className="text-[#D4AF37]" />,
      title: "Performance Mining",
      desc: "Post-launch, we continuously optimize performance using real-time predictive analytics."
    }
  ];

  return (
    <section id="methodology" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#007FFF] font-bold block mb-6">Execution Framework</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight">
              Ruthless <span className="italic">Efficiency</span>, <br />
              Scientific <span className="gold-gradient">Precision</span>.
            </h2>
            <p className="text-xl text-gray-400 font-light mb-12 leading-relaxed">
              At Apex, we discard traditional consultancy fluff. We provide hard-coded strategies and battle-tested frameworks that prioritize ROI above all else.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 glass rounded-xl">
                 <div className="text-4xl font-serif font-bold mb-2 text-[#D4AF37]">01</div>
                 <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Analysis Phase</div>
              </div>
              <div className="p-6 glass rounded-xl">
                 <div className="text-4xl font-serif font-bold mb-2 text-[#007FFF]">02</div>
                 <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Synthesis Phase</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 rounded-2xl group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background visual detail */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1/2 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>
    </section>
  );
};

export default Methodology;
