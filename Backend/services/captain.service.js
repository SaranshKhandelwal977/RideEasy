const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    email, firstname, lastname, password, color, plate, capacity, vehicleType, evMode, modelName
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType || !modelName) {
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
            modelName,
            evMode: evMode || false
        }
    })
    return captain;
}