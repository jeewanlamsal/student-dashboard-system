const express = require('express');
const router = express.Router();
const { 
    getAssignments, 
    createAssignment, 
    updateAssignment, 
    deleteAssignment 
} = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes below this line
router.use(protect);

router.route('/')
    .get(getAssignments)      // GET /api/assignments
    .post(createAssignment);  // POST /api/assignments

router.route('/:id')
    .put(updateAssignment)    // PUT /api/assignments/:id
    .delete(deleteAssignment); // DELETE /api/assignments/:id

module.exports = router;