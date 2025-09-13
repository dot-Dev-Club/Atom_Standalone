import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollFloat from './ScrollFloat';
import atomTeamImage from '../assets/atom-team.jpg';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref} 
      className="py-20 px-4 w-full min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${atomTeamImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Light overlay to let faces show through while maintaining readability */}
      <div className="absolute inset-0 bg-black/25"></div>
      
      <div className="relative z-10 text-center">
        <div className="-mt-8 text-3xl md:text-4xl text-white/60">
          <ScrollFloat
            scrollContainerRef={null}
            animationDuration={6}
            ease='power1.inOut'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.18}
          >
            About ATOM 
          </ScrollFloat>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed text-white/50 mt-20 text-center">
          <ScrollFloat
            scrollContainerRef={null}
            animationDuration={7}
            ease='power1.inOut'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.22}
            containerClassName=""
            textClassName="text-lg md:text-xl leading-relaxed text-white/50"
          >
           Association of Technology Oriented Minds (ATOM) is a student-driven community that fosters innovation, learning, and collaboration. We aim to empower students with technical skills, hands-on experience, and a platform to turn ideas into impactful solutions.
          </ScrollFloat>
        </div>
      </div>
    </section>
  );
};
