import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (phoneNumber, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: phoneNumber, // User's phone number
    });
    console.log("SMS sent to:", phoneNumber);
  } catch (error) {
    console.error("Error sending SMS:", error.message);
  }
};