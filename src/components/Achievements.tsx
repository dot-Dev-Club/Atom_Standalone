import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Users, Target, Award, Lightbulb, Rocket } from 'lucide-react';
import { ThreeDIconPresets } from './ThreeDIcons';

const achievements = [
  {
    icon: Trophy,
    title: "50+ Projects Completed",
    description: "Successfully delivered innovative technology solutions"
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Leading research and development initiatives"
  },
  {
    icon: Users,
    title: "150+ Active Members",
    description: "Growing community of tech enthusiasts and leaders"
  },
  {
    icon: Rocket,
    title: "Solving real life problems",
    description: "Using knowledge and creativity to find practical solutions"
  },
  {
    icon: Target,
    title: "10+ Workshops",
    description: "Comprehensive skill development programs"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-4">
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
              className="glass-card p-8 text-center group hover-scale transform-gpu"
              style={{
                transformStyle: 'preserve-3d',
              }}
              whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative mb-6 flex justify-center">
                {achievement.icon === Trophy && <ThreeDIconPresets.Trophy size={48} />}
                {achievement.icon === Users && <ThreeDIconPresets.Users size={48} />}
                {achievement.icon === Target && <ThreeDIconPresets.Target size={48} />}
                {achievement.icon === Award && <ThreeDIconPresets.Award size={48} />}
                {achievement.icon === Lightbulb && <ThreeDIconPresets.Lightbulb size={48} />}
                {achievement.icon === Rocket && <ThreeDIconPresets.Rocket size={48} />}
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