import React from 'react';

const team = [
  { name: 'Ahmet Yılmaz', role: 'Kurucu Ortak & CEO', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926270727_ed5f279f.jpg' },
  { name: 'Mehmet Kaya', role: 'Strateji Direktörü', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926271523_23d997d2.jpg' },
  { name: 'Ayşe Demir', role: 'Hukuk Danışmanı', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926295440_04d7c349.png' },
  { name: 'Fatih Özkan', role: 'Finans Direktörü', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926283943_f9075be9.png' },
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#D4AF37] font-bold mb-4">Yönetim Ekibi</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Deneyimli profesyonellerden oluşan liderlik kadromuz</p>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group text-center">
              <div className="relative mb-6 overflow-hidden">
                <div className="absolute inset-0 border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37] transition-all duration-500" />
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F1A] via-transparent to-transparent opacity-60" />
              </div>
              <h3 className="font-serif text-xl text-[#D4AF37] font-bold mb-1">{member.name}</h3>
              <p className="text-white/70 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;