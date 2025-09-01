import { useState } from "react";

export default function ProjectsTable() {
  const [projects, setProjects] = useState([
    { id: 1, name: "AI Chatbot", status: "pending" },
    { id: 2, name: "E-commerce Website", status: "pending" },
    { id: 3, name: "Movie Recommendation System", status: "pending" },
  ]);

  const handleDecision = (id, decision) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: decision } : p))
    );
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <h3 className="table-title">Projects</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td
                  className={`status ${
                    project.status === "accepted"
                      ? "status-accepted"
                      : project.status === "rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }`}
                >
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)}
                </td>
                <td className="action-buttons">
                  <button
                    onClick={() => handleDecision(project.id, "accepted")}
                    className="btn-accept"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(project.id, "rejected")}
                    className="btn-reject"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
      
        .table-container {
          background:black;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          width: 700px;
          max-width: 100%;
          overflow-x: auto;
        }

        .table-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #0e7490; /* cyan-700 */
          user-select: none;
        }

        .table {
        text-align : center
          width: 100%;
          border-collapse: collapse;
          
        }

        .table th {
          background: white; /* cyan-100 */
          color: #164e63; /* cyan-900 */
          padding: 0.75rem;
          text-transform: uppercase;
          font-size: 0.85rem;
          border: 1px solid #67e8f9; /* cyan-300 */
          user-select: none;
        }

        .table td {
          padding: 1.75rem;
          border: 1px solid #bae6fd; /* cyan-200 */
        }

        .status {
          font-weight: 600;
          text-align: center;
          border-radius: 6px;
        }

        .status-accepted {
          background: #dcfce7; /* green-100 */
          color: #15803d; /* green-700 */
        }

        .status-rejected {
          background: #fee2e2; /* red-100 */
          color: #b91c1c; /* red-700 */
        }

        .status-pending {
          background: #FFA500; /* gray-100 */
          color:black/* gray-600 */
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
        }

        .btn-accept {
          background: #16a34a; /* green-600 */
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.3s ease;
          border: none;
        }

        .btn-accept:hover {
          background: #15803d; /* green-700 */
        }

        .btn-reject {
          background: #dc2626; /* red-600 */
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.3s ease;
          border: none;
        }

        .btn-reject:hover {
          background: #b91c1c; /* red-700 */
        }
      `}</style>
    </div>
  );
}
