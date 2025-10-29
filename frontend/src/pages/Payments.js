import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import Table from '../components/Table';
import Form from '../components/Form';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const { data } = await API.get('/payments');
    setPayments(data);
  };

  const handleSubmit = async (data) => {
    await API.post('/payments', data);
    fetchPayments();
  };

  const fields = [
    { name: 'payment_id', label: 'Payment ID', required: true },
    { name: 'rental_id', label: 'Rental ID', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'amount_paid', label: 'Amount Paid', type: 'number', required: true },
    { name: 'method', label: 'Method', required: true },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-6">Payments</h1>
      <Form fields={fields} onSubmit={handleSubmit} />
      <Table headers={['Payment ID', 'Rental ID', 'Date', 'Amount Paid', 'Method']} data={payments} />
    </div>
  );
};

export default Payments;