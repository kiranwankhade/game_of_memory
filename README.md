# 🎮 Game of Memory (Game of Boxes)

A full-stack web-based memory game where users test and improve their memory skills by matching boxes. This project includes secure authentication, modern UI, and a scalable backend architecture.

---

## 🚀 Live Demo  
[deployed link](https://game-of-boxes.vercel.app/)

---

## 📌 Project Overview  
Game of Memory is an interactive web application built using the MERN stack. Users can sign up, log in (including Google OAuth), and play a memory game with a smooth and responsive UI. The application follows best practices for scalability, security, and maintainability.

---

## 🛠️ Tech Stack  

### Frontend  
- React.js (Vite)  
- Redux Toolkit  
- React Router  
- Bootstrap & React Bootstrap  
- Axios  
- Google OAuth  
- React Toastify  

### Backend  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JWT Authentication  
- Google Auth Library  
- bcryptjs  
- Helmet & Rate Limiting  
- CORS  

---

## ✨ Features  

✅ User authentication (JWT + Google OAuth)  
✅ Secure password hashing  
✅ Responsive UI  
✅ Memory box matching game  
✅ Redux state management  
✅ API-based architecture  
✅ Protected routes  
✅ Environment-based configuration  
✅ Scalable and modular project structure  

---

## 📂 Folder Structure  

game_of_memory/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── redux/
│   └── pages/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
└── README.md


---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/kiranwankhade/game_of_memory.git
cd game_of_memory
```

### 2️⃣ Setup Backend
cd backend
npm install

#### Create a .env file inside the backend:
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
```

#### Run backend:
```
npm run dev
```
