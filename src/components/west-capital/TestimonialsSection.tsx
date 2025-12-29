import React, { useState } from 'react';

const testimonials = [
  { name: 'Serkan Yıldırım', company: 'Tech Ventures', text: 'West Capital ile çalışmak, iş süreçlerimizi tamamen dönüştürdü. Premium ofis alanları ve danışmanlık hizmetleri mükemmel.', rating: 5 },
  { name: 'Elif Arslan', company: 'Global Trading', text: 'M&A sürecimizde aldığımız destek sayesinde şirketimizi başarıyla büyüttük. Profesyonel ve güvenilir bir ekip.', rating: 5 },
  { name: 'Burak Özdemir', company: 'Investment Group', text: 'Sanal ofis hizmeti ile prestijli bir adres ve profesyonel destek aldık. Kesinlikle tavsiye ediyorum.', rating: 5 },
];

const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-600 text-sm font-medium rounded-full mb-4">
            Müşteri Memnuniyeti
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-bold mb-4">
            Müşteri <span className="text-sky-600">Görüşleri</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto rounded-full" />
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-sky-50 to-white rounded-3xl p-8 md:p-12 border border-sky-100 shadow-xl shadow-sky-500/5">
            {/* Quote icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-sky-500/30">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Rating stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[activeIdx].rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 text-center">
              "{testimonials[activeIdx].text}"
            </p>

            <div className="text-center">
              <div className="font-serif text-slate-800 font-bold text-lg">{testimonials[activeIdx].name}</div>
              <div className="text-sky-600 text-sm font-medium">{testimonials[activeIdx].company}</div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button 
            onClick={() => setActiveIdx(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg shadow-sky-500/10 flex items-center justify-center text-sky-600 hover:bg-sky-50 transition-colors hidden md:flex"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => setActiveIdx(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg shadow-sky-500/10 flex items-center justify-center text-sky-600 hover:bg-sky-50 transition-colors hidden md:flex"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === activeIdx 
                    ? 'bg-sky-500 w-8' 
                    : 'bg-sky-200 hover:bg-sky-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
