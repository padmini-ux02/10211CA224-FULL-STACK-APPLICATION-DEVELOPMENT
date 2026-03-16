const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { verifyToken } = require('../middleware/authMiddleware');

// Enroll in a course (Student only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const existing = await Enrollment.findOne({ studentId: req.user.id, courseId });
    if (existing) return res.status(400).json({ message: 'Already enrolled' });

    const enrollment = new Enrollment({ studentId: req.user.id, courseId });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get enrolled courses for current student
router.get('/mycourses', verifyToken, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user.id }).populate('courseId');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
