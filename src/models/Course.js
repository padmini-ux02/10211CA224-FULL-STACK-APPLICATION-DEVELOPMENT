const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
