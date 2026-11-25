# Quiz Management System - Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Git (optional)

## Step-by-Step Setup

### 1. Backend Setup

1. Open terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running on your system
   - If using local MongoDB: Start MongoDB service
   - If using MongoDB Atlas: Update the MONGODB_URI in .env file

4. Seed the database with sample data:
   ```bash
   node seed.js
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The backend will run on http://localhost:5000

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   
   The frontend will run on http://localhost:3000

## Default Login Credentials

### Admin Account
- Email: admin@quiz.com
- Password: admin123

### Student Account
- Email: student@quiz.com
- Password: student123

## Features Overview

### For Students:
- Register/Login
- View available quizzes
- Take quizzes with timer
- View results and history
- Track performance

### For Admins:
- All student features
- Create new quizzes
- Add multiple choice questions
- Manage quiz settings
- View all results

## Project Structure

### Backend (/backend)
```
├── config/          # Database configuration
├── controllers/     # Route handlers (not used in this simple version)
├── middleware/      # Authentication middleware
├── models/          # MongoDB schemas
├── routes/          # API routes
├── .env            # Environment variables
├── server.js       # Main server file
└── seed.js         # Database seeder
```

### Frontend (/frontend)
```
├── public/         # Static files
├── src/
│   ├── components/ # Reusable components
│   ├── context/    # React context (Auth)
│   ├── pages/      # Page components
│   ├── utils/      # API utilities
│   ├── App.js      # Main app component
│   ├── App.css     # Styles
│   └── index.js    # Entry point
```

## API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login

### Quizzes
- GET /api/quizzes - Get all quizzes
- GET /api/quizzes/:id - Get quiz by ID
- POST /api/quizzes - Create quiz (Admin only)
- PUT /api/quizzes/:id - Update quiz (Admin only)
- DELETE /api/quizzes/:id - Delete quiz (Admin only)

### Results
- POST /api/results - Submit quiz result
- GET /api/results/user/:userId - Get user results
- GET /api/results - Get all results (Admin only)

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check the MONGODB_URI in .env file

2. **Port Already in Use**
   - Change PORT in backend/.env file
   - Update API_BASE_URL in frontend/src/utils/api.js

3. **CORS Issues**
   - Make sure backend is running on port 5000
   - Check if frontend is making requests to correct backend URL

4. **Authentication Issues**
   - Clear browser localStorage
   - Check if JWT_SECRET is set in .env

## Development Tips

1. **Adding New Features:**
   - Backend: Add routes in /routes, models in /models
   - Frontend: Add pages in /pages, components in /components

2. **Styling:**
   - All styles are in App.css
   - Uses CSS Grid and Flexbox for responsive design

3. **State Management:**
   - Uses React Context for authentication
   - Local state for component-specific data

## Production Deployment

1. **Backend:**
   - Set production MongoDB URI
   - Change JWT_SECRET to a secure value
   - Set NODE_ENV=production

2. **Frontend:**
   - Update API_BASE_URL to production backend URL
   - Run `npm run build`
   - Serve build folder with a web server

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- CORS configuration
- Role-based access control