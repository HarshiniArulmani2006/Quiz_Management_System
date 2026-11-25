import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Quiz API functions
export const quizAPI = {
  // Get all quizzes
  getAllQuizzes: () => api.get('/quizzes'),
  
  // Get quiz by ID
  getQuizById: (id) => api.get(`/quizzes/${id}`),
  
  // Create quiz (Admin only)
  createQuiz: (quizData) => api.post('/quizzes', quizData),
  
  // Update quiz (Admin only)
  updateQuiz: (id, quizData) => api.put(`/quizzes/${id}`, quizData),
  
  // Delete quiz (Admin only)
  deleteQuiz: (id) => api.delete(`/quizzes/${id}`),
  
  // Get quiz with answers (Admin only)
  getQuizWithAnswers: (id) => api.get(`/quizzes/${id}/admin`)
};

// Result API functions
export const resultAPI = {
  // Submit quiz result
  submitResult: (resultData) => api.post('/results', resultData),
  
  // Get user results
  getUserResults: (userId) => api.get(`/results/user/${userId}`),
  
  // Get all results (Admin only)
  getAllResults: () => api.get('/results')
};

export default api;