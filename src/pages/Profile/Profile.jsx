import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <div className="profile-menu">
        <button onClick={() => navigate("/profile/personal-info")}>
          Personal Information
        </button>
        <button onClick={() => navigate("/profile/your-projects")}>
          Your Projects
        </button>
        <button onClick={() => navigate("/profile/settings")}>
          Settings
        </button>
      </div>
    </div>
  );
}
