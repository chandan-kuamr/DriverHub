import { Request, Response } from "express";
import Company from "../models/Company";

export const createCompany = async (
  req: Request,
  res: Response
) => {
  try {
    const {
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
      logo,
    } = req.body;

    const existingCompany = await Company.findOne({
      email,
    });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists",
      });
    }

    const company = await Company.create({
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
      
    });

    res.status(201).json({
      message: "Company details saved successfully",
      company,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Company creation failed",
    });
  }
};