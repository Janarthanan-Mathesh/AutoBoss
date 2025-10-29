import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">AutoBoss</h2>
      <ul>
        <li><Link to="/dashboard" className="block py-2">Dashboard</Link></li>
        <li><Link to="/autos" className="block py-2">Autos</Link></li>
        <li><Link to="/drivers" className="block py-2">Drivers</Link></li>
        <li><Link to="/rentals" className="block py-2">Rentals</Link></li>
        <li><Link to="/payments" className="block py-2">Payments</Link></li>
        <li><Link to="/maintenance" className="block py-2">Maintenance</Link></li>
        <li><Link to="/reports" className="block py-2">Reports</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;