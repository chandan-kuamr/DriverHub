import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees/login",
        {
          emailOrPhone,
          password,
        }
      );

      console.log(response.data);

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setSuccess("Employee login successful!");

      navigate("/employee/dashboard");

    } catch (error: any) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Employee login failed"
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Employee Login</h2>

        <p className="register-subtitle">
          Login to manage Driver Hub
        </p>

        <div className="alert-container">

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          {error && (
            <div className="general-error">
              {error}
            </div>
          )}

        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email or Phone</label>

            <input
              type="text"
              placeholder="Enter email or phone number"
              value={emailOrPhone}
              onChange={(e) =>
                setEmailOrPhone(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="candidate-login-button"
          >
            Employee Login
          </button>

          <div className="signup-link">
            <p>
              Don't have an employee account?{" "}
              <Link to="/create-employee">
                Sign Up
              </Link>
            </p>
          </div>

        </form>

        <div className="employee-login-section">

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="employee-login-button"
            onClick={() => navigate("/login")}
          >
            Candidate Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default EmployeeLogin;