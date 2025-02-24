
import express from "express";
import { addLens, getAllLenses, deleteLens } from "../controllers/lensController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Import auth middleware

const router = express.Router();

// ✅ Protect all routes using authMiddleware
router.post("/", authMiddleware, addLens);
router.get("/", authMiddleware, getAllLenses);
router.delete("/:id", authMiddleware, deleteLens);

export default router;
