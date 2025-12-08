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
    <section id="offices" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-600 text-sm font-medium rounded-full mb-4">
            Premium Ofis Çözümleri
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-bold mb-4">
            Prestige Office <span className="text-sky-600">Packages</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Premium hazır ofis alanları ve kurumsal hizmetler</p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office) => (
            <div key={office.id} className="group bg-white border border-slate-200 rounded-2xl hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-500 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src={office.img} alt={office.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sky-600 text-sm font-semibold shadow-lg">
                  {office.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-slate-800 font-bold mb-2 group-hover:text-sky-600 transition-colors">{office.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{office.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hemen Kullanıma Hazır</span>
                  </div>
                  <button onClick={() => setSelectedOffice(office.id)} className="px-4 py-2 bg-sky-50 text-sky-600 text-sm font-medium rounded-lg hover:bg-sky-500 hover:text-white transition-all">
                    Detay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedOffice && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedOffice(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="relative h-48">
                <img src={offices.find(o => o.id === selectedOffice)?.img} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setSelectedOffice(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl text-slate-800 font-bold mb-2">{offices.find(o => o.id === selectedOffice)?.title}</h3>
                <p className="text-sky-600 font-semibold mb-4">{offices.find(o => o.id === selectedOffice)?.price}</p>
                <p className="text-slate-500 mb-6">{offices.find(o => o.id === selectedOffice)?.desc}. Detaylı bilgi için VIP başvuru formunu doldurun.</p>
                <div className="flex gap-4">
                  <button onClick={() => setSelectedOffice(null)} className="flex-1 py-3 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors">
                    Kapat
                  </button>
                  <button className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg shadow-sky-500/25">
                    Başvur
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfficeServices;
