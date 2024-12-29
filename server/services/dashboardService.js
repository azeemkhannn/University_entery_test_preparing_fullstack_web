import Quiz from '../models/Quiz.js';
import Result from '../models/Result.js';
import { analyzePerformance } from '../utils/analytics.js';

export const getUpcomingQuizzes = async (category) => {
  return Quiz.find({
    category,
    startDate: { $gt: new Date() }
  })
  .select('title subject timeLimit startDate')
  .sort('startDate')
  .limit(5);
};

export const getRecentResults = async (userId) => {
  return Result.find({ user: userId })
    .populate('quiz', 'title subject category')
    .select('score timeTaken answers createdAt')
    .sort('-createdAt')
    .limit(3);
};

export const generateStudyRecommendations = async (userId) => {
  // Get all results for performance analysis
  const results = await Result.find({ user: userId })
    .populate('quiz', 'subject category questions')
    .select('score answers');

  // Analyze performance by subject
  const performance = analyzePerformance(results);

  // Generate recommendations based on performance
  return generateRecommendations(performance);
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

const getPracticeQuestions = (subject) => {
  // Return sample practice questions for the subject
  // In a real app, this would fetch from a question bank
  return {
    count: 10,
    difficulty: 'adaptive',
    estimatedTime: '20 mins'
  };
};