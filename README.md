# 🎓 Skill Learning Academy Marketplace

A **Full Stack Web Application** for an online skill learning marketplace with secure authentication, role-based access, course management, and student enrollment.

> Built with **React.js** (Frontend) and **Node.js + Express + MongoDB** (Backend)

---

## 📸 Screenshots

### Home Page
- Hero section with background image overlay
- Statistics bar (10,000+ students, 500+ courses, 150+ instructors)
- Feature cards with images
- Call-to-action section

### Courses Page
- Course cards with images, descriptions, pricing
- Enroll button for students
- Dynamic data from backend API

### Login & Register
- Premium card-based UI
- Form validation and error handling
- Role selection (Student / Instructor)
- Connected navigation between Login ↔ Register

### Student Dashboard
- Personalized welcome header
- Stats cards (enrolled courses, learning hours, certificates, streaks)
- Enrolled courses grid with continue button

### Instructor Dashboard
- Course management panel
- Stats (total courses, students, revenue)
- Create & delete courses
- Link to Create Course page

---

## 🛠️ Tech Stack

| Layer        | Technology                                      |
|-------------|--------------------------------------------------|
| **Frontend** | React.js, React Router DOM, Axios               |
| **Backend**  | Node.js, Express.js                              |
| **Database** | MongoDB (Mongoose ODM)                           |
| **Auth**     | JWT (JSON Web Tokens), bcrypt.js                 |
| **Styling**  | CSS + Inline Styles (Inter font from Google Fonts)|

---

## 📁 Project Structure

```
project 1/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                # User schema (name, email, password, role)
│   │   ├── Course.js              # Course schema (title, description, price, instructor)
│   │   └── Enrollment.js          # Enrollment schema (student, course)
│   ├── routes/
│   │   ├── authRoutes.js          # POST /register, POST /login
│   │   ├── courseRoutes.js         # GET, POST, DELETE /courses
│   │   └── enrollmentRoutes.js    # POST /enroll, GET /mycourses
│   ├── .env                       # Environment variables
│   ├── server.js                  # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js           # Navigation bar with role-based links
│   │   │   └── PrivateRoute.js     # Protected route wrapper
│   │   ├── pages/
│   │   │   ├── Home.js             # Landing page with hero, stats, features
│   │   │   ├── Courses.js          # Browse & enroll in courses
│   │   │   ├── CourseDetail.js     # View course curriculum & progress
│   │   │   ├── LessonView.js       # Interactive lesson reading flow
│   │   │   ├── Quiz.js             # Take an MCQ quiz to finish
│   │   │   ├── Certificate.js      # Claim and view generated certificate
│   │   │   ├── Login.js            # User login with API integration
│   │   │   ├── Register.js         # User registration with role selection
│   │   │   ├── StudentDashboard.js # Student's enrolled courses & stats
│   │   │   ├── InstructorDashboard.js # Instructor's course management
│   │   │   └── CreateCourse.js     # Course creation form
│   │   ├── App.js                  # Main app with all routes
│   │   ├── index.js                # React entry point
│   │   ├── index.css               # Global styles
│   │   └── utils.js                # Helper utilities
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher) — [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas) — [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd "project 1"
```

#### 2. Setup Backend

```bash
cd backend
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the `backend/` folder (or edit the existing one):

```env
MONGO_URI=mongodb://127.0.0.1:27017/skillacademy
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

> **Note:** Replace `MONGO_URI` with your MongoDB Atlas connection string if using cloud database.

#### 4. Setup Frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Application

### 1. Fix Frontend Dependencies (Run this if you get module errors)

If the frontend fails to start or build (e.g. `react-scripts`, `webpack`, or `@babel` not found), run this complete command in the `frontend` folder to forcefully clean and reinstall everything properly:

```bash
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm install --force
```

*(Note: Use `move node_modules node_modules_corrupt` instead of `rmdir` if `rmdir` fails due to permissions).*

### 2. Start Backend Server (Port 5000)

Open a terminal and run:

```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected Successfully
```

### 3. Start Frontend Server (Port 3000)

Open a **new, second terminal window** and run:

```bash
cd frontend
npm start
```

