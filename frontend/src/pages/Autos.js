import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import Table from '../components/Table';
import Form from '../components/Form';

const Autos = () => {
  const [autos, setAutos] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchAutos();
  }, []);

  const fetchAutos = async () => {
    const { data } = await API.get('/autos');
    setAutos(data);
  };

  const handleSubmit = async (data) => {
    if (editing) {
      await API.put(`/autos/${editing._id}`, data);
    } else {
      await API.post('/autos', data);
    }
    fetchAutos();
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await API.delete(`/autos/${id}`);
    fetchAutos();
  };

  const fields = [
    { name: 'auto_id', label: 'Auto ID', required: true },
    { name: 'model', label: 'Model', required: true },
    { name: 'number', label: 'Number', required: true },
    { name: 'type', label: 'Type', required: true },
    { name: 'purchase_date', label: 'Purchase Date', type: 'date', required: true },
    { name: 'status', label: 'Status', required: true },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-6">Autos</h1>
      <Form fields={fields} onSubmit={handleSubmit} initialData={editing} />
      <Table headers={['Auto ID', 'Model', 'Number', 'Type', 'Status']} data={autos} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
};

export default Autos;