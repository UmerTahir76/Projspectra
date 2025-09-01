import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserProjects = async (userEmail) => {
  try {
    console.log("Fetching projects for:", userEmail);
    
    const q = query(
      collection(db, "projects"),
      where("userEmail", "==", userEmail),
    
    );
    
    const querySnapshot = await getDocs(q);
    console.log("Number of projects found:", querySnapshot.size);
    
    const projects = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log("Project data:", data);
      return data;
    });
    
    return projects;
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
};