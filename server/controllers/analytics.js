import Result from '../models/Result.js';
import Quiz from '../models/Quiz.js';

export const getPerformanceAnalytics = async (req, res) => {
  try {
    const analytics = await Result.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$score' },
          totalQuizzes: { $sum: 1 },
          totalTime: { $sum: '$timeTaken' },
          highestScore: { $max: '$score' },
          lowestScore: { $min: '$score' }
        }
      },
      {
        $project: {
          _id: 0,
          averageScore: { $round: ['$averageScore', 2] },
          totalQuizzes: 1,
          totalTime: 1,
          highestScore: 1,
          lowestScore: 1
        }
      }
    ]);

    res.json(analytics[0] || {
      averageScore: 0,
      totalQuizzes: 0,
      totalTime: 0,
      highestScore: 0,
      lowestScore: 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubjectWiseAnalysis = async (req, res) => {
  try {
    // Validate user ID from request
    const { _id } = req.user;
    
    if (!_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    


    // Perform aggregation
    const analysis = await Result.aggregate([
      { $match: { user: _id } },
      {
        $lookup: {
          from: 'quizzes',
          localField: 'quiz',
          foreignField: '_id',
          as: 'quizDetails',
        },
      },
      { $unwind: '$quizDetails' }, // Unwind to get each quiz detail
      {
        $group: {
          _id: '$quizDetails.subject',
          averageScore: { $avg: '$score' },
          totalAttempts: { $sum: 1 },
          correctAnswers: {
            $sum: {
              $cond: {
                if: { $isArray: '$answers' },
                then: {
                  $size: {
                    $filter: {
                      input: '$answers',
                      as: 'answer',
                      cond: { $eq: ['$$answer.isCorrect', true] },
                    },
                  },
                },
                else: 0, // Default if answers is not an array
              },
            },
          },
          totalQuestions: {
            $sum: {
              $cond: {
                if: { $isArray: '$answers' },
                then: { $size: '$answers' },
                else: 0, // Default if answers is not an array
              },
            },
          },
        },
      },
      {
        $project: {
          subject: '$_id',
          averageScore: { $round: ['$averageScore', 2] },
          totalAttempts: 1,
          accuracy: {
            $cond: {
              if: { $gt: ['$totalQuestions', 0] },
              then: {
                $round: [
                  { $multiply: [{ $divide: ['$correctAnswers', '$totalQuestions'] }, 100] },
                  2,
                ],
              },
              else: 0, // Default accuracy if no questions
            },
          },
        },
      },
    ]);

    // Send the response
    res.status(200).json(analysis);
  } catch (error) {
    console.error('Error in getSubjectWiseAnalysis:', error);
    res.status(500).json({ message: error.message });
  }
};


export const getImprovementSuggestions = async (req, res) => {
  try {
    const weakAreas = await Result.aggregate([
      { $match: { user: req.user._id } },
      { $unwind: '$answers' },
      {
        $lookup: {
          from: 'quizzes',
          localField: 'quiz',
          foreignField: '_id',
          as: 'quizDetails',
        },
      },
      { $unwind: '$quizDetails' },
      { $unwind: '$quizDetails.questions' }, // Unwind quiz questions
      {
        $match: {
          'answers.isCorrect': false,
          $expr: { $eq: ['$quizDetails.questions._id', '$answers.question'] }, // Match question ID
        },
      },
      {
        $group: {
          _id: '$quizDetails.subject',
          incorrectCount: { $sum: 1 },
          questions: {
            $push: {
              questionId: '$answers.question',
              explanation: '$quizDetails.questions.explanation', // Fetch explanation
            },
          },
        },
      },
      {
        $project: {
          subject: '$_id',
          incorrectCount: 1,
          suggestions: {
            $slice: ['$questions', 5], // Limit to 5 questions per subject
          },
        },
      },
    ]);

    // Add recommendations and resources
    const suggestions = weakAreas.map(area => ({
      subject: area.subject,
      incorrectCount: area.incorrectCount,
      suggestions: area.suggestions,
      recommendedTopics: getRecommendedTopics(area.subject),
      practiceResources: getPracticeResources(area.subject),
    }));

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};


export const getStudyProgress = async (req, res) => {
  try {
    const progress = await Result.aggregate([
      { $match: { user: req.user._id } },
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          averageScore: { $avg: '$score' },
          quizzesTaken: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          averageScore: { $round: ['$averageScore', 2] },
          quizzesTaken: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper functions for generating recommendations
function getRecommendedTopics(subject) {
  const recommendations = {
    Physics: [
      'Review mechanics fundamentals',
      'Practice problem-solving in thermodynamics',
      'Focus on wave mechanics'
    ],
    Chemistry: [
      'Study organic reaction mechanisms',
      'Review periodic table trends',
      'Practice balancing equations'
    ],
    Biology: [
      'Review cell structure and function',
      'Study molecular biology concepts',
      'Focus on human anatomy'
    ]
  };
  return recommendations[subject] || ['Review core concepts'];
}

function getPracticeResources(subject) {
  const resources = {
    Physics: [
      { type: 'video', title: 'Mechanics Masterclass', duration: '45 mins' },
      { type: 'quiz', title: 'Forces and Motion', questions: 20 },
      { type: 'problems', title: 'Thermodynamics Practice Set', count: 15 }
    ],
    Chemistry: [
      { type: 'video', title: 'Organic Chemistry Basics', duration: '30 mins' },
      { type: 'quiz', title: 'Periodic Table Quiz', questions: 25 },
      { type: 'problems', title: 'Balancing Equations Set', count: 10 }
    ],
    Biology: [
      { type: 'video', title: 'Cell Biology Overview', duration: '40 mins' },
      { type: 'quiz', title: 'Human Systems Quiz', questions: 30 },
      { type: 'problems', title: 'Genetics Problem Set', count: 12 }
    ]
  };
  return resources[subject] || [];
}