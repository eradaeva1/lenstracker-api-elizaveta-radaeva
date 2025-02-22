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
import { getReminders, createReminder, removeReminder } from "../controllers/reminderController.js"; // Import controller functions
import authMiddleware from "../middleware/authMiddleware.js"; // Ensure the user is authenticated
import { admin } from "../firebaseAdmin.js";  // Firebase Admin SDK
import db from "../config/db.js";
import { sendSMS } from "../config/twilioClient.js"; // Import Twilio SMS function


const router = express.Router();

// Get all reminders for a user
router.get("/", authMiddleware, getReminders); // Use the controller's getReminders function

// Add a new reminder
router.post("/", authMiddleware, createReminder); // Use the controller's createReminder function

// Delete a reminder by ID
router.delete("/:id", authMiddleware, removeReminder); // Use the controller's removeReminder function

// Send reminder notification (push & SMS)
router.post("/send-reminder", async (req, res) => {
  const { userId, title, body } = req.body;

  if (!userId || !title || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Fetch FCM token and phone number from the database
    const [rows] = await db.query("SELECT token, phone FROM users WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const { token, phone } = rows[0];

    // 1️⃣ Send Push Notification via Firebase
    if (token) {
      const message = { notification: { title, body }, token };
      await admin.messaging().send(message);
      console.log("Push notification sent.");
    }

    // 2️⃣ Send SMS via Twilio
    if (phone) {
      await sendSMS(phone, `${title}: ${body}`);
      console.log("SMS sent.");
    }

    res.json({ success: true, message: "Reminder sent via Push & SMS." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;