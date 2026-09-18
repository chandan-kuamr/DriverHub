import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Employee Dashboard</h1>
          <p>
            Manage driver vacancies and applications.
          </p>
        </div>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Active Jobs</h3>
          <p className="dashboard-number">0</p>
        </div>

        <div className="dashboard-card">
          <h3>Applications</h3>
          <p className="dashboard-number">0</p>
        </div>

        <div className="dashboard-card">
          <h3>Shortlisted</h3>
          <p className="dashboard-number">0</p>
        </div>

      </div>

      <div className="profile-card">

        <h3>Job Management</h3>

        <p>
          Create and manage driver job vacancies on Driver Hub.
        </p>

        <button
          className="profile-button"
          onClick={() => navigate("/employee/jobs")}
        >
          + Add Job Vacancy
        </button>

      </div>

      <div className="profile-card">

        <h3>Recent Job Vacancies</h3>

        <p>
          No jobs posted yet.
        </p>

      </div>
    </>
  );
};

export default EmployeeDashboard;