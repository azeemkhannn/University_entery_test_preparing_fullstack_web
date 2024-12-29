import React from 'react';
import { Filter } from 'lucide-react';

interface QuizFiltersProps {
  selectedSubject: string;
  selectedDifficulty: string;
  onSubjectChange: (subject: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

export default function QuizFilters({
  selectedSubject,
  selectedDifficulty,
  onSubjectChange,
  onDifficultyChange
}: QuizFiltersProps) {
  const subjects = ['all', 'Physics', 'Chemistry', 'Biology', 'Mathematics'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <div className="flex-1 flex items-center space-x-4">
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}