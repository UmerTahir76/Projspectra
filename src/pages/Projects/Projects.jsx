import React, { useContext, useState } from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";
import { ProjectContext } from "../../context/ProjectProvider.jsx";
import "./Project.css";

export default function Projects() {
  const { projects, loading, currentUser } = useContext(ProjectContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "web", "app", "ai", "ecomm"];

  // Filter projects based on search and tab
  const filteredProjects = projects.filter(
    (project) =>
      (activeTab === "All" || project.projectCategory === activeTab) &&
      project.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="projects-page">
        <h1>My Projects</h1>
        <p>Loading projects...</p>
      </div>
    );  
  }

  return (
    <div className="projects-page">
      <h1>My Projects</h1>
      
      {!currentUser ? (
        <div className="auth-message">
          <p>Please sign in to view your projects</p>
        </div>
      ) : (
        <>
          {/* Welcome message with user email */}
          <div className="user-welcome">
            <p>Welcome, <strong>{currentUser.email}</strong></p>
            <p>You have {projects.length} projects</p>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <input
              type="text"
              placeholder="Search your projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Project List */}
          <div className="project-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))
            ) : projects.length > 0 ? (
              <p>No projects found matching your search.</p>
            ) : (
              <p>No projects found. Create your first project!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}