import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function PersonalInfo() {
  const [user, setUser] = useState(null);
  const [projectCount, setProjectCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchProjectCount(currentUser.email);
    }
  }, []);

  const fetchProjectCount = async (email) => {
    try {
      const q = query(collection(db, "projects"), where("userEmail", "==", email));
      const querySnapshot = await getDocs(q);
      setProjectCount(querySnapshot.size);
    } catch (error) {
      console.error("Error fetching project count:", error);
    }
  };

  return (
    <div className="profile-page">
      <h1>Personal Information</h1>
      <div className="profile-content">
        {user ? (
          <div className="personal-info">
            <p><strong>Username:</strong> {user.displayName || user.email?.split('@')[0] || "N/A"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Total Projects:</strong> {projectCount}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
      <button
        onClick={() => navigate("/profile")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Back to Profile
      </button>
    </div>
  );
}
