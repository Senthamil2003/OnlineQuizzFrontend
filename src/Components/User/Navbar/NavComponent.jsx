import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  function Logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#">Plus Ultra</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="mx-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/alltest">
              Tests
            </Nav.Link>
            <Nav.Link as={Link} to="/history">
              History
            </Nav.Link>
            <Nav.Link as={Link} to="/myfavourite">
              MyFavourite
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            {/* <a href="../Login/Login.html">
              <Button className="btn login-btn">Login</Button>
            </a> */}
            {/* <a href="../AddToCart/AddToCart.html" id="cart-icon">
              <div className="svg-bg me-3" id="cart-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#6048a1"
                  class="bi bi-bag-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                </svg>
              </div>
            </a> */}
            <NavDropdown
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  fill="#6048a1"
                  className="bi bi-person-circle person me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              }
              id="navbarNavDarkDropdown"
              menuVariant="light"
              align="end"
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Item id="logout" onClick={Logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
