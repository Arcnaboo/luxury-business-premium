import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';
import Dashboard from './Dashboard';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const { user, profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'offices', label: 'Ofis Hizmetleri' },
    { id: 'ecosystem', label: 'İş Ekosistemi' },
    { id: 'advisory', label: 'Danışmanlık' },
    { id: 'contact', label: 'İletişim' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1F1A]/95 backdrop-blur-sm border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img src="https://files.catbox.moe/ltc1ta.png" alt="West Capital" className="h-10 w-10 object-contain" />
            <span className="font-serif text-[#D4AF37] text-xl font-bold tracking-wide">WEST CAPITAL</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.id)}
                className={`text-sm tracking-wide transition-all duration-300 hover:text-[#D4AF37] ${activeSection === item.id ? 'text-[#D4AF37]' : 'text-white/80'}`}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <button onClick={() => setShowDashboard(true)} className="flex items-center gap-2 px-4 py-2 border border-[#D4AF37] text-[#D4AF37] text-sm hover:bg-[#D4AF37] hover:text-[#0A1F1A] transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {profile?.full_name?.split(' ')[0] || 'Hesabım'}
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] text-sm hover:bg-[#D4AF37] hover:text-[#0A1F1A] transition-all">
                Üye Girişi
              </button>
            )}
            <button onClick={() => onNavigate('contact')} className="px-6 py-2 bg-[#D4AF37] text-[#0A1F1A] text-sm font-semibold hover:bg-[#D4AF37]/90 transition-all">
              VIP Başvuru
            </button>
          </div>

          <button className="md:hidden text-[#D4AF37]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A1F1A] border-t border-[#D4AF37]/20 py-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                className="block w-full px-6 py-3 text-left text-white/80 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
                {item.label}
              </button>
            ))}
            <div className="px-6 pt-4 border-t border-[#D4AF37]/20 mt-4">
              {user ? (
                <button onClick={() => { setShowDashboard(true); setMobileMenuOpen(false); }} className="w-full py-3 border border-[#D4AF37] text-[#D4AF37]">Hesabım</button>
              ) : (
                <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} className="w-full py-3 border border-[#D4AF37] text-[#D4AF37]">Üye Girişi</button>
              )}
            </div>
          </div>
        )}
      </header>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      {showDashboard && <Dashboard onClose={() => setShowDashboard(false)} />}
    </>
  );
};

export default Header;