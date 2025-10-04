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
  tags?: string[];
}

export const events: Event[] = [
  // -----------------------------
  // Upcoming Events
  // -----------------------------
  {
  id: 1,
  title: "Battle of Binaries 1.0",
  date: "2025-10-17",
  time: "09:30 AM",
  location: "Karunya University, Coimbatore",
  description:
    "An ultimate coding face-off — Battle of Binaries 1.0 — organized in association with CompTIA. Compete, code, and conquer to win certifications worth ₹75,000!",
  image: "/src/assets/events/battle-of-binaries.jpg",
  status: "upcoming",
  category: "Competition",
  registrationLink: "https://forms.google.com/battle-of-binaries",
  tags: ["Coding Contest", "CompTIA", "Programming", "Hackathon", "Binary Battle"],
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
    image: "/src/assets/events/automation-testing.jpg",
    status: "past",
    category: "Seminar",
    tags: ["Java", "Automation Testing", "Software Engineering"],
  },
  {
    id: 5,
    title: "DSCS Retreat 2025",
    date: "2025-09-10",
    time: "02:30 PM",
    location: "Emmanuel Auditorium",
    description:
      "A leadership retreat featuring Dr. Vizia Daniel Devarapalli Founder & Senior Pastor of God’s Power Ministries .",
    image: "/src/assets/events/dscs-retreat.jpg",
    status: "past",
    category: "Retreat",
    tags: ["Leadership", "Motivation", "Community"],
  },
  {
    id: 6,
    title: "INNOVATE-X Hackathon",
    date: "2025-09-01",
    location: "AIML Gallery Hall",
    description:
      "Two-day hackathon fostering innovation and creativity, hosted by Dr. Radhakrishnan Subramaniam.",
    image: "/src/assets/events/innovatex-hackathon.jpg",
    status: "past",
    category: "Hackathon",
    tags: ["Innovation", "Hackathon", "Technology"],
  },
  {
    id: 7,
    title: "The Entrepreneurial Ecosystem in Tamil Nadu",
    date: "2025-08-28",
    location: "DSCS Gallery Hall",
    description:
      "A deep dive into Tamil Nadu’s startup and innovation ecosystem, presented by Mr. Premkumar Samuel.",
    image: "/src/assets/events/entrepreneurial-ecosystem.jpg",
    status: "past",
    category: "Seminar",
    tags: ["Entrepreneurship", "Startups", "Tamil Nadu"],
  },
  {
    id: 8,
    title: "Inauguration Function",
    date: "2025-08-25",
    time: "02:30 PM",
    location: "Emmanuel Auditorium",
    description:
      "Official inauguration ceremony of ATOM Events 2025. Chief Guest: Mr. Pragadeesan, Associate Director at E&Y. A grand opening with inspiring speeches and ribbon-cutting ceremony.",
    image: "/src/assets/events/inauguration.jpg",
    status: "past",
    category: "Ceremony",
    tags: ["Inauguration", "Opening", "Chief Guest", "E&Y"],
  },
  {
    id: 9,
    title: "Digital Disruption and Employability Seminar",
    date: "2025-08-14",
    location: "DSCS Gallery Hall",
    description:
      "Seminar exploring how digital disruption impacts employability, led by Dr. Radhakrishnan Subramaniam.",
    image: "/src/assets/events/digital-disruption.jpg",
    status: "past",
    category: "Seminar",
    tags: ["Innovation", "Career", "Digital Transformation"],
  },
  {
    id: 10,
    title: "Full Stack Development Bootcamp",
    date: "2025-08-04",
    location: "DSCS Gallery Hall",
    description:
      "Build scalable, modern web applications from frontend to backend with industry best practices.",
    image: "/src/assets/events/fullstack-bootcamp.jpg",
    status: "past",
    category: "Bootcamp",
    tags: ["React", "Node.js", "Web Development"],
  },
  {
    id: 11,
    title: "Cyber Security Bootcamp",
    date: "2025-07-28",
    location: "DSCS Gallery Hall",
    description:
      "Master the art of cybersecurity with hands-on experience in defensive and offensive security techniques.",
    image: "/src/assets/events/cyber-security.jpg",
    status: "past",
    category: "Workshop",
    tags: ["Cybersecurity", "Network Defense", "Ethical Hacking"],
  },
  {
    id: 12,
    title: "AI/ML Bootcamp",
    date: "2025-07-21",
    location: "DSCS Gallery Hall",
    description:
      "Dive deep into the world of artificial intelligence and machine learning with cutting-edge techniques and real-world applications.",
    image: "/src/assets/events/aiml-bootcamp.jpg",
    status: "past",
    category: "Bootcamp",
    tags: ["AI", "Machine Learning", "Deep Learning"],
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
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;

    const matchesYear =
      selectedYear === "all" ||
      new Date(event.date).getFullYear().toString() === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });
};
