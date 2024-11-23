import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64 p-4 flex flex-col">
          <h1 className="text-xl font-bold mb-8">RBAC Dashboard</h1>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
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
            >
              Role Management
            </NavLink>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6">
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route
              path="/"
              element={
                <div className="text-center">
                  <h1 className="text-3xl font-bold">
                    Welcome to the RBAC Dashboard
                  </h1>
                  <p className="mt-4 text-gray-700">
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
