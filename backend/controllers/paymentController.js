const Payment = require('../models/Payment');
const Rental = require('../models/Rental');

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('rental_id');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve payments', error: error.message });
  }
};

// Create new payment
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();

    // (Optional) Update rental status if needed
    // await Rental.findByIdAndUpdate(payment.rental_id, { status: 'Completed' });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create payment', error: error.message });
  }
};
