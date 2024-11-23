import React, { useEffect, useState } from "react";
import axios from "../services/mockApi";
import Modal from "../components/Modal";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    permissions: [],
  });

  const allPermissions = ["Read", "Write", "Delete", "Update"];

  useEffect(() => {
    axios.get("/api/roles").then((response) => setRoles(response.data));
  }, []);

  const openModal = (role) => {
    setModalData(role || { name: "", permissions: [] });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveRole = () => {
    if (modalData.id) {
      // Update existing role
      axios.put(`/api/roles/${modalData.id}`, modalData).then(() => {
        setRoles(roles.map((r) => (r.id === modalData.id ? modalData : r)));
        closeModal();
      });
    } else {
      // Add new role
      axios.post("/api/roles", modalData).then((response) => {
        setRoles([...roles, response.data]);
        closeModal();
      });
    }
  };

  const togglePermission = (permission) => {
    setModalData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/roles/${id}`)
      .then(() => setRoles(roles.filter((r) => r.id !== id)));
  };

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Role Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => openModal(null)}
        >
          Add Role
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-sm uppercase tracking-wider">
              <th className="p-4 font-bold">Role Name</th>
              <th className="p-4 font-bold">Permissions</th>
              <th className="p-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50">
                <td className="p-4 border-b">{role.name}</td>
                <td className="p-4 border-b">{role.permissions.join(", ")}</td>
                <td className="p-4 border-b">
                  <button
                    className="text-blue-600 hover:underline mr-3"
                    onClick={() => openModal(role)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(role.id)}
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
        title={modalData.id ? "Edit Role" : "Add Role"}
        onClose={closeModal}
        onSave={saveRole}
      >
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Role Name"
            value={modalData.name}
            onChange={(e) =>
              setModalData({ ...modalData, name: e.target.value })
            }
            className="p-2 border rounded"
          />
          <div>
            <p className="font-bold mb-2">Permissions:</p>
            {allPermissions.map((permission) => (
              <label key={permission} className="block">
                <input
                  type="checkbox"
                  checked={modalData.permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                  className="mr-2"
                />
                {permission}
              </label>
            ))}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
