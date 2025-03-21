const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');

router.post('/', applicantController.applyJob);
router.get('/', applicantController.getApplicants);
router.get('/job/:jobId', applicantController.getApplicantsByJob); // Get applicants by job
router.get('/:id', applicantController.getApplicantById);
router.put('/:id/status', applicantController.updateApplicantStatus);
router.delete('/:id', applicantController.deleteApplicant);

module.exports = router;
