import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading event...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/5 via-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }}></div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <Button
            onClick={goBack}
            variant="ghost"
            className="text-white hover:text-blue-400 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section with Event Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-80 lg:h-96 overflow-hidden rounded-3xl mb-12 shadow-2xl"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />

          {/* Event Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4"
                >
                  {event.title}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-wrap gap-3"
                >
                  <Badge
                    className={`text-sm font-semibold px-4 py-2 ${
                      event.eventType === 'free'
                        ? 'bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm'
                        : 'bg-orange-500/20 text-orange-400 border-orange-500/30 backdrop-blur-sm'
                    }`}
                  >
                    {event.eventType === 'free' ? '🎉 Free Event' : '💰 Paid Event'}
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 backdrop-blur-sm px-4 py-2">
                    {event.status === 'upcoming' ? '🚀 Upcoming' : '🏁 Completed'}
                  </Badge>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Information Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Date</p>
                    <p className="text-white font-semibold">{formatDate(event.date)}</p>
                  </div>
                </div>
              </div>

              {event.time && (
                <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">Time</p>
                      <p className="text-white font-semibold">{event.time}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Location</p>
                    <p className="text-white font-semibold">{event.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About This Event */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-lg">ℹ️</span>
                </div>
                About This Event
              </h2>
              <div className="text-gray-300 leading-relaxed text-lg">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold text-white mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-bold text-white mb-2">{children}</h3>,
                    p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="text-gray-300 mb-4 ml-6 list-disc">{children}</ul>,
                    ol: ({ children }) => <ol className="text-gray-300 mb-4 ml-6 list-decimal">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="text-gray-200 italic">{children}</em>,
                    code: ({ children }) => <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm">{children}</code>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-200 italic">{children}</blockquote>,
                    a: ({ children, href }) => <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                  }}
                >
                  {event.description}
                </ReactMarkdown>
              </div>
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
                className="glass-card p-6 rounded-2xl"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    ⏰ Event Countdown
                  </h3>
                  <p className="text-gray-400 text-sm">Time remaining until event</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Days', value: timeLeft.days, color: 'from-blue-500 to-cyan-600' },
                    { label: 'Hours', value: timeLeft.hours, color: 'from-purple-500 to-pink-600' },
                    { label: 'Minutes', value: timeLeft.minutes, color: 'from-green-500 to-emerald-600' },
                    { label: 'Seconds', value: timeLeft.seconds, color: 'from-orange-500 to-red-600' },
                  ].map((unit, index) => (
                    <motion.div
                      key={unit.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${unit.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                        <span className="text-white font-bold text-lg">
                          {unit.value.toString().padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {unit.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Registration Section */}
            {event.status === 'upcoming' && !isExpired && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="text-xl font-semibold text-white text-center mb-6 flex items-center justify-center">
                  <span className="mr-2">🎫</span>
                  Register for Event
                </h3>

                {!showRegistrationOptions ? (
                  <Button
                    onClick={() => setShowRegistrationOptions(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    🚀 Register Now
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Button
                      onClick={() => navigate('/registration/internal')}
                      className="w-full bg-gradient-to-r from-blue-600/80 to-blue-500/60 hover:from-blue-600 hover:to-blue-500 text-white py-3 font-semibold rounded-xl transition-all duration-300 flex flex-col items-center gap-1 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <span>🎓 Internal Registration</span>
                      <span className="text-sm opacity-80">For Karunya Students</span>
                    </Button>

                    <Button
                      onClick={() => navigate('/registration/external')}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 font-semibold rounded-xl transition-all duration-300 flex flex-col items-center gap-1 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <span>🌍 External Registration</span>
                      <span className="text-sm opacity-80">For External Participants</span>
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => setShowRegistrationOptions(false)}
                      className="w-full text-gray-400 hover:text-white transition-colors mt-2"
                    >
                      ← Back
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Past Event Status */}
            {(event.status !== 'upcoming' || isExpired) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏁</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Event Completed
                </h3>
                <p className="text-gray-400">
                  This event has ended. Thank you for your interest!
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Rules & Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mt-12"
        >
          {/* Rules & Regulations */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white">📋</span>
              </div>
              Rules & Regulations
            </h3>
            <div className="space-y-3">
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">•</span>
                  All participants must register before the event deadline
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">•</span>
                  Participants must bring valid ID proof for verification
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">•</span>
                  Late arrivals may not be permitted to participate
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">•</span>
                  Follow all venue guidelines and instructions from organizers
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">•</span>
                  Respectful behavior towards all participants is mandatory
                </li>
              </ul>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white">📄</span>
              </div>
              Terms & Conditions
            </h3>
            <div className="space-y-3">
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 mt-1">•</span>
                  Allow photography and videography during the event
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 mt-1">•</span>
                  Comply with all event rules and venue policies
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 mt-1">•</span>
                  Organizers are not liable for personal belongings
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 mt-1">•</span>
                  Event details may change with prior notice
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 mt-1">•</span>
                  Provide accurate information during registration
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetailPage;