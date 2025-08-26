import React, { useState } from "react";
import "./Landing.css";

export default function Landing() {
  const mockProjects = [
    {
      id: "1",
      title: "E-Commerce Dashboard",
      description: "Modern admin dashboard for managing online stores.",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop",
      },
      tags: ["React", "Dashboard", "E-commerce"],
      views: 1234,
      likes: 89,
    },
    {
      id: "1",
      title: "E-Commerce Dashboard",
      description: "Modern admin dashboard for managing online stores.",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop",
      },
      tags: ["React", "Dashboard", "E-commerce"],
      views: 1234,
      likes: 89,
    },
    {
      id: "1",
      title: "E-Commerce Dashboard",
      description: "Modern admin dashboard for managing online stores.",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop",
      },
      tags: ["React", "Dashboard", "E-commerce"],
      views: 1234,
      likes: 89,
    },

    {
      id: "1",
      title: "E-Commerce Dashboard",
      description: "Modern admin dashboard for managing online stores.",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop",
      },
      tags: ["React", "Dashboard", "E-commerce"],
      views: 1234,
      likes: 89,
    },
    {
      id: "2",
      title: "AI Music Generator",
      description: "App that creates original music using neural networks.",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
      author: {
        name: "Alex Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&auto=format&fit=crop",
      },
      tags: ["Python", "AI", "Music"],
      views: 892,
      likes: 156,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  const categories = ["All", "Web Dev", "Mobile", "AI/ML", "Blockchain", "Design"];

  const filtered = mockProjects.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "All" ||
      p.tags.some((tag) =>
        tag.toLowerCase().includes(selectedCategory.toLowerCase())
      );

    return matchesSearch && matchesCategory;
  });

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

  const ProjectCard = ({ project }) => (
    <div className="project-card">
      <img src={project.imageUrl} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tags">
        {project.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <div className="stats">
        <span>👁️ {project.views}</span>
        <span>❤️ {project.likes}</span>
      </div>
    </div>
  );

  const ProjectGrid = () => (
    <section id="projects" className="project-section">
      <div className="controls">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="view-buttons">
          <button
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "active" : ""}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "active" : ""}
          >
            List
          </button>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid" : "list"}>
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="landing">
      <Hero />
      <ProjectGrid />
    </div>
  );
}
