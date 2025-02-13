# Project Title
LensTracker

## Overview

What is your app? Give a brief description in a couple of sentences.
LensTracker is a smart contact lens reminder application designed to help users track their lens usage, receive intelligent reminders, and recommendations for eye health and lens care. It ensures users never forget to replace or remove their lenses, preventing discomfort and eye health issues.

### Problem Space

Why is your app needed? Give any background information around any pain points or other reasons.

Many contact lens users struggle with remembering when to change or remove their lenses. Forgetting to replace lenses on time can lead to eye irritation, infections, and vision problems. Existing solutions lack personalization, smart reminders, and engaging user experiences. This app aims to solve these problems and provide adaptive notifications, smart tracking, and health insights.

### User Profile

Who will use your app? How will they use it? Add any special considerations that your app must take into account.

Primary Users: Contact lens wearers (daily, bi-weekly, and monthly lenses).

Secondary Users: Optometrists recommending better tracking solutions to patients.

Usage: Users will log their lens changes, receive automated reminders, track their wear history, and be able to refer to useful resources to help them with tips and guiadance. 

Special Considerations: seamless UI, integration with calendar apps, and an engaging yet simple experience.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

User Authentication: Allow users to sign up, log in, and manage their profile.

Login/Logout: Users can log in with their credentials.
Smart Reminders: notifications that adapt based on user preference and habits.

Lens Tracking: Users can log and monitor lens wear and replacement schedules.

Q&A Resources: Provides eye care tips, answers common questions, and suggests better lens options.

## Implementation

1. User Authentication
Implementation:
User Registration: Users will create an account by providing their email and password. This data will be validated, hashed, and stored in the MySQL database.

User Profile Management: After login, users will be able to update their profile information (such as lens preferences).

Endpoints:
POST /users/signup: Accepts user data (email, password) and stores it securely in the database.
POST /users/login: Authenticates the user and returns a JWT.
2. Lens Tracking
Implementation:
Logging Lens Data: Users will be able to log their contact lens details (brand, power, wear duration, replacement schedule) via a form in the React frontend.
Lens History: A user’s lens history will be stored in MySQL. Each entry will be linked to the user's profile to allow for easy retrieval of past entries.

GET /lenses: Fetches all lens entries for the authenticated user.
POST /lenses: Allows users to add a new lens log.
DELETE /lenses/:id: Allows users to delete a specific lens entry.
3. Smart Reminders
Implementation:

Smart Reminder Logic: The app will calculate optimal reminder times based on the user’s lens wear habits. For example, if a user typically wears their lenses for 10 hours daily, the app will suggest a reminder after 10 hours for removal.
Reminder Scheduling: Users can set up reminders when they log lenses or via the settings page. These reminders can be for changing lenses or taking them out.

Endpoints:

GET /reminders: Fetches upcoming reminders for the user.
POST /reminders: Allows users to create a new reminder.
DELETE /reminders/:id: Deletes a reminder.

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

Backend: 
Node.js, Express.js
Database: MySQL

AI Services:
OpenAI API (AI chatbot for lens care guidance)  - DeepSeek

Frontend:
React (UI Framework)
React Router (Navigation)
SASS (Styling)
Axios (API Requests)



### APIs

List any external sources of data that will be used in your app.

--



### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

Home – Dashboard with current lens status, upcoming reminders, and AI assistant access.
Lens Tracking – Log new lenses, track wear history, and view replacement schedules.
Reminders – Manage smart notifications, edit schedules, and adjust AI settings.
Q&A Page – list of answered questions and tips for lens and eye care.
Settings – Personalization, calendar sync, notification preferences, and theme options.

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

![Home page-mobile](/src/assets/images/Home-page-mobile.png)
![Home page-desktop](/src/assets/images/Home-page-desktop.png)
![Page2-desktop](/src/assets/images/Page2-desktop.png)
![Page2-mobile](/src/assets/images/Page2-mobile.png)
![Page3-desktop](/src/assets/images/Page3-desktop.png)
![Page3-mobile](/src/assets/images/Page3-mobile.png)
![Page4-desktop](/src/assets/images/Page4-desktop.png)
![Page4-mobile](/src/assets/images/Page4-mobile.png)

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out. 

User Profile: Name, lens type, replacement schedule, preferences.
Lens Log: Lens brand, power, wear duration, replacement history.
Reminders: Date/time, timer vased on the schedule.


Users Table
id (INT, primary key, auto-increment)
email (VARCHAR, unique)
password (VARCHAR, hashed)
name (VARCHAR)
created_at (TIMESTAMP)


Lenses Table
id (INT, primary key, auto-increment)
user_id (INT, foreign key → Users.id)
brand (VARCHAR)
power (DECIMAL)
wear_duration (INT)
replacement_date (DATE)
created_at (TIMESTAMP)


