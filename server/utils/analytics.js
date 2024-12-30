export const analyzePerformance = (results) => {
  const performance = {};

  for (const result of results) {
    const { quiz, answers } = result;
    const subject = quiz?.subject; // Safely access subject

    if (!subject) {
      console.warn("Quiz subject is null or undefined for one of the results.");
      continue; // Skip this iteration if subject is invalid
    }

    if (!performance[subject]) {
      performance[subject] = {
        totalQuestions: 0,
        correctAnswers: 0,
        topicPerformance: {},
        recentTrend: [],
        averageTime: 0,
      };
    }

    // Update subject statistics
    const subjectStats = performance[subject];
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;

    subjectStats.totalQuestions += answers.length;
    subjectStats.correctAnswers += correctAnswers;
    subjectStats.accuracy = (subjectStats.correctAnswers / subjectStats.totalQuestions) * 100;

    // Analyze topic-level performance
    updateTopicPerformance(subjectStats.topicPerformance, quiz.questions, answers);

    // Track performance trend
    updatePerformanceTrend(subjectStats.recentTrend, result);
  }

  return performance;
};

// Helper functions should be defined here if they are not already


const updateTopicPerformance = (topicPerformance, questions, answers) => {
  for (const [index, answer] of answers.entries()) {
    const question = questions[index];
    const topic = question.topic || 'general';

    if (!topicPerformance[topic]) {
      topicPerformance[topic] = {
        correct: 0,
        total: 0
      };
    }

    topicPerformance[topic].total++;
    if (answer.isCorrect) {
      topicPerformance[topic].correct++;
    }
  }

  // Calculate accuracy for each topic
  for (const topic in topicPerformance) {
    const stats = topicPerformance[topic];
    stats.accuracy = (stats.correct / stats.total) * 100;
  }
};

const updatePerformanceTrend = (trend, result) => {
  trend.push({
    date: result.createdAt,
    score: result.score
  });

  // Keep only last 5 results for trend analysis
  if (trend.length > 5) {
    trend.shift();
  }
};