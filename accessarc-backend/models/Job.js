// models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  job_title: { type: String, required: true },
  job_type: { type: String, required: true },
  industry: { type: String },
  experience: { type: String },
  education_level: { type: String },
  skills: [String], 
  accessibility_options: [String], 
  disability: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  age: { type: Number },
  government_schemes: [String],

  posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  posted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);
