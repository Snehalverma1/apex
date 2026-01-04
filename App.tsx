
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Methodology from './components/Methodology';
import ApexConcierge from './components/ApexConcierge';
import ProjectDeepDive from './components/ProjectDeepDive';
import AdminDashboard from './components/AdminDashboard';
import ServicePage from './components/ServicePage';
import ContactPage from './components/ContactPage';
import { Project, Service } from './types';
import { storeService } from './services/storeService';
import { Layers, Globe, Zap, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'contact'>('home');
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    setProjects(storeService.getProjects());
    setServices(storeService.getServices());
  }, []);

  // Update services when returning from admin
  useEffect(() => {
    if (!isAdminOpen) {
       setServices(storeService.getServices());
    }
  }, [isAdminOpen]);

  const renderContent = () => {
    switch (currentPage) {
      case 'services':
        return <ServicePage services={services} onContactClick={() => setCurrentPage('contact')} />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            <Hero />
            
            {/* Services Preview Section */}
            <section id="services" className="py-32 bg-[#080808] relative">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                  <span className="text-[11px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold block mb-4">Our Core Capabilities</span>
                  <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">Service <span className="italic">Excellence</span></h2>
                  <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-8 opacity-30" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {services.slice(0, 3).map((s, i) => (
                    <div key={s.id} className="glass p-12 rounded-3xl border border-white/5 hover:border-[#007FFF]/20 transition-all duration-700 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#007FFF]/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:rotate-6">
                        {i === 0 ? <Layers size={32} className="text-[#007FFF]" /> : i === 1 ? <Globe size={32} className="text-[#D4AF37]" /> : <Zap size={32} className="text-[#007FFF]" />}
                      </div>
                      <h3 className="text-2xl font-bold mb-6 group-hover:text-[#D4AF37] transition-colors">{s.title}</h3>
                      <p className="text-gray-400 text-base leading-relaxed font-light">{s.description}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-20">
                   <button 
                    onClick={() => setCurrentPage('services')}
                    className="text-[11px] uppercase tracking-[0.4em] font-black text-[#D4AF37] hover:text-white transition-colors"
                   >
                     View All Strategic Pillars <ArrowRight className="inline-block ml-2" size={16} />
                   </button>
                </div>
              </div>
            </section>

            <Methodology />

            {/* Case Study Vault */}
            <section id="vault" className="py-32 bg-[#050505] relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                  <div className="max-w-2xl">
                    <span className="text-[11px] uppercase tracking-[0.5em] text-[#007FFF] font-bold block mb-4">Historical Performance</span>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold">The <span className="italic">Case Study Vault</span></h2>
                  </div>
                  <p className="text-gray-500 text-lg max-w-sm font-light leading-relaxed">
                    Explore our record of high-stakes transformation. Every project includes access to its dedicated AI strategist.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      onClick={() => setSelectedProject(project)}
                      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.01] transition-all hover:bg-white/[0.03]"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0" 
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-10 flex flex-col justify-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4 block">{project.category}</span>
                          <h3 className="text-4xl font-serif font-bold mb-6 leading-tight">{project.title}</h3>
                          <div className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-all delay-100">
                            Initiate Deep Dive <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Trust Quote */}
            <section className="py-40 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px]" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#007FFF]/10 rounded-full blur-[120px]" />
              
              <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <div className="text-6xl font-serif text-[#D4AF37] opacity-20 mb-8 select-none">“</div>
                <p className="text-4xl md:text-5xl font-serif italic text-gray-200 leading-[1.4]">
                  Apex Strategy didn't just solve our operational bottlenecks; they fundamentally re-engineered how we perceived our own market potential and future legacy.
                </p>
                <div className="mt-12 flex flex-col items-center">
                  <div className="w-12 h-px bg-white/20 mb-6" />
                  <span className="text-base font-bold uppercase tracking-[0.4em] text-white">Jameson Vane</span>
                  <span className="text-xs text-[#007FFF] block mt-2 uppercase tracking-[0.2em] font-medium">Chief Strategy Officer — Global Fintech Alliance</span>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <>
      <Layout 
        onAdminClick={() => setIsAdminOpen(true)} 
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo(0, 0);
        }}
      >
        {renderContent()}

        {/* Overlays */}
        <ApexConcierge />
        
        {selectedProject && (
          <ProjectDeepDive project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}

        {isAdminOpen && (
          <AdminDashboard 
            projects={projects} 
            setProjects={setProjects} 
            onClose={() => setIsAdminOpen(false)} 
          />
        )}
      </Layout>
    </>
  );
};

export default App;
