const mongoose= require('mongoose');

const assignmentSchema= new mongoose.Schema({
    //Link assignment to a specific user
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
    title: {type: String, required: true},
    description: {type: String},
    status: {type: String, enum: ['pending', 'completed'], default: 'pending'}
},
{timestamps: true});

module.exports= mongoose.model('Assignment', assignmentSchema);