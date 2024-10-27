// Timer.tsx
import React, { useEffect, useState } from "react";

interface TimerProps {
  isRunning: boolean;
  onComplete?: () => void; // Optional callback for when the timer stops
}

const Timer: React.FC<TimerProps> = ({ isRunning, onComplete }) => {
  const [milliseconds, setMilliseconds] = useState<number>(0);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isRunning) {
      timerId = setInterval(() => {
        setMilliseconds((prev) => prev + 10); // Increment by 10ms
      }, 10);
    }

    return () => clearInterval(timerId);
  }, [isRunning]);

  useEffect(() => {
    if (onComplete && milliseconds >= 30000) { // Example: complete after 30 seconds
      onComplete();
    }
  }, [milliseconds, onComplete]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const remainingMilliseconds = ms % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(Math.floor(remainingMilliseconds / 10)).padStart(2, '0')}`;
  };

  return (
    <p className="mt-2 text-lg">
      Timer: {formatTime(milliseconds)}
    </p>
  );
};

export default Timer;
