import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FaRedo, FaBrain, FaGamepad } from "react-icons/fa";
import BoxGrid from "../components/BoxGrid";
import LifeBar from "../components/LifeBar";
import { generatePattern, getTimeLimit } from "../utils/gameLogic";
import api from "../utils/api";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/home.css";
import { toast } from "react-toastify";

export default function Game() {
  const user = useSelector((s) => s.auth?.user);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [pattern, setPattern] = useState([]);
  const [userClicks, setUserClicks] = useState([]);
  const [errorIndex, setErrorIndex] = useState(null);
  const [showPattern, setShowPattern] = useState(true);
  const [isRepeatDisabled, setIsRepeatDisabled] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);

  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = React.useRef(null);

  useEffect(() => {
    startNewLevel();
  }, [level]);

  useEffect(() => {
    if (!showPattern) {
      setTimeLeft(getTimeLimit(level));

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [showPattern]);

  const startNewLevel = () => {
    const totalBoxes = level < 4 ? 20 : level < 7 ? 30 : 42;
    const newPattern = generatePattern(level, totalBoxes);
    setPattern(newPattern);
    setUserClicks([]);
    setErrorIndex(null);
    triggerFlash(2500);
  };

  const triggerFlash = (duration) => {
    setShowPattern(true);
    setTimeout(() => setShowPattern(false), duration);
  };

  const handleRepeat = () => {
    if (!isRepeatDisabled && !showPattern) {
      setIsRepeatDisabled(true);
      triggerFlash(3000);
      setTimeout(() => setIsRepeatDisabled(false), 8000);
    }
  };

  const handleBoxClick = (index) => {
    if (showPattern || userClicks.includes(index) || lives <= 0) return;

    setTotalClicks((prev) => prev + 1);

    if (pattern.includes(index)) {
      const newClicks = [...userClicks, index];
      setUserClicks(newClicks);
      setScore((prev) => prev + 10);

      if (newClicks.length === pattern.length) {
        clearInterval(timerRef.current);
        setTimeout(() => setLevel((prev) => prev + 1), 800);
      }
    } else {
      setErrorIndex(index);

      if (lives > 1) {
        setTimeout(() => setErrorIndex(null), 800);
      }
    }
  };


  const handleTimeUp = () => {
    clearInterval(timerRef.current);
    setUserClicks([]);
    setErrorIndex(null);
  
    setLives((prev) => {
      const nextLives = prev - 1;
  
      // 🔥 Schedule side-effects OUTSIDE render
      setTimeout(() => {
        if (nextLives === 0) {
          toast.error("💔 Game Over! No lives left", {
            toastId: "game-over",
            onClose: () => {
              handleGameOver();
            },
          });
        } else {
          toast.info("⏱ Time’s up! One life lost — try again ...!!", {
            toastId: "life-lost",
            onClose: () => {
              triggerFlash(2500);
            },
          });
          
        }
      }, 0);
  
      return nextLives;
    });
  };

  const handleGameOver = async () => {
    const correctClicks = score / 10;
    const accuracy =
      totalClicks > 0 ? Math.round((correctClicks / totalClicks) * 100) : 0;

    navigate("/gameover", { state: { score, level, accuracy } });
  };

  return (
    <div className="game-layout">
      <div className="game-sidebar">
        <div className="stat-box">
          <h6>LEVEL</h6>
          <h4 className="text-primary">{level}</h4>
        </div>

        <div className="stat-box">
          <h6>SCORE</h6>
          <h4 className="text-primary">{score}</h4>
        </div>

        <div className="stat-box">
          <h6>LIFE</h6>
          <LifeBar lives={lives} />
        </div>
      </div>

      <div className="game-main">
        <div
          className="game-card-wrapper p-3 shadow-lg"
        >
          <div className="game-status-row">
            {!showPattern && (
              <div className="status-badge timer">⏱ {timeLeft}s</div>
            )}
            {showPattern ? (
              <div className="status-badge memorize">
                <FaBrain className="me-2" /> MEMORIZE
              </div>
            ) : (
              <div className="status-badge play">
                <FaGamepad className="me-2" /> REPEAT
              </div>
            )}

            <Button
              variant="none"
              onClick={handleRepeat}
              disabled={isRepeatDisabled || showPattern}
              className={`repeat-icon-btn ${
                isRepeatDisabled ? "opacity-25" : ""
              }`}
            >
              <FaRedo size={20} color="var(--primary)" />
            </Button>
          </div>
          <div className="grid-center-container">
          <BoxGrid
            pattern={pattern}
            userClicks={userClicks}
            errorIndex={errorIndex}
            onClick={handleBoxClick}
            show={showPattern}
            level={level}
          />
          </div>
        </div>
      </div>
    </div>
  );
}
