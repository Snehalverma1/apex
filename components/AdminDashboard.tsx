
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Lock, Layout, Briefcase, Zap, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Project, Service } from '../types';
import { storeService } from '../services/storeService';
import { GoogleGenAI, Type } from "@google/genai";

interface AdminDashboardProps {
  onClose: () => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, projects, setProjects }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'services'>('projects');
  const [services, setServices] = useState<Service[]>(storeService.getServices());
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  
  // AI Update State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'apex123') setIsAuthenticated(true);
    else alert('Invalid access code.');
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    let updated;
    if (editingProject.id) updated = storeService.updateProject(editingProject as Project);
    else updated = storeService.addProject({ ...editingProject, id: Date.now().toString() } as Project);
    setProjects(updated);
    setEditingProject(null);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    let updated;
    if (editingService.id) updated = storeService.updateService(editingService as Service);
    else updated = storeService.addService({ ...editingService, id: 's' + Date.now() } as Service);
    setServices(updated);
    setEditingService(null);
  };

  const handleAiRefineServices = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const currentServicesJson = JSON.stringify(services);
      
      const prompt = `
        You are an elite business consultancy strategist. 
        The following is a list of current services for "Apex Strategy": ${currentServicesJson}
        The user wants to update, refine, or add to these services based on this instruction: "${aiPrompt}"
        
        RULES:
        1. Keep the output as a valid JSON array of Service objects.
        2. Icons must be valid Lucide icon names (e.g., Layers, Globe, Zap, Cpu, Target, BarChart3, TrendingUp, ShieldCheck).
        3. Maintain a "high-end, elite, growth-engineered" tone.
        4. DetailedContent should be 2-3 sentences of professional "fluff-free" consulting copy.
        
        Return ONLY the JSON array.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                iconName: { type: Type.STRING },
                detailedContent: { type: Type.STRING }
              },
              required: ["id", "title", "description", "iconName", "detailedContent"]
            }
          }
        }
      });

      const refined = JSON.parse(response.text || '[]');
      if (refined.length > 0) {
        setServices(refined);
        storeService.saveServices(refined);
        setAiPrompt('');
        alert('AI Refinement Complete.');
      }
    } catch (e) {
      console.error(e);
      alert('AI Refinement failed. Please check your API key and prompt.');
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[70] bg-black flex items-center justify-center p-6">
        <div className="glass p-12 rounded-2xl border border-white/10 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-[#007FFF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-[#007FFF]" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Apex Strategy Portal</h2>
          <p className="text-gray-400 text-sm mb-8">Enter administrative credential for access.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Access Key" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center focus:border-[#D4AF37] outline-none" />
            <button className="w-full py-3 bg-[#D4AF37] text-white font-bold rounded-lg hover:brightness-110 transition-all uppercase tracking-[0.3em] text-xs">Authorize</button>
            <button type="button" onClick={onClose} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest mt-4">Return to Site</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] bg-[#050505] overflow-y-auto p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-serif font-bold">Admin <span className="text-[#D4AF37]">Controller</span></h2>
            <div className="flex gap-4 mt-4">
               <button onClick={() => setActiveTab('projects')} className={`text-[10px] uppercase tracking-widest font-black flex items-center gap-2 ${activeTab === 'projects' ? 'text-[#007FFF]' : 'text-gray-600'}`}>
                 <Briefcase size={14} /> Projects
               </button>
               <button onClick={() => setActiveTab('services')} className={`text-[10px] uppercase tracking-widest font-black flex items-center gap-2 ${activeTab === 'services' ? 'text-[#007FFF]' : 'text-gray-600'}`}>
                 <Layout size={14} /> Services
               </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                if(activeTab === 'projects') setEditingProject({ title: '', category: '', description: '', challenge: '', strategy: '', outcome: '', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200', aiSystemInstruction: 'You are an elite consultant...' });
                else setEditingService({ title: '', description: '', iconName: 'Layers', detailedContent: '' });
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#007FFF] text-white rounded-lg hover:brightness-110 transition-all font-bold text-xs uppercase tracking-widest"
            >
              <Plus size={16} />
              Add {activeTab === 'projects' ? 'Initiative' : 'Capability'}
            </button>
            <button onClick={onClose} className="p-3 glass rounded-lg hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Smart AI Prompt Tool (Only for Services) */}
        {activeTab === 'services' && (
          <div className="mb-12 glass p-8 rounded-2xl border border-[#007FFF]/20">
             <div className="flex items-center gap-3 mb-6">
                <Sparkles size={20} className="text-[#D4AF37]" />
                <h3 className="text-sm font-bold uppercase tracking-widest">AI Capability Engineer</h3>
             </div>
             <div className="flex flex-col md:flex-row gap-4">
                <textarea 
                   value={aiPrompt}
                   onChange={e => setAiPrompt(e.target.value)}
                   placeholder="Describe how you want to update your services (e.g. 'Add a service for ESG compliance with high-end copy')"
                   className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-[#007FFF] resize-none"
                   rows={2}
                />
                <button 
                   onClick={handleAiRefineServices}
                   disabled={isAiLoading || !aiPrompt.trim()}
                   className="px-8 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 hover:brightness-110 transition-all"
                >
                   {isAiLoading ? <Loader2 className="animate-spin" /> : <Wand2 size={16} />}
                   Execute Refinement
                </button>
             </div>
             <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-4 italic">
                Generates professional consultancy content and icons automatically.
             </p>
          </div>
        )}

        {/* Content List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'projects' ? projects.map(p => (
            <div key={p.id} className="glass rounded-xl p-6 border border-white/10 flex flex-col group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#007FFF] font-bold">{p.category}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingProject(p)} className="p-1.5 hover:text-[#D4AF37] transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => { if(confirm('Purge data?')) setProjects(storeService.deleteProject(p.id)) }} className="p-1.5 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-3 mb-6 font-light">{p.description}</p>
            </div>
          )) : services.map(s => (
            <div key={s.id} className="glass rounded-xl p-6 border border-white/10 flex flex-col group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#007FFF]/10 flex items-center justify-center">
                   <Zap size={14} className="text-[#007FFF]" />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingService(s)} className="p-1.5 hover:text-[#D4AF37] transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => { if(confirm('Delete service?')) setServices(storeService.deleteService(s.id)) }} className="p-1.5 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-3 font-light">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modals (Project/Service) */}
      {editingProject && (
        <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="glass w-full max-w-4xl rounded-2xl border border-white/10 p-8 md:p-12 relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setEditingProject(null)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
            <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest">Project Configuration</h3>
            <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37] outline-none" placeholder="Title" value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} />
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none" placeholder="Category" value={editingProject.category} onChange={e => setEditingProject({...editingProject, category: e.target.value})} />
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none resize-none" placeholder="Description" value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} />
                  <textarea rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none" placeholder="Challenge" value={editingProject.challenge} onChange={e => setEditingProject({...editingProject, challenge: e.target.value})} />
                  <textarea rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none" placeholder="Strategy" value={editingProject.strategy} onChange={e => setEditingProject({...editingProject, strategy: e.target.value})} />
                  <textarea rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none" placeholder="Outcome" value={editingProject.outcome} onChange={e => setEditingProject({...editingProject, outcome: e.target.value})} />
               </div>
               <div className="space-y-4">
                  <textarea rows={12} className="w-full bg-[#007FFF]/5 border border-[#007FFF]/20 rounded-lg p-4 text-xs font-mono text-[#007FFF] outline-none resize-none" value={editingProject.aiSystemInstruction} onChange={e => setEditingProject({...editingProject, aiSystemInstruction: e.target.value})} />
                  <button type="submit" className="w-full py-4 bg-[#D4AF37] text-white font-bold rounded-lg flex items-center justify-center gap-3 uppercase tracking-widest text-xs hover:brightness-110">
                    <Save size={18} /> Deploy Project
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}

      {editingService && (
        <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="glass w-full max-w-2xl rounded-2xl border border-white/10 p-8 md:p-12 relative">
            <button onClick={() => setEditingService(null)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
            <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest">Capability Setup</h3>
            <form onSubmit={handleSaveService} className="space-y-6">
               <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37] outline-none" placeholder="Service Title" value={editingService.title} onChange={e => setEditingService({...editingService, title: e.target.value})} />
               <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none" placeholder="Short Description" value={editingService.description} onChange={e => setEditingService({...editingService, description: e.target.value})} />
               <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none" placeholder="Lucide Icon Name (e.g. Layers, Zap)" value={editingService.iconName} onChange={e => setEditingService({...editingService, iconName: e.target.value})} />
               <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none resize-none" placeholder="Detailed Content for Service Page" value={editingService.detailedContent} onChange={e => setEditingService({...editingService, detailedContent: e.target.value})} />
               <button type="submit" className="w-full py-4 bg-[#D4AF37] text-white font-bold rounded-lg flex items-center justify-center gap-3 uppercase tracking-widest text-xs hover:brightness-110">
                 <Save size={18} /> Save Capability
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
