import React, { useState } from 'react';

const ConsigneeManager = ({ consignees, setConsignees }) => {
  const [newConsignee, setNewConsignee] = useState("");

  const handleAddConsignee = () => {
    if (!newConsignee.trim()) return;
    if (!consignees.includes(newConsignee.trim())) {
      setConsignees((s) => [...s, newConsignee.trim()]);
    }
    setNewConsignee("");
  };

  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        type="text"
        placeholder="Add new consignee"
        value={newConsignee}
        onChange={(e) => setNewConsignee(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddConsignee()}
        className="border p-2 rounded-md flex-1"
      />
      <button
        onClick={handleAddConsignee}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Add Consignee
      </button>
    </div>
  );
};

export default ConsigneeManager;