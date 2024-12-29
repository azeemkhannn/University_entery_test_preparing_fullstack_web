import React from 'react';
import { BookOpen } from 'lucide-react';

interface QuizSelectorProps {
  testType: string;
  selectedQuizType: string;
  selectedSubject: string;
  onQuizTypeChange: (type: string) => void;
  onSubjectChange: (subject: string) => void;
  onStartQuiz: () => void;
  ref :()=>void;
}

export default function QuizSelector({
  testType,
  selectedQuizType,
  selectedSubject,
  onQuizTypeChange,
  onSubjectChange,
  onStartQuiz,
  ref,
  
}: QuizSelectorProps) {
  const quizTypes = [
    { id: 'full', name: 'Full Mock Test' },
    { id: 'subject', name: 'Subject-specific Quiz' },
  ];

  const subjectsByTestType: Record<string, { id: string; name: string }[]> = {
    MCAT: [
      { id: 'Biology', name: 'Biology' },
      { id: 'Chemistry', name: 'Chemistry' },
      { id: 'Physics', name: 'Physics' },
      { id: 'English', name: 'English' },
    ],
    ECAT: [
      { id: 'Math', name: 'Mathematics' },
      { id: 'Physics', name: 'Physics' },
      { id: 'Chemistry', name: 'Chemistry' },
      { id: 'English', name: 'English' },
    ],
    NTS: [
      { id: 'Verbal', name: 'Verbal Reasoning' },
      { id: 'Quantitative', name: 'Quantitative Reasoning' },
      { id: 'Analytical', name: 'Analytical Reasoning' },
    ],
    SAT: [
      { id: 'Math', name: 'Mathematics' },
      { id: 'Reading', name: 'Reading' },
      { id: 'Writing', name: 'Writing' },
    ],
    HAT: [
      { id: 'Verbal', name: 'Verbal Reasoning' },
      { id: 'Quantitative', name: 'Quantitative Reasoning' },
      { id: 'Analytical', name: 'Analytical Reasoning' },
    ],
  };

  const subjects = subjectsByTestType[testType] || [];

  const isStartDisabled = !selectedQuizType || (selectedQuizType === 'subject' && !selectedSubject);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
          <BookOpen className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Start Your {testType.toUpperCase()} Preparation
        </h1>
        <p className="text-lg text-gray-600">
          Choose your quiz type and begin your practice session
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            {quizTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onQuizTypeChange(type.id)}
                className={`p-4 text-left rounded-xl border-2 transition-all ${
                  selectedQuizType === type.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <span className="block font-medium text-gray-900">{type.name}</span>
                <span className="text-sm text-gray-500">
                  {type.id === 'full' ? 'Complete test simulation' : 'Focus on specific subject'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {selectedQuizType === 'subject' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
            >
              <option value="">Choose a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={()=>onStartQuiz()}
          
          disabled={isStartDisabled}
          className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-colors ${
            isStartDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
