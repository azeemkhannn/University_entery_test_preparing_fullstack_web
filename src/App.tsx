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
import { AuthProvider } from './hooks/useAuth';
import UpdateQuiz from './pages/FacultyEditQuiz';
import QuizAnalysis from './pages/QuizAnalysis';
import Quizzes from './pages/Quizzes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/create-quiz" element={<CreateQuiz />} />
          <Route path='/faculty/update-quiz' element={<UpdateQuiz/>}/>
          <Route path="/dashboard/select-test" element={<SelectTest />} />
          <Route path="/dashboard/start-quiz" element={<StartQuiz />} />
          <Route path="/dashboard/results" element={<QuizResults />} />
          <Route path='/dashboard/quiz-analysis' element={<QuizAnalysis/>}/>
          <Route path="/dashboard/quizzes" element={<Quizzes />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;