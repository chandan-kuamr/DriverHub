import { useState } from "react";
import axios from "axios";
const CandidateRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setEmailError("");
    setPhoneError("");
    setGeneralError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/candidates/register",
        {
          name,
          email,
          phone,
          password,
        }
      );

      console.log(response.data);

      setSuccess("Registration successful!");

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

    } catch (error: any) {
      console.log(error);

      const message = error.response?.data?.message;

      if (message === "Email already exists") {
        setEmailError("Email already exists");
      } 
      else if (message === "Phone number already exists") {
        setPhoneError("Phone number already exists");
      } 
      else {
        setGeneralError(message || "Registration failed");
      }
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        {/* Heading */}
        <h2>Candidate Registration</h2>

        <p className="register-subtitle">
          Create your Driver Hub account
        </p>

        {/* Center Alerts */}
        <div className="alert-container">

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          {generalError && (
            <div className="general-error">
              {generalError}
            </div>
          )}

        </div>

        <form onSubmit={handleRegister}>

          {/* Name */}
          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>


          {/* Email */}
          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
            />

            {emailError && (
              <p className="field-error">
                {emailError}
              </p>
            )}

          </div>


          {/* Phone */}
          <div className="form-group">

            <label>Phone</label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError("");
              }}
              required
            />

            {phoneError && (
              <p className="field-error">
                {phoneError}
              </p>
            )}

          </div>


          {/* Password */}
          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          {/*Button */}
          <button
            className="register-button"
            type="submit"
          >
            Register
          </button>
          <p className="account-link">
  Already have an account?{" "}
  <a href="/login">Login</a>
</p>

        </form>
        

      </div>

    </div>
  );
};

export default CandidateRegister;