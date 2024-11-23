import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

// Initialize mock data from Local Storage or default values
let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Inactive",
  },
];

let roles = JSON.parse(localStorage.getItem("roles")) || [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
];

// Save data to Local Storage
const saveToLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("roles", JSON.stringify(roles));
};

// Mock Endpoints for Users
mock.onGet("/api/users").reply(200, users);
mock.onPost("/api/users").reply((config) => {
  const newUser = JSON.parse(config.data);
  newUser.id = users.length + 1;
  users.push(newUser);
  saveToLocalStorage();
  return [200, newUser];
});
mock.onPut(/\/api\/users\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  const updatedUser = JSON.parse(config.data);
  users = users.map((user) => (user.id === id ? updatedUser : user));
  saveToLocalStorage();
  return [200, updatedUser];
});
mock.onDelete(/\/api\/users\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  users = users.filter((user) => user.id !== id);
  saveToLocalStorage();
  return [200];
});

// Mock Endpoints for Roles
mock.onGet("/api/roles").reply(200, roles);
mock.onPost("/api/roles").reply((config) => {
  const newRole = JSON.parse(config.data);
  newRole.id = roles.length + 1;
  roles.push(newRole);
  saveToLocalStorage();
  return [200, newRole];
});
mock.onPut(/\/api\/roles\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  const updatedRole = JSON.parse(config.data);
  roles = roles.map((role) => (role.id === id ? updatedRole : role));
  saveToLocalStorage();
  return [200, updatedRole];
});
mock.onDelete(/\/api\/roles\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  roles = roles.filter((role) => role.id !== id);
  saveToLocalStorage();
  return [200];
});

export default axios;
