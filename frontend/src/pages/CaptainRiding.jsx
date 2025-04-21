import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import FinishRide from '../components/FinishRide'
import { Link, useLocation } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function(){
        if(finishRidePanel){
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    },[finishRidePanel])

  return (
    <div className='h-screen relative flex flex-col justify-end w-full mx-auto'>
        
        <h2 className='w-16 absolute left-5 top-5 text-2xl tracking-tighter font-bold text-white'>RideEasy</h2>
        <div>
            <div onClick={() => {navigate('/captain-home')}} className='absolute cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full shadow-md top-5 right-5'>
                <i className="text-lg text-black font-bold ri-home-5-line"></i>
            </div>
        </div>
        <div className='h-4/5 w- pt-16'>
            <LiveTracking/>
        </div>
        <div className='h-1/5 p-8 pb-0 flex items-center justify-between relative' onClick={() => setFinishRidePanel(true)}>
            <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {}}>
                <i className="text-3xl text-gray-200 ri-arrow-up-wide-line"></i>
            </h5>
            <h4 className='text-xl font-semibold'>4km away </h4>
            <button onClick={() => {}} className='bg-green-600 text-white font-semibold p-2 px-5 rounded-lg '>Complete Ride</button>
        </div>
        <div ref={finishRidePanelRef} className='fixed w-screen h-screen z-10 bottom-0 bg-gray-800 px-3 py-10 pt-12 transform translate-y-full'>
            <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel}/>
        </div>
    </div>
  )
}

export default CaptainRiding