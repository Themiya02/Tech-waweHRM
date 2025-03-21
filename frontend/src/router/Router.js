import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import RecrutingManagement from "../pages/Themiya/RecrutingManagement/RecrutingManagement";
import PayrollDashboard from "../pages/Vageesha/AddPayroll/PayrollDashboard";
import LeaveManagerDashboard from "../pages/Nethmi/LeaveManagement/LeaveManagerDashboard";
import AdminDashboard from "../pages/Pasindu/EmployeeManagement/AdminDashboard";
import Login from "../pages/Login";
import AddEmployee from "../pages/Pasindu/EmployeeManagement/AddEmployee";
import RegisteredEmployees from "../pages/Pasindu/EmployeeManagement/RegisteredEmployees";
import UpdateEmployee from "../pages/Pasindu/EmployeeManagement/UpdateEmployee";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recruiting-manager-dashboard" element={<RecrutingManagement />} />
      <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      <Route path="/payroll-dashboard"element={<PayrollDashboard/>}/>
      <Route path="/leave-Manager"element={<LeaveManagerDashboard/>}/>
      <Route path="/petty-cash-manager"element={<pettyCashManger/>}/>
      <Route path="/login"element={<Login/>}/>
      <Route path="/add-employee"element={<AddEmployee/>}/>
      <Route path="/register-employee"element={<RegisteredEmployees/>}/>
      <Route path="/updateEmployee"element={<UpdateEmployee/>}/>
    </Routes>
  );
};

export default AppRouter;