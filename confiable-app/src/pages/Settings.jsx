import React, { useState } from 'react';
import AssignUserForm from "../components/settings/AssignUserForm";
import AssignedUsersTable from "../components/settings/AssignedUsersTable";
import ManageUserForm from "../components/settings/ManageUserForm";
import ManagedUsersTable from "../components/settings/ManagedUsersTable";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import TwoFAControl from "../components/settings/TwoFAControl";
import LoginAlertsControl from "../components/settings/LoginAlertsControl";
import SessionTimeoutControl from "../components/settings/SessionTimeOutControl";
import DeviceManagementTable from "../components/settings/DeviceManagementTable";

const CombinedSettings = () => {
  const [assignUsers, setAssignUsers] = useState([]);
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
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
    },
  ]);
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

  const handleAssignUser = (newUser) => {
    setAssignUsers([...assignUsers, newUser]);
  };

  const handleManageUser = (newUser) => {
    setManageUsers([...manageUsers, newUser]);
  };

  const handleRemoveUserPhoto = (userId) => {
    setManageUsers(
      manageUsers.map((user) =>
        user.id === userId ? { ...user, photo: null } : user
      )
    );
  };

  const handleLogoutDevice = (deviceId) => {
    setDevices(devices.filter((device) => device.id !== deviceId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <AssignUserForm onSubmit={handleAssignUser} setError={setError} setSuccess={setSuccess} />
        <AssignedUsersTable users={assignUsers} />
        <ManageUserForm onSubmit={handleManageUser} setError={setError} setSuccess={setSuccess} />
        <ManagedUsersTable
          users={manageUsers}
          onRemovePhoto={handleRemoveUserPhoto}
          setError={setError}
          setSuccess={setSuccess}
        />
        <ChangePasswordForm setError={setError} setSuccess={setSuccess} />
        <TwoFAControl twoFA={twoFA} setTwoFA={setTwoFA} setError={setError} setSuccess={setSuccess} />
        <LoginAlertsControl
          loginAlerts={loginAlerts}
          setLoginAlerts={setLoginAlerts}
          setError={setError}
          setSuccess={setSuccess}
        />
        <SessionTimeoutControl
          sessionTimeout={sessionTimeout}
          setSessionTimeout={setSessionTimeout}
          setError={setError}
          setSuccess={setSuccess}
        />
        <DeviceManagementTable
          devices={devices}
          onLogoutDevice={handleLogoutDevice}
          setError={setError}
          setSuccess={setSuccess}
        />
      </div>
    </div>
  );
};

export default CombinedSettings;