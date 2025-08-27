import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx"
import Home from "./pages/Landing/Landing.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import ProjectProvider from "./context/ProjectProvider.jsx";

function App() {
  return (
    <ProjectProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />

      </Routes>
    </Router>
    </ProjectProvider>
  );
}

export default App;
