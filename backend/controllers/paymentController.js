const Payment = require('../models/Payment');
const Rental = require('../models/Rental');

exports.getPayments = async (req, res) => {
  const payments = await Payment.find().populate('rental_id');
  res.json(payments);
};

exports.createPayment = async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  // Calculate pending/overdue logic here if needed
  res.status(201).json(payment);
};