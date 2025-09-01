import React from "react";
import "./Landing.css";

export default function Landing() {

  const Hero = () => (
    <section className="hero">
      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        {/* Tagline */}
        <div className="hero-tagline">
          ✨ Showcase Your Best Work
        </div>

        {/* Title */}
        <h1 className="hero-title">
          Your Projects, <span className="text-gradient">Beautifully Presented</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Join thousands of creators, developers, and designers showcasing their work on Projspectra. 
          Upload, organize, and share your projects with the world.
        </p>

        {/* Buttons */}
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-gradient">Get Started Free →</a>
          <a href="#projects" className="btn btn-gradient-explore">Explore Projects</a>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-number">10K+</div>
            <div className="stat-label">Projects Hosted</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-number">5K+</div>
            <div className="stat-label">Active Creators</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✨</div>
            <div className="stat-number">50K+</div>
            <div className="stat-label">Project Views</div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="landing">
      <Hero />
    </div>
  );
}
