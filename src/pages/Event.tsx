import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Star } from 'lucide-react';
import EventCard from '@/components/events/EventCard';
import EventModal from '@/components/events/EventModal';
import PastEventTimeline from '@/components/events/PastEventTimeline';
import { type Event } from '@/constants/events';
import { getEvents, getUpcomingEvents, getPastEvents } from '@/utils/dataService';
import '@/styles/events.css';
import '@/styles/event-enhancements.css';
import '@/styles/event-card-enhancements.css';

const Event: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  // Handle URL query parameters for direct event access
  useEffect(() => {
    const eventId = searchParams.get('event');
    if (eventId) {
      const event = getEvents().find(e => e.id === parseInt(eventId));
      if (event) {
        setSelectedEvent(event);
        setIsModalOpen(true);
        // Remove the query parameter from URL after opening modal
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, setSearchParams]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRegistration = (registrationType: 'internal' | 'external') => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    
    // Navigate to respective registration form
    if (registrationType === 'internal') {
      window.location.href = '/registration/internal';
    } else {
      window.location.href = '/registration/external';
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(220, 25%, 6%) 0%, hsl(220, 20%, 8%) 25%, hsl(220, 15%, 12%) 50%, hsl(220, 20%, 8%) 75%, hsl(220, 25%, 6%) 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/5 via-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent mb-6">
            ATOM EVENTS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Join us in shaping the future through technology, innovation, and collaboration. 
            Experience cutting-edge workshops, hackathons, and tech talks.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Discover all our events in one place - from upcoming exciting events to our past achievements
          </p>
        </motion.div>

        {/* Simple Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div 
            className="flex bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20"
            role="tablist"
            aria-label="Event time periods"
          >
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent ${
                activeTab === 'upcoming'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
              role="tab"
              aria-selected={activeTab === 'upcoming'}
              aria-controls="events-content"
            >
              🚀 Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent ${
                activeTab === 'past'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
              role="tab"
              aria-selected={activeTab === 'past'}
              aria-controls="events-content"
            >
              📜 Past
            </button>
          </div>
        </motion.div>

        {/* Events Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'upcoming' ? (
            <motion.section
              key="upcoming"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {upcomingEvents.length > 0 ? (
                <div className="event-grid">
                  {upcomingEvents.map((event, index) => (
                    <motion.article
                      key={event.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      aria-label={`Event: ${event.title}`}
                    >
                      <EventCard event={event} onClick={() => handleEventClick(event)} />
                    </motion.article>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                  role="status"
                  aria-live="polite"
                >
                  <div className="text-6xl mb-6">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Upcoming Events</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Stay tuned! We're planning exciting events. Follow our social media for updates.
                  </p>
                </motion.div>
              )}
            </motion.section>
          ) : (
            <motion.section
              key="past"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {pastEvents.length > 0 ? (
                <PastEventTimeline events={pastEvents} onEventClick={handleEventClick} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                  role="status"
                  aria-live="polite"
                >
                  <div className="text-6xl mb-6">📜</div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Past Events</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Our event history will appear here after we host our first events.
                  </p>
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onRegister={handleRegistration}
      />
    </div>
  );
};

export default Event;
