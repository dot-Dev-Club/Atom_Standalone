import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ClockCountdownProps {
  targetDate: Date;
  size?: 'sm' | 'md' | 'lg';
}

const ClockCountdown: React.FC<ClockCountdownProps> = ({ targetDate, size = 'md' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const sizeClasses = {
    sm: { clock: 'w-32 h-32', text: 'text-sm', numbers: 'text-lg' },
    md: { clock: 'w-48 h-48', text: 'text-base', numbers: 'text-2xl' },
    lg: { clock: 'w-64 h-64', text: 'text-lg', numbers: 'text-3xl' },
  };

  const currentSize = sizeClasses[size];

  // Calculate angles for clock hands
  const secondAngle = (timeLeft.seconds / 60) * 360 - 90;
  const minuteAngle = (timeLeft.minutes / 60) * 360 - 90;
  const hourAngle = ((timeLeft.hours % 12) / 12) * 360 - 90;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Analog Clock */}
      <div className={`relative ${currentSize.clock} rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 shadow-2xl`}>
        {/* Clock Face */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-800">
          {/* Hour Markers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 bg-gray-400 rounded-full origin-bottom"
              style={{
                left: '50%',
                top: '4px',
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
                transformOrigin: '50% 44px',
              }}
            />
          ))}

          {/* Minute Markers */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-2 bg-gray-500 rounded-full origin-bottom"
              style={{
                left: '50%',
                top: '2px',
                transform: `translateX(-50%) rotate(${i * 6}deg)`,
                transformOrigin: '50% 46px',
              }}
            />
          ))}

          {/* Clock Hands */}
          {/* Hour Hand */}
          <motion.div
            className="absolute w-1 bg-blue-400 rounded-full origin-bottom shadow-lg"
            style={{
              height: '20px',
              left: '50%',
              top: '24px',
              transformOrigin: '50% 20px',
            }}
            animate={{ rotate: hourAngle }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {/* Minute Hand */}
          <motion.div
            className="absolute w-0.5 bg-green-400 rounded-full origin-bottom shadow-lg"
            style={{
              height: '28px',
              left: '50%',
              top: '18px',
              transformOrigin: '50% 28px',
            }}
            animate={{ rotate: minuteAngle }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {/* Second Hand */}
          <motion.div
            className="absolute w-0.5 bg-red-400 rounded-full origin-bottom shadow-lg"
            style={{
              height: '32px',
              left: '50%',
              top: '16px',
              transformOrigin: '50% 32px',
            }}
            animate={{ rotate: secondAngle }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />

          {/* Center Dot */}
          <div className="absolute w-3 h-3 bg-gray-300 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
        </div>
      </div>

      {/* Digital Display */}
      <div className="flex space-x-4 text-center">
        <div className="flex flex-col items-center">
          <div className={`font-mono font-bold text-white ${currentSize.numbers}`}>
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className={`text-gray-400 ${currentSize.text} uppercase tracking-wider`}>
            Days
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`font-mono font-bold text-white ${currentSize.numbers}`}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className={`text-gray-400 ${currentSize.text} uppercase tracking-wider`}>
            Hours
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`font-mono font-bold text-white ${currentSize.numbers}`}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className={`text-gray-400 ${currentSize.text} uppercase tracking-wider`}>
            Minutes
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`font-mono font-bold text-white ${currentSize.numbers}`}>
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className={`text-gray-400 ${currentSize.text} uppercase tracking-wider`}>
            Seconds
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockCountdown;