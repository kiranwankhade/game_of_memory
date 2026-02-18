import React, { useContext } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authActions";
import ThemeSwitcher, { getBtnStyle } from "./ThemeSwitcher";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { GameLogo } from "./GameLogo";
import { ThemeContext } from "../context/ThemeContext";

export default function AppNavbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const userStyle = getBtnStyle(theme);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("game_token");
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      className="py-3 shadow-sm"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid rgba(128,128,128,0.2)",
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-5 d-flex align-items-center gap-2 m-0"
        >
          <GameLogo size="xs" />
          <span
            className="d-none d-sm-inline"
            style={{ color: "var(--primary)" }}
          >
            {" "}
            Game of Boxes
          </span>
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2 ms-auto">
          {user && (
            <>
              {/* Theme Button */}

              <div className="theme-pill d-flex align-items-center">
                {" "}
                <ThemeSwitcher />{" "}
              </div>

              {/* User Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  className="user-pill d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: userStyle.bg,
                    color: userStyle.text,
                    borderColor: userStyle.bg,
                  }}
                >
                  <FaUserCircle size={18} />

                  {/* Desktop only */}
                  <span className="d-none d-md-inline">{user.name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-sm border-0 mt-2">
                  {/* Mobile profile */}
                  <Dropdown.Item
                    as={Link}
                    to="/profile"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaUserCircle /> {user.name}
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-danger d-flex align-items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}

          {!user && (
            <Link to="/login" className="login-btn text-decoration-none">
              Login
            </Link>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
