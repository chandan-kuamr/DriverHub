import { useState } from "react";
import axios from "axios";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [driverCategory, setDriverCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/jobs/create",
        {
          title,
          description,
          driverCategory,
          experience: Number(experience),
          location,
          salary,
          workingHours,
          vacancies: Number(vacancies),

          requiredDocuments: requiredDocuments
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== ""),
        }
      );

      console.log(response.data);

      alert("Job posted successfully!");

      // Clear form
      setTitle("");
      setDriverCategory("");
      setExperience("");
      setLocation("");
      setSalary("");
      setWorkingHours("");
      setVacancies("");
      setRequiredDocuments("");
      setDescription("");

    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Job posting failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <h1>Add Job Vacancy</h1>

        <p>
          Create a new driver job vacancy and specify the
          requirements.
        </p>
      </div>

      {/* Form */}
      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        {/* Job Title */}
        <div className="profile-field">
          <label>Job Title</label>

          <input
            type="text"
            placeholder="Example: Heavy Vehicle Driver"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Driver Category */}
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

        {/* Experience */}
        <div className="profile-field">
          <label>Required Experience</label>

          <input
            type="number"
            min="0"
            placeholder="Example: 3"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value)
            }
            required
          />

          <small>
            Enter required experience in years.
          </small>
        </div>

        {/* Location */}
        <div className="profile-field">
          <label>Job Location</label>

          <input
            type="text"
            placeholder="Example: Bangalore"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            required
          />
        </div>

        {/* Salary */}
        <div className="profile-field">
          <label>Salary</label>

          <input
            type="text"
            placeholder="Example: ₹25,000 - ₹30,000"
            value={salary}
            onChange={(e) =>
              setSalary(e.target.value)
            }
            required
          />
        </div>

        {/* Working Hours */}
        <div className="profile-field">
          <label>Working Hours</label>

          <input
            type="text"
            placeholder="Example: 9 AM - 6 PM"
            value={workingHours}
            onChange={(e) =>
              setWorkingHours(e.target.value)
            }
            required
          />
        </div>

        {/* Vacancies */}
        <div className="profile-field">
          <label>Number of Vacancies</label>

          <input
            type="number"
            min="1"
            placeholder="Example: 5"
            value={vacancies}
            onChange={(e) =>
              setVacancies(e.target.value)
            }
            required
          />
        </div>

        {/* Required Documents */}
        <div className="profile-field">
          <label>Required Documents</label>

          <input
            type="text"
            placeholder="Example: Driving License, Aadhaar, PAN Card"
            value={requiredDocuments}
            onChange={(e) =>
              setRequiredDocuments(e.target.value)
            }
          />

          <small>
            Separate multiple documents using commas.
          </small>
        </div>

        {/* Job Description */}
        <div className="profile-field">
          <label>Job Description</label>

          <textarea
            placeholder="Enter job responsibilities, duties and other requirements..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="save-profile-button"
          disabled={loading}
        >
          {loading
            ? "Posting Job..."
            : "Post Job Vacancy"}
        </button>

      </form>
    </div>
  );
};

export default AddJob;