import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Answer {
  question: string;
  selectedAnswer: number;
  isCorrect: boolean;
  _id: string;
}
interface QuizDetails {
  questionId: string;
  question: string;
  options: string[];
  explanation: string;
}

interface AnswerReviewProps {
  answers: Answer[];
  quizDetails: QuizDetails[];
}

export default function AnswerReview({ answers, quizDetails }: AnswerReviewProps) {
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const accuracy = (correctAnswers / answers.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Answer Review</h2>
        <div className="text-sm text-gray-500">
          Accuracy: {Math.round(accuracy)}%
        </div>
      </div>

      <div className="space-y-6">
        {answers.map((answer, index) => {
          const quizDetail = quizDetails.find(q => q.questionId === answer.question);

          return (
            <div
              key={answer._id}
              className={`p-4 rounded-lg ${
                answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  {answer.isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${
                    answer.isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    Question {index + 1}: {quizDetail?.question}
                  </p>
                </div>
                
                  
                
              </div>
              <div className="text-sm text-gray-600">
              {quizDetail?.options.map((option, i) => (
                    <div key={i} className=" text-gray-800">
                      <span className={`mr-2 ${i === answer.selectedAnswer ? 'font-bold' : ''}`}>
                        {i + 1}.
                      </span>
                      <span className={`${i === answer.selectedAnswer ? 'font-bold' : ''}`}>
                        {option}
                      </span>
                    </div>
                  ))}
                <p className='mt-2'>Selected Answer: Option {answer.selectedAnswer + 1}</p>
                {quizDetail && (
                  <p>Correct Answer: {quizDetail.options[answer.selectedAnswer]}</p>
                )}
                <p className="mt-2 text-gray-800">
                  Explanation: {quizDetail?.explanation || 'No explanation available.'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
