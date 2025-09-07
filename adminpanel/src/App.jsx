import { Routes, Route } from 'react-router-dom';
import Sidebar from "./Slidebar";
import Navbar from "./Navbar";
import StatsCards from "./StatsCard";
import ProjectsTable from "./ProjectsTable";
import ShowProjects from "./ShowProjects";
import ProjectDetail from "./ProjectDetail";
import UsersTable from "./UsersTable";
import UserProjects from "./UserProjects";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={
          <>
            <StatsCards />
            <ProjectsTable />
          </>
        } />
        <Route path="/projects" element={<ShowProjects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/users/:email" element={<UserProjects />} />
        <Route path="/" element={
          <>
            <StatsCards />
            <ProjectsTable />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;

