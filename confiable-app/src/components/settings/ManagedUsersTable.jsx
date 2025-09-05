import React from 'react';

const ManagedUsersTable = ({ users, onRemovePhoto, setSuccess, setError }) => {
  const handleRemoveUserPhoto = (userId) => {
    onRemovePhoto(userId);
    setSuccess('User photo removed successfully');
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Managed Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users managed yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Photo</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Created At</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">
                    {user.photo ? (
                      <img src={user.photo} alt="User" className="w-12 h-12 object-cover rounded-md" />
                    ) : (
                      'No Photo'
                    )}
                  </td>
                  <td className="p-2">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="p-2">{`${user.prefixTitle || ''} ${user.suffixTitle || ''}`.trim()}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">{user.phoneNumber}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.createdAt}</td>
                  <td className="p-2">
                    {user.photo && (
                      <button
                        onClick={() => handleRemoveUserPhoto(user.id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove Photo
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagedUsersTable;