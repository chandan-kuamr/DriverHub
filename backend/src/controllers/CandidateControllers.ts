import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Candidate from "../models/candidate";
import Employee from "../models/Employee";


// Candidate Registration


export const registerCandidate = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      phone,
      password,
    } = req.body;

    // Check email
    const existingEmail = await Candidate.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Check phone
    const existingPhone = await Candidate.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create candidate
    const candidate = await Candidate.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Don't send password to frontend
    const candidateResponse = {
      id: candidate._id,
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
    };

    res.status(201).json({
      message: "Candidate registered successfully",
      candidate: candidateResponse,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};



// Candidate Login


export const loginCandidate = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      emailOrPhone,
      password,
    } = req.body;

    // Check Candidate
    const candidate = await Candidate.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone },
      ],
    });

    if (candidate) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        candidate.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: "Invalid email/phone or password",
        });
      }

      const token = jwt.sign(
        {
          id: candidate._id,
          role: "candidate",
        },
        "driverhub_secret_key",
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        role: "candidate",
        candidate: {
          id: candidate._id,
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
        },
      });
    }

    // Check Employee
    const employee = await Employee.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone },
      ],
    });

    if (employee) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        employee.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: "Invalid email/phone or password",
        });
      }

      const token = jwt.sign(
        {
          id: employee._id,
          role: employee.role,
        },
        "driverhub_secret_key",
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        role: employee.role,
        employee: {
          id: employee._id,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
        },
      });
    }

    return res.status(400).json({
      message: "Invalid email/phone or password",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
};