import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // 👈 styling import

const Navbar = () => {
  return (
    <div>
    <img 
    src="./govt.jpg" 
    alt="Govt Of India Logo" 
    className="h-10 w-10 object-contain govt "
  />
      <img 
    src="./vertical.png" 
    alt="vertical" 
    className="h-5 w-10 object-contain vertical "
  />
  <p className="top-content">Smart Farming Advisory for
     Small and Marginal Farmer</p>
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo flex items-center gap-2">
  <img 
    src="/logo.png" 
    alt="SmartFarm Logo" 
    className="h-10 w-10 object-contain imagelogo"
  />
  <span className="font-bold text-xl text-white-800">KrishiSaathi</span>
</Link>


        {/* Menu */}
        <div className="nav-links">
          <NavLink to="/" end className="nav-item">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-item">
            About
          </NavLink>
          <NavLink to="/services" className="nav-item">
            Services
          </NavLink>
          <NavLink to="/support" className="nav-item">
            Support
          </NavLink>

          <select
            className="language-dropdown"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
            <option value="ta">தமிழ்</option>
            <option value="mr">मराठी</option>
          </select>

        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
