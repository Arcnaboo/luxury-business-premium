import React from 'react';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-sky-50/50 to-white relative flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-100/40 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-sky-400/20 rounded-full scale-150" />
            <img 
              src="https://files.catbox.moe/dimg4p.png" 
              alt="West Capital Business Ecosystem" 
              className="relative w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-4">
          <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 bg-clip-text text-transparent">
            WEST CAPITAL
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 font-serif tracking-widest mb-6">
          Executive Office & Business Ecosystem
        </p>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Yöneticiler, şirket sahipleri ve profesyoneller için tasarlanmış seçkin iş merkezi.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold tracking-wide rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-xl shadow-sky-500/30 hover:shadow-sky-500/40 hover:-translate-y-0.5"
          >
            VIP Üyelik Başvurusu
          </button>
          <button
            onClick={() => onNavigate('offices')}
            className="px-8 py-4 border-2 border-sky-500 text-sky-600 font-semibold tracking-wide rounded-xl hover:bg-sky-50 transition-all duration-300"
          >
            Ofis Alanlarını İncele
          </button>
        </div>

        {/* Stats preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '15+', label: 'Yıllık Deneyim' },
            { value: '500+', label: 'Mutlu Müşteri' },
            { value: '50+', label: 'Uzman Danışman' },
            { value: '8', label: 'Hizmet Alanı' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-sky-100 shadow-lg shadow-sky-500/5">
              <div className="text-2xl md:text-3xl font-bold text-sky-600">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
