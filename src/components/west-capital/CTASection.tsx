import React from 'react';

interface CTASectionProps {
  onNavigate: (section: string) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 rounded-full mb-8">
          <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
          <span className="text-sky-300 text-sm font-medium">Hemen Başlayın</span>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-6">
          İşinizi Bir Üst Seviyeye <span className="text-sky-400">Taşıyın</span>
        </h2>
        <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          West Capital'in seçkin iş ekosistemi ile tanışın. Premium ofis alanları ve entegre danışmanlık hizmetleri ile işinizi büyütün.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('contact')}
            className="px-10 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl tracking-wide hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-xl shadow-sky-500/30 hover:shadow-sky-500/40 hover:-translate-y-0.5"
          >
            Hemen Başvurun
          </button>
          <button
            onClick={() => onNavigate('offices')}
            className="px-10 py-4 border-2 border-sky-400/50 text-sky-300 font-semibold rounded-xl tracking-wide hover:bg-sky-500/10 hover:border-sky-400 transition-all duration-300"
          >
            Ofisleri İnceleyin
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Güvenli & Gizli</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>7/24 Destek</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>500+ Mutlu Müşteri</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
