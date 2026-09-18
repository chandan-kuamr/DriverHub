import express from "express";
import {
  registerCandidate,
  loginCandidate
} from "../controllers/CandidateControllers";

const router = express.Router();

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);

export default router;