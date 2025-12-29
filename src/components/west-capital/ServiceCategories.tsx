import React from 'react';

interface ServiceCategoriesProps {
  onNavigate: (section: string) => void;
}

const categories = [
  {
    id: 'offices',
    title: 'Executive Office Services',
    description: 'Hazır ofis, sanal ofis, toplantı odaları ve paylaşımlı çalışma alanları',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'advisory',
    title: 'Corporate Advisory',
    description: 'Strateji, M&A, denetim, vergi, hukuk ve marka değerleme hizmetleri',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'ecosystem',
    title: 'Business Ecosystem',
    description: 'Profesyonel network, operasyon desteği ve yönetim hizmetleri',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

const ServiceCategories: React.FC<ServiceCategoriesProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-bold mb-4">
            Öne Çıkan <span className="text-sky-600">Hizmetler</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            İş dünyasının tüm ihtiyaçlarını tek çatı altında karşılayan kapsamlı hizmet portföyümüz
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              className="group p-8 bg-white border border-sky-100 rounded-2xl hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-500 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-sky-600 group-hover:text-white transition-all duration-300">
                {cat.icon}
              </div>
              <h3 className="font-serif text-xl text-slate-800 font-bold mb-3 group-hover:text-sky-600 transition-colors">{cat.title}</h3>
              <p className="text-slate-500 leading-relaxed">{cat.description}</p>
              <div className="mt-6 flex items-center text-sky-600 text-sm font-medium">
                <span>Detayları İncele</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
