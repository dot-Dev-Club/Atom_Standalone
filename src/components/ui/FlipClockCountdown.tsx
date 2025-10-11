import React, { useEffect, useState } from "react";
import "./flip-clock-countdown.css";

interface FlipClockCountdownProps {
  targetDate: Date;
  size?: "sm" | "md" | "lg";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const FlipClockCountdown: React.FC<FlipClockCountdownProps> = ({ targetDate, size = "md" }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = Math.max(0, targetDate.getTime() - now.getTime());

      const newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      setPrevTimeLeft(timeLeft);
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]); // Remove timeLeft from dependencies to prevent issues

  const sizeClass = `flip-clock-${size}`;

  // Render all 10 digits for the flip animation (original design)
  const renderFlipDigits = (value: number, type: 'one' | 'ten', unit: string) => {
    const currentDigit = type === 'one' ? value % 10 : Math.floor(value / 10) % 10;
    const prevValue = prevTimeLeft[unit as keyof TimeLeft];
    const prevDigit = type === 'one' ? prevValue % 10 : Math.floor(prevValue / 10) % 10;
    const isFlipping = currentDigit !== prevDigit;
    
    return (
      <div 
        className={`nums nums-${type} ${sizeClass}`} 
        key={`${unit}-${type}-${currentDigit}`}
        data-current={currentDigit}
      >
        {/* Current digit - always visible at the bottom */}
        <div className="flip-card">
          <div className="flip-card-back-top">
            {currentDigit}
          </div>
          <div className="flip-card-back-bottom">
            {currentDigit}
          </div>
        </div>
        
        {/* Flipping digit - shows during animation */}
        {isFlipping && (
          <div className="flip-card flip-card-active" key={`flip-${prevDigit}-${currentDigit}`}>
            <div className="flip-card-front-top">
              {prevDigit}
            </div>
            <div className="flip-card-front-bottom">
              {currentDigit}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flip-clock-wrapper">
      {/* Days */}
      <div className="flip-clock-unit">
        <div className="flip-clock-container">
          {renderFlipDigits(timeLeft.days, 'ten', 'days')}
          {renderFlipDigits(timeLeft.days, 'one', 'days')}
        </div>
        <div className="flip-clock-label">D</div>
      </div>

      {/* Hours */}
      <div className="flip-clock-unit">
        <div className="flip-clock-container">
          {renderFlipDigits(timeLeft.hours, 'ten', 'hours')}
          {renderFlipDigits(timeLeft.hours, 'one', 'hours')}
        </div>
        <div className="flip-clock-label">H</div>
      </div>

      {/* Minutes */}
      <div className="flip-clock-unit">
        <div className="flip-clock-container">
          {renderFlipDigits(timeLeft.minutes, 'ten', 'minutes')}
          {renderFlipDigits(timeLeft.minutes, 'one', 'minutes')}
        </div>
        <div className="flip-clock-label">M</div>
      </div>

      {/* Seconds */}
      <div className="flip-clock-unit">
        <div className="flip-clock-container">
          {renderFlipDigits(timeLeft.seconds, 'ten', 'seconds')}
          {renderFlipDigits(timeLeft.seconds, 'one', 'seconds')}
        </div>
        <div className="flip-clock-label">S</div>
      </div>
    </div>
  );
};

export default FlipClockCountdown;
