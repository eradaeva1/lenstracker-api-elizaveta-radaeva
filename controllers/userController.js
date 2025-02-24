import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/userModel.js";

// Register a new user
export async function register(req, res) {
  try {
    const { username, email, password, phone } = req.body;

    console.log("Received data:", req.body); // Debugging log

    if (!email || !password || !username || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database, including the phone number
    await createUser({ username, email, password: hashedPassword, phone });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
}

// Login a user and return a JWT token
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    // Check if the user exists and compare passwords
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "23h",
    });

    // Return the token and user details
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        phone: user.phone, // Include phone number in the response
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
}
