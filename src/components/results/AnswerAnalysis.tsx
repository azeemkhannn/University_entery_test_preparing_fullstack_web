import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AnswerAnalysisProps {
  testType: string;
}

export default function AnswerAnalysis({ testType }: AnswerAnalysisProps) {
  // Mock data - replace with actual quiz answers
  const answers = [
    {
      id: 1,
      question: 'What is the primary function of mitochondria in a cell?',
      userAnswer: 'Energy production',
      correctAnswer: 'Energy production',
      explanation: 'Mitochondria are often called the powerhouse of the cell because they generate most of the cell\'s supply of ATP.',
      isCorrect: true,
    },
    {
      id: 2,
      question: 'Which of the following is a noble gas?',
      userAnswer: 'Nitrogen',
      correctAnswer: 'Neon',
      explanation: 'Noble gases are chemical elements with complete outer electron shells, making them highly stable.',
      isCorrect: false,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Answer Analysis</h2>
      
      <div className="space-y-6">
        {answers.map((answer) => (
          <div
            key={answer.id}
            className={`p-4 rounded-xl border-2 ${
              answer.isCorrect ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'
            }`}
          >
            <div className="flex items-start">
              {answer.isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
              )}
              
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium mb-2">
                  {answer.question}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Your answer:</span>{' '}
                    <span className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                      {answer.userAnswer}
                    </span>
                  </p>
                  
                  {!answer.isCorrect && (
                    <p>
                      <span className="font-medium">Correct answer:</span>{' '}
                      <span className="text-green-700">{answer.correctAnswer}</span>
                    </p>
                  )}
                  
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Explanation:</span>{' '}
                    {answer.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}