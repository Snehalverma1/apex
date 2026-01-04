
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle, Shield } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <div className="pt-40 pb-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-24">
          
          <div className="lg:w-1/2">
            <span className="text-[11px] uppercase tracking-[0.6em] text-[#D4AF37] font-black block mb-8">Secure Engagement Portal</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-10 leading-tight">
              Let's Engineer <br />
              Your <span className="gold-gradient italic">Dominance</span>.
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-16 max-w-xl">
              Partner access is strictly prioritized by organizational impact. Provide the following data for a preliminary strategic evaluation.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-8">
                <div className="w-12 h-12 bg-[#007FFF]/10 rounded-xl flex items-center justify-center border border-[#007FFF]/20">
                  <Mail className="text-[#007FFF]" size={20} />
                </div>
                <div>
                   <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-500 mb-2">Primary Protocol</h4>
                   <p className="text-lg font-bold">engagements@apexstrategy.global</p>
                </div>
              </div>
              
              <div className="flex items-start gap-8">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/20">
                  <Phone className="text-[#D4AF37]" size={20} />
                </div>
                <div>
                   <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-500 mb-2">Direct Partner Line</h4>
                   <p className="text-lg font-bold">+91 (0) 326 220 5431</p>
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="w-12 h-12 bg-[#007FFF]/10 rounded-xl flex items-center justify-center border border-[#007FFF]/20">
                  <MapPin className="text-[#007FFF]" size={20} />
                </div>
                <div>
                   <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-500 mb-2">Command Centers</h4>
                   <p className="text-lg font-bold">Dhanbad, India // Zurich, Switzerland</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="glass p-12 rounded-3xl border border-white/5 relative blue-glow">
              {formState === 'success' ? (
                <div className="text-center py-20 animate-in fade-in duration-700">
                  <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-500/20">
                    <CheckCircle className="text-green-500" size={48} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold mb-4">Message Encrypted</h3>
                  <p className="text-gray-400 font-light max-w-sm mx-auto uppercase tracking-widest text-[10px] leading-loose">
                    A lead partner will evaluate your request within 4 operational hours.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-12 text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black hover:text-white transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-600 block mb-3">Principal Name</label>
                      <input required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D4AF37] transition-all text-sm" placeholder="e.g. Alexander Vance" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-600 block mb-3">Organization</label>
                      <input required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D4AF37] transition-all text-sm" placeholder="Fortune 500 / High-Growth Startup" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-600 block mb-3">Secure Email</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D4AF37] transition-all text-sm" placeholder="principal@company.global" />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-600 block mb-3">Strategic Intent</label>
                    <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D4AF37] transition-all text-sm resize-none" placeholder="Briefly describe the bottleneck or scale opportunity..." />
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 mb-8">
                     <Shield size={16} className="text-[#007FFF]" />
                     <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">
                        Data protected by end-to-end proprietary encryption protocols.
                     </p>
                  </div>

                  <button 
                    disabled={formState === 'loading'}
                    className="w-full py-5 bg-[#D4AF37] text-black font-black uppercase tracking-[0.4em] text-[11px] rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-[#D4AF37]/20 disabled:opacity-50"
                  >
                    {formState === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    Authorize Engagement Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
