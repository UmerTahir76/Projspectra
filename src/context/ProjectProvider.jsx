import React, { createContext, useState } from "react";

// Context create
export const ProjectContext = createContext();

// Dummy projects
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

// Provider Component
export default function ProjectProvider({ children }) {
  const [projects] = useState(mockProjects);

  return (
    <ProjectContext.Provider value={{projects}}>
      {children}
    </ProjectContext.Provider>
  );
};
