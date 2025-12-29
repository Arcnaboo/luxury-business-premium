import React from 'react';

const team = [
  { name: 'Ahmet Yılmaz', role: 'Kurucu Ortak & CEO', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926270727_ed5f279f.jpg' },
  { name: 'Mehmet Kaya', role: 'Strateji Direktörü', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926271523_23d997d2.jpg' },
  { name: 'Ayşe Demir', role: 'Hukuk Danışmanı', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926295440_04d7c349.png' },
  { name: 'Fatih Özkan', role: 'Finans Direktörü', img: 'https://d64gsuwffb70l.cloudfront.net/6932a2834582e017d0d89e0b_1764926283943_f9075be9.png' },
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-600 text-sm font-medium rounded-full mb-4">
            Profesyonel Kadro
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-bold mb-4">
            Yönetim <span className="text-sky-600">Ekibi</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Deneyimli profesyonellerden oluşan liderlik kadromuz</p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group">
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-white shadow-lg shadow-sky-500/5">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social links on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  {['linkedin', 'twitter', 'email'].map((social) => (
                    <a key={social} href="#" className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-sky-600 hover:bg-sky-500 hover:text-white transition-all">
                      {social === 'linkedin' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      )}
                      {social === 'twitter' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      )}
                      {social === 'email' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl text-slate-800 font-bold mb-1 group-hover:text-sky-600 transition-colors">{member.name}</h3>
                <p className="text-slate-500 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
