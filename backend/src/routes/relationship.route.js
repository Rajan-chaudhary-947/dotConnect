import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRelationshipStatus,
  responseToRequest,
  sendRequest,
} from "../controllers/relationship.controller.js";

const router = express.Router();



router.get("/:userId/status", protectRoute, getRelationshipStatus);
router.post("/:userId", protectRoute, sendRequest);
router.patch("/:userId/response", protectRoute, responseToRequest);

export default router;
