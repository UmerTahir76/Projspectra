import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../../context/ProjectProvider";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { projects } = useContext(ProjectContext);
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First try to find the project in context (user's own projects)
    const contextProject = projects.find(p => p.projectId === projectId);
    
    if (contextProject) {
      setProject(contextProject);
      setLoading(false);
    } else {
      // If not found in context, fetch from Firestore
      const fetchProject = async () => {
        try {
          const { doc, getDoc } = await import("firebase/firestore");
          const { db } = await import("../../firebase");
          
          const projectDoc = await getDoc(doc(db, "projects", projectId));
          
          if (projectDoc.exists()) {
            setProject(projectDoc.data());
          } else {
            setProject(null);
          }
        } catch (err) {
          console.error("Error fetching project:", err);
          setProject(null);
        } finally {
          setLoading(false);
        }
      };
      
      fetchProject();
    }
  }, [projectId, projects]);

  if (loading) return <p className="loading">Loading project...</p>;
  if (!project) return <p className="not-found">Project not found</p>;

  return (
    <div className="project-detail-container">
      {/* Rest of your JSX remains the same */}
      <header className="project-header">
        <h1 className="project-title">{project.projectTitle}</h1>
        <p className="project-languages">{project.languages}</p>
      </header>

      {/* Cover Image */}
      <div className="cover-image-container">
        <img src={project.coverImage.url} alt={project.projectTitle} className="cover-image"/>
      </div>

      {/* Description */}
      <section className="project-section">
        <h2>Description</h2>
        <p>{project.description}</p>
      </section>

      {/* Supporting Images */}
      {project.supportingImages?.length > 0 && (
        <section className="project-section">
          <h2>Supporting Images</h2>
          <div className="supporting-images-grid">
            {project.supportingImages.map((img, idx) => (
              <div className="supporting-card" key={idx}>
                <img src={img.url} alt={`Supporting ${idx + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video */}
      {project.video && (
        <section className="project-section">
          <h2>Project Video</h2>
          <video controls className="project-video">
            <source src={project.video.url} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </section>
      )}

      {/* Links */}
      {(project.githubLink || project.liveLink) && (
        <section className="project-section links-section">
          <h2>Links</h2>
          <div className="links-wrapper">
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub Repo</a>}
            {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Project</a>}
          </div>
        </section>
      )}
    </div>
  );
}