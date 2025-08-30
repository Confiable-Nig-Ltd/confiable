import React, { useState } from "react";

export default function DepartmentModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSave({ name });
    setName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[300px]">
        <h2 className="text-lg font-bold mb-4">Add Department</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department Name"
          className="border p-2 w-full rounded"
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
