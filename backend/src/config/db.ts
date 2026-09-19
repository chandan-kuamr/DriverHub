import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb+srv://chandnkumarbg77_db_user:4GQEYJRj7S8OlF7s@cluster1.7xcuxt5.mongodb.net/?appName=Cluster1");
    
  
    console.log("Database connection is successful");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

export default db;