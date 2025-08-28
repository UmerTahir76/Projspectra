import React, { useState } from "react";
import "./Authen.css";

export default function Authen({ closeModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Here you would call your backend API to send a reset password email
    alert(`Password reset link sent to ${resetEmail}`);
    setShowForgotPassword(false);
    setResetEmail("");
  };

  return (
    <div className="authen-modal">
      <div className="authen-card">
        {/* Close button */}
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>

        {showForgotPassword ? (
          <>
            <h2 className="authen-title">Reset Your Password</h2>
            <form className="authen-form" onSubmit={handleForgotPasswordSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <button className="submit-btn" type="submit">
                Send Reset Link
              </button>

              <p className="switch-auth">
                Remembered your password?{" "}
                <span
                  onClick={() => {
                    setShowForgotPassword(false);
                    setShowRegister(false);
                  }}
                >
                  Back to Login
                </span>
              </p>
            </form>
          </>
        ) : showRegister ? (
          <>
            <h2 className="authen-title">Join the Spectra-Family</h2>
            <form className="authen-form">
              <div className="form-group">
                <input type="text" placeholder="First Name" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Last Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="show-pass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <button className="submit-btn" type="submit">
                Register
              </button>

              <div className="social-login">
                <button className="google-btn">
                  <img
                    src="/google-outline.svg"
                    alt="Google"
                    className="google-logo"
                  />
                  Continue with Google
                </button>
              </div>

              <p className="switch-auth">
                Already have an account?{" "}
                <span onClick={() => setShowRegister(false)}>Login</span>
              </p>
            </form>
          </>
        ) : (
          <>
            <h4 className="authen-title">Welcome to Spectra Hub</h4>
            <form className="authen-form">
              <div className="form-group">
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="show-pass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <p
                className="forgot-pass"
                onClick={() => setShowForgotPassword(true)}
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                Forgot Password?
              </p>

              <button className="submit-btn" type="submit">
                Login
              </button>

              <p className="switch-auth">
                Don't have an account?{" "}
                <span onClick={() => setShowRegister(true)}>Create one</span>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
