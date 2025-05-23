const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./db/db')
const cookieParser = require('cookie-parser');
require('./jobs/rideCleanupCron');

const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
const paymentRoutes = require('./routes/payment.routes');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);
app.use('/payment', paymentRoutes);

app.get('/', (req,res) => {
    res.send('Hellouber clone')
});

module.exports = app;