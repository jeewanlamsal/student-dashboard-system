const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expertise: { type: String }
});

module.exports = mongoose.model('Mentor', mentorSchema);