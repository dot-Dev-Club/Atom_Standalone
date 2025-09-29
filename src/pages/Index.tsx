import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Achievements } from '@/components/Achievements';
import { Coordinators } from '@/components/Coordinators';
import { Clubs } from '@/components/Clubs';
import { Contact } from '@/components/Contact'
import PhotoGallerySection from '@/components/PhotoGallerySection';
import { ThreeDBackground } from '@/components/ThreeDBackground';
const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <Hero />
      <About />
      
      {/* 3D Background positioned after home and about sections */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ top: '200vh' }}>
        <ThreeDBackground />
      </div>
      
      <div className="relative z-10">
        <Achievements />
        <PhotoGallerySection />
        <Coordinators />
        <Clubs />
        <Contact />
      </div>
    </main>
  );
};

export default Index;
