// src/pages/Explore.jsx
import React from "react";
import "./Explore.css";

export default function Explore() {
    
  return (
    <div className="explore-container">
      <h1 className="explore-title">Contact</h1>

      <div className="team-info">
        <div className="team-member">
          <h2>Director</h2>
          <p>Muhammad Daaem Butt</p>
        </div>

        <div className="team-member">
          <h2>Founder</h2>
          <p>Umer Tahir</p>
        </div>

        <div className="team-member">
          <h2>Our Links</h2>
          <ul>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/daaem" target="_blank">Muhammad Daaem Butt</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/umer-tahir" target="_blank">Umer Tahir</a></li>
          </ul>
        </div>

        <div className="team-member">
          <h2>Contact Number</h2>
          <ul>
            <li>Daaem: +92-3305355769</li>
            <li>Umer: +92-3049366595</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
