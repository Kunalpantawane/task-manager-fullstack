# ✅ Task Manager App – Fullstack (React + Node.js + MongoDB)

A full-featured Task Manager web app built using **React.js (Frontend)**, **Node.js + Express (Backend)**, and **MongoDB (Database)**.

The application is designed to allow users to register, log in, and manage their personal tasks with a clean and responsive UI.

---

## 🚀 Features

- 🔐 User registration and login with JWT
- 📌 Secure password hashing with `bcrypt`
- 📋 Create, Read, Update, Delete tasks
- 🔁 User-specific tasks (only you can access yours)
- ⚛️ React frontend with React Router
- 🌐 Axios for API requests
- 🎨 Responsive UI (mobile and desktop)

---
## ✅ Project Status

**✅ Fully functional** — both frontend and backend completed.  
You can register/login, get your token, and perform all CRUD operations on your tasks with real-time database updates.

---


## ⚙️ Tech Stack

| Layer         | Technology                  |
|---------------|-----------------------------|
| Frontend      | React.js                    |
|               | React Router DOM            |
|               | Axios                       |
|               | Tailwind CSS                |
| Backend       | Node.js + Express.js        |
| Database      | MongoDB Atlas               |
| Auth          | JWT (JSON Web Token)        |
| Styling       | Basic CSS (can be extended) |
| API Testing   | Hoppscotch/Postman          |

---

## 📁 Folder Structure (Simplified)

```
task-manager-fullstack/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── App.js
│   └── public/
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
└── README.md
```

---
 Configure Environment Variables

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

> 🔒 Note: `.env` is already included in `.gitignore` and will not be uploaded to GitHub.
```
---

## 💻 Getting Started

### Clone the Repo

```bash
git clone https://github.com/Kunalpantawnane/task-manager-fullstack.git
cd task-manager-fullstack
```

### Run Frontend

```bash
cd frontend
npm install
npm start
```

### Backend 

```bash
cd backend
npm install
node server.js
npm start


```
⚠️ Make sure MongoDB is connected (Atlas or local)
---


Then open:  
📍 `http://localhost:3000` (Frontend)  
📍 `http://localhost:5000` (Backend API)

---

## 📌 Important Note

> 🔧 Some parts of the frontend UI (task list, logout button, etc.) are minimal and can be improved.  
> 🚧 Backend is **functionally complete**, but additional validations and frontend integrations can still be added later.

---

## 📬 API Endpoints

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | `/api/register`  | Register a new user    |
| POST   | `/api/login`     | Login user, returns JWT|
| POST   | `/api/tasks`     | Create a new task      |
| GET    | `/api/tasks`     | Get user’s tasks       |
| PUT    | `/api/tasks/:id` | Update task by ID      |
| DELETE | `/api/tasks/:id` | Delete task by ID      |

> All `/api/tasks` routes are **protected**, require `Authorization: Bearer <token>` in headers.

---

## 🎓 Learning Outcomes

- ✅ How to build full-stack apps using MERN
- ✅ How to secure APIs with JWT
- ✅ MongoDB integration with Mongoose
- ✅ Routing & State Handling in React

---

## 🏁 Final Status

✅ **Project Completed and Tested**  
📦 Ready for improvements or deployment!

---
## ✨ Upcoming Features (To Be Added)

- 🔐 Authenticated task management
- 🧾 User-specific task history
- ✅ Mark tasks complete/incomplete
- 🔄 Auto-refresh after actions
- 📦 Deployment to Vercel + Render

---


## 👤 Author

Made by **Kunal Pantawane**  
[GitHub](https://github.com/Kunalpantawane) | [LinkedIn](https://www.linkedin.com/in/kunal-pantawane)

---

## 📄 License

This project is open source and free to use for learning and educational purposes.
