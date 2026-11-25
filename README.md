# Quiz Management System - MERN Stack

A complete quiz management system built with MongoDB, Express.js, React.js, and Node.js.

## Features
- User Authentication (JWT)
- Role-based access (Admin/Student)
- Quiz creation and management
- Real-time quiz taking
- Score calculation and results
- Responsive design

## How to Run

### Backend Setup
1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017/quizdb
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Start server: `npm run dev`

### Frontend Setup
1. Navigate to frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start React app: `npm start`

### Database
- Make sure MongoDB is running on your system
- Database will be created automatically

## Default Admin Account
- Email: admin@quiz.com
- Password: admin123

## API Endpoints
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/quizzes - Get all quizzes
- POST /api/quizzes - Create quiz (Admin only)
- GET /api/quizzes/:id - Get quiz by ID
- POST /api/results - Submit quiz result
- GET /api/results/user/:userId - Get user results

## Tech Stack
- **Frontend**: React.js, Axios, CSS3
- **Backend**: Node.js, Express.js, JWT
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT with bcrypt