import { useState } from "react";
import axios from "axios";

const CandidateLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      // Save login information
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setSuccess("Login successful!");

      // Redirect based on role
      if (role === "employee" || role === "admin") {
        window.location.href = "/employee/dashboard";
      } else {
        window.location.href = "/dashboard";
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

          {/* Email or Phone */}
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

          {/* Password */}
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

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default CandidateLogin;