import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { get } from 'mongoose';
import { useQuizTimer } from '../../hooks/useQuizTimer';

interface QuizTimerProps {
  timeRemaining: number;
  handleTimeEnd: () => void;
  taketime: (timeTaken:number)=>void;
  
}

export default function QuizTimer({ timeRemaining, handleTimeEnd,taketime }: QuizTimerProps) {

  const { minutes, seconds } =  useQuizTimer(timeRemaining, handleTimeEnd); // 60 minutes
  const isLowTime = minutes === 0 && seconds <= 30;

  useEffect(() => {
    taketime(timeRemaining-(minutes*60+seconds));
  }, [minutes,seconds]);

  return (
    <div className={`flex items-center space-x-2 ${isLowTime ? 'text-red-600' : 'text-gray-700'}`}>
      <Clock className="h-5 w-5" />
      <span className="font-medium">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}