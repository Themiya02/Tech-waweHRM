import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import GeneratePDF from "./GeneratePDF"; // Import the GeneratePDF component

const RegisteredEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all registered employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (err) {
      setError("Failed to fetch employees");
    }
  };

  // Handle Search
  useEffect(() => {
    const results = employees.filter((employee) => {
      const name = employee.name || "";
      const email = employee.email || "";
      const employeeNumber = employee.employeeNumber || "";

      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employeeNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  // Handle Update
  const handleUpdate = (id) => {
    navigate(`/update-employee/${id}`);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Employee deleted successfully");
        fetchEmployees(); // Refresh the employee list
      } catch (err) {
        setError("Failed to delete employee");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registered Employees</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Search Bar and Download PDF Button */}
         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or employee number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <GeneratePDF employees={filteredEmployees} /> {/* Pass filtered employees to PDF component */}
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Employee Number</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone Number</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{employee.employeeNumber || "N/A"}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{employee.name || "N/A"}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{employee.email || "N/A"}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{employee.phoneNumber || "N/A"}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{employee.role || "N/A"}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => handleUpdate(employee._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredEmployees;