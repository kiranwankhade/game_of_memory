import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { signUpEmail, signupGoogle } from "../redux/authActions";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/home.css"; 
import { submitGame } from "../redux/gameActions";
import User from "../../../game-of-boxes-backend/src/models/User";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const { theme } = useContext(ThemeContext);
  const { user,loading, error, token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token && user) {
      const pendingScore = location.state?.pendingScore;

      if (pendingScore) {
        dispatch(submitGame(token, pendingScore));
        
      } else {
        navigate("/");
      }
    }
  }, [token, navigate, location, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email, password } = e.target;
    dispatch(signUpEmail(name.value, email.value, password.value)).then(()=>{
      navigate("/login")
    });
  };

  return (
    <div className="home-page-container min-vh-100" data-theme={theme || 'light'}>
      <button className="back-btn-floating" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </button>

      <Container className="login-web-wrapper justify-content-center">
        <Row className="login-main-row g-0" >
          
          <Col lg={6} className="login-visual-side d-none d-lg-flex" >
            <div className="visual-content text-center">
              <div className="login-logo-large mx-auto">✦</div>
              <h2 className="fw-bold">Join the Grid</h2>
              <p className="opacity-75">Create an account to save your high scores and compete globally.</p>
              <div className="mini-grid-preview mx-auto">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`mini-box ${[1, 3, 4, 7].includes(i) ? 'active' : ''}`}></div>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={6} md={12} className="login-form-side" style={{
             padding:"20px"
          }}>
            <div className="form-inner-container">
              <div className="text-center mb-2">
                <h2 className="fw-bold" style={{ color: 'var(--text)' }}>Create Account</h2>
                <p style={{ color: 'var(--text)', opacity: 0.6 }}>Join to compete on the leaderboard</p>
              </div>

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-2">
                  <Form.Control 
                    name="name" 
                    placeholder="Full Name" 
                    className="custom-input-web" 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Control 
                    name="email" 
                    type="email" 
                    placeholder="Email Address" 
                    className="custom-input-web" 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    className="custom-input-web" 
                    required 
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="btn-primary-custom w-100 mb-3" 
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </Form>

              <div className="divider-web"><span>OR</span></div>

              <div className="d-flex justify-content-center">
                <GoogleLogin
                  onSuccess={(res) => {
                    dispatch(signupGoogle(res.credential)).then(()=>{
                      navigate("/")
                    })
                  }}
                  onError={() => alert("Google signup failed")}
                  useOneTap={false}
                  theme={theme === 'dark' || theme === 'neon' ? 'dark' : 'outline'}
                  width="100%"
                />
              </div>

              {error && <p className="text-danger text-center mt-3 small">{error}</p>}

              <div className="text-center mt-4">
                <p className="small mb-0" style={{ color: 'var(--text)' }}>
                  Already have an account?{" "}
                  <Link to="/login" className="fw-bold text-decoration-none" style={{ color: 'var(--primary)' }}>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
