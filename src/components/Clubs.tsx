import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Smartphone, Brain, Shield, Globe, X } from 'lucide-react';
import { ThreeDIconPresets } from './ThreeDIcons';
import coordinator1 from '@/assets/coordinator-1.jpg';
import coordinator2 from '@/assets/coordinator-2.jpg';

const clubs = [
  {
    id: 1,
    name: "Web Development Club",
    icon: Code,
    description: "Master modern web technologies and full-stack development",
    objectives: "Build responsive web applications using React, Node.js, and modern frameworks. Focus on user experience, performance optimization, and scalable architecture patterns.",
    coordinators: [
      { 
        name: "Alex Johnson", 
        role: "Main Coordinator", 
        image: coordinator1,
        isMain: true
      },
      { 
        name: "Maria Garcia", 
        role: "Sub Coordinator", 
        image: coordinator2,
        isMain: false
      },
      { 
        name: "James Wilson", 
        role: "Sub Coordinator", 
        image: coordinator1,
        isMain: false
      }
    ]
  },
  {
    id: 2,
    name: "Mobile Development Club",
    icon: Smartphone,
    description: "Create innovative mobile applications for iOS and Android",
    objectives: "Develop cross-platform mobile apps using React Native and Flutter. Learn mobile-first design principles, app store optimization, and mobile security best practices.",
    coordinators: [
      { 
        name: "Sarah Kim", 
        role: "Main Coordinator", 
        image: coordinator2,
        isMain: true
      },
      { 
        name: "David Chen", 
        role: "Sub Coordinator", 
        image: coordinator1,
        isMain: false
      }
    ]
  },
  {
    id: 3,
    name: "AI & Machine Learning Club",
    icon: Brain,
    description: "Explore artificial intelligence and machine learning technologies",
    objectives: "Implement AI solutions using Python, TensorFlow, and PyTorch. Focus on neural networks, natural language processing, and computer vision applications.",
    coordinators: [
      { 
        name: "Dr. Emily Zhang", 
        role: "Main Coordinator", 
        image: coordinator2,
        isMain: true
      },
      { 
        name: "Michael Torres", 
        role: "Sub Coordinator", 
        image: coordinator1,
        isMain: false
      },
      { 
        name: "Lisa Rodriguez", 
        role: "Sub Coordinator", 
        image: coordinator2,
        isMain: false
      }
    ]
  },
  {
    id: 4,
    name: "Cybersecurity Club",
    icon: Shield,
    description: "Learn ethical hacking and cybersecurity best practices",
    objectives: "Master network security, penetration testing, and security audit techniques. Understand threat modeling, incident response, and security architecture design.",
    coordinators: [
      { 
        name: "Robert Anderson", 
        role: "Main Coordinator", 
        image: coordinator1,
        isMain: true
      },
      { 
        name: "Jennifer Lee", 
        role: "Sub Coordinator", 
        image: coordinator2,
        isMain: false
      }
    ]
  },
  {
    id: 5,
    name: "Cloud Computing Club",
    icon: Globe,
    description: "Master cloud platforms and distributed systems",
    objectives: "Deploy and manage applications on AWS, Azure, and GCP. Learn containerization with Docker, orchestration with Kubernetes, and serverless architectures.",
    coordinators: [
      { 
        name: "Ahmed Hassan", 
        role: "Main Coordinator", 
        image: coordinator1,
        isMain: true
      },
      { 
        name: "Nina Patel", 
        role: "Sub Coordinator", 
        image: coordinator2,
        isMain: false
      },
      { 
        name: "Carlos Mendez", 
        role: "Sub Coordinator", 
        image: coordinator1,
        isMain: false
      }
    ]
  }
];

