import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function UserProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      fetchUserProjects(currentUser.email);
    }
  }, []);

  const fetchUserProjects = async (email) => {
    try {
      const q = query(collection(db, "projects"), where("userEmail", "==", email));
      const querySnapshot = await getDocs(q);
      const userProjects = querySnapshot.docs.map(doc => doc.data());
      setProjects(userProjects);
    } catch (error) {
      console.error("Error fetching user projects:", error);
    }
  };

  return (
    <div className="profile-page">
      <h1>Your Projects</h1>
      <div className="profile-content">
        <div className="user-projects">
          {projects.length > 0 ? (
            <ul>
              {projects.map((project) => (
                <li key={project.projectId}>
                  <strong>{project.projectTitle}</strong> - <em>{project.status}</em>
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects found.</p>
          )}
        </div>
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
