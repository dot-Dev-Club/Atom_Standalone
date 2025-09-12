import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollFloat from './ScrollFloat';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <section ref={ref} className="py-20 px-4 w-full min-h-screen">
      <div className="text-center">
        <ScrollFloat
          scrollContainerRef={null}
          animationDuration={6}
          ease='power1.inOut'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.18}
        >
          About ATOM Club
        </ScrollFloat>
        
        <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed text-foreground-secondary">
          <ScrollFloat
            scrollContainerRef={null}
            animationDuration={7}
            ease='power1.inOut'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.22}
            containerClassName=""
            textClassName="text-lg md:text-xl leading-relaxed text-foreground-secondary"
          >
            ATOM Club is a premier technology and management organization dedicated to fostering innovation, collaboration, and excellence in the digital age.

            We bring together passionate individuals who share a vision of advancing technology while developing strong organizational and leadership skills.

            Through hands-on projects, workshops, and collaborative initiatives, our members gain practical experience in cutting-edge technologies and modern management practices.

            Our community thrives on knowledge sharing, mentorship, and the pursuit of innovative solutions to real-world challenges.

            Join us in shaping the future of technology and organizational excellence.
          </ScrollFloat>
        </div>
      </div>
    </section>
  );
};