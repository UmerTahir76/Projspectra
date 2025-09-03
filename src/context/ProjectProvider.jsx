import React, { createContext, useState, useEffect } from "react";
import { listenUserProjects } from "../utils/FetchProjects.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

export const ProjectContext = createContext();

export default function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubscribeProjects = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user && user.email) {
        unsubscribeProjects = listenUserProjects(user.email, setProjects);
        setLoading(false);
      } else {
        if (unsubscribeProjects) unsubscribeProjects();
        setProjects([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProjects) unsubscribeProjects();
    };
  }, []);

  // Add editProject function to update a project in state
  const editProject = (projectId, updatedData) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.projectId === projectId ? { ...project, ...updatedData } : project
      )
    );
  };

  return (
    <ProjectContext.Provider value={{ projects, loading, currentUser, editProject }}>
      {children}
    </ProjectContext.Provider>
  );
}
