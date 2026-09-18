import { useEffect, useState } from "react";
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

interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  driverCategory: string;
  experience: number;
  skills: string;
  status: string;
  job: Job;
  createdAt: string;
}

const AppliedJobs = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // For now, ask candidate for email
       const email = localStorage.getItem("candidateEmail");

if (!email) {
  setError("Please apply for a job first.");
  setLoading(false);
  return;
}   

        const response = await axios.get(
          `http://localhost:5000/api/applications?email=${email}`
        );

        setApplications(response.data.applications);

      } catch (error: any) {
        console.log(error);

        setError(
          error.response?.data?.message ||
          "Failed to load applied jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="profile-page">

      <div className="profile-header">
        <h1>Applied Jobs</h1>

        <p>
          Track the jobs you have applied for.
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
            <h3>No Applications Found</h3>

            <p>
              You have not applied for any jobs yet.
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

                <h3>
                  {application.job?.title}
                </h3>

                <p>
                  <strong>Category:</strong>{" "}
                  {application.job?.driverCategory}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {application.job?.location}
                </p>

                <p>
                  <strong>Salary:</strong>{" "}
                  {application.job?.salary}
                </p>

                <p>
                  <strong>Experience Required:</strong>{" "}
                  {application.job?.experience} years
                </p>

                <p>
                  <strong>Working Hours:</strong>{" "}
                  {application.job?.workingHours}
                </p>

                <p>
                  <strong>Applied On:</strong>{" "}
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {application.status}
                </p>

              </div>
            ))}

          </div>
        )}

    </div>
  );
};

export default AppliedJobs;