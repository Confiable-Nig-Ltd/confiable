import React, { useState } from 'react';

const CombinedSettings = () => {
  // State for User Assignment Settings
  const [assignUsers, setAssignUsers] = useState([]);
  const [assignFormData, setAssignFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  // State for User Management
  const [manageUsers, setManageUsers] = useState([
    {
      id: 1,
      firstName: 'Ashley',
      lastName: 'Ifetola',
      prefixTitle: 'Miss',
      suffixTitle: 'M.M',
      role: 'Marketing Manager',
      phoneNumber: '090111111111',
      email: 'ashleyifetola@confiable.ng',
      photo: null,
    },
  ]);
  const [manageFormData, setManageFormData] = useState({
    firstName: '',
    lastName: '',
    prefixTitle: '',
    suffixTitle: '',
    role: '',
    phoneNumber: '',
    email: '',
    password: '',
    photo: null,
  });

  // State for Security Settings
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [twoFA, setTwoFA] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [devices, setDevices] = useState([
    {
      id: 1,
      device: 'MacBook Pro',
      location: 'Lagos, Nigeria',
      lastLogin: '2025-09-05 09:15 AM',
    },
    {
      id: 2,
      device: 'iPhone 14',
      location: 'Abuja, Nigeria',
      lastLogin: '2025-09-04 03:22 PM',
    },
  ]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handlers for User Assignment Settings
  const handleAssignInputChange = (e) => {
    const { name, value } = e.target;
    setAssignFormData({ ...assignFormData, [name]: value });
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, role } = assignFormData;

    if (!firstName || !lastName || !email || !password || !role) {
      setError('All fields are required for user assignment');
      setSuccess('');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format for user assignment');
      setSuccess('');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long for user assignment');
      setSuccess('');
      return;
    }

    const newUser = {
      id: assignUsers.length + 1,
      firstName,
      lastName,
      email,
      role,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
    };

    setAssignUsers([...assignUsers, newUser]);
    setAssignFormData({ firstName: '', lastName: '', email: '', password: '', role: '' });
    setSuccess('User assigned successfully');
    setError('');
  };

  // Handlers for User Management
  const handleManageInputChange = (e) => {
    const { name, value } = e.target;
    setManageFormData({ ...manageFormData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setManageFormData({ ...manageFormData, photo: URL.createObjectURL(file) });
    }
  };

  const handleRemovePhoto = () => {
    setManageFormData({ ...manageFormData, photo: null });
  };

  const handleManageSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, phoneNumber, role } = manageFormData;

    if (!firstName || !lastName || !email || !password || !phoneNumber || !role) {
      setError('First Name, Last Name, Email, Password, Phone Number, and Role are required');
      setSuccess('');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format for user management');
      setSuccess('');
      return;
    }

    if (!/^\d{11}$/.test(phoneNumber)) {
      setError('Phone number must be 11 digits');
      setSuccess('');
      return;
    }

    const newUser = {
      id: manageUsers.length + 1,
      firstName,
      lastName,
      prefixTitle: manageFormData.prefixTitle,
      suffixTitle: manageFormData.suffixTitle,
      role,
      phoneNumber,
      email,
      photo: manageFormData.photo,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
    };

    setManageUsers([...manageUsers, newUser]);
    setManageFormData({
      firstName: '',
      lastName: '',
      prefixTitle: '',
      suffixTitle: '',
      role: '',
      phoneNumber: '',
      email: '',
      password: '',
      photo: null,
    });
    setSuccess('User added successfully');
    setError('');
  };

  const handleRemoveUserPhoto = (userId) => {
    setManageUsers(
      manageUsers.map((user) =>
        user.id === userId ? { ...user, photo: null } : user
      )
    );
    setSuccess('User photo removed successfully');
    setError('');
  };

  // Handlers for Security Settings
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All password fields are required');
      setSuccess('');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      setSuccess('');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      setSuccess('');
      return;
    }

    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSuccess('Password changed successfully');
    setError('');
  };

  const handleTwoFAChange = () => {
    setTwoFA(!twoFA);
    setSuccess(`Two-Factor Authentication ${!twoFA ? 'enabled' : 'disabled'}`);
    setError('');
  };

  const handleLoginAlertsChange = () => {
    setLoginAlerts(!loginAlerts);
    setSuccess(`Login Alerts ${!loginAlerts ? 'enabled' : 'disabled'}`);
    setError('');
  };

  const handleSessionTimeoutChange = (e) => {
    setSessionTimeout(e.target.value);
    setSuccess(`Session timeout set to ${e.target.value} minutes`);
    setError('');
  };

  const handleLogoutDevice = (deviceId) => {
    setDevices(devices.filter((device) => device.id !== deviceId));
    setSuccess('Device logged out successfully');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* User Assignment Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Assign New User</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="assignFirstName">First Name</label>
                <input
                  type="text"
                  id="assignFirstName"
                  name="firstName"
                  value={assignFormData.firstName}
                  onChange={handleAssignInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="assignLastName">Last Name</label>
                <input
                  type="text"
                  id="assignLastName"
                  name="lastName"
                  value={assignFormData.lastName}
                  onChange={handleAssignInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="assignEmail">Email</label>
              <input
                type="email"
                id="assignEmail"
                name="email"
                value={assignFormData.email}
                onChange={handleAssignInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="assignPassword">Password</label>
              <input
                type="password"
                id="assignPassword"
                name="password"
                value={assignFormData.password}
                onChange={handleAssignInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="assignRole">Role</label>
              <input
                type="text"
                id="assignRole"
                name="role"
                value={assignFormData.role}
                onChange={handleAssignInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter role (e.g., Admin, Editor)"
              />
            </div>
            <button
              onClick={handleAssignSubmit}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Assign User
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Assigned Users</h2>
          {assignUsers.length === 0 ? (
            <p className="text-gray-500">No users assigned yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Role</th>
                    <th className="p-2 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {assignUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2">{user.id}</td>
                      <td className="p-2">{`${user.firstName} ${user.lastName}`}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">{user.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User Management */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Users</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="manageFirstName">First Name</label>
                <input
                  type="text"
                  id="manageFirstName"
                  name="firstName"
                  value={manageFormData.firstName}
                  onChange={handleManageInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="manageLastName">Last Name</label>
                <input
                  type="text"
                  id="manageLastName"
                  name="lastName"
                  value={manageFormData.lastName}
                  onChange={handleManageInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="prefixTitle">Prefix Title</label>
                <input
                  type="text"
                  id="prefixTitle"
                  name="prefixTitle"
                  value={manageFormData.prefixTitle}
                  onChange={handleManageInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Mr, Ms, Miss"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="suffixTitle">Suffix Title</label>
                <input
                  type="text"
                  id="suffixTitle"
                  name="suffixTitle"
                  value={manageFormData.suffixTitle}
                  onChange={handleManageInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Jr, Sr, M.M"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="manageRole">Role</label>
              <input
                type="text"
                id="manageRole"
                name="role"
                value={manageFormData.role}
                onChange={handleManageInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter role"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={manageFormData.phoneNumber}
                onChange={handleManageInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number (11 digits)"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="manageEmail">Email</label>
              <input
                type="email"
                id="manageEmail"
                name="email"
                value={manageFormData.email}
                onChange={handleManageInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="managePassword">Password</label>
              <input
                type="password"
                id="managePassword"
                name="password"
                value={manageFormData.password}
                onChange={handleManageInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="photo">Profile Photo</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full p-2 border rounded-md"
              />
              {manageFormData.photo && (
                <div className="mt-2">
                  <img src={manageFormData.photo} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                  <button
                    onClick={handleRemovePhoto}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Remove Photo
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleManageSubmit}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Add User
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Managed Users</h2>
          {manageUsers.length === 0 ? (
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
                  {manageUsers.map((user) => (
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

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
            </div>
            <button
              onClick={handlePasswordSubmit}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Two-Factor Authentication (2FA)</h2>
          <p className="text-gray-600 mb-4">Extra security via OTP/email</p>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={twoFA}
              onChange={handleTwoFAChange}
              className="h-5 w-5 text-blue-500"
            />
            <span className="text-gray-700">Enable Two-Factor Authentication</span>
          </label>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Login Alerts</h2>
          <p className="text-gray-600 mb-4">Notify on new/unfamiliar logins</p>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={loginAlerts}
              onChange={handleLoginAlertsChange}
              className="h-5 w-5 text-blue-500"
            />
            <span className="text-gray-700">Enable Login Alerts</span>
          </label>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Session Logout Time</h2>
          <p className="text-gray-600 mb-4">Set the time after which inactive sessions expire</p>
          <select
            value={sessionTimeout}
            onChange={handleSessionTimeoutChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="never">Never</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Logged Devices</h2>
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
                          onClick={() => handleLogoutDevice(device.id)}
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
      </div>
    </div>
  );
};

export default CombinedSettings;