import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Achievements } from '@/components/Achievements';
import { Coordinators } from '@/components/Coordinators';
import { Clubs } from '@/components/Clubs';
import { Contact } from '@/components/Contact'
import PhotoGallerySection from '@/components/PhotoGallerySection';
const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <Achievements />
      <PhotoGallerySection />
      <Coordinators />
      <Clubs />
      <Contact />
    </main>
  );
};

export default Index;
