import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee";

// Create Employee
export const createEmployee = async (
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

    const existingEmployee = await Employee.findOne({
      $or: [
        { email },
        { phone }
      ]
    });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const employee = await Employee.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "employee",
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Employee creation failed",
    });
  }
};


// Employee Login
export const loginEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      emailOrPhone,
      password,
    } = req.body;

    const employee = await Employee.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone }
      ]
    });

    if (!employee) {
      return res.status(400).json({
        message: "Invalid email/phone or password",
      });
    }

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

    res.status(200).json({
      message: "Employee login successful",
      token,
      role: employee.role,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Employee login failed",
    });
  }
};