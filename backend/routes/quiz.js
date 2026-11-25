const express = require('express');
const Quiz = require('../models/Quiz');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all quizzes
router.get('/', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isActive: true })
      .select('-questions.correctAnswer')
      .populate('createdBy', 'name');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get quiz by ID (for taking quiz)
router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .select('-questions.correctAnswer')
      .populate('createdBy', 'name');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get quiz with answers (for admin)
router.get('/:id/admin', adminAuth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'name');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create quiz (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, description, timeLimit, questions } = req.body;

    const quiz = new Quiz({
      title,
      description,
      timeLimit,
      questions,
      createdBy: req.user._id
    });

    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update quiz (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz updated successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete quiz (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;