import express from 'express';
import { storeFcmToken } from '../controllers/tokenController.js';  // The controller that handles storing the token
const router = express.Router();

// Define the route to store the FCM token
router.post('/store-fcm-token', storeFcmToken);

export default router;