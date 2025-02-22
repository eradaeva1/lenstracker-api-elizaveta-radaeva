// import knex from "../config/db.js";

// export async function createUser(user) {
//   return knex("users").insert(user);
// }

// export async function getUserByEmail(email) {
//   return knex("users").where({ email }).first();
// }

import knex from "../config/db.js";
import db from "../config/db.js"; // Ensure this is imported

// Create a new user
export async function createUser({ username, email, password, phone }) {
  // Insert user into the database, including the phone field
  return knex("users").insert({ username, email, password, phone });
}

// Get a user by email
export async function getUserByEmail(email) {
  return knex("users").where({ email }).first();
}

// Get a user by ID
export async function getUserById(id) {
  return knex("users").where({ id }).first();
}

// Function to update the user's FCM token in the database
// export async function updateUserFcmToken(userId, fcmToken) {
//   try {
//     // Update the user's FCM token in the database using Knex
//     await db('users')
//       .where('id', userId)
//       .update({ fcm_token: fcmToken }); // Make sure you're updating the correct field (fcm_token)
//   } catch (error) {
//     throw new Error("Failed to update FCM token: " + error.message);
//   }
// }

export async function updateUserFcmToken(userId, fcmToken) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET fcm_token = ? WHERE id = ?";
    db.query(sql, [fcmToken, userId], (error, results) => {
      if (error) {
        console.error("Failed to update FCM token:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}