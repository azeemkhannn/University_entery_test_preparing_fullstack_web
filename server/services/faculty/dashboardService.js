import Quiz from '../../models/Quiz.js';
import Result from '../../models/Result.js';
import { calculateQuizStatistics } from '../../utils/faculty/quizStats.js';
import { aggregateStudentActivity } from '../../utils/faculty/activityStats.js';

export const getQuizOverview = async (facultyId) => {
  const quizzes = await Quiz.find({ createdBy: facultyId })
    .select('title category subject timeLimit createdAt questions')
    .sort('-createdAt');

  const totalQuizzes = quizzes.length;
  const totalQuestions = quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);
  
  const categoryCounts = quizzes.reduce((acc, quiz) => {
    acc[quiz.category] = (acc[quiz.category] || 0) + 1;
    return acc;
  }, {});

  return {
    totalQuizzes,
    totalQuestions,
    categoryCounts,
    recentQuizzes: quizzes.slice(0, 5),
    quizzesBySubject: calculateQuizzesBySubject(quizzes)
  };
};

export const getStudentActivity = async (facultyId) => {
  const results = await Result.find({
    'quiz.createdBy': facultyId
  })
  .populate('user', 'name')
  .populate('quiz', 'title category subject')
  .sort('-createdAt')
  .limit(50);

  return {
    recentActivity: aggregateStudentActivity(results),
    activityTimeline: generateActivityTimeline(results),
    topPerformers: calculateTopPerformers(results)
  };
};

export const getPerformanceMetrics = async (facultyId) => {
  const results = await Result.find({
    'quiz.createdBy': facultyId
  })
  .populate('quiz', 'title category subject questions');

  return {
    overallStats: calculateOverallStats(results),
    subjectPerformance: calculateSubjectPerformance(results),
    difficultyAnalysis: analyzeDifficulty(results)
  };
};

const calculateQuizzesBySubject = (quizzes) => {
  return quizzes.reduce((acc, quiz) => {
    if (!acc[quiz.subject]) {
      acc[quiz.subject] = {
        count: 0,
        totalQuestions: 0,
        averageTimeLimit: 0
      };
    }
    
    const subject = acc[quiz.subject];
    subject.count++;
    subject.totalQuestions += quiz.questions.length;
    subject.averageTimeLimit = 
      (subject.averageTimeLimit * (subject.count - 1) + quiz.timeLimit) / subject.count;
    
    return acc;
  }, {});
};

const generateActivityTimeline = (results) => {
  const timeline = {};
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

  results.forEach(result => {
    const date = result.createdAt.toISOString().split('T')[0];
    if (result.createdAt >= thirtyDaysAgo) {
      if (!timeline[date]) {
        timeline[date] = {
          attempts: 0,
          uniqueStudents: new Set()
        };
      }
      timeline[date].attempts++;
      timeline[date].uniqueStudents.add(result.user._id.toString());
    }
  });

  return Object.entries(timeline).map(([date, data]) => ({
    date,
    attempts: data.attempts,
    uniqueStudents: data.uniqueStudents.size
  }));
};

const calculateTopPerformers = (results) => {
  const studentPerformance = {};

  results.forEach(result => {
    const studentId = result.user._id.toString();
    if (!studentPerformance[studentId]) {
      studentPerformance[studentId] = {
        student: {
          id: studentId,
          name: result.user.name
        },
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0
      };
    }

    const student = studentPerformance[studentId];
    student.totalAttempts++;
    student.averageScore = 
      (student.averageScore * (student.totalAttempts - 1) + result.score) / 
      student.totalAttempts;
    student.highestScore = Math.max(student.highestScore, result.score);
  });

  return Object.values(studentPerformance)
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 10);
};

const calculateOverallStats = (results) => {
  if (results.length === 0) return {
    averageScore: 0,
    completionRate: 0,
    totalAttempts: 0
  };

  const stats = results.reduce((acc, result) => {
    acc.totalScore += result.score;
    acc.totalAttempts++;
    acc.completedAttempts += result.answers.length === result.quiz.questions.length ? 1 : 0;
    return acc;
  }, { totalScore: 0, totalAttempts: 0, completedAttempts: 0 });

  return {
    averageScore: stats.totalScore / stats.totalAttempts,
    completionRate: (stats.completedAttempts / stats.totalAttempts) * 100,
    totalAttempts: stats.totalAttempts
  };
};

const calculateSubjectPerformance = (results) => {
  const subjectStats = {};

  results.forEach(result => {
    const subject = result.quiz.subject;
    if (!subjectStats[subject]) {
      subjectStats[subject] = {
        totalScore: 0,
        attempts: 0,
        averageTime: 0
      };
    }

    const stats = subjectStats[subject];
    stats.totalScore += result.score;
    stats.attempts++;
    stats.averageTime = 
      (stats.averageTime * (stats.attempts - 1) + result.timeTaken) / 
      stats.attempts;
  });

  return Object.entries(subjectStats).map(([subject, stats]) => ({
    subject,
    averageScore: stats.totalScore / stats.attempts,
    attempts: stats.attempts,
    averageTime: stats.averageTime
  }));
};

const analyzeDifficulty = (results) => {
  const difficultyLevels = {
    easy: { min: 80, count: 0 },
    medium: { min: 60, count: 0 },
    hard: { min: 0, count: 0 }
  };

  results.forEach(result => {
    if (result.score >= difficultyLevels.easy.min) {
      difficultyLevels.easy.count++;
    } else if (result.score >= difficultyLevels.medium.min) {
      difficultyLevels.medium.count++;
    } else {
      difficultyLevels.hard.count++;
    }
  });

  return difficultyLevels;
};