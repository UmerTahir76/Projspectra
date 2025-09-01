import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project.projectId}`);
  };

  return (
    <div className="project-card" onClick={handleClick}>
      {/* Cover Image from Cloudinary */}
      <img src={project.coverImage} alt={project.projectTitle} />

      {/* Project Title */}
      <h3>{project.projectTitle}</h3>

      {/* Project Description */}
      <p>{project.description}</p>

      {/* Tags - Project Category ko bhi include karein */}
      <div className="tags">
        {/* Pehle project category show karein */}
        {project.projectCategory && (
          <span key="category" className="tag">
            {project.projectCategory}
          </span>
        )}
        
        {/* Phir additional tags */}
        {project.tags?.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="stats">
        <span>👁️ {project.views || 0}</span>
        <span>❤️ {project.likes || 0}</span>
      </div>
    </div>
  );
}