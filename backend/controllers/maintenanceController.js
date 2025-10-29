const Maintenance = require('../models/Maintenance');

exports.getMaintenance = async (req, res) => {
  const maintenance = await Maintenance.find().populate('auto_id');
  res.json(maintenance);
};

exports.createMaintenance = async (req, res) => {
  const maintenance = new Maintenance(req.body);
  await maintenance.save();
  res.status(201).json(maintenance);
};