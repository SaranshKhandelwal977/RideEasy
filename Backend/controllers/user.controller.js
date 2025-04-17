const blacklistTokenModel = require('../models/blacklistToken.model')
const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() })
    }

    const { fullname, email, password } = req.body
    const existingUser = await userModel.findOne({ email })
    
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await userModel.hashPassword(password)
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    const token = user.generateAuthToken()
    res.status(201).json({ token, user })
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() })
    }

    const { email, password } = req.body
    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = user.generateAuthToken()
    res.cookie('token', token)
    res.status(200).json({ token, user })
}

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token')
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]
    await blacklistTokenModel.create({ token })
    res.status(200).json({ message: 'Logged out successfully' })
}

module.exports.updateUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const { firstname, lastname, email } = req.body;

        if (firstname) user.fullname.firstname = firstname;
        if (lastname) user.fullname.lastname = lastname;
        if (email) user.email = email;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user._id).select('+password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await userModel.hashPassword(newPassword);
    user.password = hashedNewPassword;

    await user.save();
    return res.status(200).json({ message: 'Password updated successfully' });
};

module.exports.getUserRideHistory = async (req, res) => {
    try {
      const rides = await rideModel
        .find({ user: req.user._id, status: 'completed' })
        .populate('captain', 'fullname vehicle')
        .sort({ createdAt: -1 });
  
      res.status(200).json({ rides });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };