import express from 'express';
import cors from 'cors';
import knex from 'knex';
import userRoutes from './routes/userRoutes.js';
import lensRoutes from './routes/lensRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';  // Keep this for reminder and notification handling
import tokenRoutes from './routes/tokenRoutes.js';
import dotenv from "dotenv";
import knexConfig from './knexfile.js';
import cron from "node-cron";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize database connection
const db = knex(knexConfig.development);

// Schedule daily reminders at 9 AM
cron.schedule("32 21 * * *", async () => {
  try {
    console.log("Sending daily reminders...");

    // Query to get users with upcoming reminders for today
    const users = await db('reminders')
      .whereRaw('DATE(reminder_date) = CURDATE()') // Ensure reminder_date is for today
      .join('users', 'reminders.user_id', '=', 'users.id') // Assuming 'user_id' in reminders table
      .select('users.id', 'users.email'); // Fetch user ID and email

    // Send reminders via Axios for each user
    for (const user of users) {
      await axios.post("http://localhost:5000/reminders/send-reminder", {
        userId: user.id,
        title: "Lens Reminder",
        body: "Time to change your contact lenses!",
      });

      console.log(`Reminder sent to user ID: ${user.id}, Email: ${user.email}`);
    }

    console.log("All reminders sent.");
  } catch (error) {
    console.error("Error sending reminders:", error.message);
  }
});


const app = express();
app.use(express.json());
app.use(cors());


process.on('SIGINT', () => {
  console.log('Shutting down server...');
  db.destroy()  // Close DB connection gracefully
    .then(() => {
      console.log('DB connection closed.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error closing DB connection:', err);
      process.exit(1);
    });
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/ask-gemini", async (req, res) => {
  const { question } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // **Improved Prompt for Better AI Responses**
    const prompt = `
      You are an AI assistant for a contact lens tracking app called "LensTracker". 
      Answer the following question in a **clear, friendly, and concise** manner, like an FAQ entry.

      Guidelines:
      - Keep it short (2-4 sentences)
      - Avoid technical jargon** (use simple explanations)
      - If it's health-related, suggest consulting an eye doctor
      - Use bullet points if needed
      - End with a helpful tip if possible
      
      User's Question: "${question}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error("Error with Gemini API:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});
// Use routes for different resources
app.use("/users", userRoutes);
app.use("/lenses", lensRoutes);
app.use("/reminders", reminderRoutes);  // This now handles reminders and notifications
app.use("/", tokenRoutes);  // Handle storing FCM token

// Set server port and start the application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));