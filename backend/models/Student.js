const mongoose= require('mongoose')
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // NEW: Link to a mentor and a list of courses
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
    enrolledCourses: [{ type: String, default: ['Full Stack Web Development', 'Database Management'] }]
}, { timestamps: true });

module.exports= mongoose.model('Student', studentSchema);