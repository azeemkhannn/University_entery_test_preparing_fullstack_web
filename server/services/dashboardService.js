import Quiz from '../models/Quiz.js';
import Result from '../models/Result.js';
import { analyzePerformance } from '../utils/analytics.js';
import moment from 'moment';

export const getUpcomingQuizzes = async (category) => {
  try {
    // Calculate the start of the current week (e.g., Monday)
    const startOfWeek = moment().startOf('week').toDate();
    const now = new Date(); // Current date and time

    const quizzes = await Quiz.find({
      category,
      createdAt: { $gte: startOfWeek, $lte: now } // Uploaded this week
    })
      .select('title subject timeLimit startDate createdAt')
      .sort('-createdAt') // Sort by newest uploaded first
      .limit(4); // Limit to the latest 5 quizzes

    return quizzes;
  } catch (error) {
    console.error('Error fetching this week’s quizzes:', error);
    throw error;
  }
};


export const getRecentResults = async (userId) => {
  return Result.find({ user: userId })
    .populate('quiz', 'title subject category answers')
    .select('score timeTaken createdAt')
    .sort('-createdAt')
    .limit(3);
};

export const generateStudyRecommendations = async (userId) => {
  try {
    // Get all results for the user
    const results = await Result.find({ user: userId })
      .populate('quiz', 'subject category')
      .select('score quiz');

    if (!results.length) {
      return { message: 'No quiz results found for the user.' };
    }

    // Sort results by score (ascending) to find weakest performances
    const weakestResults = results
      .sort((a, b) => a.score - b.score) // Sort by score (lowest first)
      .slice(0, 3); // Get the three weakest results

    // Get subjects and categories of weakest quizzes
    const weakestTopics = weakestResults.map(result => ({
      subject: result.quiz.subject,
      category: result.quiz.category,
    }));

    // Find new quizzes related to the weakest topics
    const recommendedQuizzes = await Quiz.find({
      $or: weakestTopics.map(topic => ({
        subject: topic.subject,
        category: topic.category,
      })),
      _id: { $nin: weakestResults.map(result => result.quiz._id) }, // Exclude already taken quizzes
    })
      .select('subject category title difficulty')
      .limit(3); // Limit the number of recommended quizzes

    return {
      message: 'Study recommendations generated successfully.',
      recommendations: recommendedQuizzes,
    };
  } catch (error) {
    throw new Error(`Failed to generate study recommendations: ${error.message}`);
  }
};


const generateRecommendations = (performance) => {
  const recommendations = [];

  // Sort subjects by performance (ascending)
  const sortedSubjects = Object.entries(performance)
    .sort(([, a], [, b]) => a.accuracy - b.accuracy);

  // Generate recommendations for the 3 weakest subjects
  for (const [subject, stats] of sortedSubjects.slice(0, 3)) {
    recommendations.push({
      subject,
      accuracy: stats.accuracy,
      topics: getWeakTopics(stats.topicPerformance),
      resources: getStudyResources(subject),
      practiceQuestions: getPracticeQuestions(subject)
    });
  }

  return recommendations;
};

const getWeakTopics = (topicPerformance) => {
  return Object.entries(topicPerformance)
    .filter(([, accuracy]) => accuracy < 70)
    .map(([topic]) => topic);
};

const getStudyResources = (subject) => {
  const resources = {
    Physics: [
      { type: 'video', title: 'Mechanics Fundamentals', duration: '45 mins' },
      { type: 'notes', title: 'Formula Sheet', pages: 5 },
      { type: 'practice', title: 'Problem Set', questions: 20 }
    ],
    Chemistry: [
      { type: 'video', title: 'Organic Chemistry Basics', duration: '30 mins' },
      { type: 'notes', title: 'Reaction Mechanisms', pages: 8 },
      { type: 'practice', title: 'Balancing Equations', questions: 15 }
    ],
    Biology: [
      { type: 'video', title: 'Cell Structure', duration: '35 mins' },
      { type: 'notes', title: 'Molecular Processes', pages: 6 },
      { type: 'practice', title: 'Diagrams Quiz', questions: 25 }
    ]
  };

  return resources[subject] || [];
};



const getPracticeQuestions = async (subject) => {
  // Fetch related quizzes for the subject from the database
  const relatedQuizzes = await Quiz.find({ subject })
    .select('title difficulty subject category')
    .limit(5);
    console.log(relatedQuizzes);

  // Return the quizzes and additional practice question details
  return {
    relatedQuizzes: relatedQuizzes.map((quiz) => ({
      id: quiz._id,
      title: quiz.title,
      difficulty: quiz.difficulty,
      subject: quiz.subject,
      category: quiz.category
    })),
    
  };
};
