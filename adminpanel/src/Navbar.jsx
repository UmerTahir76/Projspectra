export default function Navbar() {
  return (
    <>
      <nav className="beast-navbar">
        <h2 className="beast-navbar__title">Dashboard</h2>
        <div className="beast-navbar__profile">
          <span className="beast-navbar__admin-label">Admin Panel</span>
          <img
            src="data:image/jpeg;base64,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"
            alt="profile"
            className="beast-navbar__avatar"
            loading="lazy"
          />
        </div>
      </nav>

      <style jsx>{`
        /* Navbar container */
        .beast-navbar {
          background: linear-gradient(135deg, #0e7490, #22d3ee);
          box-shadow: 0 8px 24px rgba(14, 116, 144, 0.6);
          padding: 1rem 8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          user-select: none;
          position: relative;
          overflow: hidden;
           width: 100%;
  max-width: 1200px;
  margin: 0 auto;
        }

        /* Title with fade-in-down animation */
        .beast-navbar__title {
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: 2.5rem;
          color: #cffafe;
          letter-spacing: 0.15em;
          animation: fadeInDown 0.7s ease forwards;
          margin: 0;
          text-shadow: 0 0 8px rgba(207, 250, 254, 0.8);
        }

        /* Profile container */
        .beast-navbar__profile {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          animation: fadeIn 0.7s ease forwards;
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        /* Admin label */
        .beast-navbar__admin-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #a5f3fc;
          cursor: default;
          user-select: none;
          text-shadow: 0 0 2px rgba(165, 243, 252, 0.7);
          transition: color 0.3s ease;
        }

        .beast-navbar__admin-label:hover,
        .beast-navbar__admin-label:focus {
          color: #e0f2fe;
          outline: none;
        }

        /* Avatar image */
        .beast-navbar__avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 3px solid #22d3ee;
          box-shadow: 0 4px 15px rgba(34, 211, 238, 0.7);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          will-change: transform;
        }

        .beast-navbar__avatar:hover,
        .beast-navbar__avatar:focus {
          transform: scale(1.15) rotate(5deg);
          box-shadow: 0 2px 30px rgba(34, 211, 238, 0.9);
          outline: none;
        }

        /* Animations */
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive tweaks */
        @media (max-width: 640px) {
          .beast-navbar {
            padding: 1rem 1.5rem;
          }
          .beast-navbar__title {
            font-size: 1.8rem;
            letter-spacing: 0.1em;
          }
          .beast-navbar__profile {
            gap: 1rem;
          }
          .beast-navbar__avatar {
            width: 40px;
            height: 40px;
            border-width: 2px;
          }
        }
      `}</style>
    </>
  );
}
