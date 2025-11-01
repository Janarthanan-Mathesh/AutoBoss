const Payment = require('../models/Payment');
const Rental = require('../models/Rental');
const Driver = require('../models/Driver');
const Auto = require('../models/Auto');
const Maintenance = require('../models/Maintenance');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalPayments = await Payment.countDocuments();
    const totalRentals = await Rental.countDocuments();
    const totalDrivers = await Driver.countDocuments();
    const totalAutos = await Auto.countDocuments();
    const totalMaintenance = await Maintenance.countDocuments();

    res.status(200).json({
      totalPayments,
      totalRentals,
      totalDrivers,
      totalAutos,
      totalMaintenance
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats', error });
  }
};
