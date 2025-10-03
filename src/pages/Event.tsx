import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Clock, Search, Filter, Users, Star } from 'lucide-react';
import EventCard from '@/components/events/EventCard';
import PastEventTimeline from '@/components/events/PastEventTimeline';
import CountdownTimer from '@/components/events/CountdownTimer';
import Navigation from '@/components/Navigation';
import '@/styles/events.css';

// Event data structure
interface Event {
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

const events: Event[] = [
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

const Event: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'past');

  // Get next upcoming event for countdown
  const nextEvent = upcomingEvents
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  // Filter functions
  const filteredEvents = (eventList: Event[]) => {
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

  const categories = Array.from(new Set(events.map(event => event.category)));
  const years = Array.from(new Set(events.map(event => new Date(event.date).getFullYear().toString())));

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a12 0%, #0f1a3c 50%, #1a1a2e 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }}></div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {['upcoming', 'past'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'upcoming' | 'past')}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <Navigation />
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent mb-6">
            ATOM EVENTS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join us in shaping the future through technology, innovation, and collaboration. 
            Experience cutting-edge workshops, hackathons, and tech talks.
          </p>
        </motion.div>

        {/* Countdown Timer for Next Event */}
        {nextEvent && activeTab === 'upcoming' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <CountdownTimer event={nextEvent} />
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
            {['upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'upcoming' | 'past')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab === 'upcoming' ? '🚀 Upcoming Events' : '📜 Past Events'}
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-none">
                  {tab === 'upcoming' ? upcomingEvents.length : pastEvents.length}
                </Badge>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="all" className="bg-gray-800">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">{category}</option>
              ))}
            </select>

            {/* Year Filter (for past events) */}
            {activeTab === 'past' && (
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="all" className="bg-gray-800">All Years</option>
                {years.map(year => (
                  <option key={year} value={year} className="bg-gray-800">{year}</option>
                ))}
              </select>
            )}
          </div>
        </motion.div>

        {/* Events Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'upcoming' ? (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredEvents(upcomingEvents).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>

              {filteredEvents(upcomingEvents).length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">No events found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <PastEventTimeline events={filteredEvents(pastEvents)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Event;