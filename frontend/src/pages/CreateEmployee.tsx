import { useState } from "react";
import axios from "axios";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees/create",
        {
          name,
          email,
          phone,
          password,
        }
      );

      alert(response.data.message);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

    } catch (error: any) {
      alert(
        error.response?.data?.message ||
        "Employee creation failed"
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Create Employee</h2>

        <p className="register-subtitle">
          Create a Driver Hub employee account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter employee email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            Create Employee
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateEmployee;