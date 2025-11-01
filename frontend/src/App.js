import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Autos from './pages/Autos';
import Drivers from './pages/Drivers';
import Rentals from './pages/Rentals';
import Payments from './pages/Payments';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';
import Sidebar from './components/Sidebar';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="*"
              element={
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 p-6">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/autos" element={<Autos />} />
                      <Route path="/drivers" element={<Drivers />} />
                      <Route path="/rentals" element={<Rentals />} />
                      <Route path="/payments" element={<Payments />} />
                      <Route path="/maintenance" element={<Maintenance />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </div>
                </div>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
