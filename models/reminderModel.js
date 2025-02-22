

import db from "../config/db.js"; // Adjust the path if needed


// Get all reminders for a user
export const getAllReminders = async () => {
  try {
    const reminders = await db('reminders')
      .join('users', 'reminders.user_id', '=', 'users.id')  // Example of a join if needed
      .select('reminders.id', 'reminders.reminder_time', 'users.username', 'reminders.message');
    return reminders;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw new Error("Error fetching reminders");
  }
};

// // Add a new reminder
// export const addReminder = async (reminderData) => {
//   const { user_id, title, description, date } = reminderData;
//   try {
//     await db.query("INSERT INTO reminders (user_id, title, description, date) VALUES (?, ?, ?, ?)", [
//       user_id,
//       title,
//       description,
//       date,
//     ]);
//   } catch (error) {
//     throw new Error("Error adding reminder");
//   }
// };

export const addReminder = async (reminderData) => {
  try {
    console.log("Adding reminder with data:", reminderData);
    
    // Check if reminder_time exists and is a valid ISO string
    if (reminderData.reminder_time) {
      const date = new Date(reminderData.reminder_time);
      reminderData.reminder_time = date.toISOString().slice(0, 19).replace('T', ' '); // Convert to 'YYYY-MM-DD HH:MM:SS'
    }

    const [newReminder] = await db('reminders').insert(reminderData).returning('*');
    
    console.log("New reminder added:", newReminder);  // Log the newly added reminder
    return newReminder;
  } catch (error) {
    console.error("Error adding reminder:", error);  // Log the full error message
    throw new Error("Error adding reminder");
  }
};

// Delete a reminder by ID
export const deleteReminder = async (id) => {
  try {
    await db('reminders')
      .where('id', id)
      .del();  // 'del' is the Knex method to delete records
  } catch (error) {
    console.error("Error deleting reminder:", error);
    throw new Error("Error deleting reminder");
  }
};