import React from 'react'
import carImage from "../assets/carr.png";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {ride} = location.state || {};

    const {socket} = useContext(SocketContext);

    socket.on('ride-ended', () => {
        navigate('/home')
    })

  return (
    <div className='h-screen relative'>
        <h2 className='w-16 absolute left-5 top-5 text-2xl tracking-tighter font-bold text-black'>RideEasy</h2>
        <div onClick={() => {navigate('/home')}} className='absolute cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full shadow-md top-5 right-5'>
            <i className="text-lg text-black font-bold ri-home-5-line"></i>
        </div>
        <div className='h-1/2 w-[375px]'>
            <LiveTracking/>
        </div>
        <div className='h-1/2 p-4'>
            <div className='flex items-center justify-between'>
                <img className='h-12' src={carImage}/>
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-400'>Maruti Suzuki WagonR</p>
                </div>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'> 
                <div className='w-full mt-5'>
                    
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-md font-medium'>{ride?.destination}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-md font-medium'>{ride?.fare}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding