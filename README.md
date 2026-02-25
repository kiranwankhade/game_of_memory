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

## 📂 Folder Structure  
```
game_of_memory/
│
├── game-of-boxes/
│   ├── src/
│   ├── components/
│   ├── redux/
│   └── pages/
│
├── game-of-boxes-backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
└── README.md
```

## ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/kiranwankhade/game_of_memory.git
cd game_of_memory
```

### 2️⃣ Setup Backend
```
cd game-of-boxes-backend
npm install
```

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

### 3️⃣ Setup Frontend
```
cd game-of-boxes
npm install
```


#### Create a .env file inside the backend:
```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Run frontend:
```
npm run dev
```

## 🔐 Environment Variables  

This project uses `.env` files for security and configuration. Do not commit these files to version control.

## 📊 API Highlights  

The backend provides RESTful APIs for:
- User Authentication (Signup, Login, Logout)
- Google OAuth Authentication  
- JWT-based Authorization  
- Protected Routes  
- Secure Password Hashing  
- User Session Handling  
- Game Logic and Data Management  

## 📦 Deployment  

You can deploy the project using the following platforms:

### 🌐 Frontend  
- Vercel → [https://game-of-boxes.vercel.app/]

### ⚙️ Backend  
- Render → [https://game-of-memory-4k8z.onrender.com] 

### 🗄️ Database  
- MongoDB Atlas

## 📸 Screenshots  

### 🏠 Home & Theme
| Light Mode | Dark Mode |
|------------|------------|
|  <img width="1360" height="593" alt="home_web" src="https://github.com/user-attachments/assets/435142d9-eef7-4acb-819a-6eaa1b14fc4d" /> | <img width="1348" height="588" alt="theme" src="https://github.com/user-attachments/assets/a52b2e0d-a709-4f53-9c87-5079aba79a2f" /> |

---

### 🎮 Game & Leaderboard
| Game Screen | Leaderboard |
|-------------|-------------|
|  <img width="1360" height="597" alt="game" src="https://github.com/user-attachments/assets/4b99795c-0335-434c-88a9-02f94e19209c" /> |  <img width="1347" height="598" alt="leaderboard" src="https://github.com/user-attachments/assets/a4c1577f-e840-4ccc-970b-5f18a8e7590d" /> |

---

### 👤 Profile & Authentication
| Profile | Sign In |
|---------|---------|
|<img width="1359" height="607" alt="profile" src="https://github.com/user-attachments/assets/2b316338-3100-4b79-bfca-9c6a695464b4" /> |  <img width="1336" height="596" alt="SignIn" src="https://github.com/user-attachments/assets/5c40f254-5967-41fe-97f7-1755edfe04bf" /> |

---

### ⚡ UI & Notifications
| Toast Message |
|---------------|
|<img width="359" height="78" alt="toast" src="https://github.com/user-attachments/assets/2c13a46c-4ccb-4511-bdec-afd554990eee" /> |
