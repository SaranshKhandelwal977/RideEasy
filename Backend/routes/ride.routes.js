const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', 
    authMiddleware.authUser, 
    body('pickup').isString().isLength({min: 3}).withMessage('Pickup must be atleast 3 characters long'),
    body('destination').isString().isLength({min: 3}).withMessage('Destination must be atleast 3 characters long'),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

module.exports = router