// import knex from "../config/db.js";

// export async function createUser(user) {
//   return knex("users").insert(user);
// }

// export async function getUserByEmail(email) {
//   return knex("users").where({ email }).first();
// }

import knex from "../config/db.js";

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
export async function updateUserFcmToken(userId, fcmToken) {
  return knex('users')
    .where({ id: userId })
    .update({ fcm_token: fcmToken });  // Assuming you have a column `fcm_token` in your users table
}