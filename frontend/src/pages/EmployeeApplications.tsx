import { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  location: string;
  salary: string;
  driverCategory: string;
}

interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  driverCategory: string;
  experience: number;
  skills: string;
  resume: string;
  status: string;
  createdAt: string;
  job: Job;
}

const EmployeeApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/applications/all"
      );

      console.log("APPLICATIONS:", response.data);

      setApplications(response.data.applications);

    } catch (error: any) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to load applications"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="profile-page">

      <div className="profile-header">
        <h1>Applications</h1>

        <p>
          View and manage candidate applications.
        </p>
      </div>

      {loading && (
        <div className="profile-card">
          <p>Loading applications...</p>
        </div>
      )}

      {error && (
        <div className="profile-card">
          <p>{error}</p>
        </div>
      )}

      {!loading &&
        !error &&
        applications.length === 0 && (
          <div className="profile-card">
            <h3>No Applications</h3>

            <p>
              No candidates have applied for jobs yet.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        applications.length > 0 && (
          <div className="dashboard-cards">

            {applications.map((application) => (
              <div
                className="dashboard-card"
                key={application._id}
              >

                <h3>{application.name}</h3>

                <p>
                  <strong>Applied For:</strong>{" "}
                  {application.job?.title}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {application.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {application.phone}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {application.location}
                </p>

                <p>
                  <strong>Driver Category:</strong>{" "}
                  {application.driverCategory}
                </p>

                <p>
                  <strong>Experience:</strong>{" "}
                  {application.experience} years
                </p>

                <p>
                  <strong>Skills:</strong>{" "}
                  {application.skills || "Not provided"}
                </p>

                <p>
                  <strong>Job Location:</strong>{" "}
                  {application.job?.location}
                </p>

                <p>
                  <strong>Salary:</strong>{" "}
                  {application.job?.salary}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {application.status}
                </p>

                <p>
                  <strong>Applied On:</strong>{" "}
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>
            ))}

          </div>
        )}

    </div>
  );
};

export default EmployeeApplications;