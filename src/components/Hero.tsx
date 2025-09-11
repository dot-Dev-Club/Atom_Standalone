import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
// Live logo URL
const atomLogo = 'https://liquid.paper.design/share/01K4WHTFF2ETZ325RQNA52YNBJ?refraction=0.027&edge=0&patternBlur=0&liquid=0.4&speed=0.43&patternScale=2&background=black';
import heroBackground from '@/assets/hero-background.jpg';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-electric rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content Layout: Logo left, text right */}
      <div className="relative z-10 flex flex-row items-center w-full px-4 max-w-7xl mx-auto">
        {/* ATOM Logo - left, big */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isVisible ? { scale: 1, rotate: 0 } : {}}
          transition={{ 
            duration: 1, 
            type: "spring", 
            stiffness: 100,
            delay: 0.2 
          }}
          className="mr-12 flex-shrink-0 flex items-center justify-center"
          style={{ minWidth: '350px' }}
        >
          <div className="relative">
            <img 
              src={atomLogo} 
              alt="ATOM Club Logo" 
              className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] animate-float filter drop-shadow-lg"
              style={{ objectFit: 'contain' }}
            />
            <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-pulse-glow" />
          </div>
        </motion.div>

        {/* Text content - right */}
        <div className="flex-1 text-left">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
          >
            ATOM Club
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl lg:text-3xl metallic-text font-light mb-8 max-w-3xl leading-relaxed"
          >
            Association of Technology Oreinted Minds
          </motion.p>

          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base md:text-lg text-foreground-secondary font-medium"
          >
          </motion.div>
        </div>

        {/* Scroll Indicator - bottom center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-atom-metallic rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-atom-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};