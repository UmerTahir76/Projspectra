import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Contact = () => {
  const team = [
    {
      name: "Muhammad Daaem Butt",
      role: "Director",
      image: "public/sim.jpg",
      linkedin: "https://www.linkedin.com/in/muhammad-daaem-451900379/",
      phone: "+92-330-5355769",
    },
    {
      name: "Umer Tahir",
      role: "Founder",
      image: "/umer.jpg",
      linkedin: "https://www.linkedin.com/in/umer-ali-tahir/",
      phone: "+92-304-9366595",
    },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Carousel Section */}
      <div
        id="aboutCarousel"
        className="carousel slide flex-grow-1 d-flex align-items-center justify-content-center"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {team.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#aboutCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner text-center">
          {team.map((member, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="d-flex flex-column align-items-center justify-content-center">
                <img
                  src={member.image}
                  className="rounded-circle mb-3 shadow-lg"
                  alt={member.name}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    border: "5px solid #0dd1fdff",
                  }}
                />
                <h5 className="fw-bold">{member.name}</h5>
                <p className="text-muted">{member.role}</p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {member.linkedin}
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> {member.phone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#aboutCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#aboutCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Bio / About Section */}
      <div className="container my-5">
        <div className="text-center">
          <h2 className="fw-bold">About BitSpectra</h2>
          <p className="lead mt-3">
            BitSpectra is a platform designed to **empower developers and
            innovators** by providing a space where you can upload, share, and
            showcase your projects with the world.  
            Our mission is to create a professional environment where talent
            meets opportunity — whether you are a student, a freelancer, or an
            entrepreneur, BitSpectra helps you grow and get recognized.  
          </p>
          <p className="text-muted">
            We believe in collaboration, creativity, and innovation. By
            uploading your projects, you will not only showcase your work but
            also inspire others, gain feedback, and be part of a growing
            community of tech enthusiasts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
