import { useContext, useEffect, useState } from "react";
import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import Leaderboard from "./pages/Leaderboard";
import AppNavbar from "./components/AppNavbar";
import API from "./utils/api";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from "./context/ThemeContext";
import Profile from "./pages/Profile";
import { loadUser } from "./redux/authActions";
import { useDispatch } from "react-redux";

function App() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("game_token");

    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(loadUser());
    }
  }, [dispatch]);

  // Define paths where the Navbar should NOT be shown
  const hideNavbarPaths = ["/login", "/signup"];
  return (
    <div className="app-main-layout">
      {!hideNavbarPaths.includes(location.pathname) && <AppNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gameover" element={<GameOver />} />
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme={theme === 'dark' || theme === 'neon' ? 'dark' : 'light'}
      />
    </div>
  );
}

export default App;
