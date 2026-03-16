const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructorId', 'name');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create course (Instructor only)
router.post('/', verifyToken, checkRole(['Instructor', 'Admin']), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const course = new Course({ title, description, instructorId: req.user.id, price });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit course
router.put('/:id', verifyToken, checkRole(['Instructor', 'Admin']), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete course
router.delete('/:id', verifyToken, checkRole(['Instructor', 'Admin']), async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
