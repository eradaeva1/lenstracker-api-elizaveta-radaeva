// import knex from "../config/db.js";

// export async function getAllLenses(user_id) {
//   return knex("lenses").where({ user_id });
// }

// export async function addLens(lens) {
//   return knex("lenses").insert(lens);
// }

// export async function deleteLens(id) {
//   return knex("lenses").where({ id }).del();
// }

import db from "../config/db.js"; // Import knex instance

// Function to retrieve all lenses for a user
export const getAllLenses = async (userId) => {
  try {
    // Query the lenses table to fetch all lenses for the given user_id
    const lenses = await db("lenses").where("user_id", userId);
    return lenses;
  } catch (error) {
    throw new Error("Failed to fetch lenses");
  }
};

// Function to add a new lens to the database
export const addLens = async (lensData) => {
  try {
    // Insert the lens data into the lenses table and return the inserted data
    const [newLens] = await db("lenses").insert(lensData).returning("*");
    return newLens;
  } catch (error) {
    throw new Error("Failed to add lens to the database");
  }
};

// Function to delete a lens by its ID
export const deleteLens = async (lensId) => {
  try {
    // Delete the lens from the lenses table using the lens ID
    await db("lenses").where("id", lensId).del();
  } catch (error) {
    throw new Error("Failed to delete lens");
  }
};