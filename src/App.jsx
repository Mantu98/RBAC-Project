import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import { HiMenuAlt3 } from "react-icons/hi"; // Icon for hamburger menu
import { MdClose } from "react-icons/md"; // Icon for close menu

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`bg-gray-800 text-white fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 p-4 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0`}
        >
          <h1 className="text-xl font-bold mb-8">RBAC Dashboard</h1>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
            >
              User Management
            </NavLink>
            <NavLink
              to="/roles"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
            >
              Role Management
            </NavLink>
          </nav>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded lg:hidden z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <MdClose size={24} /> : <HiMenuAlt3 size={24} />}
        </button>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6">
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route
              path="/"
              element={
                <div className="flex flex-col justify-center items-center h-full">
                  <h1 className="text-3xl font-bold text-center">
                    Welcome to the RBAC Dashboard
                  </h1>
                  <p className="mt-4 text-gray-700 text-center">
                    Use the navigation menu to manage users and roles.
                  </p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
