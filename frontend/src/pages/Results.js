import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resultAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Results = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user just completed a quiz
  const justCompleted = location.state?.justCompleted;
  const latestResult = location.state?.result;
  const quizTitle = location.state?.quizTitle;

  useEffect(() => {
    fetchResults();
  }, [user]);

  const fetchResults = async () => {
    try {
      const response = await resultAPI.getUserResults(user.id);
      setResults(response.data);
    } catch (error) {
      setError('Failed to fetch results');
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#28a745';
    if (percentage >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  if (loading) {
    return <div className="loading">Loading results...</div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">My Quiz Results</h1>
      
      {/* Show latest result if just completed */}
      {justCompleted && latestResult && (
        <div className="card" style={{ marginBottom: '2rem', border: '3px solid #28a745' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#28a745', marginBottom: '1rem' }}>
              🎉 Quiz Completed!
            </h2>
            <h3 style={{ marginBottom: '1rem' }}>{quizTitle}</h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div className="stat-card">
                <div className="stat-number" style={{ color: getScoreColor(latestResult.percentage) }}>
                  {latestResult.score}/{latestResult.totalQuestions}
                </div>
                <div className="stat-label">Score</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number" style={{ color: getScoreColor(latestResult.percentage) }}>
                  {latestResult.percentage}%
                </div>
                <div className="stat-label">Percentage</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number" style={{ color: getScoreColor(latestResult.percentage) }}>
                  {getGrade(latestResult.percentage)}
                </div>
                <div className="stat-label">Grade</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">
                  {Math.floor(latestResult.timeTaken / 60)}:{(latestResult.timeTaken % 60).toString().padStart(2, '0')}
                </div>
                <div className="stat-label">Time Taken</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      
      {results.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>No quiz results yet</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Take your first quiz to see results here!
          </p>
          <a href="/quizzes" className="btn btn-primary">
            Browse Quizzes
          </a>
        </div>
      ) : (
        <div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div className="stat-card">
              <div className="stat-number">{results.length}</div>
              <div className="stat-label">Total Quizzes</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">
                {Math.round(results.reduce((sum, result) => 
                  sum + (result.score / result.totalQuestions * 100), 0) / results.length)}%
              </div>
              <div className="stat-label">Average Score</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">
                {Math.max(...results.map(result => 
                  Math.round((result.score / result.totalQuestions) * 100)))}%
              </div>
              <div className="stat-label">Best Score</div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Quiz History</h3>
            {results.map((result) => {
              const percentage = Math.round((result.score / result.totalQuestions) * 100);
              return (
                <div key={result._id} className="result-card">
                  <div className="result-header">
                    <div>
                      <h4 style={{ marginBottom: '0.5rem' }}>{result.quiz.title}</h4>
                      <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                        {result.quiz.description}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div 
                        className="result-score" 
                        style={{ color: getScoreColor(percentage) }}
                      >
                        {result.score}/{result.totalQuestions}
                      </div>
                      <div style={{ fontSize: '1rem', color: getScoreColor(percentage) }}>
                        {percentage}% ({getGrade(percentage)})
                      </div>
                    </div>
                  </div>
                  
                  <div className="result-details">
                    <span style={{ marginRight: '1rem' }}>
                      📅 {new Date(result.completedAt).toLocaleDateString()}
                    </span>
                    <span style={{ marginRight: '1rem' }}>
                      ⏱️ {Math.floor(result.timeTaken / 60)}:{(result.timeTaken % 60).toString().padStart(2, '0')}
                    </span>
                    <span>
                      🕒 {new Date(result.completedAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;