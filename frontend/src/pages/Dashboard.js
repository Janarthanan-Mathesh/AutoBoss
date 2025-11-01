import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import DashboardCard from '../components/DashboardCard';
import Chart from '../components/Chart';

const Dashboard = () => {
  const [stats, setStats] = useState({ income: 0, expenses: 0, profit: 0 });
  const [chartData, setChartData] = useState([]);

  // ✅ Fetch Monthly Income/Expense from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/reports?month=10&year=2025');
        setStats(data);
        setChartData([
          { month: 'Oct', income: data.income, expenses: data.expenses, profit: data.profit }
        ]);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  // ✅ Download CSV Report
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.get('/reports/export', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'report.csv';
      link.click();
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Monthly Income" value={`₹${stats.income}`} />
        <DashboardCard title="Monthly Expenses" value={`₹${stats.expenses}`} />
        <DashboardCard title="Net Profit" value={`₹${stats.profit}`} />
        <DashboardCard title="Month" value="October 2025" />
      </div>

      {/* Chart */}
      <Chart data={chartData} />

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        📄 Download CSV Report
      </button>
    </div>
  );
};

export default Dashboard;
