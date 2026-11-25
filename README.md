
# Quiz Management System – MERN Stack

A full-stack **Quiz Management System** developed using the MERN stack to simplify online quiz creation, management, participation, and performance evaluation. The application provides separate access for Admins and Students, ensuring secure authentication and role-based functionality.

## Key Features

- **User Authentication:** Secure registration and login using JWT and bcrypt password hashing.
- **Role-Based Access:** Separate dashboards and permissions for Admin and Student users.
- **Quiz Management:** Admins can create, update, manage, and organize quizzes.
- **Online Quiz Participation:** Students can attend quizzes through an interactive interface.
- **Automatic Evaluation:** Automatically calculates scores based on submitted answers.
- **Result Management:** Stores quiz results and allows students to track their performance.
- **Responsive UI:** User-friendly interface accessible across different screen sizes.

##  Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| React.js | Frontend development and user interface |
| Node.js | Backend runtime environment |
| Express.js | REST API development and server-side routing |
| MongoDB | Database for storing users, quizzes, and results |
| Mongoose | MongoDB schema and data management |
| Axios | API communication between frontend and backend |
| JWT | Secure user authentication |
| bcrypt | Password hashing and security |
| CSS3 | Responsive styling and UI design |

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd quiz-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGODB_URI=mongodb://localhost:27017/quizdb
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm start
```

### 4. Database Configuration

- Ensure MongoDB is installed and running.
- The `quizdb` database and required collections are created automatically when data is stored.

##  Default Admin Credentials

- **Email:** admin@quiz.com
- **Password:** admin123

##  API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user |
| GET | `/api/quizzes` | Retrieve available quizzes |
| POST | `/api/quizzes` | Create a quiz (Admin only) |
| GET | `/api/quizzes/:id` | Retrieve a specific quiz |
| POST | `/api/results` | Submit quiz results |
| GET | `/api/results/user/:userId` | Retrieve user performance |

##  Application Workflow

1. Users register or log in through secure authentication.
2. The system identifies their role and provides the appropriate dashboard.
3. Admins create and manage quizzes with questions and answers.
4. Students access available quizzes and submit their responses.
5. The backend evaluates answers and calculates scores automatically.
6. Results are stored in MongoDB for future performance tracking.

##  Project Objective

To develop a secure, interactive, and user-friendly online assessment platform that simplifies quiz administration, automates evaluation, and enables students to monitor their learning performance.
