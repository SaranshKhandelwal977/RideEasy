const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapsService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');

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
        console.log(ride)
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });
        const allCaptains = await captainModel.find({ status: 'active' });
        allCaptains.forEach(cap => {
            if (cap._id.toString() !== req.captain._id.toString()) {
                sendMessageToSocketId(cap.socketId, {
                    event: 'ride-cancelled',
                    data: { rideId }
                });
            }
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
        await captainModel.findByIdAndUpdate(req.captain._id, {
            status: 'inactive'
        });
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
        await captainModel.findByIdAndUpdate(req.captain._id, {
            status: 'active'
        });
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

  module.exports.rateCaptain = async (req, res) => {
    const { rideId, rating } = req.body;
    const parsedRating = Number(rating);

    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    console.log(parsedRating)
    try {
        const ride = await rideModel.findById(rideId).populate('captain');
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        const captainId = ride.captain._id;

        const captain = await captainModel.findById(captainId);
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }
        
        if (!captain.rating) captain.rating = 5;
        if (!captain.noOfRides) captain.noOfRides = 0;
        if (!captain.totalFare) captain.totalFare = 0;
        
        captain.noOfRides += 1;
        captain.rating = ((captain.rating * (captain.noOfRides - 1)) + parsedRating) / captain.noOfRides;
        captain.totalFare += ride.fare;
        
        await captain.save();

        return res.status(200).json({ message: 'Rating submitted successfully', captain });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}
  
  