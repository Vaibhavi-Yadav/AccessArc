const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, posted_by: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ msg: "Job creation failed", err });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ posted_at: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch jobs", err });
  }
};
