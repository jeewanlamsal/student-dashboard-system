# student-dashboard-system
Student Dashboard System is an MERN stack application. This system provides a comprehensive dashboard for students to manage courses, mentors, and assignments with real-time progress tracking.

 Features
1. Student Authentication: Secure Login/Logout with JWT and protected frontend routes.
2. Mentor Auto-Assignment: Intelligent backend logic that randomly assigns a mentor from the   database upon registration.
3. Interactive Dashboard: View profile details, assigned mentor expertise, and enrolled courses at a glance.
4. Assignment Management: CRUD functionality for student tasks with the ability to mark as complete.
5.Visual Progress Tracking: A dynamic progress bar that calculates completion percentage based on the number of finished assignments.

 Architecture
The application follows a decoupled Client-Server Architecture:
Frontend: React.js with Tailwind CSS for a responsive, modern UI. State management is handled via React Context API.
Backend: Node.js & Express.js REST API using a Controller-Service-Route pattern.
Database: MongoDB Atlas (NoSQL) with Mongoose schemas utilizing ObjectRefs for relational data (Students ↔ Mentors).

🛠️ Setup Instructions
Prerequisites
Node.js (v16+)
MongoDB Atlas Account

.env example
PORT=
MONGO_URI=
JWT_SECRET=
NODE_ENV=

seedMentors setup 
node seedMentors.js
