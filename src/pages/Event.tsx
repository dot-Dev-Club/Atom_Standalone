import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EventCard from '@/components/events/EventCard';
import PastEventTimeline from '@/components/events/PastEventTimeline';
import { type Event } from '@/constants/events';
import { getUpcomingEvents, getPastEvents } from '@/utils/dataService';
import { generateSlug } from '@/utils/slug';
import '@/styles/events.css';
import '@/styles/event-enhancements.css';
import '@/styles/event-card-enhancements.css';

const Event: React.FC = () => {
  const navigate = useNavigate();
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  // Debug logging
  useEffect(() => {
    console.log('Upcoming Events:', upcomingEvents);
    console.log('Past Events:', pastEvents);
    upcomingEvents.forEach(event => {
      console.log(`Event: ${event.title}, Image: ${event.image}`);
    });
  }, []);

  const handleEventClick = (event: Event) => {
    const slug = generateSlug(event.title);
    navigate(`/events/${slug}`);
  };

  // Remove modal-related functions since we're not using modals anymore

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

        {/* Upcoming Events Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent mb-4">
              🚀 Upcoming Events
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Join us in our upcoming events and be part of the innovation journey
            </p>
          </div>

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

        {/* Past Events Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent mb-4">
              📜 Past Events
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore our successful events and achievements from the past
            </p>
          </div>

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
      </div>
    </div>
  );
};

export default Event;
