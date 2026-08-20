import express from "express";
import { getNotes, createNote, modifyNote, deleteNote } from "../controllers/res_controllers/note.controller.js";

const router = express.Router();

router.get("/resource/note", getNotes);
router.post("/share-note", createNote);
router.put("/resource/note/:id", modifyNote);
router.delete("/resource/note/:id", deleteNote);

export default router;