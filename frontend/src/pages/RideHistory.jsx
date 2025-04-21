import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const RideHistory = () => {
  const [rides, setRides] = useState([]);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/ride-history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log(response)

        // Ensure the response is an array before setting state
        if (Array.isArray(response.data.rides)) {
            setRides(response.data.rides);
        } else {
            setRides([]); // fallback
        }
      } catch (error) {
        console.error('Error fetching ride history:', error);
      }
    };

    fetchRides();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Ride History</h2>
        <button
          onClick={() => navigate('/home')}
          className='flex items-center gap-2 text-black text-sm bg-white font px-4 py-2 rounded-lg'
        >
          <i className="ri-arrow-left-line text-lg"></i> Back to Home
        </button>
      </div>

      {rides.length === 0 ? (
        <p className="text-gray-400">You have not booked any rides yet.</p>
      ) : (
        rides.map((ride, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg mb-4 shadow">
            <p className="text-sm text-gray-400 mb-1">
              {ride.createdAt ? format(new Date(ride.createdAt), 'dd MMM yyyy - hh:mm a') : 'Date not available'}
            </p>
            <p className="text-lg font-semibold mb-1">Pickup: <span className="font-normal">{ride.pickup}</span></p>

            <p className="text-lg font-semibold mb-1">
                {ride.isRental 
                    ? 'Rental Duration:' 
                    : 'Destination:'} <span className="font-normal">
                    {ride.isRental
                    ? `${ride.rentalDuration} hour(s)` 
                    : ride.destination}
                </span>
            </p>
            <p className="text-md text-green-400 font-semibold">Fare: ₹{ride.fare}</p>
            <p className="text-sm">Vehicle Type: {ride.captain?.vehicle?.vehicleType}</p>
            <p className="text-sm">EV Mode: {ride.captain?.vehicle?.evMode ? 'Yes ⚡' : 'No'}</p>
            <p className="text-sm">Captain: {ride.captain?.fullname?.firstname} {ride.captain?.fullname?.lastname}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RideHistory;
