
import express from "express";

import {
  createEmployee,
  loginEmployee,
} from "../controllers/EmployeeController";

const router = express.Router();

router.post("/create", createEmployee);

router.post("/login", loginEmployee);

export default router;
