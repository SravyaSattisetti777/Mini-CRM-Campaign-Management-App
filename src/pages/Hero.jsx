import React from 'react';
import { Button } from '../components/button';
import './Hero.css';

function Hero() {
  const handleGetStarted = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Your CRM & Campaign Management</h1>
        <p className="hero-description">
          Effortlessly streamline your campaigns, manage targeted audiences, and monitor your success—all in one place with our robust CRM platform. Optimize your efforts and drive better results with ease.
        </p>
        <div className="hero-buttons">
          <Button onClick={handleGetStarted} className="btn-get-started">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
