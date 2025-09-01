import Sidebar from "./Slidebar";

import Navbar from "./Navbar";
import StatsCards from "./StatsCard";
import ProjectsTable from "./ProjectsTable";
function App() {
  return (
    <div className="heading">
      <h1 className="text-4xl font-bold text-blue-600" >
               Hello, Admin Panel!
      </h1>
      
      <Navbar/>
      <Sidebar/>
      <StatsCards/>
      <ProjectsTable/>
    </div>
  );
}

export default App;

