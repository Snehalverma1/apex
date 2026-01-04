
import React from 'react';
import { Menu, X, Shield, PhoneCall } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onAdminClick: () => void;
  currentPage: string;
  onNavigate: (page: 'home' | 'services' | 'contact') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onAdminClick, currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Vault', action: () => onNavigate('home'), id: 'vault' },
    { label: 'Services', action: () => onNavigate('services'), id: 'services' },
    { label: 'Contact', action: () => onNavigate('contact'), id: 'contact' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#007FFF] to-[#005bb5] rounded-sm transform rotate-45 flex items-center justify-center blue-glow">
              <span className="text-white font-bold -rotate-45 text-sm">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter leading-none">APEX <span className="text-[#D4AF37]">STRATEGY</span></span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-gray-500 font-bold">Elite Partners</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {navItems.map(item => (
              <button 
                key={item.label}
                onClick={item.action}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${
                  (currentPage === item.id || (currentPage === 'home' && item.id === 'vault')) 
                  ? 'text-[#D4AF37]' : 'text-gray-300 hover:text-[#D4AF37]'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="h-4 w-px bg-white/10 mx-2" />

            <button 
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white bg-[#D4AF37] px-6 py-2.5 rounded-sm hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              <PhoneCall size={14} />
              Partner Access
            </button>

            <button 
              onClick={onAdminClick}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors ml-4"
            >
              <Shield size={12} />
              Portal
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass p-8 space-y-6 animate-in slide-in-from-top duration-300">
            {navItems.map(item => (
              <button 
                key={item.label}
                onClick={() => { item.action(); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-sm uppercase tracking-widest font-bold text-gray-300"
              >
                {item.label}
              </button>
            ))}
             <button 
              onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left text-sm uppercase tracking-widest font-bold text-[#D4AF37]"
            >
              Partner Access
            </button>
          </div>
        )}
      </nav>

      <main>{children}</main>

      <footer className="py-24 border-t border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
             <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#007FFF] rounded-sm transform rotate-45 flex items-center justify-center">
                <span className="text-white font-bold -rotate-45 text-xs">A</span>
              </div>
              <span className="text-lg font-bold tracking-tighter">APEX STRATEGY</span>
            </div>
            <p className="text-xs text-gray-500 leading-loose uppercase tracking-widest">
              Bespoke Growth Engineering <br />
              Personal Partner Consultation <br />
              Global Headquarters: Dhanbad / Zurich
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-6">Capabilities</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Strategic Consulting</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Digital Dominance</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Capital Reallocation</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-6">Legacy</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Case Vault</button></li>
              <li><a href="#" className="hover:text-white transition-colors">The Apex Standard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner Biographies</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-6">Contact</h4>
             <button 
                onClick={() => onNavigate('contact')}
                className="w-full py-4 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#D4AF37] hover:text-black transition-all"
             >
                Secure Partner Line
             </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <span className="text-[10px] uppercase tracking-widest text-gray-600 font-medium">© 2024 Apex Strategy. Personal Consultancy by Senior Partners.</span>
          <div className="flex gap-12">
            <a href="#" className="text-[9px] uppercase tracking-widest text-gray-600 hover:text-white">Privacy Protocol</a>
            <a href="#" className="text-[9px] uppercase tracking-widest text-gray-600 hover:text-white">Terms of Engagement</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
