import React, { useState } from 'react';

const advisoryServices = [
  { id: 'ma', title: 'M&A', items: ['Şirket alım-satımı', 'Değerleme', 'Finansal analiz', 'Due diligence'], icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'audit', title: 'Denetim & Vergi', items: ['Finansal denetim', 'Kurumsal vergi', 'Transfer fiyatlandırması', 'Vergi planlaması'], icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { id: 'legal', title: 'Hukuk', items: ['Ticaret hukuku', 'Sözleşmeler', 'Uygunluk', 'Şirketler hukuku'], icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
  { id: 'strategy', title: 'Stratejik Yönetim', items: ['Büyüme stratejileri', 'Operasyon verimliliği', 'Uzun vadeli yol haritaları', 'Dijital dönüşüm'], icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'brand', title: 'Marka Değerleme', items: ['Marka değeri ölçümü', 'Konumlandırma analizi', 'Kurumsal imaj', 'Marka stratejisi'], icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
  { id: 'risk', title: 'Risk Yönetimi', items: ['Risk değerlendirmesi', 'İç kontrol', 'Uyum denetimi', 'Güvence hizmetleri'], icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
];

const AdvisorySection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="advisory" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-600 text-sm font-medium rounded-full mb-4">
            Profesyonel Danışmanlık
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-bold mb-4">
            Danışmanlık & <span className="text-sky-600">Kurumsal Çözümler</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Uzman kadromuzla kapsamlı iş danışmanlığı hizmetleri</p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advisoryServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white border rounded-2xl transition-all duration-500 overflow-hidden ${
                expandedId === service.id 
                  ? 'border-sky-400 shadow-xl shadow-sky-500/10' 
                  : 'border-slate-200 hover:border-sky-300 hover:shadow-lg'
              }`}
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      expandedId === service.id 
                        ? 'bg-gradient-to-br from-sky-500 to-sky-600' 
                        : 'bg-sky-50'
                    }`}>
                      <svg className={`w-6 h-6 transition-colors ${expandedId === service.id ? 'text-white' : 'text-sky-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                      </svg>
                    </div>
                    <h3 className={`font-serif text-xl font-bold transition-colors ${
                      expandedId === service.id ? 'text-sky-600' : 'text-slate-800'
                    }`}>{service.title}</h3>
                  </div>
                  <svg className={`w-5 h-5 text-sky-500 transition-transform ${expandedId === service.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`overflow-hidden transition-all duration-500 ${expandedId === service.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <ul className="space-y-3 pt-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-slate-600 text-sm">
                        <span className="w-2 h-2 bg-sky-400 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 w-full py-2.5 bg-sky-50 text-sky-600 text-sm font-medium rounded-lg hover:bg-sky-100 transition-colors">
                    Detaylı Bilgi Al
                  </button>
                </div>
                {expandedId !== service.id && (
                  <p className="text-slate-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Detaylar için tıklayın
                  </p>
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
