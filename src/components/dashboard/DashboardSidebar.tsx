import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  BarChart2, 
  User, 
  LogOut, 
  PenTool,
  Home,
  ShapesIcon
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
interface props {
  faculty :string
}


export default function DashboardSidebar({faculty}:props) {
  const { logout } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    {name:'Quizzes',icon:BookOpen,href:'/dashboard/quizzes'},
    { name: 'Select Test', icon: PenTool, href: '/dashboard/select-test' },
    
    // { name: 'Start Quiz', icon: PenTool, href: '/dashboard/start-quiz' },
    { name: 'Results', icon: BarChart2, href: '/dashboard/results' },
    // { name: 'Profile', icon: User, href: '/dashboard/profile' },
    
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4">
        <div className="flex items-center flex-shrink-0 px-4">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">TestPrep Pro</span>
        </div>
        <nav className="mt-8 flex-1 flex flex-col">
          <ul className="space-y-1 px-2">
            {faculty=='faculty'? (<li key={"Fculty"}>
                <Link
                  to={'/faculty'}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  <Home className="mr-3 h-5 w-5" />
                  Fculty
                </Link>
              </li>) : (navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )))}
          </ul>
          <div className="mt-auto px-2">
            <button
              onClick={logout}
              className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}