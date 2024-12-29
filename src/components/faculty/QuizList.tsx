import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function QuizList({refresheffect}) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate()
  
  useEffect(() => {
    // Fetch quizzes from the API
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/quizzes'); // Corrected URL
        


        setQuizzes(response.data);
        
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes(); // Call the function when the component mounts
  }, [refreshKey]);


  const handleEditClick = (_id) => {
    navigate(`/faculty/update-quiz`, { state: { _id } }); // Passing quizId as state
  };
 const handleDelete = async (_id)=>{
  const token =localStorage.getItem('token')
  const confirmed = window.confirm("Are you sure you want to delete this quiz?");
  if (confirmed) {
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
  };
     await axios.delete(`http://localhost:5000/api/quiz/${_id}`,config)
  } else {
    return;
    
  }

  setRefreshKey((prevKey) => prevKey + 1);
  refresheffect();
 }



  if (loading) {
    return <div>Loading quizzes...</div>; // Show loading state while fetching
  }

  if (quizzes.length === 0) {
    return <div>No quizzes available.</div>; // Show message when no quizzes are found
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Manage Quizzes</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quiz Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Questions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attempts
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizzes.map((quiz) => (
              <tr key={quiz._id} className="hover:bg-gray-50"> {/* Changed quiz.id to quiz._id */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    quiz.difficulty === 'Hard' 
                      ? 'bg-red-100 text-red-800'
                      : quiz.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {quiz.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {quiz.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {quiz.questions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {quiz.timeLimit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {quiz.attempts}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    {/* <button className="text-gray-400 hover:text-gray-500">
                      <Eye className="h-5 w-5" />
                    </button> */}
                    <button className="text-blue-400 hover:text-blue-500"
                    onClick={() => handleEditClick(quiz._id)}
                    
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-red-400 hover:text-red-500"
                    onClick={()=>handleDelete(quiz._id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
