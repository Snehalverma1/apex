
import React from 'react';
import { X, TrendingUp, Target, Lightbulb, PhoneCall, UserCheck } from 'lucide-react';
import { Project } from '../types';
import StrategyAI from './StrategyAI';

interface ProjectDeepDiveProps {
  project: Project;
  onClose: () => void;
}

const ProjectDeepDive: React.FC<ProjectDeepDiveProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-7xl h-full bg-[#050505] border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)]">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-white/10 transition-all border border-white/10"
        >
          <X size={24} />
        </button>

        {/* Content Side */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-20">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
               <span className="text-[10px] uppercase tracking-[0.6em] text-[#007FFF] font-black">Strategic Engagement Case</span>
               <div className="h-px flex-1 bg-white/5" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">{project.title}</h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">{project.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[#D4AF37]">
                <Target size={24} />
                <h4 className="font-bold uppercase tracking-[0.3em] text-[11px]">The Challenge</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{project.challenge}</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[#007FFF]">
                <Lightbulb size={24} />
                <h4 className="font-bold uppercase tracking-[0.3em] text-[11px]">The Strategy</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{project.strategy}</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-green-500">
                <TrendingUp size={24} />
                <h4 className="font-bold uppercase tracking-[0.3em] text-[11px]">The Outcome</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{project.outcome}</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-20 group">
            <img src={project.image} alt={project.title} className="w-full h-[500px] object-cover transition-transform duration-[3000ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-10 left-10">
               <span className="text-[10px] uppercase tracking-[0.5em] text-white/50">Engagement Visual Record // {project.category}</span>
            </div>
          </div>

          {/* Partner Call to Action */}
          <div className="p-12 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h4 className="text-2xl font-serif font-bold mb-4">Discuss this engagement with a <span className="text-[#D4AF37]">Lead Partner</span></h4>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                Our AI assistant below can provide data overviews, but true organizational transformation requires human-to-human collaboration. Speak with the consultant who led this project.
              </p>
            </div>
            <button className="whitespace-nowrap px-10 py-5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.3em] rounded-sm hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/10 flex items-center gap-3">
              <PhoneCall size={16} />
              Book Partner Session
            </button>
          </div>
        </div>

        {/* AI Side */}
        <div className="w-full md:w-[450px] border-l border-white/5 bg-white/[0.01] p-10 flex flex-col">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
               <UserCheck size={28} className="text-[#007FFF]" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-3">AI Discovery Portal</h3>
            <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest px-4">
              Query our digital knowledge base regarding this engagement's technical framework.
            </p>
          </div>
          
          <StrategyAI project={project} />
          
          <div className="mt-auto pt-10 border-t border-white/5">
             <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <div>
                   <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Partners Online</span>
                   <p className="text-[9px] text-gray-600 uppercase tracking-tighter">Zurich & Dhanbad Offices Active</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDeepDive;
