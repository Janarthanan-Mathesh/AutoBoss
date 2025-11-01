import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/autos', label: 'Autos' },
    { path: '/drivers', label: 'Drivers' },
    { path: '/rentals', label: 'Rentals' },
    { path: '/payments', label: 'Payments' },
    { path: '/maintenance', label: 'Maintenance' },
    { path: '/reports', label: 'Reports' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {/* Logo / Title */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold">AutoBoss</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block py-2 px-3 rounded-md transition ${
              location.pathname === link.path
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-md font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
