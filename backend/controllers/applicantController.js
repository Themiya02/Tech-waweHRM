const Applicant = require('../models/Applicant');
const Job = require('../models/Job');

// Apply for a job
exports.applyJob = async (req, res) => {
  try {
    const { name, email, phone, cv, job } = req.body;

    // Check if job exists
    const jobExists = await Job.findById(job);
    if (!jobExists) return res.status(404).json({ message: 'Job not found' });

    const applicant = new Applicant({
      name,
      email,
      phone,
      cv, // Expecting a URL or Base64 string
      job,
    });

    await applicant.save();
    res.status(201).json(applicant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all applicants
exports.getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find().populate('job', 'title');
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get applicants by job ID
exports.getApplicantsByJob = async (req, res) => {
  try {
    const applicants = await Applicant.find({ job: req.params.jobId }).populate('job', 'title');
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single applicant by ID
exports.getApplicantById = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id).populate('job', 'title');
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });
    res.json(applicant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update applicant status
exports.updateApplicantStatus = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });
    res.json(applicant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an applicant
exports.deleteApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });
    res.json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
