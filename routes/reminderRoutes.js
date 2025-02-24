import express from "express";
import {
  getReminders,
  createReminder,
  removeReminder,
} from "../controllers/reminderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendReminderNotification } from "../config/notifications.js"; // Import notifications

const router = express.Router();

// Get all reminders
router.get("/", authMiddleware, getReminders);

// Add a new reminder
router.post("/", authMiddleware, createReminder);

// Delete a reminder
router.delete("/:id", authMiddleware, removeReminder);

// Send Reminder Notifications
router.post("/send-reminder", async (req, res) => {
  const { userId, title, body } = req.body;

  if (!userId || !title || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 🔥 Call notification function from `notifications.js`
    const result = await sendReminderNotification(userId, title, body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
