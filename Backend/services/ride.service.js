const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');


async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    const distanceTime = await mapsService.getDistanceTime(pickup, destination);
    const baseFare = {
        auto: 20,
        car: 35,
        motorcycle: 10
    }
    const perKmRate = {
        auto: 8,
        car: 12,
        motorcycle: 5
    }
    const perMinuteRate = {
        auto: 1.5,
        car: 2.5,
        motorcycle: 1
    }
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
       
    }
    return fare;
}

async function getOtp(num){
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.createRide = async ({user, pickup, destination, vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('UserId, pickup, destination and vehicleType are required');
    }
    const fare = await getFare(pickup, destination);
    const ride = await rideModel.create({
        user: user,
        pickup,
        destination,
        otp: await getOtp(6),
        fare: fare[vehicleType],
    });

    return ride;
}

