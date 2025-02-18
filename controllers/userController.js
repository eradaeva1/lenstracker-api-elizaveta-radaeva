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


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/userModel.js";

export async function register(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ name, email, password: hashedPassword });
  res.json({ message: "User registered successfully" });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
}