const axios = require('axios');
const dotenv = require('dotenv');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            const location = response.data.results[0].geometry.location;
            console.log(location);
            return {
                ltd: location.lat,
                lng: location.lng
            };
        }
        else{
            throw new Error('Unable to fetch coordinates for the provided address');
        }
    }
    catch(error){
        console.error('Error fetching coordinates:', error);
        throw new Error('Failed to fetch coordinates');
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if(response.data.rows[0].elements[0].status !== 'OK'){
                throw new Error('No routes found');
            }
            return response.data.rows[0].elements[0];
        }
        else{
            throw new Error('Unable to fetch distance and time for the provided locations');
        }
    }
    catch(error){
        console.error('Error fetching distance and time:', error);
        throw new Error('Failed to fetch distance and time');
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input){
        throw new Error('Input is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }
        else{
            throw new Error('Unable to fetch suggestions for the provided input');
        }
    }
    catch(error){
        console.error('Error fetching suggestions:', error);
        throw new Error('Failed to fetch suggestions');
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    //radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371] // radius in miles
            }
        }
    });
    return captains;
}