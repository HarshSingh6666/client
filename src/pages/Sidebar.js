import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ closeSidebar }) => {
  const [profilePic, setProfilePic] = useState("./profile.jpg"); // default

  const user = {
    name: "Harsh Singh",
    userId: "USR12345",
    mobile: "+91 9876543210",
    email: "harsh@example.com",
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPic = URL.createObjectURL(file); // preview image
      setProfilePic(newPic);
    }
  };

  return (
    <aside className="sidebar">
      {/* Close button */}
      <button className="close-btn" onClick={closeSidebar}>
        ❌
      </button>

      {/* Profile Section */}
      <div className="profile-section">
        <img src={profilePic} alt="User" className="profile-pic" />
        <h3>{user.name}</h3>
        <p>ID: {user.userId}</p>
        <p>📱 {user.mobile}</p>
        <p>📧 {user.email}</p>

        {/* Change Profile Image */}
        <label className="upload-label">
          Change Profile
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Sidebar Links */}
      <div className="sidebar-links">
        <a href="/profile">👤 Profile</a>
        <a href="/settings">⚙️ Settings</a>
        <a href="/help">❓ Help</a>
      </div>
    </aside>
  );
};

export default Sidebar;
