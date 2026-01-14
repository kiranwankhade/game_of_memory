import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authActions";
import ThemeSwitcher from "./ThemeSwitcher";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

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
          className="fw-bold fs-4"
          style={{ color: "var(--primary)" }}
        >
          ✦ Game of Boxes
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end gap-3"
        >
          {user ? <ThemeSwitcher /> : <></>}

          <Nav className="align-items-center gap-2">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="none"
                  className="d-flex align-items-center gap-2 border-0"
                  style={{ color: "var(--text)" }}
                >
                  <FaUserCircle size={24} />
                  <span className="fw-medium">{user.name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow border-0 ">
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-danger d-flex align-items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="fw-bold px-3 py-2 rounded-pill"
                style={{
                  color: "var(--text)",
                  border: "1px solid var(--primary)",
                }}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
