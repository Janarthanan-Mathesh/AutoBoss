const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const autoRoutes = require('./routes/autos');
const driverRoutes = require('./routes/drivers');
const rentalRoutes = require('./routes/rentals');
const paymentRoutes = require('./routes/payments');
const maintenanceRoutes = require('./routes/maintenance');
const reportRoutes = require('./routes/reports');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
console.log('✅ Loaded authRoutes');

app.use('/api/autos', autoRoutes);
console.log('✅ Loaded autoRoutes');

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));