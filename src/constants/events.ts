// Event data types and constants for ATOM Events

export interface Event {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image: string;
  status: 'upcoming' | 'past';
  category: string;
  participants?: number;
  rating?: number;
  registrationLink?: string;
  eventType: 'free' | 'paid';
  gallery?: string[];
}

export const events: Event[] = [
  // -----------------------------
  // Upcoming Events
  // -----------------------------
  {
  id: 1,
  title: "Battle of Binaries 1.0",
  date: "2025-10-17",
  time: "09:00 AM",
  location: "Karunya Institute of Technology and Sciences, Coimbatore",
  description:
    "",
  image: "/EVENTS/Battle of Binaries 1.0.jpg",
  status: "upcoming",
  category: "Competition",
  registrationLink: "https://forms.google.com/battle-of-binaries",
  eventType: "paid",
},


  // -----------------------------
  // Past Events (Newest → Oldest)
  // -----------------------------
  {
    id: 4,
    title: "Software Automation Testing in Java",
    date: "2025-09-30",
    location: "DSCS Gallery Hall",
    description:
      "Seminar on software automation testing methodologies using Java, conducted by Ms. Chris Zionna.",
    image: "/EVENTS/Software Automation Testing in Java.jpg",
    status: "past",
    category: "Seminar",
    eventType: "free",
  },
  {
    id: 5,
    title: "DSCS Retreat 2025",
    date: "2025-09-20",
    time: "09:30 AM",
    location: "Emmanuel Auditorium",
    description:
      "A leadership retreat featuring Dr. Vizia Daniel Devarapalli Founder & Senior Pastor of God's Power Ministries .",
    image: "/EVENTS/DSCS Retreat 2025.jpg",
    status: "past",
    category: "Retreat",
    eventType: "free",
  },
  {
    id: 6,
    title: "INNOVATE-X Hackathon",
    date: "2025-09-01,2025-09-02",
    location: "AIML Gallery Hall",
    description:
      "Two-day hackathon fostering innovation and creativity, hosted by Dr. Radhakrishnan Subramaniam.",
    image: "/EVENTS/INNOVATE-X HACKATHON.jpg",
    status: "past",
    category: "Hackathon",
    eventType: "free",
  },
  {
    id: 7,
    title: "The Entrepreneurial Ecosystem in Tamil Nadu",
    date: "2025-08-28",
    location: "DSCS Gallery Hall",
    description:
      "A deep dive into Tamil Nadu's startup and innovation ecosystem, presented by Mr. Premkumar Samuel.",
    image: "/EVENTS/The Entrepreneurial Ecosystem in Tamil Nadu.jpg",
    status: "past",
    category: "Seminar",
    eventType: "free",
  },
  {
    id: 8,
    title: "Inauguration Function",
    date: "2025-08-25",
    time: "02:30 PM",
    location: "Emmanuel Auditorium",
    description:
      "Official inauguration ceremony of ATOM Events 2025. Chief Guest: Mr. Pragadeesan, Associate Director at E&Y. A grand opening with inspiring speeches and ribbon-cutting ceremony.",
    image: "/EVENTS/ATOM INAUGURATION.jpg",
    status: "past",
    category: "Ceremony",
    eventType: "free",
  },
  // {
  //   id: 9,
  //   title: "Digital Disruption and Employability Seminar",
  //   date: "2025-08-14",
  //   location: "DSCS Gallery Hall",
  //   description:
  //     "Seminar exploring how digital disruption impacts employability, led by Dr. Radhakrishnan Subramaniam.",
  //   image: "/EVENTS/Digital Disruption and Employability Seminar.jpg",
  //   status: "past",
  //   category: "Seminar",
  //   eventType: "free",
  // },
  {
    id: 10,
    title: "Full Stack Development Bootcamp",
    date: "2025-08-04,2025-08-08",
    location: "DSCS Gallery Hall",
    description:
      "A comprehensive 5-day bootcamp organized by DotDev Club, held from August 4th to August 8th, 2025. This intensive program covered everything from frontend to backend development.\n\nWhat We Covered:\n\nFrontend Development:\n- Introduction to Full Stack Development\n- React with TypeScript for modern UI development\n- Version Control with Git and GitHub\n- Responsive design principles and best practices\n\nBackend Development:\n- Understanding Backend architecture - APIs, core logic, and databases\n- Working with virtual environments and their importance\n- Database deployment on Render cloud platform\n- Deploying Adminer (DB management tool) using Docker\n- Introduction to Docker and containerization\n- Hands-on API hosting and testing\n\nThis bootcamp provided students with practical, industry-relevant skills to build scalable, modern web applications from scratch. Participants gained hands-on experience with the complete development workflow, from frontend design to backend deployment.",
    image: "/EVENTS/FULL STACK  Development BOOTCAMP.jpg",
    status: "past",
    category: "Bootcamp",
    eventType: "free",
    gallery: [
      "https://media.licdn.com/dms/image/v2/D5622AQGohdYBIUmqLw/feedshare-shrink_1280/B56ZlJMWfGIAAs-/0/1757869600899?e=1762992000&v=beta&t=GnzFq_vkE6syo_Zux9swdswaKMypurkRqAjzBpIZ2l0",
      "https://media.licdn.com/dms/image/v2/D5622AQF1Jknx_nSSPw/feedshare-shrink_2048_1536/B56ZlJMWeHKAAw-/0/1757869600371?e=1762992000&v=beta&t=bkWP5fRBgbAIUGlgJZl2zXFnlvRt3Y-GKvXa7qplugg",
      "https://media.licdn.com/dms/image/v2/D5622AQFE7QuukdhUJw/feedshare-shrink_1280/B56ZlJMWdrJoAs-/0/1757869600069?e=1762992000&v=beta&t=fZ_kkSjhEwwgGBCHULTBgKhI2JU2k_jZyraN2F75drQ",
      "https://media.licdn.com/dms/image/v2/D5622AQEVedO0mlUQZQ/feedshare-shrink_2048_1536/B56ZlJeJJSJoAw-/0/1757874276268?e=1762992000&v=beta&t=bCldE38oT7xZDOTVPCERuJVZ528u-jcjrk5gRyDgarA",
      "https://media.licdn.com/dms/image/v2/D5622AQFAm7VDtvyAjA/feedshare-shrink_1280/B56ZlJeJKrHUAs-/0/1757874284296?e=1762992000&v=beta&t=zdT0-DHX_Mw-VqKI4_itlWPcCHZL1gvUiM7tDTRr-sw",
      "https://media.licdn.com/dms/image/v2/D4D22AQF4Q1TwPFIycA/feedshare-shrink_1280/B4DZlJUy1nH0As-/0/1757871824199?e=1762992000&v=beta&t=gTyhmHp4HEs4BkmZExH7lM7_U6-BKjRTFnPLxs9bW_0",
      "https://media.licdn.com/dms/image/v2/D4D22AQGHnnbAZS8mdA/feedshare-shrink_2048_1536/B4DZlJUy1uJMAw-/0/1757871832406?e=1762992000&v=beta&t=RhldbGEBHHWf3XS1-D87mwBe6rTM55H_b_zqANyENbE",
      "https://media.licdn.com/dms/image/v2/D5622AQH69yUM4siZXw/feedshare-shrink_2048_1536/B56ZlJMWeaHQAw-/0/1757869601352?e=1762992000&v=beta&t=xlGNAxeWF-b52c6D-yX__Bj21U_mJYbcrf7yIeliYNQ"
    ]
  },
  {
    id: 11,
    title: "Cyber Security Bootcamp",
    date: "2025-07-28",
    location: "DSCS Gallery Hall",
    description:
      "Master the art of cybersecurity with hands-on experience in defensive and offensive security techniques.",
    image: "/EVENTS/CYBERSECURITY Bootcamp.jpg",
    status: "past",
    category: "Bootcamp",
    eventType: "free",
  },
  {
    id: 12,
    title: "AI Bootcamp",
    date: "2025-07-21",
    location: "DSCS Gallery Hall",
    description:
      "Dive deep into the world of artificial intelligence and machine learning with cutting-edge techniques and real-world applications.",
    image: "/EVENTS/AI_ML Bootcamp.jpg",
    status: "past",
    category: "Bootcamp",
    eventType: "free",
  },
];

// -------------------------
// ⚙️ Utility Functions
// -------------------------
export const getUpcomingEvents = () =>
  events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const getPastEvents = () =>
  events
    .filter((event) => event.status === "past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getEventCategories = () =>
  Array.from(new Set(events.map((event) => event.category)));

export const getEventYears = () =>
  Array.from(
    new Set(events.map((event) => new Date(event.date).getFullYear().toString()))
  );

export const getEventById = (id: number) =>
  events.find((event) => event.id === id);

export const filterEvents = (
  eventList: Event[],
  searchQuery: string,
  selectedCategory: string,
  selectedYear: string
) => {
  return eventList.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;

    const matchesYear =
      selectedYear === "all" ||
      new Date(event.date).getFullYear().toString() === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });
};
