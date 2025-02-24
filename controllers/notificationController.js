// import { admin } from "../firebaseAdmin.js";   // Import Firebase Admin SDK
// import { getUserById } from '../models/userModel.js';  // Function to get the user by ID

// // Send a push notification to a specific user
// export async function sendNotification(req, res) {
//   const { userId, title, body } = req.body;

//   if (!userId || !title || !body) {
//     return res.status(400).json({ error: "User ID, title, and body are required." });
//   }

//   try {
//     // Fetch the user and their FCM token from the database
//     const user = await getUserById(userId);
//     if (!user || !user.fcm_token) {
//       return res.status(404).json({ error: "User not found or no FCM token available." });
//     }

//     // Define the notification message
//     const message = {
//       notification: {
//         title: title,
//         body: body,
//       },
//       token: user.fcm_token,  // Send to the user's FCM token
//     };

//     // Send the notification using Firebase Admin SDK
//     const response = await admin.messaging().send(message);
//     console.log("Notification sent successfully:", response);

//     res.status(200).json({ message: "Notification sent successfully" });
//   } catch (error) {
//     console.error("Error sending notification:", error);
//     res.status(500).json({ error: "Failed to send notification" });
//   }
// }