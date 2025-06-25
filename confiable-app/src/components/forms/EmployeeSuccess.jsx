import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmployeeSuccess = () => {
  const [showSuccess, setShowSuccess] = useState(true);

  return (
    <>
      {showSuccess && (
        <div className="fixed inset-0 bg-blur bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 text-center relative">
      <button
        onClick={() => setShowSuccess(false)}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
      >
        &times;
      </button>

      <div className="text-blue-600 text-3xl mb-2">✔️</div>
      <h2 className="text-xl font-semibold mb-2">New employee added successfully</h2>
      <p className="text-sm text-gray-500 mb-5">
        The employee profile has been created. You can now assign roles, benefits, and other onboarding tasks.
      </p>

      <div className="text-left text-sm space-y-2">
        <div>
          <span className="font-medium text-gray-600">Employee Name:</span>{" "}
          <span className="text-gray-800">Titilola Adeshola</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Email:</span>{" "}
          <span className="text-gray-800">titideshola@confiable.ng</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Phone Number:</span>{" "}
          <span className="text-gray-800">09012222222</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Job Role:</span>{" "}
          <span className="text-gray-800">Marketing Manager</span>
        </div>
      <Link
        to="/employees"
        className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
        onClick={() => {
          setShowSuccess(false);
          // optional: navigate to employee list
        }}
      >
        Go to Employee List
      </Link>
        </div>
      </div>
        </div>
      )}
    </>
  );
};

export default EmployeeSuccess;
