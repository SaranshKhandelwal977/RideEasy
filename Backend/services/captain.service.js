const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    email, firstname, lastname, password, color, plate, capacity, vehicleType, evMode
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
            evMode: evMode || false
        }
    })
    return captain;
}