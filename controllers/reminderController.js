import {
  getAllReminders,
  addReminder,
  deleteReminder,
} from "../models/reminderModel.js"; // Import model functions

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
    // Construct reminder data from the request body and user info
    const reminderData = { ...req.body, user_id: req.user.id };

    // Insert reminder into the database
    const [newReminder] = await db("reminders").insert({
      user_id: reminderData.user_id,
      lens_id: reminderData.lensId, // Assuming lensId is part of the body
      reminder_time: reminderData.reminder_time,
      message: reminderData.message,
      type: reminderData.type,
      status: reminderData.status,
      reminder_date: reminderData.reminder_date,
    }); // Get the inserted row for further processing (optional)

    console.log("New reminder added:", newReminder);

    // Return success response
    res.json({ message: "Reminder set successfully", reminder: newReminder });
  } catch (error) {
    console.error("Error adding reminder:", error);
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
