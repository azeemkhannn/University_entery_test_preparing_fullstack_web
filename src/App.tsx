import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './pages/Auth';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import SelectTest from './pages/SelectTest';
import StartQuiz from './pages/StartQuiz';
import QuizResults from './pages/QuizResults';
import CreateQuiz from './pages/CreateQuiz';
import UpdateQuiz from './pages/FacultyEditQuiz';
import QuizAnalysis from './pages/QuizAnalysis';
import Quizzes from './pages/Quizzes';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
         {/* Guest Routes */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Route>

          {/* Protected Routes for Students */}
          <Route element={<ProtectedRoute requiredRole="student" />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/dashboard/select-test" element={<SelectTest />} />
            <Route path="/dashboard/start-quiz" element={<StartQuiz />} />
            <Route path="/dashboard/results" element={<QuizResults />} />
            <Route path="/dashboard/quiz-analysis" element={<QuizAnalysis />} />
            <Route path="/dashboard/quizzes" element={<Quizzes />} />
          </Route>

          {/* Protected Routes for Faculty */}
          <Route element={<ProtectedRoute requiredRole="faculty" />}>
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/faculty/create-quiz" element={<CreateQuiz />} />
            <Route path="/faculty/update-quiz" element={<UpdateQuiz />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
