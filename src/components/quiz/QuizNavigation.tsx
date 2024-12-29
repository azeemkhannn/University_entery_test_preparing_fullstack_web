import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  answers: Record<number, number>;
  onNavigate: (index: number) => void;
  onSubmit: () => void;
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  answers,
  onNavigate,
  onSubmit,
}: QuizNavigationProps) {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const answeredQuestions = Object.keys(answers).length;

  return (
    <div className="border-t border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate(currentQuestion - 1)}
          disabled={isFirstQuestion}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isFirstQuestion
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4">
          {isLastQuestion && (
            <button
              onClick={onSubmit}
              className={`px-6 py-2 rounded-lg font-medium ${
                answeredQuestions === totalQuestions
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={answeredQuestions !== totalQuestions}
            >
              Submit Quiz
            </button>
          )}

          <button
            onClick={() => onNavigate(currentQuestion + 1)}
            disabled={isLastQuestion}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isLastQuestion
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}