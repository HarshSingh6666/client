import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // <-- Import useNavigate

import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    aadhaar: "",
    address: "",
    permanentAddress: "",
    state: "",
    city: "",
    password: ""
  });

  const navigate = useNavigate(); // <-- Add this
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://krisisaathi-backend.onrender.com/api/auth/register", formData);

    // ✅ Save token + user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("✅ Registration successful!");
    navigate("/");

  } catch (error) {
    alert("❌ Registration failed. " + (error.response?.data?.error || ""));
  }
};


  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">Join Smart AI Crop Advisory today</p>

        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            name={key}
            type={key === "password" ? "password" : "text"}
            placeholder={
              key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")
            }
            value={value}
            onChange={handleChange}
            className="register-input"
            required
          />
        ))}

        <button type="submit" className="register-btn">
         Register
        </button>

        <p className="register-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
