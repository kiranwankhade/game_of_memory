import React, { useEffect, useContext } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { loginEmail, loginGoogle } from "../redux/authActions";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/home.css";
import "../styles/theme.css";
import { toast } from 'react-toastify';
import { submitGame } from "../redux/gameActions";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { user,loading, error, token } = useSelector((s) => s.auth);

  
  useEffect(() => {
    toast.dismiss();
    if (token && user) {
      const pendingScore = location.state?.pendingScore;
      console.log("pendingScore",pendingScore)
      if (pendingScore) {
        dispatch(submitGame(token, pendingScore)).then(()=>{
          navigate("/")
        });
      } else {
        navigate("/");
      }
    }
  }, [token, navigate, location, dispatch]);

  useEffect(() => {
    toast.dismiss();
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    dispatch(loginEmail(email.value, password.value));
  };

  return (
    <div className="home-page-container min-vh-100" data-theme={theme || 'light'}>
      <button className="back-btn-floating" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </button>

      <Container className="login-web-wrapper" >
        <Row className="login-main-row">
          <Col lg={6} className="login-visual-side d-none d-lg-flex">
            <div className="visual-content text-center">
              <div className="login-logo-large mx-auto">✦</div>
              <h2>Master the Grid</h2>
              <p className="opacity-75">Sign in to sync progress and compete globally.</p>
              <div className="mini-grid-preview mx-auto">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`mini-box ${i === 4 ? 'active' : ''}`}></div>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={6} md={12} className="login-form-side">
            <div className="form-inner-container">
              <div className="text-center mb-4">
                <h2 className="fw-bold" style={{ color: 'var(--text)' }}>Sign In</h2>
                <p style={{ color: 'var(--text)', opacity: 0.6 }}>Enter your credentials to continue</p>
              </div>

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                  <Form.Control 
                    name="email" 
                    type="email" 
                    placeholder="Email Address" 
                    className="custom-input-web"
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
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
                  {loading ? "Authenticating..." : "Login"}
                </Button>
              </Form>

              <div className="divider-web"><span>OR</span></div>

              <div className="d-flex justify-content-center">
                <GoogleLogin
                  key={user ? "logged-in" : "logged-out"}
                  onSuccess={(res) => dispatch(loginGoogle(res.credential))}
                  onError={() => console.log("Google Auth Failed")}
                  theme={theme === 'dark' || theme === 'neon' ? 'dark' : 'outline'}
                  width="100%"
                />
             
              </div>

              {/* {error && <p className="text-danger text-center mt-3 small">{error}</p>} */}

              <div className="text-center mt-4">
                <p className="small mb-0" style={{ color: 'var(--text)' }}>
                  Don't have an account?{" "}
                  <Link to="/signup" className="fw-bold text-decoration-none" style={{ color: 'var(--primary)' }}>
                    Sign Up
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