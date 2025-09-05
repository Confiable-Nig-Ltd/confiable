import React from 'react';

const SessionTimeoutControl = ({ sessionTimeout, setSessionTimeout, setSuccess, setError }) => {
  const handleChange = (e) => {
    setSessionTimeout(e.target.value);
    setSuccess(`Session timeout set to ${e.target.value} minutes`);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Session Logout Time</h2>
      <p className="text-gray-600 mb-4">Set the time after which inactive sessions expire</p>
      <select
        value={sessionTimeout}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="60">1 hour</option>
        <option value="120">2 hours</option>
        <option value="never">Never</option>
      </select>
    </div>
  );
};

export default SessionTimeoutControl;