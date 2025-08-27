import React, { useState } from "react";
import "./Landing.css";

export default function Landing() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  const categories = ["All", "Web Dev", "Mobile", "AI/ML", "Blockchain", "Design"];

  // const filtered = mockProjects.filter((p) => {
  //   const q = searchQuery.toLowerCase();
  //   const matchesSearch =
  //     p.title.toLowerCase().includes(q) ||
  //     p.description.toLowerCase().includes(q) ||
  //     p.tags.some((tag) => tag.toLowerCase().includes(q));

  //   const matchesCategory =
  //     selectedCategory === "All" ||
  //     p.tags.some((tag) =>
  //       tag.toLowerCase().includes(selectedCategory.toLowerCase())
  //     );

  //   return matchesSearch && matchesCategory;
  // });

  const Hero = () => (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>
          Build. Share. <span className="highlight">Inspire.</span>
        </h1>
        <p>Showcase your best projects and discover amazing work from creators.</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn primary">Explore Projects</a>
          <a href="#" className="btn secondary">Submit Work</a>
        </div>
      </div>
    </section>
  );

  // const ProjectGrid = () => (
  //   <section id="projects" className="project-section">
  //     <div className="controls">
  //       <input
  //         type="text"
  //         value={searchQuery}
  //         onChange={(e) => setSearchQuery(e.target.value)}
  //         placeholder="Search projects..."
  //       />
  //       <select
  //         value={selectedCategory}
  //         onChange={(e) => setSelectedCategory(e.target.value)}
  //       >
  //         {categories.map((c) => (
  //           <option key={c} value={c}>{c}</option>
  //         ))}
  //       </select>
  //       <div className="view-buttons">
  //         <button
  //           onClick={() => setViewMode("grid")}
  //           className={viewMode === "grid" ? "active" : ""}
  //         >
  //           Grid
  //         </button>
  //         <button
  //           onClick={() => setViewMode("list")}
  //           className={viewMode === "list" ? "active" : ""}
  //         >
  //           List
  //         </button>
  //       </div>
  //     </div>

  //     <div className={viewMode === "grid" ? "grid" : "list"}>
  //       {filtered.map((project) => (
  //         <ProjectCard key={project.id} project={project} />
  //       ))}
  //     </div>
  //   </section>
  // );

  return (
    <div className="landing">
      <Hero />
      {/* <ProjectGrid /> */}
    </div>
  );
}
