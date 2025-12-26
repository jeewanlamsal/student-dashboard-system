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
const allowedOrigins = [
    "http://localhost:5173",                                      // Local development
    "https://mern-to-do-3zzw.vercel.app",                        // Your main production link
    /\.vercel\.app$/                                             // ANY link ending in .vercel.app (Regex)
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
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
