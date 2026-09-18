import { NavLink, Outlet, useNavigate } from "react-router-dom";

const CandidateLayout = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("candidateEmail");

  navigate("/login");
};
  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        <h2>Driver Hub</h2>

        <nav>

          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/profile">
            Complete Profile
          </NavLink>

          <NavLink to="/jobs">
            Find Jobs
          </NavLink>

          <NavLink to="/applications">
            Applied Jobs
          </NavLink>

          <NavLink to="/notifications">
            Notifications
          </NavLink>

        </nav>

        <button
  className="logout-button"
  onClick={handleLogout}
>
  Logout
</button>

      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <Outlet />
      </main>

    </div>
  );
};

export default CandidateLayout;