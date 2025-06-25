// import React from "react";

// export default function Home() {
//   return (
//     <div className="w-full min-h-[85vh] flex justify-center items-center font-semibold">
//       Nothing to display just now, click 'Get Started' to continue
//     </div>
//   );
// }

import React from "react";

export default function Home() {
  return (
    <div className="w-full min-h-[100vh] flex flex-col md:flex-row bg-indigo-900">
      {/* Left: Image with text below */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8 py-10 space-y-6">
        {/* Image on top */}
        <div
          className="w-full h-190 bg-center bg-cover bg-no-repeat rounded-lg"
          style={{
            backgroundImage: "url('/confiable1.png')",
          }}
          aria-hidden="true"
          role="img"
        ></div>
        {/* Text below the image */}
        <h1 className="text-white text-center max-w-md md:text-2xl">
          Track your spending and stay in control
        </h1>
        <p className="text-white text-center max-w-md md:text-lg">
          Consolidating Human Resource Management- For Accounting and Inventory including Cash flow tracking.
        </p>
      </div>

      {/* Right: Login details */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-10">
        {/* Login form */}
        <div className="w-full max-w-sm bg-white bg-opacity-10 p-9 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-4 text-Black flex flex-col items-center">Sign In To Confiable</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="p-2 rounded bg-gray-200"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded bg-gray-200"
            />
            <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
