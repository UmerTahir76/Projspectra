import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx"
import Home from "./pages/Landing/Landing.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import ProjectProvider from "./context/ProjectProvider.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Contact from "./pages/Landing/Contact.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fortawesome/fontawesome-free/css/all.min.css";





function App() {
  return (
    <ProjectProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />


      </Routes>
      
      <Footer></Footer>
    </Router>
  
    </ProjectProvider>

  );
}

export default App;