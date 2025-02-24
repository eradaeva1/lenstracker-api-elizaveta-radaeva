
// import express from "express";
// import { getAllLenses, addLens, deleteLens } from "../controllers/lensController.js";
// import { createReminder, removeReminder } from "../controllers/reminderController.js"; // Import reminder functions
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Get all lenses for a user
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const lenses = await getAllLenses(req.user.id);
//     res.json(lenses);
//   } catch (error) {
//     res.status(500).json({ error: `Failed to fetch lenses: ${error.message}` });
//   }
// });


// router.post("/", authMiddleware, addLens)
// Add a new lens & auto-create reminder
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const lensData = { ...req.body, user_id: req.user.id };
//     const newLens = await addLens(lensData); // Add lens to DB

//     // Create a reminder automatically based on lens duration
//     const reminderData = {
//       userId: req.user.id,
//       lensId: newLens.id,
//       title: `Replace ${lensData.brand} Lenses`,
//       body: `It's time to change your ${lensData.brand} lenses!`,
//       time: calculateReminderDate(lensData.type), // Auto-set time
//     };

//     await createReminder(reminderData); // Create reminder
//     res.json({ message: "Lens added and reminder created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: `Failed to add lens: ${error.message}` });
//   }
// });

// Delete a lens & associated reminders
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     await deleteLens(req.params.id);
//     await removeReminder(req.params.id); // Also delete reminders linked to lens
//     res.json({ message: "Lens and its reminder deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: `Failed to delete lens: ${error.message}` });
//   }
// });

// // Function to auto-set reminder dates
// const calculateReminderDate = (lensType) => {
//   const today = new Date();
//   if (lensType === "daily") return new Date(today.setDate(today.getDate() + 1)); // 1 day
//   if (lensType === "biweekly") return new Date(today.setDate(today.getDate() + 14)); // 14 days
//   if (lensType === "monthly") return new Date(today.setMonth(today.getMonth() + 1)); // 1 month
//   return today; // Default fallback
// };

// export default router;

import express from "express";
import { addLens, getAllLenses, deleteLens } from "../controllers/lensController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Import auth middleware

const router = express.Router();

// ✅ Protect all routes using authMiddleware
router.post("/", authMiddleware, addLens);
router.get("/", authMiddleware, getAllLenses);
router.delete("/:id", authMiddleware, deleteLens);

export default router;
