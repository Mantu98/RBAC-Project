import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

// Mock Users
let users = [
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

// Mock Roles
let roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
];

// Mock Endpoints
mock.onGet("/api/users").reply(200, users);
mock.onPost("/api/users").reply((config) => {
  const newUser = JSON.parse(config.data);
  users.push({ id: users.length + 1, ...newUser });
  return [200, newUser];
});
mock.onPut(/\/api\/users\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  const updatedUser = JSON.parse(config.data);
  users = users.map((user) => (user.id === id ? updatedUser : user));
  return [200, updatedUser];
});
mock.onDelete(/\/api\/users\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  users = users.filter((user) => user.id !== id);
  return [200];
});

mock.onGet("/api/roles").reply(200, roles);
mock.onPost("/api/roles").reply((config) => {
  const newRole = JSON.parse(config.data);
  roles.push({ id: roles.length + 1, ...newRole });
  return [200, newRole];
});
mock.onPut(/\/api\/roles\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  const updatedRole = JSON.parse(config.data);
  roles = roles.map((role) => (role.id === id ? updatedRole : role));
  return [200, updatedRole];
});
mock.onDelete(/\/api\/roles\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  roles = roles.filter((role) => role.id !== id);
  return [200];
});

export default axios;
