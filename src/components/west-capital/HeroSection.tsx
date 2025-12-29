import React from 'react';
import { Play } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  onPlayVideo: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPlayVideo }) => {
  const videoId = 'RQun6QEimRE';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-sky-50/50 to-white relative flex items-center justify-center overflow-hidden">
      {/* Arka plan dekoratif elementler */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-100/40 rounded-full blur-3xl" />
      </div>

      {/* Grid desen overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* SADECE VIDEO BÖLÜMÜ AKTİF */}
        <div className="mb-8 flex justify-center">
          <div
            className="relative group cursor-pointer"
            onClick={onPlayVideo}
          >
            <div className="absolute -inset-4 blur-2xl bg-sky-400/30 rounded-3xl scale-105 group-hover:bg-sky-400/40 transition-all duration-500" />
            <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/30 border-2 border-white/50 group-hover:border-sky-400/50 transition-all duration-500 group-hover:scale-[1.02]">
              <img
                src={thumbnailUrl}
                alt="West Capital Tanıtım Videosu"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20 group-hover:from-slate-900/50 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-sky-500/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute -inset-4 bg-sky-500/20 rounded-full animate-pulse" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/95 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-sky-500 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-sky-600 group-hover:text-white ml-1 transition-colors" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Tanıtım Videosu</span>
              </div>
              <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 rounded text-white/90 text-xs font-medium">
                Videoyu İzle
              </div>
            </div>
          </div>
        </div>

        {/* UNDER CONSTRUCTION MESAJI */}
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-sky-600">
          Pek Yakında Hizmetinizde!
        </h2>
        <p className="text-slate-500 text-lg mt-4">
          West Capital’ın yeni web sitesi çok yakında yayında.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

