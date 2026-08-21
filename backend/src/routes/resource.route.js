import express from "express";
import multer from "multer";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
	getResources,
	createResource,
	downloadResource,
	modifyResource,
	deleteResource
} from "../controllers/res_controllers/note.controller.js";

const router = express.Router();
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 10 * 1024 * 1024 }
});

router.get("/:resourceType", getResources);
router.get("/:id/download", downloadResource);
router.post("/", protectRoute, upload.single("file"), createResource);
router.put("/:id", protectRoute, modifyResource);
router.delete("/:id", protectRoute, deleteResource);

export default router;