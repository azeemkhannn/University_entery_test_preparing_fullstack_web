import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { get } from 'mongoose';

interface QuizTimerProps {
  minutes: number;
  seconds: number;
  
}

export default function QuizTimer({ minutes, seconds }: QuizTimerProps) {
 
  const isLowTime = minutes === 0 && seconds <= 30;

  return (
    <div className={`flex items-center space-x-2 ${isLowTime ? 'text-red-600' : 'text-gray-700'}`}>
      <Clock className="h-5 w-5" />
      <span className="font-medium">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}