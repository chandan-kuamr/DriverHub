import { useState } from "react";
import axios from "axios";

const CompanyProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/companies/create",
        {
          companyName,
          companyType,
          aboutCompany,
          contactPerson,
          email,
          phone,
          website,
          location,
          address,
          registrationNumber,

          // For now, we are storing the logo file name
          
        }
      );

      console.log(response.data);

      alert("Company details saved successfully!");

    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to save company details"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">

      <div className="profile-header">
        <h1>Company Profile</h1>

        <p>
          Add and manage your company details.
        </p>
      </div>

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        {/* Company Name */}
        <div className="profile-field">
          <label>Company Name</label>

          <input
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
            required
          />
        </div>

        {/* Company Type */}
        <div className="profile-field">
          <label>Company Type</label>

          <select
            value={companyType}
            onChange={(e) =>
              setCompanyType(e.target.value)
            }
            required
          >
            <option value="">
              Select company type
            </option>

            <option value="Transport">
              Transport Company
            </option>

            <option value="Logistics">
              Logistics Company
            </option>

            <option value="Travel">
              Travel & Tours
            </option>

            <option value="Delivery">
              Delivery Company
            </option>

            <option value="Fleet Management">
              Fleet Management
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* About Company */}
        <div className="profile-field">
          <label>About Company</label>

          <textarea
            placeholder="Tell candidates about your company..."
            value={aboutCompany}
            onChange={(e) =>
              setAboutCompany(e.target.value)
            }
            required
          />
        </div>

        {/* Contact Person */}
        <div className="profile-field">
          <label>Contact Person</label>

          <input
            type="text"
            placeholder="Enter contact person's name"
            value={contactPerson}
            onChange={(e) =>
              setContactPerson(e.target.value)
            }
            required
          />
        </div>

        {/* Email */}
        <div className="profile-field">
          <label>Company Email</label>

          <input
            type="email"
            placeholder="company@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        {/* Phone */}
        <div className="profile-field">
          <label>Company Phone</label>

          <input
            type="text"
            placeholder="Enter company phone number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            required
          />
        </div>

        {/* Website */}
        <div className="profile-field">
          <label>Company Website</label>

          <input
            type="text"
            placeholder="https://example.com"
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
          />
        </div>

        {/* Location */}
        <div className="profile-field">
          <label>Company Location</label>

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

        {/* Address */}
        <div className="profile-field">
          <label>Company Address</label>

          <textarea
            placeholder="Enter complete company address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
          />
        </div>

        {/* Registration Number */}
        <div className="profile-field">
          <label>Company Registration Number</label>

          <input
            type="text"
            placeholder="Enter registration number"
            value={registrationNumber}
            onChange={(e) =>
              setRegistrationNumber(e.target.value)
            }
          />
        </div>

        
        

        {/* Submit */}
        <button
          type="submit"
          className="save-profile-button"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Company Details"}
        </button>

      </form>

    </div>
  );
};

export default CompanyProfile;