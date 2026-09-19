import express from "express";
import cors from "cors";

import connectToDB from "./config/db";

import candidateRoutes from "./routes/CandidateRoutes";
import employeeRoutes from "./routes/EmployeeRoutes";
import applicationRoutes from "./routes/ApplicationRoutes";
import companyRoutes from "./routes/CompanyRoutes";
import jobRoutes from "./routes/JobRoutes";
const app = express();

app.use(cors());
app.use(express.json());

connectToDB();

app.use("/api/candidates", candidateRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/companies", companyRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Driver Hub Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});