import React, { useEffect } from 'react';
import { Book, Clock, Award,Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SubjectQuizzesProps {
  selectedSubject: string;
  selectedDifficulty: string;
  subjectQuizzes: any[];
}

export default function SubjectQuizzes({
  selectedSubject,
  selectedDifficulty,
  subjectQuizzes
}: SubjectQuizzesProps) {
  const navigate = useNavigate();

  interface Quiz {
    id: number;
    title: string;
    subject: string;
    timeLimit: number;
    questions: number;
    difficulty: string;
    attempts: number;
    topics?: string[];
  }

  // const [subjectQuizzes, setSubjectQuizzes] = React.useState<Quiz[]>([]);
  const [testType, setTestType] = React.useState<string>(
    localStorage.getItem('selectedTest') || ''
  );

  

  const filteredQuizzes = subjectQuizzes.filter(
    (quiz) =>
      (selectedSubject === 'all' || quiz.subject === selectedSubject) &&
      (selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty)
  );

  const handleStartQuiz = (quizId: number,suject:string) => {
    navigate(`/dashboard/start-quiz?test=${testType}&quizid=${quizId}&type=${suject}`);
  };

  const getDifficultyColor = (difficulty: string = '') => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{quiz.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {quiz.subject.charAt(0).toUpperCase() + quiz.subject.slice(1)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                  quiz.difficulty
                )}`}
              >
                {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>{quiz.timeLimit || 0} minutes</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Award className="h-4 w-4 mr-2" />
                <span>{quiz.questions || 0} questions</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                <span>{quiz.attempts || 0} attempts</span>
              </div>
              {quiz.topics && quiz.topics.length > 0 && (
                <div className="flex items-center text-sm text-gray-500">
                  <Book className="h-4 w-4 mr-2" />
                  <span>{quiz.topics.join(', ')}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => handleStartQuiz(quiz._id,quiz.subject)}
              className="mt-6 w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
