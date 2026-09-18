import { Request, Response } from "express";
import Application from "../models/Application";


// Apply for Job
export const applyForJob = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      jobId,
      name,
      email,
      phone,
      location,
      driverCategory,
      experience,
      skills,
      resume,
    } = req.body;

    if (
      !jobId ||
      !name ||
      !email ||
      !phone ||
      !location ||
      !driverCategory ||
      experience === undefined
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const application = await Application.create({
      job: jobId,
      name,
      email,
      phone,
      location,
      driverCategory,
      experience: Number(experience),
      skills,
      resume,
      status: "Pending",
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Application submission failed",
    });
  }
};


// Get Applied Jobs
export const getMyApplications = async (
  req: Request,
  res: Response
) => {
  try {
    const email = req.query.email as string;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const applications = await Application.find({
      email: email,
    }).populate("job");

    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
};
// Get All Applications for Employee
export const getAllApplications = async (
  req: Request,
  res: Response
) => {
  try {
    const applications = await Application.find()
      .populate("job")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
};