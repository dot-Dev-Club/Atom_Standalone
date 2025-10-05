import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from '@/constants/events';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, getEvents } from '@/utils/dataService';
import { generateSlug } from '@/utils/slug';

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
  const [showFullDescription, setShowFullDescription] = useState(false);
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

  const truncateDescription = (text: string, maxLines: number = 3) => {
    const words = text.split(' ');
    const wordsPerLine = 12; // Approximate words per line
    const maxWords = maxLines * wordsPerLine;

    if (words.length <= maxWords) return text;

    return words.slice(0, maxWords).join(' ') + '...';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900">
      {/* Navigation */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <Button
            onClick={goBack}
            variant="ghost"
            className="text-white hover:text-blue-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Event Banner Image */}
        <div className="relative w-full h-64 lg:h-96 overflow-hidden rounded-3xl mb-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Badge */}
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight flex-1">
                  {event.title}
                </h1>
                <Badge
                  className={`text-sm font-semibold px-6 py-3 w-fit ${
                    event.eventType === 'free'
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                  }`}
                >
                  {event.eventType === 'free' ? 'Free Event' : 'Paid Event'}
                </Badge>
              </div>
            </div>

            {/* Key Logistics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-atom-primary/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-atom-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">Date</p>
                  <p className="text-white font-semibold">{formatDate(event.date)}</p>
                </div>
              </div>

              {event.time && (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Time</p>
                    <p className="text-white font-semibold">{event.time}</p>
                  </div>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">Location</p>
                  <p className="text-white font-semibold">{event.location}</p>
                </div>
              </div>
            </div>

            {/* About This Event */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-electric/20 rounded-lg flex items-center justify-center mr-4">
                  ℹ️
                </div>
                About This Event
              </h2>
              <div className="text-gray-300 leading-relaxed text-lg">
                {showFullDescription ? (
                  <p>{event.description}</p>
                ) : (
                  <p>{truncateDescription(event.description)}</p>
                )}
                {event.description.split(' ').length > 36 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-atom-primary hover:text-electric transition-colors mt-4 font-semibold text-base"
                  >
                    {showFullDescription ? 'Read Less...' : 'Read More...'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Countdown Timer */}
            {event.status === 'upcoming' && !isExpired && (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Event Countdown
                  </h3>
                  <p className="text-gray-400">Time remaining</p>
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
                      <div className={`w-16 h-16 bg-gradient-to-br ${unit.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
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
              </div>
            )}

            {/* Registration Section */}
            {event.status === 'upcoming' && !isExpired && (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-white text-center mb-6">
                  Register for Event
                </h3>

                {!showRegistrationOptions ? (
                  <Button
                    onClick={() => setShowRegistrationOptions(true)}
                    className="w-full bg-gradient-to-r from-atom-primary to-electric hover:from-atom-primary/80 hover:to-electric/80 text-white py-4 text-lg font-bold rounded-xl transition-all duration-300"
                  >
                    Register Now
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Button
                      onClick={() => navigate('/registration/internal')}
                      className="w-full bg-gradient-to-r from-atom-primary/80 to-atom-primary/60 hover:from-atom-primary hover:to-atom-primary text-white py-3 font-semibold rounded-xl transition-all duration-300 flex flex-col items-center gap-1"
                    >
                      <span>Internal Registration</span>
                      <span className="text-sm opacity-80">For Karunya Students</span>
                    </Button>

                    <Button
                      onClick={() => navigate('/registration/external')}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 font-semibold rounded-xl transition-all duration-300 flex flex-col items-center gap-1"
                    >
                      <span>External Registration</span>
                      <span className="text-sm opacity-80">For External Participants</span>
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => setShowRegistrationOptions(false)}
                      className="w-full text-gray-400 hover:text-white transition-colors"
                    >
                      Back
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Past Event Status */}
            {(event.status !== 'upcoming' || isExpired) && (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-center">
                <div className="w-16 h-16 bg-gray-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏁</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Event Completed
                </h3>
                <p className="text-gray-400">
                  This event has ended. Thank you for your interest!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Rules & Guidelines */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Rules & Regulations */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <div className="w-8 h-8 bg-atom-primary/20 rounded-lg flex items-center justify-center mr-3">
                📋
              </div>
              Rules & Regulations
            </h3>
            <div className="space-y-3">
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-atom-primary mr-2 mt-1">•</span>
                  All participants must register before the event deadline
                </li>
                <li className="flex items-start">
                  <span className="text-atom-primary mr-2 mt-1">•</span>
                  Participants must bring valid ID proof for verification
                </li>
                <li className="flex items-start">
                  <span className="text-atom-primary mr-2 mt-1">•</span>
                  Late arrivals may not be permitted to participate
                </li>
                <li className="flex items-start">
                  <span className="text-atom-primary mr-2 mt-1">•</span>
                  Follow all venue guidelines and instructions from organizers
                </li>
                <li className="flex items-start">
                  <span className="text-atom-primary mr-2 mt-1">•</span>
                  Respectful behavior towards all participants is mandatory
                </li>
              </ul>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <div className="w-8 h-8 bg-electric/20 rounded-lg flex items-center justify-center mr-3">
                📄
              </div>
              Terms & Conditions
            </h3>
            <div className="space-y-3">
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-electric mr-2 mt-1">•</span>
                  Allow photography and videography during the event
                </li>
                <li className="flex items-start">
                  <span className="text-electric mr-2 mt-1">•</span>
                  Comply with all event rules and venue policies
                </li>
                <li className="flex items-start">
                  <span className="text-electric mr-2 mt-1">•</span>
                  Organizers are not liable for personal belongings
                </li>
                <li className="flex items-start">
                  <span className="text-electric mr-2 mt-1">•</span>
                  Event details may change with prior notice
                </li>
                <li className="flex items-start">
                  <span className="text-electric mr-2 mt-1">•</span>
                  Provide accurate information during registration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
