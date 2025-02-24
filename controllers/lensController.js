import db from "../config/db.js";

export const getAllLenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const lenses = await db("lenses").where("user_id", userId);

    if (lenses.length === 0) {
      return res.status(404).json({ message: "No lenses found for this user" });
    }

    res.json(lenses);
  } catch (error) {
    console.error("Error fetching lenses:", error.message);
    res.status(500).json({ message: "Failed to retrieve lenses" });
  }
};

export const addLens = async (req, res) => {
  try {
    console.log("Received lens data:", req.body);

    // Extract user_id from JWT payload (assuming it's set in middleware)
    const user_id = req.user?.id;

    // Destructure request body
    const {
      lens_name,
      replacement_schedule,
      start_date,
      lens_power,
      eye_side,
      end_date,
    } = req.body;

    // Validate required fields
    if (
      !user_id ||
      !lens_name ||
      !replacement_schedule ||
      !start_date ||
      !lens_power ||
      !eye_side
    ) {
      console.error("❌ Missing required fields:", req.body);
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate `eye_side`
    if (!["left", "right"].includes(eye_side.toLowerCase())) {
      return res
        .status(400)
        .json({ message: "Invalid eye_side. Must be 'left' or 'right'." });
    }

    // Ensure `replacement_schedule` is an integer
    const validSchedules = {
      daily: 1,
      weekly: 7,
      biweekly: 14,
      monthly: 30,
    };

    const daysToAdd = validSchedules;
    if (!daysToAdd) {
      console.error("❌ Invalid replacement schedule:", replacement_schedule);
      return res
        .status(400)
        .json({
          message:
            "Invalid replacement schedule. Use 'daily', 'weekly', 'biweekly', or 'monthly'.",
        });
    }

    // Ensure `start_date` is a valid date
    const startDate = new Date(start_date);
    if (isNaN(startDate.getTime())) {
      console.error("❌ Invalid start_date:", start_date);
      return res
        .status(400)
        .json({ message: "Invalid start_date format. Use YYYY-MM-DD." });
    }
    console.log("Received start_date:", start_date, typeof start_date);

    // Calculate `end_date`
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + replacement_schedule);
    console.log(endDate);

    // Ensure the user exists before inserting the lens
    const [userExists] = await db("users").where({ id: user_id }).limit(1);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    // Prevent duplicate lens entries for the same user, start_date, and eye_side
    const existingLens = await db("lenses")
      .where({ user_id, start_date, eye_side })
      .first();

    if (existingLens) {
      return res
        .status(409)
        .json({
          message: "A lens for this eye on this start date already exists.",
        });
    }

    // Insert into MySQL
    await db("lenses").insert({
      user_id,
      lens_name,
      replacement_schedule,
      start_date,
      end_date: endDate.toISOString().split("T")[0],
      lens_power,
      eye_side,
    });

    res.status(201).json({ message: "Lens added successfully" });
  } catch (error) {
    console.error("🔥 Error adding lens:", error.message);
    res
      .status(500)
      .json({
        message: "Failed to add lens to the database",
        error: error.message,
      });
  }
};

// ✅ Delete Lens (User-specific)
export const deleteLens = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Get user ID from JWT
    const { id } = req.params;

    // Ensure the lens belongs to the authenticated user
    const lens = await db("lenses").where({ id, user_id: userId }).first();

    if (!lens) {
      return res
        .status(404)
        .json({ message: "Lens not found or unauthorized" });
    }

    await db("lenses").where({ id }).del();
    res.json({ message: "Lens deleted successfully" });
  } catch (error) {
    console.error("Error deleting lens:", error.message);
    res.status(500).json({ message: "Failed to delete lens" });
  }
};
