import React from 'react';

const partners = [
  'Deloitte', 'PwC', 'KPMG', 'EY', 'McKinsey', 'BCG', 'Bain', 'Accenture'
];

const PartnersSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#0B0B0B] border-y border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-white/50 text-sm tracking-widest uppercase">Güvenilir İş Ortaklarımız</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="text-white/30 hover:text-[#D4AF37] transition-colors duration-300 font-serif text-xl md:text-2xl font-bold tracking-wide cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;