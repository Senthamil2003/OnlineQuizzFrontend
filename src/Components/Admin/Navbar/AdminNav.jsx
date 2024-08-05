import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import "./AdminNav.css";
import { Link, useNavigate } from "react-router-dom";

const AdminNav = () => {
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
            <Nav.Link as={Link} to="/adminviewtest">
              AllTest
            </Nav.Link>
            <Nav.Link as={Link} to="/createQuestion">
              Create Question
            </Nav.Link>
          </Nav>
          <button className="admin-logout" onClick={Logout}>
            Logout
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNav;
