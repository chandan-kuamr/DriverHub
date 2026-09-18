import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Job {
  _id: string;
  title: string;
  description: string;
  driverCategory: string;
  experience: number;
  location: string;
  salary: string;
  workingHours: string;
  vacancies: number;
  requiredDocuments: string[];
  status: string;
}

const FindJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/jobs"
      );

      console.log(response.data);

      setJobs(response.data.jobs);

    } catch (error: any) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <h1>Find Jobs</h1>

        <p>
          Find driving jobs that match your experience and skills.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="profile-card">
          <p>Loading jobs...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="profile-card">
          <p>{error}</p>
        </div>
      )}

      {/* No Jobs */}
      {!loading && !error && jobs.length === 0 && (
        <div className="profile-card">
          <h3>No Jobs Available</h3>

          <p>
            There are currently no driver vacancies available.
          </p>
        </div>
      )}

      {/* Jobs */}
      {!loading && !error && jobs.length > 0 && (
        <div className="dashboard-cards">

          {jobs.map((job) => (
            <div
              className="dashboard-card"
              key={job._id}
            >

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

              <p>
                <strong>Vacancies:</strong>{" "}
                {job.vacancies}
              </p>
<button
  className="profile-button"
  onClick={() =>
    navigate("/apply-job", {
      state: { job },
    })
  }
>
  Apply Now
</button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default FindJobs;