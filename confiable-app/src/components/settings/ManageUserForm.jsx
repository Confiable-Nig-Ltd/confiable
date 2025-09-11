// import React from 'react';

// const ManageUserForm = ({ onSubmit, setError, setSuccess }) => {
//   const [formData, setFormData] = React.useState({
//     firstName: '',
//     lastName: '',
//     prefixTitle: '',
//     suffixTitle: '',
//     role: '',
//     phoneNumber: '',
//     email: '',
//     password: '',
//     photo: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: URL.createObjectURL(file) });
//     }
//   };

//   const handleRemovePhoto = () => {
//     setFormData({ ...formData, photo: null });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { firstName, lastName, email, password, phoneNumber, role } = formData;

//     if (!firstName || !lastName || !email || !password || !phoneNumber || !role) {
//       setError('First Name, Last Name, Email, Password, Phone Number, and Role are required');
//       setSuccess('');
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError('Invalid email format for user management');
//       setSuccess('');
//       return;
//     }

//     if (!/^\d{11}$/.test(phoneNumber)) {
//       setError('Phone number must be 11 digits');
//       setSuccess('');
//       return;
//     }

//     onSubmit({
//       id: Date.now(),
//       firstName,
//       lastName,
//       prefixTitle: formData.prefixTitle,
//       suffixTitle: formData.suffixTitle,
//       role,
//       phoneNumber,
//       email,
//       photo: formData.photo,
//       createdAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
//     });

//     setFormData({
//       firstName: '',
//       lastName: '',
//       prefixTitle: '',
//       suffixTitle: '',
//       role: '',
//       phoneNumber: '',
//       email: '',
//       password: '',
//       photo: null,
//     });
//     setSuccess('User added successfully');
//     setError('');
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Users</h2>
//       <div className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-600 mb-1" htmlFor="manageFirstName">First Name</label>
//             <input
//               type="text"
//               id="manageFirstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter first name"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 mb-1" htmlFor="manageLastName">Last Name</label>
//             <input
//               type="text"
//               id="manageLastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter last name"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-600 mb-1" htmlFor="prefixTitle">Prefix Title</label>
//             <input
//               type="text"
//               id="prefixTitle"
//               name="prefixTitle"
//               value={formData.prefixTitle}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="e.g., Mr, Ms, Miss"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 mb-1" htmlFor="suffixTitle">Suffix Title</label>
//             <input
//               type="text"
//               id="suffixTitle"
//               name="suffixTitle"
//               value={formData.suffixTitle}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="e.g., Jr, Sr, M.M"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-1" htmlFor="manageRole">Role</label>
//           <input
//             type="text"
//             id="manageRole"
//             name="role"
//             value={formData.role}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter role"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-1" htmlFor="phoneNumber">Phone Number</label>
//           <input
//             type="text"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter phone number (11 digits)"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-1" htmlFor="manageEmail">Email</label>
//           <input
//             type="email"
//             id="manageEmail"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter email"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-1" htmlFor="managePassword">Password</label>
//           <input
//             type="password"
//             id="managePassword"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter password"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 mb-1" htmlFor="photo">Profile Photo</label>
//           <input
//             type="file"
//             id="photo"
//             accept="image/*"
//             onChange={handlePhotoUpload}
//             className="w-full p-2 border rounded-md"
//           />
//           {formData.photo && (
//             <div className="mt-2">
//               <img src={formData.photo} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
//               <button
//                 onClick={handleRemovePhoto}
//                 className="mt-2 text-red-500 hover:underline"
//               >
//                 Remove Photo
//               </button>
//             </div>
//           )}
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
//         >
//           Add User
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ManageUserForm;

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const ManageUserForm = ({ onSubmit, setError, setSuccess }) => {
  const [formData, setFormData] = useState({
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
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: URL.createObjectURL(file) });
    }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, photo: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, phoneNumber, role } = formData;

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

    onSubmit({
      id: Date.now(),
      firstName,
      lastName,
      prefixTitle: formData.prefixTitle,
      suffixTitle: formData.suffixTitle,
      role,
      phoneNumber,
      email,
      photo: formData.photo,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
    });

    setFormData({
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
    setShowConfetti(true); // Trigger confetti on successful submission
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 relative">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <h2 className="text-xl font-semibold italic text-gray-700 mb-4">Manage Users</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-light text-gray-600 mb-1" htmlFor="manageFirstName">First Name</label>
            <input
              type="text"
              id="manageFirstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="block font-light text-gray-600 mb-1" htmlFor="manageLastName">Last Name</label>
            <input
              type="text"
              id="manageLastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-light text-gray-600 mb-1" htmlFor="prefixTitle">Prefix Title</label>
            <input
              type="text"
              id="prefixTitle"
              name="prefixTitle"
              value={formData.prefixTitle}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Mr, Ms, Miss"
            />
          </div>
          <div>
            <label className="block font-light text-gray-600 mb-1" htmlFor="suffixTitle">Suffix Title</label>
            <input
              type="text"
              id="suffixTitle"
              name="suffixTitle"
              value={formData.suffixTitle}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Jr, Sr, M.M"
            />
          </div>
        </div>
        <div>
          <label className="block font-light text-gray-600 mb-1" htmlFor="manageRole">Role</label>
          <input
            type="text"
            id="manageRole"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter role"
          />
        </div>
        <div>
          <label className="block font-light text-gray-600 mb-1" htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number (11 digits)"
          />
        </div>
        <div>
          <label className="block font-light text-gray-600 mb-1" htmlFor="manageEmail">Email</label>
          <input
            type="email"
            id="manageEmail"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block font-light text-gray-600 mb-1" htmlFor="managePassword">Password</label>
          <input
            type="password"
            id="managePassword"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>
        <div>
          <label className="block font-light text-gray-600 mb-1" htmlFor="photo">Profile Photo</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full p-2 border rounded-md"
          />
          {formData.photo && (
            <div className="mt-2">
              <img src={formData.photo} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
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
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default ManageUserForm;