import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI, resultAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz) {
      handleSubmit();
    }
  }, [timeLeft, quiz]);

  const fetchQuiz = async () => {
    try {
      const response = await quizAPI.getQuizById(id);
      const quizData = response.data;
      setQuiz(quizData);
      setTimeLeft(quizData.timeLimit * 60); // Convert minutes to seconds
    } catch (error) {
      setError('Failed to load quiz');
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers({
      ...answers,
      [questionId]: selectedAnswer
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    
    setSubmitting(true);
    
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer: parseInt(selectedAnswer)
      }));

      const timeTaken = (quiz.timeLimit * 60) - timeLeft;

      const response = await resultAPI.submitResult({
        quizId: id,
        answers: formattedAnswers,
        timeTaken
      });

      // Navigate to results page with the result data
      navigate('/results', { 
        state: { 
          justCompleted: true, 
          result: response.data.result,
          quizTitle: quiz.title
        } 
      });
      
    } catch (error) {
      setError('Failed to submit quiz');
      console.error('Error submitting quiz:', error);
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="loading">Loading quiz...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container">
        <div className="error-message">Quiz not found</div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="container">
      <div className="quiz-header">
        <h1 className="page-title">{quiz.title}</h1>
        <div className="quiz-timer">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="question-card">
        <div className="question-number">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </div>
        
        <h3 className="question-text">{currentQ.questionText}</h3>
        
        <ul className="options-list">
          {currentQ.options.map((option, index) => (
            <li key={index} className="option-item">
              <label 
                className={`option-label ${
                  answers[currentQ._id] === index ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQ._id}`}
                  value={index}
                  checked={answers[currentQ._id] === index}
                  onChange={() => handleAnswerChange(currentQ._id, index)}
                  className="option-input"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '2rem'
      }}>
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn btn-secondary"
        >
          Previous
        </button>

        <div style={{ color: 'white', fontWeight: 'bold' }}>
          {Object.keys(answers).length} / {quiz.questions.length} answered
        </div>

        {currentQuestion === quiz.questions.length - 1 ? (
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className="btn btn-success"
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="btn btn-primary"
          >
            Next
          </button>
        )}
      </div>

      {/* Question Navigation */}
      <div style={{ 
        marginTop: '2rem', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.5rem',
        justifyContent: 'center'
      }}>
        {quiz.questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`btn ${
              index === currentQuestion 
                ? 'btn-primary' 
                : answers[quiz.questions[index]._id] !== undefined 
                  ? 'btn-success' 
                  : 'btn-secondary'
            }`}
            style={{ 
              minWidth: '40px', 
              padding: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TakeQuiz;