import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import Table from '../components/Table';
import Form from '../components/Form';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const { data } = await API.get('/drivers');
    setDrivers(data);
  };

  const handleSubmit = async (data) => {
    if (editing) {
      await API.put(`/drivers/${editing._id}`, data);
    } else {
      await API.post('/drivers', data);
    }
    fetchDrivers();
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await API.delete(`/drivers/${id}`);
    fetchDrivers();
  };

  const fields = [
    { name: 'driver_id', label: 'Driver ID', required: true },
    { name: 'name', label: 'Name', required: true },
    { name: 'phone', label: 'Phone', required: true },
    { name: 'license_no', label: 'License No', required: true },
    { name: 'address', label: 'Address', required: true },
    { name: 'assigned_auto', label: 'Assigned Auto' },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-6">Drivers</h1>
      <Form fields={fields} onSubmit={handleSubmit} initialData={editing} />
      <Table headers={['Driver ID', 'Name', 'Phone', 'License No', 'Address', 'Assigned Auto']} data={drivers} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
};

export default Drivers;