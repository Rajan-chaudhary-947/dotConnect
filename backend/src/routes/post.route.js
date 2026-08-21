import express from "express";
import { getPosts, createPost, deletePost, modifyPost, getComments, addComment, modifyComment, deleteComment, toggleLikePost } from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/share-post", createPost);
router.get("/:id", getComments);
router.patch("/:id/like", protectRoute, toggleLikePost);
router.post("/:id/comment", addComment);
router.put("/:id", modifyPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/:id/comment/:commentId", modifyComment);
router.delete("/:id/comment/:commentId", deleteComment);

export default router;
