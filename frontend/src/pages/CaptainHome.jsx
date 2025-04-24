import React, { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {
    const navigate = useNavigate();
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null);

    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const confirmRidePopupPanelRef = useRef(null);

    const [rideQueue, setRideQueue] = useState([]);

    const {socket} = useContext(SocketContext);
    const {captain} = useContext(CaptainDataContext);

    const [ride, setRide] = useState(null);

    useEffect(() => {
        socket.emit('join', {userId: captain._id, userType: 'captain'});
        const updateLocation = () => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }
        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation(); 

        socket.on('new-ride', (data) => {
            console.log('New ride received:', data);
            setRideQueue((prevQueue) => {
                if (prevQueue.find(r => r._id === data._id)) return prevQueue;
                return [...prevQueue, data];
            });
    
            if (!ride) {
                setRide(data);
                setRidePopupPanel(true);
            }
        })
    
        socket.on('ride-cancelled', ({ rideId }) => {
            setRideQueue(prev => prev.filter(r => r._id !== rideId));
            if (ride && ride._id === rideId) {
                setRide(null);
                setRidePopupPanel(false);
        
                // Show next ride in queue if available
                setTimeout(() => {
                    setRideQueue((q) => {
                        if (q.length > 0) {
                            setRide(q[0]);
                            setRidePopupPanel(true);
                            return q.slice(1);
                        }
                        return q;
                    });
                }, 500);
            }
        });
    },[captain, socket, ride])

    const ignoreRide = () => {
        setRideQueue((prevQueue) => {
          const newQueue = prevQueue.filter(r => r._id !== ride._id); 
          const nextRide = newQueue[0] || null;
          
          if (nextRide) {
            setRide(nextRide);
            setRidePopupPanel(true); 
          } else {
            setRide(null);
            setRidePopupPanel(false);
          }
      
          return newQueue;
        });
      };
      
    

    const confirmRide = async () => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
                rideId: ride._id,
                captainId: captain._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log('Ride confirmed:', response);
            setRidePopupPanel(false);
            setConfirmRidePopupPanel(true);
        }
        catch(err){
            console.log('Ride already taken by someone else.: ', err);
            setRidePopupPanel(false);
            setTimeout(() => {
                setRideQueue((q) => {
                    if (q.length > 0) {
                        setRide(q[0]);
                        setRidePopupPanel(true);
                        return q.slice(1);
                    }
                    return q;
                });
            }, 500);
        }
    }

    useGSAP(function(){
        if(ridePopupPanel){
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    },[ridePopupPanel])

    useGSAP(function(){
        if(confirmRidePopupPanel){
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    },[confirmRidePopupPanel])

  return (
    <div className='h-screen relative w-full mx-auto'>
        <h2 className='w-16 absolute left-5 top-5 text-2xl tracking-tighter font-bold text-white'>RideEasy</h2>
        <div>
            <div onClick={() => {navigate('/captain/logout')}} className='absolute cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full shadow-md top-5 right-5'>
                <i className="text-lg text-black font-bold ri-logout-box-r-line"></i>
            </div>
        </div>
        <div className='h-3/5 pt-16'>
            <LiveTracking/>
        </div>
        <div className='h-2/5 p-4'>
            <CaptainDetails/>
        </div>
        <div ref={ridePopupPanelRef} className='fixed w-screen z-10 bottom-0 bg-gray-800 px-3 py-10 pt-12 transform translate-y-full'>
            <RidePopUp 
                setRidePopupPanel={setRidePopupPanel} 
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                ride={ride}
                confirmRide={confirmRide}
                ignoreRide={ignoreRide}
            />
        </div>
        <div ref={confirmRidePopupPanelRef} className='fixed w-screen h-screen z-10 bottom-0 bg-gray-800 px-3 py-10 pt-12 transform translate-y-full'>
            <ConfirmRidePopUp 
            setRidePopupPanel={setRidePopupPanel} 
            ride={ride}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
        </div>
    </div>
    
    
  )
}

export default CaptainHome