import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  driverCategory: string;
  experience: number;
  location: string;
  salary: string;
  workingHours: string;
}

const ApplyJob = () => {
  const locationState = useLocation();
  const navigate = useNavigate();

  const job = locationState.state?.job as Job;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [driverCategory, setDriverCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!job) {
      alert("Job information not found.");
      return;
    }

    setLoading(true);

    try {
     const response = await axios.post(
  "http://localhost:5000/api/applications/apply",
  {
    jobId: job._id,
    name,
    email,
    phone,
    location,
    driverCategory,
    experience: Number(experience),
    skills,
    resume,
  }
);

localStorage.setItem("candidateEmail", email);

alert(response.data.message);

navigate("/applications");

    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Application submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">

      <div className="profile-header">
        <h1>Apply for Job</h1>

        <p>
          Enter your details to apply for this driving job.
        </p>
      </div>

      {/* Job Information */}
      {job && (
        <div className="profile-card">

          <h3>{job.title}</h3>

          <p>
            <strong>Category:</strong>{" "}
            {job.driverCategory}
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {job.experience} years
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {job.location}
          </p>

          <p>
            <strong>Salary:</strong>{" "}
            {job.salary}
          </p>

          <p>
            <strong>Working Hours:</strong>{" "}
            {job.workingHours}
          </p>

        </div>
      )}

      {/* Application Form */}
      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        <div className="profile-field">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="profile-field">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="profile-field">
          <label>Phone Number</label>

          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="profile-field">
          <label>Location</label>

          <input
            type="text"
            placeholder="Example: Bangalore"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="profile-field">
          <label>Driver Category</label>

          <select
            value={driverCategory}
            onChange={(e) =>
              setDriverCategory(e.target.value)
            }
            required
          >
            <option value="">
              Select Driver Category
            </option>

            <option value="LMV">
              LMV - Light Motor Vehicle
            </option>

            <option value="HMV">
              HMV - Heavy Motor Vehicle
            </option>

            <option value="Bus">
              Bus Driver
            </option>

            <option value="Truck">
              Truck Driver
            </option>

            <option value="Taxi">
              Taxi / Cab Driver
            </option>

            <option value="Delivery">
              Delivery Driver
            </option>

            <option value="Transport">
              Transport Driver
            </option>
          </select>
        </div>

        <div className="profile-field">
          <label>Driving Experience</label>

          <input
            type="number"
            min="0"
            placeholder="Experience in years"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value)
            }
            required
          />
        </div>

        <div className="profile-field">
          <label>Driving Skills</label>

          <textarea
            placeholder="Example: Highway Driving, GPS, Vehicle Maintenance"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
          />
        </div>

        <div className="profile-field">
          <label>Resume</label>

          <input
            type="text"
            placeholder="Enter resume file name or link"
            value={resume}
            onChange={(e) =>
              setResume(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="save-profile-button"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit Application"}
        </button>

      </form>

    </div>
  );
};

export default ApplyJob;