import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {
    const navigate = useNavigate();
    const [ridePopupPanel, setRidePopupPanel] = useState(true);
    const ridePopupPanelRef = useRef(null);

    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const confirmRidePopupPanelRef = useRef(null);

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
    <div className='h-screen relative'>
        <h2 className='w-16 absolute left-5 top-5 text-2xl tracking-tighter font-bold text-black'>RideEasy</h2>
        <div>
            <div onClick={() => {navigate('/home')}} className='absolute cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full shadow-md top-5 right-5'>
                <i className="text-lg text-black font-bold ri-logout-box-r-line"></i>
            </div>
        </div>
        <div className='h-3/5'>
            <img className='w-full h-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'/>
        </div>
        <div className='h-2/5 p-4'>
            <CaptainDetails/>
        </div>
        <div ref={ridePopupPanelRef} className='fixed w-[375px] z-10 bottom-0 bg-gray-800 px-3 py-10 pt-12 transform translate-y-full'>
            <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
        </div>
        <div ref={confirmRidePopupPanelRef} className='fixed w-[375px] h-screen z-10 bottom-0 bg-gray-800 px-3 py-10 pt-12 transform translate-y-full'>
            <ConfirmRidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
        </div>
    </div>
    
    
  )
}

export default CaptainHome