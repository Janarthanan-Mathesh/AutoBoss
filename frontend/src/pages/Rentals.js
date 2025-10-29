import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import Table from '../components/Table';
import Form from '../components/Form';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    const { data } = await API.get('/rentals');
    setRentals(data);
  };

  const handleSubmit = async (data) => {
    if (editing) {
      await API.put(`/rentals/${editing._id}`, data);
    } else {
      await API.post('/rentals', data);
    }
    fetchRentals();
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await API.delete(`/rentals/${id}`);
    fetchRentals();
  };

  const fields = [
    { name: 'rental_id', label: 'Rental ID', required: true },
    { name: 'driver_id', label: 'Driver ID', required: true },
    { name: 'auto_id', label: 'Auto ID', required: true },
    { name: 'rent_type', label: 'Rent Type', required: true },
    { name: 'rent_amount', label: 'Rent Amount', type: 'number', required: true },
    { name: 'start_date', label: 'Start Date', type: 'date', required: true },
    { name: 'end_date', label: 'End Date', type: 'date' },
    { name: 'status', label: 'Status', required: true },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-6">Rentals</h1>
      <Form fields={fields} onSubmit={handleSubmit} initialData={editing} />
      <Table headers={['Rental ID', 'Driver ID', 'Auto ID', 'Rent Type', 'Rent Amount', 'Start Date', 'Status']} data={rentals} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
};

export default Rentals;