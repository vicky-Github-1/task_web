# 🚀 Scalable Task API with Authentication & Dashboard

A full-stack web application built with **Node.js, Express, MongoDB, and React**, featuring secure authentication, role-based access control, and a task management system.

---

## 📌 Features

### 🔐 Authentication & Authorization

* User Registration & Login
* Password hashing using bcrypt
* JWT-based authentication
* Role-based access control (User & Admin)

### 📦 Task Management (CRUD)

* Create, Read, Update, Delete tasks
* Each user can manage their own tasks
* Admin can view all users' tasks

### 🌐 Frontend (React)

* User-friendly UI for login & registration
* Protected dashboard (JWT required)
* Perform CRUD operations on tasks
* Displays API success/error messages

### ⚙️ Backend (Express)

* RESTful API design
* API Versioning (`/api/v1`)
* Centralized error handling
* Middleware for authentication & roles

### 🔒 Security

* JWT token verification
* Input validation
* Secure password storage

### 📊 Scalability

* Modular folder structure
* Easily extendable for new modules
* Ready for microservices architecture
* Can integrate caching (Redis) & load balancing

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* Axios
* React Router

**Backend:**

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose

---

## 📁 Project Structure

```bash
root/
 ├── backend/
 └── frontend/
```

---

## ⚡ API Endpoints

### 🔐 Auth

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### 📦 Tasks

* `GET /api/v1/tasks`
* `POST /api/v1/tasks`
* `PUT /api/v1/tasks/:id`
* `DELETE /api/v1/tasks/:id`

### 👑 Admin

* `GET /api/v1/tasks/all` (Admin only)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/vicky-Github-1/task_web
cd task_web
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Deployment

* **Frontend:** Netlify
* **Backend:**  Render
* **Database:** MongoDB Atlas

---

## 🧪 API Testing

Use **Postman** to test APIs with JWT token in headers:

```
Authorization: <your_token>
```

---

## 📌 Future Improvements

* Add pagination & search
* Implement refresh tokens
* Add Docker support
* Add unit & integration tests

---

## 👨‍💻 Author

**Vicky**

---

## ⭐ Note

This project was built as part of a backend developer assignment to demonstrate scalable API design, authentication, and full-stack integration.
