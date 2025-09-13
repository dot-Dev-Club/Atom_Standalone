import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Twitter, Linkedin, Mail, Heart, Code, Zap, Globe } from 'lucide-react';
import { ThreeDIconPresets } from './ThreeDIcons';

export const ThreeDFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Team', href: '#coordinators' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer ref={ref} className="relative bg-background/95 backdrop-blur-md border-t border-white/10 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-electric/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex items-center space-x-3 mb-4"
              whileHover={{ scale: 1.05 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">A</span>
                </div>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">ATOM Club</h3>
                <p className="text-sm text-foreground-secondary">Association of Technology Oriented Minds</p>
              </div>
            </motion.div>

            <motion.p
              className="text-foreground-secondary leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empowering innovation through technology. Join our community of passionate developers,
              designers, and tech enthusiasts shaping the future of digital innovation.
            </motion.p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-glass border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all duration-300"
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{
                    scale: 1.1,
                    rotateY: 10,
                    rotateX: 10,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5 text-foreground-secondary hover:text-foreground transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-foreground-secondary hover:text-foreground transition-colors duration-300 relative group"
                    whileHover={{
                      scale: 1.05,
                      x: 5,
                    }}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary rounded-full group-hover:w-full transition-all duration-300"
                      style={{ transformOrigin: 'left' }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 3D Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-foreground">Tech Stack</h4>
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className="flex items-center space-x-2 p-2 bg-glass rounded-lg border border-white/10"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ThreeDIconPresets.Code size={20} />
                <span className="text-sm text-foreground-secondary">React</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 p-2 bg-glass rounded-lg border border-white/10"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ThreeDIconPresets.Zap size={20} />
                <span className="text-sm text-foreground-secondary">TypeScript</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 p-2 bg-glass rounded-lg border border-white/10"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ThreeDIconPresets.Globe size={20} />
                <span className="text-sm text-foreground-secondary">Vite</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 p-2 bg-glass rounded-lg border border-white/10"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ThreeDIconPresets.Cpu size={20} />
                <span className="text-sm text-foreground-secondary">Tailwind</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="flex items-center space-x-2 text-foreground-secondary text-sm mb-4 md:mb-0"
            whileHover={{ scale: 1.02 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>by ATOM Club</span>
          </motion.div>

          <motion.div
            className="text-foreground-secondary text-sm"
            whileHover={{ scale: 1.02 }}
          >
            © 2025 ATOM Club. All rights reserved.
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Bottom Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric to-transparent"
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </footer>
  );
};