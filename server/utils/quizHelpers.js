export const calculateQuizScore = (answers, totalQuestions) => {
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  return (correctAnswers / totalQuestions) * 100;
};

export const generateFeedback = (result, quiz) => {
  const feedback = {
    score: result.score,
    timeTaken: result.timeTaken,
    performance: {
      excellent: result.score >= 90,
      good: result.score >= 70 && result.score < 90,
      needsImprovement: result.score < 70
    },
    timeManagement: analyzeTimeManagement(result.timeTaken, quiz.questions.length),
    recommendations: generateRecommendations(result, quiz)
  };

  return feedback;
};

const analyzeTimeManagement = (timeTaken, questionCount) => {
  const averageTimePerQuestion = timeTaken / questionCount;
  const expectedTimePerQuestion = 90; // 1.5 minutes per question

  return {
    averageTimePerQuestion,
    efficiency: averageTimePerQuestion <= expectedTimePerQuestion ? 'Good' : 'Needs Improvement',
    suggestion: averageTimePerQuestion > expectedTimePerQuestion 
      ? 'Try to improve your time management'
      : 'Good time management skills'
  };
};

const generateRecommendations = (result, quiz) => {
  const recommendations = [];
  const incorrectAnswers = result.answers.filter(answer => !answer.isCorrect);

  // Group incorrect answers by topic
  const topicMistakes = incorrectAnswers.reduce((acc, answer) => {
    const question = quiz.questions.id(answer.question);
    const topic = question.topic || quiz.subject;
    
    if (!acc[topic]) {
      acc[topic] = [];
    }
    acc[topic].push(question);
    return acc;
  }, {});

  // Generate recommendations for each topic
  Object.entries(topicMistakes).forEach(([topic, questions]) => {
    recommendations.push({
      topic,
      count: questions.length,
      suggestion: getTopicSuggestion(topic),
      resources: getStudyResources(topic)
    });
  });

  return recommendations.sort((a, b) => b.count - a.count);
};

const getTopicSuggestion = (topic) => {
  const suggestions = {
    'Physics': 'Focus on understanding fundamental concepts and practice numerical problems',
    'Chemistry': 'Review chemical reactions and periodic table trends',
    'Biology': 'Study diagrams and memorize key processes',
    'Mathematics': 'Practice more problem-solving and understand formulas',
    'default': 'Review core concepts and practice more questions'
  };

  return suggestions[topic] || suggestions.default;
};

const getStudyResources = (topic) => {
  const resources = {
    'Physics': [
      { type: 'video', title: 'Physics Fundamentals', url: 'https://example.com/physics' },
      { type: 'practice', title: 'Mechanics Problem Set', count: 20 }
    ],
    'Chemistry': [
      { type: 'video', title: 'Chemical Reactions', url: 'https://example.com/chemistry' },
      { type: 'practice', title: 'Periodic Table Quiz', count: 15 }
    ],
    'Biology': [
      { type: 'video', title: 'Cell Structure', url: 'https://example.com/biology' },
      { type: 'practice', title: 'Anatomy Quiz', count: 25 }
    ],
    'Mathematics': [
      { type: 'video', title: 'Algebra Basics', url: 'https://example.com/math' },
      { type: 'practice', title: 'Calculus Problems', count: 30 }
    ]
  };

  return resources[topic] || [
    { type: 'practice', title: 'General Practice Questions', count: 20 }
  ];
};