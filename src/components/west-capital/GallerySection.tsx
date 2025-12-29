import React, { useState } from 'react';

const images = [
  { src: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926172458_b968d82b.jpg', title: 'Executive Lounge' },
  { src: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926187189_d192eedb.jpg', title: 'Premium Ofis' },
  { src: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926235355_b60242b5.png', title: 'Toplantı Odası' },
  { src: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926251268_d9bfaed3.jpg', title: 'Ortak Alan' },
  { src: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926222269_2bc26f69.png', title: 'Konferans Salonu' },
  { src: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926251659_e2a9e4be.jpg', title: 'Lounge Area' },
];

const GallerySection: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-600 text-sm font-medium rounded-full mb-4">
            Galeri
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-bold mb-4">
            <span className="text-sky-600">Mekanlarımız</span>
          </h2>
          <p className="text-slate-500">Premium iş alanlarımızı keşfedin</p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImg(img.src)}
              className="relative group cursor-pointer overflow-hidden aspect-[4/3] rounded-2xl"
            >
              <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-sky-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-serif text-white text-lg">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImg && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="Gallery" className="max-w-full max-h-[80vh] object-contain rounded-xl" />
          <button className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20" onClick={() => setSelectedImg(null)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
