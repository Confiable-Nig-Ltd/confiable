import React, { useState } from "react";

export default function UserManagement() {
  const [user, setUser] = useState({
    firstName: "Ashley",
    lastName: "Ifetola",
    prefixTitle: "Miss",
    suffixTitle: "M.M",
    role: "Marketing Manager",
    phoneNumber: "090111111111",
    email: "ashleyifetola@confiable.ng",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemovePhoto = () => {
    alert("Photo removed! (Hook up backend logic here)");
  };

  const [searchQuery, setSearchQuery] = useState("");

  return (
     <>
     
<div className="p-4 bg-white border rounded-lg mb-6 mt-2">
          <input
            type="text"
            placeholder="search anything here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm outline-none"
            aria-label="Search"
            
          />
        </div>
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-gray-500 mb-4">Personalize your account and manage preferences securely</p>
    </div>
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-3 ml-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>

      {/* Photo */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          No Photo
        </div>
        <button
          onClick={handleRemovePhoto}
          className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          Remove photo
        </button>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Prefix Title
          </label>
          <input
            type="text"
            name="prefixTitle"
            value={user.prefixTitle}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Suffix Title
          </label>
          <input
            type="text"
            name="suffixTitle"
            value={user.suffixTitle}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
    </>
  );
}
