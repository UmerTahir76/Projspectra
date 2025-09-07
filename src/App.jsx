import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx"
import Home from "./pages/Landing/Landing.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import ProjectProvider from "./context/ProjectProvider.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Chat from "./pages/Chat/Chat.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import PersonalInfo from "./pages/Profile/PersonalInfo.jsx";
import UserProjects from "./pages/Profile/UserProjects.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <ProjectProvider>
      <div className="app-container">
        <div className="main-content">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/explore" element ={<Explore/>} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/contact" element ={<Contact/>} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/personal-info" element={<PersonalInfo />} />
              <Route path="/profile/your-projects" element={<UserProjects />} />
            </Routes>
          </Router>
        </div>
        <Footer/>
      </div>
    </ProjectProvider>
  );
}

export default App;
