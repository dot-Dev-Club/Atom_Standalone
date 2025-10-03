import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Calendar, Users, Tag, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (registrationType: 'internal' | 'external') => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose, onRegister }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(false);

  useEffect(() => {
    if (!event || event.status !== 'upcoming') return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(event.date);
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [event]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'from-blue-500 to-blue-600' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-cyan-500 to-cyan-600' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-blue-400 to-blue-500' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-cyan-400 to-cyan-500' },
  ];

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-900/95 via-blue-900/20 to-cyan-900/20 backdrop-blur-xl rounded-3xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              
              <div className="flex items-start gap-6">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-32 h-32 object-cover rounded-2xl border border-white/20"
                />
                <div className="flex-1">
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-none mb-3">
                    {event.category}
                  </Badge>
                  <h2 className="text-3xl font-bold text-white mb-2">{event.title}</h2>
                  <div className="flex flex-wrap gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-cyan-400" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Countdown Timer for Upcoming Events */}
              {event.status === 'upcoming' && !isExpired && (
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Event Countdown</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {timeUnits.map((unit, index) => (
                      <motion.div
                        key={unit.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className={`bg-gradient-to-br ${unit.color} rounded-xl p-4 mb-2 border border-white/20`}>
                          <span className="text-3xl font-bold text-white">{unit.value.toString().padStart(2, '0')}</span>
                        </div>
                        <span className="text-sm text-gray-400 font-medium">{unit.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">About This Event</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{event.description}</p>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 transition-colors"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Event Stats */}
              {event.status === 'past' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.participants && (
                    <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-500/20">
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-blue-400" />
                        <div>
                          <p className="text-blue-400 font-semibold">Participants</p>
                          <p className="text-2xl font-bold text-white">{event.participants}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {event.rating && (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-xl p-4 border border-cyan-500/20">
                      <div className="flex items-center gap-3">
                        <div className="flex text-cyan-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(event.rating!) ? "text-cyan-400" : "text-gray-600"}>
                              ★
                            </span>
                          ))}
                        </div>
                        <div>
                          <p className="text-cyan-400 font-semibold">Rating</p>
                          <p className="text-2xl font-bold text-white">{event.rating}/5</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Registration Section for Upcoming Events */}
              {event.status === 'upcoming' && !isExpired && (
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-white/10">
                  {!showRegistrationOptions ? (
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-white mb-4">Ready to Join?</h3>
                      <p className="text-gray-300 mb-6">Don't miss out on this amazing event!</p>
                      <Button
                        onClick={() => setShowRegistrationOptions(true)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                      >
                        Register Now
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-white mb-4">Choose Registration Type</h3>
                      <p className="text-gray-300 mb-6">Select the registration option that applies to you</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => onRegister('internal')}
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        >
                          Internal Registration
                          <span className="block text-sm opacity-80">For Karunya Students</span>
                        </Button>
                        <Button
                          onClick={() => onRegister('external')}
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        >
                          External Registration
                          <span className="block text-sm opacity-80">For External Participants</span>
                        </Button>
                      </div>
                      <Button
                        onClick={() => setShowRegistrationOptions(false)}
                        variant="ghost"
                        className="mt-4 text-gray-400 hover:text-white"
                      >
                        Back
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;