# ToDO (MERN Fullstack)

A **ToDo application** built with the **MERN stack (MongoDB, Express, ReactJD Node.js)**.  
The application allows users to add,delete,update tasks and display all the tasks
It allows users to:

- Add tasks
- Edit tasks
- Mark tasks as completed
- Delete tasks

The app communicates with a backend API (Node.js + Express + MongoDB) to persist todos.

---

## Features

-- Add a new task

- Edit an existing task (disabled if task is completed)
- Mark a task as **completed / not completed**
- Delete a task
- Auto refresh after each operation
- Simple UI

---

## Project Structure

```
backend/
│── Routes/
│ └── todo.route.js # Todo routes
│── Controller/
│ └── todo.controller.js # Route handlers
│── Model/
│ └── todo.model.js # Mongoose schema and model
│── server.js # Server entry point
│── package.json

frontend/
│── public/
│── src/
│ ├── App.js # Main React component
│ ├── App.css # Styling
│ └── index.js # Entry point
│── package.json

```

---

## Tech Stack

### 🔹 Frontend

- **Reactjs** – Frontend library

### 🔹 Backend

- **Node.js** – Backend runtime
- **Express.js** – API framework
- **MongoDB Atlas** – Database

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/G-Chandu-Balaji/Todos.git
cd Todos
```

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `backend/`:

```
PORT=5100
MONGO_URI=your_mongodb_connection_string
```

Run backend server:

```bash
npm start
```

Backend will start at 👉 `http://localhost:5100`

### 3️⃣ Frontend Setup

```bash
cd FrontEnd/TodoApp
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend will start at 👉 `http://localhost:5173`

---

---

## 📡 API Endpoints

### 🔹 todo Routes

- `GET /api/todos`-> Get all tasks
- `POST /api/todos` -> Add Task
- `PUT /api/todos/:id` -> Update Task
- `DELETE /api/todos/:id` -> Delete Task

---

Built with using React (frontend) and Node.js + Express + MongoDB Atlas (backend) by Gubbala Chandu Balaji
