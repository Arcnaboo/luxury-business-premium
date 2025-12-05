import React, { useState } from 'react';

const ecosystemNodes = [
  { id: 'ma', label: 'M&A', desc: 'Şirket alım-satımı, değerleme ve finansal analiz' },
  { id: 'audit', label: 'Audit', desc: 'Finansal denetim ve kurumsal uygunluk' },
  { id: 'tax', label: 'Tax', desc: 'Kurumsal vergi ve transfer fiyatlandırması' },
  { id: 'legal', label: 'Legal', desc: 'Ticaret hukuku, sözleşmeler ve uygunluk' },
  { id: 'strategy', label: 'Strategy', desc: 'Büyüme stratejileri ve uzun vadeli yol haritaları' },
  { id: 'brand', label: 'Brand Valuation', desc: 'Marka değeri ölçümü ve konumlandırma' },
  { id: 'risk', label: 'Risk Assurance', desc: 'Risk yönetimi ve güvence hizmetleri' },
  { id: 'office', label: 'Office Services', desc: 'Premium ofis ve iş alanı çözümleri' },
];

const EcosystemSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section id="ecosystem" className="py-24 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#D4AF37] font-bold mb-4">Business Ecosystem</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Entegre iş ekosistemi ile tüm ihtiyaçlarınız tek çatı altında</p>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemNodes.map((node) => (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`relative p-6 border transition-all duration-500 cursor-pointer ${
                activeNode === node.id ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-[#0A1F1A] border-[#D4AF37]/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-4 transition-all ${
                activeNode === node.id ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-[#D4AF37]/50'
              }`}>
                <div className={`w-3 h-3 rounded-full ${activeNode === node.id ? 'bg-[#0A1F1A]' : 'bg-[#D4AF37]'}`} />
              </div>
              <h3 className="font-serif text-lg text-[#D4AF37] font-bold mb-2">{node.label}</h3>
              <p className="text-white/70 text-sm">{node.desc}</p>
              <div className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all ${
                activeNode === node.id ? 'bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50' : 'bg-[#D4AF37]/30'
              }`} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/60 text-lg mb-8">Tüm hizmetler merkezi bir yapıda entegre çalışır</p>
          <div className="flex justify-center">
            <img src="https://d64gsuwffb70l.cloudfront.net/68f918226b8d8a8ac140a61f_1764926075615_13190c42.png" alt="Ecosystem" className="w-48 h-48 object-contain opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;