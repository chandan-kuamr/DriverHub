import { Request, Response } from "express";
import Job from "../models/Job";
import Company from "../models/Company";

export const createJob = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      companyEmail,
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

    // Find company using company email
    const company = await Company.findOne({
      email: companyEmail,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found",
      });
    }

    // Create job and connect it with company
    const job = await Job.create({
      company: company._id,
      title,
      description,
      driverCategory,
      experience,
      location,
      salary,
      workingHours,
      vacancies,
      requiredDocuments,
    });

    res.status(201).json({
      message: "Job posted successfully",
      job,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Job creation failed",
    });
  }
};


export const getJobs = async (
  req: Request,
  res: Response
) => {
  try {
    const jobs = await Job.find()
      .populate("company")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};