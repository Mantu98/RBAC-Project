import React, { useEffect, useState } from "react";
import axios from "../services/mockApi";
import Modal from "../components/Modal";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    axios.get("/api/users").then((response) => setUsers(response.data));
  }, []);

  const openModal = (user) => {
    setModalData(user || { name: "", email: "", role: "", status: "Active" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveUser = () => {
    if (modalData.id) {
      axios.put(`/api/users/${modalData.id}`, modalData).then(() => {
        setUsers(users.map((u) => (u.id === modalData.id ? modalData : u)));
        closeModal();
      });
    } else {
      axios.post("/api/users", modalData).then((response) => {
        setUsers([...users, response.data]);
        closeModal();
      });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then(() => setUsers(users.filter((u) => u.id !== id)));
  };

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => openModal(null)}
        >
          Add User
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-sm uppercase tracking-wider">
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Role</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4 border-b">{user.name}</td>
                <td className="p-4 border-b">{user.email}</td>
                <td className="p-4 border-b">{user.role}</td>
                <td className="p-4 border-b">{user.status}</td>
                <td className="p-4 border-b">
                  <button
                    className="text-blue-600 hover:underline mr-3"
                    onClick={() => openModal(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={modalData.id ? "Edit User" : "Add User"}
        onClose={closeModal}
        onSave={saveUser}
      >
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={modalData.name}
            onChange={(e) =>
              setModalData({ ...modalData, name: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={modalData.email}
            onChange={(e) =>
              setModalData({ ...modalData, email: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Role"
            value={modalData.role}
            onChange={(e) =>
              setModalData({ ...modalData, role: e.target.value })
            }
            className="p-2 border rounded"
          />
          <select
            value={modalData.status}
            onChange={(e) =>
              setModalData({ ...modalData, status: e.target.value })
            }
            className="p-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
