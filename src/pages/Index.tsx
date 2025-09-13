import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Achievements } from '@/components/Achievements';
import { Coordinators } from '@/components/Coordinators';
import { Clubs } from '@/components/Clubs';
import { Contact } from '@/components/Contact';
import { ThreeDBackground } from '@/components/ThreeDBackground';
import { ThreeDNavigation } from '@/components/ThreeDNavigation';
import { ThreeDFooter } from '@/components/ThreeDFooter';

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      <ThreeDBackground />
      <ThreeDNavigation />
      <div className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="achievements">
          <Achievements />
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
        <ThreeDFooter />
      </div>
    </main>
  );
};

export default Index;
