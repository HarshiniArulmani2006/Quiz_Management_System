import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { quizAPI, resultAPI } from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    completedQuizzes: 0,
    averageScore: 0
  });
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch quizzes
      const quizzesResponse = await quizAPI.getAllQuizzes();
      const totalQuizzes = quizzesResponse.data.length;

      // Fetch user results
      const resultsResponse = await resultAPI.getUserResults(user.id);
      const userResults = resultsResponse.data;
      
      const completedQuizzes = userResults.length;
      const averageScore = userResults.length > 0 
        ? Math.round(userResults.reduce((sum, result) => sum + (result.score / result.totalQuestions * 100), 0) / userResults.length)
        : 0;

      setStats({
        totalQuizzes,
        completedQuizzes,
        averageScore
      });

      // Get recent results (last 5)
      setRecentResults(userResults.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">
        Welcome back, {user?.name}!
      </h1>
      
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalQuizzes}</div>
          <div className="stat-label">Available Quizzes</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.completedQuizzes}</div>
          <div className="stat-label">Completed Quizzes</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.averageScore}%</div>
          <div className="stat-label">Average Score</div>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ color: 'white', marginBottom: '2rem' }}>Quick Actions</h2>
        <div className="dashboard-grid">
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Take a Quiz</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Test your knowledge with our available quizzes
            </p>
            <Link to="/quizzes" className="btn btn-primary">
              Browse Quizzes
            </Link>
          </div>
          
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>View Results</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Check your quiz performance and scores
            </p>
            <Link to="/results" className="btn btn-secondary">
              My Results
            </Link>
          </div>
          
          {user?.role === 'admin' && (
            <div className="card">
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>Create Quiz</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Create new quizzes for students
              </p>
              <Link to="/create-quiz" className="btn btn-success">
                Create Quiz
              </Link>
            </div>
          )}
        </div>
      </div>

      {recentResults.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ color: 'white', marginBottom: '2rem' }}>Recent Results</h2>
          <div className="card">
            {recentResults.map((result) => (
              <div key={result._id} className="result-card">
                <div className="result-header">
                  <h4>{result.quiz.title}</h4>
                  <div className="result-score">
                    {result.score}/{result.totalQuestions} ({Math.round((result.score / result.totalQuestions) * 100)}%)
                  </div>
                </div>
                <div className="result-details">
                  Completed on {new Date(result.completedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;