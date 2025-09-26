import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Navbar.css";
import axios from "axios";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("./profile.jpg");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 👈 hamburger state

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await axios.get("https://krisisaathi-backend.onrender.com/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        if (res.data.profilePic) {
          setProfileImage(res.data.profilePic);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <div className="top-bar">
        <img src="./govt.png" alt="Govt Of India Logo" className="govt" />
        <img src="./vertical.png" alt="vertical" className="vertical" />
        <p className="top-content">
          Smart Farming Advisory for Small and Marginal Farmer
        </p>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="SmartFarm Logo" className="imagelogo" />
            <span className="brand-name">KrisiSaathi</span>
          </Link>

          {/* Hamburger */}
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Nav Links */}
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" end className="nav-item" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" className="nav-item" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/services" className="nav-item" onClick={() => setMenuOpen(false)}>Services</NavLink>
            <NavLink to="/support" className="nav-item" onClick={() => setMenuOpen(false)}>Support</NavLink>

            {!user && (
              <div
                className="nav-item dropdown"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                style={{ position: "relative", cursor: "pointer" }}
              >
                Account ▼
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <NavLink to="/register" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      Register
                    </NavLink>
                    <NavLink to="/login" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      Login
                    </NavLink>
                  </div>
                )}
              </div>
            )}

            <select className="language-dropdown">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="mr">मराठी</option>
            </select>

            {user && (
              <div
                className="profile-icon"
                onClick={() => {
                  setSidebarOpen(!sidebarOpen);
                  setMenuOpen(false);
                }}
                style={{ cursor: "pointer" }}
              >
                <img src={profileImage} alt="User" className="profile-img" />
              </div>
            )}
          </div>
        </div>
      </nav>

      {user && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
          profileImage={profileImage}
          handleProfileImageChange={handleProfileImageChange}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Navbar;
