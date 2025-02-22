
import knex from "../config/db.js"; // Knex instance for DB operations

// Function to get all lenses for a user
export const getAllLenses = async (userId) => {
  try {
    // Fetch lenses from the database where user_id matches the provided userId
    const lenses = await knex("lenses").where("user_id", userId);
    return lenses;
  } catch (error) {
    throw new Error("No data yet");
  }
};


export const addLens = async (lensData) => {
  try {
    // Validate required fields
    const { user_id, lens_name, replacement_schedule, start_date, end_date, lens_power, eye_side } = lensData;
    
    if (!user_id || !lens_name || !replacement_schedule || !start_date || !end_date || !lens_power || !eye_side) {
      throw new Error("Missing required fields");
    }

    // Validate eye_side value (should be "left" or "right")
    if (!["left", "right"].includes(eye_side)) {
      throw new Error("Invalid eye_side. Must be 'left' or 'right'.");
    }

    // Insert the lens data into the lenses table and return the newly inserted lens data
    const [newLens] = await knex("lenses")
      .insert({
        user_id,
        lens_name,
        replacement_schedule,
        start_date,
        end_date,
        lens_power,  // New lens power field
        eye_side      // New eye side field
      })
      .returning("*");

    return newLens;
  } catch (error) {
    throw new Error("Failed to add lens to the database: " + error.message);
  }
};

// Function to delete a lens by its ID
export const deleteLens = async (lensId) => {
  try {
    // Delete the lens by its ID
    await knex("lenses").where("id", lensId).del();
  } catch (error) {
    throw new Error("Failed to delete lens");
  }
};