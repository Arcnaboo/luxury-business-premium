import React, { useState } from 'react';

const ecosystemNodes = [
  { id: 'ma', label: 'M&A', desc: 'Şirket alım-satımı, değerleme ve finansal analiz', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'audit', label: 'Audit', desc: 'Finansal denetim ve kurumsal uygunluk', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { id: 'tax', label: 'Tax', desc: 'Kurumsal vergi ve transfer fiyatlandırması', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { id: 'legal', label: 'Legal', desc: 'Ticaret hukuku, sözleşmeler ve uygunluk', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
  { id: 'strategy', label: 'Strategy', desc: 'Büyüme stratejileri ve uzun vadeli yol haritaları', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'brand', label: 'Brand Valuation', desc: 'Marka değeri ölçümü ve konumlandırma', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
  { id: 'risk', label: 'Risk Assurance', desc: 'Risk yönetimi ve güvence hizmetleri', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 'office', label: 'Office Services', desc: 'Premium ofis ve iş alanı çözümleri', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
];

const EcosystemSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section id="ecosystem" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-600 text-sm font-medium rounded-full mb-4">
            Entegre İş Çözümleri
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-bold mb-4">
            Business <span className="text-sky-600">Ecosystem</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Entegre iş ekosistemi ile tüm ihtiyaçlarınız tek çatı altında</p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemNodes.map((node) => (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                activeNode === node.id 
                  ? 'bg-gradient-to-br from-sky-500 to-sky-600 border-sky-500 shadow-xl shadow-sky-500/20 -translate-y-1' 
                  : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-lg'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all ${
                activeNode === node.id 
                  ? 'bg-white/20' 
                  : 'bg-sky-50'
              }`}>
                <svg className={`w-7 h-7 transition-colors ${activeNode === node.id ? 'text-white' : 'text-sky-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={node.icon} />
                </svg>
              </div>
              <h3 className={`font-serif text-lg font-bold mb-2 transition-colors ${
                activeNode === node.id ? 'text-white' : 'text-slate-800'
              }`}>{node.label}</h3>
              <p className={`text-sm transition-colors ${
                activeNode === node.id ? 'text-white/90' : 'text-slate-500'
              }`}>{node.desc}</p>
              <div className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all ${
                activeNode === node.id ? 'bg-white shadow-lg shadow-white/50' : 'bg-sky-300'
              }`} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 text-lg mb-8">Tüm hizmetler merkezi bir yapıda entegre çalışır</p>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-sky-400/20 rounded-full scale-150" />
              <img src="https://files.catbox.moe/ltc1ta.png" alt="Ecosystem" className="relative w-32 h-32 object-contain opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
