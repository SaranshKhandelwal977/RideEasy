const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on('join', async(data) => {
            const {userId, userType} = data;
            console.log(`User: ${userId} of type ${userType} joined`);
            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, {socketId: socket.id});
            }
            else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, {socketId: socket.id});
            }
        });
        socket.on('update-location-captain', async(data) => {
            const {userId, location} = data;
            if(!location || !location.ltd || !location.lng){
                console.log('Invalid location data');
                return;
            }
            console.log(`Captain: ${userId} updated location`);
            await captainModel.findByIdAndUpdate(userId, {location: {ltd: location.ltd, lng: location.lng}});
        })
        socket.on('payment-mode', async ({ rideId, mode, splitCount }) => {
            try {
                const ride = await require('./models/ride.model').findById(rideId).populate('captain');
                const captainSocketId = ride?.captain?.socketId;
                if (captainSocketId) {
                    io.to(captainSocketId).emit('payment-mode', {
                        rideId,
                        mode,
                        splitCount
                    });
                    console.log(`Forwarded payment-mode to captain ${captainSocketId}`);
                } else {
                    console.log('Captain socketId not found.');
                }
            } catch (err) {
                console.error('Error in payment-mode event:', err.message);
            }
        });
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

}

function sendMessageToSocketId(socketId, messageObject){
    if(io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
    else{
        console.log('Socket.io not initialized');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};