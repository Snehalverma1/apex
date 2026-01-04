
import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

interface KeyGuardProps {
  onAuthenticated: () => void;
}

const KeyGuard: React.FC<KeyGuardProps> = ({ onAuthenticated }) => {
  const [checking, setChecking] = useState(true);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
      setChecking(false);
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Proceed immediately as per instructions to avoid race conditions
      onAuthenticated();
    }
  };

  if (checking) return <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center"><div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" /></div>;
  if (hasKey) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center p-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#007FFF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 glass max-w-lg w-full p-12 rounded-3xl border border-white/10 text-center blue-glow">
        <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#D4AF37]/20">
          <ShieldCheck className="text-[#D4AF37]" size={40} />
        </div>
        
        <h2 className="text-3xl font-serif font-bold mb-4 tracking-tight">Access <span className="text-[#D4AF37]">Authorization</span></h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          To interact with the Apex Strategy Vault and our AI Concierge, please authenticate with your Gemini API key.
        </p>

        <div className="space-y-4">
          <button 
            onClick={handleSelectKey}
            className="w-full py-4 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:text-white transition-all group uppercase tracking-widest text-xs"
          >
            <Key size={16} />
            Initialize Strategic Link
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
          >
            <ExternalLink size={12} />
            Get Free API Key
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-[9px] text-gray-600 uppercase tracking-widest leading-loose">
            Enterprise Security Protocol v4.2 <br />
            Apex Strategy Digital Infrastructure
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyGuard;
