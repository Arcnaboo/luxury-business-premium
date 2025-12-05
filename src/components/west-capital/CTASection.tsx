import React from 'react';

interface CTASectionProps {
  onNavigate: (section: string) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0A1F1A] via-[#0A1F1A] to-[#0B0B0B] relative overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(212,175,55,0.08) 0%, transparent 50%)' }} />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-serif text-3xl md:text-5xl text-[#D4AF37] font-bold mb-6">
          İşinizi Bir Üst Seviyeye Taşıyın
        </h2>
        <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          West Capital'in seçkin iş ekosistemi ile tanışın. Premium ofis alanları ve entegre danışmanlık hizmetleri ile işinizi büyütün.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('contact')}
            className="px-10 py-4 bg-[#D4AF37] text-[#0A1F1A] font-semibold tracking-wide hover:bg-[#D4AF37]/90 transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
          >
            Hemen Başvurun
          </button>
          <button
            onClick={() => onNavigate('offices')}
            className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold tracking-wide hover:bg-[#D4AF37]/10 transition-all duration-300"
          >
            Ofisleri İnceleyin
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;