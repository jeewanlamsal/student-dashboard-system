const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mentor = require('./models/Mentor'); // Ensure path matches your project structure

dotenv.config();

const mentors = [
    { name: "Dr. Aristhotel", expertise: "Full Stack Web Development" },
    { name: "Prof. Sarah Jenkins", expertise: "Cloud Computing & DevOps" },
    { name: "Engr. David Chen", expertise: "Database Systems & Architecture" },
    { name: "Dr. Maria Rodriguez", expertise: "UI/UX Design & Frontend Optimization" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing mentors to avoid duplicates
        await Mentor.deleteMany({});
        
        // Insert dummy mentors
        await Mentor.insertMany(mentors);
        
        console.log("Success: 4 dummy mentors added to the database!");
        process.exit();
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();