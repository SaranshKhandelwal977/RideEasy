import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';

const FinishRide = (props) => {
    const navigate = useNavigate()
    const [paymentInfo, setPaymentInfo] = useState(null);
    const { socket } = useContext(SocketContext);

    const endRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.status === 200){
            navigate('/captain-home')
        }
    }
    console.log("Socket in FinishRide:", socket);
    useEffect(() => {
        if (!socket || !props.ride?._id) return;
      
        const handlePaymentMode = (data) => {
          console.log("Received payment mode:", data);
          if (data.rideId === props.ride._id) {
            setPaymentInfo(data);
          }
        };
      
        socket.on('payment-mode', handlePaymentMode);
      
        return () => {
          socket.off('payment-mode', handlePaymentMode);
        };
      }, [socket, props.ride?._id]);
      
      
    
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setFinishRidePanel(false)}}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Finish this ride</h3>
        <div className='flex items-center justify-between p-3 bg-gray-600 rounded-lg'>
            <div className='flex items-center gap-5 justify-between'>
                <img className='h-12 w-12 rounded-full object-cover border-1 bg-amber-400' src=''/>
                <h2 className='text-lg font-medium -ml-3'>{props.ride?.user.fullname.firstname}</h2>
            </div>
            <h5 className='text-lg font-medium'>2.2 KM</h5>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'> 
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-lg  ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-md font-normal'>{props.ride?.pickup}</h3>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-lg ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-md font-normal'>
                            <p>
                                {props.ride?.isRental 
                                    ? `Rental for ${props.ride?.rentalDuration} hour(s)` 
                                    : `${props.ride?.destination}`
                                }
                            </p>
                        </h3>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg ri-currency-line"></i>
                    <div>
                        <h3 className='text-md font-normal'>₹{props.ride?.fare}</h3>
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full">
                {paymentInfo && (
                    <div className="mt-4 p-3 text-sm text-green-500 rounded-md">
                        {paymentInfo.mode === 'cash' && (
                        <>
                            <p>Passenger will pay in cash.</p>
                            <p>You can now finish the ride.</p>
                        </>
                        )}
                        {paymentInfo.mode === 'cash-split' && (
                        <>
                            <p>Fare will be split among <strong>{paymentInfo.splitCount}</strong> people.
                            Passengers will pay in cash.</p> <p>You can now finish the ride.</p>
                        </>
                        )}
                    </div>
                )}
                <button 
                    onClick={endRide} 
                    disabled={!paymentInfo} 
                    className={`mt-5 block text-center w-full font-semibold p-2 px-5 rounded-lg transition-all ${!paymentInfo ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                    Finish Ride
                </button>
                {
                    !paymentInfo && (
                        <p className='text-red-500 mt-6 text-xs'>Click on finish ride button if you have completed the payment.</p>

                    )
                }
            </div>

        </div>
    </div>
  )
}

export default FinishRide