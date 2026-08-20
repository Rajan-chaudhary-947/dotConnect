import express from "express";
import { getUserProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:userId", protectRoute, getUserProfile);

export default router;
