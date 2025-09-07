import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.js';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => doc.data());

        // Group projects by userEmail and count
        const userMap = {};
        projectsData.forEach(project => {
          const email = project.userEmail || project.userGmail || project.email;
          if (email) {
            if (!userMap[email]) {
              userMap[email] = { email, projectCount: 0 };
            }
            userMap[email].projectCount += 1;
          }
        });

        const usersArray = Object.values(userMap);
        setUsers(usersArray);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (email) => {
    navigate(`/users/${encodeURIComponent(email)}`);
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="users-container">
      <h2 className="users-title">Users</h2>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Total Projects</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} onClick={() => handleUserClick(user.email)} className="user-row">
                <td>{user.email}</td>
                <td>{user.projectCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .users-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .users-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
          color: #22d3ee;
        }

        .table-container {
          background: #1e293b;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          overflow-x: auto;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
        }

        .users-table th {
          background: #334155;
          color: #f1f5f9;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
        }

        .users-table td {
          padding: 1rem;
          border-bottom: 1px solid #334155;
          color: #f1f5f9;
        }

        .user-row {
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .user-row:hover {
          background: #334155;
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
