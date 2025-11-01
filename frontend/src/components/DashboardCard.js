import React from 'react';

const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="text-gray-600 text-base font-medium mb-1">{title}</h3>
      <p className="text-3xl font-semibold text-blue-600">{value}</p>
    </div>
  );
};

export default DashboardCard;
