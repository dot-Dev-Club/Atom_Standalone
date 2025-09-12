import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TextPressure from './TextPressure';
import Waves from './Waves';
import atomLogo from '@/assets/atom-logo.png';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Animated Waves Background */}
      <Waves
        lineColor="#2196f3"
        backgroundColor="rgba(33, 150, 243, 0.2)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />



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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6 flex items-center"
          >
            <div style={{ width: 'auto', height: '120px', minWidth: '320px', marginRight: '24px' }}>
              <TextPressure
                text="ATOM"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={60}
              />
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-8"
          >
            <TextPressure
              text="Association of Technology Oreinted Minds"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={32}
            />
          </motion.div>

          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base md:text-lg text-foreground-secondary font-medium"
          >
          </motion.div>
        </div>


      </div>
    </section>
  );
};