const Rental = require('../models/Rental');

exports.getRentals = async (req, res) => {
  const rentals = await Rental.find().populate('driver_id auto_id');
  res.json(rentals);
};

exports.createRental = async (req, res) => {
  const rental = new Rental(req.body);
  await rental.save();
  res.status(201).json(rental);
};

exports.updateRental = async (req, res) => {
  const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(rental);
};

exports.deleteRental = async (req, res) => {
  await Rental.findByIdAndDelete(req.params.id);
  res.json({ message: 'Rental deleted' });
};