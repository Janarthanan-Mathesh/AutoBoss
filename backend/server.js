const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const autoRoutes = require('./routes/autos');
const driverRoutes = require('./routes/drivers');
const rentalRoutes = require('./routes/rentals');
const paymentRoutes = require('./routes/payments');
const maintenanceRoutes = require('./routes/maintenance');
const reportRoutes = require('./routes/reports');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require('./routes/dashboard');

dotenv.config();
connectDB();

const app = express();

// ✅ Improved CORS (important for file download + frontend connection)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['Content-Disposition']
}));

app.use(express.json());

// ✅ Route loading
app.use('/api/admin', adminRoutes);
console.log('✅ Loaded adminRoutes');

app.use('/api/auth', authRoutes);
console.log('✅ Loaded authRoutes');

app.use('/api/autos', autoRoutes);
console.log('✅ Loaded autoRoutes');

app.use('/api/dashboard', dashboardRoutes);
console.log('✅ Loaded dashboardRoutes');

app.use('/api/drivers', driverRoutes);
console.log('✅ Loaded driverRoutes');

app.use('/api/rentals', rentalRoutes);
console.log('✅ Loaded rentalRoutes');

app.use('/api/payments', paymentRoutes);
console.log('✅ Loaded paymentRoutes');

app.use('/api/maintenance', maintenanceRoutes);
console.log('✅ Loaded maintenanceRoutes');

app.use('/api/reports', reportRoutes);
console.log('✅ Loaded reportRoutes');

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
