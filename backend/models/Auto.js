const mongoose = require('mongoose');

const autoSchema = new mongoose.Schema({
  auto_id: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  number: { type: String, required: true },
  type: { type: String, enum: ['EV', 'CNG', 'Fuel'], required: true },
  purchase_date: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  image_url: { type: String },
  // EV Analytics (optional)
  battery_percentage: { type: Number, min: 0, max: 100 },
  charge_cycles: { type: Number, default: 0 },
  cost_per_charge: { type: Number },
  range_per_charge: { type: Number },
});

module.exports = mongoose.model('Auto', autoSchema);