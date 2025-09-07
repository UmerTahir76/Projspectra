import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({ project, showActions = false, onDelete, onEdit }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project.projectId}`);
  };

  return (
    <div className="project-card" onClick={handleClick} style={{ position: "relative" }}>
      {/* Time icon for pending status */}
      {project.status === "pending" && (
        <div className="pending-icon" title="Pending Approval">⏳</div>
      )}

      {/* Reject label for rejected status */}
      {project.status === "reject" && (
        <div className="reject-label">REJECT</div>
      )}

      {/* Cover Image from Cloudinary */}
      {project.coverImage ? (
        <img src={project.coverImage.url} alt={project.projectTitle} />
      ) : (
        <div className="no-image-placeholder">No Image Available</div>
      )}

      {/* Project Title */}
      <h3>{project.projectTitle}</h3>

      {/* Project Description */}
      <p>{project.description}</p>

      {/* Tags - Category + Tags */}
      <div className="tags">
        {project.projectCategory && (
          <span key="category" className="tag">
            {project.projectCategory}
          </span>
        )}
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

      {/* Actions (only if allowed) */}
      {showActions && (
        <div className="actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(project);
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(project.projectId);
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}
