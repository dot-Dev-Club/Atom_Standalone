import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: 'cube' | 'sphere' | 'pyramid' | 'cylinder';
  color: string;
  delay: number;
}

export const ThreeDBackground = () => {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: FloatingShape[] = [];
      const colors = [
        'rgba(11, 99, 255, 0.1)', // atom-primary
        'rgba(192, 198, 201, 0.1)', // atom-metallic
        'rgba(0, 149, 255, 0.1)', // electric
        'rgba(59, 130, 246, 0.1)', // blue
        'rgba(147, 197, 253, 0.1)', // light blue
      ];

      for (let i = 0; i < 15; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          rotation: Math.random() * 360,
          type: ['cube', 'sphere', 'pyramid', 'cylinder'][Math.floor(Math.random() * 4)] as FloatingShape['type'],
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 5,
        });
      }
      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  const renderShape = (shape: FloatingShape) => {
    const baseClasses = "absolute opacity-20";

    switch (shape.type) {
      case 'cube':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} transform-gpu`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
          >
            <motion.div
              className="w-full h-full relative"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${shape.rotation}deg) rotateY(${shape.rotation}deg)`,
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                x: [0, 30, -30, 0],
                y: [0, -20, 20, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                delay: shape.delay,
                ease: "linear",
              }}
            >
              {/* Cube faces */}
              <div className="absolute w-full h-full border-2" style={{ backgroundColor: shape.color, transform: 'translateZ(0px)' }} />
              <div className="absolute w-full h-full border-2" style={{ backgroundColor: shape.color, transform: 'rotateY(90deg) translateZ(0px)' }} />
              <div className="absolute w-full h-full border-2" style={{ backgroundColor: shape.color, transform: 'rotateX(90deg) translateZ(0px)' }} />
            </motion.div>
          </div>
        );

      case 'sphere':
        return (
          <motion.div
            key={shape.id}
            className={`${baseClasses} rounded-full`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              boxShadow: `0 0 20px ${shape.color}`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: shape.delay,
            }}
          />
        );

      case 'pyramid':
        return (
          <motion.div
            key={shape.id}
            className={`${baseClasses} relative`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: 0,
              height: 0,
              borderLeft: `${shape.size/2}px solid transparent`,
              borderRight: `${shape.size/2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
            animate={{
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              x: [0, 40, -40, 0],
              y: [0, -25, 25, 0],
            }}
            transition={{
              duration: 18 + Math.random() * 8,
              repeat: Infinity,
              delay: shape.delay,
            }}
          />
        );

      case 'cylinder':
        return (
          <motion.div
            key={shape.id}
            className={`${baseClasses} rounded-full`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size * 0.6}px`,
              backgroundColor: shape.color,
              borderRadius: '50% / 25%',
            }}
            animate={{
              rotateX: [0, 360],
              scaleY: [1, 1.3, 1],
              x: [0, 35, -35, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{
              duration: 16 + Math.random() * 12,
              repeat: Infinity,
              delay: shape.delay,
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map(renderShape)}

      {/* Enhanced floating particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: ['#0B63FF', '#C0C6C9', '#0095FF', '#4A90E2'][Math.floor(Math.random() * 4)],
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 80 - 40, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.6, 0.8],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute opacity-15"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 150 - 75, 0],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        >
          {['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)] === 'square' && (
            <div
              className="w-8 h-8 border-2"
              style={{ borderColor: ['#0B63FF', '#C0C6C9', '#0095FF'][Math.floor(Math.random() * 3)] }}
            />
          )}
          {['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)] === 'circle' && (
            <div
              className="w-8 h-8 rounded-full border-2"
              style={{ borderColor: ['#0B63FF', '#C0C6C9', '#0095FF'][Math.floor(Math.random() * 3)] }}
            />
          )}
          {['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)] === 'triangle' && (
            <div
              className="w-0 h-0 border-l-4 border-r-4 border-b-8"
              style={{
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: ['#0B63FF', '#C0C6C9', '#0095FF'][Math.floor(Math.random() * 3)]
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Large gradient orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`large-orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 300 + 150}px`,
            height: `${Math.random() * 300 + 150}px`,
            background: `radial-gradient(circle, ${['rgba(11, 99, 255, 0.08)', 'rgba(192, 198, 201, 0.06)', 'rgba(0, 149, 255, 0.07)', 'rgba(74, 144, 226, 0.05)'][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 80 - 40, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating code symbols */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`code-${i}`}
          className="absolute text-2xl font-mono opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: ['#0B63FF', '#C0C6C9', '#0095FF'][Math.floor(Math.random() * 3)],
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, Math.random() * 360, 0],
          }}
          transition={{
            duration: 18 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 12,
          }}
        >
          {['{ }', '< >', '[ ]', '( )', '//', '/* */'][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}

      {/* Pulsing energy rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border-2 opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            borderColor: ['#0B63FF', '#C0C6C9', '#0095FF'][Math.floor(Math.random() * 3)],
          }}
          animate={{
            scale: [0.8, 1.5, 0.8],
            opacity: [0.05, 0.2, 0.05],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating circuit patterns */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`circuit-${i}`}
          className="absolute opacity-15"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, Math.random() * 180, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 22 + Math.random() * 12,
            repeat: Infinity,
            delay: Math.random() * 15,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-atom-primary">
            <path
              d="M10 10 L30 10 L30 15 L25 15 L25 25 L30 25 L30 30 L10 30 L10 25 L15 25 L15 15 L10 15 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};