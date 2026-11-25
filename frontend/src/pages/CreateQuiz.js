import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI } from '../utils/api';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    timeLimit: 30,
    questions: [
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]
  });

  const handleQuizChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex][field] = value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          questionText: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    });
  };

  const removeQuestion = (questionIndex) => {
    if (quizData.questions.length > 1) {
      const updatedQuestions = quizData.questions.filter((_, index) => index !== questionIndex);
      setQuizData({
        ...quizData,
        questions: updatedQuestions
      });
    }
  };

  const validateForm = () => {
    if (!quizData.title.trim()) {
      setError('Quiz title is required');
      return false;
    }
    
    if (!quizData.description.trim()) {
      setError('Quiz description is required');
      return false;
    }
    
    if (quizData.timeLimit < 1) {
      setError('Time limit must be at least 1 minute');
      return false;
    }

    for (let i = 0; i < quizData.questions.length; i++) {
      const question = quizData.questions[i];
      
      if (!question.questionText.trim()) {
        setError(`Question ${i + 1} text is required`);
        return false;
      }
      
      for (let j = 0; j < question.options.length; j++) {
        if (!question.options[j].trim()) {
          setError(`Question ${i + 1}, Option ${j + 1} is required`);
          return false;
        }
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await quizAPI.createQuiz(quizData);
      setSuccess('Quiz created successfully!');
      
      // Reset form
      setTimeout(() => {
        navigate('/quizzes');
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create quiz');
      console.error('Error creating quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Create New Quiz</h1>
      
      <div className="card">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* Quiz Basic Info */}
          <div className="form-group">
            <label className="form-label">Quiz Title</label>
            <input
              type="text"
              name="title"
              value={quizData.title}
              onChange={handleQuizChange}
              className="form-input"
              placeholder="Enter quiz title"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={quizData.description}
              onChange={handleQuizChange}
              className="form-textarea"
              placeholder="Enter quiz description"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Time Limit (minutes)</label>
            <input
              type="number"
              name="timeLimit"
              value={quizData.timeLimit}
              onChange={handleQuizChange}
              className="form-input"
              min="1"
              required
            />
          </div>

          {/* Questions */}
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Questions</h3>
          
          {quizData.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4>Question {questionIndex + 1}</h4>
                {quizData.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(questionIndex)}
                    className="btn btn-danger"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Question Text</label>
                <textarea
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
                  className="form-textarea"
                  placeholder="Enter your question"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Options</label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <input
                      type="radio"
                      name={`correct-${questionIndex}`}
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => handleQuestionChange(questionIndex, 'correctAnswer', optionIndex)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      className="form-input"
                      placeholder={`Option ${optionIndex + 1}`}
                      required
                      style={{ flex: 1 }}
                    />
                  </div>
                ))}
                <small style={{ color: '#666' }}>
                  Select the radio button next to the correct answer
                </small>
              </div>
            </div>
          ))}
          
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <button
              type="button"
              onClick={addQuestion}
              className="btn btn-secondary"
            >
              Add Another Question
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating Quiz...' : 'Create Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;