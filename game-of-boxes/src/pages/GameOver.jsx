import { Button, Alert, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { submitGame } from "../redux/gameActions";
import { 
  FaCloudUploadAlt, 
  FaPlay, 
  FaHome, 
  FaTrophy, 
  FaChartLine,
  FaFire,
  FaMedal,
  FaShareAlt,
  FaGoogle,
  FaEnvelope,
  FaUserPlus,
  FaSignInAlt
} from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/home.css";
import { useEffect, useRef, useState } from "react";

export default function GameOver() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, token } = useSelector((s) => s.auth);
  const { loading, success, error } = useSelector((s) => s.game || {});

  const score = state?.score || 0;
  const level = state?.level || 0;
  const accuracy = state?.accuracy || 0;

  const hasSaved = useRef(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Auto-save for logged-in users
  useEffect(() => {
    if (!user || !token) return;
   
    if (hasSaved.current) return;
    
    const gameData = { score, level, accuracy };
    hasSaved.current = true;
    setIsSaving(true);
    dispatch(submitGame(token, gameData))
      .then(() => {
        setIsSaving(false);
        setShowScore(true);
      })
      .catch(() => setIsSaving(false));
  }, [user, token, score, level, accuracy, dispatch]);

  useEffect(() => {
    if (!user) return;
  
    console.log('UseEffect success:', success)
    if (success) {
      console.log('success:', success)
      toast.success("🎉 Score saved to leaderboard!", {
        toastId: "score-saved",
      });
    }
  
    if (error) {
      toast.error(error, {
        toastId: "score-error",
      });
    }
  }, [success, error, user]);
  

  // Score display animation
  useEffect(() => {
    const timer = setTimeout(() => setShowScore(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveScore = () => {
    if (user) return; // Already saved
    
    // Save pending score to localStorage (temporary storage)
    localStorage.setItem('pending_score', JSON.stringify({ score, level, accuracy }));
    
    // Show smart auth modal
    setShowAuthModal(true);
  };

  const handleGoogleAuth = () => {
    // Store pending score and navigate to login (Google will auto-handle signup if needed)
    navigate("/login", { 
      state: { 
        pendingScore: { score, level, accuracy },
        autoGoogle: true // Flag to auto-trigger Google
      } 
    });
  };

  const handleEmailAuth = () => {
    // Navigate to login with pending score
    navigate("/login", { 
      state: { pendingScore: { score, level, accuracy } } 
    });
  };

  const handleViewLeaderboard = () => {
    navigate("/leaderboard");
  };

  const handleShareScore = () => {
    const shareText = `🏆 I scored ${score} points in Game of Boxes! Level ${level} with ${accuracy}% accuracy. Can you beat it?`;
    navigator.clipboard.writeText(shareText).then(() => {
      toast.info("Score copied! Share it with friends");
    });
  };

  const medalType = score >= 5000 ? 'gold' : score >= 3000 ? 'silver' : score >= 1500 ? 'bronze' : null;

  return (
    <div className="home-page-container">
      <div className="app-card flex-column p-5 text-center shadow-lg" style={{ 
       width:'100%',
        borderRadius: '20px'
      }}>
        
        {/* Score Display */}
        <div className={`score-reveal-container ${showScore ? 'revealed' : ''}`}>
          {medalType && (
            <div className="floating-medal">
              {medalType === 'gold' ? '🥇' : medalType === 'silver' ? '🥈' : '🥉'}
            </div>
          )}
          
          <h1 className="display-title text-danger mb-2" style={{ fontSize: '3rem' }}>
            GAME OVER
          </h1>
          <p className="text-muted mb-4">Level {level} • {accuracy}% Accuracy</p>
          
          <div className="score-display-animated mx-auto mb-5">
            <span className="score-number-glowing">{score.toLocaleString()}</span>
            <p className="score-label mt-2">POINTS</p>
          </div>
        </div>

        {/* Status Messages */}
        {user && isSaving && (
          <Alert variant="info" className="fade-in mb-4">
            <div className="d-flex align-items-center justify-content-center">
              <div className="spinner-border spinner-border-sm me-2"></div>
              Saving your score to leaderboard...
            </div>
          </Alert>
        )}
        
        {user && success && (
          <Alert variant="success" className="fade-in mb-4">
            <FaTrophy className="me-2" />
            Score saved globally! Check the leaderboard.
          </Alert>
        )}

        {/* Action Buttons - Smart Layout */}
        <div className="action-buttons-grid mt-4">
          
          {/* Primary Action Row */}
          <div className="row g-3 mb-4">
            {/* Save Score Button (only for guests) */}
            {!user && (
              <div className="col-12">
                <Button 
                  className="btn-save-score py-3 rounded-4 fw-bold w-100"
                  onClick={handleSaveScore}
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), #6c63ff)',
                    border: 'none',
                    fontSize: '1.1rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <FaCloudUploadAlt className="me-2" size={20} />
                    <span>Save Your {score.toLocaleString()} Points</span>
                  </div>
                  <div className="save-score-subtext small mt-1 opacity-75">
                    Login or sign up to compete globally
                  </div>
                </Button>
              </div>
            )}

            {/* Leaderboard Button */}
            <div className="col-md-6">
              <Button 
                variant="success" 
                className="py-3 rounded-4 fw-bold w-100 h-100"
                onClick={handleViewLeaderboard}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none'
                }}
              >
                <FaTrophy className="me-2" />
                View Leaderboard
              </Button>
            </div>

            {/* Play Again Button */}
            <div className="col-md-6">
              <Button 
                variant="outline-primary" 
                className="py-3 rounded-4 fw-bold w-100 h-100 border-2"
                onClick={() => navigate("/game")}
              >
                <FaPlay className="me-2" /> Play Again
              </Button>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button 
              variant="warning" 
              className="rounded-pill px-4"
              onClick={handleShareScore}
            >
              <FaShareAlt className="me-2" /> Share
            </Button>
            
            <Button 
              variant="link" 
              className="text-decoration-none text-muted"
              onClick={() => navigate("/")}
            >
              <FaHome className="me-2" /> Home
            </Button>
          </div>
        </div>

        {/* Guest Info */}
        {!user && (
          <div className="guest-info mt-5 p-3 rounded" 
               style={{ 
                 background: 'rgba(var(--primary-rgb), 0.05)',
                 border: '1px dashed rgba(var(--primary-rgb), 0.3)'
               }}>
            <p className="small mb-0">
              <strong>Playing as guest:</strong> Sign in to save this score, track progress, and compete globally on the leaderboard!
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="row mt-5 g-3">
          <div className="col-6 col-md-3">
            <div className="stat-preview p-3 rounded">
              <div className="stat-icon mb-2">
                <FaMedal style={{ color: medalType === 'gold' ? '#FFD700' : medalType === 'silver' ? '#C0C0C0' : '#CD7F32' }} />
              </div>
              <div className="stat-value">
                {medalType ? medalType.charAt(0).toUpperCase() + medalType.slice(1) : 'No medal'}
              </div>
              <div className="stat-label small">Medal</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-preview p-3 rounded">
              <div className="stat-icon mb-2">
                <FaFire style={{ color: '#FF6B6B' }} />
              </div>
              <div className="stat-value">{level}</div>
              <div className="stat-label small">Level</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-preview p-3 rounded">
              <div className="stat-icon mb-2">
                <FaChartLine style={{ color: '#4ECDC4' }} />
              </div>
              <div className="stat-value">{accuracy}%</div>
              <div className="stat-label small">Accuracy</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-preview p-3 rounded">
              <div className="stat-icon mb-2">
                <FaTrophy style={{ color: '#6C63FF' }} />
              </div>
              <div className="stat-value">
                {score > 4000 ? 'Top 10%' : score > 2000 ? 'Top 30%' : 'Top 60%'}
              </div>
              <div className="stat-label small">Global Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Auth Modal */}
      <Modal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)}
        centered
        size="md"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center">
            <div className="trophy-icon mb-3">
              <FaTrophy size={48} style={{ color: 'var(--primary)' }} />
            </div>
            <h4 className="fw-bold mb-1">Save Your Score!</h4>
            <p className="text-muted mb-0">{score.toLocaleString()} points • Level {level}</p>
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="pt-0">
          <div className="text-center mb-4">
            <p>Choose how you'd like to save your score:</p>
          </div>

          {/* Google Auth - Smart (auto login/signup) */}
          <div className="mb-3">
            <Button 
              variant="outline-primary" 
              className="w-100 py-3 rounded-pill fw-bold"
              onClick={handleGoogleAuth}
              style={{
                border: '2px solid #4285F4',
                color: '#4285F4'
              }}
            >
              <FaGoogle className="me-2" />
              Continue with Google
            </Button>
            <p className="small text-center text-muted mt-2 mb-0">
              ✨ Automatically signs you in or creates account
            </p>
          </div>

          <div className="divider-with-text my-4">
            <span>OR</span>
          </div>

          {/* Email Auth */}
          <div className="mb-4">
            <Button 
              variant="primary" 
              className="w-100 py-3 rounded-pill fw-bold mb-3"
              onClick={handleEmailAuth}
            >
              <FaEnvelope className="me-2" />
              Continue with Email
            </Button>
            
            <div className="d-flex gap-2">
              <Button 
                variant="outline-secondary" 
                className="flex-fill py-2 rounded-pill"
                onClick={() => {
                  navigate("/login", { 
                    state: { pendingScore: { score, level, accuracy } } 
                  });
                }}
              >
                <FaSignInAlt className="me-1" /> Login
              </Button>
              
              <Button 
                variant="outline-secondary" 
                className="flex-fill py-2 rounded-pill"
                onClick={() => {
                  navigate("/signup", { 
                    state: { pendingScore: { score, level, accuracy } } 
                  });
                }}
              >
                <FaUserPlus className="me-1" /> Sign Up
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="benefits-list p-3 rounded" 
               style={{ background: 'rgba(var(--primary-rgb), 0.05)' }}>
            <h6 className="mb-2">Why save your score?</h6>
            <div className="d-flex align-items-center mb-2">
              <FaTrophy className="text-primary me-2" size={14} />
              <small>Compete on global leaderboard</small>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaChartLine className="text-primary me-2" size={14} />
              <small>Track your progress over time</small>
            </div>
            <div className="d-flex align-items-center">
              <FaFire className="text-primary me-2" size={14} />
              <small>Challenge friends</small>
            </div>
          </div>

          {/* Skip Option */}
          <div className="text-center mt-4">
            <Button 
              variant="link" 
              className="text-decoration-none text-muted"
              onClick={() => {
                localStorage.removeItem('pending_score');
                setShowAuthModal(false);
                toast.info("Score not saved. Play again to save!");
              }}
            >
              Skip for now, continue as guest
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}