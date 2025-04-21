const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('./../controllers/captain.controller');
const authMiddleware = require('./../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
    body('fullname.firstname').isLength({min: 3}).withMessage('FirstName must be atleast 3 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min: 1}).withMessage('Plate must be atleast 1 characters long'),
    body('vehicle.capacity').isLength({min: 1}).withMessage('Capacity must be atleast 1 characters long'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
    body('vehicle.evMode').optional().isBoolean().withMessage('evMode must be true or false'),
    body('vehicle.modelName').isLength({min: 1}).withMessage('ModelName must be atleast 1 characters long')
], 
    captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
], 
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain ,captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)
router.get('/stats', authMiddleware.authCaptain, captainController.getCaptainStats);

module.exports = router;