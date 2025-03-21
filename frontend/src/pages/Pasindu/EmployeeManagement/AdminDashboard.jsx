import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "@heroicons/react/solid"; // Import Heroicons for the logout icon


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState(0);

  // Fetch employee count on component mount
  useEffect(() => {
    fetchEmployeeCount();
  }, []);

  // Function to fetch employee count from the backend
  const fetchEmployeeCount = async () => {
    try {
      const response = await fetch("/api/employees/count"); // Replace with your API endpoint
      const data = await response.json();
      setEmployeeCount(data.count); // Assuming the API returns { count: 10 }
    } catch (error) {
      console.error("Error fetching employee count:", error);
    }
  };

  // Function to navigate to the Add Employee page
  const navigateToAddEmployee = () => {
    navigate("/add-employee");
  };

  // Function to navigate to the Registered Employees page
  const navigateToRegisteredEmployees = () => {
    navigate("/registered-employees");
  };

  // Function to handle log out
  const handleLogOut = () => {
    // Perform log out actions (e.g., clear session, remove tokens, etc.)
    console.log("User logged out");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">System Administrator Dashboard</h1>

      {/* Header with Logout Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleLogOut}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <LogoutIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card for Employee Count */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Registered Employees</h2>
          <p className="text-4xl font-bold mb-2">{employeeCount}</p>
          <p className="text-gray-600">Total number of employees in the system.</p>
        </div>

        {/* Card for Add Employee */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
          <p className="text-gray-600 mb-4">Add a new employee to the system.</p>
          <button
            onClick={navigateToAddEmployee}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            Add Employee
          </button>
        </div>

        {/* Card for View Registered Employees */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">View Employees</h2>
          <p className="text-gray-600 mb-4">View and manage registered employees.</p>
          <button
            onClick={navigateToRegisteredEmployees}
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
          >
            View Employees
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;