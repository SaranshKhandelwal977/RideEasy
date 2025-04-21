import React from 'react'
import carImage from "../assets/carr.png";

const WaitForDriver = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setWaitingForDriver(false)}}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <div className='flex items-center justify-between'>
             <img className='h-12' src={carImage}/>
             <div className='text-right'>
                <h2 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname}</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                <p className='text-sm text-gray-400'>{props.ride?.captain.vehicle.modelName || 'Vehicle'}</p>
                <div className='mt-2'>
                    <p className='text-xs text-gray-300'>OTP for verification</p>
                    <div className='mt-1 px-4 py-2 bg-white text-black font-bold text-lg tracking-widest rounded-lg shadow-md inline-block'>
                        {props.ride?.otp}
                    </div>
                </div>

             </div>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'> 
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-lg  ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-md font-medium'>{props.ride?.pickup}</h3>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-lg ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-md font-medium'>
                        <h3 className='text-md font-normal'>
                            <p>
                                {props.ride?.isRental 
                                    ? `Rental for ${props.ride?.rentalDuration} hour(s)` 
                                    : `Destination: ${props.ride?.destination}`
                                }
                            </p>
                        </h3>
                        </h3>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg ri-currency-line"></i>
                    <div>
                        <h3 className='text-md font-medium'>₹{props.ride?.fare}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WaitForDriver