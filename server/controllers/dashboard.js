import { 
  getUpcomingQuizzes,
  getRecentResults,
  generateStudyRecommendations 
} from '../services/dashboardService.js';

export const getDashboardData = async (req, res) => {
  try {
    const { userId, selectedTest } = req.body;
    console.log('Fetching dashboard data for user:', userId);
    console.log('Selected test type:', selectedTest);

    // Fetch data concurrently for better performance
    const [upcomingQuizzes, recentResults, recommendations] = await Promise.all([
      getUpcomingQuizzes(selectedTest),
      getRecentResults(userId),
      generateStudyRecommendations(userId)
    ]);
 console.log('recommend:  ',recommendations)
    res.json({
      upcomingQuizzes,
      recentResults,
      recommendations
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard data' 
    });
  }
};