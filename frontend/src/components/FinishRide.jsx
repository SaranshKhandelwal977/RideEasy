import React from 'react';
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
    
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setFinishRidePanel(false)}}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Finsih this ride</h3>
        <div className='flex items-center justify-between p-3 bg-gray-600 rounded-lg'>
            <div className='flex items-center gap-5 justify-between'>
                <img className='h-12 w-12 rounded-full object-cover border-1 bg-amber-400' src=''/>
                <h2 className='text-lg font-medium -ml-3'> Harsh Patel</h2>
            </div>
            <h5 className='text-lg font-medium'>2.2 KM</h5>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'> 
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-lg  ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Address line 2</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-lg ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Address line 2</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg ri-currency-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Rs. 193.20</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Currency option</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full">
                <Link to={'/captain-home'} className=' mt-5 block text-center w-full bg-green-600 text-white font-semibold p-2 px-5 rounded-lg '>Finish Ride</Link>
                <p className='text-red-500 mt-6 text-xs'>Click on finish ride button if you have completed the payment.</p>
            </div>

        </div>
    </div>
  )
}

export default FinishRide