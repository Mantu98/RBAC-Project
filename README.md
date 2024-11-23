# RBAC Dashboard Application

This project is a **Role-Based Access Control (RBAC)** dashboard application built using **React** and **Mock API**. It allows users to manage users and roles with functionalities to add, edit, and delete records.

## Features
- **User Management**: Add, edit, delete, and view user details.
- **Role Management**: Add, edit, delete, and view roles with permissions.
- **Sidebar Navigation**: Responsive sidebar with a hamburger menu for mobile devices.
- **Mock API**: Backend API simulation with persistent data storage in Local Storage.

## Technologies Used
- React, React Router, Tailwind CSS
- axios, axios-mock-adapter

## Project Structure
src/
├── components/
│   └── Modal.js         # Reusable modal component
├── pages/
│   ├── UserManagement.js # User management page
│   └── RoleManagement.js # Role management page
├── services/
│   └── mockApi.js        # Mock API implementation
├── App.js                # Main application component
└── index.js              # Entry point


## How to Run the Code
### Prerequisites
- **Node.js** (v14 or higher) and npm or yarn installed.

### Steps
1. Clone the repository:
   ```bash
   git clone 
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
4. Open the app in your browser:
   http://localhost:5173


### Mock API Endpoints
Users
GET /api/users: Fetch all users.
POST /api/users: Add a new user.
PUT /api/users/:id: Update a user.
DELETE /api/users/:id: Delete a user.
Roles
GET /api/roles: Fetch all roles.
POST /api/roles: Add a new role.
PUT /api/roles/:id: Update a role.
DELETE /api/roles/:id: Delete a role.
 
