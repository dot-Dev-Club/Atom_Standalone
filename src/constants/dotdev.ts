// DotDev Club data and imports
import Danish from '@/assets/Danish.jpg';
import Jola from '@/assets/Jola.jpg';
import Darshan from '@/assets/Dharshan_KumarJ.jpg';
import Manisha from '@/assets/Manisha.jpg';
import Monish from "@/assets/Monish.jpeg";
import Varsha from '@/assets/Varsha.jpg';
import Dot1 from "@/assets/DOTDEV/Dot1.jpg"; 
import Dot2 from "@/assets/DOTDEV/Dot2.jpg"; 
import Dot3 from "@/assets/DOTDEV/Dot3.jpg"; 
import Dot4 from "@/assets/DOTDEV/Dot4.jpg"; 
import Dot5 from "@/assets/DOTDEV/Dot5.jpg"; 
import Dot6 from "@/assets/DOTDEV/Dot6.jpg"; 
import Dot7 from "@/assets/DOTDEV/Dot7.jpg"; 
import Dot8 from "@/assets/DOTDEV/Dot8.jpg"; 
import Dot9 from "@/assets/DOTDEV/Dot9.jpg";
import Dot10 from "@/assets/DOTDEV/Dot10.jpg";
import Dot11 from "@/assets/DOTDEV/Dot11.jpg";
import Dot12 from "@/assets/DOTDEV/Dot12.jpg";
import Dot13 from "@/assets/DOTDEV/Dot13.jpg";
import Dot14 from "@/assets/DOTDEV/Dot14.jpg";
import DotIcon from "@/assets/Dot.ico";

export { DotIcon };

export const dotdevClub = {
  id: 2,
  name: "DotDev Club",
  icon: DotIcon,
  description:
    "Dotdev is a student community for aspiring software engineers focused on full-stack development.",
  objectives:
    "Develop members' problem-solving, logical, and communication skills. Master full-stack development through hands-on workshops and collaborative projects. Build a strong, supportive community of student developers.",
  extraInfo:
    "DotDev Club organizes hackathons, code sprints, mentorship sessions, and collaborative projects for members. The club has built over 50+ web applications and mobile apps, with members securing internships at top tech companies.",
  coordinators: [
    {
      name: "Dharshan Kumar J",
      role: "Coordinator",
      image: Darshan,
      isMain: true,
      bio: "As Coordinator of DotDev, Dharshan Kumar J is a Finalist of the NEXUS hackathon and a Software Developer skilled in developing Web and Mobile Applications. He is also a co-founder of VelsyMedia and TurpleSpace and has led a Midkraft24 website team.",
      linkedin: "linkedin.com/in/j-dharshan-kumar",
    },
    {
      name: "Danish Prabhu K V",
      role: "Junior Coordinator",
      image: Danish,
      isMain: false,
      bio: " As Junior Coordinator of DotDev, Danish Prabhu K V is a Finalist of the NEXUS Hackathon and is passionate about AI, and software engineering. He works as a freelancer and is currently an intern at GMS (US Based company) earning a stipend of 10k/month.",
      linkedin: "linkedin.com/in/danish-prabhu-0a1691293",
    },
    {
      name: "Manisha S",
      role: "Educator",
      image: Manisha,
      isMain: false,
      bio: "",
      linkedin: "linkedin.com/in/manisha-c",
    },
    {
      name: "Jola Kaseena C",
      role: "Educator",
      image: Jola,
      isMain: false,
      bio: "",
      linkedin: "linkedin.com/in/jola-keseena-b0895a2a9",
    },
    {
      name: "Varsha S",
      role: "Educator",
      image: Varsha,
      isMain: false,
      bio: "",
      linkedin: "linkedin.com/in/varsha-nadarajan",
    },
    {
      name: "Monish",
      role: "Educator",
      image: Monish,
      isMain: false,
      bio: "",
      linkedin: "linkedin.com/in/varsha-nadarajan",
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
    Dot10,
    Dot11,
    Dot12,
    Dot13,
    Dot14,
  ]
};