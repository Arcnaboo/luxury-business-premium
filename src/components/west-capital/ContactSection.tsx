import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', company: '', service: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', company: '', service: '', phone: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-[#0A1F1A]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#D4AF37] font-bold mb-4">VIP Başvuru</h2>
          <p className="text-white/70">Seçkin hizmetlerimizden yararlanmak için başvurunuzu yapın</p>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mt-6" />
        </div>

        {submitted ? (
          <div className="text-center py-16 border border-[#D4AF37]">
            <svg className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-serif text-2xl text-[#D4AF37] mb-2">Başvurunuz Alındı</h3>
            <p className="text-white/70">En kısa sürede sizinle iletişime geçeceğiz.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Ad Soyad" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-4 bg-transparent border border-[#D4AF37]/30 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none transition-all" />
              <input type="text" placeholder="Firma Adı" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                className="w-full px-4 py-4 bg-transparent border border-[#D4AF37]/30 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none transition-all" />
            </div>
            <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
              className="w-full px-4 py-4 bg-[#0A1F1A] border border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:outline-none transition-all">
              <option value="">İhtiyaç Duyulan Hizmet</option>
              <option value="office">Premium Hazır Ofis</option>
              <option value="virtual">Sanal Ofis</option>
              <option value="advisory">Danışmanlık Hizmetleri</option>
              <option value="ma">M&A Danışmanlığı</option>
              <option value="legal">Hukuk Danışmanlığı</option>
            </select>
            <div className="grid md:grid-cols-2 gap-6">
              <input type="tel" placeholder="Telefon" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-4 bg-transparent border border-[#D4AF37]/30 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none transition-all" />
              <input type="email" placeholder="E-posta" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-4 bg-transparent border border-[#D4AF37]/30 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none transition-all" />
            </div>
            <textarea placeholder="Mesajınız" rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-4 bg-transparent border border-[#D4AF37]/30 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none transition-all resize-none" />
            <button type="submit" className="w-full py-4 bg-[#D4AF37] text-[#0A1F1A] font-semibold tracking-wide hover:bg-[#D4AF37]/90 transition-all">
              Başvuru Gönder
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;