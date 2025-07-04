import React from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiCheckCircle, FiUserPlus } from "react-icons/fi";




const Card = ({ title, count, growth, growthColor, action, icon: Icon, iconColor }) => (
  <div className="bg-white rounded-2xl shadow-md p-3 w-full flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
        <div className="text-3xl font-bold text-gray-800">{count}</div>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10`} style={{ backgroundColor: `${iconColor}20` }}>
        {Icon && <Icon className="text-xl" color={iconColor} />}
      </div>
    </div>
    <p className={`text-sm font-medium mb-2 ${growthColor}`}>{growth}</p>
    <button className="text-blue-600 text-sm font-semibold hover:underline">
      {action}
    </button>
  </div>
);

export default function EmployeeOverview() {
  return (
    <>
      <section>
        <div className="p-4 bg-white border rounded-lg mb-6">
          <p className="text-gray-500 text-sm">Search anything here...</p>
        </div>

        <div className="p-4 bg-white border rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link href="/employee-overview">
              <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Employee Overview
              </button>
            </Link>
            <Link href="/employees">
              <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Employee List
              </button>
            </Link>
            <Link href="/department">
              <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Department
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="">
          <h2 className="text-lg font-semibold mb-2">Employee Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 p-4">
      <Card
        title="Total Employees"
        count="639"
        growth="↑ 35% from last month"
        growthColor="text-green-500"
        action="View Employees"
        icon={FiUsers}
        iconColor="#16a34a" // green.600
      />
      <Card
        title="Number Of Departments"
        count="580"
        growth="↑ 12% this month"
        growthColor="text-green-500"
        action="View Departments"
        icon={FiCheckCircle}
        iconColor="#0ea5e9" // blue.500
      />
      <Card
        title="New Employees"
        count="25"
        growth="↓ 8% from last month"
        growthColor="text-red-500"
        action="Review Applicants"
        icon={FiUserPlus}
        iconColor="#dc2626" // red.600
      />
    </div>
      </section>
      <section>
        
      </section>
    </>
  )
}
