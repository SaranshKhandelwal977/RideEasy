const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }
    const {address} = req.query;
    try {
        const coordinates = await mapsService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors.array() });
        }
        const {origin, destination} = req.query;
        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);

    }catch(error){
        console.error('Error fetching distance and time:', error);
        res.status(404).json({ message: 'Distance and time not found' });

    }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors.array() });
        }
        const {input} = req.query;
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    }
        catch(error){
        console.error('Error fetching suggestions:', error);
        res.status(404).json({ message: 'Suggestions not found' });
    }
}
