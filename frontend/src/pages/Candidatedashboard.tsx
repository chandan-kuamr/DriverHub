import { useNavigate } from "react-router-dom";

const CandidateDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome to Driver Hub</h1>
          <p>Find the right driving job for you.</p>
        </div>
      </div>


      {/* Profile Completion */}
      <div className="profile-card">

        <h3>Complete Your Profile</h3>

        <p>
          Complete your profile to get better job opportunities.
        </p>

        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>

        <span>20% Profile Completed</span>

        <br />

        <button
          className="profile-button"
          onClick={() => navigate("/profile")}
        >
          Complete Profile
        </button>

      </div>


      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        {/* Find Jobs */}
        <div className="dashboard-card">

          <h3>Find Jobs</h3>

          <p>
            Search for driver jobs matching your skills.
          </p>

          <button
            onClick={() => navigate("/jobs")}
          >
            View Jobs
          </button>

        </div>


        {/* Applied Jobs */}
        <div className="dashboard-card">

          <h3>Applied Jobs</h3>

          <p>
            Track the jobs you have applied for.
          </p>

          <button
            onClick={() => navigate("/applications")}
          >
            View Applications
          </button>

        </div>


        {/* Notifications */}
        <div className="dashboard-card">

          <h3>Notifications</h3>

          <p>
            Check new job opportunities and updates.
          </p>

          <button
            onClick={() => navigate("/notifications")}
          >
            View Notifications
          </button>

        </div>

      </div>
    </>
  );
};

export default CandidateDashboard;