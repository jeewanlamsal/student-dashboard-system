const Assignment = require('../models/Assignment');
const assignment= require('../models/Assignment');

//get all assignment for logged-in student
exports.getAssignments= async (req, res)=>{
    try {
        //search for assinment into database using user id
        const assignments= await Assignment.find({user: req.user.id}).sort({createdAt: -1});
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
};

// create new assignment
exports.createAssignment= async (req, res)=>{
    try {
        const {title, description}= req.body;

        if(!title){
            return res.status(400).json({message: 'Please add a title'});
        }

        const assignment= await Assignment.create({
            title,
            description,
            user: req.user.id  //taken from JWT through middleware
        });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({message:'Server Error', error: error.message});
    }
};

//update assignment status (mark as complete)
//put

exports.updateAssignment= async (req, res)=>{
    try {
        let assignment= await Assignment.findById(req.params.id);

        if(!assignment) return res.status(404).json({message: 'Not Found'});
        //Security check: Make sure the assignment belongs to the logged-in user
        if(assignment.user.toString() !== req.user.id){
            return res.status(401).json({message: 'Not authorized'});
        }

        //toggle status
        assignment.status = assignment.status === 'pending' ? 'completed' : 'pending';
        await assignment.save();

        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

//delete an assignment
exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) return res.status(404).json({ message: 'Not Found' });

        // Security Check
        if (assignment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await assignment.deleteOne();
        res.status(200).json({ message: 'Assignment removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};