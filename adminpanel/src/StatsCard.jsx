export default function StatsCards() {
  const stats = [
    { title: "Total Projects", value: 24 },
    { title: "Accepted", value: 12 },
    { title: "Rejected", value: 5 },
    { title: "Pending", value: 7 },
  ];

  return (
    <>
      <section className="beast-stats">
        {stats.map((stat, index) => (
          <article
            key={index}
            className="beast-stats__card"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <h3 className="beast-stats__title">{stat.title}</h3>
            <p className="beast-stats__value">{stat.value}</p>
          </article>
        ))}
      </section>

      <style jsx>{`
        .beast-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 3fr));
          gap: 2rem;
          padding: 2rem 1rem;
        }

        .beast-stats__card {
          background: linear-gradient(135deg, #0e7490, #22d3ee);
          border-radius: 1rem;
          padding: 2.5rem 1.5rem;
          box-shadow: 0 10px 25px rgba(34, 211, 238, 0.4);
          color: #e0f2fe;
          text-align: center;
          cursor: default;
          user-select: none;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .beast-stats__card:hover,
        .beast-stats__card:focus {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 15px 40px rgba(34, 211, 238, 0.7);
          outline: none;
        }

        .beast-stats__title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: #bae6fd;
          text-shadow: 0 0 6px rgba(186, 230, 253, 0.7);
        }

        .beast-stats__value {
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: 3rem;
          color: #cffafe;
          text-shadow: 0 0 10px rgba(207, 250, 254, 0.9);
          margin: 0;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive tweaks */
        @media (max-width: 640px) {
          .beast-stats {
            grid-template-columns: 1fr;
            padding: 1rem;
          }
          .beast-stats__card {
            padding: 2rem 1rem;
          }
          .beast-stats__value {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
}
