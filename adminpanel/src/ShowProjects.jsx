import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.js';

export default function ShowProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
      <h2 className="projects-title">Projects</h2>
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

        .project-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-accept {
          background: #10b981;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn-accept:hover:not(:disabled) {
          background: #059669;
        }

        .btn-accept:disabled {
          background: #6b7280;
          cursor: not-allowed;
        }

        .btn-reject {
          background: #ef4444;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn-reject:hover:not(:disabled) {
          background: #dc2626;
        }

        .btn-reject:disabled {
          background: #6b7280;
          cursor: not-allowed;
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
