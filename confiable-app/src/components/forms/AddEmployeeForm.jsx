export default function AddEmployeeForm() {

  return (
    <div>

      <h2 className="text-2xl font-semibold text-black mb-2">Add New Employee</h2>
      <p className="text-gray-500 mb-6">Enter employee information to create a new record</p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Role</label>
          <input
            type="text"
            placeholder="Enter Role"
            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Salary</label>
          <input
            type="number"
            placeholder="Enter Salary"
            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Payment Date</label>
          <input
            type="date"
            className="w-full px-4 py-3 border border-blue-200 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl mt-2"
        >
          Save
        </button>
      </form>
    </div>
  );
}
