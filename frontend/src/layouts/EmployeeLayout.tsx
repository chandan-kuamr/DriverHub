import { NavLink, Outlet, useNavigate } from "react-router-dom";

const EmployeeLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/employee/login");
  };

  return (
    <div className="dashboard-page">

      <aside className="dashboard-sidebar">

        <h2>Driver Hub</h2>

        <nav>
          <NavLink to="/employee/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/employee/company-profile">
            Company Profile
          </NavLink>

          <NavLink to="/employee/jobs/add">
            Manage Jobs
          </NavLink>

          <NavLink to="/employee/applications">
            Applications
          </NavLink>
        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>

    </div>
  );
};

export default EmployeeLayout;