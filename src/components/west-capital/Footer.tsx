import React from 'react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0B0B0B] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="https://files.catbox.moe/ltc1ta.png" alt="West Capital" className="h-10 w-10 object-contain" />
              <span className="font-serif text-[#D4AF37] text-xl font-bold">WEST CAPITAL</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Yöneticiler, şirket sahipleri ve profesyoneller için tasarlanmış seçkin iş merkezi.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-[#D4AF37] font-bold mb-6">Hizmetler</h4>
            <ul className="space-y-3">
              {['Premium Hazır Ofis', 'Sanal Ofis', 'Toplantı Odaları', 'Danışmanlık'].map((item, idx) => (
                <li key={idx}>
                  <button onClick={() => onNavigate('offices')} className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-[#D4AF37] font-bold mb-6">Kurumsal</h4>
            <ul className="space-y-3">
              {['Hakkımızda', 'Ekibimiz', 'Kariyer', 'Basın'].map((item, idx) => (
                <li key={idx}>
                  <button onClick={() => onNavigate('home')} className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-[#D4AF37] font-bold mb-6">İletişim</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>Levent, İstanbul</li>
              <li>+90 212 XXX XX XX</li>
              <li>info@westcapital.com.tr</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2025 West Capital. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            {['Gizlilik Politikası', 'Kullanım Koşulları', 'KVKK'].map((item, idx) => (
              <button key={idx} className="text-white/40 hover:text-[#D4AF37] transition-colors text-sm">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;