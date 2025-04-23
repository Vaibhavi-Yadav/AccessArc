const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');
const { protect, isAdmin } = require('../middleware/auth');

router.post('/', protect, isAdmin, createJob); // Only admin can post
router.get('/', protect, getJobs); // All users can view jobs

module.exports = router;
