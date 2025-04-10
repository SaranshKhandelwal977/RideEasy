const express = require('express');
const router = express.Router();
const {body, query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', 
    authMiddleware.authUser, 
    body('pickup').isString().isLength({min: 3}).withMessage('Pickup must be atleast 3 characters long'),
    body('destination').isString().isLength({min: 3}).withMessage('Destination must be atleast 3 characters long'),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
    body('isEV').optional().isBoolean().withMessage('isEV must be a boolean'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser, 
    query('pickup').isString().isLength({min: 3}).withMessage('Pickup must be atleast 3 characters long'),
    query('destination').isString().isLength({min: 3}).withMessage('Destination must be atleast 3 characters long'),
    query('isEV').optional().isBoolean().withMessage('isEV must be a boolean'),
    rideController.getFare
)

module.exports = router