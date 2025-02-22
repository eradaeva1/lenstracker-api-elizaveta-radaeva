import { updateUserFcmToken } from '../models/userModel.js';  // Your model for saving the FCM token

// Store the FCM token in the database
export async function storeFcmToken(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is missing." });
    }

    const { userId, fcmToken } = req.body;

    if (!userId || !fcmToken) {
      return res.status(400).json({ error: "User ID and FCM Token are required." });
    }

    // Save token to database
    await updateUserFcmToken(userId, fcmToken);
    res.status(200).json({ message: "FCM token saved successfully" });
  } catch (error) {
    console.error("Failed to save FCM token:", error);
    res.status(500).json({ error: "Failed to save FCM token" });
  }
}