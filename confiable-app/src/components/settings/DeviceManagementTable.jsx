import React from 'react';

const DeviceManagementTable = ({ devices, onLogoutDevice, setSuccess, setError }) => {
  const handleLogout = (deviceId) => {
    onLogoutDevice(deviceId);
    setSuccess('Device logged out successfully');
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold italic text-gray-700 mb-4">Manage Logged Devices</h2>
      {devices.length === 0 ? (
        <p className="text-gray-500">No devices currently logged in.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Device</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Last Login</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id} className="border-b">
                  <td className="p-2">{device.device}</td>
                  <td className="p-2">{device.location}</td>
                  <td className="p-2">{device.lastLogin}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleLogout(device.id)}
                      className="text-red-500 hover:underline"
                    >
                      Log Out
                    </button>
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

export default DeviceManagementTable;