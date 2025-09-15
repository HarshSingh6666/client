import React from "react";
import { useNavigate } from "react-router-dom";
import "./Support.css";

const Support = () => {
  const navigate = useNavigate()
  return (
    <div className="support-page">
      <h1>Farmer Support Center</h1>
      <p className="subtitle">
        🌿 Need help? We are here to support farmers 24/7 with multilingual assistance.
      </p>

      <div className="support-grid">
        <div className="support-card">
          <h2>📞 Helpline</h2>
          <p>+91 1800-123-456</p>
          <span>Available 24/7 for farmer queries</span>
        </div>

        <div className="support-card">
          <h2>📧 Email</h2>
          <p>BugHunters@gmail.com.com</p>
          <span>Send us your concerns anytime</span>
        </div>

        <div className="support-card">
          <h2>🌍 Languages</h2>
          <p>हिंदी | తెలుగు | தமிழ் | English</p>
          <span>We support farmers in local languages</span>
        </div>
      </div>

      {/* <div className="cta-box">
        <h3>💬 Need Instant Help?</h3>
        <p>Try our <strong>AI Chatbot</strong> for quick answers related to farming.</p>
        <button className="chat-btn" onClick={() => navigate("/chatbotPage")}>
          Open Chatbot</button>
      </div> */}
    </div>
  );
};

export default Support;
