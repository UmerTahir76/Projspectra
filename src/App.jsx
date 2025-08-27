import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx"
import Home from "./pages/Landing/Landing.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import ProjectProvider from "./context/ProjectProvider.jsx";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./pages/Landing/Landing.jsx";


function App() {
  
    return(
  <>
    <Header/>
    <Landing/>
    <Footer/>
    
  </>

    );
}

export default App;
