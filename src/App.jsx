import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx"
import Home from "./pages/Landing/Landing.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import ProjectProvider from "./context/ProjectProvider.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail.jsx";
import Contact from "./pages/Contact/Contact.jsx";
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
        <Route path="/explore" element ={<Explore/>} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/contact" element ={<Contact/>} />

      </Routes>
    </Router>
    <Footer/>
    </ProjectProvider>
  );
}

export default App;
