const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' },
    cv: { type: String, required: true }, // Store CV as a URL or Base64 string
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Reference to Job
  },
  { timestamps: true }
);

module.exports = mongoose.model('Applicant', applicantSchema);
