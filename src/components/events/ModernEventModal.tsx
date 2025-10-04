import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Event } from '@/constants/events';
import { useNavigate } from 'react-router-dom';

interface ModernEventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ModernEventModal: React.FC<ModernEventModalProps> = ({ 
  event, 
  isOpen, 
  onClose, 
  onRegister 
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(false);

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

      // Debug help - remove or keep as needed
      // eslint-disable-next-line no-console
      console.debug('ModernEventModal: eventDate=', eventDate.toString(), 'now=', now.toString(), 'diff=', difference);

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
  }, [event?.date, event?.time, event?.status]);

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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-card border-glass-border max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* Top Section: Event Banner Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '16/9' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Middle Section: Core Event Information */}
              <div className="p-8 space-y-6">
                {/* Title and Badge */}
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-foreground leading-tight">
                    {event.title}
                  </h1>
                  
                  <Badge 
                    className="text-sm font-semibold px-4 py-2 bg-green-500/20 text-green-400 border-green-500/30"
                  >
                    Free
                  </Badge>
                </div>

                {/* Key Logistics */}
                <div className="flex flex-wrap gap-6 text-foreground-secondary">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-atom-primary" />
                    <span className="font-medium">{formatDate(event.date)}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-atom-primary" />
                      <span className="font-medium">{event.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-atom-primary" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>

                {/* About This Event */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">About This Event</h2>
                  <div className="text-foreground-secondary leading-relaxed">
                    {showFullDescription ? (
                      <p>{event.description}</p>
                    ) : (
                      <p>{truncateDescription(event.description)}</p>
                    )}
                    {event.description.split(' ').length > 36 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-atom-primary hover:text-electric transition-colors mt-2 font-medium"
                      >
                        {showFullDescription ? 'Read Less...' : 'Read More...'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Section: Dynamic Content & Detailed Information */}
              <div className="px-8 pb-8 space-y-6">
                {/* Dynamic Content Based on Event Status */}
                {event.status === 'upcoming' && !isExpired ? (
                  <div className="space-y-6">
                    {/* Countdown Timer */}
                    <div className="glass-card border-glass-border p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
                        Event Countdown
                      </h3>
                      <div className="grid grid-cols-4 gap-4">
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
                            className="text-center relative group"
                          >
                            {/* Liquid Flow Background */}
                            <div className="relative w-20 h-20 mx-auto mb-3 rounded-2xl overflow-hidden">
                              {/* Animated liquid background */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-90`} />
                              <div className="absolute inset-0 overflow-hidden">
                                <motion.div
                                  animate={{
                                    y: [0, -10, 0],
                                    scale: [1, 1.05, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.5,
                                  }}
                                  className={`absolute -inset-2 bg-gradient-to-br ${unit.color} opacity-50 blur-sm`}
                                />
                                <motion.div
                                  animate={{
                                    rotate: [0, 180, 360],
                                  }}
                                  transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="absolute inset-0 bg-gradient-conic from-white/20 via-transparent to-white/20"
                                />
                              </div>
                              
                              {/* Liquid ripple effect */}
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.3, 0.1, 0.3],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: index * 0.3,
                                }}
                                className={`absolute inset-0 bg-gradient-radial from-white/30 to-transparent rounded-2xl`}
                              />
                              
                              {/* Number display */}
                              <div className="relative z-10 h-full flex items-center justify-center">
                                <motion.span
                                  key={unit.value}
                                  initial={{ y: -20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ duration: 0.4, type: "spring" }}
                                  className="text-2xl font-bold text-white drop-shadow-lg"
                                >
                                  {unit.value.toString().padStart(2, '0')}
                                </motion.span>
                              </div>

                              {/* Shine effect on hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </div>
                            
                            <span className="text-sm font-medium text-foreground-secondary uppercase tracking-wider">
                              {unit.label}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Animated progress wave */}
                      <div className="mt-6 relative">
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Registration Button */}
                    {onRegister && !showRegistrationOptions && (
                      <div className="text-center">
                        <Button
                          onClick={() => setShowRegistrationOptions(true)}
                          className="bg-gradient-to-r from-atom-primary to-electric hover:from-atom-primary/80 hover:to-electric/80 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          Register Now
                        </Button>
                      </div>
                    )}

                    {/* Registration options (Internal / External) shown inside modal */}
                    {showRegistrationOptions && (
                      <div className="text-center space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button
                            onClick={() => {
                              setShowRegistrationOptions(false);
                              onClose();
                              navigate('/registration/internal');
                            }}
                            className="bg-gradient-to-r from-atom-primary/80 to-atom-primary/60 text-white px-6 py-3 rounded-xl font-semibold"
                          >
                            Internal Registration
                          </Button>

                          <Button
                            onClick={() => {
                              setShowRegistrationOptions(false);
                              onClose();
                              navigate('/registration/external');
                            }}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
                          >
                            External Registration
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          onClick={() => setShowRegistrationOptions(false)}
                          className="mt-2 text-foreground-secondary"
                        >
                          Back
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Past Event Status */}
                    <div className="glass-card border-glass-border p-6 text-center">
                      <p className="text-lg font-medium text-foreground-secondary">
                        This event has ended.
                      </p>
                    </div>

                    {/* Past Event Actions: (removed) */}
                  </div>
                )}

                {/* Collapsible Sections */}
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    <AccordionItem value="rules" className="glass-card border-glass-border rounded-lg px-6">
                      <AccordionTrigger className="text-foreground hover:text-atom-primary font-medium">
                        Rules & Regulations
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground-secondary">
                        <div className="space-y-3">
                          <p className="font-medium text-foreground">Event Rules:</p>
                          <ul className="space-y-2 text-sm">
                            <li>• All participants must register before the event deadline</li>
                            <li>• Participants must bring valid ID proof for verification</li>
                            <li>• Late arrivals may not be permitted to participate</li>
                            <li>• Follow all venue guidelines and instructions from organizers</li>
                            <li>• Respectful behavior towards all participants is mandatory</li>
                            <li>• Organizers reserve the right to modify rules if necessary</li>
                            <li>• No outside food or beverages allowed in the event area</li>
                            <li>• Mobile phones should be on silent mode during sessions</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="terms" className="glass-card border-glass-border rounded-lg px-6">
                      <AccordionTrigger className="text-foreground hover:text-atom-primary font-medium">
                        Terms & Conditions
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground-secondary">
                        <div className="space-y-3">
                          <p className="font-medium text-foreground">By registering for this event, you agree to:</p>
                          <ul className="space-y-2 text-sm">
                            <li>• Allow photography and videography during the event for promotional purposes</li>
                            <li>• Comply with all event rules and venue policies</li>
                            <li>• Understand that organizers are not liable for personal belongings</li>
                            <li>• Accept that event details may change with prior notice</li>
                            <li>• Provide accurate information during registration</li>
                            <li>• Follow all safety protocols and guidelines</li>
                            <li>• Acknowledge that refunds are subject to event policy</li>
                            <li>• Grant permission for use of name and photo in publicity materials</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModernEventModal;