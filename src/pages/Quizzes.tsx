import React, { useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import SubjectQuizzes from '../components/quizzes/SubjectQuizzes';
import MockQuizzes from '../components/quizzes/MockQuizzes';
import QuizFilters from '../components/quizzes/QuizFilters';

export default function Quizzes() {
  const [selectedSubject, setSelectedSubject] = React.useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('all');
  const [testType, setTestType] = React.useState<string>('');
  const [subjectQuizzes, setSubjectQuizzes] = React.useState<any[]>([]);
  const [mockQuizzes, setMockQuizzes] = React.useState<any[]>([]);

  useEffect(() => {
    const storedTestType = localStorage.getItem('selectedTest') || '';
    setTestType(storedTestType);
    fetchQuizzes(storedTestType);
  }, []);

  const fetchQuizzes = async (testType: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/quiz/quizpage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ testType }), // Send named fields
      });

      if (response.ok) {
        const data = await response.json();
        // Separate quizzes into mock and subject-specific quizzes
        const mockQuizzes = data.filter((quiz: any) => quiz.subject === 'Mock');
        const subjectQuizzes = data.filter((quiz: any) => quiz.subject !== 'Mock');
        setMockQuizzes(mockQuizzes);
        setSubjectQuizzes(subjectQuizzes);
      } else {
        const errorData = await response.json(); // Handle error response JSON
        console.error(errorData.message);
      }
    } catch (err) {
      console.error('Error fetching quizzes:', err);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {testType.toUpperCase()} Preparation
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Practice with subject-specific quizzes or take full mock tests
          </p>
        </div>

        <QuizFilters
          selectedSubject={selectedSubject}
          selectedDifficulty={selectedDifficulty}
          onSubjectChange={setSelectedSubject}
          onDifficultyChange={setSelectedDifficulty}
        />

        <div className="mt-8">
          <MockQuizzes testType={testType} mockQuizzes={mockQuizzes} />
        </div>

        <div className="mt-8">
          <SubjectQuizzes
            selectedSubject={selectedSubject}
            selectedDifficulty={selectedDifficulty}
            subjectQuizzes={subjectQuizzes}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
