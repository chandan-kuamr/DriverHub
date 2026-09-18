import { useState } from "react";
import axios from "axios";

const EmployeeLogin = () => {
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

      window.location.href = "/employee/dashboard";

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

          <button type="submit">
            Employee Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default EmployeeLogin;