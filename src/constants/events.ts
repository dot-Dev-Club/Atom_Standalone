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
  {
    id: 1,
    title: "ATOM Hackathon 2025",
    date: "2025-12-15",
    time: "09:00 AM",
    location: "Karunya University, Coimbatore",
    description: "48-hour intense hackathon bringing together developers, designers, and innovators to create groundbreaking solutions for real-world problems.",
    image: "/src/assets/HACKHIVE/Hack1.jpg",
    status: "upcoming",
    category: "Hackathon",
    registrationLink: "https://forms.google.com/hackathon2025",
    tags: ["AI", "Web Development", "Mobile Apps", "Innovation"]
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    date: "2025-11-20",
    time: "02:00 PM",
    location: "ATOM Lab, Main Campus",
    description: "Hands-on workshop covering latest AI technologies, neural networks, and practical implementation using Python and TensorFlow.",
    image: "/src/assets/atom-logo.png",
    status: "upcoming",
    category: "Workshop",
    registrationLink: "https://forms.google.com/ai-workshop",
    tags: ["AI", "Machine Learning", "Python", "TensorFlow"]
  },
  {
    id: 3,
    title: "Tech Talk: Future of Computing",
    date: "2025-10-25",
    time: "04:00 PM",
    location: "Online Webinar",
    description: "Industry experts discussing quantum computing, edge computing, and the future technological landscape.",
    image: "/src/assets/atom-team.jpg",
    status: "upcoming",
    category: "Tech Talk",
    registrationLink: "https://zoom.us/webinar/register",
    tags: ["Quantum Computing", "Edge Computing", "Future Tech"]
  },
  {
    id: 4,
    title: "ATOM Code Sprint 2025",
    date: "2025-07-15",
    time: "10:00 AM",
    location: "Computer Lab, Block A",
    description: "24-hour coding competition focused on algorithmic problem solving and competitive programming.",
    image: "/src/assets/HACKHIVE/Hack2.jpg",
    status: "past",
    category: "Competition",
    participants: 150,
    rating: 4.8,
    tags: ["Competitive Programming", "Algorithms", "Data Structures"]
  },
  {
    id: 5,
    title: "Web Development Bootcamp",
    date: "2025-06-10",
    time: "09:00 AM",
    location: "ATOM Lab, Main Campus",
    description: "Intensive 3-day bootcamp covering React, Node.js, and modern web development practices.",
    image: "/src/assets/atom-logo.png",
    status: "past",
    category: "Bootcamp",
    participants: 80,
    rating: 4.9,
    tags: ["React", "Node.js", "Web Development", "JavaScript"]
  },
  {
    id: 6,
    title: "Mobile App Development Workshop",
    date: "2025-05-20",
    time: "01:00 PM",
    location: "Innovation Hub",
    description: "Learn to build cross-platform mobile applications using React Native and Flutter.",
    image: "/src/assets/HACKHIVE/Hack3.jpg",
    status: "past",
    category: "Workshop",
    participants: 60,
    rating: 4.7,
    tags: ["React Native", "Flutter", "Mobile Development"]
  }
];

// Utility functions for event data
export const getUpcomingEvents = () => events.filter(event => event.status === 'upcoming');
export const getPastEvents = () => events.filter(event => event.status === 'past');
export const getEventCategories = () => Array.from(new Set(events.map(event => event.category)));
export const getEventYears = () => Array.from(new Set(events.map(event => new Date(event.date).getFullYear().toString())));
export const getEventById = (id: number) => events.find(event => event.id === id);

// Filter function for events
export const filterEvents = (
  eventList: Event[],
  searchQuery: string,
  selectedCategory: string,
  selectedYear: string
) => {
  return eventList.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    const matchesYear = selectedYear === 'all' || 
                       new Date(event.date).getFullYear().toString() === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });
};