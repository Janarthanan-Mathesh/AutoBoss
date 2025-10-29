import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import DashboardCard from '../components/DashboardCard';
import Chart from '../components/Chart';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get('/reports?month=10&year=2023'); // Example
      setStats(data);
      setChartData([{ month: 'Oct', income: data.income, expenses: data.expenses }]);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Total Autos" value="10" />
        <DashboardCard title="Total Drivers" value="5" />
        <DashboardCard title="Active Rentals" value="3" />
        <DashboardCard title="Monthly Income" value={`$${stats.income || 0}`} />
      </div>
      <Chart data={chartData} />
    </div>
  );
};

export default Dashboard;