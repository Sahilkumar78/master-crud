import express from "express"
import { creatNote, deleteNote, getAllNotes, updateNote } from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes)
router.post("/", creatNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router