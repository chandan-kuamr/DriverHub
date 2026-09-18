import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyType: {
      type: String,
      required: true,
    },

    aboutCompany: {
      type: String,
      required: true,
    },

    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    registrationNumber: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;