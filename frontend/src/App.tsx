
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Candidate Pages
import CandidateRegister from "./pages/CandidateRegister";
import CandidateLogin from "./pages/CandidateLogin";
import CandidateDashboard from "./pages/Candidatedashboard";
import CandidateProfile from "./pages/CandidateProfile";

// Candidate Layout
import CandidateLayout from "./layouts/CandidateLayout";
import ApplyJob from "./pages/ApplyJob";

// Employee Pages
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AddJob from "./pages/AddJob";
import FindJobs from "./pages/FindJobs";
// Employee Layout
import EmployeeLayout from "./layouts/EmployeeLayout";
import CompanyProfile from "./pages/CompanyProfile";
import AppliedJobs from "./pages/AppliedJobs";
import EmployeeApplications from "./pages/EmployeeApplications";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* 
            CANDIDATE ROUTES
         */}

        <Route
          path="/register"
          element={<CandidateRegister />}
        />

        <Route
          path="/login"
          element={<CandidateLogin />}
        />

        {/* Candidate Dashboard Layout */}
       <Route element={<CandidateLayout />}>

  <Route
    path="/dashboard"
    element={<CandidateDashboard />}
  />

  <Route
    path="/profile"
    element={<CandidateProfile />}
  />

  <Route
    path="/jobs"
    element={<FindJobs />}
  />

  <Route
    path="/apply-job"
    element={<ApplyJob />}
  />
  <Route
  path="/applications"
  element={<AppliedJobs />}
/>

</Route>


  
         
  

        <Route
          path="/create-employee"
          element={<CreateEmployee />}
        />

        <Route
          path="/employee/login"
          element={<EmployeeLogin />}
        />


 
     

        <Route element={<EmployeeLayout />}>

          <Route
            path="/employee/dashboard"
            element={<EmployeeDashboard />}
          />
            <Route
    path="/employee/company-profile"
    element={<CompanyProfile />}
  />
           <Route
    path="/employee/jobs"
    element={<AddJob />}
  />


          <Route
            path="/employee/jobs/add"
            element={<AddJob />}
          />

        </Route>
        <Route
  path="/employee/applications"
  element={<EmployeeApplications />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;