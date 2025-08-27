import React, { useState } from "react";
import "./Header.css";
import Authen from "../../pages/Landing/Authen.jsx";


export default function Header() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <h1 className="logo">BitSpectra</h1>
          <nav>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/explore">Explore</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>

          <div className="flex gap-x-6">
            <button className="btn-primary" onClick={() => setShowAuth(true)}>
              Login
            </button>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </header>

      {/* Modal */}
      {showAuth && (
        <div className="authen-modal">
          <Authen onClose={() => setShowAuth(false)} />
        </div>
      )}
    </>
  );
}
