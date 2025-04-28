const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');
const {sendMessageToSocketId} = require('../socket');
const captainModel = require('../models/captain.model');

const baseFare = {
    auto: 20,
    car: 35,
    motorcycle: 10
};
const perKmRate = {
    auto: 8,
    car: 12,
    motorcycle: 5
};
const perMinuteRate = {
    auto: 1.5,
    car: 2.5,
    motorcycle: 1
};
const evDiscount = 0.85;

async function getFare(pickup, destination, isEV = false) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
  
    const routes = await mapsService.getMultipleRoutes(pickup, destination);
  
    if (!routes.length) {
        throw new Error('No routes found');
    }
  
    const formatRoute = (route) => {
        const distanceInKm = route.legs[0].distance.value / 1000;
        const durationInMinutes = route.legs[0].duration.value / 60;
        const tolls = route.legs[0].toll || 0; // Google doesn't directly give tolls. You may need to manually handle.
  
        const calculateFare = (type) => {
            return Math.round(
            (baseFare[type] + (distanceInKm * perKmRate[type]) + (durationInMinutes * perMinuteRate[type])) 
            * (isEV ? evDiscount : 1)
            );
        };
  
        return {
            summary: route.summary || "Route",
            distance: distanceInKm.toFixed(2),
            duration: durationInMinutes.toFixed(0),
            fare: {
                auto: calculateFare('auto'),
                car: calculateFare('car'),
                motorcycle: calculateFare('motorcycle')
            },
            taxes: tolls || 0,
            overviewPolyline: route.overview_polyline.points,
        };
    };
  
    if (routes.length === 1) {
        return { singleRoute: formatRoute(routes[0]) };
    } else {
        return { multipleRoutes: routes.slice(0, 2).map(formatRoute) };
    }
}

module.exports.getFare = getFare;

async function getOtp(num){
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType, isEV = false, selectedRoute }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('UserId, pickup, destination and vehicleType are required');
    }
    const ride = await rideModel.create({
        user: user,
        pickup,
        destination,
        otp: await getOtp(6),
        fare: selectedRoute.fare[vehicleType],
        selectedRoute: selectedRoute || null
    });

    return ride;
}

module.exports.confirmRide = async ({rideId, captain}) => {
    if(!rideId) {
        throw new Error('RideId is required');
    }
    await rideModel.findOneAndUpdate(
        {_id: rideId, status: 'pending'},
        {
            $set:{
                status: 'accepted',
                captain: captain._id
            }
        },
        {new: true}
    )
    const ride = await rideModel.findOne(
        {_id: rideId}
    ).populate('user').populate('captain').select('+otp');
    if(!ride) {
        throw new Error('Ride not found');
    }
    await captainModel.findByIdAndUpdate(captain._id, { status: 'inactive' });
    return ride;
}

module.exports.startRide = async ({rideId, otp, captain}) => {
    if(!rideId || !otp) {
        throw new Error('RideId and otp are required');
    }
    const ride = await rideModel.findOne(
        {_id: rideId}
    ).populate('user').populate('captain').select('+otp');
    if(!ride) {
        throw new Error('Ride not found or invalid otp');
    }
    if(ride.otp !== otp) {
        throw new Error('Invalid otp');
    }
    if(ride.status !== 'accepted') {
        throw new Error('Ride not accepted yet');
    }
    await rideModel.findOneAndUpdate(
        {_id: rideId},
        {
            status: 'ongoing',
        }
    )
    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    });
    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    const ride = await rideModel.findOne({ _id: rideId, captain: captain._id }).populate('user').populate('captain');
  
    if (!ride) throw new Error('Ride not found');
    if (ride.status !== 'ongoing') throw new Error('Ride not ongoing');
  
    let updatedFare = ride.fare;
  
    if (ride.isRental) {
      const rentalEnd = new Date();
      const rentalStart = ride.rentalStartTime || ride.updatedAt; // fallback
      const actualDurationInMin = Math.ceil((rentalEnd - rentalStart) / 60000);
      const allowedDuration = ride.rentalDuration * 60;
  
      if (actualDurationInMin > allowedDuration) {
        const extraMinutes = actualDurationInMin - allowedDuration;
        const perMinuteRate = 3; // You can customize this
        updatedFare += extraMinutes * perMinuteRate;
      }
  
      ride.actualEndTime = rentalEnd;
    }
  
    ride.status = 'completed';
    ride.fare = updatedFare;
    await ride.save();
  
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-completed',
      data: ride
    });
  
    return ride;
};
  
module.exports.createRentalRide = async ({ userId, pickup, rentalDuration, fare }) => {
    if (!userId || !pickup || !rentalDuration || !fare) {
      throw new Error('All fields are required for rental ride');
    }
  
    const ride = await rideModel.create({
      user: userId,
      pickup,
      fare,
      rentalDuration,
      isRental: true,
      otp: crypto.randomInt(100000, 999999).toString(),
      status: 'pending'
    });
  
    return ride;
  };
  