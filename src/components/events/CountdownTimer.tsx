import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Timer } from 'lucide-react';

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

interface CountdownTimerProps {
  event: Event;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
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
  }, [event.date]);

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
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (isExpired) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-4xl mx-auto"
    >
      <Card className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 rounded-3xl">
        {/* Glassmorphic layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

        <CardContent className="relative p-8 md:p-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg border border-white/10">
              <Timer className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Event Countdown
            </h2>

            <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-2">
              {event.title}
            </h3>

            <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mb-6" />
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 text-white/70 mb-10"
          >
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-white/10">
              <Calendar className="w-4 h-4 mr-2 text-white/80" />
              <span className="text-sm font-medium">{formatDate(event.date)}</span>
            </div>
            {event.time && (
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-white/10">
                <Clock className="w-4 h-4 mr-2 text-white/80" />
                <span className="text-sm font-medium">{event.time}</span>
              </div>
            )}
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-white/10">
              <MapPin className="w-4 h-4 mr-2 text-white/80" />
              <span className="text-sm font-medium">{event.location}</span>
            </div>
          </motion.div>

          {/* Countdown Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10"
          >
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
              >
                <div className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={unit.value}
                        initial={{ y: 20, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -20, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums"
                      >
                        {unit.value.toString().padStart(2, '0')}
                      </motion.div>
                    </AnimatePresence>

                    <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      {unit.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden shadow-inner backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 1 }}
                className="h-full bg-white/30 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 rounded-full" />
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-white/50 mt-2 px-1">
              <span>Event starts in</span>
              <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20">
              <Timer className="w-4 h-4 mr-2" />
              Time is running out - Register now!
            </div>
          </motion.div>
        </CardContent>

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-sm" />
      </Card>
    </motion.div>
  );
};

export default CountdownTimer;