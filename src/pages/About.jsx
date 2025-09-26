import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        {/* Left Side - Image */}
        <div className="about-image">
          <img
            src="./image.png"
            alt="Smart Farming Illustration"
          />
        </div>

        {/* Right Side - Content */}
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Welcome to <strong>Smart Farm Advisory</strong>, your trusted partner
            in modern agriculture. Our mission is to empower farmers with
            personalized guidance, real-time insights, and smart tools to improve
            productivity while reducing costs and environmental impact.
          </p>
          <p>
            We combine the power of <strong>AI, weather data, soil analysis</strong>, 
            and market trends to deliver solutions that matter the most to farmers. 
            Whether it’s crop selection, pest management, or price predictions, 
            we are here to help you make informed decisions.
          </p>
          <p>
            With <strong>regional language support</strong>, voice interaction, 
            and easy-to-use features, our platform bridges the gap between 
            technology and grassroots farming.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
