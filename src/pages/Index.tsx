import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Achievements } from '@/components/Achievements';
import { Coordinators } from '@/components/Coordinators';
import { Clubs } from '@/components/Clubs';
import { Contact } from '@/components/Contact'
import PhotoGallerySection from '@/components/PhotoGallerySection';
import { ThreeDBackground } from '@/components/ThreeDBackground';
import { useImageProtection } from '@/hooks/useImageProtection';
const Index = () => {
  // Enable comprehensive image protection
  useImageProtection({
    disableRightClick: true,
    disableDrag: true,
    disableSelect: true,
    disablePrintScreen: true,
    disableDevTools: true,
    showWarningOnRightClick: true,
  });

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <About />
      
      {/* Container for sections with 3D background */}
      <div className="relative">
        {/* 3D Background only for the sections below */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <ThreeDBackground />
        </div>
        
        {/* Content sections with relative positioning */}
        <div className="relative z-10">
          <Achievements />
          <PhotoGallerySection />
          <Coordinators />
          <Clubs />
          <Contact />
        </div>
      </div>
    </main>
  );
};

export default Index;
