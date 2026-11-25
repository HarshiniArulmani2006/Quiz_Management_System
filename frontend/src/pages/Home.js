import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-container">
      <div className="card auth-card">
        <h1 className="card-title">Welcome to Quiz Management System</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Test your knowledge with our interactive quiz platform
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <Link to="/login" className="btn btn-primary btn-full">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary btn-full">
            Sign Up
          </Link>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Features:</h3>
          <ul style={{ color: '#666', lineHeight: '1.6' }}>
            <li>Create and manage quizzes</li>
            <li>Take interactive quizzes</li>
            <li>Track your progress</li>
            <li>Admin panel for quiz management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;