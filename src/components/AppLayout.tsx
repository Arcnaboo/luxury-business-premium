import React, { useState, useRef } from 'react';
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

const AppLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
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

  return (
    <div className="min-h-screen bg-[#0A1F1A]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');.font-serif{font-family:'Cormorant Garamond',serif;}`}</style>
      
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main>
        <div ref={el => sectionsRef.current['home'] = el}>
          <HeroSection onNavigate={handleNavigate} />
        </div>
        <ServiceCategories onNavigate={handleNavigate} />
        <StatsSection />
        <div ref={el => sectionsRef.current['offices'] = el}>
          <OfficeServices />
        </div>
        <FeaturesSection />
        <GallerySection />
        <div ref={el => sectionsRef.current['ecosystem'] = el}>
          <EcosystemSection />
        </div>
        <div ref={el => sectionsRef.current['advisory'] = el}>
          <AdvisorySection />
        </div>
        <TeamSection />
        <TestimonialsSection />
        <PartnersSection />
        <CTASection onNavigate={handleNavigate} />
        <div ref={el => sectionsRef.current['contact'] = el}>
          <ContactSection />
        </div>
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default AppLayout;