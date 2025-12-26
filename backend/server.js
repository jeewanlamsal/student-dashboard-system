require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes= require('./routes/authRoutes')
// Initialize app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: ["https://mern-to-do-3zzw.vercel.app", 
             "https://mern-to-do-3zzw-pnxzxz14m-jeewanlamsals-projects.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
})); // Allows your frontend to talk to this backend
app.use(express.json()); // Parses incoming JSON requests

// Route Links
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/auth', authRoutes);

// Basic health check route
app.get('/', (req, res) => res.send('API is running successfully...'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
