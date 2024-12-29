export const aggregateStudentActivity = (results) => {
  return results.map(result => ({
    id: result._id,
    studentName: result.user.name,
    quizTitle: result.quiz.title,
    score: result.score,
    timeTaken: result.timeTaken,
    completedAt: result.createdAt,
    category: result.quiz.category,
    subject: result.quiz.subject,
    performance: calculatePerformanceLevel(result.score)
  }));
};

const calculatePerformanceLevel = (score) => {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 60) return 'average';
  return 'needs_improvement';
};