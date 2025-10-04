import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Star, Tag } from 'lucide-react';

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

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcoming = event.status === 'upcoming';

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-[480px] w-[350px] cursor-pointer mx-auto"
      onClick={onClick}
    >
      <Card className={`group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 h-full w-full ${
        isUpcoming 
          ? 'hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-blue-500/10' 
          : 'opacity-85 hover:opacity-100'
      }`}>
        {/* Glow Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isUpcoming ? 'bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-blue-500/15' : ''
        }`} />

        {/* Event Image */}
        <div className="relative overflow-hidden h-48">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Category Badge */}
          <Badge 
            className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none font-semibold"
          >
            {event.category}
          </Badge>

          {/* Status Badge */}
          <Badge 
            variant="secondary"
            className={`absolute top-4 right-4 border-none font-semibold ${
              isUpcoming 
                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
            }`}
          >
            {isUpcoming ? ' Upcoming' : ' Completed'}
          </Badge>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <CardContent className="p-6 flex flex-col h-[calc(100%-192px)]">
          {/* Event Title - Fixed height area */}
          <div className="h-16 flex items-center justify-center mb-4">
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 text-center leading-tight">
              {event.title}
            </h3>
          </div>

          {/* Event Details - Fixed height area */}
          <div className="h-20 space-y-2 text-sm flex-shrink-0 mb-4">
            <div className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-blue-400 flex-shrink-0" />
              <span>{formatDate(event.date)}</span>
              {event.time && (
                <>
                  <Clock className="w-4 h-4 ml-4 mr-2 text-purple-400 flex-shrink-0" />
                  <span>{event.time}</span>
                </>
              )}
            </div>
            
            <div className="flex items-center text-gray-300">
              <MapPin className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>

            {/* Past Event Stats */}
            {!isUpcoming && (
              <div className="flex items-center gap-4 text-gray-300">
                {event.participants && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-400" />
                    <span>{event.participants}</span>
                  </div>
                )}
                {event.rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                    <span>{event.rating}/5</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description - Fixed height area for past events */}
          <div className="h-16 mb-4">
            {!isUpcoming && (
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 h-full overflow-hidden">
                {event.description}
              </p>
            )}
          </div>

          {/* Tags - Fixed height area */}
          <div className="h-8 mb-4">
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.tags.slice(0, 2).map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="text-xs bg-white/5 text-gray-300 border-white/20 hover:border-blue-400 transition-colors"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {event.tags.length > 2 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-white/5 text-gray-300 border-white/20"
                  >
                    +{event.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Flexible spacer */}
          <div className="flex-grow" />

          {/* Know More Button - Fixed height area */}
          <div className="h-12 flex justify-center items-center">
            <Button 
              className="w-[140px] h-[40px] bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-3xl border-none shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              aria-label={`Learn more about ${event.title}`}
            >
              Know More
            </Button>
          </div>
        </CardContent>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/50 group-hover:via-purple-500/50 group-hover:to-blue-500/50 transition-all duration-500 pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default EventCard;