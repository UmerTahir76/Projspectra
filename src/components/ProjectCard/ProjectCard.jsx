import React, { useContext } from "react";
import  {ProjectContext}  from "../../context/ProjectProvider.jsx";
import "./ProjectCard.css";

export default function ProjectCard(){
  const { projects } = useContext(ProjectContext);

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <img src={project.imageUrl} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tags">
            {project.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="stats">
            <span>👁️ {project.views}</span>
            <span>❤️ {project.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

