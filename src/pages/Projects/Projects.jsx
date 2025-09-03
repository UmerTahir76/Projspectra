import React, { useContext, useState } from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";
import { ProjectContext } from "../../context/ProjectProvider.jsx";
import "./Project.css";
import { deleteProject } from "../../utils/DeleteProject.jsx"; // <- tumhari utility
import UploadProjectForm from "../../components/UploadPeoject/UploadProjectForm.jsx";
import { uploadToCloudinary } from "../../utils/UploadtoCloudinary.jsx";

export default function Projects() {
  const { projects, loading, currentUser, editProject, setProjects } = useContext(ProjectContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const tabs = ["All", "web", "app", "ai", "ecomm"];

  // Filter projects based on search and tab
  const filteredProjects = projects.filter(
    (project) =>
      (activeTab === "All" || project.projectCategory === activeTab) &&
      project.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Delete using utility
  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId, setProjects);
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project. Check console.");
    }
  };

  // Handle Update
  const handleUpdate = async (updateData) => {
    setUpdateLoading(true);
    try {
      // Upload new cover image
      let newCoverImage = null;
      if (updateData.coverImage) {
        const uploaded = await uploadToCloudinary(updateData.coverImage);
        newCoverImage = { url: uploaded.url, publicId: uploaded.publicId };
      }

      // Upload new supporting images
      let newSupportingImages = [];
      if (updateData.supportingImages && updateData.supportingImages.length > 0) {
        for (const file of updateData.supportingImages) {
          const uploaded = await uploadToCloudinary(file);
          newSupportingImages.push({ url: uploaded.url, publicId: uploaded.publicId });
        }
      }

      // Upload new video
      let newVideo = null;
      if (updateData.video) {
        const uploaded = await uploadToCloudinary(updateData.video);
        newVideo = { url: uploaded.url, publicId: uploaded.publicId };
      }

      // Prepare data for backend
      const backendData = {
        projectId: updateData.projectId,
        projectTitle: updateData.projectTitle,
        projectCategory: updateData.projectCategory,
        languages: updateData.languages,
        description: updateData.description,
        githubLink: updateData.githubLink,
        liveLink: updateData.liveLink,
        toDeleteCover: updateData.toDeleteCover,
        toDeleteSupporting: updateData.toDeleteSupporting,
        toDeleteVideo: updateData.toDeleteVideo,
        newCoverImage,
        newSupportingImages,
        newVideo,
      };

      // Call backend
      const res = await fetch("http://localhost:5000/updateProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Project updated successfully!");
        // Update the project in state
        editProject(updateData.projectId, (prev) => ({
          ...prev,
          projectTitle: updateData.projectTitle,
          projectCategory: updateData.projectCategory,
          languages: updateData.languages,
          description: updateData.description,
          githubLink: updateData.githubLink,
          liveLink: updateData.liveLink,
          coverImage: newCoverImage || (updateData.toDeleteCover ? null : prev.coverImage),
          supportingImages: [
            ...(prev.supportingImages || []).filter(img => !updateData.toDeleteSupporting.includes(img.publicId)),
            ...newSupportingImages
          ],
          video: newVideo || (updateData.toDeleteVideo ? null : prev.video),
        }));
        setShowForm(false);
        setEditingProject(null);
      } else {
        alert("Failed to update project");
      }
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Error updating project");
    } finally {
      setUpdateLoading(false);
    }
  };

  // Handle Edit
  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

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
          <div className="user-welcome">
            <p>Welcome, <strong>{currentUser.email}</strong></p>
            <p>You have {projects.length} projects</p>
          </div>

          <div className="search-section">
            <input
              type="text"
              placeholder="Search your projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

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

          <div className="project-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                  showActions={true}
                  onDelete={() => handleDelete(project.projectId)}
                  onEdit={() => handleEdit(project)}
                />
              ))
            ) : projects.length > 0 ? (
              <p>No projects found matching your search.</p>
            ) : (
              <p>No projects found. Create your first project!</p>
            )}
          </div>

          {showForm && (
          <>
            <div className="upload-form-backdrop" onClick={() => setShowForm(false)}></div>
            <div className="upload-form-modal">
              <button className="modal-close-btn" onClick={() => setShowForm(false)}>✕</button>
              <UploadProjectForm
                isEditing={true}
                project={editingProject}
                onUpdate={handleUpdate}
                loading={updateLoading}
              />
            </div>
          </>
          )}
        </>
      )}
    </div>
  );
}
