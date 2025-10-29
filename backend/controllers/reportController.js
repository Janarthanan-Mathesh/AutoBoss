const Payment = require('../models/Payment');
const Maintenance = require('../models/Maintenance');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.getReports = async (req, res) => {
  const { month, year } = req.query;
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  const income = await Payment.aggregate([
    { $match: { date: { $gte: start, $lte: end } } },
    { $group: { _id: null, total: { $sum: '$amount_paid' } } }
  ]);

  const expenses = await Maintenance.aggregate([
    { $match: { date: { $gte: start, $lte: end } } },
    { $group: { _id: null, total: { $sum: '$cost' } } }
  ]);

  res.json({ income: income[0]?.total || 0, expenses: expenses[0]?.total || 0, profit: (income[0]?.total || 0) - (expenses[0]?.total || 0) });
};

exports.exportReports = async (req, res) => {
  const payments = await Payment.find();
  const csvWriter = createCsvWriter({
    path: 'reports.csv',
    header: [
      { id: 'payment_id', title: 'Payment ID' },
      { id: 'amount_paid', title: 'Amount Paid' },
      { id: 'date', title: 'Date' }
    ]
  });
  await csvWriter.writeRecords(payments);
  res.download('reports.csv');
};