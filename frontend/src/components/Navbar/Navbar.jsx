import React from 'react'
import { Bell, UserCircle, Briefcase } from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="w-full bg-sky-300 shadow-md py-3 px-6 flex items-center justify-between">
      
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Briefcase className="w-8 h-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-800">HRM Hub</span>
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center space-x-6">
        
        {/* Notification Icon */}
        <div className="relative">
          <Bell className="w-7 h-7 text-gray-600 cursor-pointer hover:text-blue-600" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 bg-red-500 h-2 w-2 rounded-full"></span>
        </div>

        {/* Profile Icon */}
        <div className="relative group">
          <UserCircle className="w-9 h-9 text-gray-700 cursor-pointer" />

          {/* Dropdown Menu (Optional) */}
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all transform translate-y-2 z-50">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Profile</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">Logout</a>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar