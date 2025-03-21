import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaBriefcase, FaUsers, FaPlus, FaDownload } from "react-icons/fa";

const jobsData = [
  { id: 1, title: "Software Engineer", description: "Build web applications.", status: "Open" },
  { id: 2, title: "UI/UX Designer", description: "Create intuitive designs.", status: "Closed" },
];

const applicantsData = [
  { id: 1, name: "John Doe", job: "Software Engineer", status: "Pending", cv: "https://example.com/johndoe_cv.pdf" },
  { id: 2, name: "Jane Smith", job: "UI/UX Designer", status: "Shortlisted", cv: "https://example.com/janesmith_cv.pdf" },
];

const statusColors = {
  Open: "bg-green-200 text-green-800",
  Closed: "bg-red-200 text-red-800",
  Pending: "bg-yellow-200 text-yellow-800",
  Shortlisted: "bg-blue-200 text-blue-800",
  Hired: "bg-purple-200 text-purple-800",
};

const RecruitingManagement = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState(jobsData);
  const [applicants, setApplicants] = useState(applicantsData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = (type, id, newStatus) => {
    if (type === "job") {
      setJobs(jobs.map((job) => (job.id === id ? { ...job, status: newStatus } : job)));
    } else {
      setApplicants(applicants.map((applicant) => (applicant.id === id ? { ...applicant, status: newStatus } : applicant)));
    }
  };

  const filteredJobs = jobs.filter((job) => job.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredApplicants = applicants.filter((applicant) => applicant.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (

    <div>
<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Recruiting Management</h1>

      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
  {/* Tabs */}
  <div className="flex space-x-2 w-full sm:w-auto">
    <button
      onClick={() => setActiveTab("jobs")}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
        activeTab === "jobs" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      <FaBriefcase />
      <span>Jobs</span>
    </button>
    <button
      onClick={() => setActiveTab("applicants")}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
        activeTab === "applicants" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      <FaUsers />
      <span>Applicants</span>
    </button>
  </div>

  {/* Buttons (Add & Download Report) */}
  <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
    <button
      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md w-full sm:w-auto"
    >
      <FaPlus />
      <span>Add {activeTab === "jobs" ? "Job" : "Applicant"}</span>
    </button>
    
    <button
      className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-md w-full sm:w-auto"
      
    >
      <FaDownload />
      <span>Download Report</span>
    </button>
  </div>
</div>


      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 border rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Jobs List */}
      {activeTab === "jobs" && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Job Listings</h2>
          <ul className="space-y-3">
            {filteredJobs.map((job) => (
              <li key={job.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm">
                <div>
                  <h3 className="font-bold text-gray-800">{job.title}</h3>
                  <p className="text-gray-600 text-sm">{job.description}</p>
                  <span className={`text-xs px-2 py-1 rounded ${statusColors[job.status]}`}>{job.status}</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <button className="text-green-500 hover:text-green-700">
                    <FaEye />
                  </button>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                  <select
                    className="text-sm p-1 border rounded"
                    value={job.status}
                    onChange={(e) => handleStatusChange("job", job.id, e.target.value)}
                  >
                    <option>Open</option>
                    <option>Closed</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Applicants List */}
      {activeTab === "applicants" && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Applicants</h2>
          <ul className="space-y-3">
            {filteredApplicants.map((applicant) => (
              <li key={applicant.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm">
                <div>
                  <h3 className="font-bold text-gray-800">{applicant.name}</h3>
                  <p className="text-gray-600 text-sm">{applicant.job}</p>
                  <a href={applicant.cv} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">
                    View CV
                  </a>
                  <span className={`text-xs px-2 py-1 ml-2 rounded ${statusColors[applicant.status]}`}>{applicant.status}</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <button className="text-green-500 hover:text-green-700">
                    <FaEye />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                  <select
                    className="text-sm p-1 border rounded"
                    value={applicant.status}
                    onChange={(e) => handleStatusChange("applicant", applicant.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Shortlisted</option>
                    <option>Hired</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default RecruitingManagement;
