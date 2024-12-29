import React, { useEffect } from 'react';

interface QuizQuestionProps {
  question: {
    _id: string;
    question: string;
    options: string[];
    explanation?: string; // Optional, in case it's not always present
  };
  selectedAnswer?: number;
  onAnswerSelect: (index: number) => void;
  i: number;
  
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  i,
  
}: QuizQuestionProps) {




  if (!question || !question.options) {
    return <p className="text-red-500">Question data is unavailable.</p>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Q.{i+1} {question.question}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              selectedAnswer === index
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
            aria-pressed={selectedAnswer === index}
            aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
          >
            <span className="font-medium text-gray-900">
              {String.fromCharCode(65 + index)}.
            </span>{' '}
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
