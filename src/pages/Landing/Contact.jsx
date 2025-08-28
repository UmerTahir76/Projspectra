import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Contact = () => {
  const team = [
    {
      name: "Kamran Akbar",
      role: "Director",
      image: "public/kam.jpeg",
      linkedin: "https://www.linkedin.com/in/mkamranakbar/",
      Email: "mkamranakbar@outlook.com",
      phone:" +92-321-8600834"
    
    },
    {
      name: "Umer Tahir",
      role: "Founder",
      image: "/umer.jpg",
      linkedin: "https://www.linkedin.com/in/umer-ali-tahir/",
      Email: "https://github.com/UmerTahir76",
      
      phone: "+92-304-9366595",
    },
    {
      name: "Muhammad Daaem Butt",
      role: "Co-Founder",
      image: "public/sim.jpg",
      linkedin: "https://www.linkedin.com/in/muhammad-daaem-butt/",
      Email : "daaembutt.official@gmail.com",
      phone: "+92-330-5355769",
    }
    
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
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    border: "5px solid #111827",
                  }}
                />
                <h5 className="fw-bold">{member.name}</h5>
                <p className="text-muted fst-italic">{member.role}</p>
                <p className="d-flex align-items-center justify-content-center">
                  <img src="public/3228550_app_b_w_linkedin_logo_media_icon.png" alt="linkedin logo" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                  <strong>LinkedIn: </strong>{" "}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {member.linkedin}
                  </a>
                </p>
                <p className="d-flex align-items-center justify-content-center">
                  <img src="public/email.png" alt="github logo"
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}></img>
                  <strong>Email: </strong> {member.Email}
                </p>
  <p className="d-flex align-items-center">
  <img 
    src="/—Pngtree—phone icon in solid circle_5552270.png" 
    alt="phone icon" 
    style={{ width: "20px", height: "20px", marginRight: "8px" }} 
  />
  <a href={`tel:${member.phone}`} className="text-dark text-decoration-none">
    {member.phone}
  </a>
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
  <i className="fas fa-chevron-left fa-3x text-dark"></i>
  <span className="visually-hidden">Previous</span>
</button>

<button
  className="carousel-control-next"
  type="button"
  data-bs-target="#aboutCarousel"
  data-bs-slide="next"
>
  <i className="fas fa-chevron-right fa-3x text-dark"></i>
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
