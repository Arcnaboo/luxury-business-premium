import React from 'react';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-screen bg-[#0A1F1A] relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/5 via-transparent to-transparent" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 50%)' }} />
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-[#D4AF37]/20 rounded-full scale-150" />
            <img 
              src="https://files.catbox.moe/78r0ul.png" 
              alt="West Capital Business Ecosystem" 
              className="relative w-80 h-80 md:w-96 md:h-96 object-contain"
            />
          </div>
        </div>
        
        <h1 className="font-serif text-4xl md:text-6xl text-[#D4AF37] font-bold tracking-wide mb-4">
          WEST CAPITAL
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-serif tracking-widest mb-6">
          Executive Office & Business Ecosystem
        </p>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Yöneticiler, şirket sahipleri ve profesyoneller için tasarlanmış seçkin iş merkezi.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-[#D4AF37] text-[#0A1F1A] font-semibold tracking-wide hover:bg-[#D4AF37]/90 transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
          >
            VIP Üyelik Başvurusu
          </button>
          <button
            onClick={() => onNavigate('offices')}
            className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold tracking-wide hover:bg-[#D4AF37]/10 transition-all duration-300"
          >
            Ofis Alanlarını İncele
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[#D4AF37]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;