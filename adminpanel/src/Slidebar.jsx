import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div 
        className="beast-sidebar-trigger"
        onMouseEnter={() => setIsSidebarOpen(true)}
      />
      <aside 
        className={`beast-sidebar ${isSidebarOpen ? 'beast-sidebar--open' : ''}`}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <h1 className="beast-sidebar__title">Admin Panel</h1>
        <ul className="beast-sidebar__nav">
          {['Dashboard', 'Projects', 'Users', 'Reports', 'Settings'].map((item) => {
            const to = item === 'Dashboard' ? '/dashboard' : item === 'Projects' ? '/projects' : item === 'Users' ? '/users' : '#';
            return (
              <li key={item} className="beast-sidebar__nav-item">
                <Link to={to} className="beast-sidebar__nav-link">
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      <style jsx>{`
        /* Sidebar container */
        .beast-sidebar {
          background: #0f172a; /* very dark blue/gray */
          width: 240px; /* adjusted professional width */
          min-height: 100vh;
          padding: 2.5rem 2rem;
          box-shadow: 4px 0 30px rgba(14, 20, 42, 0.8);
          display: flex;
          flex-direction: column;
          user-select: none;
          position: fixed;
          top: 0;
          left: 0;
          overflow-y: auto;
          z-index: 1000;
          transform: translateX(-100%);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .beast-sidebar--open {
            transform: translateX(0);
        }

        /* Sidebar trigger area */
        .beast-sidebar-trigger {
          position: fixed;
          left: 0;
          top: 0;
          width: 20px; /* Adjust this width to control the trigger area */
          height: 100vh;
          z-index: 1001; /* Must be above the sidebar to trigger hover */
        }

        /* Sidebar title */
        .beast-sidebar__title {
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: 2.4rem;
          color: #22d3ee; /* bright cyan */
          margin-bottom: 2.5rem;
          letter-spacing: 0.15em;
          text-shadow: 0 0 10px #22d3ee;
        }

        /* Navigation list */
        .beast-sidebar__nav {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        /* Navigation item */
        .beast-sidebar__nav-item {
          opacity: 1; /* Reset to always visible, animations will be handled by parent */
          transform: translateX(0);
        }

        /* Navigation link */
        .beast-sidebar__nav-link {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 1.2rem;
          color: #94a3b8;
          text-decoration: none;
          padding: 0.7rem 1.2rem;
          border-radius: 10px;
          display: block;
          box-shadow: inset 0 0 0 0 #22d3ee;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          cursor: pointer;
        }

        .beast-sidebar__nav-link:hover,
        .beast-sidebar__nav-link:focus {
          color: #0f172a;
          background: #22d3ee;
          box-shadow: inset 0 0 8px 2px #22d3ee;
          outline: none;
          transform: scale(1.04);
          font-weight: 700;
        }

        /* Scrollbar styling */
        .beast-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        .beast-sidebar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .beast-sidebar::-webkit-scrollbar-thumb {
          background: #22d3ee;
          border-radius: 10px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .beast-sidebar {
            width: 200px;
            padding: 2rem 1.2rem;
          }
          .beast-sidebar__title {
            font-size: 1.8rem;
            margin-bottom: 1.8rem;
          }
          .beast-sidebar__nav-link {
            font-size: 1rem;
            padding: 0.5rem 1rem;
          }
        }
         
      `}</style>
    </>
  );
}