export const Clubs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedClub, setSelectedClub] = useState<typeof clubs[0] | null>(null);

  return (
    <>
      <section ref={ref} className="py-20 px-4 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text"
        >
          Our Clubs
        </motion.h2>

        {/* First Row - 3 Clubs Centered */}
        <div className="flex justify-center gap-6 mb-8">
          {clubs.slice(0, 3).map((club, index) => {
            const Icon = club.icon;

            return (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="glass-card p-8 hover-scale cursor-pointer group"
                onClick={() => setSelectedClub(club)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative mb-6 flex justify-center">
                  {club.icon === Code && <ThreeDIconPresets.Code size={48} />}
                  {club.icon === Smartphone && <ThreeDIconPresets.Zap size={48} />}
                  {club.icon === Brain && <ThreeDIconPresets.Cpu size={48} />}
                  {club.icon === Shield && <ThreeDIconPresets.Award size={48} />}
                  {club.icon === Globe && <ThreeDIconPresets.Globe size={48} />}
                </div>

                <h3 className="text-xl font-bold text-center mb-4 text-foreground">
                  {club.name}
                </h3>

                <p className="text-foreground-secondary text-center leading-relaxed mb-4">
                  {club.description}
                </p>

                <div className="flex justify-center space-x-2">
                  {club.coordinators.slice(0, 3).map((coordinator, i) => (
                    <img
                      key={i}
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-8 h-8 rounded-full border-2 border-atom-metallic"
                    />
                  ))}
                  {club.coordinators.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-card-hover border-2 border-atom-metallic flex items-center justify-center text-xs font-semibold">
                      +{club.coordinators.length - 3}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Second Row - 2 Clubs with Space Between */}
        <div className="flex justify-between gap-6 max-w-4xl mx-auto">
          {clubs.slice(3, 5).map((club, index) => {
            const Icon = club.icon;

            return (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: (index + 3) * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="glass-card p-8 hover-scale cursor-pointer group"
                onClick={() => setSelectedClub(club)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative mb-6 flex justify-center">
                  {club.icon === Code && <ThreeDIconPresets.Code size={48} />}
                  {club.icon === Smartphone && <ThreeDIconPresets.Zap size={48} />}
                  {club.icon === Brain && <ThreeDIconPresets.Cpu size={48} />}
                  {club.icon === Shield && <ThreeDIconPresets.Award size={48} />}
                  {club.icon === Globe && <ThreeDIconPresets.Globe size={48} />}
                </div>

                <h3 className="text-xl font-bold text-center mb-4 text-foreground">
                  {club.name}
                </h3>

                <p className="text-foreground-secondary text-center leading-relaxed mb-4">
                  {club.description}
                </p>

                <div className="flex justify-center space-x-2">
                  {club.coordinators.slice(0, 3).map((coordinator, i) => (
                    <img
                      key={i}
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-8 h-8 rounded-full border-2 border-atom-metallic"
                    />
                  ))}
                  {club.coordinators.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-card-hover border-2 border-atom-metallic flex items-center justify-center text-xs font-semibold">
                      +{club.coordinators.length - 3}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Club Detail Modal */}
      {selectedClub && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedClub(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedClub(null)}
              className="absolute top-4 right-4 p-2 hover:bg-card-hover rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {selectedClub.icon === Code && <ThreeDIconPresets.Code size={64} />}
                {selectedClub.icon === Smartphone && <ThreeDIconPresets.Zap size={64} />}
                {selectedClub.icon === Brain && <ThreeDIconPresets.Cpu size={64} />}
                {selectedClub.icon === Shield && <ThreeDIconPresets.Award size={64} />}
                {selectedClub.icon === Globe && <ThreeDIconPresets.Globe size={64} />}
              </div>
              <h3 className="text-3xl font-bold mb-4 gradient-text">
                {selectedClub.name}
              </h3>
              <p className="text-lg text-foreground-secondary">
                {selectedClub.description}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 metallic-text">
                Main Objectives
              </h4>
              <p className="text-foreground-secondary leading-relaxed">
                {selectedClub.objectives}
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6 metallic-text">
                Coordinators
              </h4>
              <div className={`${
                (selectedClub.id === 2 || selectedClub.id === 4)
                  ? 'flex flex-row justify-between gap-6 max-w-2xl mx-auto'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              }`}>
                {selectedClub.coordinators.map((coordinator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-6 text-center tilted-card ${
                      coordinator.isMain ? 'ring-2 ring-atom-primary' : ''
                    } ${selectedClub.id === 2 || selectedClub.id === 4 ? 'flex-1' : ''}`}
                  >
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-atom-metallic mb-4"
                    />
                    <h5 className="font-semibold text-foreground mb-2">
                      {coordinator.name}
                    </h5>
                    <p className={`text-sm ${
                      coordinator.isMain ? 'text-atom-primary font-semibold' : 'text-foreground-secondary'
                    }`}>
                      {coordinator.role}
                    </p>
                    {coordinator.isMain && (
                      <div className="mt-2 text-xs text-atom-primary font-medium">
                        ★ Lead Coordinator
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
