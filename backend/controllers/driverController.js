const Driver = require('../models/Driver');

exports.getDrivers = async (req, res) => {
  const drivers = await Driver.find().populate('assigned_auto');
  res.json(drivers);
};

exports.createDriver = async (req, res) => {
  const driver = new Driver(req.body);
  await driver.save();
  res.status(201).json(driver);
};

exports.updateDriver = async (req, res) => {
  const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(driver);
};

exports.deleteDriver = async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.json({ message: 'Driver deleted' });
};