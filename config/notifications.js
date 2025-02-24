import { admin } from "../firebaseAdmin.js"; // Firebase Admin SDK
import { sendSMS } from "./twilioClient.js"; // Twilio SMS function
import db from "../config/db.js"; // MySQL Database

// Function to send notifications (Push & SMS)
export const sendReminderNotification = async (userId, title, body) => {
  try {
    // Fetch user's FCM token and phone number from the database
    const [rows] = await db.query(
      "SELECT token, phone FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const { token, phone } = rows[0];

    // 1️⃣ **Send Push Notification**
    if (token) {
      const message = { notification: { title, body }, token };
      await admin.messaging().send(message);
      console.log("Push notification sent.");
    }

    // 2️⃣ **Send SMS Notification**
    if (phone) {
      await sendSMS(phone, `${title}: ${body}`);
      console.log("SMS sent.");
    }

    return { success: true, message: "Reminder sent via Push & SMS." };
  } catch (error) {
    console.error("Notification Error:", error.message);
    throw new Error("Failed to send notification");
  }
};
