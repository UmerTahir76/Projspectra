import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const listenUserProjects = (userEmail, setProjects) => {
  try {
    const q = query(
      collection(db, "projects"),
      where("userEmail", "==", userEmail)
    );

    // Realtime listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          projectId: data.projectId || doc.id,
        };
      });

      setProjects(projects); // state update hogi har change pe
    });

    return unsubscribe; // later cleanup ke liye
  } catch (err) {
    console.error("Error listening projects:", err);
    return () => {};
  }
};
