import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Achievements } from '@/components/Achievements';
import { Coordinators } from '@/components/Coordinators';
import { Clubs } from '@/components/Clubs';
import { Contact } from '@/components/Contact'
import PhotoGallerySection from '@/components/PhotoGallerySection';
import { ThreeDNavigation } from '@/components/ThreeDNavigation';
const Index = () => {
  return (
    <>
      <ThreeDNavigation />
      <main className="min-h-screen bg-background overflow-x-hidden">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="achievements">
          <Achievements />
        </section>
        <section id="gallery">
          <PhotoGallerySection />
        </section>
        <section id="coordinators">
          <Coordinators />
        </section>
        <section id="clubs">
          <Clubs />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
};

export default Index;
