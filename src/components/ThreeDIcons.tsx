import { motion } from 'framer-motion';
import { Trophy, Users, Target, Award, Lightbulb, Rocket, Code, Zap, Globe, Cpu } from 'lucide-react';

interface ThreeDIconProps {
  icon: React.ComponentType<any>;
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

export const ThreeDIcon = ({
  icon: Icon,
  size = 32,
  color = '#0B63FF',
  className = '',
  animate = true
}: ThreeDIconProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={animate ? {
        rotateX: 15,
        rotateY: 15,
        scale: 1.1,
        transition: { duration: 0.3 }
      } : {}}
    >
      {/* Main icon with 3D shadow */}
      <motion.div
        className="relative"
        style={{
          filter: `
            drop-shadow(0 4px 8px rgba(11, 99, 255, 0.3))
            drop-shadow(0 8px 16px rgba(11, 99, 255, 0.2))
            drop-shadow(0 12px 24px rgba(11, 99, 255, 0.1))
          `,
        }}
        animate={animate ? {
          filter: [
            `
              drop-shadow(0 4px 8px rgba(11, 99, 255, 0.3))
              drop-shadow(0 8px 16px rgba(11, 99, 255, 0.2))
              drop-shadow(0 12px 24px rgba(11, 99, 255, 0.1))
            `,
            `
              drop-shadow(0 4px 8px rgba(0, 149, 255, 0.4))
              drop-shadow(0 8px 16px rgba(0, 149, 255, 0.3))
              drop-shadow(0 12px 24px rgba(0, 149, 255, 0.2))
            `,
            `
              drop-shadow(0 4px 8px rgba(11, 99, 255, 0.3))
              drop-shadow(0 8px 16px rgba(11, 99, 255, 0.2))
              drop-shadow(0 12px 24px rgba(11, 99, 255, 0.1))
            `,
          ],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon
          size={size}
          color={color}
          className="relative z-10"
          style={{
            filter: 'brightness(1.1) contrast(1.1)',
          }}
        />
      </motion.div>

      {/* 3D depth layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: 'translateZ(-2px)',
          opacity: 0.3,
        }}
      >
        <Icon
          size={size}
          color={color}
          style={{
            filter: 'blur(1px) brightness(0.8)',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          transform: 'translateZ(-4px)',
          opacity: 0.2,
        }}
      >
        <Icon
          size={size}
          color={color}
          style={{
            filter: 'blur(2px) brightness(0.6)',
          }}
        />
      </motion.div>

      {/* Floating particles around icon */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: color,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -8, 0],
            x: [0, Math.random() * 6 - 3, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 1,
          }}
        />
      ))}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          transform: 'scale(1.5)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1.5, 1.8, 1.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

// Pre-configured 3D icons for common use
export const ThreeDIconPresets = {
  Trophy: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Trophy} color="#FFD700" {...props} />
  ),
  Users: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Users} color="#0B63FF" {...props} />
  ),
  Target: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Target} color="#00FF88" {...props} />
  ),
  Award: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Award} color="#FF6B35" {...props} />
  ),
  Lightbulb: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Lightbulb} color="#FFFF00" {...props} />
  ),
  Rocket: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Rocket} color="#FF4444" {...props} />
  ),
  Code: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Code} color="#00D4FF" {...props} />
  ),
  Zap: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Zap} color="#FFFF00" {...props} />
  ),
  Globe: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Globe} color="#4CAF50" {...props} />
  ),
  Cpu: (props: Omit<ThreeDIconProps, 'icon'>) => (
    <ThreeDIcon icon={Cpu} color="#9C27B0" {...props} />
  ),
};