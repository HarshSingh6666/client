import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar";

const Sidebar = ({
  isOpen,
  onClose,
  user,
  profileImage,
  handleProfileImageChange,
  handleLogout,
}) => {
  const [showPersonal, setShowPersonal] = useState(true);
  const [showAddress, setShowAddress] = useState(false);

  if (!isOpen) return null;

  return (
    <aside className="sidebar">
      <button className="close-btn" onClick={onClose}>
        ❌
      </button>

      <div className="profile-section">
        {user ? (
          <>
            <img src={profileImage} alt="User" className="profile-pic" />
            <h3>{user.name}</h3>

            {/* Personal Info Dropdown */}
            <div className="dropdown-section">
              <button
                className="dropdown-toggle"
                onClick={() => setShowPersonal((prev) => !prev)}
              >
                Personal Info {showPersonal ? "▲" : "▼"}
              </button>
              {showPersonal && (
                <div className="dropdown-content">
                  <p>📧 Email: {user.email}</p>
                  <p>📱 Phone: {user.mobile}</p>
                  {/* Add other personal info here if needed */}
                </div>
              )}
            </div>

            {/* Address Info Dropdown */}
            <div className="dropdown-section">
              <button
                className="dropdown-toggle"
                onClick={() => setShowAddress((prev) => !prev)}
              >
                Address {showAddress ? "▲" : "▼"}
              </button>
              {showAddress && (
                <div className="dropdown-content">
                  <p>🏠 Address: {user.address}</p>
                  <p>🏙️ City: {user.city}</p>
                  <p>🗺️ State: {user.state}</p>
                </div>
              )}
            </div>

            <p>ID: {user._id}</p>
          </>
        ) : (
          <p style={{ color: "red" }}>Loading user profile...</p>
        )}

        {/* Change Photo */}
        <label className="change-photo-label">
          📸 Change Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      <div className="sidebar-links">
        <Link to="/settings" className="setting">
          ⚙️ Settings
        </Link>
        <Link to="/help">❓ Help</Link>
        <button className="btn-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
