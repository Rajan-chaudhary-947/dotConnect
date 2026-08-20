import express from "express";
import { getEvents, createEvent, modifyEvent, deleteEvent } from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/share-event", protectRoute, createEvent);
router.put("/:id", protectRoute, modifyEvent);
router.delete("/:id", protectRoute, deleteEvent);

export default router;