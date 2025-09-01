import React, { useState } from "react";
import { auth, db } from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Authen.css";

export default function Authen({ closeModal , onRegisterSuccess, onLoginSuccess}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // helper: firestore me save karna
  const saveUserToFirestore = async (user, extra = {}) => {
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          firstName: extra.firstName || user.displayName?.split(" ")[0] || "",
          lastName: extra.lastName || user.displayName?.split(" ")[1] || "",
          email: user.email,
          password: extra.password || "",
          createdAt: new Date(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Firestore save error:", err.message);
    }
  };

  // Register new user
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await saveUserToFirestore(user, { firstName, lastName, password });

      // ✅ parent ko notify karna ke ye REGISTER hai
      if (onRegisterSuccess) {
        onRegisterSuccess(user);
      }
      closeModal(); // modal auto-close
    } catch (err) {
      alert(err.message);
    }
  };

  // Login existing user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      closeModal(); // modal auto-close
    } catch (err) {
      alert(err.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user);
      closeModal(); // modal auto-close
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="authen-modal">
      <div className="authen-card">
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>

        {showRegister ? (
          <>
            <h2 className="authen-title">Join the Spectra-Family</h2>
            <form className="authen-form" onSubmit={handleRegister}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <button
                  type="button"
                  className="google-btn"
                  onClick={handleGoogleLogin}
                >
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
            <h2 className="authen-title">Welcome Spectra-Family!</h2>
            <form className="authen-form" onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="show-pass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <p className="forgot-pass">Forgot Password?</p>

              <button className="submit-btn" type="submit">
                Login
              </button>

              <div className="social-login">
                <button
                  type="button"
                  className="google-btn"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="/google-outline.svg"
                    alt="Google"
                    className="google-logo"
                  />
                  Continue with Google
                </button>
              </div>

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
