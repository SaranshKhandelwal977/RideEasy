import React from 'react'
import carImage from "../assets/carr.png";
import bikeImage from "../assets/bike.png";
import autoImage from "../assets/auto.png";

const ConfirmRide = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setConfirmRidePanel(false)}}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-3'>Confirm your Ride</h3>
        {props.isEV && (
            <p className="text-green-400 font-medium text-sm mt-1 mb-3">EV Mode Applied</p>
        )}
        <div className='flex gap-2 justify-between flex-col items-center'> 
            <img className='h-20' src={ props.vehicleType === 'car' ? carImage : props.vehicleType === 'motorcycle' ? bikeImage : autoImage}/>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-lg  ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-md font-normal'>{props.pickup}</h3>
                        
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-md ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-md font-normal'>
                            <p>
                                {props.isRental 
                                    ? `Rental for ${props.rentalDuration} hour(s)` 
                                    : `Destination: ${props.destination}`
                                }
                            </p>
                        </h3>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg ri-currency-line"></i>
                    <div>
                        <h3 className='text-md font-normal'>₹{props.fare[ props.vehicleType ]}</h3>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                props.setVehicleFound(true)
                props.setConfirmRidePanel(false)
                props.createRide()
            }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmRide