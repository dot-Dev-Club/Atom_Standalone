
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, Linkedin, Grid, ArrowLeft } from "lucide-react";

import coordinator1 from "@/assets/coordinator-1.jpg";
import coordinator2 from "@/assets/coordinator-2.jpg";
import Aravind from "@/assets/Aravind.jpg";
import Immanuel from "@/assets/Immanuel.jpg";
import Bruno from "@/assets/Bruno.jpg";
import Deepa from "@/assets/Deepakumar_URK23CO2014.jpg";
import franz from "@/assets/FranzKingsteinN_JointSpiritualCoordinator.jpg";
import Jerome from "@/assets/Jerome T_Media Co-ordinator.png";
import kevin from "@/assets/Kevin.jpg";
import Malliga from "@/assets/Malliga.jpeg";
import Nadish from "@/assets/Nadish.jpg";
import Jemmiah from "@/assets/Name - Jemimah Praisy; Position - Joint spiritual cooardinator .jpg";
import Nessan from "@/assets/Nessa.jpg";
import Raghul from "@/assets/Rahul Balaskandan_ Joint Technical Coordinator.png";
import Reshwin from "@/assets/Reshwin.jpg";
import Thirupathy from "@/assets/Thirupathi S_Joint Treasurer.jpg";
import Uvasri from "@/assets/Uvasri.png";
import Nithish from "@/assets/Nithishkumar.png";
import Kaviya from "@/assets/kaviya.png";
import Media from "@/assets/Media.png";
import Keba from "@/assets/keba.jpg";
import Gre from '@/assets/Gre.jpg';

// coordinators data
const coordinators = [
  {
    id: 1,
    name: "Bruno A",
    role: "Secretary",
    image: Bruno,
    bio: "As Secretary, Bruno A is a dedicated member, committed to achieving the club's goals and fostering a strong community.",
    linkedin: "https://www.linkedin.com/in/bruno-jd-84b3402ab/",
  },
  {
    id: 2,
    name: "Kevin J",
    role: "Co-Secretary",
    image: kevin,
    bio: "As Co-Secretary, Kevin J is passionate about data science and full stack development. He has published three research papers and holds industrial certifications from Microsoft and Cisco. He is currently a Software Developer Intern with a placement offer of 5 LPA.",
    linkedin: "https://www.linkedin.com/in/j-kevin/",
  },
  {
    id: 3,
    name: "Deepakumar S",
    role: "Joint Secretary",
    image: Deepa,
    bio: "As Joint Secretary, Deepakumar S is a skilled practitioner in offensive security. He was awarded Best Idea in the TN Police Hackathon and secured a Summer Internship Offer in Cyberthon 2025.",
    linkedin: "https://www.linkedin.com/in/deepakumar-s-3025b1359/",  
  },
  {
    id: 4,
    name: "K B Uvasri",
    role: "Treasurer",
    image: Uvasri,
    bio: "As Treasurer, K B Uvasri is a winner of the Smart India Hackathon 2024 and has been a finalist in the 5G hackathon. He has published a paper on IoT-based systems and has served as an HR for three years.",
    linkedin: "https://www.linkedin.com/in/uvasri-k-b-682588250",
  },
  {
    id: 5,
    name: "Thirupathi S",
    role: "Joint Treasurer",
    image: Thirupathy,
    bio: "As Joint Treasurer, Thirupathi S is a finalist at Cyberthon 2025 and was awarded the Special Mention Prize for innovation. He is passionate about AI and Full Stack development and has worked on several real-time AI software products.",
    linkedin: "https://www.linkedin.com/in/thirupathis",
  },
  {
    id: 6,
    name: "Nadish B",
    role: "Event Management Coordinator",
    image: Nadish,
    bio: "As Event Management Coordinator, Nadish B is a top 25 finalist in the Generative AI hackathon and is passionate about AI and Full Stack development.",
    linkedin: "https://www.linkedin.com/in/nadish-b-b20165251/",
  },
  {
    id: 7,
    name: "Kaviya Varshini. G. S",
    role: "Event Management Coordinator",
    image: Kaviya,
    bio: "As Event Management Coordinator, Kaviya Varshini. G. S is a NEXUS winner and is passionate about cyber security.",
    linkedin: "https://www.linkedin.com/in/kaviya-varshini-gs/",
  },
  {
    id: 8,
    name: "Regulla Mallika Priyaharshini",
    role: "Joint Event Management Coordinator",
    image: Malliga,
    bio: "As Joint Event Management Coordinator, Regulla Mallika Priyaharshini participated in the SIH hackathon 2024 and worked as an intern for HashTek Solutions as a cloud computing engineer.",
    linkedin: "https://www.linkedin.com/in/mallika-regulla-059232297/",
  },
  {
    id: 9,
    name: "Nithishkumar K",
    role: "Joint Event Management Coordinator",
    image: Nithish,
    bio: "As Joint Event Management Coordinator, Nithishkumar K is a cyberthon finalist and is a National level Archer with a state-level rank 1.",
    linkedin: "https://www.linkedin.com/in/nithishkumar-k-691473351",
  },
  {
    id: 10,
    name: "Reshwin R S",
    role: "Technical Coordinator",
    image: Reshwin,
    bio: "As Technical Coordinator, Reshwin R S is a winner in the Nexus hackathon.",
    linkedin: "https://www.linkedin.com/in/reshwin-r-s/",
  },
  {
    id: 11,
    name: "Rahul Balaskandan",
    role: "Joint Technical Coordinator",
    image: Raghul,
    bio: "As Joint Technical Coordinator, Rahul Balaskandan was awarded Best Outstanding Project at the TN Police Hackathon. He is passionate about Cyber Security and is an intern at Jeebly Cyber Security.",
    linkedin: "http://linkedin.com/in/rahul-balaskandan",
  },
  {
    id: 12,
    name: "Jerome T",
    role: "Media Coordinator",
    image: Jerome,
    bio: "As Media Coordinator, Jerome T is a finalist in the Kavach 2023 and SIH 2023 national-level cybersecurity hackathons. He has also published a research paper on Forest fire detection using GSM/GPS module.",
    linkedin: "http://www.linkedin.com/in/jeromes2415",
  },
  {
    id: 13,
    name: "Sanjay Nesan J",
    role: "Joint Media Coordinator",
    image: Nessan,
    bio: "As Joint Media Coordinator, Sanjay Nesan J is a winner of Nexus 2024 and Mathbee 2024. He is passionate about FRONTEND and Graphic Design and developed a location-based geofencing system.",
    linkedin: "https://www.linkedin.com/in/sanjaynesanj/",
  },
  {
    id: 14,
    name: "Gregory Joe Jeni. C",
    role: "Joint Media Coordinator",
    image: Gre,
    bio: "As Joint Media Coordinator, Gregory Joe Jeni. C won first prize in photography during his school days.",
    linkedin: "https://www.linkedin.com/in/gregory-joe-jeni-0850142bb/",
  },
  {
    id: 15,
    name: "Aravindan M",
    role: "Sports Coordinator",
    image: Aravind,
    bio: "As Sports Coordinator, Aravindan M is a Silver Medalist in the International Taekwondo Championship and a finalist at IIT Bombay’s Eureka 2024. He is specialized in Generative AI and is the Head of AI at Rapha MedTech.",
    linkedin: "https://www.linkedin.com/in/aravindan-arru/",
  },
  {
    id: 16,
    name: "Keba Daniel J",
    role: "Spiritual Coordinator",
    image: Keba,
    bio: "As Spiritual Coordinator, Keba Daniel J is a winner in paper presentation, ideathon, and project expo at various colleges. He is also a data science intern at Skill Radar.",
    linkedin: "https://in.linkedin.com/in/keba-daniel-j",
  },
  {
    id: 17,
    name: "Franz Kingstein N",
    role: "Joint Spiritual Coordinator",
    image: franz,
    bio: "As Joint Spiritual Coordinator, Franz Kingstein N is a part of Raising General, the people who connect Karunya to GOD. He is also Coordinated Various Spiritual Events like fellowships, Spiritual Festival and Department Retreat.",
    linkedin: "https://www.linkedin.com/in/franz-kingstein7/",
  },
  {
    id: 18,
    name: "Jemimah Praisey P",
    role: "Joint Spiritual Coordinator",
    image: Jemmiah,
    bio: "As Joint Spiritual Coordinator, Jemimah Praisey P is an integral part of the team, dedicated to driving success and collaboration.",
    linkedin: "https://www.linkedin.com/in/jemimahpraisy7/",
  },
];
export const Coordinators = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCoordinator, setSelectedCoordinator] = useState<
    typeof coordinators[0] | null
  >(null);

  const [viewAll, setViewAll] = useState(false);

  const Card = ({ coordinator }: { coordinator: typeof coordinators[0] }) => (
    <motion.div
      key={coordinator.id}
      className="flex-shrink-0 w-72 glass-card p-6 hover-scale cursor-pointer"
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
  );

  return (
    <>
      <section ref={ref} className="py-20 px-4 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Core Members
        </motion.h2>

        {viewAll ? (
          <>
            {/* Full Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {coordinators.map((c) => (
                <Card key={c.id} coordinator={c} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setViewAll(false)}
                className="btn-metallic flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Carousel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Auto-scrolling Carousel */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-6 animate-scroll"
                style={{
                  width: `${coordinators.length * 320 * 2}px`,
                  animation: `scroll ${coordinators.length * 4}s linear infinite`,
                }}
              >
                {[...coordinators, ...coordinators].map((c, index) => (
                  <Card key={`${c.id}-${index}`} coordinator={c} />
                ))}
              </motion.div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setViewAll(true)}
                className="btn-metallic flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                View All
              </button>
            </div>
          </>
        )}
      </section>

      {/* Modal */}
      {selectedCoordinator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCoordinator(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
                <Linkedin className="w-4 h-4 text-atom-primary" />
                <a
                  href={`https://${selectedCoordinator.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {selectedCoordinator.linkedin}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

