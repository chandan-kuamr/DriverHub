import { Request, Response } from "express";
import Job from "../models/Job";

// Create Job
export const createJob = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      driverCategory,
      experience,
      location,
      salary,
      workingHours,
      vacancies,
      requiredDocuments,
    } = req.body;

    if (
      !title ||
      !description ||
      !driverCategory ||
      experience === undefined ||
      !location ||
      !salary ||
      !workingHours ||
      vacancies === undefined
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const job = await Job.create({
      title,
      description,
      driverCategory,
      experience: Number(experience),
      location,
      salary,
      workingHours,
      vacancies: Number(vacancies),
      requiredDocuments: requiredDocuments || [],
      status: "Active",
    });

    res.status(201).json({
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.log("JOB CREATION ERROR:", error);

    res.status(500).json({
      message: "Job creation failed",
    });
  }
};

// Get all jobs
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.log("GET JOBS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};