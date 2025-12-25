const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mentor = require('../models/Mentor');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // 1. Check if user exists... (existing logic)

        // 2. Fetch all available mentors
        const mentors = await Mentor.find();
        
        // 3. Logic for Random Assignment
        // If no mentors exist in DB yet, you can fallback to null or a default
        const randomMentor = mentors.length > 0 
            ? mentors[Math.floor(Math.random() * mentors.length)] 
            : null;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const student = await Student.create({ 
            name, 
            email, 
            password: hashedPassword,
            mentor: randomMentor ? randomMentor._id : null, 
            enrolledCourses: ['Full Stack Web Development', 'UI/UX Design', 'Database Systems']
        });

        res.status(201).json({ success: true, message: 'Registered with mentor assigned' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login student & get token
//route=> POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        if (student && (await bcrypt.compare(password, student.password))) {
            // Generate JWT
            const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            
            res.json({
                _id: student._id,
                name: student.name,
                email: student.email,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Add this function to authController.js
exports.getProfile = async (req, res) => {
    try {
        // .populate('mentor') fetches the full mentor object, not just the ID
        const student = await Student.findById(req.user.id)
            .select('-password') 
            .populate('mentor');
            
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};