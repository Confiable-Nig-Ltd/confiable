// import React from 'react';

// const AssignUserForm = ({ onSubmit, setError, setSuccess }) => {
//   const [formData, setFormData] = React.useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     role: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { firstName, lastName, email, password, role } = formData;

//     if (!firstName || !lastName || !email || !password || !role) {
//       setError('All fields are required for user assignment');
//       setSuccess('');
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError('Invalid email format for user assignment');
//       setSuccess('');
//       return;
//     }

//     if (password.length < 8) {
//       setError('Password must be at least 8 characters long for user assignment');
//       setSuccess('');
//       return;
//     }

//     onSubmit({
//       id: Date.now(), // Temporary ID generation
//       firstName,
//       lastName,
//       email,
//       role,
//       createdAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
//     });

//     setFormData({ firstName: '', lastName: '', email: '', password: '', role: '' });
//     setSuccess('User assigned successfully');
//     setError('');
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Assign New User</h2>
//       <div className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-600 mb-1" htmlFor="assignFirstName">First Name</label>
//             <input
//               type="text"
//               id="assignFirstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter first name"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 mb-1" htmlFor="assignLastName">Last Name</label>
//             <input
//               type="text"
//               id="assignLastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter last name"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-1" htmlFor="assignEmail">Email</label>
//           <input
//             type="email"
//             id="assignEmail"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter email"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-1" htmlFor="assignPassword">Password</label>
//           <input
//             type="password"
//             id="assignPassword"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter password"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-1" htmlFor="assignRole">Role</label>
//           <input
//             type="text"
//             id="assignRole"
//             name="role"
//             value={formData.role}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter role (e.g., Admin, Editor)"
//           />
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
//         >
//           Assign User
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AssignUserForm;

import React, { useState } from 'react';
import Confetti from 'react-confetti';

const AssignUserForm = ({ onSubmit, setError, setSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, role } = formData;

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

    onSubmit({
      id: Date.now(), // Temporary ID generation
      firstName,
      lastName,
      email,
      role,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
    });

    setFormData({ firstName: '', lastName: '', email: '', password: '', role: '' });
    setSuccess('User assigned successfully');
    setError('');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 7000); // Confetti for 5 seconds
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md mb-8">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          colors={['#ff0', '#f00', '#0f0', '#00f', '#ff69b4']}
        />
      )}
      <h2 className="text-xl font-bold italic text-gray-700 mb-4">Assign New User</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-light text-gray-700 mb-1" htmlFor="assignFirstName">
              First Name
            </label>
            <input
              type="text"
              id="assignFirstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="block font-light text-gray-600 mb-1" htmlFor="assignLastName">
              Last Name
            </label>
            <input
              type="text"
              id="assignLastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
            />
          </div>
        </div>
        <div>
          <label className="block font-light text-gray-600 mb-1" htmlFor="assignEmail">
            Email
          </label>
          <input
            type="email"
            id="assignEmail"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block font-light text-gray-600 mb-1" htmlFor="assignPassword">
            Password
          </label>
          <input
            type="password"
            id="assignPassword"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>
        <div>
          <label className="block font-light text-gray-600 mb-1" htmlFor="assignRole">
            Role
          </label>
          <input
            type="text"
            id="assignRole"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter role (e.g., Admin, Editor)"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Assign User
        </button>
      </div>
    </div>
  );
};

export default AssignUserForm;
