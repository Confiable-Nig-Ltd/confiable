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
      {/* Left: Text content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-8 py-10 text-left">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Nothing to display just now.
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to get started.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>

      {/* Right: Background Image */}
      <div
        className="w-full md:w-1/2 h-70 md:h-auto bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/confiable1.png')",
        }}
      ></div>
    </div>
  );
}
