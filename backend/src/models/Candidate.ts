import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    driverCategory: {
      type: String,
    },

//     experience: {
//       type: Number,
//       default: 0,
//     },

//     skills: {
//       type: [String],
//       default: [],
//     },

//     resume: {
//       type: String,
//     },

//     documents: {
//       type: [String],
//       default: [],
//     },
 },

  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;