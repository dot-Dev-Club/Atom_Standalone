import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from '@/constants/events';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, getEvents } from '@/utils/dataService';
import { generateSlug } from '@/utils/slug';
import ClockCountdown from '@/components/ui/ClockCountdown';
import ReactMarkdown from 'react-markdown';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(false);

  useEffect(() => {
    // Find event by slug
    if (slug) {
      const events = getEvents();
      const foundEvent = events.find(e => generateSlug(e.title) === slug);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        // Event not found, redirect to events page
        navigate('/events');
      }
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (!event || event.status !== 'upcoming') return;

    // Helper: build a Date object from ISO date (YYYY-MM-DD) and various time formats
    const buildEventDate = (dateStr: string, timeStr?: string) => {
      // Try to parse YYYY-MM-DD first
      const isoMatch = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      let year: number, month: number, day: number;
      if (isoMatch) {
        year = parseInt(isoMatch[1], 10);
        month = parseInt(isoMatch[2], 10) - 1;
        day = parseInt(isoMatch[3], 10);
      } else {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return new Date(dateStr); // fallback
        return d;
      }

      let hours = 0;
      let minutes = 0;
      let seconds = 0;

      if (timeStr) {
        // Match formats like '09:30 AM', '9:30 PM', '09:30', '09:30:00'
        const t = timeStr.trim();
        const match = t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
        if (match) {
          let hh = parseInt(match[1], 10);
          minutes = parseInt(match[2], 10);
          seconds = match[3] ? parseInt(match[3], 10) : 0;
          const ampm = match[4];
          if (ampm) {
            if (ampm.toUpperCase() === 'PM' && hh !== 12) hh += 12;
            if (ampm.toUpperCase() === 'AM' && hh === 12) hh = 0;
          }
          hours = hh;
        } else {
          // Try plain numeric hour:minute without AM/PM
          const simple = t.match(/^(\d{1,2}):(\d{2})$/);
          if (simple) {
            hours = parseInt(simple[1], 10);
            minutes = parseInt(simple[2], 10);
          }
        }
      }

      return new Date(year, month, day, hours, minutes, seconds);
    };

    const calculateTimeLeft = () => {
      const eventDate = buildEventDate(event.date, event.time);
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (!isNaN(difference) && difference > 0) {
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

  const goBack = () => {
    navigate('/events');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Enhanced loading background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-blue-500/10 via-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-transparent border-t-blue-400 border-r-cyan-400 rounded-full mx-auto mb-6 relative"
          >
            <div className="absolute inset-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-sm"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white text-xl font-semibold"
          >
            Loading Event Details...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-400 text-sm mt-2"
          >
            Preparing an amazing experience
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl"
        />

        {/* Conic gradient centerpiece */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-conic from-blue-500/8 via-cyan-500/6 via-purple-500/8 via-pink-500/6 to-blue-500/8 rounded-full blur-3xl"
        />

        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-lg blur-xl"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-xl"
        />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03)_0%,transparent_50%)] opacity-50"></div>
      </div>

        {/* Enhanced Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-40 backdrop-blur-2xl bg-black/30 border-b border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 relative z-10">
          <button
            onClick={goBack}
            className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105 group relative flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
          >
            <span className="relative z-10">Back to Events</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-80 lg:h-96 overflow-hidden rounded-3xl mb-12 shadow-2xl group"
        >
          {/* Multi-layered background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/60 to-cyan-900/80 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20"></div>

          {/* Event image with enhanced effects */}
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Enhanced floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl z-30">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white/30 rounded-full shadow-lg"
                style={{
                  left: `${15 + i * 10}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-15, 15, -15],
                  x: [-5, 5, -5],
                  opacity: [0.4, 0.9, 0.4],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + i * 0.8,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Additional geometric particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`geo-${i}`}
                className="absolute w-2 h-2 bg-gradient-to-br from-cyan-400/60 to-blue-500/60 rounded-sm shadow-lg"
                style={{
                  left: `${70 + i * 8}%`,
                  top: `${60 + i * 15}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Enhanced Event Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-40">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-4"
                >
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-xl rounded-full text-sm text-white/90 mb-3 border border-white/20 shadow-xl">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-3 shadow-lg"
                    ></motion.span>
                    {event.status === 'upcoming' ? 'Coming Soon' : 'Event Completed'}
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4"
                >
                  {event.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      className={`text-sm font-semibold px-4 py-2 transition-all duration-300 hover:scale-105 ${
                        event.eventType === 'free'
                          ? 'bg-gradient-to-r from-green-500/25 to-emerald-500/25 text-green-200 border border-green-400/40 backdrop-blur-xl hover:from-green-500/35 hover:to-emerald-500/35 shadow-lg hover:shadow-green-500/25'
                          : 'bg-gradient-to-r from-orange-500/25 to-red-500/25 text-orange-200 border border-orange-400/40 backdrop-blur-xl hover:from-orange-500/35 hover:to-red-500/35 shadow-lg hover:shadow-orange-500/25'
                      }`}
                    >
                      {event.eventType === 'free' ? 'Free Event' : 'Paid Event'}
                    </Badge>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge className="bg-gradient-to-r from-blue-500/25 to-cyan-500/25 text-blue-200 border border-blue-400/40 backdrop-blur-xl px-4 py-2 hover:from-blue-500/35 hover:to-cyan-500/35 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                      {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </Badge>
                  </motion.div>
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Key Information Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -12,
                  rotateY: 5,
                  rotateX: 3
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 58, 138, 0.4) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)',
                  transition: 'box-shadow 0.4s ease-out'
                }}
              >
                {/* Enhanced background patterns */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-conic from-blue-500/5 via-transparent to-cyan-500/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }}></div>

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:20px_20px]"></div>
                </div>

                <div className="flex items-center gap-4 h-full relative z-10">
                  <div className="flex-1">
                    <p className="text-sm text-blue-300/80 font-medium mb-1">Event Date</p>
                    <p className="text-white font-semibold text-lg">{formatDate(event.date)}</p>
                  </div>
                </div>
              </motion.div>

              {event.time && (
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -12,
                    rotateY: -5,
                    rotateX: 3
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="glass-card p-8 rounded-2xl relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 58, 138, 0.4) 100%)',
                    backdropFilter: 'blur(25px)',
                    border: '1px solid rgba(147, 51, 234, 0.15)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(147, 51, 234, 0.1), 0 0 20px rgba(147, 51, 234, 0.1)',
                    transition: 'box-shadow 0.4s ease-out'
                  }}
                >
                  {/* Enhanced background patterns */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-conic from-purple-500/5 via-transparent to-pink-500/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }}></div>

                  {/* Subtle grid overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.05)_25%,rgba(147,51,234,0.05)_50%,transparent_50%,transparent_75%,rgba(147,51,234,0.05)_75%)] bg-[length:20px_20px]"></div>
                  </div>

                  <div className="flex items-center gap-4 h-full relative z-10">
                    <div className="flex-1">
                      <p className="text-sm text-purple-300/80 font-medium mb-1">Start Time</p>
                      <p className="text-white font-semibold text-lg">{event.time}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -12,
                  rotateY: 5,
                  rotateX: -3
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 58, 138, 0.4) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.1), 0 0 20px rgba(16, 185, 129, 0.1)',
                  transition: 'box-shadow 0.4s ease-out'
                }}
              >
                {/* Enhanced background patterns */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-conic from-green-500/5 via-transparent to-emerald-500/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }}></div>

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_25%,rgba(16,185,129,0.05)_50%,transparent_50%,transparent_75%,rgba(16,185,129,0.05)_75%)] bg-[length:20px_20px]"></div>
                </div>

                <div className="flex items-center gap-4 h-full relative z-10">
                  <div className="flex-1">
                    <p className="text-sm text-green-300/80 font-medium mb-1">Venue</p>
                    <p className="text-white font-semibold text-lg">{event.location}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced About This Event */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{
                scale: 1.02,
                y: -10,
                rotateY: 2,
                rotateX: 2
              }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 58, 138, 0.4) 100%)',
                backdropFilter: 'blur(25px)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)',
                transition: 'box-shadow 0.4s ease-out'
              }}
            >
              {/* Enhanced background patterns */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-conic from-blue-500/5 via-transparent to-cyan-500/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }}></div>

              {/* Subtle grid overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:20px_20px]"></div>
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center mb-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">About This Event</h2>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="prose prose-invert max-w-none"
                >
                  <div className="text-gray-300 leading-relaxed text-lg space-y-4">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-bold text-white mb-6 mt-8 first:mt-0">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-3xl font-bold text-white mb-4 mt-6">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-2xl font-bold text-white mb-3 mt-5">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="text-gray-300 mb-4 ml-6 space-y-2">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="text-gray-300 mb-4 ml-6 space-y-2">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="flex items-start">
                            <span className="text-gray-400 mr-3 mt-1.5 text-xs">•</span>
                            <span className="leading-relaxed">{children}</span>
                          </li>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-white font-semibold">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="text-gray-200 italic">
                            {children}
                          </em>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-sm font-mono">
                            {children}
                          </code>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-gray-600 pl-6 pr-4 py-4 my-6 italic text-gray-300">
                            {children}
                          </blockquote>
                        ),
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            className="text-blue-400 hover:text-blue-300 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {event.description}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Countdown Timer */}
            {event.status === 'upcoming' && !isExpired && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  rotateY: 3,
                  rotateX: -1
                }}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 58, 138, 0.4) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)',
                  transition: 'box-shadow 0.4s ease-out'
                }}
              >
                {/* Enhanced background patterns */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-conic from-blue-500/5 via-transparent to-cyan-500/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }}></div>

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:20px_20px]"></div>
                </div>

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Event Countdown
                    </h3>
                  </div>

                  {/* Use the refined ClockCountdown component */}
                  <ClockCountdown
                    targetDate={new Date(event.date + (event.time ? ' ' + event.time : ''))}
                    size="md"
                  />
                </div>
              </motion.div>
            )}

            {/* Registration Section */}
            {event.status === 'upcoming' && !isExpired && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  y: -10,
                  rotateY: -2,
                  rotateX: 2
                }}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(59, 130, 246, 0.3) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.15)',
                  transition: 'box-shadow 0.4s ease-out'
                }}
              >
                {/* Enhanced animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/15 to-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-conic from-blue-500/5 via-transparent to-cyan-500/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '15s' }}></div>

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:15px_15px]"></div>
                </div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 200 }}
                    className="text-center mb-8"
                  >
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-100 mb-3 drop-shadow-lg">
                      Join the Experience
                    </h3>
                  </motion.div>

                  {!showRegistrationOptions ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <Button
                        onClick={() => setShowRegistrationOptions(true)}
                        className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:via-cyan-500 hover:to-blue-500 text-white py-5 text-xl font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/40 hover:scale-105 relative overflow-hidden group border border-blue-400/30"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <span>Register Now</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      </Button>


                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Button
                          onClick={() => navigate('/registration/internal')}
                          className="w-full bg-gradient-to-r from-blue-600/90 to-blue-500/90 hover:from-blue-600 hover:to-blue-500 text-white py-6 font-bold rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 shadow-xl hover:shadow-blue-500/40 hover:scale-105 group border border-blue-400/30 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <div className="text-center relative z-10">
                            <span className="text-xl font-bold block">Internal Registration</span>
                          </div>
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Button
                          onClick={() => navigate('/registration/external')}
                          className="w-full bg-gradient-to-r from-cyan-600/90 to-blue-600/90 hover:from-cyan-500 hover:to-blue-500 text-white py-6 font-bold rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 shadow-xl hover:shadow-cyan-500/40 hover:scale-105 group border border-cyan-400/30 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <div className="text-center relative z-10">
                            <span className="text-xl font-bold block">External Registration</span>
                          </div>
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="text-center pt-2"
                      >
                        <Button
                          variant="ghost"
                          onClick={() => setShowRegistrationOptions(false)}
                          className="text-cyan-300/80 hover:text-cyan-200 hover:bg-cyan-400/10 transition-all duration-300 text-base font-medium px-6 py-3 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40"
                        >
                          ← Back to overview
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Past Event Status */}
            {(event.status !== 'upcoming' || isExpired) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  rotateY: -2,
                  rotateX: -1
                }}
                className="glass-card p-8 rounded-2xl text-center relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 58, 138, 0.4) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(75, 85, 99, 0.15)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(75, 85, 99, 0.1), 0 0 20px rgba(75, 85, 99, 0.1)',
                  transition: 'box-shadow 0.4s ease-out'
                }}
              >
                {/* Enhanced background patterns */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-500/10 to-gray-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-600/10 to-gray-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-conic from-gray-500/5 via-transparent to-gray-600/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }}></div>

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(75,85,99,0.05)_25%,rgba(75,85,99,0.05)_50%,transparent_50%,transparent_75%,rgba(75,85,99,0.05)_75%)] bg-[length:20px_20px]"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300 mb-4 drop-shadow-lg">
                    Event Completed
                  </h3>
                  <p className="text-gray-300/80 text-lg font-medium">
                    This event has ended. Thank you for your interest!
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Rules & Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12"
        >
          {/* Rules & Regulations */}
          <motion.div
            whileHover={{
              scale: 1.03,
              y: -12,
              rotateY: 3,
              rotateX: -2
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glass-card p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(59, 130, 246, 0.3) 100%)',
              backdropFilter: 'blur(25px)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.15)',
              transition: 'box-shadow 0.4s ease-out'
            }}
          >
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-conic from-blue-500/5 via-transparent to-cyan-500/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '15s' }}></div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:15px_15px]"></div>
            </div>

            <div className="relative z-10">
              <motion.h3
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-2xl font-bold text-white mb-8 flex items-center"
              >
                <div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">Rules & Regulations</span>
                </div>
              </motion.h3>

              <div className="space-y-5">
                {[
                  "All participants must register before the event deadline",
                  "Participants must bring valid ID proof for verification",
                  "Late arrivals may not be permitted to participate",
                  "Follow all venue guidelines and instructions from organizers",
                  "Respectful behavior towards all participants is mandatory"
                ].map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                    className="flex items-start group/item"
                  >
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      className="text-cyan-400 mr-4 mt-1.5 text-sm font-bold bg-cyan-400/10 rounded-full w-6 h-6 flex items-center justify-center border border-cyan-400/20 group-hover/item:bg-cyan-400/20 transition-colors duration-200"
                    >
                      {index + 1}
                    </motion.span>
                    <span className="text-gray-100 leading-relaxed group-hover/item:text-white transition-colors duration-200 font-medium">
                      {rule}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Terms & Conditions */}
          <motion.div
            whileHover={{
              scale: 1.03,
              y: -12,
              rotateY: -3,
              rotateX: 2
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glass-card p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(6, 182, 212, 0.3) 100%)',
              backdropFilter: 'blur(25px)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.15)',
              transition: 'box-shadow 0.4s ease-out'
            }}
          >
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-conic from-cyan-500/5 via-transparent to-blue-500/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '15s' }}></div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_25%,rgba(6,182,212,0.05)_50%,transparent_50%,transparent_75%,rgba(6,182,212,0.05)_75%)] bg-[length:15px_15px]"></div>
            </div>

            <div className="relative z-10">
              <motion.h3
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-2xl font-bold text-white mb-8 flex items-center"
              >
                <div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-100">Terms & Conditions</span>
                </div>
              </motion.h3>

              <div className="space-y-5">
                {[
                  "Allow photography and videography during the event",
                  "Comply with all event rules and venue policies",
                  "Organizers are not liable for personal belongings",
                  "Event details may change with prior notice",
                  "Provide accurate information during registration"
                ].map((term, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                    className="flex items-start group/item"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="text-green-400 mr-4 mt-1.5 text-lg bg-green-400/10 rounded-full w-7 h-7 flex items-center justify-center border border-green-400/20 group-hover/item:bg-green-400/20 transition-colors duration-200"
                    >
                      ✓
                    </motion.span>
                    <span className="text-gray-100 leading-relaxed group-hover/item:text-white transition-colors duration-200 font-medium">
                      {term}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetailPage;
