# Project Title
LensTracker

## Overview

What is your app? Give a brief description in a couple of sentences.
LensTracker is a smart contact lens reminder application designed to help users track their lens usage, receive intelligent reminders, and get AI-powered recommendations for eye health and lens care. It ensures users never forget to replace or remove their lenses, preventing discomfort and eye health issues.

### Problem Space

Why is your app needed? Give any background information around any pain points or other reasons.

Many contact lens users struggle with remembering when to change or remove their lenses. Forgetting to replace lenses on time can lead to eye irritation, infections, and vision problems. Existing solutions lack personalization, smart reminders, and engaging user experiences. This app aims to solve these problems by using AI to learn user behavior and provide adaptive notifications, smart tracking, and health insights.

### User Profile

Who will use your app? How will they use it? Add any special considerations that your app must take into account.

Primary Users: Contact lens wearers (daily, bi-weekly, and monthly lenses).
Secondary Users: Optometrists recommending better tracking solutions to patients.
Usage: Users will log their lens changes, receive automated reminders, track their wear history, and interact with an AI-powered assistant for lens care guidance.
Special Considerations: seamless UI, integration with calendar apps, and an engaging yet simple experience.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

User Authentication: Allow users to sign up, log in, and manage their profile.
Smart Reminders: notifications that adapt based on user preference and habits.
Lens Tracking: Users can log and monitor lens wear and replacement schedules.
AI Chat Assistant: Provides eye care tips, answers common questions, and suggests better lens options.

## Implementation
1. User Authentication
Implementation:
User Registration: Users will create an account by providing their email and password. This data will be validated, hashed, and stored in the MySQL database.
Login/Logout: Users can log in with their credentials. Once logged in, a JWT (JSON Web Token) or OAuth will be issued to maintain authentication state.
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
4. AI Chat Assistant
Implementation:

Chat Interface: A simple chat interface will allow users to type queries about lens care, eye health, and best practices. This will be handled via a React component.
AI Integration: OpenAI’s API will process the user’s queries and generate responses based on general eye care information, such as “How long can I wear my contact lenses today?” or “What should I do if I forget to take my lenses out?”.

Endpoints:

POST /ai/chat: Accepts the user's message, sends it to the OpenAI API, and returns the response from the AI.

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

Backend: Node.js, Express.js
Database: MySQL
Frontend: React 
Push Notifications: Firebase Cloud Messaging
AI Services:
OpenAI API (AI chatbot for lens care guidance)


### APIs

List any external sources of data that will be used in your app.

OpenAI API (AI-powered chatbot)



### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

Home – Dashboard with current lens status, upcoming reminders, and AI assistant access.
Lens Tracking – Log new lenses, track wear history, and view replacement schedules.
Reminders – Manage smart notifications, edit schedules, and adjust AI settings.
AI Assistant – Chat with AI for eye care tips and troubleshooting.
Settings – Personalization, calendar sync, notification preferences, and theme options.

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out. 

User Profile: Name, lens type, replacement schedule, preferences.
Lens Log: Lens brand, power, wear duration, replacement history.
Reminders: Date/time, timer vased on the schedule.
AI Chat: User interactions with the assistant.

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
AI Chat Assistant
POST /ai/chat: Send message to AI and receive response



## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date. 

---

Week 1: Backend Setup & Core Functionality
Tasks:

User Authentication System:

Implement the user registration and login system using JWT (JSON Web Tokens).
Set up MySQL database tables for storing user information (email, hashed password).
Lens Tracking Database:

Design the database schema for lens tracking (lens brand, power, wear duration, replacement date).
Set up endpoints for logging lens data (CRUD operations).
Reminder System:

Create endpoints for setting, fetching, and deleting reminders.
Deliverables:

Working user authentication system (sign up/login).
CRUD operations for lens tracking.
Functional reminder system (set, fetch, delete).
Week 2: Frontend Development & Smart Reminders
Tasks:

Frontend User Authentication:
Develop the sign-up/login pages with React.
Set up the user session with JWT.
Lens Tracking UI:
Create the lens tracking page where users can input their lens details (brand, power, wear duration, etc.).
Implement the history view for users to manage previously logged lenses.
Smart Reminders:
Develop the UI for users to set reminders (date and time).
Implement the reminder logic on the backend to send notifications (Firebase Cloud Messaging) based on user behavior.
Deliverables:

User authentication UI (sign-up, login).
Lens tracking page and history management.
Basic reminder system integrated with push notifications.
Week 3: AI Chat Assistant Integration & Refinement
Tasks:

AI Chat Interface:
Build the AI chat interface using React. Users can interact with the assistant for eye care advice.
OpenAI API Integration:
Set up the integration with the OpenAI API to process and respond to user queries related to lens care and eye health.
Storing Chat History:
Set up the MySQL database to store user chat history for future analysis and improvements in AI responses.
Refinement of Reminders:
Fine-tune reminder scheduling to ensure it adapts to user behavior based on historical data.
Deliverables:

AI chat interface fully functional.
OpenAI API integration for lens care advice.
Refined reminder system for more personalized notifications.


## Future Implementations
Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.
Future Implementations (Post MVP):

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