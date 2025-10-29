const Auto = require('../models/Auto');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getAutos = async (req, res) => {
  const autos = await Auto.find();
  res.json(autos);
};

exports.createAuto = async (req, res) => {
  const { auto_id, model, number, type, purchase_date, status, battery_percentage, charge_cycles, cost_per_charge, range_per_charge } = req.body;
  let image_url = '';
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    image_url = result.secure_url;
  }
  const auto = new Auto({ auto_id, model, number, type, purchase_date, status, image_url, battery_percentage, charge_cycles, cost_per_charge, range_per_charge });
  await auto.save();
  res.status(201).json(auto);
};

exports.updateAuto = async (req, res) => {
  const auto = await Auto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(auto);
};

exports.deleteAuto = async (req, res) => {
  await Auto.findByIdAndDelete(req.params.id);
  res.json({ message: 'Auto deleted' });
};