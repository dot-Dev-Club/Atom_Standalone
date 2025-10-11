import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from '@/constants/events';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, getEvents } from '@/utils/dataService';
import { generateSlug } from '@/utils/slug';
import FlipClockCountdown from '../components/ui/FlipClockCountdown';
import ReactMarkdown from 'react-markdown';
import '../styles/expandable-cards.css';
import '../styles/hover-card.css';
import '../styles/stacked-cards.css';
import '../styles/hover-expand-card.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Helper: build a Date object from ISO date (YYYY-MM-DD) and various time formats
// Moved to module scope to ensure consistent parsing (Safari-safe) and reuse.
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

const EventDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
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
    // Handle multi-day events (comma-separated dates)
    if (dateString.includes(',')) {
      const dates = dateString.split(',').map(d => d.trim());
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[1]);
      
      const startFormatted = startDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      });
      const endFormatted = endDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      return `${startFormatted} - ${endFormatted}`;
    }
    
    // Handle single-day events
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
                  {/* Only show status badge if not Battle of Binaries */}
                  {event.id !== 1 && (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className="bg-gradient-to-r from-blue-500/25 to-cyan-500/25 text-blue-200 border border-blue-400/40 backdrop-blur-xl px-4 py-2 hover:from-blue-500/35 hover:to-cyan-500/35 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                        {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </Badge>
                    </motion.div>
                  )}
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Countdown Timer - Horizontal below hero image */}
        {event.status === 'upcoming' && !isExpired && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Event Countdown
              </h3>
            </div>

            {/* Use the FlipClockCountdown component */}
            <FlipClockCountdown
              targetDate={buildEventDate(event.date, event.time)}
              size="md"
            />
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Key Information Cards - Expandable Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="expandable-cards-container">
                {/* Event Date Card */}
                <div className="expandable-card">
                  <div className="expandable-card-content">
                    <div className="expandable-card-label">Event Date</div>
                    <div className="expandable-card-value">{formatDate(event.date)}</div>
                  </div>
                </div>

                {/* Start Time Card */}
                {event.time && (
                  <div className="expandable-card">
                    <div className="expandable-card-content">
                      <div className="expandable-card-label">Start Time</div>
                      <div className="expandable-card-value">{event.time}</div>
                    </div>
                  </div>
                )}

                {/* Venue Card */}
                <div className="expandable-card">
                  <div className="expandable-card-content">
                    <div className="expandable-card-label">Venue</div>
                    <div className="expandable-card-value">{event.location}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Event Highlights - Only for Battle of Binaries */}
            {event.id === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                whileHover={{
                  scale: 1.02,
                  y: -10,
                  rotateY: -2,
                  rotateX: 2
                }}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(139, 92, 246, 0.3) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1), 0 0 20px rgba(139, 92, 246, 0.15)',
                  transition: 'box-shadow 0.4s ease-out'
                }}
              >
                {/* Enhanced background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/15 to-violet-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-6"
                  >
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-violet-100 flex items-center gap-3">
                      <svg className="w-7 h-7 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Event Highlights
                    </h3>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {/* Highlight 1 */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">CTF Competition</h4>
                        <p className="text-gray-300 text-sm">Real-world cybersecurity challenges</p>
                      </div>
                    </div>

                    {/* Highlight 2 */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-400/20 hover:border-violet-400/40 transition-all duration-300 hover:scale-105">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">₹75,000 Worth Prizes</h4>
                        <p className="text-gray-300 text-sm">Vouchers & certifications</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Single Unified Layered Hover Card - All Event Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                rotateY: 2,
                rotateX: -2,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              className="hover-card"
            >
              {/* Main Title - Official Partner (for Battle of Binaries) or Event Title */}
              <div className="main-title">
                {event.id === 1 ? (
                  <div className="text-center">
                    <img 
                      src="https://comptiacdn.azureedge.net/webcontent/images/default-source/newsiteupdates/comptia-logo.png?sfvrsn=216cff61_2"
                      alt="CompTIA Logo" 
                      className="w-48 h-auto object-contain mx-auto mb-3"
                      loading="lazy"
                    />
                    <h2 className="text-2xl font-bold text-white mb-2">Official Partner</h2>
                    <p className="text-sm text-white/90 max-w-md mx-auto">
                      This event is organized in association with CompTIA, a leading provider of vendor-neutral IT certifications
                    </p>
                    <div className="flex gap-3 justify-center mt-3">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white">Industry Recognized</span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white">Certified Event</span>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-4xl font-bold text-white">Event Information</h2>
                )}
              </div>

              {/* Icons Container */}
              <div className="icons-container">
                <a href="#" className="icon">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="icon">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>

              {/* Box 3 - About This Event (Title 1) */}
              <div className="box box3">
                <div className="content">
                  <h3 className="text-2xl font-bold mb-4 mt-16">About This Event</h3>
                  <div className="text-sm text-white/90 leading-relaxed max-h-60 overflow-y-auto">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className="text-xl font-bold text-white mb-3">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-lg font-bold text-white mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-base font-bold text-white mb-2">{children}</h3>,
                        p: ({ children }) => <p className="text-white/90 mb-2 text-sm">{children}</p>,
                        ul: ({ children }) => <ul className="text-white/90 mb-2 ml-4 space-y-1 text-sm">{children}</ul>,
                        ol: ({ children }) => <ol className="text-white/90 mb-2 ml-4 space-y-1 text-sm">{children}</ol>,
                        li: ({ children }) => <li className="flex items-start"><span className="mr-2">•</span><span>{children}</span></li>,
                        strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                      }}
                    >
                      {event.description}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* Box 2 - Rules & Regulations (Title 2) */}
              <div className="box box2">
                <div className="content">
                  <h3 className="text-2xl font-bold mb-4">Rules & Regulations</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    <div className="flex items-start">
                      <span className="text-cyan-300 mr-3 mt-1 text-sm font-bold">1</span>
                      <p className="text-white/90 text-sm">All participants must register before the event deadline</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-cyan-300 mr-3 mt-1 text-sm font-bold">2</span>
                      <p className="text-white/90 text-sm">Participants must bring valid ID proof for verification</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-cyan-300 mr-3 mt-1 text-sm font-bold">3</span>
                      <p className="text-white/90 text-sm">Late arrivals may not be permitted to participate</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-cyan-300 mr-3 mt-1 text-sm font-bold">4</span>
                      <p className="text-white/90 text-sm">Follow all venue guidelines and instructions from organizers</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-cyan-300 mr-3 mt-1 text-sm font-bold">5</span>
                      <p className="text-white/90 text-sm">Respectful behavior towards all participants is mandatory</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-cyan-300 mr-3 mt-1 text-sm font-bold">6</span>
                      <p className="text-white/90 text-sm">Any form of misconduct may lead to immediate disqualification</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 1 - Terms & Conditions (Title 3) */}
              <div className="box box1">
                <div className="content">
                  <h3 className="text-2xl font-bold mb-4">Terms & Conditions</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    <div className="flex items-start">
                      <span className="text-green-300 mr-3 mt-1 text-lg">✓</span>
                      <p className="text-white/90 text-sm">Comply with all event rules and venue policies</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-300 mr-3 mt-1 text-lg">✓</span>
                      <p className="text-white/90 text-sm">Organizers are not liable for personal belongings</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-300 mr-3 mt-1 text-lg">✓</span>
                      <p className="text-white/90 text-sm">Provide accurate information during registration</p>
                    </div>
                    {event.id === 1 && (
                      <>
                        <div className="flex items-start">
                          <span className="text-green-300 mr-3 mt-1 text-lg">✓</span>
                          <p className="text-white/90 text-sm">Scoreboard results are final and cannot be contested</p>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-300 mr-3 mt-1 text-lg">✓</span>
                          <p className="text-white/90 text-sm">Misconduct may lead to immediate disqualification</p>
                        </div>
                      </>
                    )}
                    <div className="flex items-start">
                      <span className="text-green-300 mr-3 mt-1 text-lg">✓</span>
                      <p className="text-white/90 text-sm">By registering, you agree to all terms and conditions</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-300 mr-3 mt-1 text-lg">✓</span>
                      <p className="text-white/90 text-sm">Your participation constitutes acceptance of these terms</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Registration Section */}
            {event.status === 'upcoming' && !isExpired && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center lg:justify-end mt-48 mr-0"
              >
                <div className="hover-expand-card" onClick={() => setShowRegistrationOptions(!showRegistrationOptions)}>
                  <div className="align">
                    <span className="red"></span>
                    <span className="yellow"></span>
                    <span className="green"></span>
                  </div>

                  <h1>Join the Experience</h1>
                  <p>
                    Get ready for an amazing cybersecurity competition. Register now to secure your spot and compete with the best!
                  </p>
                </div>
              </motion.div>
            )}

            {showRegistrationOptions && event.status === 'upcoming' && !isExpired && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 flex flex-col items-center lg:items-end"
              >
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{ width: '260px' }}
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
                  style={{ width: '260px' }}
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
                  style={{ width: '260px' }}
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

        {/* Contact Card - Only for Battle of Binaries - Full Width */}
        {event.id === 1 && event.status === 'upcoming' && !isExpired && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 lg:mt-12 flex flex-col items-center ml-0 lg:ml-32 px-4 lg:px-0"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
              className="text-center mb-6"
            >
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-100 mb-2 drop-shadow-lg">
                Need Help?
              </h3>
              <p className="text-cyan-200/80 text-base">Contact us for any queries</p>
            </motion.div>

            {/* Stacked Cards Container with horizontal scroll on mobile */}
            <div className="w-full overflow-x-auto lg:overflow-visible">
              <div className="stacked-cards-container">
                {/* Card 1 - Dharshan Kumar J */}
                <div className="stacked-card">
                  <div className="card-title">Dharshan</div>
                <div className="card-content">
                  Contact for event-related queries and registration assistance
                </div>
                <a href="tel:7904826830" className="card-btn">
                  Call Now
                </a>
                <div className="card-bar">
                  <div className="emptybar"></div>
                  <div className="filledbar"></div>
                </div>
              </div>

              {/* Card 2 - Kevin J */}
              <div className="stacked-card">
                <div className="card-title">Kevin J</div>
                <div className="card-content">
                  Get help with technical questions and event details
                </div>
                <a href="tel:9345639487" className="card-btn">
                  Call Now
                </a>
                <div className="card-bar">
                  <div className="emptybar"></div>
                  <div className="filledbar"></div>
                </div>
              </div>

              {/* Card 3 - Bruno A */}
              <div className="stacked-card">
                <div className="card-title">Bruno A</div>
                <div className="card-content">
                  Reach out for venue information and general inquiries
                </div>
                <a href="tel:9944871330" className="card-btn">
                  Call Now
                </a>
                <div className="card-bar">
                  <div className="emptybar"></div>
                  <div className="filledbar"></div>
                </div>
              </div>

              {/* Card 4 - Email */}
              <div className="stacked-card">
                <div className="card-title">Email Us</div>
                <div className="card-content">
                  Send your queries to atom@karunya.edu.in for detailed responses
                </div>
                <a href="mailto:atom@karunya.edu.in" className="card-btn">
                  Send Email
                </a>
                <div className="card-bar">
                  <div className="emptybar"></div>
                  <div className="filledbar"></div>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;
