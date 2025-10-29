import React, { useState } from 'react';
import API from '../utils/api';
import Chart from '../components/Chart';

const Reports = () => {
  const [reports, setReports] = useState({});
  const [chartData, setChartData] = useState([]);

  const fetchReports = async () => {
    const { data } = await API.get('/reports?month=10&year=2023'); // Adjust as needed
    setReports(data);
    setChartData([{ month: 'Oct', income: data.income, expenses: data.expenses }]);
  };

  const exportReports = async () => {
    const response = await API.get('/reports/export', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reports.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h1 className="text-2xl mb-6">Reports</h1>
      <button onClick={fetchReports} className="bg-blue-500 text-white px-4 py-2 mb-4">Generate Report</button>
      <button onClick={exportReports} className="bg-green-500 text-white px-4 py-2 mb-4 ml-2">Export to CSV</button>
      <div className="mb-6">
        <p>Income: ${reports.income || 0}</p>
        <p>Expenses: ${reports.expenses || 0}</p>
        <p>Profit: ${reports.profit || 0}</p>
      </div>
      <Chart data={chartData} />
    </div>
  );
};

export default Reports;