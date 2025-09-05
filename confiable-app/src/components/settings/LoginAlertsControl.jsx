import React from 'react';

const LoginAlertsControl = ({ loginAlerts, setLoginAlerts, setSuccess, setError }) => {
  const handleChange = () => {
    setLoginAlerts(!loginAlerts);
    setSuccess(`Login Alerts ${!loginAlerts ? 'enabled' : 'disabled'}`);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Login Alerts</h2>
      <p className="text-gray-600 mb-4">Notify on new/unfamiliar logins</p>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={loginAlerts}
          onChange={handleChange}
          className="h-5 w-5 text-blue-500"
        />
        <span className="text-gray-700">Enable Login Alerts</span>
      </label>
    </div>
  );
};

export default LoginAlertsControl;