import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [buttonLoad, setbuttonLoad] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbuttonLoad(true);
    try {
      const response = await axios.post(
        `https://quizzappdeploy-gvh9bkgve3a6fecc.eastus-01.azurewebsites.net/api/Auth/Login`,
        formData
      );
      localStorage.setItem("token", response.data.accessToken);
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        if (response.data.role == "User") {
          navigate("/home");
        } else if (response.data.role == "Admin") {
          navigate("/adminviewtest");
        }
      }, 500);

      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      console.error("Error in login", error.response.data.message);
    } finally {
      setbuttonLoad(false);
    }
    if (validateForm()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has errors, please correct them");
    }
  };

  return (
    <div className="login-tot-cont">
      <ToastContainer />
      <div className="login-container">
        <h2 className="login-title">LOGIN</h2>
        <form id="loginForm" className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`login-input ${errors.email ? "invalid" : ""}`}
              required
              value={formData.email}
              onChange={handleChange}
            />
            <div className="login-error-text">{errors.email}</div>
          </div>
          <div className="login-form-group">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`login-input ${errors.password}`}
              required
              value={formData.password}
              onChange={handleChange}
            />
            <div className="login-error-text">{errors.password}</div>
          </div>
          {buttonLoad ? (
            <button className="login-button" disabled={true}>
              <Spinner
                animation="border"
                className="custome-btn-spinner"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </button>
          ) : (
            <button type="submit" className="login-button">
              Login
            </button>
          )}

          <Link to="/register">
            <button type="button" className="login-button">
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
