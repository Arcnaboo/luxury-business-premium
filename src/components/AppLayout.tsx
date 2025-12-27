import React, { useState, useRef, useEffect } from 'react';
import Header from './west-capital/Header';
import HeroSection from './west-capital/HeroSection';
import ServiceCategories from './west-capital/ServiceCategories';
import OfficeServices from './west-capital/OfficeServices';
import EcosystemSection from './west-capital/EcosystemSection';
import AdvisorySection from './west-capital/AdvisorySection';
import FeaturesSection from './west-capital/FeaturesSection';
import StatsSection from './west-capital/StatsSection';
import GallerySection from './west-capital/GallerySection';
import TeamSection from './west-capital/TeamSection';
import TestimonialsSection from './west-capital/TestimonialsSection';
import PartnersSection from './west-capital/PartnersSection';
import CTASection from './west-capital/CTASection';
import ContactSection from './west-capital/ContactSection';
import Footer from './west-capital/Footer';
import LoginModal from './west-capital/LoginModal';
import VideoPlayer from './west-capital/VideoPlayer';

const AppLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVideo, setShowVideo] = useState(true); // Video shows on load in theatre mode
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = sectionsRef.current[section];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoginRequired = () => {
    setShowLoginModal(true);
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-serif{font-family:'Cormorant Garamond',serif;}
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
      `}</style>

      
      <main>
        <div ref={el => sectionsRef.current['home'] = el}>
          <HeroSection onNavigate={handleNavigate} onPlayVideo={handlePlayVideo} />
        </div>

      </main>
      

      
      {/* Video Player - Shows in theatre mode on load */}
      {showVideo && (
        <VideoPlayer 
          videoId="RQun6QEimRE" 
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
};

export default AppLayout;
