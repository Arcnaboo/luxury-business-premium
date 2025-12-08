import React, { useState } from 'react';
import BookingModal from './BookingModal';

interface Office {
  id: number;
  title: string;
  desc: string;
  price: string;
  img: string;
  priceType: 'hourly' | 'monthly';
  features: string[];
  capacity: string;
}

const offices: Office[] = [
  { 
    id: 1, 
    title: 'Premium Hazır Ofis', 
    desc: 'Tam donanımlı, sessiz ve modern iş alanları', 
    price: '₺25.000/ay', 
    img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926187189_d192eedb.jpg',
    priceType: 'monthly',
    features: ['Mobilyalı', 'Klima', 'Yüksek Hızlı İnternet', 'Temizlik'],
    capacity: '1-4 Kişi'
  },
  { 
    id: 2, 
    title: 'Executive Suite', 
    desc: 'Üst düzey yöneticiler için özel ofis alanları', 
    price: '₺45.000/ay', 
    img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926190188_4030fc57.jpg',
    priceType: 'monthly',
    features: ['Premium Mobilya', 'Özel Asistan', 'VIP Lounge', 'Toplantı Odası'],
    capacity: '1-2 Kişi'
  },
  { 
    id: 3, 
    title: 'Kurumsal Ofis', 
    desc: 'Ekipler için geniş ve prestijli çalışma alanları', 
    price: '₺75.000/ay', 
    img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926189090_44981c88.jpg',
    priceType: 'monthly',
    features: ['Açık Ofis', 'Özel Toplantı Odası', 'Mutfak', 'Resepsiyon'],
    capacity: '5-15 Kişi'
  },
  { 
    id: 4, 
    title: 'Sanal Ofis', 
    desc: 'Resmi adres, posta ve çağrı karşılama hizmeti', 
    price: '₺5.000/ay', 
    img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926200077_8e5713b4.png',
    priceType: 'monthly',
    features: ['Prestijli Adres', 'Posta Yönetimi', 'Çağrı Karşılama', 'Toplantı Odası Kullanımı'],
    capacity: 'Sınırsız'
  },
  { 
    id: 5, 
    title: 'Toplantı Odası', 
    desc: 'Modern ve prestijli toplantı alanları', 
    price: '₺2.500/saat', 
    img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926235355_b60242b5.png',
    priceType: 'hourly',
    features: ['Projeksiyon', 'Video Konferans', 'Beyaz Tahta', 'İkram Servisi'],
    capacity: '4-12 Kişi'
  },
  { 
    id: 6, 
    title: 'Konferans Salonu', 
    desc: 'Büyük etkinlikler için profesyonel salon', 
    price: '₺5.000/saat', 
    img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926217668_39d2c5a1.jpg',
    priceType: 'hourly',
    features: ['Sahne', 'Ses Sistemi', 'Işık Sistemi', 'Catering'],
    capacity: '20-100 Kişi'
  },
];

interface OfficeServicesProps {
  onLoginRequired?: () => void;
}

const OfficeServices: React.FC<OfficeServicesProps> = ({ onLoginRequired }) => {
  const [selectedOffice, setSelectedOffice] = useState<number | null>(null);
  const [bookingOffice, setBookingOffice] = useState<Office | null>(null);

  const handleBookNow = (office: Office) => {
    setSelectedOffice(null);
    setBookingOffice(office);
  };

  const handleLoginRequired = () => {
    setBookingOffice(null);
    if (onLoginRequired) {
      onLoginRequired();
    }
  };

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
                <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/70 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  {office.capacity}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-slate-800 font-bold mb-2 group-hover:text-sky-600 transition-colors">{office.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{office.desc}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {office.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      {feature}
                    </span>
                  ))}
                  {office.features.length > 3 && (
                    <span className="px-2 py-1 bg-sky-50 text-sky-600 text-xs rounded-md">
                      +{office.features.length - 3} daha
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setSelectedOffice(office.id)} 
                    className="text-slate-500 text-sm font-medium hover:text-sky-600 transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Detay
                  </button>
                  <button 
                    onClick={() => handleBookNow(office)} 
                    className="px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-sm font-medium rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all shadow-md shadow-sky-500/25 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Rezervasyon
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedOffice && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedOffice(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="relative h-56">
                <img src={offices.find(o => o.id === selectedOffice)?.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <button onClick={() => setSelectedOffice(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-2xl text-white font-bold">{offices.find(o => o.id === selectedOffice)?.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{offices.find(o => o.id === selectedOffice)?.capacity}</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sky-600 font-bold text-2xl">{offices.find(o => o.id === selectedOffice)?.price}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">Müsait</span>
                </div>
                
                <p className="text-slate-600 mb-6">{offices.find(o => o.id === selectedOffice)?.desc}. Profesyonel iş ortamında tüm ihtiyaçlarınız karşılanır.</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Özellikler</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {offices.find(o => o.id === selectedOffice)?.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                        <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setSelectedOffice(null)} className="flex-1 py-3 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors">
                    Kapat
                  </button>
                  <button 
                    onClick={() => handleBookNow(offices.find(o => o.id === selectedOffice)!)} 
                    className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Rezervasyon Yap
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {bookingOffice && (
          <BookingModal 
            office={bookingOffice} 
            onClose={() => setBookingOffice(null)} 
            onLoginRequired={handleLoginRequired}
          />
        )}
      </div>
    </section>
  );
};

export default OfficeServices;