Reminders Table
id (INT, primary key, auto-increment)
user_id (INT, foreign key → Users.id)
type (ENUM: "removal", "replacement")
reminder_time (DATETIME)
status (ENUM: "pending", "completed")
created_at (TIMESTAMP)

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

User Management
POST /users/signup: Register new users
POST /users/login: Authenticate users

Lens Tracking
GET /lenses: Retrieve user's lens history
POST /lenses: Log new lens usage
DELETE /lenses/:id: Remove lens entry

Reminders
GET /reminders: Fetch upcoming reminders
POST /reminders: Set a new reminder
DELETE /reminders/:id: Remove a reminder





Example API Requests and Responses

User Authentication

POST /users/signup
Request Body:
{
  "email": "user@example.com",
  "password": "securepassword"
  "name": "John Doe"
}

Response:
{
  "message": "User registered successfully"
}

POST /users/login
Request Body:
{
  "email": "user@example.com",
  "password": "securepassword"
}
Response:
{
  "token": "your-jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
Lens Tracking

GET /lenses
Response:
[
  {
    "id": 1,
    "brand": "Acuvue",
    "power": -2.50,
    "wear_duration": 8,
    "replacement_date": "2025-03-01"
  }
]
POST /lenses
Request Body:
{
  "brand": "Acuvue",
  "power": -2.50,
  "wear_duration": 8,
  "replacement_date": "2025-03-01"
}
Response:
{
  "message": "Lens added successfully"
}


DELETE /lenses/{id}
Response:

{
  "message": "Lens deleted successfully"
}
Reminders
GET /reminders
Response:
[
  {
    "id": 1,
    "type": "replacement",
    "reminder_time": "2025-02-15T09:00:00",
    "status": "pending"
  }
]
POST /reminders
Request Body:
[
  {
  "type": "removal",
  "reminder_time": "2025-02-20T20:00:00Z"
}
]

Response:
{
  "message": "Reminder set successfully"
}
DELETE /reminders/{id}
Response:

{
  "message": "Reminder deleted successfully"
}



## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date. 

---

Day 1: Project Setup & Database Configuration
Set up project structure (Node.js, Express, React).
Install dependencies (express, mysql2, bcrypt, cors, etc.).
Configure MySQL database with tables:

users
lenses
reminders
Day 2: User Authentication (Backend)
Implement user authentication (Sign-up/Login).
Hash passwords with bcrypt.
Create API routes:

POST /users/signup
POST /users/login
Test authentication with Postman.
Day 3: Lens Tracking API
Implement CRUD operations for lenses.
API Routes:

GET /lenses
POST /lenses
DELETE /lenses/:id
Store user-specific lens tracking data in MySQL.
Day 4: Reminder System API
Implement smart reminders for lens replacement.
API Routes:

GET /reminders
POST /reminders
DELETE /reminders/:id
Test API with sample reminder data.
Day 5: React Frontend - Authentication & Routing
Set up React Router for navigation.
Build Sign-up & Login pages with API integration.
Implement session-based authentication.

Day 6: Lens Tracking UI
Create Lens Tracking Page for logging lens details.
Display lens history & past logs.
Connect frontend to backend API.

Day 7: Reminders UI
Build Reminders Page for users to add/edit reminders.
Show upcoming lens replacement reminders.
Test complete UI flow for reminders.

Day 8: UI Enhancements & Error Handling
Improve UI styling using SASS.
Add error handling for API calls (invalid inputs, duplicate lenses, etc.).
Ensure authentication errors are properly handled.

Day 9: Testing & Debugging
Test all API routes.
Ensure data consistency in MySQL.
Debug UI/UX issues.

Day 10: Deployment Setup
 Set up backend on Render/Vercel.
 Deploy frontend to Netlify/Vercel.
 Configure environment variables for database & API.

Day 11: Final Testing & Launch
Conduct final tests for authentication, reminders, and lens tracking.
Fix any last-minute bugs.
Soft launch for user feedback.

## Future Implementations
Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

Future Implementations (Post MVP):

Login/Logout: Users can log in with their credentials. Once logged in, a JWT (JSON Web Token) or OAuth will be issued to maintain authentication state.
Gamification:
Implement a points system and badges for consistent lens tracking.
Track user progress and display earned points and badges.
Calendar Sync:
Sync reminders with Google and Apple calendars.
Allow users to add lens replacement dates to their calendar apps.

Calendar Integration: Google Calendar API, Apple Calendar API
Google Calendar API: For syncing lens replacement reminders with users' calendars.
Apple Calendar API: For syncing reminders on Apple devices.
Calendar Sync Screen: Sync app reminders with Google or Apple calendars.
Gamification Screen: View earned points and badges for consistent tracking.

AI Services:
Google Vision API (for scanning lens packaging)
Giphy API - for gamification
Calendar Sync
POST /calendar/sync: Link to Google/Apple Calendar
Image Recognition: Users can scan their lens packaging to auto-fill details.

1. Calendar Sync
Implementation:

Google Calendar Integration: Users can link their Google Calendar with the app, allowing lens replacement or removal reminders to be synced directly into their calendar events.
Apple Calendar Integration: Similarly, users can sync their reminders with the Apple Calendar.
Syncing Reminders: When a user sets a reminder in the app, it will be sent to their calendar as an event on the corresponding date and time.
Endpoints:

POST /calendar/sync: Links the user’s calendar (Google or Apple) to the app and syncs reminders with the calendar.
2. Gamification
Implementation:

Points System: Users will earn points for consistent lens tracking, logging, and setting reminders. For example, a user may earn 5 points for logging their lenses daily or 10 points for setting up a reminder for lens replacement.
Badges: Badges will be awarded when users hit milestones, such as logging lenses for 7 consecutive days or syncing their calendar for the first time.
Displaying Points and Badges: A dedicated page will show users their earned points and badges.
Endpoints:

GET /gamification: Fetches the user’s gamification progress (points and badges).

Gamification:
Tracks points and badges for the user. Points are accumulated based on their behavior (logging lenses, setting reminders).


Push Notifications: Firebase Cloud Messaging (FCM) will be used to send real-time push notifications to users when it’s time to replace or remove lenses.


Storing Interactions: Each interaction with the AI will be stored in MySQL for later reference and continuous improvement in response quality.

Push Notifications: Firebase Cloud Messaging


AI Chats Table
id (INT, primary key, auto-increment)
user_id (INT, foreign key → Users.id)
message (TEXT)
response (TEXT)
created_at (TIMESTAMP)

Gamification Table
id (INT, primary key, auto-increment)
user_id (INT, foreign key → Users.id)
points (INT)
badges (JSON)
created_at (TIMESTAMP)




AI :

4. AI Chat Assistant
Implementation:

Chat Interface: A simple chat interface will allow users to type queries about lens care, eye health, and best practices. This will be handled via a React component.
AI Integration: OpenAI’s API will process the user’s queries and generate responses based on general eye care information, such as “How long can I wear my contact lenses today?” or “What should I do if I forget to take my lenses out?”.

Endpoints:

POST /ai/chat: Accepts the user's message, sends it to the OpenAI API, and returns the response from the AI.


OpenAI API (AI-powered chatbot)

AI Chat Assistant: Provides eye care tips, answers common questions, and suggests better lens options.

AI Chat: User interactions with the assistant.


AI Chat Assistant
POST /ai/chat: Send message to AI and receive response
AI Chat Assistant

POST /ai/chat
Request Body:
{
  "message": "How long can I wear my contacts today?"
}
Response:
{
  "response": "You can wear your lenses for up to 10 hours today, but ensure to follow your optometrist's recommendations."
}

Updated roadmap inclsing extended features:

Day 1: Upgrade Authentication (JWT)
Replace session-based auth with JWT.
Implement token verification for protected routes.
Update frontend to store & use JWT tokens.

Day 2: AI Chatbot Integration (OpenAI API)
Build chat interface for AI-powered lens care assistant.
Connect chatbot to OpenAI API.
Store chat history in MySQL.

Day 3: Gamification System
Implement points & badges for tracking lens usage.
Create GET /gamification API to fetch user progress.
Build UI to display badges & points.

Day 4: Google Calendar Sync
Implement Google Calendar API for reminders.
Build settings page for calendar integration.
API Route: POST /calendar/sync.

Day 5: Push Notifications (Firebase Cloud Messaging)
Implement push notifications for reminders.
Setup Firebase Cloud Messaging (FCM) for real-time updates.
Ensure notifications trigger based on lens expiry.

Day 6: UI Improvements & Dark Mode
Implement dark mode toggle.
Improve chatbot UI/UX with animations.
Enhance gamification visuals (progress bars, badges).

Day 7: Image Recognition (Google Vision API)
Implement image recognition for lens packaging.
Allow users to scan lens boxes instead of manual entry.
API Route: POST /image-recognition.

Day 8: Security Enhancements
Encrypt sensitive user data.
Implement rate limiting for API requests.
Validate JWT tokens on all protected routes.

Day 9: Testing & Debugging
Test AI chatbot responses & improvements.
Debug JWT-based authentication.
Validate push notification delivery.

Day 10: Final Deployment
Deploy latest backend updates to Render/Vercel.
Deploy frontend with new features.
Set up error monitoring using tools like Sentry.

Day 11: Final Testing & Soft Launch
Conduct complete end-to-end testing.
Ensure AI chatbot, calendar sync, gamification, JWT, and notifications work smoothly.
Launch Version 2 with advanced features.