The React app will open automatically at **http://localhost:3000**

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint               | Description          | Auth Required |
|--------|------------------------|----------------------|---------------|
| POST   | `/api/auth/register`   | Register new user    | No            |
| POST   | `/api/auth/login`      | Login user           | No            |

**Register Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Student"
}
```

**Login Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Courses

| Method | Endpoint            | Description          | Auth Required |
|--------|---------------------|----------------------|---------------|
| GET    | `/api/courses`      | Get all courses      | No            |
| POST   | `/api/courses`      | Create a course      | Yes (Instructor) |
| DELETE | `/api/courses/:id`  | Delete a course      | Yes (Instructor) |

**Create Course Body:**
```json
{
  "title": "React Complete Guide",
  "description": "Learn React from scratch",
  "price": 49.99
}
```

### Enrollment

| Method | Endpoint                  | Description              | Auth Required |
|--------|---------------------------|--------------------------|---------------|
| POST   | `/api/enroll`             | Enroll in a course       | Yes (Student)  |
| GET    | `/api/enroll/mycourses`   | Get enrolled courses     | Yes (Student)  |

**Enroll Body:**
```json
{
  "courseId": "course_id_here"
}
```

---

## 👥 User Roles

| Role           | Capabilities                                              |
|----------------|-----------------------------------------------------------|
| **Student**    | Browse courses, enroll, view dashboard, track progress     |
| **Instructor** | Create courses, delete courses, view instructor dashboard  |

---

## 🔐 Authentication Flow

1. **Register** → User creates account with name, email, password, role
2. **Login** → User receives a JWT token stored in `localStorage`
3. **Protected Routes** → Token is sent in `Authorization: Bearer <token>` header
4. **Logout** → Token and user data cleared from `localStorage`

---

## 📄 Features

- ✅ **Secure Authentication** — JWT-based login/register with bcrypt password hashing
- ✅ **Role-Based Access** — Student and Instructor dashboards
- ✅ **Course Marketplace** — Browse, create, and enroll in courses
- ✅ **Interactive Learning Flow** — Step-by-step interactive lesson reading system with smart Next/Previous navigation
- ✅ **MCQ Quizzes & Certification** — Users can test their knowledge and earn a digital certificate
- ✅ **Responsive Design** — Works on desktop and mobile
- ✅ **Premium UI** — Modern gradients, glassmorphism, Inter font, micro-animations
- ✅ **API Integration** — Full REST API with Express.js
- ✅ **MongoDB Database** — Mongoose ODM with proper schemas and relationships
- ✅ **Error Handling** — Form validation, API error messages, loading states
- ✅ **Connected Navigation** — All pages linked via React Router

---

## 🧪 Testing the App

1. Open **http://localhost:3000** in your browser
2. Click **Register** and create a **Student** account
3. Browse the **Courses** page and click **Enroll Now**
4. In the Course Detail page, scroll to **Course Content** and click on a lesson
5. **Read the lesson** and use the **Next Lesson ➔** buttons to navigate seamlessly until you reach the **Quiz**
6. Complete the Quiz to earn a digital certificate!
7. Go to **Student Dashboard** to see your enrolled courses and certificate
8. **Logout**, then register as an **Instructor**
9. Go to **Instructor Dashboard** → **Create New Course**
10. Fill in course details and publish
11. Check the **Courses** page — your new course should appear!

---

## ⚠️ Troubleshooting

| Issue                          | Solution                                          |
|--------------------------------|---------------------------------------------------|
| `EADDRINUSE: port 5000`       | Run `npx kill-port 5000` then restart backend     |
| `MongoDB Connection Error`    | Make sure MongoDB is running locally               |
| `react-scripts not found`     | Run `npm install` in the frontend folder           |
| Blank page after login        | Clear `localStorage` in browser DevTools → Application |

---

## 📝 License

This project is for educational purposes.

---

## 🙏 Acknowledgements

- [React.js](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Unsplash](https://unsplash.com/) — Free Images
- [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)


## local host link
Frontend (Website): http://localhost:3000/
Backend (API): http://localhost:5000

## public local area network
Frontend (Website): http://192.168.0.143:3000/
