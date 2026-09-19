import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CandidateLogin = () => {
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
        "http://localhost:5000/api/candidates/login",
        {
          emailOrPhone,
          password,
        }
      );

      console.log(response.data);

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setSuccess("Login successful!");

      if (role === "employee" || role === "admin") {
        navigate("/employee/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error: any) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Candidate Login</h2>

        <p className="register-subtitle">
          Login to your Driver Hub account
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
              placeholder="Enter your password"
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
             Login
          </button>

        </form>


        <div className="employee-login-section">

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="employee-login-button"
            onClick={() => navigate("/employee/login")}
          >
            Employee Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default CandidateLogin;