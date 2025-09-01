import React, { createContext, useState, useEffect } from "react";
import { fetchUserProjects } from "../utils/FetchProjects.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

export const ProjectContext = createContext();

export default function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed, user:", user);
      setCurrentUser(user);
      
      if (user && user.email) {
        console.log("Loading projects for user:", user.email);
        const loadProjects = async () => {
          const data = await fetchUserProjects(user.email);
          console.log("Projects loaded:", data);
          setProjects(data);
          setLoading(false);
        };
        loadProjects();
      } else {
        console.log("No user signed in");
        setProjects([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, loading, currentUser }}>
      {children}
    </ProjectContext.Provider>
  );
}