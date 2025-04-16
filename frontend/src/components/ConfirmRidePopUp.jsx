import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ConfirmRidePopUp = (props) => {
    
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {rideId: props.ride._id,
            otp: otp},
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        if(response.status === 200){
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', {state: {ride: props.ride}})
        }
        

    }

  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setConfirmRidePopupPanel(false)}}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
        <div className='flex items-center justify-between p-3 bg-gray-600 rounded-lg'>
            <div className='flex items-center gap-5 justify-between'>
                <img className='h-12 w-12 rounded-full object-cover border-1 bg-amber-400' src=''/>
                <h2 className='text-lg font-medium -ml-3'>{props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}</h2>
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
                        <h3 className='text-md font-normal'>{props.ride?.destination}</h3>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg ri-currency-line"></i>
                    <div>
                        <h3 className='text-md font-normal'>₹{props.ride?.fare}</h3>
                    </div>
                </div>
            </div>
            <div className='mt-6 w-full'>
                <form onSubmit={submitHandler}>
                    <input onChange={(e) => setOtp(e.target.value)} value={otp} type='text' placeholder='Enter OTP' className='p-2 px-5 w-full border-2 border-gray-400 rounded-lg'/>
                    <button className=' mt-5 w-full block text-center bg-green-600 text-white font-semibold p-2 px-5 rounded-lg '>Confirm</button>
                    <button onClick={() => {props.setConfirmRidePopupPanel(false)}} 
                    className=' mt-5 w-full bg-red-500 text-white font-semibold p-2 px-5 rounded-lg '>Cancel</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ConfirmRidePopUp