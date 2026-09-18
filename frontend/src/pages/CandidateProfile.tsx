import { useState } from "react";

const CandidateProfile = () => {

  const [location, setLocation] = useState("");
  const [driverCategory, setDriverCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [documents, setDocuments] = useState<FileList | null>(null);

  const [profileSaved, setProfileSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setProfileSaved(true);

    alert("Profile saved successfully!");
  };

  return (
    <div className="profile-page">

      <div className="profile-header">
        <h1>Complete Your Profile</h1>

        <p>
          Add your driving experience, skills and documents.
        </p>
      </div>


      {!profileSaved ? (

        /* ================= FORM ================= */

        <form
          className="profile-form"
          onSubmit={handleSubmit}
        >

          <div className="profile-field">
            <label>Location</label>

            <input
              type="text"
              placeholder="Enter your location"
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

              <option value="Transport">
                Transport Driver
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
              placeholder="Example: Highway Driving, City Driving, GPS, Vehicle Maintenance"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              required
            />
          </div>


          <div className="profile-field">
            <label>Upload Resume</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files) {
                  setResume(e.target.files[0]);
                }
              }}
            />

            {resume && (
              <p className="file-name">
                Selected: {resume.name}
              </p>
            )}
          </div>


          <div className="profile-field">
            <label>Upload Driving Documents</label>

            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                setDocuments(e.target.files);
              }}
            />

            {documents && documents.length > 0 && (
              <div className="file-list">

                <p>Selected Documents:</p>

                {Array.from(documents).map(
                  (file, index) => (
                    <p key={index}>
                      {file.name}
                    </p>
                  )
                )}

              </div>
            )}
          </div>


          <button
            type="submit"
            className="save-profile-button"
          >
            Save Profile
          </button>

        </form>

      ) : (

        /* ================= PROFILE CARD ================= */

        <div className="profile-card">

          <div className="profile-card-header">
            <div>
              <h2>My Driver Profile</h2>

              <p>
                Your profile information
              </p>
            </div>

            <button
              className="profile-button"
              onClick={() => setProfileSaved(false)}
            >
              Edit Profile
            </button>
          </div>


          <div className="profile-grid">

            <div className="profile-info">
              <span>Location</span>
              <strong>{location}</strong>
            </div>


            <div className="profile-info">
              <span>Driver Category</span>
              <strong>{driverCategory}</strong>
            </div>


            <div className="profile-info">
              <span>Driving Experience</span>
              <strong>{experience} Years</strong>
            </div>


            <div className="profile-info">
              <span>Driving Skills</span>
              <strong>{skills}</strong>
            </div>


            <div className="profile-info">
              <span>Resume</span>
              <strong>
                {resume
                  ? resume.name
                  : "Not uploaded"}
              </strong>
            </div>


            <div className="profile-info">
              <span>Driving Documents</span>

              <strong>
                {documents
                  ? `${documents.length} document(s)`
                  : "Not uploaded"}
              </strong>
            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default CandidateProfile;