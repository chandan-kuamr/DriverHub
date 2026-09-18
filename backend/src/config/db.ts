import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/driverhub");

    console.log("Database connection is successful");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

export default db;