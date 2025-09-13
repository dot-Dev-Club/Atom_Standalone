import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Trophy, Users, Phone } from 'lucide-react';
import { ThreeDIconPresets } from './ThreeDIcons';

export const ThreeDNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Close mobile menu
  };

  const navItems = [
    { name: 'Home', icon: Home, href: '#home' },
    { name: 'About', icon: null, href: '#about' },
    { name: 'Achievements', icon: Trophy, href: '#achievements' },
    { name: 'Team', icon: Users, href: '#coordinators' },
    { name: 'Clubs', icon: null, href: '#clubs' },
    { name: 'Contact', icon: Phone, href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
      style={{
        transformStyle: 'preserve-3d',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
            </motion.div>
            <span className="text-xl font-bold gradient-text">ATOM</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative px-3 py-2 text-foreground-secondary hover:text-foreground transition-colors duration-300 group cursor-pointer bg-transparent border-none"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  scale: 1.1,
                  rotateX: 10,
                  transition: { duration: 0.2 }
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-2">
                  {item.icon && (
                    <div className="w-4 h-4">
                      {item.icon === Home && <ThreeDIconPresets.Code size={16} />}
                      {item.icon === Trophy && <ThreeDIconPresets.Trophy size={16} />}
                      {item.icon === Users && <ThreeDIconPresets.Users size={16} />}
                      {item.icon === Phone && <ThreeDIconPresets.Zap size={16} />}
                    </div>
                  )}
                  <span className="relative z-10">{item.name}</span>
                </div>

                {/* 3D underline effect */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transformOrigin: 'left',
                    filter: 'drop-shadow(0 2px 4px rgba(11, 99, 255, 0.3))',
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-glass border border-white/10"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden overflow-hidden`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/90 backdrop-blur-md rounded-lg border border-white/10 mt-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block px-3 py-2 text-foreground-secondary hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-300 cursor-pointer bg-transparent border-none w-full text-left"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  scale: 1.02,
                  x: 10,
                  transition: { duration: 0.2 }
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  {item.icon && (
                    <div className="w-5 h-5">
                      {item.icon === Home && <ThreeDIconPresets.Code size={20} />}
                      {item.icon === Trophy && <ThreeDIconPresets.Trophy size={20} />}
                      {item.icon === Users && <ThreeDIconPresets.Users size={20} />}
                      {item.icon === Phone && <ThreeDIconPresets.Zap size={20} />}
                    </div>
                  )}
                  <span>{item.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3D shadow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric to-transparent opacity-50"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.nav>
  );
};