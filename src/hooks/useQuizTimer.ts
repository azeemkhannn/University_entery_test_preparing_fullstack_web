import { useState, useEffect } from 'react';

export function useQuizTimer(initialTime: number, onTimeEnd: () => void) {
  const [time, setTime] = useState({
    minutes: Math.floor(initialTime / 60),
    seconds: initialTime % 60
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          onTimeEnd();
          return prevTime;
        }

        if (prevTime.seconds === 0) {
          return {
            minutes: prevTime.minutes - 1,
            seconds: 59
          };
        }

        return {
          ...prevTime,
          seconds: prevTime.seconds - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeEnd]);

  return time;
}