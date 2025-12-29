import React, { useState } from 'react';

const advisoryServices = [
  { id: 'ma', title: 'M&A', items: ['Şirket alım-satımı', 'Değerleme', 'Finansal analiz', 'Due diligence'] },
  { id: 'audit', title: 'Denetim & Vergi', items: ['Finansal denetim', 'Kurumsal vergi', 'Transfer fiyatlandırması', 'Vergi planlaması'] },
  { id: 'legal', title: 'Hukuk', items: ['Ticaret hukuku', 'Sözleşmeler', 'Uygunluk', 'Şirketler hukuku'] },
  { id: 'strategy', title: 'Stratejik Yönetim', items: ['Büyüme stratejileri', 'Operasyon verimliliği', 'Uzun vadeli yol haritaları', 'Dijital dönüşüm'] },
  { id: 'brand', title: 'Marka Değerleme', items: ['Marka değeri ölçümü', 'Konumlandırma analizi', 'Kurumsal imaj', 'Marka stratejisi'] },
  { id: 'risk', title: 'Risk Yönetimi', items: ['Risk değerlendirmesi', 'İç kontrol', 'Uyum denetimi', 'Güvence hizmetleri'] },
];

const AdvisorySection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="advisory" className="py-24 bg-[#0A1F1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#D4AF37] font-bold mb-4">Danışmanlık & Kurumsal Çözümler</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Uzman kadromuzla kapsamlı iş danışmanlığı hizmetleri</p>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advisoryServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#0B0B0B] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl text-[#D4AF37] font-bold">{service.title}</h3>
                  <svg className={`w-5 h-5 text-[#D4AF37] transition-transform ${expandedId === service.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <ul className={`space-y-2 overflow-hidden transition-all duration-500 ${expandedId === service.id ? 'max-h-40' : 'max-h-0'}`}>
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-white/70 text-sm">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
                {expandedId !== service.id && (
                  <p className="text-white/50 text-sm">Detaylar için tıklayın</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvisorySection;