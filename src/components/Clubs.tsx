import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code, Smartphone, Brain, Shield, Globe, X, Linkedin, ArrowLeft, ExternalLink, Github } from "lucide-react";

import coordinator1 from '@/assets/coordinator-1.jpg';
import coordinator2 from '@/assets/coordinator-2.jpg';
import Danish from '@/assets/danish.jpg';
import Jola from '@/assets/jola.jpg';
import Aravind from '@/assets/Aravind.jpg';
import Immanuel from '@/assets/immanuel.jpg';
import Sanjay from '@/assets/Sanjay.jpg';
import Ronnie from '@/assets/ra1.png';
import Rumitha from '@/assets/Rumitha.png';
import Renimol from '@/assets/Renimol.jpg';
import Darshan from '@/assets/Dharshan_KumarJ-DotDev_Coordinator.jpg';
import Manisha from '@/assets/Manisha.jpg';
import Vasuki from '@/assets/Vasuki.jpg';
import Varsha from '@/assets/Varsha.jpg';
import Aparna from '@/assets/Aparna.jpg';
import Lebi from '@/assets/Lebi.jpg';
import Thirupathy from '@/assets/Thirupathi S_Joint Treasurer.jpg';
import Pooja from '@/assets/Pooja.jpg';
import Dhruv from '@/assets/Dhruv.jpg';
import Leo from '@/assets/Leo.jpg';
import Gre from '@/assets/Gre.jpg';
import Nithish from "@/assets/Nithishkumar.png";
import Jayesh from "@/assets/Jayesh.jpg";
import Monish from "@/assets/Monish.jpeg";
import Dot1 from "@/assets/Dot1.jpg"; 
import Dot2 from "@/assets/Dot2.jpg"; 
import Dot3 from "@/assets/Dot3.jpg"; 
import Dot4 from "@/assets/Dot4.jpg"; 
import Dot5 from "@/assets/Dot5.jpg"; 
import Dot6 from "@/assets/Dot6.jpg"; 
import Dot7 from "@/assets/Dot7.jpg"; 
import Dot8 from "@/assets/Dot8.jpg"; 
import Dot9 from "@/assets/Dot9.jpg"; 
import Hack1 from "@/assets/Hack1.jpg";
import Hack2 from "@/assets/Hack2.jpg";
import Hack3 from "@/assets/Hack3.jpg";
import Hack4 from "@/assets/Hack4.jpg";
import Hack5 from "@/assets/Hack5.jpg";
import Hack6 from "@/assets/Hack6.jpg";
import Hack7 from "@/assets/Hack7.jpg";
import Bias1 from "@/assets/Unbias1.jpg";
import Bias2 from "@/assets/Unbias2.jpg";
import Bias3 from "@/assets/Unbias3.jpg";
import Bias4 from "@/assets/Unbias4.jpg";
import Bias6 from "@/assets/Unbias6.jpg";
import Bias7 from "@/assets/Unbias7.jpg";
import DotIcon from "@/assets/Dot.ico";
import BiasIcon from "@/assets/Bias.ico";
import HackIcon from "@/assets/Hack.ico";


const clubs = [
  {
    id: 1,
    name: "Hack Hive Club",
    icon: HackIcon,
    description:
      "Hack Hive is a student-driven cybersecurity club that brings together passionate individuals to explore, learn, and innovate in the field of information security.",
    objectives:
      "To spread cybersecurity awareness among students and faculty. To conduct hands-on workshops, Capture The Flag (CTF) competitions, and hackathons. To build a strong community of ethical hackers and cybersecurity enthusiasts.",
    extraInfo:
      "Hack Hive hosts weekly learning sessions, invites industry experts for talks, and participates in national cybersecurity competitions. The club has successfully organized multiple CTF events and security workshops that have benefited over 200+ students.",
    coordinators: [
      {
        name: "Sanjay S",
        role: "Coordinator",
        image: Sanjay,
        isMain: true,
        bio: "As Coordinator of Hack Hive, Sanjay S is a finalist in the Cyberthon and was awarded the Best Idea Award at the TN-Police Hackathon.",
        linkedin: "https://www.linkedin.com/in/sanjay-s-699585345",
      },
      {
        name: "Jayesh",
        role: "Joint Coordinator",
        image: Jayesh,
        isMain: false,
         bio: "As Junior Coordinator of Hack Hive, Jayesh V Prakash Naidu is passionate about DIGITAL FORENSICS and created a Wi-Fi penetration-testing device to learn networking. He is also the founder of BlackSpotAI, a cybersecurity project.",
        linkedin: "https://www.linkedin.com/in/jayesh-v-prakash-naidu",
      },
       {
        name: "Gregory Joe Jeni C",
        role: "Educator",
        image: Gre,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/gregory-joe-jeni-0850142bb/",
      },
       {
        name: "Nithishkumar K",
        role: "Educator",
        image: Nithish,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/nithishkumar-k-691473351",
      },
       {
        name: "Leo Francis A",
        role: "Educator",
        image: Leo,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/leo-francis-a-a9092531b",
      }
    ],
    projects: [
      {
        name: "CyberGuard Platform",
        description: "A comprehensive security monitoring platform that detects and prevents cyber threats in real-time using advanced AI algorithms.",
        github: "https://github.com/hackhive/cyberguard"
      },
      {
        name: "EthicalHack Toolkit",
        description: "An educational toolkit for learning ethical hacking and penetration testing techniques with hands-on exercises.",
        github: "https://github.com/hackhive/ethical-toolkit"
      },
      {
        name: "SecureNet Analyzer",
        description: "Network security analysis tool that identifies vulnerabilities and provides security recommendations.",
        github: "https://github.com/hackhive/securenet"
      }
    ],
    gallery: [
      Hack1,
      Hack2,
      Hack3,
      Hack4,
      Hack5,
      Hack6,
      Hack7,
    ]
  },
  {
    id: 2,
    name: "Dot Dev Club",
    icon: DotIcon,
    description:
      "Dotdev is a student community for aspiring software engineers focused on full-stack development.",
    objectives:
      "Develop members' problem-solving, logical, and communication skills. Master full-stack development through hands-on workshops and collaborative projects. Build a strong, supportive community of student developers.",
    extraInfo:
      "Dot Dev Club organizes hackathons, code sprints, mentorship sessions, and collaborative projects for members. The club has built over 50+ web applications and mobile apps, with members securing internships at top tech companies.",
    coordinators: [
       {
        name: "Dharshan Kumar J",
        role: "Coordinator",
        image: Darshan,
        isMain: true,
        bio: "As Coordinator of Dot Dev, Dharshan Kumar J is a Finalist of the NEXUS hackathon and a Software Developer skilled in developing Web and Mobile Applications. He is also a co-founder of VelsyMedia and TurpleSpace and has led a Midkraft24 website team.",
        linkedin: "https://www.linkedin.com/in/j-dharshan-kumar/",
      },
      {
        name: "Danish Prabhu K V",
        role: "Junior Coordinator",
        image: Danish,
        isMain: false,
         bio: " As Junior Coordinator of Dot Dev, Danish Prabhu K V is a Finalist of the NEXUS Hackathon and is passionate about AI, and software engineering. He works as a freelancer and is currently an intern at GMS (US Based company) earning a stipend of 10k/month.",
        linkedin: "https://www.linkedin.com/in/danish-prabhu-0a1691293",
      },
       {
        name: "Jola Kaseena C",
        role: "Educator",
        image: Jola,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/jola-keseena-b0895a2a9",
      },
       {
        name: "Manisha S",
        role: "Educator",
        image: Manisha,
        isMain: false,
         bio: "",
        linkedin: "",
      },
       {
        name: "Varsha S",
        role: "Educator",
        image: Varsha,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/varsha-nadarajan",
      },
       {
        name: "Monish",
        role: "Educator",
        image: Monish,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/varsha-nadarajan",
      },
    ],
    projects: [
      {
        name: "DevHub Platform",
        description: "A collaborative development platform for students to share projects, find teammates, and showcase their work.",
        github: "https://github.com/dotdev/devhub"
      },
      {
        name: "CodeMentor App",
        description: "Mobile application connecting junior developers with experienced mentors for guidance and career development.",
        github: "https://github.com/dotdev/codementor"
      },
      {
        name: "TechStack Builder",
        description: "Interactive tool to help developers choose the right technology stack for their projects.",
        github: "https://github.com/dotdev/techstack"
      }
    ],
    gallery: [
        Dot1,
        Dot2,
        Dot3,
        Dot4,
        Dot5,
        Dot6,
        Dot7,
        Dot8,
        Dot9,
      ]
  },
  {
    id: 3,
    name: "Un Bias Club",
    icon: BiasIcon,
    description:
      "The Unbiased AI Club is a student-driven community exploring AI, ML, DL, NLP, Generative AI, and Agents. We encourage hands-on learning, collaboration, and innovation to build impactful projects for our department and beyond.",
    objectives:
      "Build a strong foundation in AI through regular sessions. Promote hands-on projects and innovation. Foster collaboration and knowledge sharing. Prepare students for research, industry, and competitions. Develop a department-focused AI product.",
    extraInfo:
      "Un Bias Club conducts weekly AI workshops, research paper discussions, and hands-on ML projects. Members have published 10+ research papers and won multiple AI competitions including national-level hackathons.",
    coordinators: [
      {
        name: "Aravindan",
        role: "Coordinator",
        image: Aravind,
        isMain: true,
        bio: "As Coordinator of Unbias, Aravindan M is a Silver Medalist in the International Taekwondo Championship and a finalist at IIT Bombay's Eureka 2024. He is specialized in Generative AI and is the Head of AI at Rapha MedTech.",
        linkedin: "https://www.linkedin.com/in/aravindan-arru/",
      },
      {
        name: "Ronnie A Jeffrey",
        role: "Junior Coordinator",
        image: Ronnie,
        isMain: false,
         bio: "As Junior Coordinator of Unbias, Ronnie A Jeffrey is a winner in NEXUS 2024 and was awarded a special mention at Cyberthon '25. He is passionate about AI and Full Stack development.",
        linkedin: "https://www.linkedin.com/in/ronnie-a-jeffrey",
      },
      {
        name: "Pooja",
        role: "Educator",
        image: Pooja,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/pooja-s-1190862b8/",
      },
      {
        name: "Aparna",
        role: "Educator",
        image: Aparna,
        isMain: false,
         bio: "",
        linkedin: "http://linkedin.com/in/aparna-j-a13647297",
      },
      {
        name: "Thirupathi",
        role: "Educator",
        image: Thirupathy,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/thirupathis",
      },
      {
        name: "Vasuki",
        role: "Educator",
        image: Vasuki,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/vasuki-g-0b31a9288",
      },
      {
        name: "Lebiraja",
        role: "Educator",
        image: Lebi,
        isMain: false,
         bio: "",
        linkedin: "https://www.linkedin.com/in/lebiraja",
      }
    ],
    projects: [
      {
        name: "SmartPredict AI",
        description: "Machine learning model for predicting student performance and providing personalized learning recommendations.",
        github: "https://github.com/unbias/smartpredict"
      },
      {
        name: "NLP Chatbot Assistant",
        description: "Advanced natural language processing chatbot for student queries and academic support using transformers.",
        github: "https://github.com/unbias/nlp-assistant"
      },
      {
        name: "Computer Vision Toolkit",
        description: "Comprehensive toolkit for image processing and computer vision applications in educational contexts.",
        github: "https://github.com/unbias/cv-toolkit"
      }
    ],
    gallery: [
      Bias1,
      Bias2,
      Bias3,
      Bias4,
      Bias6,
      Bias7,
    ]
  },
  {
    id: 4,
    name: "RND Club",
    icon: Shield,
    description:
      "The R&D Club under ATOM is a hub for innovation, turning real-world challenges into smart, practical, and startup-ready solutions. It empowers students to explore ideas, build prototypes, and collaborate with industry experts to bring innovations to life.",
    objectives:
      "To identify real-world problems, foster creativity and innovation, guide students in building impactful projects, connect them with industry leaders and startups, and promote a strong research and entrepreneurship culture on campus.",
    extraInfo:
      "R&D Club has incubated 15+ startup ideas, secured funding for 5 student projects, and established partnerships with 10+ industry leaders. The club organizes innovation challenges and prototype development workshops.",
    coordinators: [
      {
        name: "Rumitha S",
        role: "Coordinator",
        image: Rumitha,
        isMain: true,
         bio: " As Coordinator of R & D, Rumitha S is a Runner up in Nexus for the project Library Management System. She has published a research paper and earned a Google certified Data Analytics certificate.",
        linkedin: "https://www.linkedin.com/in/rumitha-s",
      },
      {
        name: "Dhruv Swamy R",
        role: "Joint Coordinator",
        image: Dhruv,
        isMain: false,
         bio: "As Coordinator of R & D, Dhruv Swamy R is passionate about AI in marketing and entrepreneurship and is the Founder & Ceo of RUVODRUVTO.",
        linkedin: "https://www.linkedin.com/in/dhuruvr",
      },
      {
        name: "Immanuel Sibu Chandy",
        role: "Junior Coordinator",
        image: Immanuel,
        isMain: false,
         bio: "As Junior Coordinator of R & D, Immanuel Shibu Chandy participated in the SIH and other hackathons, and even for an ISRO hackathon.",
        linkedin: "https://linkedin.com/in/immanuel-shibu-chandy-8a902732",
      },
    ],
    projects: [
      {
        name: "InnovateLab Platform",
        description: "A comprehensive platform for managing research projects, connecting with mentors, and tracking innovation progress.",
        github: "https://github.com/rndclub/innovatelab"
      },
      {
        name: "StartupHub Network",
        description: "Networking platform connecting student entrepreneurs with investors, mentors, and industry experts.",
        github: "https://github.com/rndclub/startuphub"
      },
      {
        name: "Research Repository",
        description: "Digital library for storing, sharing, and collaborating on research papers and project documentation.",
        github: "https://github.com/rndclub/research-repo"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 5,
    name: "Career Guidance Club",
    icon: Globe,
    description:
      "The Career Guidance Club is established to provide students with direction and support in shaping their academic and professional journey. The club acts as a bridge between classroom learning and future career opportunities by offering mentorship, resources, and skill-development initiatives.",
    objectives:
      "To guide students in exploring career opportunities aligned with their skills and aspirations. To organize workshops, seminars, and expert talks on higher studies, placements, and entrepreneurship. To enhance professional skills such as resume writing, communication, and interview techniques. To build awareness about industry trends, competitive exams, and emerging career fields. To foster a supportive environment that encourages growth, confidence, and informed choices.",
    extraInfo:
      "Career Guidance Club has successfully placed 200+ students in top companies, conducted 50+ career workshops, and established partnerships with leading recruitment agencies and educational institutions.",
    coordinators: [
      {
        name: "Renimol S",
        role: "Senior Coordinator",
        image: Renimol,
        isMain: true,
         bio: "As Coordinator of Career Guidance, Renimol S was awarded as the best female solo dancer and trained under infosys pragati cohort 2024. She was recognized by the department for completing numerous certifications and online courses.",
        linkedin: "http://www.linkedin.com/in/renimol-suresh-a04095267",
      },
      {
        name: "Jola Kaseena C",
        role: "Junior Coordinator",
        image: Jola,
        isMain: false,
         bio: "As Junior Coordinator of Career Guidance, Jola Keseena C is passionate about Machine learning, Java, and Data science. She won several dance competitions and has created projects such as an IoT and AI-based field guardian prototype and a food delivery management system. She is also a Data Science intern at Unified mentor.",
        linkedin: "https://www.linkedin.com/in/jola-keseena-b0895a2a9",
      },
    ],
    projects: [
      {
        name: "CareerPath Tracker",
        description: "AI-powered platform that analyzes student skills and suggests personalized career paths and learning resources.",
        github: "https://github.com/careerguide/careerpath"
      },
      {
        name: "InterviewPrep Pro",
        description: "Comprehensive interview preparation platform with mock interviews, feedback, and industry-specific questions.",
        github: "https://github.com/careerguide/interviewprep"
      },
      {
        name: "Skill Assessment Tool",
        description: "Interactive platform for students to assess their technical and soft skills with personalized improvement plans.",
        github: "https://github.com/careerguide/skill-assessment"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop"
    ]
  },
];

export const Clubs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedClub, setSelectedClub] = useState<typeof clubs[0] | null>(null);
  const [clubPage, setClubPage] = useState<typeof clubs[0] | null>(null);
  const [selectedCoordinator, setSelectedCoordinator] = useState<
    null | typeof clubs[0]["coordinators"][0]
  >(null);

  // disable background scroll only when modals are open, not for club page
  useEffect(() => {
    if (selectedClub || selectedCoordinator) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedClub, selectedCoordinator]);

  const renderCoordinatorsByRole = (coordinators: any[], roles: string[]) => {
    const filtered = coordinators.filter(coord => roles.includes(coord.role));
    if (filtered.length === 0) return null;

    return (
      <div className="flex flex-wrap justify-center gap-6">
        {filtered.map((coordinator, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-6 text-center tilted-card cursor-pointer w-full max-w-xs ${
              coordinator.isMain ? "ring-2 ring-atom-primary" : ""
            }`}
            onClick={() => setSelectedCoordinator(coordinator)}
          >
            <img
              src={coordinator.image}
              alt={coordinator.name}
              className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-atom-metallic mb-4"
            />
            <h5 className="font-semibold text-foreground mb-2">
              {coordinator.name}
            </h5>
            <p
              className={`text-sm ${
                coordinator.isMain
                  ? "text-atom-primary font-semibold"
                  : "text-foreground-secondary"
              }`}
            >
              {coordinator.role}
            </p>
          </motion.div>
        ))}
      </div>
    );
  };

  if (clubPage) {
    const Icon = clubPage.icon;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-background z-50 overflow-y-auto"
      >
        {/* Back Button */}
        <div className="sticky top-4 left-4 z-10 ml-4 mt-4">
          <button
            onClick={() => setClubPage(null)}
            className="flex items-center gap-2 px-4 py-2 bg-glass-card backdrop-blur-sm rounded-full hover:bg-card-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="pt-8 px-4 max-w-6xl mx-auto pb-20">
          {/* Club Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
              {clubPage.name === "Dot Dev Club" ? (
                <img src={DotIcon} alt="Dot Dev Logo" className="w-14 h-14 object-contain mx-auto" style={{ display: 'block' }} />
              ) : clubPage.name === "Un Bias Club" ? (
                <img src={BiasIcon} alt="Un Bias Logo" className="w-14 h-14 object-contain mx-auto" style={{ display: 'block' }} />
              ) : clubPage.name === "Hack Hive Club" ? (
                <img src={HackIcon} alt="Hack Hive Logo" className="w-14 h-14 object-contain mx-auto" style={{ display: 'block' }} />
              ) : typeof clubPage.icon === "string" ? (
                <img src={clubPage.icon} alt={`${clubPage.name} icon`} className="w-12 h-12 object-contain mx-auto" style={{ display: 'block' }} />
              ) : (
                (() => {
                  const Icon = clubPage.icon;
                  return <Icon className="w-12 h-12 text-primary-foreground mx-auto" style={{ display: 'block' }} />;
                })()
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {clubPage.name}
            </h1>
            <p className="text-lg text-foreground-secondary mb-6 max-w-3xl mx-auto">
              {clubPage.description}
            </p>
          </motion.div>

          {/* Objectives */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4 metallic-text">Objectives</h2>
            <div className="glass-card p-6">
              <p className="text-foreground-secondary leading-relaxed">{clubPage.objectives}</p>
            </div>
          </motion.section>

          {/* Extra Info */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4 metallic-text">About the Club</h2>
            <div className="glass-card p-6">
              <p className="text-foreground-secondary leading-relaxed">{clubPage.extraInfo}</p>
            </div>
          </motion.section>

          {/* Coordinators */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 metallic-text">Coordinators</h2>
            {renderCoordinatorsByRole(clubPage.coordinators, ["Coordinator", "Senior Coordinator", "Joint Coordinator", "Junior Coordinator"])}
          </motion.section>

          {/* Educators */}
          {clubPage.coordinators.some(coord => coord.role === "Educator") && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 metallic-text">Educators</h2>
              {renderCoordinatorsByRole(clubPage.coordinators, ["Educator"])}
            </motion.section>
          )}

          {/* Projects */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 metallic-text">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubPage.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-card p-6"
                >
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{project.name}</h3>
                  <p className="text-foreground-secondary mb-4 leading-relaxed">{project.description}</p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-atom-primary hover:text-atom-primary/80 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Repository
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Gallery */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold mb-6 metallic-text">Gallery</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {clubPage.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-card overflow-hidden hover-scale w-full max-w-xs"
                >
                  <img
                    src={image}
                    alt={`${clubPage.name} gallery ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Coordinator Modal in Club Page */}
        {selectedCoordinator && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-60 flex items-center justify-center p-4"
            onClick={() => setSelectedCoordinator(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card max-w-md w-full p-6 relative text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCoordinator(null)}
                className="absolute top-4 right-4 p-2 hover:bg-card-hover rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-6">
                <img
                  src={selectedCoordinator.image}
                  alt={selectedCoordinator.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-atom-metallic mb-4"
                />
                <h5 className="font-bold text-foreground text-2xl mb-2">
                  {selectedCoordinator.name}
                </h5>
                <p className="text-foreground-secondary text-lg mb-4">
                  {selectedCoordinator.role}
                </p>
                {selectedCoordinator.isMain && (
                  <div className="mb-4 text-xs text-atom-primary font-medium">
                    ★ Lead Coordinator
                  </div>
                )}
              </div>

              {selectedCoordinator.bio && (
                <div className="mb-6">
                  <p className="text-foreground-secondary text-sm leading-relaxed">
                    {selectedCoordinator.bio}
                  </p>
                </div>
              )}

              {selectedCoordinator.linkedin && (
                <div className="flex justify-center items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <a
                    href={selectedCoordinator.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm break-all transition-colors duration-200"
                  >
                    {selectedCoordinator.linkedin}
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <>
      {/* Clubs Section */}
      <section ref={ref} className="py-20 px-4 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Our Clubs
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {clubs.map((club, index) => {
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
                  stiffness: 100,
                }}
                className="glass-card p-8 hover-scale cursor-pointer group h-full flex flex-col justify-between max-w-sm"
                onClick={() => setSelectedClub(club)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div>
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:shadow-electric transition-all duration-300 transform group-hover:rotate-12">
                      {club.name === "Dot Dev Club" ? (
                        <img src={DotIcon} alt="Dot Dev Logo" className="w-14 h-14 object-contain mx-auto" style={{ display: 'block' }} />
                      ) : club.name === "Un Bias Club" ? (
                        <img src={BiasIcon} alt="Un Bias Logo" className="w-14 h-14 object-contain mx-auto" style={{ display: 'block' }} />
                      ) : club.name === "Hack Hive Club" ? (
                        <img src={HackIcon} alt="Hack Hive Logo" className="w-14 h-14 object-contain mx-auto" style={{ display: 'block' }} />
                      ) : typeof club.icon === "string" ? (
                        <img src={club.icon} alt={`${club.name} icon`} className="w-12 h-12 object-contain mx-auto" style={{ display: 'block' }} />
                      ) : (
                        (() => {
                          const Icon = club.icon;
                          return <Icon className="w-12 h-12 text-primary-foreground mx-auto" style={{ display: 'block' }} />;
                        })()
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4 text-foreground">
                    {club.name}
                  </h3>
                  <p className="text-foreground-secondary text-center leading-relaxed mb-4 line-clamp-3">
                    {club.description}
                  </p>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
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

      {/* Club Modal */}
      {selectedClub && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedClub(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                {selectedClub.name === "Dot Dev Club" ? (
                  <img src={DotIcon} alt="Dot Dev Logo" className="w-14 h-14 object-contain mx-auto" style={{ display: 'block' }} />
                ) : selectedClub.name === "Un Bias Club" ? (
                  <img src={BiasIcon} alt="Un Bias Logo" className="w-14 h-14 object-contain mx-auto" style={{ display: 'block' }} />
                ) : selectedClub.name === "Hack Hive Club" ? (
                  <img src={HackIcon} alt="Hack Hive Logo" className="w-14 h-14 object-contain mx-auto" style={{ display: 'block' }} />
                ) : typeof selectedClub.icon === "string" ? (
                  <img src={selectedClub.icon} alt={`${selectedClub.name} icon`} className="w-12 h-12 object-contain mx-auto" style={{ display: 'block' }} />
                ) : (
                  (() => {
                    const Icon = selectedClub.icon;
                    return <Icon className="w-12 h-12 text-primary-foreground mx-auto" style={{ display: 'block' }} />;
                  })()
                )}
              </div>
              <h3 className="text-3xl font-bold mb-4 gradient-text">
                {selectedClub.name}
              </h3>
              <p className="text-lg text-foreground-secondary">
                {selectedClub.description}
              </p>
            </div>

            <div className="mb-8 flex justify-center">
              <button
                onClick={() => {
                  setClubPage(selectedClub);
                  setSelectedClub(null);
                }}
                className="px-6 py-2 rounded-full bg-atom-primary text-white font-semibold hover:bg-atom-primary/80 transition-colors"
              >
                More Details
              </button>
            </div>

            {/* Coordinators Only */}
            <div>
              <h4 className="text-xl font-semibold mb-6 metallic-text">
                Coordinators
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {selectedClub.coordinators
                  .filter(coord => coord.role !== "Educator")
                  .map((coordinator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-6 text-center tilted-card cursor-pointer w-full max-w-xs ${
                      coordinator.isMain ? "ring-2 ring-atom-primary" : ""
                    }`}
                    onClick={() => setSelectedCoordinator(coordinator)}
                  >
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-atom-metallic mb-4"
                    />
                    <h5 className="font-semibold text-foreground mb-2">
                      {coordinator.name}
                    </h5>
                    <p
                      className={`text-sm ${
                        coordinator.isMain
                          ? "text-atom-primary font-semibold"
                          : "text-foreground-secondary"
                      }`}
                    >
                      {coordinator.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Coordinator Modal */}
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
            className="glass-card max-w-md w-full p-6 relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCoordinator(null)}
              className="absolute top-4 right-4 p-2 hover:bg-card-hover rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <img
                src={selectedCoordinator.image}
                alt={selectedCoordinator.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-atom-metallic mb-4"
              />
              <h5 className="font-bold text-foreground text-2xl mb-2">
                {selectedCoordinator.name}
              </h5>
              <p className="text-foreground-secondary text-lg mb-4">
                {selectedCoordinator.role}
              </p>
              {selectedCoordinator.isMain && (
                <div className="mb-4 text-xs text-atom-primary font-medium">
                  ★ Lead Coordinator
                </div>
              )}
            </div>

            {selectedCoordinator.bio && (
              <div className="mb-6">
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  {selectedCoordinator.bio}
                </p>
              </div>
            )}

            {selectedCoordinator.linkedin && (
              <div className="flex justify-center items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <a
                  href={selectedCoordinator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm break-all transition-colors duration-200"
                >
                  {selectedCoordinator.linkedin}
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};