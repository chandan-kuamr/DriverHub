import express from "express";

import {
  createJob,
  getJobs,
} from "../controllers/JobControllers";

const router = express.Router();

router.post("/create", createJob);

router.get("/", getJobs);

export default router;