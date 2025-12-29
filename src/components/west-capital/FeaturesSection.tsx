import React from 'react';

const features = [
  { title: 'Premium Lokasyon', desc: 'İstanbul\'un en prestijli iş merkezinde stratejik konum', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: '7/24 Erişim', desc: 'Ofis alanlarına kesintisiz erişim ve güvenlik', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Tam Donanım', desc: 'Modern teknoloji ve mobilya ile donatılmış alanlar', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'Sekreterya', desc: 'Profesyonel karşılama ve posta yönetimi hizmeti', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'Toplantı Odaları', desc: 'Farklı kapasitelerde modern toplantı alanları', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'Networking', desc: 'Seçkin iş insanları ile networking fırsatları', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-600 text-sm font-medium rounded-full mb-4">
            Avantajlarımız
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-bold mb-4">
            Neden <span className="text-sky-600">West Capital?</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Üstün hizmet kalitesi ve profesyonel yaklaşım</p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-500 group">
              <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-sky-600 transition-all">
                <svg className="w-7 h-7 text-sky-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-slate-800 font-bold mb-2 group-hover:text-sky-600 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
