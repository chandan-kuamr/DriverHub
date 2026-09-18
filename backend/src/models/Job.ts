import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  { company: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Company",
  required: true,
},
    
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    driverCategory: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    workingHours: {
      type: String,
      required: true,
    },

    vacancies: {
      type: Number,
      required: true,
    },

    requiredDocuments: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;