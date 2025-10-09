import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Star } from 'lucide-react';

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
  eventType: 'free' | 'paid';
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
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer h-auto min-h-[320px] w-full"
      onClick={onClick}
    >
      <Card className={`group relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 ${
        isUpcoming
          ? 'hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-blue-500/10'
          : 'opacity-85 hover:opacity-100'
      }`}>

        {/* Glow Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl ${
          isUpcoming ? 'bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-blue-500/15' : ''
        }`} />

        {/* Mobile Layout (Stacked) */}
        <div className="flex flex-col lg:flex-row h-full">
          {/* Event Image Section */}
          <div className="relative overflow-hidden h-48 sm:h-52 lg:h-full lg:w-2/5 rounded-t-3xl lg:rounded-l-3xl lg:rounded-t-none">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                console.error(`Failed to load image: ${event.image} for event: ${event.title}`);
                e.currentTarget.src = '/placeholder.svg';
              }}
              onLoad={() => {
                console.log(`Successfully loaded image: ${event.image} for event: ${event.title}`);
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* Badges - Responsive Positioning */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1">
                {event.category}
              </Badge>
              <Badge
                variant="secondary"
                className={`border-none font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1 ${
                  isUpcoming
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                }`}
              >
                {isUpcoming ? 'Upcoming' : 'Completed'}
              </Badge>
            </div>

            {/* Event Type Badge - Bottom */}
            <Badge
              className={`absolute bottom-3 left-3 border-none font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1 ${
                event.eventType === 'free'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}
            >
              {event.eventType === 'free' ? 'Free Event' : 'Paid Event'}
            </Badge>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
            {/* Header Section */}
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 mb-3 sm:mb-4 leading-tight">
                {event.title}
              </h3>

              {/* Event Details - Responsive Layout */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex flex-wrap items-start gap-2 sm:gap-0">
                  <div className="flex items-center text-gray-300 min-w-0 flex-1 sm:flex-none">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium truncate">{formatDate(event.date)}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-6 mr-2 text-purple-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-medium">{event.time}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-start text-gray-300">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium line-clamp-1">{event.location}</span>
                </div>

                {/* Past Event Stats - Mobile Optimized */}
                {!isUpcoming && (
                  <div className="flex flex-col sm:flex-row sm:gap-6 gap-2 text-gray-300">
                    {event.participants && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                        <span className="text-sm sm:text-base font-medium">{event.participants} participants</span>
                      </div>
                    )}
                    {event.rating && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 fill-current" />
                        <span className="text-sm sm:text-base font-medium">{event.rating}/5 rating</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description for Past Events - Mobile Responsive */}
              {!isUpcoming && (
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6 opacity-90">
                  {event.description}
                </p>
              )}
            </div>

            {/* Action Button - Responsive */}
            <div className="flex justify-start sm:justify-start">
              <Button
                className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full border-none shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent text-sm sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.();
                }}
                aria-label={`Learn more about ${event.title}`}
              >
                Know More
              </Button>
            </div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/50 group-hover:via-purple-500/50 group-hover:to-blue-500/50 transition-all duration-500 pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default EventCard;
