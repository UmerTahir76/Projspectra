import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Header.css";
import Authen from "../../pages/Auth/Authen.jsx";
import UploadProjectForm from "../UploadPeoject/UploadProjectForm.jsx";

// 🔹 new imports
import { v4 as uuidv4 } from "uuid";
import { uploadToCloudinary } from "../../utils/UploadtoCloudinary.jsx";
import { db } from "../../firebase.js";
import { doc, setDoc } from "firebase/firestore";

export default function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false); // 🔹 added
  const [authLoading, setAuthLoading] = useState(true); // 🔹 added for auth state loading

  // Listen to firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false); // 🔹 set loading to false after auth state is determined
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setDrawerOpen(false);
    setIsRegistered(false);
  };

  // 🔹 handleUpload function
  const handleUpload = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    const {
      projectTitle,
      projectCategory,
      languages,
      description,
      coverImage,
      supportingImages,
      video,
      githubLink,
      liveLink,
    } = data;

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please login first!");
        setLoading(false);
        return;
      }

      const projectId = uuidv4();
      let coverData = null;
      let videoData = null;
      let supportingData = [];

      if (coverImage) {
        coverData = await uploadToCloudinary(coverImage, "coverImages");
      }

      for (const img of supportingImages) {
        const imgData = await uploadToCloudinary(img, "supportingImages");
        supportingData.push(imgData);
      }

      if (video) {
        videoData = await uploadToCloudinary(video, "projectVideos");
      }

      await setDoc(doc(db, "projects", projectId), {
        projectId,
        userEmail: user.email,
        projectTitle,
        projectCategory,
        languages,
        description,
        coverImage: coverData,
        supportingImages: supportingData,
        video: videoData,
        githubLink,
        liveLink,
        status: "pending",
        createdAt: new Date(),
      });

      alert("Project uploaded successfully!");
      setShowUploadForm(false);
    } catch (err) {
      console.error("Upload Error: ", err);
      alert("Failed to upload project.");
    } finally {
      setLoading(false);
    }
  };

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
            {authLoading ? (
              // Show nothing while loading auth state
              <div></div>
            ) : (!user || isRegistered) ? (
              <>
                <button className="btn-primary" onClick={() => setShowAuth(true)}>Login</button>
                <button className="btn-primary" onClick={() => setShowAuth(true)}>Get Started</button>
              </>
            ) : (
              <button className="menu-btn" onClick={() => setDrawerOpen(true)}>☰</button>
            )}
          </div>
        </div>
      </header>

      {/* Drawer */}
      {user && !isRegistered && (
        <div className={`drawer ${drawerOpen ? "open" : ""}`}>
          <span className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</span>
          <ul>
            <li><a href="/profile" onClick={() => setDrawerOpen(false)}>👤 Your Profile</a></li>
            <li><a href="/projects" onClick={() => setDrawerOpen(false)}>📂 Your Projects</a></li>
            <li><a href="/chat" onClick={() => setDrawerOpen(false)}>💬 Chat</a></li>
            <li>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setShowUploadForm(true);
                  setDrawerOpen(false);
                }}
              >
                ⬆️ Upload a Project
              </a>
            </li>
            <li><a href="#" onClick={handleLogout}>🚪 Logout</a></li>
          </ul>
        </div>
      )}

      {drawerOpen && <div className="backdrop" onClick={() => setDrawerOpen(false)}></div>}

      {/* Upload Form Modal */}
      {showUploadForm && (
        <>
          <div className="upload-form-backdrop" onClick={() => setShowUploadForm(false)}></div>
          <div className="upload-form-modal">
            <button className="modal-close-btn" onClick={() => setShowUploadForm(false)}>✕</button>
            <UploadProjectForm handleUpload={handleUpload} loading={loading} />
          </div>
        </>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <Authen
          closeModal={() => setShowAuth(false)}
          onRegisterSuccess={() => {
            setIsRegistered(true);
            setShowAuth(false);
          }}
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
            setIsRegistered(false);
            setShowAuth(false);
          }}
        />
      )}
    </>
  );
}
