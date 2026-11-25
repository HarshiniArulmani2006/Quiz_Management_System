const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Quiz = require('./models/Quiz');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quizdb');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Quiz.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@quiz.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create student user
    const studentUser = new User({
      name: 'Student User',
      email: 'student@quiz.com',
      password: 'student123',
      role: 'student'
    });
    await studentUser.save();
    console.log('Student user created');

    // Create sample quiz
    const sampleQuiz = new Quiz({
      title: 'JavaScript Basics',
      description: 'Test your knowledge of JavaScript fundamentals',
      timeLimit: 15,
      createdBy: adminUser._id,
      questions: [
        {
          questionText: 'What is the correct way to declare a variable in JavaScript?',
          options: ['var myVar;', 'variable myVar;', 'v myVar;', 'declare myVar;'],
          correctAnswer: 0
        },
        {
          questionText: 'Which of the following is NOT a JavaScript data type?',
          options: ['String', 'Boolean', 'Float', 'Number'],
          correctAnswer: 2
        },
        {
          questionText: 'What does "DOM" stand for?',
          options: ['Document Object Model', 'Data Object Management', 'Dynamic Object Method', 'Document Oriented Model'],
          correctAnswer: 0
        },
        {
          questionText: 'Which method is used to add an element to the end of an array?',
          options: ['append()', 'push()', 'add()', 'insert()'],
          correctAnswer: 1
        },
        {
          questionText: 'What is the result of "2" + 2 in JavaScript?',
          options: ['4', '"22"', 'Error', 'undefined'],
          correctAnswer: 1
        }
      ]
    });
    await sampleQuiz.save();
    console.log('Sample quiz created');

    // Create another sample quiz
    const htmlQuiz = new Quiz({
      title: 'HTML & CSS Fundamentals',
      description: 'Basic questions about HTML and CSS',
      timeLimit: 10,
      createdBy: adminUser._id,
      questions: [
        {
          questionText: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
          correctAnswer: 0
        },
        {
          questionText: 'Which HTML tag is used for the largest heading?',
          options: ['<h6>', '<h1>', '<heading>', '<header>'],
          correctAnswer: 1
        },
        {
          questionText: 'What does CSS stand for?',
          options: ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
          correctAnswer: 2
        }
      ]
    });
    await htmlQuiz.save();
    console.log('HTML/CSS quiz created');

    console.log('Database seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@quiz.com / admin123');
    console.log('Student: student@quiz.com / student123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();