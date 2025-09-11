import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-8 gradient-text"
        >
          About ATOM Club
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed text-foreground-secondary"
        >
          <p>
            ATOM Club is a premier technology and management organization dedicated to fostering innovation, 
            collaboration, and excellence in the digital age.
          </p>
          
          <p>
            We bring together passionate individuals who share a vision of advancing technology while 
            developing strong organizational and leadership skills.
          </p>
          
          <p>
            Through hands-on projects, workshops, and collaborative initiatives, our members gain practical 
            experience in cutting-edge technologies and modern management practices.
          </p>
          
          <p>
            Our community thrives on knowledge sharing, mentorship, and the pursuit of innovative solutions 
            to real-world challenges.
          </p>
          
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-semibold metallic-text mt-8"
          >
            Join us in shaping the future of technology and organizational excellence.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};