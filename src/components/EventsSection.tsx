import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThreeDIconPresets } from './ThreeDIcons';
import { useIsMobile } from '@/hooks/use-mobile';
import { getEvents, getUpcomingEvents } from '@/utils/dataService';

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Get the first 3 upcoming events for preview, or first 3 events if no upcoming ones
  const upcomingEvents = getUpcomingEvents().slice(0, 3);
  const previewEvents = upcomingEvents.length > 0 ? upcomingEvents : getEvents().slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleShowMore = () => {
    console.log('EventsSection: handleShowMore called - navigating to /events');
    navigate('/events');
  };

  const handleEventClick = (eventId: number) => {
    console.log('EventsSection: handleEventClick called for event', eventId, '- navigating to /events?event=' + eventId);
    navigate(`/events?event=${eventId}`);
  };

  return (
    <section 
      ref={ref} 
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto events-section-container"
      style={{ pointerEvents: 'auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 lg:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
          {upcomingEvents.length > 0 ? 'Upcoming Events' : 'Our Events'}
        </h2>
        <p className="text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto">
          {upcomingEvents.length > 0 
            ? 'Join us for exciting events, workshops, and competitions that shape the future of technology'
            : 'Discover our past and upcoming events, workshops, and competitions that shape the future of technology'
          }
        </p>
      </motion.div>

      {previewEvents.length > 0 ? (
        <>
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {previewEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                className="glass-card p-4 sm:p-6 group hover-scale cursor-pointer transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Event card clicked:', event.id, event.title);
                  handleEventClick(event.id);
                }}
              >
                {/* Event Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Status Badge */}
                  <Badge className={`absolute top-3 right-3 border-none ${
                    event.status === 'upcoming' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                  }`}>
                    <Calendar className="w-3 h-3 mr-1" />
                    {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                  </Badge>
                </div>

                {/* Event Content */}
                <div className="space-y-3">
                  {/* Event Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground line-clamp-2 group-hover:text-atom-primary transition-colors">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-2 text-sm text-foreground-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-atom-primary flex-shrink-0" />
                      <span>{formatDate(event.date)}</span>
                      {event.time && (
                        <>
                          <Clock className="w-4 h-4 text-atom-accent ml-2 flex-shrink-0" />
                          <span>{event.time}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Event Category */}
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-atom-primary/10 text-atom-primary border-atom-primary/30"
                    >
                      {event.category}
                    </Badge>
                    
                    <div className="flex items-center gap-1 text-xs text-foreground-secondary">
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      <span>Learn More</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Show All Events button clicked');
                handleShowMore();
              }}
              className="bg-gradient-to-r from-atom-primary to-atom-accent hover:from-atom-primary/90 hover:to-atom-accent/90 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              type="button"
            >
              <div className="flex items-center gap-3">
                <ThreeDIconPresets.Rocket size={isMobile ? 18 : 20} />
                Show All Events
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Button>
          </motion.div>
        </>
      ) : (
        /* No Events State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center py-12"
        >
          <div className="mb-6">
            <ThreeDIconPresets.Target size={isMobile ? 48 : 64} />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No Upcoming Events</h3>
          <p className="text-foreground-secondary mb-6">
            Stay tuned for exciting events coming soon!
          </p>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Explore Past Events button clicked');
              handleShowMore();
            }}
            variant="outline"
            className="border-atom-primary text-atom-primary hover:bg-atom-primary hover:text-white"
            type="button"
          >
            Explore Past Events
          </Button>
        </motion.div>
      )}
    </section>
  );
};

export default EventsSection;
