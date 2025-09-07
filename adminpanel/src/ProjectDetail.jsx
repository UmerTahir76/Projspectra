import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase.js';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, 'projects', id);
        const projectSnap = await getDoc(projectRef);
        if (projectSnap.exists()) {
          setProject({ id: projectSnap.id, ...projectSnap.data() });
        } else {
          console.error('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDecision = async (decision) => {
    if (!comment.trim()) {
      alert('Please enter a comment before accepting or rejecting.');
      return;
    }
    const userEmail = project.userGmail || project.userEmail || project.email;
    if (!project || !userEmail) {
      console.log('Project data:', project); // Debug log
      alert('Project data is incomplete. User email field not found. Please check Firestore field name (userGmail, userEmail, or email).');
      return;
    }
    setUpdating(true);
    try {
      // Update project status
      const projectRef = doc(db, 'projects', id);
      await updateDoc(projectRef, {
        status: decision
      });

      // Check if chat document already exists for this project
      const chatQuery = query(
        collection(db, 'chat'),
        where('projectTitle', '==', project.projectTitle),
        where('userGmail', '==', userEmail)
      );
      const chatSnapshot = await getDocs(chatQuery);

      if (!chatSnapshot.empty) {
        // Update existing chat document
        const chatDoc = chatSnapshot.docs[0];
        await updateDoc(doc(db, 'chat', chatDoc.id), {
          status: decision,
          message: comment
        });
      } else {
        // Create new chat document
        await addDoc(collection(db, 'chat'), {
          from: 'admin',
          userGmail: userEmail,
          status: decision,
          message: comment,
          projectTitle: project.projectTitle
        });
      }

      // Navigate back to projects
      navigate('/projects');
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading project details...</div>;
  }

  if (!project) {
    return <div className="error">Project not found.</div>;
  }

  return (
    <div className="project-detail-container">
      <h2 className="project-detail-title">{project.projectTitle}</h2>

      <div className="project-detail-section">
        <h3>Languages</h3>
        <p>{project.languages || 'Not specified'}</p>
      </div>

      <div className="project-detail-section">
        <h3>Description</h3>
        <p>{project.description || 'No description available'}</p>
      </div>

      <div className="project-detail-section">
        <h3>Cover Image</h3>
        {project.coverImage ? (
          <img src={project.coverImage} alt="Cover" className="cover-image" />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>

      <div className="project-detail-section">
        <h3>Supporting Images</h3>
        {project.supportingImages && project.supportingImages.length > 0 ? (
          <div className="images-gallery">
            {project.supportingImages.map((img, index) => (
              <img key={index} src={img} alt={`Supporting ${index + 1}`} className="supporting-image" />
            ))}
          </div>
        ) : (
          <p>No supporting images</p>
        )}
      </div>

      <div className="project-detail-section">
        <h3>Video</h3>
        {project.video ? (
          <video controls className="project-video">
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video available</p>
        )}
      </div>

      <div className="project-detail-section">
        <h3>Links</h3>
        {project.links && project.links.length > 0 ? (
          <ul>
            {project.links.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No links provided</p>
        )}
      </div>

      <div className="comment-section">
        <h3>Leave a Comment</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your message here..."
          rows="4"
          className="comment-textarea"
        />
      </div>

      <div className="actions-section">
        <button
          onClick={() => handleDecision('verified')}
          className="btn-accept"
          disabled={updating || project.status === 'verified'}
        >
          {updating ? 'Updating...' : 'Accept'}
        </button>
        <button
          onClick={() => handleDecision('reject')}
          className="btn-reject"
          disabled={updating || project.status === 'reject'}
        >
          {updating ? 'Updating...' : 'Reject'}
        </button>
      </div>

      <style>
        {`
        .project-detail-container {
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
          background: #0f172a;
          color: #f1f5f9;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .project-detail-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
          color: #22d3ee;
        }

        .project-detail-section {
          margin-bottom: 2rem;
        }

        .project-detail-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #f1f5f9;
        }

        .cover-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .no-image {
          width: 100%;
          height: 200px;
          background: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: #94a3b8;
          font-size: 1.125rem;
        }

        .images-gallery {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .supporting-image {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
        }

        .project-video {
          max-width: 100%;
          border-radius: 8px;
        }

        .comment-section {
          margin-bottom: 2rem;
        }

        .comment-textarea {
          width: 100%;
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid #334155;
          background: #1e293b;
          color: #f1f5f9;
          resize: vertical;
        }

        .actions-section {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-accept {
          background: #10b981;
          color: white;
          padding: 0.75rem 1.5rem;
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
          padding: 0.75rem 1.5rem;
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

        .error {
          text-align: center;
          padding: 2rem;
          color: #ef4444;
        }
        `}
      </style>
    </div>
  );
}
