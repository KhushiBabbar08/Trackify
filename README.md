# 🚀 Trackify - Task Management System

Trackify is a full-stack task management application where admins can assign tasks, track progress, and manage statuses.

---

## 🏗️ Tech Stack

### Backend
- .NET Core Web API
- C#
- SQL Server

### Frontend
- React JS
- Material UI (MUI)
- Axios

---

## 📁 Project Structure

Trackify/
├── backend/ # .NET Core Web API
├── frontend/ # React Application

## ⚙️ Features

- ✅ Create, update, and delete tasks
- ✅ Assign tasks to users
- ✅ Track task status
- ✅ Status master management
- ✅ RESTful APIs
- ✅ Responsive UI with DataGrid

---

## 🚀 Getting Started

### 🔹 Prerequisites
- Node.js
- .NET SDK
- SQL Server

---

### ▶️ Run Backend

cd backend
dotnet restore
dotnet run


API will run on: 
https://localhost:5000
 (or configured port)


---

### ▶️ Run Frontend

cd frontend
npm install
npm run dev


App will run on:
http://localhost:5173


---

## 🔗 API Integration

Frontend communicates with backend using Axios.

Example:
```js
axios.get("https://localhost:5000/api/tasks")

📌 Future Enhancements
🔐 Authentication (JWT / Azure AD)
👥 Role-based access control
🔔 Notifications system
📊 Dashboard & analytics
🌐 Deployment (Azure / AWS)
🧠 Learnings
Built a full-stack system using .NET and React
Designed REST APIs and integrated frontend
Implemented clean project structure (monorepo)
Practiced Git version control and branching strategy
👨‍💻 Author

Khushi Babbar

GitHub: https://github.com/KhushiBabbar08

⭐ Support

If you like this project, give it a ⭐ on GitHub!