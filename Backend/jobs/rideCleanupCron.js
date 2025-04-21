const cron = require('node-cron');
const Ride = require('../models/ride.model');

const deletePendingRides = async () => {
  try {
    const expiryTime = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago

    const result = await Ride.deleteMany({
      status: 'pending',
      createdAt: { $lte: expiryTime }
    });

    if (result.deletedCount > 0) {
      console.log(`[CRON] Deleted ${result.deletedCount} pending rides older than 30 mins.`);
    }
    else {
        console.log(`[CRON] No pending rides found older than 30 mins.`);
    }
  } catch (error) {
    console.error('[Cron Job Error]', error.message);
  }
};

// Schedule the job: every 30 minutes
cron.schedule('0 2 * * *', () => {
  console.log('[Cron Job] Running cleanup job at 2:00 AM...');
  deletePendingRides();
});
