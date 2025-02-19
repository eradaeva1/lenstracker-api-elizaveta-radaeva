// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// export const signup = (db) => async (req, res) => {
//   const { email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
  
//   db('users')
//     .insert({ email, password: hashedPassword })
//     .then(() => res.status(201).send('User created'))
//     .catch(err => res.status(500).send('Error signing up'));
// };

// export const login = (db) => async (req, res) => {
//   const { email, password } = req.body;
//   const user = await db('users').where('email', email).first();
//   if (user && await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({ id: user.id }, 'your_secret', { expiresIn: '1h' });
//     return res.json({ token });
//   }
//   res.status(400).send('Invalid credentials');
// };

// import jwt from "jsonwebtoken";

// export async function login(req, res) {
//   const { email, password } = req.body;
//   const user = await getUserByEmail(email);

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//   res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
// }


// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { createUser, getUserByEmail } from "../models/userModel.js";

// export async function register(req, res) {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   await createUser({ name, email, password: hashedPassword });
//   res.json({ message: "User registered successfully" });
// }

// export async function login(req, res) {
//   const { email, password } = req.body;
//   const user = await getUserByEmail(email);

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//   res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
// }

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/userModel.js";

// Register a new user
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    
    console.log("Received data:", req.body); // Debugging log
    
    if (!email || !password || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await createUser({ username, email, password: hashedPassword });

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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return the token and user details
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
}
