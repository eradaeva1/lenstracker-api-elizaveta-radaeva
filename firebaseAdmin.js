import { fileURLToPath } from 'url'; // Import URL utilities
import path from 'path';
import fs from 'fs'; // Use fs for synchronous file operations
import admin from 'firebase-admin'; // Use default import

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the path to the service account JSON file
const serviceAccountPath = path.resolve(__dirname, './lenstracker-e6592-firebase-adminsdk-fbsvc-a75e753f6c.json');

// Read the JSON file synchronously
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK with credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Firebase Admin SDK (admin) and messaging
export { admin };