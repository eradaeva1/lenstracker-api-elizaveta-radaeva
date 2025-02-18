// import express from "express";
// import { getAllLenses, addLens, deleteLens } from "../models/lensModel.js";
// import authMiddleware from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Get all lenses for a user
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const lenses = await getAllLenses(req.user.id);
//     res.json(lenses);
//   } catch (error) {
//     res.status(500).json({ error: `Failed to fetch lenses: ${error.message}` });
//   }
// });

// router.post("/", authMiddleware, async (req, res) => {
//     try {
//       // Passing the user_id from req.user (which is set by authMiddleware) and the body of the request
//       const lensData = { ...req.body, user_id: req.user.id };
//       await addLens(lensData); // This function now accepts the data directly
//       res.json({ message: "Lens added successfully" });
//     } catch (error) {
//       res.status(500).json({ error: `Failed to add lens: ${error.message}` });
//     }
//   });
  
//   // Route to delete a lens by ID
//   router.delete("/:id", authMiddleware, async (req, res) => {
//     try {
//       // Calling the controller function to delete a lens by its ID
//       await deleteLens(req.params.id); // The ID is taken from the URL parameter
//       res.json({ message: "Lens deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: `Failed to delete lens: ${error.message}` });
//     }
//   });

// export default router;

import knex from "../config/db.js"; // Knex instance for DB operations

// Function to get all lenses for a user
export const getAllLenses = async (userId) => {
  try {
    // Fetch lenses from the database where user_id matches the provided userId
    const lenses = await knex("lenses").where("user_id", userId);
    return lenses;
  } catch (error) {
    throw new Error("Failed to fetch lenses");
  }
};

// Function to add a new lens to the database
export const addLens = async (lensData) => {
  try {
    // Insert the lens data into the lenses table and return the newly inserted lens data
    const [newLens] = await knex("lenses").insert(lensData).returning("*");
    return newLens;
  } catch (error) {
    throw new Error("Failed to add lens to the database");
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