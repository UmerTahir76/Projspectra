import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase.js';

export default function UserProjects() {
  const { email } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const decodedEmail = decodeURIComponent(email);
        const q = query(
          collection(db, 'projects'),
          where('userEmail', '==', decodedEmail)
        );
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching user projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, [email]);

  const handleDecision = async (id, decision) => {
    try {
      const projectRef = doc(db, 'projects', id);
      await updateDoc(projectRef, {
        status: decision
      });
      setProjects(prev =>
        prev.map(p => p.id === id ? { ...p, status: decision } : p)
      );
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="projects-container">
      <h2 className="projects-title">Projects by {decodeURIComponent(email)}</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <h3 className="project-title">{project.projectTitle}</h3>
            <p className="project-email">User: {project.userEmail}</p>
            <p className={`project-status status-${project.status}`}>
              Status: {project.status}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .projects-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .projects-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
          color: #22d3ee;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .project-card {
          background: #1e293b;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border: 1px solid #334155;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #f1f5f9;
        }

        .project-email {
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }

        .project-status {
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .status-verified {
          color: #10b981;
        }

        .status-reject {
          color: #ef4444;
        }

        .status-pending {
          color: #f59e0b;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}
