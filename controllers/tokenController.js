import { updateUserFcmToken } from '../models/userModel.js';  // Your model for saving the FCM token

// Store the FCM token in the database
export async function storeFcmToken(req, res) {
  const { userId, fcmToken } = req.body;

  if (!userId || !fcmToken) {
    return res.status(400).json({ error: "User ID and FCM Token are required." });
  }

  try {
    // Update the user in the database with the FCM token
    await updateUserFcmToken(userId, fcmToken);
    res.status(200).json({ message: "FCM token saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save FCM token" });
  }
}