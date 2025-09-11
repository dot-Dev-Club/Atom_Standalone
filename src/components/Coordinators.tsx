import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, Mail, Phone, Linkedin } from 'lucide-react';
import coordinator1 from '@/assets/coordinator-1.jpg';
import coordinator2 from '@/assets/coordinator-2.jpg';

const coordinators = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Secretary",
    image: coordinator1,
    bio: "Passionate about emerging technologies and organizational excellence. Alex leads our strategic initiatives and ensures smooth operations across all club activities. With expertise in project management and team coordination, he drives innovation while maintaining high standards of execution.",
    email: "alex.thompson@atomclub.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/alexthompson"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Co-Secretary",
    image: coordinator2,
    bio: "Expert in technology integration and member engagement. Sarah focuses on building strong community connections and fostering collaborative learning environments. Her background in software development and UX design helps shape our technical programs and user experience initiatives.",
    email: "sarah.chen@atomclub.com",
    phone: "+1 (555) 234-5678",
    linkedin: "linkedin.com/in/sarahchen"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Technical Lead",
    image: coordinator1,
    bio: "Leading our technical projects and innovation initiatives. Michael oversees all development activities and mentors members in advanced programming concepts. His expertise spans full-stack development, AI/ML, and cloud technologies, making him instrumental in our technical growth.",
    email: "michael.rodriguez@atomclub.com",
    phone: "+1 (555) 345-6789",
    linkedin: "linkedin.com/in/michaelrodriguez"
  },
  {
    id: 4,
    name: "Emily Wang",
    role: "Events Coordinator",
    image: coordinator2,
    bio: "Organizing impactful events and workshops that drive member engagement. Emily brings creativity and attention to detail to every event she manages, ensuring meaningful learning experiences. Her background in digital marketing and event planning creates memorable and educational opportunities.",
    email: "emily.wang@atomclub.com",
    phone: "+1 (555) 456-7890",
    linkedin: "linkedin.com/in/emilywang"
  },
  {
    id: 5,
    name: "David Kim",
    role: "Research Director",
    image: coordinator1,
    bio: "Spearheading research initiatives and academic partnerships. David leads our exploration of cutting-edge technologies and maintains relationships with industry partners. His PhD in Computer Science and published research in AI make him our bridge between academia and practical application.",
    email: "david.kim@atomclub.com",
    phone: "+1 (555) 567-8901",
    linkedin: "linkedin.com/in/davidkim"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    role: "Community Manager",
    image: coordinator2,
    bio: "Building and nurturing our vibrant member community. Lisa focuses on member retention, engagement, and creating inclusive environments for all skill levels. Her expertise in community building and social media strategy helps maintain our strong organizational culture.",
    email: "lisa.anderson@atomclub.com",
    phone: "+1 (555) 678-9012",
    linkedin: "linkedin.com/in/lisaanderson"
  }
];

export const Coordinators = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCoordinator, setSelectedCoordinator] = useState<typeof coordinators[0] | null>(null);

  return (
    <>
      <section ref={ref} className="py-20 px-4 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Our Coordinators
        </motion.h2>

        <div className="relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-6 animate-scroll"
            style={{
              animation: 'scroll 30s linear infinite',
            }}
          >
            {[...coordinators, ...coordinators].map((coordinator, index) => (
              <motion.div
                key={`${coordinator.id}-${index}`}
                className="flex-shrink-0 w-80 glass-card p-6 hover-scale cursor-pointer"
                onClick={() => setSelectedCoordinator(coordinator)}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative mb-4">
                  <img
                    src={coordinator.image}
                    alt={coordinator.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-atom-metallic"
                  />
                  <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-primary opacity-0 hover:opacity-20 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-xl font-bold text-center mb-2 text-foreground">
                  {coordinator.name}
                </h3>
                
                <p className="text-atom-primary font-semibold text-center mb-3">
                  {coordinator.role}
                </p>
                
                <p className="text-sm text-foreground-secondary text-center leading-relaxed line-clamp-3">
                  {coordinator.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {selectedCoordinator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCoordinator(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCoordinator(null)}
              className="absolute top-4 right-4 p-2 hover:bg-card-hover rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <img
                src={selectedCoordinator.image}
                alt={selectedCoordinator.name}
                className="w-32 h-32 rounded-full mx-auto object-cover border-[3px] border-atom-metallic mb-4"
              />
              <h3 className="text-2xl font-bold mb-2 gradient-text">
                {selectedCoordinator.name}
              </h3>
              <p className="text-atom-primary font-semibold text-lg">
                {selectedCoordinator.role}
              </p>
            </div>

            <p className="text-foreground-secondary leading-relaxed mb-6">
              {selectedCoordinator.bio}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                <Mail className="w-4 h-4 text-atom-primary" />
                <span>{selectedCoordinator.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                <Phone className="w-4 h-4 text-atom-primary" />
                <span>{selectedCoordinator.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                <Linkedin className="w-4 h-4 text-atom-primary" />
                <span>{selectedCoordinator.linkedin}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCoordinator(null)}
              className="w-full mt-6 btn-metallic"
            >
              Contact
            </button>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
};