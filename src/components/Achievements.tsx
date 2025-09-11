import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Users, Target, Award, Lightbulb, Rocket } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: "50+ Projects Completed",
    description: "Successfully delivered innovative technology solutions"
  },
  {
    icon: Users,
    title: "200+ Active Members",
    description: "Growing community of tech enthusiasts and leaders"
  },
  {
    icon: Target,
    title: "15+ Workshops",
    description: "Comprehensive skill development programs"
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Awarded for excellence in student innovation"
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Leading research and development initiatives"
  },
  {
    icon: Rocket,
    title: "Startup Incubation",
    description: "Supporting entrepreneurial ventures and ideas"
  }
];

export const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-4 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
      >
        Our Achievements
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              className="glass-card p-8 text-center group hover-scale"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:shadow-electric transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute inset-0 w-16 h-16 mx-auto bg-electric rounded-full animate-pulse-glow opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {achievement.title}
              </h3>
              
              <p className="text-foreground-secondary leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};