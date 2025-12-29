import React from 'react';

const offices = [
  { id: 1, title: 'Premium Hazır Ofis', desc: 'Tam donanımlı, sessiz ve modern iş alanları', price: '₺25.000/ay', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926187189_d192eedb.jpg' },
  { id: 2, title: 'Executive Suite', desc: 'Üst düzey yöneticiler için özel ofis alanları', price: '₺45.000/ay', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926190188_4030fc57.jpg' },
  { id: 3, title: 'Kurumsal Ofis', desc: 'Ekipler için geniş ve prestijli çalışma alanları', price: '₺75.000/ay', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926189090_44981c88.jpg' },
  { id: 4, title: 'Sanal Ofis', desc: 'Resmi adres, posta ve çağrı karşılama hizmeti', price: '₺5.000/ay', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926200077_8e5713b4.png' },
  { id: 5, title: 'Toplantı Odası', desc: 'Modern ve prestijli toplantı alanları', price: '₺2.500/saat', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926235355_b60242b5.png' },
  { id: 6, title: 'Konferans Salonu', desc: 'Büyük etkinlikler için profesyonel salon', price: '₺5.000/saat', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926217668_39d2c5a1.jpg' },
];

const OfficeServices: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = React.useState<number | null>(null);

  return (
    <section id="offices" className="py-24 bg-[#0A1F1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#D4AF37] font-bold mb-4">Prestige Office Packages</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Premium hazır ofis alanları ve kurumsal hizmetler</p>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office) => (
            <div key={office.id} className="group bg-[#0B0B0B] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src={office.img} alt={office.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#D4AF37] font-bold mb-2">{office.title}</h3>
                <p className="text-white/70 text-sm mb-4">{office.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#D4AF37] font-semibold">{office.price}</span>
                  <button onClick={() => setSelectedOffice(office.id)} className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] text-sm hover:bg-[#D4AF37] hover:text-[#0A1F1A] transition-all">
                    Detay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedOffice && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6" onClick={() => setSelectedOffice(null)}>
            <div className="bg-[#0A1F1A] border border-[#D4AF37] max-w-lg w-full p-8" onClick={e => e.stopPropagation()}>
              <h3 className="font-serif text-2xl text-[#D4AF37] mb-4">{offices.find(o => o.id === selectedOffice)?.title}</h3>
              <p className="text-white/80 mb-6">Detaylı bilgi için VIP başvuru formunu doldurun.</p>
              <button onClick={() => setSelectedOffice(null)} className="w-full py-3 bg-[#D4AF37] text-[#0A1F1A] font-semibold">Kapat</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfficeServices;