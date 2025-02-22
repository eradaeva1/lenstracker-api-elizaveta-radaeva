
import express from "express";
import { getAllLenses, addLens, deleteLens } from "../controllers/lensController.js"; // Import controller methods
import authMiddleware from "../middleware/authMiddleware.js"; // Import auth middleware to protect routes

const router = express.Router();

// Route to get all lenses for a user (GET /lenses)
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Fetch lenses for the authenticated user (using the user ID from JWT)
    const lenses = await getAllLenses(req.user.id);
    res.json(lenses);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch lenses: ${error.message}` });
  }
});

// Route to add a new lens (POST /lenses)
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Add the user_id to the lens data (from the JWT decoded user)
    const lensData = { ...req.body, user_id: req.user.id };
    await addLens(lensData); // Insert the lens data into the database
    res.json({ message: "Lens added successfully" });
  } catch (error) {
    res.status(500).json({ error: `Failed to add lens: ${error.message}` });
  }
});

// Route to delete a lens by its ID (DELETE /lenses/:id)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Delete the lens by ID (from the URL parameter)
    await deleteLens(req.params.id);
    res.json({ message: "Lens deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `Failed to delete lens: ${error.message}` });
  }
});

export default router;