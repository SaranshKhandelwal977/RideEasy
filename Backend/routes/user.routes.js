const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('./../controllers/user.controller');
const authMiddleware = require('./../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
    body('fullname.firstname').isLength({min: 3}).withMessage('FirstName must be atleast 3 characters long'),
    body('phone').isLength({min: 10}).withMessage('Phone must be atleast 10 characters long')
], 
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
], 
    userController.loginUser
)

router.get('/profile',authMiddleware.authUser ,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser, userController.logoutUser)
router.put('/update-profile', authMiddleware.authUser, userController.updateUserProfile);
router.put('/change-password', authMiddleware.authUser, userController.changePassword);
router.get('/ride-history', authMiddleware.authUser, userController.getUserRideHistory);

module.exports = router;