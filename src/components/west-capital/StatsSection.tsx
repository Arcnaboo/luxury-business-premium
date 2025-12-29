import React from 'react';

const stats = [
  { value: '15+', label: 'Yıllık Deneyim' },
  { value: '500+', label: 'Kurumsal Müşteri' },
  { value: '50+', label: 'Uzman Danışman' },
  { value: '₺2B+', label: 'Yönetilen Varlık' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0A1F1A] border-y border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-[#D4AF37] font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;