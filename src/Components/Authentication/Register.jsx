import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { API_URL } from "../../GeneralVariables/general";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

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

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      var finaldata = {
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "User",
      };
      finaldata.email = formData.email;
      finaldata.name = formData.name;
      finaldata.password = formData.password;
      finaldata.phone = formData.phone;
      console.log(finaldata);

      try {
        const response = await axios.post(
          `http://138.91.106.12:8080/api/Auth/Register`,
          finaldata
        );

        console.log(response.data);
        toast.success("Registration Successful", {
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
          navigate("/login");
        }, 800);
      } catch (error) {
        
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
        console.error("Error in login", error);
      }
    } else {
      console.log("Form has errors, please correct them");
    }
  };

  return (
    <div className="register-tot-cont">
      <ToastContainer />
      <div className="register-container">
        <h2 className="register-title">REGISTER</h2>
        <form
          id="registerForm"
          className="register-form"
          onSubmit={handleSubmit}
        >
          <div className="register-form-group">
            <label htmlFor="name" className="register-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`register-input ${errors.name ? "invalid" : ""}`}
              required
              value={formData.name}
              onChange={handleChange}
            />
            <div className="register-error-text">{errors.name}</div>
          </div>
          <div className="register-form-group">
            <label htmlFor="email" className="register-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`register-input ${errors.email ? "invalid" : ""}`}
              required
              value={formData.email}
              onChange={handleChange}
            />
            <div className="register-error-text">{errors.email}</div>
          </div>
          <div className="register-form-group">
            <label htmlFor="password" className="register-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`register-input ${errors.password ? "invalid" : ""}`}
              required
              value={formData.password}
              onChange={handleChange}
            />
            <div className="register-error-text">{errors.password}</div>
          </div>
          <div className="register-form-group">
            <label htmlFor="confirmPassword" className="register-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`register-input ${
                errors.confirmPassword ? "invalid" : ""
              }`}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="register-error-text">{errors.confirmPassword}</div>
          </div>
          <div className="register-form-group">
            <label htmlFor="phone" className="register-label">
              Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              className={`register-input ${errors.phone ? "invalid" : ""}`}
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <div className="register-error-text">{errors.phone}</div>
          </div>
          <div className="register-form-group">
            <label htmlFor="address" className="register-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              className={`register-input ${errors.address ? "invalid" : ""}`}
              required
              value={formData.address}
              onChange={handleChange}
            />
            <div className="register-error-text">{errors.address}</div>
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
