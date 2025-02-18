// import express from "express";
// import { getAllReminders, addReminder, deleteReminder } from "../models/reminderModel.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Get all reminders for a user
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const reminders = await getAllReminders(req.user.id);
//     res.json(reminders);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch reminders" });
//   }
// });

// // Add a new reminder
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     await addReminder({ ...req.body, user_id: req.user.id });
//     res.json({ message: "Reminder set successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add reminder" });
//   }
// });

// // Delete a reminder
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     await deleteReminder(req.params.id);
//     res.json({ message: "Reminder deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete reminder" });
//   }
// });

// export default router;

import { getAllReminders, addReminder, deleteReminder } from "../models/reminderModel.js"; // Import model functions

// Get all reminders for a user
export const getReminders = async (req, res) => {
  try {
    const reminders = await getAllReminders(req.user.id); // Get reminders for the authenticated user
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};

// Add a new reminder
export const createReminder = async (req, res) => {
  try {
    // Passing the user_id from req.user (which is set by authMiddleware) and the body of the request
    const reminderData = { ...req.body, user_id: req.user.id };
    await addReminder(reminderData); // Add reminder via the model function
    res.json({ message: "Reminder set successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add reminder" });
  }
};

// Delete a reminder by ID
export const removeReminder = async (req, res) => {
  try {
    await deleteReminder(req.params.id); // Delete reminder using the ID from URL
    res.json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reminder" });
  }
};