// Day 1: Project Setup & Database Configuration
// ✅ Initialize project with Node.js, Express, MySQL, and React.
// ✅ Install backend dependencies (express, mysql2, bcrypt, cors, jsonwebtoken, firebase-admin).
// ✅ Set up MySQL database with tables:

// users (authentication)
// lenses (tracking lens data)
// reminders (smart reminders)
// gamification (points/badges for habits)
// chats (AI chatbot history)


// 🟢 Day 2: User Authentication (JWT & Sessions)
// ✅ Implement user authentication with JWT tokens.
// ✅ API Routes:
// POST /users/signup
// POST /users/login
// GET /users/me (protected route)
// ✅ Secure user sessions and handle authentication errors.


// 🟢 Day 3: Lens Tracking API
// ✅ Implement CRUD operations for lens tracking.
// ✅ API Routes:
// GET /lenses
// POST /lenses
// DELETE /lenses/:id
// ✅ Store user-specific lens tracking data in MySQL.


// 🟢 Day 4: Smart Reminder System (Backend & UI)
// ✅ Implement reminder system for lens replacements.
// ✅ API Routes:
// GET /reminders
// POST /reminders
// DELETE /reminders/:id
// ✅ Send notifications based on lens expiry.

// 🟢 Day 5: React Frontend – Authentication & Lens Tracking UI
// ✅ Set up React Router for navigation.
// ✅ Build Sign-up/Login pages with API integration.
// ✅ Create Lens Tracking Page (log details, history).
// ✅ Ensure UI securely handles JWT-based authentication.

// 🟢 Day 6: Reminders UI & Push Notifications (Firebase Cloud Messaging)
// ✅ Build Reminders Page to schedule/edit notifications.
// ✅ Integrate Firebase Cloud Messaging (FCM) to send push notifications.
// ✅ Test notifications for reminders & alerts.

// 🟠 Day 7: AI Chatbot Integration (OpenAI API)
// ✅ Build AI-powered chatbot for lens care tips.
// ✅ Implement chat history storage in MySQL.
// ✅ API Routes:

// POST /chatbot/message (send query)
// GET /chatbot/history (retrieve chat history)
// ✅ Frontend: Create a chat UI for interactive responses.
// 🟠 Day 8: Gamification System
// ✅ Implement points & badges for consistent lens usage.
// ✅ API Routes:

// GET /gamification (fetch user progress)
// ✅ Build UI to display rewards, streaks, badges.
// 🟠 Day 9: Google Calendar Sync & Image Recognition (Google Vision API)
// ✅ Implement Google Calendar API for syncing reminders.
// ✅ API Routes:

// POST /calendar/sync (add events to Google Calendar)
// ✅ Integrate Google Vision API for scanning lens packaging.
// ✅ API Routes:
// POST /image-recognition (scan lens box & extract details).
// 🟠 Day 10: UI Enhancements, Security, and Dark Mode
// ✅ Implement dark mode toggle.
// ✅ Improve chatbot UI with animations.
// ✅ Encrypt sensitive user data & implement rate-limiting for APIs.
// ✅ Ensure JWT tokens are validated on all protected routes.

// 🟠 Day 11: Final Testing, Deployment, & Soft Launch
// ✅ Deploy backend on Render/Vercel.
// ✅ Deploy frontend to Netlify/Vercel.
// ✅ Conduct final end-to-end testing.
// ✅ Ensure AI chatbot, calendar sync, gamification, JWT, and notifications work smoothly.


import express from 'express';
import cors from 'cors';
import knex from 'knex';
import userRoutes from './routes/userRoutes.js';
import lensRoutes from './routes/lensRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import dotenv from "dotenv";
import knexConfig from './knexfile.js';


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

const db = knex(knexConfig.development);

// Middleware to inject the DB into every route (optional, if you want to use DB in routes)
// app.use((req, res, next) => {
//     req.db = db;  // Inject the DB into the request object
//     next();
//   });
  
  // Graceful shutdown handler to close DB connection when server stops
  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    db.destroy()  // Close database connection gracefully
      .then(() => {
        console.log('DB connection closed.');
        process.exit(0);
      })
      .catch(err => {
        console.error('Error closing DB connection:', err);
        process.exit(1);
      });
  });
  

// Use routes for different resources
app.use("/users", userRoutes);
app.use("/lenses", lensRoutes);
app.use("/reminders", reminderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));