# 📋 TaskMaster - Full-Stack Task Manager

<div align="center">

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Version](https://img.shields.io/badge/Version-2.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, full-featured task management application built with the MERN stack featuring beautiful UI/UX, JWT authentication, and real-time task management.

[Live Demo](#) | [Report Bug](https://github.com/Kunalpantawane/task-manager-fullstack/issues) | [Request Feature](https://github.com/Kunalpantawane/task-manager-fullstack/issues)

</div>

---

## 🌟 Features

### ✨ Core Features
- 🔐 **Secure Authentication** - JWT-based user registration and login
- 📋 **Full CRUD Operations** - Create, read, update, and delete tasks
- 🎯 **Priority Management** - Organize tasks by priority (Low, Medium, High)
- ✅ **Task Status** - Mark tasks as complete or pending
- 🔍 **Smart Filtering** - Filter tasks by status (All, Pending, Completed)
- 👤 **User Isolation** - Each user's tasks are completely isolated and secure

### 🎨 UI/UX Features
- 🌈 **Modern Gradient Design** - Beautiful purple gradient theme
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🚀 **Smooth Animations** - Polished transitions and hover effects
- 💡 **Intuitive Interface** - Clean and easy-to-use dashboard
- 🎭 **Professional Landing Page** - Attractive welcome page with feature highlights

### 🛡️ Security Features
- 🔒 **Password Hashing** - Bcrypt encryption for secure password storage
- 🎫 **JWT Tokens** - Secure token-based authentication
- ✅ **Input Validation** - Comprehensive validation on frontend and backend
- 🔐 **Protected Routes** - Automatic redirect for unauthorized access
- 🚫 **XSS Protection** - Sanitized inputs to prevent attacks

---

## 🚀 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Modern CSS3** | Custom styling with gradients and animations |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express 5** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication tokens |
| **Bcrypt** | Password hashing |
| **Dotenv** | Environment variable management |
| **CORS** | Cross-origin resource sharing |

---

## 📁 Project Structure

```
task-manager-fullstack/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── Landing.jsx     # Landing/home page
│   │   │   ├── Login.jsx       # Login page
│   │   │   ├── Register.jsx    # Registration page
│   │   │   ├── Dashboard.jsx   # Main task dashboard
│   │   │   ├── Auth.css        # Auth pages styling
│   │   │   ├── Dashboard.css   # Dashboard styling
│   │   │   └── Landing.css     # Landing page styling
│   │   ├── config/
│   │   │   └── api.js          # API endpoint configuration
│   │   ├── App.js              # Main app component with routing
│   │   └── index.js            # React entry point
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── package.json            # Frontend dependencies
│   └── .gitignore
│
├── backend/                     # Node.js backend application
│   ├── controllers/            # Route controllers
│   │   ├── authController.js   # Authentication logic
│   │   └── taskController.js   # Task CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js             # User model
│   │   └── Task.js             # Task model with priority
│   ├── routes/                 # Express routes
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── taskRoutes.js       # Task endpoints
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── server.js               # Express server entry point
│   ├── .env                    # Environment variables (not in git)
│   ├── .env.example            # Environment template
│   ├── package.json            # Backend dependencies
│   └── .gitignore
│
└── README.md                    # This file
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Kunalpantawane/task-manager-fullstack.git
cd task-manager-fullstack
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_change_in_production
FRONTEND_URL=http://localhost:3000
```

> 💡 **For MongoDB Atlas**: Replace `MONGO_URI` with your connection string:
> ```
> MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager
> ```

Start the backend server:
```bash
npm start
```
✅ Backend will run on `http://localhost:5000`

### 3️⃣ Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm start
```
✅ Frontend will run on `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register new user | ❌ |
| POST | `/api/login` | Login user | ❌ |

### Task Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

### Utility Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | ❌ |

#### Request/Response Examples

**Register User**
```bash
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": {
    "id": "64abc123...",
    "email": "user@example.com"
  }
}
```

**Create Task**
```bash
POST /api/tasks
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "priority": "high"
}

Response: 201 Created
{
  "_id": "64def456...",
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "priority": "high",
  "completed": false,
  "user": "64abc123...",
  "createdAt": "2025-12-17T10:30:00.000Z"
}
```

---

## 🎯 Usage Guide

### For Users

1. **Registration**
   - Visit `http://localhost:3000`
   - Click "Get Started Free" or "Sign Up"
   - Enter email and password (min 6 characters)
   - Click "Create Account"

2. **Login**
   - Enter your registered email and password
   - Click "Sign In"
   - You'll be redirected to the dashboard

3. **Managing Tasks**
   - **Create**: Fill in the form on the left, select priority, and click "Add Task"
   - **Filter**: Use All/Pending/Completed buttons to filter tasks
   - **Complete**: Click "✅ Complete" to mark a task as done
   - **Undo**: Click "↩️ Undo" to mark as pending again
   - **Delete**: Click "🗑️ Delete" to remove a task

4. **Logout**
   - Click the "Logout" button in the header

---

## 🔒 Security Best Practices

✅ **Implemented:**
- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with 7-day expiration
- Protected API routes with middleware
- Input validation and sanitization
- CORS configured for specific origins
- Environment variables for sensitive data
- `.env` files excluded from version control

⚠️ **For Production Deployment:**
1. Change `JWT_SECRET` to a strong random string
2. Use MongoDB Atlas with strong credentials
3. Enable MongoDB network access restrictions
4. Set `NODE_ENV=production`
5. Use HTTPS for both frontend and backend
6. Implement rate limiting
7. Add helmet.js for security headers

---

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Create new web service
2. Connect your GitHub repository
3. Set environment variables
4. Deploy from `backend` directory

### Frontend (Vercel/Netlify)
1. Create new project
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable: `REACT_APP_API_URL=<your_backend_url>`

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```
Solution: Check your MONGO_URI in .env file
- For local: mongodb://localhost:27017/taskmanager
- For Atlas: Ensure IP is whitelisted and credentials are correct
```

**Frontend can't connect to Backend**
```
Solution: 
1. Ensure backend is running on port 5000
2. Check CORS settings in backend/server.js
3. Verify API_BASE_URL in frontend/src/config/api.js
```

**JWT Token Expired**
```
Solution: Token expires after 7 days. Simply login again.
```

---

## 🎓 Learning Outcomes

By exploring this project, you'll learn:

- ✅ Building full-stack applications with MERN stack
- ✅ Implementing JWT authentication flow
- ✅ Creating RESTful APIs with Express
- ✅ MongoDB schema design with Mongoose
- ✅ React Router v6 and protected routes
- ✅ State management in React
- ✅ HTTP requests with Axios
- ✅ Modern CSS with gradients and animations
- ✅ Responsive web design
- ✅ Environment variable management
- ✅ Error handling and validation
- ✅ Security best practices

---

## 👤 Author

**Kunal Pantawane**

- GitHub: [@Kunalpantawane](https://github.com/Kunalpantawane)
- LinkedIn: [Kunal Pantawane](https://www.linkedin.com/in/kunal-pantawane)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---




