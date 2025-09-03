
export const deleteProject = async (projectId, setProjects) => {
  if (!window.confirm("Are you sure you want to delete this project?")) return;

  try {
    const res = await fetch("http://localhost:5000/deleteProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Project deleted successfully!");
      // Update frontend state
      if (setProjects) {
        setProjects((prev) => prev.filter((p) => p.projectId !== projectId));
      }
    } else {
      alert("Failed to delete project");
    }
  } catch (err) {
    console.error("Error deleting project:", err);
    alert("Error deleting project");
  }
};
