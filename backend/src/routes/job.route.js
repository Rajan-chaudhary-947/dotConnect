import express from "express";
import { getJobs, createJob, modifyJob, deleteJob } from "../controllers/job.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/share-job", protectRoute, createJob);
router.put("/:id", protectRoute, modifyJob);
router.delete("/:id", protectRoute, deleteJob);

export default router;