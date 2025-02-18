// import knex from "../config/db.js";

// export async function getReminders(user_id) {
//   return knex("reminders").where({ user_id });
// }

// export async function addReminder(reminder) {
//   return knex("reminders").insert(reminder);
// }

// export async function deleteReminder(id) {
//   return knex("reminders").where({ id }).del();
// }

import db from "../config/db.js"; // Adjust the path if needed

// Get all reminders for a user
export const getAllReminders = async (userId) => {
  try {
    const [rows] = await db.query("SELECT * FROM reminders WHERE user_id = ?", [userId]);
    return rows;
  } catch (error) {
    throw new Error("Error fetching reminders");
  }
};

// Add a new reminder
export const addReminder = async (reminderData) => {
  const { user_id, title, description, date } = reminderData;
  try {
    await db.query("INSERT INTO reminders (user_id, title, description, date) VALUES (?, ?, ?, ?)", [
      user_id,
      title,
      description,
      date,
    ]);
  } catch (error) {
    throw new Error("Error adding reminder");
  }
};

// Delete a reminder by ID
export const deleteReminder = async (id) => {
  try {
    await db.query("DELETE FROM reminders WHERE id = ?", [id]);
  } catch (error) {
    throw new Error("Error deleting reminder");
  }
};