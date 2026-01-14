import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlay, FaUser, FaTrophy } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/home.css";
import "../styles/theme.css"; 
import { GameLogo } from "../components/GameLogo";

export default function Home() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { user } = useSelector((s) => s.auth);
  
  const gridCells = Array(16).fill(null);
  const activeIndices = [2, 5, 9, 14];

  return (
    <div className="home-page-container " data-theme={theme || 'light'}>
      <div className="home-card">
        
        <div className="hero-section">
          {/* <div className="logo-icon-box mb-5">
            <div className="sparkle-wrapper" style={{background: 'var(--primary)'}}>
               <span className="sparkle-icon">✦</span>
            </div>
          </div> */}
          <div className="mb-4 d-flex align-items-center">
             <GameLogo size="lg" />
          </div>
          
          <h1 className="main-title">
            Game <span className="title-accent">of</span><br/>Boxes
          </h1>
          <p className="subtitle-text" style={{color: 'var(--text)', opacity: 0.8}}>
            A minimalist memory challenge. Match the patterns, beat the clock, and climb the leaderboard.
          </p>

          <div className="d-grid gap-3 mb-4" style={{gridTemplateColumns: '1fr 1fr'}}>
            <Button className="btn-primary-custom" onClick={() => navigate("/game")}>
              <FaPlay className="me-2" /> {user ? "Play" : "Play As a Guest"}
            </Button>
            
            <Button 
              className="btn-dark-custom" 
              onClick={() => navigate(user ? "/profile" : "/login")}
            >
              <FaUser className="me-2" /> {user ? "Profile" : "Account"}
            </Button>
          </div>

          <Button variant="link" className="text-decoration-none p-0" style={{color: 'var(--primary)'}} onClick={() => navigate("/leaderboard")}>
            <FaTrophy className="me-2" /> View Global Ranking
          </Button>
        </div>

        <div className="visual-section">
          <div className="responsive-grid">
            {gridCells.map((_, i) => (
              <div 
                key={i} 
                className={`grid-cell ${activeIndices.includes(i) ? "cell-active" : "cell-idle"}`}
              />
            ))}
          </div>
          
          <p className="footer-text mt-4" style={{color: 'var(--text)', opacity: 0.5, fontSize: '0.8rem'}}>
            Focus • Remember • Sequence
          </p>
        </div>

      </div>
    </div>
  );
}