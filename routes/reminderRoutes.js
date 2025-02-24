// import express from "express";
// import { getAllReminders, addReminder, deleteReminder } from "../controllers/lensController.js";
// import  authMiddleware  from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.get("/", authMiddleware, getAllReminders);
// router.post("/", authMiddleware, addReminder);
// router.delete("/:id", authMiddleware, deleteReminder);

// export default router;

// import express from "express";
// import { getAllReminders, addReminder, deleteReminder } from "../models/reminderModel.js"; // Corrected model import
// import authMiddleware from "../middleware/authMiddleware.js"; // Corrected import for authMiddleware

// const router = express.Router();

// // Route to get all reminders for a user
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const reminders = await getAllReminders(req.user.id); // Fetch all reminders for the authenticated user
//     res.json(reminders); // Send back the reminders in JSON format
//   } catch (error) {
//     res.status(500).json({ error: `Failed to fetch reminders: ${error.message}` });
//   }
// });

// // Route to add a new reminder
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     // Passing the user_id from the authenticated user and the body of the request
//     const reminderData = { ...req.body, user_id: req.user.id };
//     await addReminder(reminderData); // Calling the addReminder function from the model
//     res.json({ message: "Reminder set successfully" });
//   } catch (error) {
//     res.status(500).json({ error: `Failed to add reminder: ${error.message}` });
//   }
// });

// // Route to delete a reminder
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     await deleteReminder(req.params.id); // Calling the deleteReminder function from the model
//     res.json({ message: "Reminder deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: `Failed to delete reminder: ${error.message}` });
//   }
// });

// export default router;
import express from "express";
import { getReminders, createReminder, removeReminder } from "../controllers/reminderController.js";
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