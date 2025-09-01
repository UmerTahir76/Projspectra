import React, { useState, useEffect } from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";
import "./Explore.css"; // Naya CSS file

// Alag function for fetching all projects
const fetchAllProjects = async () => {
  try {
    const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
    const { db } = await import("../../firebase");
    
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const projects = snapshot.docs.map(doc => doc.data());
    return projects;
  } catch (err) {
    console.error("Error fetching all projects:", err);
    return [];
  }
};

export default function Explore() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "web", "app", "ai", "ecomm"];

  // Load all projects on component mount
  useEffect(() => {
    const loadAllProjects = async () => {
      const data = await fetchAllProjects();
      setProjects(data);
      setLoading(false);
    };
    
    loadAllProjects();
  }, []);

  // Filter projects based on search and tab
  const filteredProjects = projects.filter(
    (project) =>
      (activeTab === "All" || project.projectCategory === activeTab) &&
      project.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="explore-page">
        <h1>Explore Projects</h1>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="explore-page">
      <h1>Explore Projects</h1>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search projects..."
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

      {/* Project Count */}
      <div className="project-count">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {/* Project List */}
      <div className="project-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.projectId} project={project} />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}