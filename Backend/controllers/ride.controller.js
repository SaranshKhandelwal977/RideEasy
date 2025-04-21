const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapsService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {pickup, destination, vehicleType, isEV  = false} = req.body;
    try{
        const ride = await rideService.createRide({user:req.user._id , pickup, destination, vehicleType, isEV });
        res.status(201).json({ride});
        const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);
        const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng , 5); // Assuming 5 km radius
        const filteredCaptains = captainsInRadius.filter(captain => 
            captain.vehicle.vehicleType === vehicleType && 
            captain.vehicle.evMode === isEV
        );
        ride.otp="";
        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');
        filteredCaptains.forEach(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {pickup, destination, isEV  = false} = req.query;
    try{
        const fare = await rideService.getFare(pickup, destination, isEV  === 'true');
        return res.status(200).json(fare);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {rideId} = req.body;
    try{
        const ride = await rideService.confirmRide({rideId, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });
        return res.status(200).json(ride);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {rideId, otp} = req.query;
    try{
        const ride = await rideService.startRide({rideId, otp, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });
        return res.status(200).json(ride);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}


module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {rideId} = req.body;
    try{
        const ride = await rideService.endRide({rideId, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });
        return res.status(200).json(ride);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

module.exports.createRentalRide = async (req, res) => {
    try {
      const { pickup, rentalDuration, fare } = req.body;
  
      if (!pickup || !rentalDuration || !fare) {
        return res.status(400).json({ message: 'Missing rental details' });
      }
  
      const ride = await rideService.createRentalRide({
        userId: req.user._id,
        pickup,
        rentalDuration,
        fare
      });
  
      const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);
      const captains = await mapsService.getCaptainsInTheRadius(
        pickupCoordinates.ltd,
        pickupCoordinates.lng,
        5
      );
  
      const rideWithUser = await rideModel.findById(ride._id).populate('user');
  
      captains
        .filter(cap => cap.vehicle.vehicleType === 'car')
        .forEach(cap => {
          sendMessageToSocketId(cap.socketId, {
            event: 'new-ride',
            data: rideWithUser
          });
        });
  
      res.status(201).json(ride);
    } catch (error) {
      console.error('Rental Ride Error:', error.message);
      res.status(500).json({ message: error.message });
    }
  };
  
  