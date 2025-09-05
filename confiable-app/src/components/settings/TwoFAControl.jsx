import React from 'react';

const TwoFAControl = ({ twoFA, setTwoFA, setSuccess, setError }) => {
  const handleChange = () => {
    setTwoFA(!twoFA);
    setSuccess(`Two-Factor Authentication ${!twoFA ? 'enabled' : 'disabled'}`);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Two-Factor Authentication (2FA)</h2>
      <p className="text-gray-600 mb-4">Extra security via OTP/email</p>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={twoFA}
          onChange={handleChange}
          className="h-5 w-5 text-blue-500"
        />
        <span className="text-gray-700">Enable Two-Factor Authentication</span>
      </label>
    </div>
  );
};

export default TwoFAControl;