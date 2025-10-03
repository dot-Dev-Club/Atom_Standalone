import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Star, ExternalLink, Tag } from 'lucide-react';

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
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
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
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className={`group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 ${
        isUpcoming 
          ? 'hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-purple-500/5' 
          : 'opacity-75 hover:opacity-90'
      }`}>
        {/* Glow Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isUpcoming ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10' : ''
        }`} />

        {/* Event Image */}
        <div className="relative overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
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
            {isUpcoming ? '🚀 Upcoming' : '✅ Completed'}
          </Badge>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Event Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
            {event.title}
          </h3>

          {/* Event Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-blue-400" />
              <span>{formatDate(event.date)}</span>
              {event.time && (
                <>
                  <Clock className="w-4 h-4 ml-4 mr-2 text-purple-400" />
                  <span>{event.time}</span>
                </>
              )}
            </div>
            
            <div className="flex items-center text-gray-300">
              <MapPin className="w-4 h-4 mr-2 text-green-400" />
              <span>{event.location}</span>
            </div>

            {/* Past Event Stats */}
            {!isUpcoming && (
              <div className="flex items-center gap-4 text-gray-300">
                {event.participants && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-400" />
                    <span>{event.participants} participants</span>
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

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {event.description}
          </p>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="text-xs bg-white/5 text-gray-300 border-white/20 hover:border-purple-400 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
              {event.tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-white/5 text-gray-300 border-white/20"
                >
                  +{event.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Action Button */}
          {isUpcoming ? (
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 group"
              onClick={() => {
                if (event.registrationLink) {
                  window.open(event.registrationLink, '_blank');
                }
              }}
            >
              <span className="flex items-center justify-center">
                Register Now
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          ) : (
            <div className="text-center py-2">
              <span className="text-gray-400 italic flex items-center justify-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Event completed successfully
              </span>
            </div>
          )}
        </CardContent>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/50 group-hover:via-purple-500/50 group-hover:to-blue-500/50 transition-all duration-500 pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default EventCard;