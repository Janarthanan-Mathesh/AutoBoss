import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import Table from '../components/Table';
import Form from '../components/Form';

const Maintenance = () => {
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    fetchMaintenance();
  }, []);

  const fetchMaintenance = async () => {
    const { data } = await API.get('/maintenance');
    setMaintenance(data);
  };

  const handleSubmit = async (data) => {
    await API.post('/maintenance', data);
    fetchMaintenance();
  };

  const fields = [
    { name: 'auto_id', label: 'Auto ID', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'description', label: 'Description', required: true },
    { name: 'cost', label: 'Cost', type: 'number', required: true },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-6">Maintenance</h1>
      <Form fields={fields} onSubmit={handleSubmit} />
      <Table headers={['Auto ID', 'Date', 'Description', 'Cost']} data={maintenance} />
    </div>
  );
};

export default Maintenance;