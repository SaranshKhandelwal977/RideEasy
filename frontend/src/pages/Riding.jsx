import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import {useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';
import carImage from "../assets/carr.png";
import bikeImage from "../assets/bike.png";
import autoImage from "../assets/auto.png";
import axios from 'axios';

const Riding = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {ride} = location.state || {};

    const {socket} = useContext(SocketContext);

    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(5);

    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [splitCount, setSplitCount] = useState(1);
    const [splitError, setSplitError] = useState('');
    const [isSplitActive, setIsSplitActive] = useState(false);

    useEffect(() => {
        if (!socket) return;
        const handleRideEnded = () => {
            console.log('Ride ended event received ');
            setShowRating(true);
        };

        socket.on('ride-ended', handleRideEnded);
        console.log('Socket listener attached');

        return () => {
            socket.off('ride-ended', handleRideEnded);
            console.log('Socket listener detached ');
        };
    },[socket])

    const submitRating = async () => {
        try {
            if (isNaN(rating) || rating < 1 || rating > 5) {
                console.error('Invalid rating value :', rating);
                return;
            }
    
            await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/rate-captain`, {
                rideId: ride._id,
                rating: rating
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            console.log('Rating submitted successfully ');
            navigate('/home');
        } catch (error) {
            console.error('Failed to submit rating', error);
        }
    };

  return (
    <div className='h-screen relative w-full mx-auto'>
        {showRating && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[6px] bg-black/30">
                <div className="bg-[#0F172A] border border-white/10 p-8 rounded-xl shadow-lg w-80">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Rate Your Captain</h2>

                <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full p-3 rounded-md border border-white/20 bg-[#1E293B] text-white focus:outline-none mb-5"
                >
                    <option value={5}>🌟 5 - Excellent</option>
                    <option value={4}>⭐ 4 - Very Good</option>
                    <option value={3}>👍 3 - Good</option>
                    <option value={2}>😐 2 - Bad</option>
                    <option value={1}>👎 1 - Very Bad</option>
                </select>

                <button
                    onClick={submitRating}
                    className="w-full py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold transition-all"
                >
                    Submit Rating
                </button>
                </div>
            </div>
        )}

        <h2 className='w-16 absolute left-5 top-5 text-2xl tracking-tighter font-bold text-white'>RideEasy</h2>
        <div onClick={() => {navigate('/home')}} className='absolute cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full shadow-md top-5 right-5'>
            <i className="text-lg text-black font-bold ri-home-5-line"></i>
        </div>
        <div className='h-1/2 pt-16'>
            <LiveTracking/>
        </div>
        <div className='h-1/2 p-4'>
            <div className='flex items-center justify-between'>
                <img className='h-20' src={ ride?.captain.vehicle.vehicleType === 'car' ? carImage : ride?.captain.vehicle.vehicleType === 'motorcycle' ? bikeImage : autoImage}/>
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-400'>{ride?.captain.vehicle.modelName || 'Vehicle'}</p>
                    <p className='text-gray-200'>{ride?.captain.phone}</p>
                </div>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'> 
                <div className='w-full mt-5'>
                    
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-md font-medium'>
                                <p>
                                    {ride?.isRental 
                                        ? `Rental for ${ride?.rentalDuration} hour(s)` 
                                        : `${ride?.destination}`
                                    }
                                </p>
                            </h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-md font-medium'>₹{ride?.fare}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <button 
                className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '
                onClick={() => setShowPaymentOptions(true)}
            >
                Make a Payment
            </button>
            {showPaymentOptions && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                <div className="bg-[#0F172A] border border-white/10 p-6 rounded-xl shadow-lg w-[90%] max-w-md text-white">
                    <h2 className="text-lg font-bold text-center mb-4">Select Payment Method</h2>
                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                socket.emit('payment-mode', { rideId: ride._id, mode: 'cash' });
                                setShowPaymentOptions(false);
                                console.log("Payment mode emitted");
                            }}
                            className="w-full py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all"
                            >
                            Pay in Cash 💵
                        </button>
                        <button
                            onClick={() => {
                                setIsSplitActive(true);
                            }}
                            className="w-full py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-all"
                            >
                            Split the Fare 🧾
                        </button>
                        {isSplitActive && (
                            <div className="flex flex-col gap-2 mt-3">
                                <input
                                type="number"
                                min={1}
                                max={5}
                                placeholder="Split among how many people? (max 5)"
                                className="bg-gray-700 text-white rounded-md p-2 w-[70%] inline-block"
                                value={splitCount}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value > 5) {
                                    setSplitError('You can split the fare among max 5 people.');
                                    } else {
                                    setSplitError('');
                                    setSplitCount(value);
                                    }
                                }}
                                />
                                {splitError && <p className="text-red-400 text-sm">{splitError}</p>}
                                {splitCount > 1 && (
                                <p className="text-green-300 text-sm">
                                    Each person pays ₹{(ride.fare / splitCount).toFixed(2)}
                                </p>
                                )}
                                {splitCount > 1 && !splitError && (
                                <button
                                    onClick={() => {
                                    socket.emit('payment-mode', {
                                        rideId: ride._id,
                                        mode: 'cash-split',
                                        splitCount,
                                    });
                                    setShowPaymentOptions(false);
                                    setIsSplitActive(false);
                                    }}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md"
                                >
                                    Confirm Split Payment
                                </button>
                                )}
                            </div>
                        )}
                        <button
                        className="w-full py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
                        onClick={() => {
                            alert('Online payment coming soon via Razorpay.');
                            setShowPaymentOptions(false);
                        }}
                        >
                        Pay Online 💳
                        </button>
                    </div>
                </div>
            </div>
            )}

        </div>
    </div>
  )
}

export default Riding