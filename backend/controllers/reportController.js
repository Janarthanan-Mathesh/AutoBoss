const Payment = require('../models/Payment');
const Maintenance = require('../models/Maintenance');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// ✅ GET MONTHLY REPORT (JSON)
exports.getReports = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: 'Please provide month and year' });
    }

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

    res.json({
      income: income[0]?.total || 0,
      expenses: expenses[0]?.total || 0,
      profit: (income[0]?.total || 0) - (expenses[0]?.total || 0)
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
};

// ✅ EXPORT REPORTS (CSV DOWNLOAD)
exports.exportReports = async (req, res) => {
  try {
    const payments = await Payment.find().select('payment_id amount_paid date');

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: 'No payment records found' });
    }

    // 1️⃣ Create a unique temporary CSV file path
    const filePath = path.join(__dirname, `../reports_${Date.now()}.csv`);

    // 2️⃣ Set up CSV Writer
    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: 'payment_id', title: 'Payment ID' },
        { id: 'amount_paid', title: 'Amount Paid' },
        { id: 'date', title: 'Date' }
      ]
    });

    // 3️⃣ Write payment data into CSV
    await csvWriter.writeRecords(
      payments.map(p => ({
        payment_id: p.payment_id || 'N/A',
        amount_paid: p.amount_paid || 0,
        date: p.date
          ? new Date(p.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
          : 'N/A'
      }))
    );

    // 4️⃣ Send CSV file as response for download
    res.download(filePath, 'report.csv', (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ message: 'Failed to download report' });
      }

      // 5️⃣ Delete file after sending response
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting temp file:', unlinkErr);
      });
    });
  } catch (error) {
    console.error('Error exporting reports:', error);
    res.status(500).json({ message: 'Error exporting reports' });
  }
};
