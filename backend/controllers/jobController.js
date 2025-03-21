const Job = require('../models/Job');

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy', 'name email'); // Populate user details
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get jobs by createdBy
exports.getJobsByUser = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.params.userId }).populate('createdBy', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id }, // Ensure only creator can update
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id }); // Ensure only creator can delete
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
