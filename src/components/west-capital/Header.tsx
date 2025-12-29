import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'offices', label: 'Ofis Hizmetleri' },
    { id: 'ecosystem', label: 'İş Ekosistemi' },
    { id: 'advisory', label: 'Danışmanlık' },
    { id: 'contact', label: 'İletişim' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-sky-500/5' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <img src="https://files.catbox.moe/ltc1ta.png" alt="West Capital" className="h-10 w-10 object-contain" />
            <span className="font-serif text-sky-700 text-xl font-bold tracking-wide group-hover:text-sky-600 transition-colors">WEST CAPITAL</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.id)}
                className={`text-sm tracking-wide transition-all duration-300 relative ${
                  activeSection === item.id 
                    ? 'text-sky-600 font-semibold' 
                    : 'text-slate-600 hover:text-sky-600'
                }`}>
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <button onClick={() => setShowDashboard(true)} className="flex items-center gap-2 px-4 py-2 border border-sky-500 text-sky-600 text-sm rounded-lg hover:bg-sky-50 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {profile?.full_name?.split(' ')[0] || 'Hesabım'}
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="px-4 py-2 border border-sky-500 text-sky-600 text-sm rounded-lg hover:bg-sky-50 transition-all">
                Üye Girişi
              </button>
            )}
            <button onClick={() => onNavigate('contact')} className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-sm font-semibold rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg shadow-sky-500/25">
              VIP Başvuru
            </button>
          </div>

          <button className="md:hidden text-sky-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-sky-100 py-4 shadow-lg">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                className={`block w-full px-6 py-3 text-left transition-all ${
                  activeSection === item.id 
                    ? 'text-sky-600 bg-sky-50 font-semibold' 
                    : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                }`}>
                {item.label}
              </button>
            ))}
            <div className="px-6 pt-4 border-t border-sky-100 mt-4 space-y-3">
              {user ? (
                <button onClick={() => { setShowDashboard(true); setMobileMenuOpen(false); }} className="w-full py-3 border border-sky-500 text-sky-600 rounded-lg">Hesabım</button>
              ) : (
                <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} className="w-full py-3 border border-sky-500 text-sky-600 rounded-lg">Üye Girişi</button>
              )}
              <button onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-semibold">
                VIP Başvuru
              </button>
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
