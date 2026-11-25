import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizAPI } from '../utils/api';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await quizAPI.getAllQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      setError('Failed to fetch quizzes');
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading quizzes...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Available Quizzes</h1>
      
      {quizzes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>No quizzes available</h3>
          <p style={{ color: '#666' }}>Check back later for new quizzes!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>
                  {quiz.title}
                </h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  {quiz.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    <span style={{ marginRight: '1rem' }}>
                      📝 {quiz.questions.length} questions
                    </span>
                    <span style={{ marginRight: '1rem' }}>
                      ⏱️ {quiz.timeLimit} minutes
                    </span>
                    <span>
                      👨‍🏫 By {quiz.createdBy?.name || 'Admin'}
                    </span>
                  </div>
                </div>
                
                <Link 
                  to={`/quiz/${quiz._id}`} 
                  className="btn btn-primary"
                  style={{ width: 'auto' }}
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;