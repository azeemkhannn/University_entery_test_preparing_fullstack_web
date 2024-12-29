import Result from '../models/Result.js';
import Quiz from '../models/Quiz.js';
import { calculateQuizScore, generateFeedback } from '../utils/quizHelpers.js';

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score and process answers
    const processedAnswers = answers.map(answer => {
      const question = quiz.questions.id(answer.questionId);
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      return {
        question: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect
      };
    });

    const score = calculateQuizScore(processedAnswers, quiz.questions.length);

    const result = await Result.create({
      user: req.user._id,
      quiz: quizId,
      score,
      answers: processedAnswers,
      timeTaken
    });

    await Quiz.findByIdAndUpdate(quizId, { $inc: { attempts: 1 } });

    const feedback = generateFeedback(result, quiz);
    
    console.log('feedback',feedback, 'result', result);

    res.status(201).json({
      result,
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id })
      .populate('quiz', 'title category subject')
      .sort('-createdAt')
      .lean();

    const enhancedResults = results.map(result => ({
      ...result,
      performance: {
        accuracy: (result.score / 100) * 100,
        timePerQuestion: result.timeTaken / result.answers.length,
        improvement: calculateImprovement(results, result)
      }
    }));

    res.json(enhancedResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('quiz')
      .populate('user', 'name')
      .lean();
    
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    if (result.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const detailedResult = {
      ...result,
      analysis: {
        timeManagement: analyzeTimeManagement(result),
        strengthsAndWeaknesses: analyzeStrengthsAndWeaknesses(result),
        improvementAreas: identifyImprovementAreas(result)
      }
    };

    res.json(detailedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper functions
function calculateImprovement(allResults, currentResult) {
  const previousResults = allResults
    .filter(r => 
      r.quiz.subject === currentResult.quiz.subject && 
      r.createdAt < currentResult.createdAt
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  if (previousResults.length === 0) return null;

  const previousScore = previousResults[0].score;
  return {
    value: currentResult.score - previousScore,
    percentage: ((currentResult.score - previousScore) / previousScore) * 100
  };
}

function analyzeTimeManagement(result) {
  const averageTimePerQuestion = result.timeTaken / result.answers.length;
  const timeManagement = {
    averageTimePerQuestion,
    efficiency: averageTimePerQuestion <= 90 ? 'Good' : 'Needs Improvement',
    suggestion: averageTimePerQuestion > 90 
      ? 'Try to spend less time on each question'
      : 'Good time management'
  };
  return timeManagement;
}

function analyzeStrengthsAndWeaknesses(result) {
  const strengths = [];
  const weaknesses = [];

  // Group questions by topic/type and analyze performance
  const topicPerformance = {};
  result.answers.forEach(answer => {
    const question = result.quiz.questions.id(answer.question);
    const topic = question.topic || 'general';
    
    if (!topicPerformance[topic]) {
      topicPerformance[topic] = { correct: 0, total: 0 };
    }
    
    topicPerformance[topic].total++;
    if (answer.isCorrect) {
      topicPerformance[topic].correct++;
    }
  });

  // Analyze performance for each topic
  Object.entries(topicPerformance).forEach(([topic, performance]) => {
    const accuracy = (performance.correct / performance.total) * 100;
    if (accuracy >= 70) {
      strengths.push(topic);
    } else {
      weaknesses.push(topic);
    }
  });

  return { strengths, weaknesses };
}

function identifyImprovementAreas(result) {
  const incorrectAnswers = result.answers.filter(answer => !answer.isCorrect);
  const topics = incorrectAnswers.map(answer => {
    const question = result.quiz.questions.id(answer.question);
    return question.topic || 'general';
  });

  // Count frequency of each topic
  const topicFrequency = topics.reduce((acc, topic) => {
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  // Sort topics by frequency and return top 3
  return Object.entries(topicFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([topic]) => topic);
}