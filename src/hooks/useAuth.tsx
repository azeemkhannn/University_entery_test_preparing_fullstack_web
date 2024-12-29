import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'student' | 'faculty' | null;
  login: (type: 'student' | 'faculty') => void;
  logout: () => void;
  register: (type: 'student' | 'faculty', userInfo: { name: string; email: string }) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'student' | 'faculty' | null>(null);
  const navigate = useNavigate();

  const login = useCallback(
    (type: 'student' | 'faculty') => {
      setIsAuthenticated(true);
      setUserType(type);
      localStorage.setItem('userType', type);
      navigate(type === 'student' ? '/dashboard' : '/faculty');
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem('userType');
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage
    navigate('/');
  }, [navigate]);

  const register = useCallback(
    (type: 'student' | 'faculty') => {
      
      // Optionally, log in the user after registration
      setIsAuthenticated(true);
      setUserType(type);
      localStorage.setItem('userType', type);
      navigate(type === 'student' ? '/dashboard' : '/faculty');
    },
    [navigate]
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
