export const calculateQuizStatistics = (results) => {
  if (results.length === 0) return {
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    completionRate: 0,
    averageTimePerQuestion: 0
  };

  const stats = results.reduce((acc, result) => {
    // Update scores
    acc.totalScore += result.score;
    acc.highestScore = Math.max(acc.highestScore, result.score);
    acc.lowestScore = acc.lowestScore === 0 ? 
      result.score : 
      Math.min(acc.lowestScore, result.score);

    // Update completion stats
    const questionCount = result.quiz.questions.length;
    acc.completedQuestions += result.answers.length;
    acc.totalQuestions += questionCount;

    // Update time stats
    acc.totalTime += result.timeTaken;

    return acc;
  }, {
    totalScore: 0,
    highestScore: 0,
    lowestScore: 0,
    completedQuestions: 0,
    totalQuestions: 0,
    totalTime: 0
  });

  return {
    averageScore: stats.totalScore / results.length,
    highestScore: stats.highestScore,
    lowestScore: stats.lowestScore,
    completionRate: (stats.completedQuestions / stats.totalQuestions) * 100,
    averageTimePerQuestion: stats.totalTime / stats.completedQuestions
  };
};