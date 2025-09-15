import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>🌱 Smart Farm Advisory</h3>
          <p className="topdata">
            Empowering farmers with modern technology, real-time solutions, and
            personalized guidance for better yield and sustainable farming.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="links">
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>📍 Varanasi  Innovation Center, India</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 BugHunters@gmail.com.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Smart Farm Advisory. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
