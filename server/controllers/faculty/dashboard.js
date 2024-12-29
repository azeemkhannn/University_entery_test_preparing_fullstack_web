import { 
  getQuizOverview,
  getStudentActivity,
  getPerformanceMetrics
} from '../../services/faculty/dashboardService.js';

export const getFacultyDashboard = async (req, res) => {
  try {
    const facultyId = req.user._id;

    const [quizOverview, studentActivity, performanceMetrics] = await Promise.all([
      getQuizOverview(facultyId),
      getStudentActivity(facultyId),
      getPerformanceMetrics(facultyId)
    ]);

    res.json({
      quizOverview,
      studentActivity,
      performanceMetrics
    });
  } catch (error) {
    console.error('Faculty dashboard error:', error);
    res.status(500).json({ 
      message: 'Error fetching faculty dashboard data' 
    });
  }
};