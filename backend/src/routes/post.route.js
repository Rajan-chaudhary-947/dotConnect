import express from "express";
import { getPosts, createPost, deletePost, modifyPost, getComments, addComment, modifyComment, deleteComment } from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/", getPosts);
router.post("/share-post", createPost);
router.get("/:id", getComments);
router.post("/:id/comment", addComment);
router.put("/:id", modifyPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/:id/comment/:commentId", modifyComment);
router.delete("/:id/comment/:commentId", deleteComment);

export default router;
