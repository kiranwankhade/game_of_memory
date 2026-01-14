import React, { useEffect, useContext } from "react";
import { Card, Row, Col, Spinner, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../context/ThemeContext";
import { FaTrophy, FaLayerGroup, FaBullseye } from "react-icons/fa";
import { fetchProfile } from "../redux/profileActions";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/home.css";
import Loader from "../components/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const { loading, data, error } = useSelector((s) => s.profile);
  const user = useSelector((s) => s.auth?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile());
    }
  }, [user, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger mt-4">{error}</p>;
  }

  if (!data) return null;

  const { progress, scores } = data;

  return (
    <div className="home-page-container" data-theme={theme}>
      <div className="w-100 position-relative shadow-none border-0 ">
        <button
          className="btn btn-md position-absolute top-0 start-0 m-1 mb-2"
          onClick={() => navigate("/")}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <div className="home-card w-100 border border-0 shadow-none mt-4">
          <div className="hero-section">
            <h2 className="main-title" style={{ fontSize: "2.5rem" }}>
              {user.name}
            </h2>
            <p className="opacity-75">{user.email}</p>

            <Row className="mt-4 g-3">
              <Col md={4}>
                <div className="stat-box">
                  <FaTrophy />
                  <h6>Best Score</h6>
                  <h4>{progress?.bestScore || 0}</h4>
                </div>
              </Col>

              <Col md={4}>
                <div className="stat-box">
                  <FaLayerGroup />
                  <h6>Max Level</h6>
                  <h4>{progress?.maxLevel || 1}</h4>
                </div>
              </Col>

              <Col md={4}>
                <div className="stat-box">
                  <FaBullseye />
                  <h6>Accuracy</h6>
                  <h4>{progress?.bestAccuracy || 0}%</h4>
                </div>
              </Col>
            </Row>
          </div>

          {/* RIGHT */}
          <div className="visual-section w-100">
            <h5 className="mb-3">Recent Games</h5>

            {scores.length === 0 ? (
              <div className="empty-state p-4 text-center">
                No games played yet
              </div>
            ) : (
              scores.slice(0, 6).map((s, i) => (
                <Card
                  key={i}
                  className="leaderboard-card mb-2 p-3"
                  style={{ background: "var(--surface)" }}
                >
                  <Row className="align-items-center">
                    <Col>
                      <strong>Score:</strong> {s.score}
                    </Col>
                    <Col>
                      <Badge bg="secondary">Level {s.level}</Badge>
                    </Col>
                    <Col className="text-end opacity-75">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </Col>
                  </Row>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
