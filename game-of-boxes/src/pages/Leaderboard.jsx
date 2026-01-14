import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaTrophy,
  FaMedal,
  FaGamepad,
  FaGhost,
  FaArrowLeft,
} from "react-icons/fa";
import { fetchLeaderboard } from "../redux/leaderboardActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/home.css";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((s) => s.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, []);

  if (loading) return <Loader />;

  const getRankIcon = (index) => {
    if (index === 0) return <FaTrophy color="#FFD700" size={24} />; // Gold
    if (index === 1) return <FaMedal color="#C0C0C0" size={24} />; // Silver
    if (index === 2) return <FaMedal color="#CD7F32" size={24} />; // Bronze
    return <span className="rank-number">{index + 1}</span>;
  };

  return (
    <div className="home-page-container">
      <Container >
        <div className="page-header">
          <button
            className="back-btn-inline"
            onClick={() => navigate("/")}
            aria-label="Go back"
          >
            <FaArrowLeft />
          </button>

          <div className="leaderboard-title">
            <h1 className="display-title fw-bold mb-1">
              Global <span className="text-primary">Leaderboard</span>
            </h1>
            <p className="text-muted mb-0">
              Are you ready to beat the masters of the grid?
            </p>
          </div>
        </div>

        {list && list.length > 0 ? (
          <div className="leaderboard-list">
            {list.map((item, i) => (
              <div
                key={i}
                className={`leaderboard-card d-flex align-items-center mb-3 p-3 shadow-sm ${
                  i < 3 ? "top-rank" : ""
                }`}
                style={{
                  background:
                    i === 0 ? "rgba(255, 215, 0, 0.05)" : "var(--surface)",
                  borderLeft:
                    i < 3
                      ? `5px solid ${
                          i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : "#CD7F32"
                        }`
                      : "none",
                }}
              >
                <div
                  className="rank-section me-4 text-center"
                  style={{ width: "40px" }}
                >
                  {getRankIcon(i)}
                </div>

                <div className="user-info flex-grow-1">
                  <h5 className="mb-0 fw-bold">
                    {item.userId?.name || "Anonymous Player"}
                  </h5>
                  <span className="text-var(--text) small">
                    Level {item.level || 0}
                  </span>
                </div>

                <div className="score-section text-end">
                  <h4 className="mb-0 text-primary fw-bold">
                    {item.bestScore.toLocaleString()}
                  </h4>
                  <span className="text-muted x-small">POINTS</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state text-center py-5">
            <div className="empty-icon mb-4">
              <FaGhost size={80} opacity={0.2} />
            </div>
            <h3 className="fw-bold">The Grid is Quiet...</h3>
            <p className="text-muted mb-4">
              No scores have been recorded yet. Be the first to claim the #1
              spot!
            </p>
            <Button
              className="btn-primary-custom px-5"
              onClick={() => navigate("/game")}
            >
              <FaGamepad className="me-2" /> Start Playing
            </Button>
          </div>
        )}

        <div className="text-center mt-5">
          <Button
            variant="outline-primary"
            className="rounded-pill px-4"
            onClick={() => navigate("/game")}
          >
            Play Again
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Leaderboard;
