const Rental = require('../models/Rental');

// Get all rentals
exports.getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().populate('driver_id auto_id');
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rentals', error: error.message });
  }
};

// Create new rental
exports.createRental = async (req, res) => {
  try {
    const rental = new Rental(req.body);
    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create rental', error: error.message });
  }
};

// Update rental
exports.updateRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    res.json(rental);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update rental', error: error.message });
  }
};

// Delete rental
exports.deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    res.json({ message: 'Rental deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete rental', error: error.message });
  }
};
