import React, { useEffect, useState } from 'react';
import { Plus, Upload, Save, Trash2, Edit2 } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import QuestionForm from '../components/quiz/QuestionForm';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export default function UpdateQuiz() {
    const [quizData, setQuizData] = useState({
        category: '',
        title: '',
        subject: '',
        timeLimit: 60,
        difficulty: '',
    });

    
    const location = useLocation();
    const { _id } = location.state || {};
    const navigate = useNavigate()
    const [questions, setQuestions] = useState<Question[]>([]);
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [file, setfile] = useState()
    const [loading, setLoading] = useState(true);
    

    const categories = ['MCAT', 'ECAT', 'NTS', 'SAT', 'HAT'];
    const subjects = [ 'Mock','Physics', 'Chemistry', 'Biology', 'Mathematics', 'Critical Analysis', 'English'];
    const difficulty = ['Easy', 'Medium', 'Hard'];
    useEffect(() => {
       
        const { _id } = location.state || {};
        const user = localStorage.getItem('user');
        const userType = localStorage.getItem('userType');
        if (!user || userType !== 'faculty') {
            navigate('/');
        }

        const fetchQuiz = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/index/quiz/${_id}`);
              setQuizData(response.data.quizDetails);
              handleAddQuestion(response.data.questions)
            } catch (error) {
                if (error.response) {
                    const errorMessage = await error.response?.data?.message || 'An unexpected error occurred.';
                    alert(`Failed: ${errorMessage}`);
                } else {
                    // Fallback for errors that do not have a response
                    alert('An unexpected error occurred. Please try again later.');
                }
            } finally {
              setLoading(false);
            }
          };
      
          fetchQuiz();

    }, [_id,navigate]);

    const handleQuizDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuizData(prev => ({ ...prev, [name]: value }));
    };

    // const handleAddQuestion = (question: Question) => {
    //   if (editingQuestion) {
    //     setQuestions(questions.map(q => q.id === editingQuestion.id ? question : q));
    //     setEditingQuestion(null);
    //   } else {
    //     console.log(question)
    //     setQuestions([...questions, { ...question, id: Date.now().toString() }]);
    //   }
    //   setShowQuestionForm(false);
    // };



    const handleEditQuestion = (question: Question) => {
        setEditingQuestion(question);
        setShowQuestionForm(true);
    };

    const handleDeleteQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };








    const handleAddQuestion = (newQuestion: Question | Question[]) => {
        if (Array.isArray(newQuestion)) {
            // Add multiple questions
            const updatedQuestions = [
                ...questions,
                ...newQuestion.map(q => ({ ...q, id: Date.now().toString() + Math.random() })), // Unique ID for each question
            ];
            setQuestions(updatedQuestions);
        } else {
            // Add a single question
            const updatedQuestions = [...questions, { ...newQuestion, id: Date.now().toString() }];
            setQuestions(updatedQuestions);
            setShowQuestionForm(false);
        }
    };

    const fileadd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setfile(e.target.files?.[0]);
        if (!file) {
            console.error('No file selected');
            return;
        }

    }

    const handleFileUpload = async () => {


        try {
            const fileText = await file.text();
            const lines = fileText.split('\n').filter(line => line.trim());
            const parsedQuestions: Question[] = [];

            lines.forEach((line, index) => {
                const [question, option1, option2, option3, option4, correctAnswer, explanation] =
                    line.split(',');

                // Validate the format
                if (
                    !question ||
                    !option1 ||
                    !option2 ||
                    !option3 ||
                    !option4 ||
                    !correctAnswer ||
                    !explanation
                ) {
                    console.error(`Invalid format in line ${index + 1}: ${line}`);
                    return; // Skip this line
                }

                const parsedQuestion: Question = {
                    id: '', // Temporary, will be added in handleAddQuestion
                    question: question.trim(),
                    options: [option1.trim(), option2.trim(), option3.trim(), option4.trim()],
                    correctAnswer: parseInt(correctAnswer.trim(), 10), // Convert to number
                    explanation: explanation.trim(),
                };

                parsedQuestions.push(parsedQuestion);
            });

            if (parsedQuestions.length > 0) {
                handleAddQuestion(parsedQuestions); // Add all parsed questions at once
                console.log(`${parsedQuestions.length} questions added from the file.`);
            } else {
                alert('No valid questions found in the file.');
            }
        } catch (error) {
            console.error('Error reading the file:', error.message);
            alert('Failed to process the file. Please ensure it is in the correct format.');
        }
    };







    const handleSaveQuiz = async () => {
        const token = localStorage.getItem('token'); // Assuming the token is stored as 'token' in localStorage
        const user = JSON.parse(localStorage.getItem('user')); // Parse user data from localStorage

        if (!token) {
            alert('User not authenticated. Please log in again.');
            return;
        }

        const quiz = {
            ...quizData,
            questions,
            createdAt: new Date(),
            status: 'published',
        };



        try {



            // Configure headers with the token for authentication
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

           

            // Make the API call to save the quiz
            const response = await axios.post('http://localhost:5000/api/quiz/', { quiz, user }, config);

            // Handle success response
            alert('Quiz update successfully!');
            const result = await axios.delete(`http://localhost:5000/api/quiz/${_id}`,config)

            
            navigate(`/faculty`);
        } catch (error) {
            // Handle errors
            console.error('Error saving quiz:', error.response?.data || error.message);

            // Check if error.response exists and contains valid JSON
            if (error.response) {
                const errorMessage = await error.response?.data?.message || 'An unexpected error occurred.';
                alert(`Failed: ${errorMessage}`);
            } else {
                // Fallback for errors that do not have a response
                alert('An unexpected error occurred. Please try again later.');
            }
        }

    };


    if (loading) return <p>Loading...</p>;
    return (
        <DashboardLayout faculty='faculty'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">Update Quiz</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Fill in the quiz details and add questions below
                        </p>
                    </div>

                    {/* Quiz Details Form */}
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    University Category
                                </label>
                                <select
                                    name="category"
                                    value={quizData.category}
                                    onChange={handleQuizDataChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Difficulty Level
                                </label>
                                <select
                                    name="difficulty"
                                    value={quizData.difficulty}
                                    onChange={handleQuizDataChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Select Difficulty</option>
                                    {difficulty.map(diff => (
                                        <option key={diff} value={diff}>{diff}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <select
                                    name="subject"
                                    value={quizData.subject}
                                    onChange={handleQuizDataChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Quiz Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={quizData.title}
                                    onChange={handleQuizDataChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Enter quiz title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Time Limit (minutes)
                                </label>
                                <input
                                    type="number"
                                    name="timeLimit"
                                    value={quizData.timeLimit}
                                    onChange={handleQuizDataChange}
                                    min="1"
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Question Management */}
                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium text-gray-900">Questions</h2>
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                        <Upload className="h-5 w-5 mr-2" />
                                        Import CSV or Text
                                        <input
                                            type="file"
                                            accept=".csv"

                                            onChange={fileadd}
                                            className="hidden"
                                        />
                                    </label>
                                    <button
                                        onClick={handleFileUpload}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Get data from file
                                    </button>
                                    <button
                                        onClick={() => setShowQuestionForm(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Add Question
                                    </button>
                                </div>
                            </div>

                            {/* Question List */}
                            <div className="space-y-4">
                                {questions.map((q, index) => (
                                    <div
                                        key={q.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                    >
                                        <div className="flex-1">
                                            <span className="font-medium text-gray-900">
                                                {index + 1}. {q.question}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditQuestion(q)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                            >
                                                <Edit2 className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteQuestion(q.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleSaveQuiz}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                <Save className="h-5 w-5 mr-2" />
                                Save and Upadte Quiz
                            </button>
                        </div>
                    </div>
                </div>

                {/* Question Form Modal */}
                {showQuestionForm && (
                    <QuestionForm
                        onSubmit={handleAddQuestion}
                        onCancel={() => {
                            setShowQuestionForm(false);
                            setEditingQuestion(null);
                        }}
                        initialData={editingQuestion}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}