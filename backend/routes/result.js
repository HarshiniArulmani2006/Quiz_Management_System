const express = require('express');
const Result = require('../models/Result');
const Quiz = require('../models/Quiz');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Submit quiz result
router.post('/', auth, async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;

    // Get quiz with correct answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let score = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers.find(a => a.questionId.toString() === question._id.toString());
      if (userAnswer && userAnswer.selectedAnswer === question.correctAnswer) {
        score++;
      }
    });

    // Save result
    const result = new Result({
      user: req.user._id,
      quiz: quizId,
      answers,
      score,
      totalQuestions,
      timeTaken
    });

    await result.save();

    res.status(201).json({
      message: 'Quiz submitted successfully',
      result: {
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        timeTaken
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user results
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.params.userId })
      .populate('quiz', 'title description')
      .sort({ completedAt: -1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all results (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const results = await Result.find()
      .populate('user', 'name email')
      .populate('quiz', 'title')
      .sort({ completedAt: -1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;