import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="navbar-brand">
          Quiz Management System
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          
          {user?.role === 'admin' && (
            <li>
              <Link to="/create-quiz" className="nav-link">
                Create Quiz
              </Link>
            </li>
          )}
          
          <li>
            <Link to="/quizzes" className="nav-link">
              Take Quiz
            </Link>
          </li>
          
          <li>
            <Link to="/results" className="nav-link">
              My Results
            </Link>
          </li>
          
          <li>
            <span className="nav-link" style={{ color: '#667eea' }}>
              Welcome, {user?.name}
            </span>
          </li>
          
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;