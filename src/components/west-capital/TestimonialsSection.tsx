import React, { useState } from 'react';

const testimonials = [
  { name: 'Serkan Yıldırım', company: 'Tech Ventures', text: 'West Capital ile çalışmak, iş süreçlerimizi tamamen dönüştürdü. Premium ofis alanları ve danışmanlık hizmetleri mükemmel.' },
  { name: 'Elif Arslan', company: 'Global Trading', text: 'M&A sürecimizde aldığımız destek sayesinde şirketimizi başarıyla büyüttük. Profesyonel ve güvenilir bir ekip.' },
  { name: 'Burak Özdemir', company: 'Investment Group', text: 'Sanal ofis hizmeti ile prestijli bir adres ve profesyonel destek aldık. Kesinlikle tavsiye ediyorum.' },
];

const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-24 bg-[#0A1F1A]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#D4AF37] font-bold mb-4">Müşteri Görüşleri</h2>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        <div className="relative">
          <div className="text-center">
            <svg className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 italic">
              "{testimonials[activeIdx].text}"
            </p>
            <div className="font-serif text-[#D4AF37] font-bold text-lg">{testimonials[activeIdx].name}</div>
            <div className="text-white/60 text-sm">{testimonials[activeIdx].company}</div>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === activeIdx ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/30'
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