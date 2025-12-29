import React, { useState, useEffect, useRef } from 'react';
import { X, Minimize2, Maximize2, Move, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  onClose?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, onClose }) => {
  const [isTheatreMode, setIsTheatreMode] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const playerRef = useRef<HTMLDivElement>(null);

  // Handle dragging for mini player
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTheatreMode && playerRef.current) {
      setIsDragging(true);
      const rect = playerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = window.innerWidth - (e.clientX - dragOffset.x + (playerRef.current?.offsetWidth || 320));
        const newY = window.innerHeight - (e.clientY - dragOffset.y + (playerRef.current?.offsetHeight || 180));
        setPosition({
          x: Math.max(10, Math.min(newX, window.innerWidth - 330)),
          y: Math.max(10, Math.min(newY, window.innerHeight - 190))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMinimize = () => {
    setIsTheatreMode(false);
    setPosition({ x: 20, y: 20 });
  };

  const handleMaximize = () => {
    setIsTheatreMode(true);
  };

  const handleClose = () => {
    setIsClosed(true);
    onClose?.();
  };

  if (isClosed) return null;

  // Theatre Mode - Full overlay
  if (isTheatreMode) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fadeIn">
        {/* Background blur effect */}
        <div className="absolute inset-0 backdrop-blur-sm" />
        
        {/* Close button - top right */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
          title="Kapat"
        >
          <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Minimize button - top right next to close */}
        <button
          onClick={handleMinimize}
          className="absolute top-6 right-20 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
          title="Küçült"
        >
          <Minimize2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Video container */}
        <div className="relative w-full max-w-6xl mx-4 aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/20 border border-white/10">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&mute=${isMuted ? 1 : 0}`}
            title="West Capital Video"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Bottom info bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm flex items-center gap-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>West Capital Tanıtım Videosu</span>
          </div>
          <button
            onClick={handleMinimize}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 rounded-full text-white text-sm font-medium transition-all duration-300 flex items-center gap-2"
          >
            <Minimize2 className="w-4 h-4" />
            Küçültüp Gezinmeye Devam Et
          </button>
        </div>
      </div>
    );
  }

  // Mini Player Mode - Picture in Picture style
  return (
    <div
      ref={playerRef}
      className="fixed z-50 shadow-2xl rounded-xl overflow-hidden border border-slate-200/50 bg-slate-900 transition-all duration-300 animate-slideIn"
      style={{
        right: `${position.x}px`,
        bottom: `${position.y}px`,
        width: '320px',
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Drag handle */}
      <div
        className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/60 to-transparent z-10 flex items-center justify-between px-2 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1 text-white/70 text-xs">
          <Move className="w-3 h-3" />
          <span>Sürükle</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/70" />
            ) : (
              <Volume2 className="w-4 h-4 text-white/70" />
            )}
          </button>
          <button
            onClick={handleMaximize}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Büyüt"
          >
            <Maximize2 className="w-4 h-4 text-white/70" />
          </button>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Kapat"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      {/* Video */}
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&mute=${isMuted ? 1 : 0}`}
          title="West Capital Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Bottom bar */}
      <div className="bg-slate-800 px-3 py-2 flex items-center justify-between">
        <span className="text-white/70 text-xs truncate flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          West Capital
        </span>
        <button
          onClick={handleMaximize}
          className="text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium"
        >
          Tam Ekran
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
