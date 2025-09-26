import { useState } from "react";
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import "./login.css";
import AlertModal from "../components/AlertModel";  // path sahi set karein

function Login({ setUser }) {  // agar parent se setUser pass kar rahe hain
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://krisisaathi-backend.onrender.com/api/auth/login", loginData);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      if(setUser) setUser(res.data.user); // user ko state me set karein agar hai
      
      setAlert({ show: true, message: "✅ Login successful!", type: "success" });

      setTimeout(() => {
        setAlert({ show: false, message: "", type: "success" });
        navigate("/");
      }, 1000);
      
    } catch (err) {
      setAlert({
        show: true,
        message: "❌ Login failed. " + (err.response?.data?.message || ""),
        type: "error"
      });

      setTimeout(() => {
        setAlert({ show: false, message: "", type: "error" });
      }, 3000);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2 className="login-title">🔐 Welcome Back</h2>
        <p className="login-subtitle">Login to access your dashboard</p>

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleChange}
          className="login-input"
          required
        />

        <button type="submit" className="login-btn">
          🚀 Login
        </button>

        <p className="login-footer">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>

      {alert.show && (
        <AlertModal
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false, message: "", type: "success" })}
        />
      )}
    </div>
  );
}

export default Login;
