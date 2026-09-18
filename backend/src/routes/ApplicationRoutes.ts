import express from "express";

import {
  applyForJob,
  getMyApplications,
  getAllApplications,
} from "../controllers/ApplicationController";

const router = express.Router();

router.post("/apply", applyForJob);

router.get("/", getMyApplications);
router.get("/all", getAllApplications);

export default router;